"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { toast } from "sonner";
import { forgotPassword } from "@/services/auth/forgotPassword";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await forgotPassword(email);

    if (result.success) {
      toast.success(result.message);
      setEmailSent(true);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="rounded-2xl border bg-card/50 backdrop-blur-sm p-8 shadow-2xl">
          {/* Back to Login Link */}
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4"
            >
              <Mail className="h-8 w-8 text-primary" />
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
              Forgot Password?
            </h1>
            <p className="text-muted-foreground">
              {emailSent
                ? "Check your email for reset instructions"
                : "No worries, we'll send you reset instructions"}
            </p>
          </div>

          {emailSent ? (
            /* Success State */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="text-center p-6 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-sm text-muted-foreground mb-4">
                  We've sent a password reset link to:
                </p>
                <p className="font-semibold text-primary mb-4">{email}</p>
                <p className="text-xs text-muted-foreground">
                  Check your spam folder if you don't see it within a few
                  minutes.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => {
                    setEmailSent(false);
                    setEmail("");
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Try another email
                </Button>
                <Link href="/login" className="block">
                  <Button className="w-full">Back to Login</Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            /* Form State */
            <form onSubmit={handleSubmit} className="space-y-6">
              <Field>
                <FieldLabel htmlFor="email">Email Address</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </Field>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !email}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>

              <div className="text-center">
                <Link
                  href="/login"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Remember your password?{" "}
                  <span className="font-semibold">Sign in</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
