import SendOTPForm from "@/components/modules/auth/send-otp-form";
import React from "react";

const SendOTPPage = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Send OTP</h1>
          <p className="text-sm text-gray-500">
            Enter your details to receive an OTP.
          </p>
        </div>
        <React.Suspense fallback={<div>Loading...</div>}>
          <SendOTPForm />
        </React.Suspense>
      </div>
    </div>
  );
};

export default SendOTPPage;
