import { BackButton } from "@/components/common/BackButton";
import { getArticleVersions } from "@/lib/api/article";
import { formatDateTime3 } from "@/lib/utils/DateFormatter";
import { formatFileSize } from "@/lib/utils/FileSizeFormatter";
import Link from "next/link";

interface Props {
  params: {
    id: number;
  };
}

export default async function ArticleVersions({ params }: Props) {
  const { id } = await params;
  const data = await getArticleVersions(id);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-2xl font-bold">편집 기록</h1>
        <BackButton />
      </div>
      <h2 className="text-lg md:text-xl font-bold mb-4">{data.title}</h2>

      {/* 모바일용 카드 뷰 */}
      <div className="lg:hidden space-y-4">
        {data.payload.map((version) => (
          <Link
            key={version.articleVersionId}
            href={`/article/${version.articleVersionId}`}
            className="block bg-white rounded-lg  border border-slate-200"
          >
            <div className="flex px-4 py-2 justify-between items-center bg-slate-200">
              <span className="font-medium">버전 {version.versionNumber}</span>
              <span className="text-sm text-gray-500">
                {formatFileSize(version.size)}
              </span>
            </div>
            <div className="flex px-4 py-2 flex-col text-sm text-gray-600">
              <span>{version.nickname}</span>
              <span>{formatDateTime3(version.createdAt)}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* 데스크톱용 테이블 뷰 */}
      <div className="hidden lg:block overflow-x-auto">
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
                    {formatFileSize(version.size)}
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
    </div>
  );
}
