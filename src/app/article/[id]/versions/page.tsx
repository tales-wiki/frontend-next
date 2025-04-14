import { BackButton } from "@/components/common/BackButton";
import { getArticleVersions } from "@/lib/api/article";
import { formatDateTime3 } from "@/lib/utils/DateFormatter";
import Link from "next/link";

interface Props {
  params: {
    id: number;
  };
}

export default async function ArticleVersions({ params }: Props) {
  const data = await getArticleVersions(params.id);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">편집 기록</h1>
        <BackButton />
      </div>
      <h2 className="text-xl font-bold mb-4">{data.title}</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              버전
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              작성자
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              크기
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              생성일
            </th>
          </tr>
        </thead>
        <tbody>
          {data.payload.map((version) => (
            <tr
              key={version.articleVersionId}
              className="hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-sm">
                <Link
                  href={`/article/${version.articleVersionId}`}
                  className="block"
                >
                  {version.versionNumber}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-right text-sm">
                <Link
                  href={`/article/${version.articleVersionId}`}
                  className="block"
                >
                  {version.nickname}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-right text-sm">
                <Link
                  href={`/article/${version.articleVersionId}`}
                  className="block"
                >
                  {version.size} bytes
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-right text-sm">
                <Link
                  href={`/article/${version.articleVersionId}`}
                  className="block"
                >
                  {formatDateTime3(version.createdAt)}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
