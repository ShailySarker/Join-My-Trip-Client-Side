"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import {
  sendOTPValidationSchema,
  verifyOTPValidationSchema,
} from "@/zod/auth.validation";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const sendOTP = async (_currentState: any, formData: any) => {
  const payload = {
    fullname: formData.get("fullname"),
    email: formData.get("email"),
  };

  const validation = zodValidator(payload, sendOTPValidationSchema);

  if (!validation.success) {
    return {
      success: false,
      message: "Validation Error",
      data: payload,
      errors: validation.errors,
    };
  }

  try {
    const res = await serverFetch.post("/otp/send", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to send OTP",
    };
  }
};

export const verifyOTP = async (_currentState: any, formData: any) => {
  const payload = {
    email: formData.get("email"),
    otp: formData.get("otp"),
  };

  const validation = zodValidator(payload, verifyOTPValidationSchema);

  if (!validation.success) {
    return {
      success: false,
      message: "Validation Error",
      data: payload,
      errors: validation.errors,
    };
  }

  try {
    const res = await serverFetch.post("/otp/verify", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to verify OTP",
    };
  }
};
