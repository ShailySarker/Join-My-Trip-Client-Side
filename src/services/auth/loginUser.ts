/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { parse } from "cookie";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  getDefaultDashboardRoute,
  isValidRedirectForRole,
  UserRole,
} from "@/lib/auth-utils";
import { setCookie } from "./tokenHandler";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { loginValidationZodSchema } from "@/zod/auth.validation";

export const loginUser = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  try {
    const redirectTo = formData.get("redirect") || null;
    // console.log(redirect, "redirect from server action");
    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;

    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const validationResult = zodValidator(payload, loginValidationZodSchema);
    if (!validationResult.success) {
      return {
        ...validationResult,
        data: {
          email: payload.email,
        },
      };
    }

    const validatedPayload = zodValidator(
      payload,
      loginValidationZodSchema
    ).data;

    const res = await serverFetch.post("/auth/login", {
      body: JSON.stringify(validatedPayload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    if (!result.success) {
      throw new Error(result.message || "Login failed");
    }

    const setCookieHeader = res.headers.getSetCookie();

    if (setCookieHeader && setCookieHeader.length > 0) {
      setCookieHeader.forEach((cookie: string) => {
        const parsedCookie = parse(cookie);

        if (parsedCookie["accessToken"]) {
          accessTokenObject = parsedCookie;
        }
        if (parsedCookie["refreshToken"]) {
          refreshTokenObject = parsedCookie;
        }
      });
    } else {
      throw new Error("No set-cookie header found");
    }

    if (!accessTokenObject) {
      throw new Error("Access token not found in cookies");
    }
    if (!refreshTokenObject) {
      throw new Error("Refresh token not found in cookies");
    }

    await setCookie("accessToken", accessTokenObject.accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(accessTokenObject["Max-Age"]) || 1000 * 60 * 60,
      path: accessTokenObject.Path || "/",
      sameSite: accessTokenObject["SameSite"] || "none",
    });

    await setCookie("refreshToken", refreshTokenObject.refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge:
        parseInt(refreshTokenObject["Max-Age"]) || 1000 * 60 * 60 * 24 * 90,
      path: refreshTokenObject.Path || "/",
      sameSite: refreshTokenObject["SameSite"] || "none",
    });

    const verifiedToken: string | JwtPayload = jwt.verify(
      accessTokenObject.accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET as string
    );

    if (typeof verifiedToken === "string") {
      throw new Error("Invalid token");
    }

    const userRole: UserRole = verifiedToken.role;

    
    if (redirectTo) {
      const requestedPath = redirectTo.toString();
      if (isValidRedirectForRole(requestedPath, userRole)) {
        return {
          success: true,
          message: "Login Successful",
          redirectUrl: requestedPath,
        };
      } else {
         return {
          success: true,
           message: "Login Successful",
          redirectUrl: getDefaultDashboardRoute(userRole),
        };
      }
    } else {
       return {
          success: true,
           message: "Login Successful",
          redirectUrl: getDefaultDashboardRoute(userRole),
        };
    }

  } catch (error: any) {
    // Re-throw NEXT_REDIRECT errors so Next.js can handle them
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Login Failed. You might have entered incorrect email or password."
      }`,
      redirectUrl: error.message.includes("not verified")
        ? `/send-otp?email=${formData.get("email")}`
        : null,
      data: {
        email: formData.get("email"),
      },
    };
  }
};
