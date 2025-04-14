"use client";

import { useAuthStore } from "@/store/authStore";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GoogleCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

  useEffect(() => {
    const code = searchParams.get("code");

    const handleGoogleLogin = async () => {
      try {
        if (code) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/members/login/google?code=${code}`,
            {
              credentials: "include",
            }
          );

          if (!response.ok) {
            throw new Error("로그인 요청 실패");
          }

          setLoggedIn(true);
          router.push("/");
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("로그인 에러:", error);
        router.push("/login");
      }
    };

    handleGoogleLogin();
  }, [searchParams, router, setLoggedIn]);

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="h-8 w-8 animate-spin text-slate-700" />
    </div>
  );
}
