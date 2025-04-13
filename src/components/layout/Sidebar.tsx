import { fetchLastUpdatedArticles } from "@/lib/api/fetchLastUpdatedArticles";
import { formatDate } from "@/lib/utils/DateFormatter";
import { LastUpdatedArticle } from "@/types/LastUpdatedArticle";

const Sidebar = async () => {
  const articles = await fetchLastUpdatedArticles();

  return (
    <aside className="bg-white p-4 border border-slate-400 lg:rounded-lg h-fit">
      <h2 className="text-base font-semibold mb-3 text-center">최근 편집</h2>
      <nav>
        <ul className="space-y-3">
          {articles.map((article: LastUpdatedArticle) => (
            <li
              key={article.articleVersionId}
              className="border-b border-gray-200 pb-3 last:border-b-0 last:pb-0"
            >
              <a
                href={`/articles/${article.articleVersionId}`}
                className="hover:text-blue-500 block"
              >
                <div className="text-sm mb-1.5">{article.title}</div>
                <div className="text-xs text-gray-500 flex items-center justify-between">
                  <span
                    className={`px-1.5 py-0.5 rounded-full ${
                      article.category === "런너"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    } text-xs flex items-center`}
                  >
                    {article.category}
                  </span>
                  <span>{formatDate(article.updatedAt)}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
