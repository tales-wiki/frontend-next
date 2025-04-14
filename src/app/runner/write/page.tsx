"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createRunnerArticle } from "@/lib/api/createRunnerArticle";
import { uploadImage } from "@/lib/api/uploadImage";
import EditorCore from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const Editor = dynamic(
  () => import("@toast-ui/react-editor").then((mod) => mod.Editor),
  { ssr: false }
);

export default function RunnerWriter() {
  const router = useRouter();
  const editorRef = useRef<EditorCore>(null);
  const [title, setTitle] = useState("");
  const [nickname, setNickname] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    if (!nickname.trim()) {
      alert("작성자를 입력해주세요.");
      return;
    }

    try {
      const content = editorRef.current?.getInstance().getMarkdown() || "";

      await createRunnerArticle({
        title,
        nickname,
        content,
      });

      router.push("/runner");
    } catch (error) {
      console.error("게시글 작성 에러:", error);
      alert("게시글 작성에 실패했습니다.");
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
          런너사전 작성하기
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
            placeholder="닉네임을 입력해주세요."
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
          <Editor
            ref={editorRef}
            initialValue="지우고 내용을 입력해주세요."
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
        <div className="flex justify-end gap-2">
          <Button
            size="sm"
            className="bg-slate-400 hover:bg-slate-500 text-white"
            onClick={() => router.back()}
          >
            뒤로가기
          </Button>
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
