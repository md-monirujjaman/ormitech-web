import AuthLayout from "@/components/auth/AuthLayout";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata = {
  title: "Reset your password",
  description: "Reset the password for your OrmiTech account.",
  alternates: { canonical: "/forgot-password" },
  robots: { index: false, follow: true }
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout panelTitle="Your workspace is one step away." panelText="Reset your password and get back to answering customers across every channel.">
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
