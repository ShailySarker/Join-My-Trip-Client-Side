"use client";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { sendOTP } from "@/services/auth/otpHandler";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const SendOTPForm = () => {
  const [state, formAction, isPending] = useActionState(sendOTP, null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const fullnameParam = searchParams.get("fullname") || "";
  const emailParam = searchParams.get("email") || "";

  useEffect(() => {
    if (state) {
      if (state.success) {
        toast.success(state.message || "OTP sent successfully!");
        const email = state?.data?.email || emailParam;
        const fullname = state?.data?.fullname || fullnameParam;

        if (email) {
          router.push(
            `/verify-otp?email=${encodeURIComponent(
              email
            )}&fullname=${encodeURIComponent(fullname)}`
          );
        } else {
          router.push("/verify-otp");
        }
      } else if (state.message) {
        toast.error(state.message);
      }
    }
  }, [state, router, emailParam, fullnameParam]);

  return (
    <form action={formAction}>
      <FieldGroup>
        <div className="grid gap-4">
          <Field>
            <FieldLabel htmlFor="fullname">Full Name</FieldLabel>
            <Input
              id="fullname"
              name="fullname"
              type="text"
              placeholder="Your Name"
              defaultValue={state?.data?.fullname ?? fullnameParam}
              readOnly={!!fullnameParam}
              className={fullnameParam ? "bg-gray-100 cursor-not-allowed" : ""}
              required
            />
            <InputFieldError field="fullname" state={state} />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              defaultValue={state?.data?.email ?? emailParam}
              readOnly={!!emailParam}
              className={emailParam ? "bg-gray-100 cursor-not-allowed" : ""}
              required
            />
            <InputFieldError field="email" state={state} />
          </Field>
        </div>
        <FieldGroup className="mt-4">
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Sending OTP..." : "Send OTP"}
          </Button>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default SendOTPForm;
