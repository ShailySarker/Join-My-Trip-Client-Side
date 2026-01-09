import { Button } from "../ui/button";
import Link from "next/link";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import { getCookie } from "@/services/auth/tokenHandler";
import LogoutButton from "./LogoutButton";
import { getUserInfo } from "@/services/auth/getUserInfo";

const Navbar = async () => {
  const accessToken = await getCookie("accessToken");
  const userInfo = await getUserInfo();
  const role = userInfo?.role || null;

  // Define menu items based on role
  const menuItems = {
    LOGGED_OUT: [
      { label: "Explore Travelers", href: "/explore-travelers" },
      { label: "Explore Travel Plans", href: "/travel-plans" },
      // { label: "Find Travel Buddy", href: "/find-travel-buddy" },
      { label: "About Us", href: "/about-us" },
      { label: "Subscription", href: "/subscription" },
      { label: "Contact Us", href: "/contact-us" },
    ],
    USER: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Explore Travelers", href: "/dashboard/explore-travelers" },
      { label: "My Travel Plans", href: "/dashboard/my-travel-plans" },
      { label: "About Us", href: "/about-us" },
      { label: "Subscription", href: "/subscription" },
      { label: "Profile", href: "/my-profile" },
    ],
    ADMIN: [
      { label: "Admin Dashboard", href: "/admin/dashboard" },
      { label: "Manage Users", href: "/admin/dashboard/manage-users" },
      {
        label: "Manage Travel Plans",
        href: "/admin/dashboard/manage-travel-plans",
      },
      { label: "About Us", href: "/about-us" },
      { label: "Profile", href: "/my-profile" },
    ],
    SUPER_ADMIN: [
      { label: "Admin Dashboard", href: "/admin/dashboard" },
      { label: "Manage Users", href: "/admin/dashboard/manage-users" },
      {
        label: "Manage Travel Plans",
        href: "/admin/dashboard/manage-travel-plans",
      },
      { label: "About Us", href: "/about-us" },
      { label: "Profile", href: "/my-profile" },
    ],
  };

  // Select items based on role, default to LOGGED_OUT
  let currentNavItems = menuItems.LOGGED_OUT;
  if (role === "USER") {
    currentNavItems = menuItems.USER;
  } else if (role === "ADMIN") {
    currentNavItems = menuItems.ADMIN;
  } else if (role === "SUPER_ADMIN") {
    currentNavItems = menuItems.SUPER_ADMIN;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur dark:bg-background/95">
      <div className="xl:mx-12 lg:mx-8 md:mx-6 mx-5 flex items-center justify-between xl:py-4.5 py-3.5">
        <div>
          <Link
            href="/"
            className="flex items-center justify-center text-xl font-bold text-primary"
          >
            Join My Trip
          </Link>
        </div>

        <nav className="md:block hidden">
          <ul className="flex xl:gap-6 lg:gap-5 gap-2.5 xl:text-base text-sm">
            {currentNavItems.map((item) => (
              <li key={item.label}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:block hidden">
          {accessToken ? (
            <LogoutButton />
          ) : (
            <div className="md:flex gap-2">
              <Link href="/login">
                <Button>Login</Button>
              </Link>
              <Link href="/register" className="text-lg font-medium">
                <Button variant="outline">Register</Button>
              </Link>
            </div>
          )}
        </div>
        <div className="block md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-4">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col space-y-4 mt-8">
                {currentNavItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-sm font-medium"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="border-t pt-4 flex flex-col space-y-4">
                  <div className="flex justify-center"></div>
                  {accessToken ? (
                    <LogoutButton />
                  ) : (
                    <div className="flex w-full gap-2">
                      <Link
                        href="/login"
                        className="text-lg font-medium w-full"
                      >
                        <Button className="w-full">Login</Button>
                      </Link>
                      <Link
                        href="/register"
                        className="text-lg font-medium w-full"
                      >
                        <Button className="w-full" variant="outline">
                          Register
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
