import type { Metadata } from "next";

import { LoginForm } from "@/components/admin/login-form";
import { AuroraBackground } from "@/components/site/aurora-background";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-6">
      <AuroraBackground />
      <LoginForm />
    </div>
  );
}
