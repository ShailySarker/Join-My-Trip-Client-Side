"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { registerUserValidationZodSchema } from "@/zod/auth.validation";

export const registerUser = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  let payload;
  try {
    payload = {
      fullname: formData.get("fullname"),
      gender: formData.get("gender"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      city: formData.get("city"),
      country: formData.get("country"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    const validationResult = zodValidator(
      payload,
      registerUserValidationZodSchema
    );

    if (validationResult.success === false) {
      const errorResponse = {
        ...validationResult,
        data: payload, // Preserve form data for re-population
      };
      return errorResponse;
    }

    // At this point, validation succeeded, so data must exist
    if (!validationResult.data) {
      return {
        success: false,
        message: "Validation succeeded but no data returned",
        data: payload,
      };
    }

    const validatedPayload: any = validationResult.data;

    const registerData = {
      fullname: validatedPayload.fullname,
      gender: validatedPayload.gender,
      email: validatedPayload.email,
      phone: validatedPayload.phone,
      password: validatedPayload.password,
      currentLocation: {
        city: validatedPayload.city,
        country: validatedPayload.country,
      },
    };

    const res = await serverFetch.post("/user/register", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });

    const result = await res.json();

    if (result.success) {
      return result;
    }

    const failureResponse = {
      ...result,
      data: payload, // Preserve form data even on API errors
    };
    return failureResponse;
  } catch (error: any) {
    // Re-throw NEXT_REDIRECT errors so Next.js can handle them
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      console.log("↪️ Re-throwing NEXT_REDIRECT");
      throw error;
    }
    console.log(error);
    const errorResponse = {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Registration failed. Please try again."
      }`,
      data: payload, // Preserve form data even on unexpected errors
    };
    return errorResponse;
  }
};
