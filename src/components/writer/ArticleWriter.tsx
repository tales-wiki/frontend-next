"use client";

import { BackButton } from "@/components/common/BackButton";
import MarkdownEditor from "@/components/editor/MarkdownEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createArticle } from "@/lib/api/createArticle";
import { uploadImage } from "@/lib/api/uploadImage";
import EditorCore from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

interface ArticleWriterProps {
  category: "runner" | "guild";
  titlePlaceholder: string;
  pageTitle: string;
}

export default function ArticleWriter({
  category,
  titlePlaceholder,
  pageTitle,
}: ArticleWriterProps) {
  const router = useRouter();
  const editorRef = useRef<EditorCore>(null);
  const [title, setTitle] = useState("");
  const [nickname, setNickname] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert(`${titlePlaceholder}`);
      return;
    }
    if (!nickname.trim()) {
      alert("작성자를 입력해주세요.");
      return;
    }

    try {
      const content = editorRef.current?.getInstance().getMarkdown() || "";
      const response = await createArticle({
        title,
        nickname,
        content,
        category,
      });

      router.push(`/article/${response.articleVersionId}`);
    } catch (error) {
      console.error("게시글 작성 에러:", error);
      alert(
        error instanceof Error ? error.message : "게시글 작성에 실패했습니다."
      );
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

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-10">
          {pageTitle}
        </h1>
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
            placeholder={titlePlaceholder}
            className="w-full lg:w-[80%] border-1 border-[#dadde6] rounded-[4px] placeholder:text-slate-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
          />
        </div>
        <div className="flex justify-end gap-2">
          <BackButton />
          <Button
            size="sm"
            className="bg-slate-600 hover:bg-slate-700 text-white"
            onClick={handleSubmit}
          >
            작성하기
          </Button>
        </div>
      </div>
    </div>
  );
}
