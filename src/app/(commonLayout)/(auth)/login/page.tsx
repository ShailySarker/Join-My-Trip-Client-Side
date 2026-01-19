import LoginForm from "@/components/modules/auth/login-form";

const LoginPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) => {
  const params = (await searchParams) || {};
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-primary/5 via-background to-primary/10 px-4">
      <div className="w-full max-w-md xl:space-y-6 lg:space-y-4 md:space-y-4.5 space-y-2 rounded-2xl border bg-card/50 backdrop-blur-sm xl:p-8 lg:px-6 lg:py-5 md:p-5.5 p-4 shadow-2xl">
        <div className="xl:space-y-2 text-center">
          <h1 className="xl:text-3xl md:text-[26px] text-2xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="xl:text-base md:text-sm text-[13.5px] text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>
        <LoginForm redirect={params.redirect} />
      </div>
    </div>
  );
};

export default LoginPage;
