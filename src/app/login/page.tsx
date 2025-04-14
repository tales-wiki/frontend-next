"use client";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";

export default function Runner() {
  const handleKakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code&scope=openid`;
  };

  const handleGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">로그인</h1>

      <div className="w-full space-y-4">
        <Button
          onClick={handleKakaoLogin}
          className="w-full bg-[#FEE500] text-black hover:bg-[#FEE500]/90 border border-none"
        >
          <RiKakaoTalkFill className="text-xl" />
          카카오로 로그인
        </Button>

        <Button
          onClick={handleGoogleLogin}
          className="w-full bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
        >
          <FcGoogle className="text-xl" />
          구글로 로그인
        </Button>
      </div>
    </div>
  );
}
