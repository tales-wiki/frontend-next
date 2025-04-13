import { SearchArticle } from "@/types/SearchArticle";

export async function searchArticles(title: string): Promise<SearchArticle[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/search?title=${title}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("게시글 검색 결과를 불러오지 못했습니다.");
  }

  const data = await response.json();
  return data.payload;
}
