import { CreateRunnerArticleRequest } from "@/types/CreateRunnerArticle";

export const createRunnerArticle = async (data: CreateRunnerArticleRequest) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        ...data,
        category: "runner",
      }),
    }
  );

  if (!response.ok) {
    throw new Error("게시글 작성 실패");
  }

  return response.json();
};
