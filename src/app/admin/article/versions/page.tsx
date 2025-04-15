import { Metadata } from "next";
import ArticleVersionsTable from "./ArticleVersionsTable";

export const metadata: Metadata = {
  title: "게시글 버전 관리",
  description: "게시글 버전 목록을 관리하는 페이지입니다.",
};

async function getVersions(page: number = 0) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/articles/versions?page=${page}`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error("게시글 버전 목록을 불러오는데 실패했습니다.");
  }
  return response.json();
}

export default async function ArticleVersionsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = searchParams?.page ? parseInt(searchParams.page) : 0;
  const { content: versions, totalPages, number } = await getVersions(page);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">게시글 목록</h1>
      <ArticleVersionsTable
        versions={versions}
        totalPages={totalPages}
        currentPage={number}
      />
    </div>
  );
}
