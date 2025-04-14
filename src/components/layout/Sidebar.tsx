import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { fetchLastUpdatedArticles } from "@/lib/api/fetchLastUpdatedArticles";
import { formatDate } from "@/lib/utils/DateFormatter";
import { LastUpdatedArticle } from "@/types/LastUpdatedArticle";
import Link from "next/link";
import { FaExclamationCircle } from "react-icons/fa";

const ArticleList = async () => {
  try {
    const articles: LastUpdatedArticle[] = await fetchLastUpdatedArticles();

    if (articles.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center gap-2 p-3 bg-gray-100 rounded-lg">
          <span className="text-sm text-gray-600 text-center">
            최근 편집된 글이 없습니다.
          </span>
        </div>
      );
    }

    return (
      <ul className="space-y-3">
        {articles.map((article) => (
          <li
            key={article.articleVersionId}
            className="border-b border-gray-200 pb-3 last:border-b-0 last:pb-0"
          >
            <Link
              href={`/article/${article.articleVersionId}`}
              className="hover:text-blue-500 block"
            >
              <div className="text-sm mb-1.5">{article.title}</div>
              <div className="text-xs text-gray-500 flex items-center justify-between">
                <Badge
                  variant={
                    article.category === "런너" ? "secondary" : "outline"
                  }
                  className={`text-xs border-gray-200 ${
                    article.category === "런너"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-green-50 text-green-700 "
                  }`}
                >
                  {article.category}
                </Badge>
                <span>{formatDate(article.updatedAt)}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    );
  } catch (error) {
    console.error("최근 편집된 글을 불러오는데 실패했습니다:", error);

    return (
      <Alert
        variant="destructive"
        className="border-1 border-red-500 bg-red-50 text-red-500"
      >
        <FaExclamationCircle className="h-4 w-4" />
        <AlertDescription>
          최근 편집된 글 목록을 불러오는데 실패했습니다.
        </AlertDescription>
      </Alert>
    );
  }
};

export default function Sidebar() {
  return (
    <aside className="bg-white p-4 border border-slate-400 lg:rounded-lg h-fit">
      <h2 className="text-base font-semibold mb-3 text-center">최근 편집</h2>
      <nav>
        <ArticleList />
      </nav>
    </aside>
  );
}
