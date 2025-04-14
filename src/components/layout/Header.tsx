"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { searchArticles } from "@/lib/api/searchArticles";
import { useAuthStore } from "@/store/authStore";
import { SearchArticle } from "@/types/SearchArticle";
import Link from "next/link";
import { useCallback, useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchArticle[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const results: SearchArticle[] = await searchArticles(query);
      setSearchResults(results);
    } catch (error) {
      console.error("검색 오류:", error);
    }
  }, []);

  const debouncedSearch = useCallback(
    (query: string) => {
      const timer = setTimeout(() => {
        handleSearch(query);
      }, 500);
      return () => clearTimeout(timer);
    },
    [handleSearch]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/members/logout`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("로그아웃 실패");
      }

      setLoggedIn(false);
    } catch (error) {
      console.error("로그아웃 에러:", error);
    }
  };

  return (
    <header className="bg-slate-800 shadow-md">
      <div className="container mx-auto px-4 py-3 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* 타이틀 */}
          <Link href="/" className="text-xl lg:text-2xl font-bold text-white">
            테일즈위키
          </Link>

          {/* 검색바 - 모바일/태블릿에서는 숨김 */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="검색어를 입력해주세요..."
                className="w-full pr-10 bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:ring-0"
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              />
              {searchQuery && (
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => {
                    setSearchQuery("");
                    setSearchResults([]);
                  }}
                >
                  <HiOutlineX className="h-5 w-5 text-gray-400 hover:text-white" />
                </button>
              )}
              {isSearchFocused && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-slate-700 rounded-lg shadow-lg max-h-32 lg:max-h-96 overflow-y-auto z-50">
                  {searchResults.map((result, index) => (
                    <Link
                      key={result.articleVersionId}
                      href={`/article/${result.articleVersionId}`}
                      className={`block px-4 py-2 text-white hover:bg-slate-600 transition-colors cursor-pointer ${
                        index !== searchResults.length - 1
                          ? "border-b border-slate-600"
                          : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{result.title}</span>
                        <Badge
                          variant={
                            result.category === "런너" ? "secondary" : "outline"
                          }
                          className={`text-xs border-gray-200 ${
                            result.category === "런너"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-green-50 text-green-700"
                          }`}
                        >
                          {result.category}
                        </Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 모바일/태블릿 메뉴 버튼 */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative w-6 h-6">
              <HiOutlineMenu
                className={`absolute h-6 w-6 transition-all duration-300 ${
                  isMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                }`}
              />
              <HiOutlineX
                className={`absolute h-6 w-6 transition-all duration-300 ${
                  isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                }`}
              />
            </div>
          </button>

          {/* 데스크톱 메뉴 */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link href="/runner" className="text-gray-300 hover:text-white">
              런너사전
            </Link>
            <Link href="/guild" className="text-gray-300 hover:text-white">
              길드사전
            </Link>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white"
              >
                로그아웃
              </button>
            ) : (
              <Link href="/login" className="text-gray-300 hover:text-white">
                로그인
              </Link>
            )}
          </nav>
        </div>

        {/* 모바일/태블릿 메뉴 */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-4">
            <div className="relative mb-4">
              <Input
                type="text"
                placeholder="검색어를 입력해주세요..."
                className="w-full pr-10 bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:ring-0"
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              />
              {searchQuery && (
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => {
                    setSearchQuery("");
                    setSearchResults([]);
                  }}
                >
                  <HiOutlineX className="h-5 w-5 text-gray-400 hover:text-white" />
                </button>
              )}
              {isSearchFocused && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-slate-700 rounded-lg shadow-lg lg:max-h-92 max-h-36 overflow-y-auto z-50">
                  {searchResults.map((result, index) => (
                    <Link
                      key={result.articleVersionId}
                      href={`/article/${result.articleVersionId}`}
                      className={`block px-4 py-2 text-white hover:bg-slate-600 transition-colors cursor-pointer ${
                        index !== searchResults.length - 1
                          ? "border-b border-slate-600"
                          : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{result.title}</span>
                        <Badge
                          variant={
                            result.category === "런너" ? "secondary" : "outline"
                          }
                          className={`text-xs border-gray-200 ${
                            result.category === "런너"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-green-50 text-green-700"
                          }`}
                        >
                          {result.category}
                        </Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <nav className="flex flex-col items-center space-y-2">
              <Link
                href="/runner"
                className="w-full py-2 text-center text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg text-base transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                런너사전
              </Link>
              <Link
                href="/guild"
                className="w-full py-2 text-center text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg text-base transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                길드사전
              </Link>
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full py-2 text-center text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg text-base transition-colors"
                >
                  로그아웃
                </button>
              ) : (
                <Link
                  href="/login"
                  className="w-full py-2 text-center text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg text-base transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  로그인
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
