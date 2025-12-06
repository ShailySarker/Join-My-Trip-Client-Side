"use client";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { verifyOTP, sendOTP } from "@/services/auth/otpHandler";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const VerifyOTPForm = () => {
  const [state, formAction, isPending] = useActionState(verifyOTP, null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";
  const fullnameParam = searchParams.get("fullname") || "";

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [resendCount, setResendCount] = useState(0);

  useEffect(() => {
    // Load resend count from localStorage on mount
    const savedCount = localStorage.getItem("otpResendCount");
    if (savedCount) {
      setResendCount(parseInt(savedCount, 10));
    }
  }, []);

  useEffect(() => {
    if (state) {
      if (state.success) {
        toast.success(state.message || "OTP verified successfully!");
        router.push("/login"); 
      } else if (state.message) {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
        if(otp[index] === "" && index > 0) {
             inputRefs.current[index - 1]?.focus();
        } else {
            const newOtp = [...otp];
            newOtp[index] = "";
            setOtp(newOtp);
        }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return; // Only allow digits

    const newOtp = [...otp];
    pastedData.split("").forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);
    
    // Focus the last filled input or the next empty one
    const focusIndex = Math.min(pastedData.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleResendOTP = async () => {
    if (resendCount >= 2) return;

    const formData = new FormData();
    formData.append("email", emailParam);
    formData.append("fullname", fullnameParam);

    try {
      const result = await sendOTP(null, formData);

      if (result.success) {
        toast.success("OTP Code Resent Successfully");
        setTimeLeft(120); // Reset timer
        const newCount = resendCount + 1;
        setResendCount(newCount);
        localStorage.setItem("otpResendCount", newCount.toString());
      } else {
        toast.error(result.message || "Failed to resend OTP");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to resend OTP");
    }
  };

  return (
    <form action={formAction}>
      <FieldGroup>
        <div className="grid gap-4">
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              defaultValue={state?.data?.email ?? emailParam}
              readOnly={!!emailParam}
              className={emailParam ? "bg-gray-100" : ""}
              required
            />
            <InputFieldError field="email" state={state} />
          </Field>

          <Field>
            <FieldLabel htmlFor="otp">OTP Code</FieldLabel>
            <div className="flex justify-between gap-2">
              {otp.map((data, index) => {
                return (
                  <Input
                    className="w-12 h-12 text-center text-lg"
                    type="text"
                    name={`otp-${index}`} 
                    key={index}
                    maxLength={1}
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste} // Add paste handler to the first input or all
                    ref={(el) => {
                        inputRefs.current[index] = el;
                    }}
                  />
                );
              })}
            </div>
            {/* Hidden input to store the full OTP for form submission */}
             <input type="hidden" name="otp" value={otp.join("")} />

             <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-muted-foreground">
                    Enter the 6-digit code sent to your email.
                </p>
                <div className="text-sm font-medium text-red-500">
                    Time Remaining: {formatTime(timeLeft)}
                 </div>
             </div>
            <InputFieldError field="otp" state={state} />
          </Field>
        </div>
        <FieldGroup className="mt-4">
          <Button type="submit" className="w-full" disabled={isPending || timeLeft === 0}>
            {isPending ? "Verifying..." : "Verify OTP"}
          </Button>
          {timeLeft === 0 && resendCount < 2 && (
            <Button
              type="button"
              variant="outline"
              className="w-full mt-2"
              onClick={handleResendOTP}
            >
              Resend OTP
            </Button>
          )}

          {timeLeft === 0 && resendCount < 2 && (
            <p className="text-center text-xs text-muted-foreground mt-1">
              You can resend OTP {2 - resendCount} more time(s).
            </p>
          )}

           {timeLeft === 0 && resendCount >= 2 && (
             <div className="space-y-2 mt-2">
               <p className="text-center text-sm text-red-500">
                 Maximum resend attempts reached.
               </p>
               <Button
                 type="button"
                 variant="outline"
                 className="w-full"
                 onClick={() =>
                   router.push(
                     `/send-otp?email=${encodeURIComponent(emailParam)}&fullname=${encodeURIComponent(fullnameParam)}`
                   )
                 }
               >
                 Back to Send OTP
               </Button>
             </div>
           )}
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default VerifyOTPForm;
