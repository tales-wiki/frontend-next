import ConsonantGrid from "@/components/article/ConsonantGrid";
import { fetchArticlesByCategory } from "@/lib/api/fetchArticlesByCategory";
import { ArticlesByCategory } from "@/types/ArticlesByCategory";

export default async function Runner() {
  const articlesByCategory: ArticlesByCategory = await fetchArticlesByCategory(
    "runner"
  );

  return (
    <ConsonantGrid
      articlesByCategory={articlesByCategory}
      title="런너 사전"
      category="런너"
    />
  );
}
