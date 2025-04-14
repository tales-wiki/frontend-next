"use client";

import EditorCore from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import dynamic from "next/dynamic";
import { useState } from "react";

const Editor = dynamic(
  () => import("@toast-ui/react-editor").then((mod) => mod.Editor),
  { ssr: false }
);

interface MarkdownEditorProps {
  initialValue?: string;
  onImageUpload?: (file: File) => Promise<string>;
  editorRef: React.RefObject<EditorCore>;
}

export default function MarkdownEditor({
  initialValue = "지우고 내용을 입력해주세요.",
  onImageUpload,
  editorRef,
}: MarkdownEditorProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (file: File) => {
    if (!onImageUpload) return "";

    try {
      setIsUploading(true);
      const imageUrl = await onImageUpload(file);
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
    <div className="w-full">
      {isUploading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-md bg-black/30 z-50">
          <div className="bg-white/80 p-6 rounded-lg shadow-lg flex flex-col items-center gap-3 min-w-[200px]">
            <div className="w-8 h-8 border-4 border-slate-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-700 font-medium">이미지 업로드 중...</p>
            <p className="text-sm text-gray-500">잠시만 기다려주세요</p>
          </div>
        </div>
      )}
      <Editor
        ref={editorRef}
        initialValue={initialValue}
        useCommandShortcut={true}
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        hooks={{
          addImageBlobHook: async (
            blob: Blob,
            callback: (url: string, altText: string) => void
          ) => {
            const imageUrl = await handleImageUpload(blob as File);
            callback(imageUrl, "이미지");
          },
        }}
      />
    </div>
  );
}
