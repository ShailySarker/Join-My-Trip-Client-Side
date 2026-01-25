"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setAuthTokens } from "@/services/auth/setTokens";
import { toast } from "sonner";

const AuthCallbackContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const redirectTo = searchParams.get("redirect") || "/";

    if (accessToken && refreshToken) {
      const handleAuth = async () => {
        try {
          await setAuthTokens(accessToken, refreshToken);
          toast.success("Login successful!");
          
          // Small delay to ensure cookies are set before redirecting
          setTimeout(() => {
            window.location.href = redirectTo.startsWith("/") ? redirectTo : `/${redirectTo}`;
          }, 500);
        } catch (error) {
          console.error("Auth callback error:", error);
          toast.error("Failed to complete authentication.");
          router.push("/login");
        }
      };

      handleAuth();
    } else {
      const error = searchParams.get("error");
      if (error) {
        toast.error(error);
      }
      router.push("/login");
    }
  }, [searchParams, router]);

  return (
    <div className="flex h-screen items-center justify-center bg-background text-foreground">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent shadow-lg shadow-primary/20"></div>
        <p className="text-lg font-medium animate-pulse text-muted-foreground">
          Completing authentication...
        </p>
      </div>
    </div>
  );
};

const AuthCallbackPage = () => {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
};

export default AuthCallbackPage;
