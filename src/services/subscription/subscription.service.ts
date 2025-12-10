"use server";

import { serverFetch } from "@/lib/server-fetch";

export const getAllSubscriptions = async () => {
  try {
    const res = await serverFetch.get("/subscription");

    return await res.json();
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return {
      success: false,
      message: "Failed to fetch subscriptions",
      data: [],
    };
  }
};
