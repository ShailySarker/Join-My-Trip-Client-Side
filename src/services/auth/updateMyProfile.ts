/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

export async function updateMyProfile(payload: any, file?: File) {
  try {
    const uploadFormData = new FormData();

    // Add the data as JSON string
    uploadFormData.append("data", JSON.stringify(payload));

    // Add the file if it exists
    if (file) {
      uploadFormData.append("profilePhoto", file);
    }

    const response = await serverFetch.patch(`/user/me`, {
      body: uploadFormData,
    });

    const result = await response.json();

    revalidateTag("user-info", { expire: 0 });

    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}
