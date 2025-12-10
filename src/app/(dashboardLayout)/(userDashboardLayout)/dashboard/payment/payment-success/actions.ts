"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function handlePaymentSuccessRedirect() {
  // Invalidate all user-related caches
  revalidatePath("/", "layout");
  revalidatePath("/subscription");
  revalidatePath("/dashboard/my-subscription");
  revalidatePath("/dashboard/explore-travelers");
  
  // Small delay to ensure backend has processed the webhook
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Redirect to subscription page
  redirect("/dashboard/my-subscription");
}
