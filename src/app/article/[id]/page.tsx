import ArticleViewer from "@/components/article/ArticleViewer";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getArticleVersion } from "@/lib/api/article";
import { formatDateTime3 } from "@/lib/utils/DateFormatter";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { ChevronDown } from "lucide-react";
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
          <div className="lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="focus-visible:ring-0 focus-visible:shadow-none"
                >
                  <ChevronDown className="h-5 w-5 text-slate-800" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-slate-600 rounded-md shadow-lg border border-slate-500 w-40"
              >
                <DropdownMenuItem className="text-sm text-white hover:bg-slate-500 cursor-pointer">
                  신고하기
                </DropdownMenuItem>
                <Link href={`/article/${article.articleId}/versions`}>
                  <DropdownMenuItem className="text-sm text-white hover:bg-slate-500 cursor-pointer">
                    편집로그
                  </DropdownMenuItem>
                </Link>
                <Link href={`/article/${article.articleId}/edit`}>
                  <DropdownMenuItem className="text-sm text-white hover:bg-slate-500 cursor-pointer">
                    편집하기
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="hidden lg:flex gap-2">
            <Button
              size="sm"
              className="bg-red-400 hover:bg-red-500 text-white"
            >
              신고하기
            </Button>
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
