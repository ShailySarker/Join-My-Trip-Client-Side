import VerifyOTPForm from "@/components/modules/auth/verify-otp-form";
import React, { Suspense } from "react";

const VerifyOTPPage = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-primary/20">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Verify OTP</h1>
          <p className="text-sm text-gray-500">
            Enter the OTP sent to your email.
          </p>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <VerifyOTPForm />
        </Suspense>
      </div>
    </div>
  );
};

export default VerifyOTPPage;
