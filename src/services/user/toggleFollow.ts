"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";

interface IToggleFollowResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    isFollowing: boolean;
  };
}

export const toggleFollow = async (
  targetUserId: string
): Promise<IToggleFollowResponse> => {
  try {
    const response = await serverFetch.post(`/user/follow/${targetUserId}`);

    const result = await response.json();

    // Revalidate caches
    if (result.success) {
      revalidatePath("/dashboard/explore-travelers");
      revalidatePath("/dashboard/my-followers");
      revalidatePath("/dashboard/my-followings");
      revalidatePath("/admin/dashboard/manage-users");
    }

    return result;
  } catch (error) {
    console.error("Error toggling follow:", error);
    throw error;
  }
};
