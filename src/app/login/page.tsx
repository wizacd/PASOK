import { LoginForm } from "@/components/login/login-form";
import { LoginHero } from "@/components/login/login-hero";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;
  const isProdusen = role === "produsen";

  return (
    <div className="flex min-h-screen w-full items-stretch">
      <LoginForm role={isProdusen ? "produsen" : "koperasi"} />
      <LoginHero />
    </div>
  );
}
