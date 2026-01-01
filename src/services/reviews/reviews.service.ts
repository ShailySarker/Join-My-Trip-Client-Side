/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

/**
 * Create a review (only for completed trip participants)
 */
export const createReview = async (reviewData: {
  reviewedUserId: string;
  travelPlanId: string;
  rating: number;
  comment: string;
}) => {
  try {
    const response = await serverFetch.post("/reviews", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });
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
 * Update own review
 */
export const updateReview = async (
  id: string,
  reviewData: {
    rating?: number;
    comment?: string;
  }
) => {
  try {
    const response = await serverFetch.patch(`/reviews/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });
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
 * Delete own review
 */
export const deleteReview = async (id: string) => {
  try {
    const response = await serverFetch.delete(`/reviews/${id}`);
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
 * Get reviews I gave (written by current user)
 */
export const getMyGivenReviews = async () => {
  try {
    const response = await serverFetch.get("/reviews/my-given-reviews");
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
 * Get reviews I received (written for current user)
 */
export const getMyReceivedReviews = async () => {
  try {
    const response = await serverFetch.get("/reviews/received-reviews");
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
 * Get reviews for a specific user (public)
 */
export const getUserReviews = async (userId: string) => {
  try {
    const response = await serverFetch.get(`/reviews/user/${userId}`);
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
 * Get all reviews (ADMIN only)
 */
export const getAllReviews = async () => {
  try {
    const response = await serverFetch.get("/reviews");
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
