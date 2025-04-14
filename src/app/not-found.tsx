import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col py-40">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
        <p className="text-lg text-gray-600 mb-4">페이지를 찾을 수 없습니다</p>
        <Link
          href="/"
          className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
