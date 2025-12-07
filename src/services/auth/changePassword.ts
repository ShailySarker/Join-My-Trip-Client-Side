/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { changePasswordValidationSchema } from "@/zod/auth.validation";

export const changePassword = async (
  _currentState: any,
  formData: FormData
) => {
  try {
    const payload = {
      oldPassword: formData.get("oldPassword"),
      newPassword: formData.get("newPassword"),
      confirmPassword: formData.get("confirmPassword"),
    };

    const validationResult = zodValidator(
        payload,
        changePasswordValidationSchema
      );
  
      if (!validationResult.success) {
        return {
          ...validationResult,
          data: payload,
        };
      }

    const { confirmPassword, ...dataToSend } = payload;

    const res = await serverFetch.post("/auth/change-password", {
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to change password",
        data: payload,
      };
    }

    return {
      success: true,
      message: "Password changed successfully",
      data: {}, // Clear form on success
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong",
      data: {
        oldPassword: formData.get("oldPassword"),
        newPassword: formData.get("newPassword"),
        confirmPassword: formData.get("confirmPassword"),
      },
    };
  }
};
