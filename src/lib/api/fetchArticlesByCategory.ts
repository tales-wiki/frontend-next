export async function fetchArticlesByCategory(category: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/categories/${category}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!response.ok) {
    throw new Error("카테고리별 게시글 목록을 불러오지 못했습니다.");
  }

  const data = await response.json();
  return data.groups;
}
