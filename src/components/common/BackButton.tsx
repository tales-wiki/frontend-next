"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  return (
    <Button
      size="sm"
      className="bg-slate-400 hover:bg-slate-500 text-white"
      onClick={() => router.back()}
    >
      뒤로가기
    </Button>
  );
}
