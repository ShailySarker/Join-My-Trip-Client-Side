/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import {
  IParticipantDetails,
  ITravelPlan,
  ITrevelIsApproved,
} from "@/types/travelPlan.interface";
import { revalidateTag } from "next/cache";

// Create new travel plan (USER only, requires subscription)
export const createTravelPlan = async (payload: any, file: File) => {
  try {
    const uploadFormData = new FormData();

    // Add the data as JSON string
    uploadFormData.append("data", JSON.stringify(payload));

    // Add the file if it exists
    if (file) {
      uploadFormData.append("image", file);
    }

    const response = await serverFetch.post("/travel-plan", {
      body: uploadFormData,
    });

    const result = await response.json();

    revalidateTag("user-info", { expire: 0 });
    revalidateTag("travel-plans", { expire: 0 });

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
};

// Get user's own travel plans
export const getMyTravelPlans = async (
  queryParams?: Record<string, string>
): Promise<ITravelPlan> => {
  try {
    const params = new URLSearchParams(queryParams);
    const response = await serverFetch.get(
      `/travel-plan/my-travel-plans?${params.toString()}`,
      {
        next: { tags: ["user-info", "travel-plans"] },
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

/**
 * Get all public travel plans (approved & upcoming only)
 * Supports search, filter, sort, pagination
 */
export const getAllTravelPlansPublic = async (
  queryParams?: Record<string, string>
): Promise<any> => {
  try {
    const params = new URLSearchParams(queryParams);
    const response = await serverFetch.get(
      `/travel-plan?${params.toString()}`,
      {
        next: { tags: ["travel-plans"] },
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Get all travel plans for admin (includes pending/rejected)
export const getAllTravelPlansAdmin = async (
  queryParams?: Record<string, string>
): Promise<any> => {
  try {
    const params = new URLSearchParams(queryParams);
    console.log(params);
    const response = await serverFetch.get(
      `/travel-plan/all-travel-plans?${params.toString()}`,
      {
        next: { tags: ["travel-plans"] },
      }
    );

    const result = await response.json();
    // console.log(result);
    return result;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Get single travel plan by ID
export const getTravelPlanById = async (id: string) => {
  try {
    const response = await serverFetch.get(`/travel-plan/${id}`);
    const result = await response.json();
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
};

// Update travel plan (USER only, before approval)
export const updateTravelPlan = async (payload: any, file?: File) => {
  try {
    const uploadFormData = new FormData();

    // Add the data as JSON string
    uploadFormData.append("data", JSON.stringify(payload));

    // Add the file if it exists
    if (file) {
      uploadFormData.append("image", file);
    }

    const response = await serverFetch.patch(`/travel-plan/${payload.id}`, {
      body: uploadFormData,
    });

    const result = await response.json();

    revalidateTag("user-info", { expire: 0 });
    revalidateTag("travel-plans", { expire: 0 });

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
};

// Cancel travel plan (USER only)
export const cancelTravelPlan = async (id: string) => {
  try {
    const response = await serverFetch.patch(`/travel-plan/cancel-tour/${id}`);

    const result = await response.json();
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
};

/**
 * Approve/Reject travel plan (ADMIN only)
 */
export const approveTravelPlan = async (
  id: string,
  isApproved: ITrevelIsApproved
) => {
  try {
    const response = await serverFetch.patch(
      `/travel-plan/approve-tour/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isApproved }),
      }
    );
    const result = await response.json();
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
};

/**
 * Add participant to travel plan (before booking)
 */
export const addParticipant = async (
  travelId: string,
  participant: IParticipantDetails
) => {
  try {
    const response = await serverFetch.post(
      `/travel-plans/${travelId}/participants`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(participant),
      }
    );
    const result = await response.json();
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
};

/**
 * Remove participant from travel plan
 */
export const removeParticipant = async (travelId: string, phone: string) => {
  try {
    const response = await serverFetch.delete(
      `/travel-plans/${travelId}/participants/${phone}`
    );
    const result = await response.json();
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
};
