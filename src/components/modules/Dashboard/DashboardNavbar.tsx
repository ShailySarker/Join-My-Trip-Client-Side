import { getUserInfo } from "@/services/auth/getUserInfo";
import DashboardNavbarContent from "./DashboardNavbarContent";
import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { IUser } from "@/types/user.interface";
import { getNavItemsByRole } from "@/lib/navItems.config";

const DashboardNavbar = async () => {
  const userInfo = (await getUserInfo()) as IUser;

  const navItems: NavSection[] = getNavItemsByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo.role);

  return (
    <DashboardNavbarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardNavbar;
