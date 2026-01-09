/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { IParticipantDetails } from "@/types/travelPlan.interface";

/**
 * Create a new booking with participants
 */
export const createBooking = async (bookingData: {
  travelId: string;
  amount: number;
  totalPeople: number;
  participants: IParticipantDetails[];
}) => {
  try {
    const response = await serverFetch.post("/bookings", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
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
 * Get current user's bookings
 */
export const getMyBookings = async (query: Record<string, any> = {}) => {
  try {
    const params = new URLSearchParams();

    Object.keys(query).forEach((key) => {
      if (
        query[key] !== undefined &&
        query[key] !== null &&
        query[key] !== ""
      ) {
        params.append(key, query[key].toString());
      }
    });

    const response = await serverFetch.get(
      `/bookings/my-bookings?${params.toString()}`
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
 * Get all bookings (ADMIN only)
 */
export const getAllBookings = async (query: Record<string, any> = {}) => {
  try {
    const params = new URLSearchParams();
    Object.keys(query).forEach((key) => {
      if (
        query[key] !== undefined &&
        query[key] !== null &&
        query[key] !== ""
      ) {
        params.append(key, query[key].toString());
      }
    });

    const response = await serverFetch.get(`/bookings?${params.toString()}`);
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
 * Get single booking by ID
 */
export const getBookingById = async (id: string) => {
  try {
    const response = await serverFetch.get(`/bookings/${id}`);
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
 * Cancel booking
 */
export const cancelBooking = async (id: string) => {
  try {
    const response = await serverFetch.patch(`/bookings/${id}/cancel`);
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
 * Add participants to existing booking
 */
export const addParticipantsToBooking = async (
  bookingId: string,
  participants: IParticipantDetails[]
) => {
  try {
    const response = await serverFetch.patch(
      `/bookings/${bookingId}/participants`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ participants }),
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
 * Remove participant from booking
 */
export const removeParticipantFromBooking = async (
  bookingId: string,
  phone: string
) => {
  try {
    const response = await serverFetch.delete(
      `/bookings/${bookingId}/participants/${phone}`
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
