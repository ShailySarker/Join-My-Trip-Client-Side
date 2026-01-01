import LogoutButton from "@/components/shared/LogoutButton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IUser } from "@/types/user.interface";
import {
  ArrowLeftToLine,
  ArrowRightToLine,
  Settings,
  Shield,
  ShieldCheck,
  ShieldCheckIcon,
  User,
} from "lucide-react";
import Link from "next/link";

interface UserDropdownProps {
  userInfo: IUser;
}

const UserDropdown = ({ userInfo }: UserDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* {userInfo.subscriptionInfo?.status === "ACTIVE" ? (
          <div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-primary text-white"
            >
              <span className="text-sm xl:text-base font-semibold">
                {userInfo.fullname.charAt(0).toUpperCase()}
              </span>
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-primary text-white"
          >
            <span className="text-sm xl:text-base font-semibold">
              {userInfo.fullname.charAt(0).toUpperCase()}
            </span>
          </Button>
        )} */}

        {userInfo.role === "USER" &&
        userInfo.subscriptionInfo?.status === "ACTIVE" &&
        (userInfo.subscriptionInfo?.plan === "MONTHLY" ||
          userInfo.subscriptionInfo?.plan === "YEARLY") ? (
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-primary/30 blur-md"></div>

            <Button
              variant="outline"
              size="icon-sm"
              className="relative rounded-full shadow-lg bg-primary text-white"
            >
              <span className="text-xs xl:text-sm font-semibold">
                {userInfo.fullname.charAt(0).toUpperCase()}
              </span>
            </Button>

            <Shield className="absolute xl:h-14 h-13.5 xl:w-14 w-13.5 xl:-bottom-3 -bottom-[11px] xl:-right-3 -right-[11px] text-primary drop-shadow" />
          </div>
        ) : (
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-gray-300 text-black"
          >
            <span className="text-sm xl:text-base font-semibold">
              {userInfo.fullname.charAt(0).toUpperCase()}
            </span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium flex items-center gap-1">
              {userInfo.fullname}
              {userInfo.role === "USER" &&
                userInfo.subscriptionInfo?.status === "ACTIVE" &&
                (userInfo.subscriptionInfo?.plan === "MONTHLY" ||
                  userInfo.subscriptionInfo?.plan === "YEARLY") && (
                  <ShieldCheck className="h-4 w-4 text-primary" />
                )}
            </p>
            <p className="text-xs text-muted-foreground">{userInfo.email}</p>
            <p className="text-xs text-primary capitalize">
              {userInfo.role.toLowerCase()}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={"/my-profile"} className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            My Profile
          </Link>
        </DropdownMenuItem>
        {userInfo.role === "USER" &&
          userInfo.subscriptionInfo?.status === "ACTIVE" &&
          (userInfo.subscriptionInfo?.plan === "MONTHLY" ||
            userInfo.subscriptionInfo?.plan === "YEARLY") && (
            <DropdownMenuItem asChild>
              <Link
                href={"/dashboard/my-subscription"}
                className="cursor-pointer"
              >
                <ShieldCheckIcon className="mr-2 h-4 w-4" />
                My Subscription Plan
              </Link>
            </DropdownMenuItem>
          )}

        {userInfo.role === "USER" && (
          <>
            <DropdownMenuItem asChild>
              <Link
                href={"/dashboard/received-reviews"}
                className="cursor-pointer"
              >
                <ArrowRightToLine className="mr-2 h-4 w-4" />
                Received Reviews
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={"/dashboard/given-reviews"}
                className="cursor-pointer"
              >
                <ArrowLeftToLine className="mr-2 h-4 w-4" />
                Given Reviews
              </Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem asChild>
          <Link href={"/change-password"} className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            Change Password
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
        // onClick={handleLogout}
        // className="cursor-pointer text-red-600"
        >
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
