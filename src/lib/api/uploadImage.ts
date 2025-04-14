export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/images/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("이미지 업로드 실패");
  }

  const { url } = await response.json();
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/images/${url}`;
};
