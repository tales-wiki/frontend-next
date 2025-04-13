import ConsonantGrid from "@/components/article/ConsonantGrid";
import { fetchArticlesByCategory } from "@/lib/api/fetchArticlesByCategory";
import { ArticlesByCategory } from "@/types/ArticlesByCategory";

export default async function Guild() {
  const articlesByCategory: ArticlesByCategory = await fetchArticlesByCategory(
    "guild"
  );

  return (
    <ConsonantGrid articlesByCategory={articlesByCategory} title="길드 사전" />
  );
}
