import ConsonantGrid from "@/components/ConsonantGrid";
import { fetchArticlesByCategory } from "@/lib/api/fetchArticlesByCategory";
import { ArticlesByCategory } from "@/types/ArticlesByCategory";

export default async function Guild() {
  let articlesByCategory: ArticlesByCategory = [];
  let errorMessage = "";
  try {
    articlesByCategory = await fetchArticlesByCategory("guild");
  } catch (error) {
    console.error("Error fetching articles:", error);
    errorMessage = "게시물을 읽어오지 못했습니다. 잠시 후 다시 시도해주세요.";
  }

  return (
    <ConsonantGrid
      articlesByCategory={articlesByCategory}
      errorMessage={errorMessage}
      title="길드 사전"
    />
  );
}
