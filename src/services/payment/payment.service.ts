"use server";

import { serverFetch } from "@/lib/server-fetch";

export const createPaymentIntent = async (subscriptionId: string) => {
  try {
    const res = await serverFetch.post("/payment/create-checkout-session", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subscriptionId }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Payment Error:", error);
    return { success: false, message: "Payment failed", data: null };
  }
};

export const getMyPaymentHistory = async (): Promise<PaymentItem[]> => {
  try {
    const res = await serverFetch.get("/payment/history");
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Fetch My Payment Error:", error);
    return [];
  }
};

// ADMIN → GET /payment
export const getAllPaymentHistory = async (): Promise<PaymentItem[]> => {
  try {
    const res = await serverFetch.get("/payment");
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Fetch All Payments Error:", error);
    return [];
  }
};
