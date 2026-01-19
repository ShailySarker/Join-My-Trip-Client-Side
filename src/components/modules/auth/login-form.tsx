"use client";

import { useActionState, useEffect, useRef } from "react";
import { loginUser } from "@/services/auth/loginUser";
import { toast } from "sonner";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [state, formAction, isPending] = useActionState(loginUser, null);
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state) {
      if (state.redirectUrl) {
        if (state.success) {
          toast.success(state.message || "Login Successful");
          // Small delay to ensure cookies are set and toast is seen
          setTimeout(() => {
            // Force a hard reload to ensure cookies are sent and middleware allows access
            window.location.href = state.redirectUrl;
          }, 500);
        } else {
          toast.error(state.message);
          router.push(state.redirectUrl);
        }
      } else if (!state.success && state.message) {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  // Demo login auto-fill
  const handleDemoLogin = (role: "user" | "admin") => {
    if (emailRef.current && passwordRef.current) {
      if (role === "admin") {
        emailRef.current.value = "admin@gmail.com";
        passwordRef.current.value = "Test@123";
        toast.info("Admin credentials filled!");
      } else {
        emailRef.current.value = "user@gmail.com";
        passwordRef.current.value = "Test@123";
        toast.info("User credentials filled!");
      }
    }
  };

  // Google OAuth handler - uses actual backend endpoint
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleGoogleLogin = () => {
    const API_URL =
      process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:2000/api/v1";
    const redirectPath = redirect || "/";
    // Redirect to backend Google OAuth endpoint
    window.location.href = `${API_URL}/auth/google?redirect=${encodeURIComponent(redirectPath)}`;
  };

  return (
    <div className="xl:space-y-6 md:space-y-5 space-y-4 xl:mt-2 lg:mt-1 md:mt-6 mt-6">
      <form action={formAction}>
        {redirect && <input type="hidden" name="redirect" value={redirect} />}
        <FieldGroup>
          <div className="grid grid-cols-1 gap-4">
            {/* Email */}
            <Field className="flex flex-col xl:gap-3 lg:gap-1 gap-2">
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                ref={emailRef}
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                defaultValue={state?.data?.email || ""}
                key={state?.data?.email}
              />
              <InputFieldError field="email" state={state} />
            </Field>
            {/* Password */}
            <Field className="flex flex-col xl:gap-3 lg:gap-1 gap-2">
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <Input
                ref={passwordRef}
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
              />
              <InputFieldError field="password" state={state} />
            </Field>
          </div>
          <FieldGroup className="xl:mt-6 mt-2">
            <Field className="flex flex-col xl:gap-3 lg:gap-1 gap-2">
              <div className="space-y-3">
                <Button type="submit" disabled={isPending} className="w-full">
                  {isPending ? "Logging in..." : "Login"}
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleDemoLogin("user")}
                    className="w-full text-xs"
                  >
                    👤 Demo User
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleDemoLogin("admin")}
                    className="w-full text-xs"
                  >
                    🔐 Demo Admin
                  </Button>
                </div>
              </div>

              {/* <div className="relative my-6">
                <hr className="border-border" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground uppercase">
                  Or continue with
                </span>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleLogin}
                className="w-full hover:bg-muted transition-colors duration-200"
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button> */}

              <FieldDescription className="px-6 text-center mt-4">
                Don&apos;t have an account?{" "}
                <a
                  href="/register"
                  className="text-primary hover:underline font-semibold"
                >
                  Sign up
                </a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldGroup>
      </form>
    </div>
  );
};

export default LoginForm;
