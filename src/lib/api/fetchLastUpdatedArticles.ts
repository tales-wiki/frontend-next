export async function fetchLastUpdatedArticles() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/latest-update`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!response.ok) {
    throw new Error("게시글을 불러오지 못했습니다.");
  }

  const data = await response.json();
  return data.payload;
}
