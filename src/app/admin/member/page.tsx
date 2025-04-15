import { Badge } from "@/components/ui/badge";
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
import { Metadata } from "next";

interface Member {
  id: number;
  email: string;
  social: string;
  authority: string;
  createdAt: string | null;
}

export const metadata: Metadata = {
  title: "회원 관리",
  description: "회원 목록을 관리하는 페이지입니다.",
};

function getSocialBadge(social: string) {
  switch (social) {
    case "KAKAO":
      return (
        <Badge
          variant="secondary"
          className="text-xs border-gray-200 bg-yellow-50 text-yellow-700"
        >
          카카오
        </Badge>
      );
    case "GOOGLE":
      return (
        <Badge
          variant="secondary"
          className="text-xs border-gray-200 bg-blue-50 text-blue-700"
        >
          구글
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="text-xs border-gray-200">
          {social}
        </Badge>
      );
  }
}

function getAuthorityBadge(authority: string) {
  switch (authority) {
    case "ADMIN":
      return (
        <Badge
          variant="secondary"
          className="text-xs border-gray-200 bg-red-50 text-red-700"
        >
          관리자
        </Badge>
      );
    case "MEMBER":
      return (
        <Badge
          variant="secondary"
          className="text-xs border-gray-200 bg-green-50 text-green-700"
        >
          일반회원
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="text-xs border-gray-200">
          {authority}
        </Badge>
      );
  }
}

async function getMembers(page: number = 0) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/members?page=${page}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("회원 정보를 불러오는데 실패했습니다.");
  }

  return response.json();
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = params?.page ? parseInt(params.page) : 0;
  const { content: members, totalPages, number } = await getMembers(page);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">회원 관리</h1>
      <div className="border border-gray-200 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 border-b border-gray-200">
              <TableHead className="w-[100px] font-semibold text-gray-600 px-6">
                ID
              </TableHead>
              <TableHead className="text-right font-semibold text-gray-600 px-6">
                이메일
              </TableHead>
              <TableHead className="text-right font-semibold text-gray-600 px-6">
                소셜 로그인
              </TableHead>
              <TableHead className="text-right font-semibold text-gray-600 px-6">
                권한
              </TableHead>
              <TableHead className="text-right font-semibold text-gray-600 px-6 w-[180px]">
                가입일
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member: Member) => (
              <TableRow
                key={member.id}
                className="hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0"
              >
                <TableCell className="font-medium text-gray-900 px-6">
                  {member.id}
                </TableCell>
                <TableCell className="text-right text-gray-700 px-6">
                  {member.email}
                </TableCell>
                <TableCell className="text-right px-6">
                  {getSocialBadge(member.social)}
                </TableCell>
                <TableCell className="text-right px-6">
                  {getAuthorityBadge(member.authority)}
                </TableCell>
                <TableCell className="text-right text-gray-500 px-6 w-[180px]">
                  {member.createdAt ? formatDateTime3(member.createdAt) : "-"}
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
            basePath="/admin/member"
          />
        </div>
      </div>
    </div>
  );
}
