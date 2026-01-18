import LoginForm from "@/components/modules/auth/login-form";

const LoginPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) => {
  const params = (await searchParams) || {};
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/10 px-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl border bg-card/50 backdrop-blur-sm p-8 shadow-2xl">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>
        <LoginForm redirect={params.redirect} />
      </div>
    </div>
  );
};

export default LoginPage;

