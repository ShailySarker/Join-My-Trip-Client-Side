import { Button } from "../ui/button";
import Link from "next/link";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";

const Navbar = () => {
  const navItems = [
    // { label: "Home", href: "/" },
    { label: "Explore Travelers", href: "/explore-travelers" },
    { label: "Find Travel Buddy", href: "/find-travel-buddy" },
    { label: "About Us", href: "/about-us" },
    // { label: "NGOs", href: "/ngos" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur dark:bg-background/95">
      <div className="xl:mx-12 lg:mx-8 md:mx-6 mx-5 flex h-16 items-center justify-between">
        <div>
          <Link
            href="/"
            className="flex items-center justify-center text-xl font-bold text-primary"
          >
            Join My Trip
          </Link>
        </div>

        <nav className="md:block hidden">
          <ul className="flex gap-6">
            {navItems?.map((item) => (
              <li key={item?.label}>
                <Link href={item?.href}>{item?.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:block hidden md:flex gap-2">
          {/* {accessToken ? (
            <LogoutButton />
          ) : ( */}
          <Link href="/login">
            <Button>Login</Button>
          </Link>
          <Link href="/register" className="text-lg font-medium">
            <Button variant="outline">Register</Button>
          </Link>
          {/* )} */}
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
                {navItems.map((item) => (
                  <Link
                    key={item?.label}
                    href={item?.href}
                    className="text-sm font-medium"
                  >
                    {item?.label}
                  </Link>
                ))}
                <div className="border-t pt-4 flex flex-col space-y-4">
                  <div className="flex justify-center"></div>
                  {/* {accessToken ? (
                    <LogoutButton />
                  ) : ( */}
                  <div className="flex w-full gap-2">
                    <Link href="/login" className="text-lg font-medium w-full">
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
                  {/* )} */}
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
