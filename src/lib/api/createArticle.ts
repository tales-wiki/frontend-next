import { CreateArticleRequest } from "@/types/CreateArticle";

export const createArticle = async (data: CreateArticleRequest) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        ...data,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("게시글 작성 실패");
  }

  return response.json();
};
