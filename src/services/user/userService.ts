"use server";

import { serverFetch } from "@/lib/server-fetch";
import { IUser } from "@/types/user.interface";

// Response types
export interface IUserResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IUser[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export interface ISingleUserResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IUser;
}

export interface IToggleFollowResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    isFollowing: boolean;
  };
}

// Get all users with query parameters (search, filter, sorting, pagination)
export const getAllUsers = async (
  queryParams?: Record<string, string>
): Promise<IUserResponse> => {
  try {
    const params = new URLSearchParams(queryParams);
    const response = await serverFetch.get(`/user?${params.toString()}`, {
      next: { tags: ["users"] },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Get single user by ID
export const getSingleUser = async (
  userId: string
): Promise<ISingleUserResponse> => {
  try {
    const response = await serverFetch.get(`/user/${userId}`, {
      next: { tags: ["user", userId] },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// Get my followers
export const getMyFollowers = async (): Promise<IUserResponse> => {
  try {
    const response = await serverFetch.get("/user/my-followers", {
      next: { tags: ["my-followers"] },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching followers:", error);
    throw error;
  }
};

// Get my followings
export const getMyFollowings = async (): Promise<IUserResponse> => {
  try {
    const response = await serverFetch.get("/user/my-followings", {
      next: { tags: ["my-followings"] },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching followings:", error);
    throw error;
  }
};

// Delete user (Admin only)
export const deleteSingleUser = async (
  userId: string
): Promise<ISingleUserResponse> => {
  try {
    const response = await serverFetch.delete(`/user/${userId}`);

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
