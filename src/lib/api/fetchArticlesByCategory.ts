import { ArticlesByCategory } from "@/types/ArticlesByCategory";
import { sleep } from "../utils/Sleep";
export async function fetchArticlesByCategory(
  category: string
): Promise<ArticlesByCategory> {
  await sleep(3000);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/categories/${category}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("카테고리별 게시글 목록을 불러오지 못했습니다.");
  }

  const data = await response.json();
  return data.groups;
}
