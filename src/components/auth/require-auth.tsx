"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getRole } from "@/lib/auth";

export function RequireAuth({
  role,
  children,
}: {
  role: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!active) return;

      if (!session || getRole(session.user) !== role) {
        router.replace("/login");
        return;
      }

      setChecking(false);
    });

    return () => {
      active = false;
    };
  }, [role, router]);

  if (checking) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-canvas">
        <div className="size-8 animate-spin rounded-full border-2 border-border-soft border-t-brand-deep" />
      </div>
    );
  }

  return <>{children}</>;
}
