import { Button } from "@/components/ui/button";
import { ArticlesByCategory } from "@/types/ArticlesByCategory";
import Link from "next/link";

interface ConsonantGridProps {
  articlesByCategory: ArticlesByCategory;
  title: string;
  category: string;
}

export default function ConsonantGrid({
  articlesByCategory,
  title,
  category,
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
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        </div>
        <Button
          size="sm"
          className="bg-slate-600 hover:bg-slate-700 text-white"
          asChild
        >
          <Link href={category === "런너" ? "/runner/write" : "/guild/write"}>
            작성하기
          </Link>
        </Button>
      </div>
      <div className="flex flex-col gap-5">
        <div className="grid lg:grid-cols-6 grid-cols-3 gap-1">
          {koreanConsonants.map((consonant, index) => {
            const articles = articlesByCategory.find(
              (item) => item.initial === consonant
            );
            return (
              <div key={index} className="flex flex-col">
                <span className="text-sm text-white text-center bg-slate-600">
                  {consonant}
                </span>
                <div className="p-1 flex flex-col lg:gap-1 gap-2 border border-slate-300">
                  {articles?.payload.map((article) => (
                    <Link
                      key={article.articleVersionId}
                      href={`/article/${article.articleVersionId}`}
                      className="text-xs text-gray-800 hover:text-blue-600 text-left"
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
              <div key={index} className="flex flex-col">
                <span className="text-sm text-white text-center bg-slate-600">
                  {consonant}
                </span>
                <div className="p-1 flex flex-col lg:gap-1 gap-2 border border-slate-300">
                  {articles?.payload.map((article) => (
                    <Link
                      key={article.articleVersionId}
                      href={`/article/${article.articleVersionId}`}
                      className="text-xs text-gray-800 hover:text-blue-600 text-left"
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
              <div key={index} className="flex flex-col">
                <span className="text-sm text-white text-center bg-slate-600">
                  {consonant}
                </span>
                <div className="p-1 flex flex-col lg:gap-1 gap-2 border border-slate-300">
                  {articles?.payload.map((article) => (
                    <Link
                      key={article.articleVersionId}
                      href={`/article/${article.articleVersionId}`}
                      className="text-xs text-gray-800 hover:text-blue-600 text-left"
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
    </div>
  );
}
