import ArticleViewer from "@/components/article/ArticleViewer";
import ReportModal from "@/components/article/ReportModal";
import { Button } from "@/components/ui/button";
import { getArticleVersion } from "@/lib/api/article";
import { formatDateTime3 } from "@/lib/utils/DateFormatter";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { History, Pencil, Siren } from "lucide-react";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

export default async function Article({ params }: Props) {
  const { id } = await params;
  const article = await getArticleVersion(id);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            {article.title}
          </h1>
        </div>
        <div className="flex gap-2">
          <div className="lg:hidden flex gap-2">
            <ReportModal articleVersionId={article.articleVersionId}>
              <Button
                size="sm"
                className="bg-red-400 hover:bg-red-500 text-white"
              >
                <Siren className="w-4 h-4" />
              </Button>
            </ReportModal>
            <Link href={`/article/${article.articleId}/versions`}>
              <Button
                size="sm"
                className="bg-slate-400 hover:bg-slate-500 text-white"
              >
                <History className="w-4 h-4" />
              </Button>
            </Link>
            <Link href={`/article/${article.articleId}/edit`}>
              <Button
                size="sm"
                className="bg-slate-600 hover:bg-slate-700 text-white"
              >
                <Pencil className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="hidden lg:flex gap-2">
            <ReportModal articleVersionId={article.articleVersionId}>
              <Button
                size="sm"
                className="bg-red-400 hover:bg-red-500 text-white"
              >
                신고하기
              </Button>
            </ReportModal>
            <Link href={`/article/${article.articleId}/versions`}>
              <Button
                size="sm"
                className="bg-slate-400 hover:bg-slate-500 text-white"
              >
                편집로그
              </Button>
            </Link>
            <Link href={`/article/${article.articleVersionId}/edit`}>
              <Button
                size="sm"
                className="bg-slate-600 hover:bg-slate-700 text-white"
              >
                편집하기
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="prose max-w-none">
        <ArticleViewer content={article.content} />
      </div>
      <div className="mt-8">
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="text-xs text-gray-500">
            이 문서는 {formatDateTime3(article.createdAt)}에 마지막으로
            편집되었습니다.
          </div>
        </div>
      </div>
    </div>
  );
}
