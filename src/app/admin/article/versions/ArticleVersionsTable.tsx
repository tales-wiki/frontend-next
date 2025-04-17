"use client";

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
import { ArticleVersion } from "@/types/article";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Eye, EyeOff, Lock, MinusCircle, Trash2, Unlock } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Viewer = dynamic(
  () => import("@toast-ui/react-editor").then((mod) => mod.Viewer),
  {
    ssr: false,
  }
);

function getStatusBadge(isHiding: boolean, isNoEditing: boolean) {
  return (
    <div className="flex gap-1 justify-end">
      {isHiding && (
        <Badge
          variant="secondary"
          className="text-xs border-gray-200 bg-red-50 text-red-700"
        >
          숨김
        </Badge>
      )}
      {isNoEditing && (
        <Badge
          variant="secondary"
          className="text-xs border-gray-200 bg-yellow-50 text-yellow-700"
        >
          수정 불가
        </Badge>
      )}
      {!isHiding && !isNoEditing && (
        <Badge
          variant="secondary"
          className="text-xs border-gray-200 bg-gray-50 text-gray-700"
        >
          정상
        </Badge>
      )}
    </div>
  );
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

interface ArticleVersionsTableProps {
  versions: ArticleVersion[];
  totalPages: number;
  currentPage: number;
}

export default function ArticleVersionsTable({
  versions,
  totalPages,
  currentPage,
}: ArticleVersionsTableProps) {
  const router = useRouter();

  const handleDelete = async (articleId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/articles/${articleId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "게시글 삭제에 실패했습니다.");
      }

      toast.success("게시글이 성공적으로 삭제되었습니다.");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("게시글 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handleEditMode = async (articleId: number, isNoEditing: boolean) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/articles/${articleId}/edit-mode`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ isNoEditing }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "게시글 편집 모드 변경에 실패했습니다."
        );
      }

      toast.success(
        isNoEditing
          ? "게시글이 수정 불가 상태로 변경되었습니다."
          : "게시글이 수정 가능 상태로 변경되었습니다."
      );
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("게시글 편집 모드 변경 중 오류가 발생했습니다.");
      }
    }
  };

  const handleHideMode = async (
    articleVersionId: number,
    isHiding: boolean
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/articles/versions/${articleVersionId}/hide-mode`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ isHiding }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "게시글 버전 숨김 모드 변경에 실패했습니다."
        );
      }

      toast.success(
        isHiding
          ? "게시글 버전이 숨김 상태로 변경되었습니다."
          : "게시글 버전이 공개 상태로 변경되었습니다."
      );
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("게시글 버전 숨김 모드 변경 중 오류가 발생했습니다.");
      }
    }
  };

  const handleDeleteVersion = async (articleVersionId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/articles/versions/${articleVersionId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "게시글 버전 삭제에 실패했습니다.");
      }

      toast.success("게시글 버전이 성공적으로 삭제되었습니다.");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("게시글 버전 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <>
      <div className="border border-gray-200 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 border-b border-gray-200">
              <TableHead className="w-[100px] font-semibold text-gray-600 px-6">
                버전 ID
              </TableHead>
              <TableHead className="w-[100px] font-semibold text-gray-600 px-6">
                게시글 ID
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
                상태
              </TableHead>
              <TableHead className="font-semibold text-gray-600 px-6 w-[180px] text-right">
                작성일
              </TableHead>
              <TableHead className="font-semibold text-gray-600 px-6 w-[100px] text-right">
                작업
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {versions.map((version) => (
              <TableRow
                key={version.articleVersionId}
                className="hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0"
              >
                <TableCell className="font-medium text-gray-900 px-6">
                  {version.articleVersionId}
                </TableCell>
                <TableCell className="font-medium text-gray-900 px-6">
                  {version.articleId}
                </TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <TableCell className="text-gray-700 px-6 text-right cursor-pointer hover:text-blue-500">
                      {version.title}
                    </TableCell>
                  </DialogTrigger>
                  <DialogContent className="max-w-[90vw] bg-white px-8 py-6 max-h-[80vh] overflow-y-auto rounded-none">
                    <DialogHeader className="pb-4">
                      <DialogTitle className="text-xl">
                        {version.title}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      <Viewer initialValue={version.content} height="400px" />
                    </div>
                  </DialogContent>
                </Dialog>
                <TableCell className="text-gray-700 px-6 text-right">
                  {getCategoryBadge(version.category)}
                </TableCell>
                <TableCell className="text-gray-700 px-6 text-right">
                  {version.nickname}
                </TableCell>
                <TableCell className="px-6 text-right">
                  {getStatusBadge(version.isHiding, version.isNoEditing)}
                </TableCell>
                <TableCell className="text-gray-500 px-6 w-[180px] text-right">
                  {formatDateTime3(version.createdAt)}
                </TableCell>
                <TableCell className="px-6 text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`p-1 h-6 ${
                        version.isHiding
                          ? "bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200"
                          : "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
                      }`}
                      onClick={() =>
                        handleHideMode(
                          version.articleVersionId,
                          !version.isHiding
                        )
                      }
                      title={version.isHiding ? "공개" : "숨김"}
                    >
                      {version.isHiding ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`p-1 h-6 ${
                        version.isNoEditing
                          ? "bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
                          : "bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border-yellow-200"
                      }`}
                      onClick={() =>
                        handleEditMode(version.articleId, !version.isNoEditing)
                      }
                      title={version.isNoEditing ? "수정 허용" : "수정 금지"}
                    >
                      {version.isNoEditing ? (
                        <Unlock className="w-4 h-4" />
                      ) : (
                        <Lock className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200 p-1 h-6"
                      onClick={() =>
                        handleDeleteVersion(version.articleVersionId)
                      }
                      title="버전 삭제"
                    >
                      <MinusCircle className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="bg-red-400 hover:bg-red-500 text-white p-1 h-6"
                      onClick={() => handleDelete(version.articleId)}
                      title="게시글 삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex justify-center">
        <div className="w-[400px]">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/admin/article/versions"
          />
        </div>
      </div>
    </>
  );
}
