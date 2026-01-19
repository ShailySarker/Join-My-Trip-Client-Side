import RegisterForm from "@/components/modules/auth/register-form";

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-primary/5 via-background to-primary/10 px-4 md:py-0 py-5">
      <div className="w-full xl:w-[43%] lg:w-[55%] md:w-[80%] xl:space-y-6 lg:space-y-4 md:space-y-4.5 space-y-2 rounded-2xl border bg-card/50 backdrop-blur-sm xl:p-8 lg:px-6 lg:py-5 md:p-5.5 p-4 shadow-2xl">
        <div className="xl:space-y-2 text-center">
          <h1 className="xl:text-3xl md:text-[26px] text-2xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Create an Account
          </h1>
          <p className="xl:text-base md:text-sm text-[13.5px] text-muted-foreground">
            Enter your information below to create your account
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
