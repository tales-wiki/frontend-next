import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArticlesByCategory } from "@/types/ArticlesByCategory";
import Link from "next/link";
import { FaExclamationCircle } from "react-icons/fa";

interface ConsonantGridProps {
  articlesByCategory: ArticlesByCategory;
  errorMessage?: string;
  title: string;
}

export default function ConsonantGrid({
  articlesByCategory,
  errorMessage,
  title,
}: ConsonantGridProps) {
  const koreanConsonants = [
    "ㄱ",
    "ㄴ",
    "ㄷ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅅ",
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];

  const englishConsonants = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const numberConsonants = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">{title}</h1>
      {errorMessage ? (
        <Alert variant="destructive" className="mb-5 border-red-500">
          <FaExclamationCircle className="h-4 w-4" />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="grid lg:grid-cols-6 grid-cols-3 gap-1">
            {koreanConsonants.map((consonant, index) => {
              const articles = articlesByCategory.find(
                (item) => item.initial === consonant
              );
              return (
                <div key={index} className="flex flex-col border">
                  <span className="text-sm text-white text-center bg-slate-600">
                    {consonant}
                  </span>
                  <div className="p-1 flex flex-col lg:gap-1 gap-2">
                    {articles?.payload.map((article) => (
                      <Link
                        key={article.articleVersionId}
                        href={`/article/${article.articleVersionId}`}
                        className="text-xs text-gray-800 hover:text-blue-600"
                      >
                        {article.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="grid lg:grid-cols-6 grid-cols-3 gap-1">
            {englishConsonants.map((consonant, index) => {
              const articles = articlesByCategory.find(
                (item) => item.initial === consonant
              );
              return (
                <div key={index} className="flex flex-col border">
                  <span className="text-sm text-white text-center bg-slate-600">
                    {consonant}
                  </span>
                  <div className="p-1 flex flex-col lg:gap-1 gap-2">
                    {articles?.payload.map((article) => (
                      <Link
                        key={article.articleVersionId}
                        href={`/article/${article.articleVersionId}`}
                        className="text-xs text-gray-800 hover:text-blue-600"
                      >
                        {article.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="grid lg:grid-cols-6 grid-cols-3 gap-1">
            {numberConsonants.map((consonant, index) => {
              const articles = articlesByCategory.find(
                (item) => item.initial === consonant
              );
              return (
                <div key={index} className="flex flex-col border">
                  <span className="text-sm text-white text-center bg-slate-600">
                    {consonant}
                  </span>
                  <div className="p-1 flex flex-col lg:gap-1 gap-2">
                    {articles?.payload.map((article) => (
                      <Link
                        key={article.articleVersionId}
                        href={`/article/${article.articleVersionId}`}
                        className="text-xs text-gray-800 hover:text-blue-600"
                      >
                        {article.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
