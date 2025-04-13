"use client";

import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-slate-800 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* 타이틀 */}
          <Link href="/" className="text-xl lg:text-2xl font-bold text-white">
            테일즈위키
          </Link>

          {/* 검색바 - 모바일/태블릿에서는 숨김 */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="검색어를 입력해주세요..."
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* 모바일/태블릿 메뉴 버튼 */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>

          {/* 데스크톱 메뉴 */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link href="/runner" className="text-gray-300 hover:text-white">
              런너사전
            </Link>
            <Link href="/guild" className="text-gray-300 hover:text-white">
              길드사전
            </Link>
            <Link href="/login" className="text-gray-300 hover:text-white">
              로그인
            </Link>
          </nav>
        </div>

        {/* 모바일/태블릿 메뉴 */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4">
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="검색어를 입력해주세요..."
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <nav className="flex flex-col items-center space-y-2">
              <Link href="/runner" className="w-full">
                <div className="w-full py-2 text-center text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg text-base transition-colors">
                  런너사전
                </div>
              </Link>
              <Link href="/guild" className="w-full">
                <div className="w-full py-2 text-center text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg text-base transition-colors">
                  길드사전
                </div>
              </Link>
              <Link href="/login" className="w-full">
                <div className="w-full py-2 text-center text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg text-base transition-colors">
                  로그인
                </div>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
