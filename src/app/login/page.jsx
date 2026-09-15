import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Log in",
  description: "Log in to your OrmiTech workspace.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: true }
};

export default function LoginPage() {
  return (
    <AuthLayout panelTitle="Every conversation. One powerful workspace." panelText="Pick up where your team left off — conversations, customers and AI activity are waiting for you.">
      <LoginForm />
    </AuthLayout>
  );
}
