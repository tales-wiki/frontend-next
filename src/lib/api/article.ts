import { ArticleVersionResponse } from "../types/article";

export async function getArticleVersions(
  articleId: number
): Promise<ArticleVersionResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/${articleId}/versions`
  );
  return response.json();
}

interface ArticleVersion {
  articleId: number;
  articleVersionId: number;
  title: string;
  content: string;
  isNoEditing: boolean;
  isHiding: boolean;
  createdAt: string;
}

export async function getArticleVersion(id: string): Promise<ArticleVersion> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/versions/${id}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch article");
  }
  return res.json();
}
