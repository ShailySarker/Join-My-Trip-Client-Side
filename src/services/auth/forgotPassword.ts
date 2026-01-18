"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function forgotPassword(email: string) {
  try {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!data.success) {
      return {
        success: false,
        message: data.message || "Failed to send reset email",
      };
    }

    return {
      success: true,
      message: "Password reset link has been sent to your email",
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
}

export async function resetPassword(
  data: { password: string; token: string; userId: string }
) {
  try {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
      body: JSON.stringify({ 
        password: data.password,
        id: data.userId 
      }),
    });

    const result = await response.json();

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to reset password",
      };
    }

    return {
      success: true,
      message: "Password has been reset successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
}
