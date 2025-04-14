"use client";

import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import dynamic from "next/dynamic";

const Viewer = dynamic(
  () => import("@toast-ui/react-editor").then((mod) => mod.Viewer),
  { ssr: false }
);

interface ArticleViewerProps {
  content: string;
}

export default function ArticleViewer({ content }: ArticleViewerProps) {
  return <Viewer initialValue={content} />;
}
