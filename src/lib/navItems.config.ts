import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);

  return [
    {
      items: [
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
          roles: ["USER", "ADMIN", "SUPER_ADMIN"],
        },
      ],
    },
    // {
    //   title: "Settings",
    //   items: [
    //     {
    //       title: "My Profile",
    //       href: `/my-profile`,
    //       icon: "User",
    //       roles: ["USER", "ADMIN", "SUPER_ADMIN"],
    //     },
    //     {
    //       title: "Change Password",
    //       href: "/change-password",
    //       icon: "Settings",
    //       roles: ["USER", "ADMIN", "SUPER_ADMIN"],
    //     },
    //   ],
    // },
  ];
};

export const userNavItems: NavSection[] = [
  {
    title: "Travel Plans",
    items: [
      {
        title: "Explore Travel Plans",
        href: "/dashboard/explore-travel-plans",
        icon: "ExpandIcon",
        // badge: "3",
        roles: ["USER"],
      },
      {
        title: "My Travel Plans",
        href: "/dashboard/my-travel-plans",
        icon: "Calendar",
        // badge: "3",
        roles: ["USER"],
      },
    ],
  },
  {
    title: "Travelers",
    items: [
      {
        title: "Explore Travelers",
        href: "/dashboard/explore-travelers",
        icon: "Ratio",
        roles: ["USER"],
      },
    ],
  },
  {
    title: "My Network",
    items: [
      {
        title: "My Followers",
        href: "/dashboard/my-followers",
        icon: "UserPlus",
        roles: ["USER"],
      },
      {
        title: "My Followings",
        href: "/dashboard/my-followings",
        icon: "UserCheck",
        roles: ["USER"],
      },
    ],
  },
  {
    title: "Bookings",
    items: [
      {
        title: "My Bookings",
        href: "/dashboard/my-bookings",
        icon: "ClipboardCheck",
        roles: ["USER"],
      },
    ],
  },
  {
    title: "Payments",
    items: [
      {
        title: "Payment History",
        href: "/dashboard/payment-history",
        icon: "CreditCard",
        roles: ["USER"],
      },
    ],
  },
];

export const adminNavItems: NavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Users",
        href: "/admin/dashboard/manage-users",
        icon: "Users",
        roles: ["ADMIN", "SUPER_ADMIN"],
      },
    ],
  },
  {
    title: "Travel Plan Management",
    items: [
      {
        title: "Travel Plans",
        href: "/admin/dashboard/manage-travel-plans",
        icon: "Calendar",
        roles: ["ADMIN", "SUPER_ADMIN"],
      },
    ],
  },
  {
    title: "Subscription Plans",
    items: [
      {
        title: "Subscriptions",
        href: "/admin/dashboard/subscription-plans",
        icon: "ClipboardList",
        roles: ["ADMIN", "SUPER_ADMIN"],
      },
    ],
  },
  {
    title: "Payment History",
    items: [
      {
        title: "Payments",
        href: "/admin/dashboard/payment-history",
        icon: "CreditCard",
        roles: ["ADMIN", "SUPER_ADMIN"],
      },
    ],
  },
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case "SUPER_ADMIN":
      return [...commonNavItems, ...adminNavItems];
    case "ADMIN":
      return [...commonNavItems, ...adminNavItems];
    case "USER":
      return [...commonNavItems, ...userNavItems];
    default:
      return [];
  }
};
