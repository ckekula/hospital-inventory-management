"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "../redux";

const AuthMiddleware = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { token } = useAppSelector((state) => state.auth);
  const isLoginPage = pathname === "/login";

  useEffect(() => {
    if (!token && !isLoginPage) {
      router.replace("/login");
    } else if (token && isLoginPage) {
      router.replace("/");
    }
  }, [token, isLoginPage, router]);

  if (!token && !isLoginPage) return null;
  if (token && isLoginPage) return null;

  return <>{children}</>;
};

export default AuthMiddleware;
