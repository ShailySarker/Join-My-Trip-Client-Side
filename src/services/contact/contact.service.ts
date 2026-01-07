/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export const createContact = async (data: Record<string, unknown>) => {
  try {
    const res = await serverFetch.post("/contact", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log(result);
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getAllContacts = async (query?: Record<string, unknown>) => {
  try {
    const params = new URLSearchParams();
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value) params.append(key, String(value));
      });
    }

    const res = await serverFetch.get(`/contact?${params.toString()}`, {
      next: { tags: ["contacts"] },
    });
    const result = await res.json();
    console.log(result);
    return result;
  } catch (error: any) {
    console.log(error);
    return Error(error.message);
  }
};

export const updateContactStatus = async (
  id: string,
  data: { status: string; adminResponse?: string }
) => {
  try {
    const res = await serverFetch.patch(`/contact/${id}`, {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return Error(error.message);
  }
};
