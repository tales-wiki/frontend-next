import ConsonantGrid from "@/components/article/ConsonantGrid";
import { fetchArticlesByCategory } from "@/lib/api/fetchArticlesByCategory";
import { ArticlesByCategory } from "@/types/ArticlesByCategory";

export default async function Runner() {
  let articlesByCategory: ArticlesByCategory = [];
  let errorMessage = "";
  try {
    articlesByCategory = (await fetchArticlesByCategory(
      "runner"
    )) as ArticlesByCategory;
  } catch (error) {
    console.error("Error fetching articles:", error);
    errorMessage = "게시물을 읽어오지 못했습니다. 잠시 후 다시 시도해주세요.";
  }

  return (
    <ConsonantGrid
      articlesByCategory={articlesByCategory}
      errorMessage={errorMessage}
      title="런너 사전"
    />
  );
}
