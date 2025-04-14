"use client";

import { BackButton } from "@/components/common/BackButton";
import MarkdownEditor from "@/components/editor/MarkdownEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadImage } from "@/lib/api/uploadImage";
import EditorCore from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useRouter } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";

interface Props {
  params: Promise<{
    id: string;
  }>;
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

async function getArticleVersion(id: string): Promise<ArticleVersion> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/versions/${id}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch article");
  }
  return res.json();
}

export default function ArticleEdit({ params }: Props) {
  const unwrappedParams = use(params);
  const router = useRouter();
  const editorRef = useRef<EditorCore>(null);
  const [title, setTitle] = useState("");
  const [nickname, setNickname] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [article, setArticle] = useState<ArticleVersion | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticleVersion(unwrappedParams.id);
        setArticle(data);
        setTitle(data.title);
      } catch (error) {
        console.error("게시글 로드 에러:", error);
        alert("게시글을 불러오는데 실패했습니다.");
      }
    };

    fetchArticle();
  }, [unwrappedParams.id]);

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!nickname.trim()) {
      alert("작성자를 입력해주세요.");
      return;
    }

    try {
      const content = editorRef.current?.getInstance().getMarkdown() || "";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/${article?.articleId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            nickname,
            content,
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          alert("로그인이 필요합니다.");
          router.push("/login");
          return;
        }

        throw new Error("Failed to update article");
      }

      const { articleVersionId } = await response.json();
      router.push(`/article/${articleVersionId}`);
    } catch (error) {
      console.error("게시글 수정 에러:", error);
      alert("게시글 수정에 실패했습니다.");
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      setIsUploading(true);
      const imageUrl = await uploadImage(file);
      return imageUrl;
    } catch (error) {
      console.error("이미지 업로드 에러:", error);
      alert("이미지 업로드에 실패했습니다.");
      return "";
    } finally {
      setIsUploading(false);
    }
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-10">편집하기</h1>
        {isUploading && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-md bg-black/30 z-50">
            <div className="bg-white/80 p-6 rounded-lg shadow-lg flex flex-col items-center gap-3 min-w-[200px]">
              <div className="w-8 h-8 border-4 border-slate-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-700 font-medium">이미지 업로드 중...</p>
              <p className="text-sm text-gray-500">잠시만 기다려주세요</p>
            </div>
          </div>
        )}
        <div className="flex flex-col lg:flex-row items-center gap-2 w-full mb-4">
          <Input
            placeholder="제목을 입력해주세요."
            className="w-full lg:w-[80%] border-1 border-[#dadde6] rounded-[4px] placeholder:text-slate-400 bg-gray-100"
            value={title}
            disabled
          />
          <Input
            placeholder="작성자를 입력해주세요."
            className="w-full lg:w-[20%] border-1 border-[#dadde6] rounded-[4px] placeholder:text-slate-400"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div className="w-full mb-4">
          <MarkdownEditor
            editorRef={editorRef as React.RefObject<EditorCore>}
            onImageUpload={handleImageUpload}
            initialValue={article?.content}
          />
        </div>
        <div className="flex justify-end gap-2">
          <BackButton />
          <Button
            size="sm"
            className="bg-slate-600 hover:bg-slate-700 text-white"
            onClick={handleSubmit}
          >
            수정하기
          </Button>
        </div>
      </div>
    </div>
  );
}
