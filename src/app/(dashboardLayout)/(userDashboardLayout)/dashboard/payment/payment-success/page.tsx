"use client";

import { useEffect, useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { handlePaymentSuccessRedirect } from "./actions";

export default function PaymentSuccessPage() {
  const [status, setStatus] = useState<"processing" | "redirecting">("processing");

  useEffect(() => {
    // Wait 3 seconds for backend to process subscription update
    const timer = setTimeout(async () => {
      setStatus("redirecting");
      
      // Call server action to invalidate cache and redirect
      // This happens on the server, ensuring cache is cleared before redirect
      await handlePaymentSuccessRedirect();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      {status === "processing" ? (
        <>
          <Loader2 className="w-16 h-16 text-primary animate-spin mb-6" />
          <h1 className="text-2xl font-bold mb-2">Processing Your Payment</h1>
          <p className="text-muted-foreground text-center max-w-md">
            Please wait while we activate your subscription...
          </p>
        </>
      ) : (
        <>
          <CheckCircle2 className="w-16 h-16 text-green-600 mb-6" />
          <h1 className="text-3xl font-bold text-green-600 mb-2">
            Payment Successful! 🎉
          </h1>
          <p className="text-muted-foreground mb-4">
            Your subscription is now active.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Redirecting to your subscription...
          </p>
        </>
      )}
    </div>
  );
}
