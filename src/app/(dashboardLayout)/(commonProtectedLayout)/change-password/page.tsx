import ChangePasswordForm from "@/components/modules/auth/change-password-form";

const ChangePasswordPage = () => {
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-16">
      <h1 className="text-2xl font-bold mb-8 text-center">Change Password</h1>
      <ChangePasswordForm />
    </div>
  );
};

export default ChangePasswordPage;
