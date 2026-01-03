/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

/**
 * Create a review (only for completed trip participants)
 */
export const createReview = async (reviewData: {
  revieweeId: string;
  travelId: string;
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
export const getMyGivenReviews = async (searchParams?: Record<string, any>) => {
  try {
    const params = new URLSearchParams();
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, value.toString());
        }
      });
    }
    const response = await serverFetch.get(
      `/reviews/given-reviews?${params.toString()}`
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
 * Get reviews I received (written for current user)
 */
export const getMyReceivedReviews = async (
  searchParams?: Record<string, any>
) => {
  try {
    const params = new URLSearchParams();
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, value.toString());
        }
      });
    }
    const response = await serverFetch.get(
      `/reviews/received-reviews?${params.toString()}`
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
export const getAllReviews = async (searchParams?: Record<string, any>) => {
  try {
    const params = new URLSearchParams();
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, value.toString());
        }
      });
    }
    const response = await serverFetch.get(`/reviews?${params.toString()}`);
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
 * Get single review by ID
 */
export const getReviewById = async (id: string) => {
  try {
    const response = await serverFetch.get(`/reviews/${id}`);
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
