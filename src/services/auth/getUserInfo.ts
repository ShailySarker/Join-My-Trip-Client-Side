/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import jwt, { JwtPayload } from "jsonwebtoken";
import { serverFetch } from "@/lib/server-fetch";
import { getCookie } from "./tokenHandler";
import { IUser } from "@/types/user.interface";

export const getUserInfo = async (): Promise<IUser | any> => {
  let userInfo: IUser | any;
  try {
    const response = await serverFetch.get("/user/me", {
      next: {
        tags: ["user-info"],
        revalidate: 2, // Revalidate every 5 seconds for faster updates
      },
      // cache: "force-cache",
      // next: { tags: ["user-info"] },
    });

    const result = await response.json();

    if (result.success) {
      const accessToken = await getCookie("accessToken");

      if (!accessToken) {
        throw new Error("No access token found");
      }

      const verifiedToken = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_TOKEN_SECRET as string
      ) as JwtPayload;

      userInfo = {
        fullname: verifiedToken.fullname,
        email: verifiedToken.email,
        role: verifiedToken.role,
      };
    }

    userInfo = {
      fullname: result.data.fullname,
      ...result.data,
    };

    return userInfo;
  } catch (error: any) {
    // Re-throw NEXT_REDIRECT errors so Next.js can handle them
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    // console.log(error);
    // return {
    //   id: "",
    //   fullname: "Unknown User",
    //   email: "",
    //   role: "USER",
    // };
    return null;
  }
};
