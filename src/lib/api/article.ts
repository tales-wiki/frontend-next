import { ArticleVersionResponse } from "../types/article";

export async function getArticleVersions(
  articleId: number
): Promise<ArticleVersionResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/${articleId}/versions`
  );
  return response.json();
}
