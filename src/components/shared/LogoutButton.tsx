"use client";

import { logoutUser } from "@/services/auth/logoutUser";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const LogoutButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    const res = await logoutUser();
    if (res?.success) {
      toast.success(res?.message);
      router.push(`/login?redirect=${pathname}`);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      variant={"destructive"}
      className="cursor-pointer w-full"
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
