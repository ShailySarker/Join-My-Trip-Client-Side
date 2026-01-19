"use server";

import { serverFetch } from "@/lib/server-fetch";

export async function forgotPassword(email: string) {
  try {
    const response = await serverFetch.post("/auth/forgot-password", {
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
    console.log(error);
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
}

export async function resetPassword(data: {
  password: string;
  token: string;
  userId: string;
}) {
  try {
    const response = await serverFetch.post("/auth/reset-password", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${data.token}`,
      },
      body: JSON.stringify({
        newPassword: data.password,
        id: data.userId,
      }),
    });

    const result = await response.json();
    console.log(result);
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
