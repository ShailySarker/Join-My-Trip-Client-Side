export type UserRole = "SUPER_ADMIN" | "ADMIN" | "USER";

export type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

export const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/send-otp",
  "/verify-otp",
];

export const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-profile", "change-password"],
  patterns: [], // [/password/change-password, /password/reset-password => /password/*]
};

export const adminProtectedRoutes: RouteConfig = {
  patterns: [/^\/admin/], // Routes starting with /admin/*
  exact: [], // "/admins"
};

export const userProtectedRoutes: RouteConfig = {
  patterns: [/^\/dashboard/], // Routes starting with /dashboard/*
  exact: [], // "/dashboard"
};

export const isAuthRoute = (pathname: string) => {
  return authRoutes.some((route: string) => {
    // return route.startsWith(pathname);
    return route === pathname;
  });
};

export const isRouteMatches = (
  pathname: string,
  routes: RouteConfig
): boolean => {
  if (routes.exact.includes(pathname)) {
    return true;
  }
  return routes.patterns.some((pattern: RegExp) => pattern.test(pathname));
  // if pathname === /dashboard/my-appointments => matches /^\/dashboard/ => true
};

export const getRouteOwner = (
  pathname: string
): "ADMIN" | "SUPER_ADMIN" | "USER" | "COMMON" | null => {
  if (isRouteMatches(pathname, adminProtectedRoutes)) {
    return "ADMIN";
  }
  if (isRouteMatches(pathname, adminProtectedRoutes)) {
    return "SUPER_ADMIN";
  }
  if (isRouteMatches(pathname, userProtectedRoutes)) {
    return "USER";
  }
  if (isRouteMatches(pathname, commonProtectedRoutes)) {
    return "COMMON";
  }
  return null;
};

export const getDefaultDashboardRoute = (role: UserRole): string => {
  if (role === "ADMIN" || role === "SUPER_ADMIN") {
    return "/admin/dashboard";
  }
  if (role === "USER") {
    return "/dashboard";
  }
  return "/";
};

export const isValidRedirectForRole = (
  redirectPath: string,
  role: UserRole
): boolean => {
  const routeOwner = getRouteOwner(redirectPath);

  if (routeOwner === null || routeOwner === "COMMON") {
    return true;
  }

  if (routeOwner === role) {
    return true;
  }

  if (routeOwner === "ADMIN" && role === "SUPER_ADMIN") {
      return true;
  }

  return false;
};
