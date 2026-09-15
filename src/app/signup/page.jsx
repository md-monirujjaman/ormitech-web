import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";

export const metadata = {
  title: "Sign up",
  description: "Create your OrmiTech account and bring every customer conversation into one workspace.",
  alternates: { canonical: "/signup" },
  robots: { index: false, follow: true }
};

export default function SignupPage() {
  return (
    <AuthLayout panelTitle="Start free. Scale when you’re ready." panelText="Connect Facebook, Instagram, WhatsApp and website chat, then let AI and your team answer every customer.">
      <SignupForm />
    </AuthLayout>
  );
}
