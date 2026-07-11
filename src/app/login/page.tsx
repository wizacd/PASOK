import { LoginForm } from "@/components/login/login-form";
import { LoginHero } from "@/components/login/login-hero";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-stretch">
      <LoginForm />
      <LoginHero />
    </div>
  );
}
