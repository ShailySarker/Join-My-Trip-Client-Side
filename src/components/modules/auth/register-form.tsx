"use client";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/auth/registerUser";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(registerUser, null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (state) {
      if (state.success) {
        toast.success("Registration successful!");
        router.push(
          `/send-otp?email=${state.data.email}&fullname=${state.data.fullname}`,
        );
      } else if (state.message) {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  return (
    <form ref={formRef} action={formAction}>
      <FieldGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:gap-4 lg:gap-3.5 gap-4 xl:mt-2 lg:mt-0 md:mt-1">
          {/* full Name */}
          <Field className="flex flex-col xl:gap-3 lg:gap-1 gap-2">
            <FieldLabel htmlFor="fullname">Full Name</FieldLabel>
            <Input
              id="fullname"
              name="fullname"
              type="text"
              placeholder="John Doe"
              defaultValue={state?.data?.fullname ?? ""}
            />
            <InputFieldError field="fullname" state={state} />
          </Field>
          {/* Gender */}
          <Field className="flex flex-col xl:gap-3 lg:gap-1 gap-2">
            <FieldLabel htmlFor="gender">Gender</FieldLabel>
            <Select name="gender" defaultValue={state?.data?.gender ?? ""}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
              </SelectContent>
            </Select>{" "}
            <InputFieldError field="gender" state={state} />
          </Field>
          {/* Email */}
          <Field className="flex flex-col xl:gap-3 lg:gap-1 gap-2">
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              defaultValue={state?.data?.email ?? ""}
            />
            <InputFieldError field="email" state={state} />
          </Field>
          <Field className="flex flex-col xl:gap-3 lg:gap-1 gap-2">
            <FieldLabel htmlFor="phone">Phone</FieldLabel>
            <Input
              id="phone"
              name="phone"
              type="phone"
              placeholder="01XXXXXXXXX"
              defaultValue={state?.data?.phone ?? ""}
            />
            <InputFieldError field="phone" state={state} />
          </Field>
          {/* city */}
          <Field className="flex flex-col xl:gap-3 lg:gap-1 gap-2">
            <FieldLabel htmlFor="city">City</FieldLabel>
            <Input
              id="city"
              name="city"
              type="text"
              placeholder="123 Main St, Dhaka"
              defaultValue={state?.data?.city ?? ""}
            />
            <InputFieldError field="city" state={state} />
          </Field>
          {/* country */}
          <Field className="flex flex-col xl:gap-3 lg:gap-1 gap-2">
            <FieldLabel htmlFor="country">Country</FieldLabel>
            <Input
              id="country"
              name="country"
              type="text"
              placeholder="Bangladesh"
              defaultValue={state?.data?.country ?? ""}
            />
            <InputFieldError field="country" state={state} />
          </Field>
          {/* Password */}
          <Field className="flex flex-col xl:gap-3 lg:gap-1 gap-2">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="**********"
              defaultValue={state?.data?.password ?? ""}
            />
            <InputFieldError field="password" state={state} />
          </Field>
          {/* Confirm Password */}
          <Field className="flex flex-col xl:gap-3 lg:gap-1 gap-2">
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="**********"
              defaultValue={state?.data?.confirmPassword ?? ""}
            />
            <InputFieldError field="confirmPassword" state={state} />
          </Field>
        </div>
        <FieldGroup className="xl:mt-4 lg:mt-0 md:mt-2 mt-1">
          <Field className="flex flex-col xl:gap-3 lg:gap-1 gap-2">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating Account..." : "Create Account"}
            </Button>

            <FieldDescription className="px-6 text-center">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-primary font-semibold hover:underline"
              >
                Sign in
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;
