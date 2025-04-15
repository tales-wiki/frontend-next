import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pagination } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime3 } from "@/lib/utils/DateFormatter";
import { Eye } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "게시글 신고 관리",
  description: "게시글 신고 목록을 관리하는 페이지입니다.",
};

interface ArticleVersionReport {
  articleVersionReportId: number;
  articleVersionId: number;
  title: string;
  category: string;
  nickname: string;
  content: string;
  ip: string;
  reportReason: string;
  createdAt: string;
}

async function getReports(page: number = 0) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/articles/versions/reports?page=${page}`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error("게시글 신고 목록을 불러오는데 실패했습니다.");
  }
  return response.json();
}

function getCategoryBadge(category: string) {
  return (
    <Badge
      variant={category === "런너" ? "secondary" : "outline"}
      className={`text-xs border-gray-200 ${
        category === "런너"
          ? "bg-blue-50 text-blue-700"
          : "bg-green-50 text-green-700"
      }`}
    >
      {category}
    </Badge>
  );
}

export default async function ArticleReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = params?.page ? parseInt(params.page) : 0;
  const { content: reports, totalPages, number } = await getReports(page);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">게시글 신고 목록</h1>
      <div className="border border-gray-200 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 border-b border-gray-200">
              <TableHead className="w-[100px] font-semibold text-gray-600 px-6">
                신고 ID
              </TableHead>
              <TableHead className="w-[100px] font-semibold text-gray-600 px-6">
                버전 ID
              </TableHead>
              <TableHead className="font-semibold text-gray-600 px-6 text-right">
                제목
              </TableHead>
              <TableHead className="font-semibold text-gray-600 px-6 text-right">
                카테고리
              </TableHead>
              <TableHead className="font-semibold text-gray-600 px-6 text-right">
                작성자
              </TableHead>
              <TableHead className="font-semibold text-gray-600 px-6 text-right">
                신고 사유
              </TableHead>
              <TableHead className="font-semibold text-gray-600 px-6 text-right">
                IP
              </TableHead>
              <TableHead className="font-semibold text-gray-600 px-6 w-[180px] text-right">
                신고일
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report: ArticleVersionReport) => (
              <TableRow
                key={report.articleVersionReportId}
                className="hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0"
              >
                <TableCell className="font-medium text-gray-900 px-6">
                  {report.articleVersionReportId}
                </TableCell>
                <TableCell className="font-medium text-gray-900 px-6">
                  {report.articleVersionId}
                </TableCell>
                <TableCell className="text-gray-700 px-6 text-right">
                  <Link
                    href={`/article/${report.articleVersionId}`}
                    className="text-gray-700 hover:text-blue-500"
                  >
                    {report.title}
                  </Link>
                </TableCell>
                <TableCell className="text-gray-700 px-6 text-right">
                  {getCategoryBadge(report.category)}
                </TableCell>
                <TableCell className="text-gray-700 px-6 text-right">
                  {report.nickname}
                </TableCell>
                <TableCell className="text-gray-700 px-6 text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="p-1 h-6 bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[90vw] bg-white p-6 max-h-[80vh] overflow-y-auto rounded-none">
                      <DialogHeader className="pb-2">
                        <DialogTitle className="text-xl">신고 사유</DialogTitle>
                      </DialogHeader>
                      <div className="whitespace-pre-wrap">
                        {report.reportReason}
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell className="text-gray-700 px-6 text-right">
                  {report.ip}
                </TableCell>
                <TableCell className="text-gray-500 px-6 w-[180px] text-right">
                  {formatDateTime3(report.createdAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex justify-center">
        <div className="w-[400px]">
          <Pagination
            currentPage={number}
            totalPages={totalPages}
            basePath="/admin/article/reports"
          />
        </div>
      </div>
    </div>
  );
}
