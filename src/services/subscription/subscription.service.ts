"use server";

import { serverFetch } from "@/lib/server-fetch";

export const getAllSubscriptions = async () => {
  try {
    const res = await serverFetch.get("/subscription", {
      cache: "force-cache",
      next: { tags: ["user-info"] },
    });

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

// revalidateTag("user-info", { expire: 0 }); ===update time
// cache: "force-cache",
// next: { tags: ["user-info"] }, =========get time
