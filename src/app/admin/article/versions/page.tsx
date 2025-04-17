import { cookies } from "next/headers";
import ArticleVersionsTable from "./ArticleVersionsTable";

type Props = {
  searchParams: Promise<{ page?: string }>;
};

async function getVersions(page: number = 0) {
  const cookieStore = await cookies();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/articles/versions?page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error("게시글 버전 목록을 불러오는데 실패했습니다.");
  }
  return response.json();
}

export default async function ArticleVersionsPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const page = resolvedSearchParams?.page
    ? parseInt(resolvedSearchParams.page)
    : 0;
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
