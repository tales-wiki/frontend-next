"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle } from "lucide-react";
import { ReactNode, useState } from "react";

interface ReportModalProps {
  articleVersionId: number;
  children?: ReactNode;
}

export default function ReportModal({
  articleVersionId,
  children,
}: ReportModalProps) {
  const [reportContent, setReportContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async () => {
    if (reportContent.length < 10) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/versions/${articleVersionId}/report`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reportReason: reportContent,
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json();
          if (errorData.code === "ALREADY_ARTICLE_REPORT_VERSION_ID") {
            throw new Error("이미 신고한 문서입니다.");
          }
        } else {
          throw new Error("신고 제출에 실패했습니다.");
        }
      }

      setReportContent("");
      setIsOpen(false);
      alert("신고가 제출되었습니다.");
    } catch (error) {
      console.error("신고 제출 중 오류 발생:", error);
      setError(
        error instanceof Error
          ? error.message
          : "신고 제출 중 오류가 발생했습니다."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button
            variant="ghost"
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            신고하기
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white rounded-lg shadow-xl">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <DialogTitle className="text-xl font-semibold">
              문서 신고
            </DialogTitle>
          </div>
          <DialogDescription className="text-gray-600">
            부적절한 내용이나 문제가 있는 경우 신고해주세요.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="신고 사유를 상세히 작성해주세요. (최소 10자 이상)"
            value={reportContent}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setReportContent(e.target.value)
            }
            className="min-h-[120px] focus-visible:ring-0 border-gray-400 placeholder:text-gray-400"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-red-500 hover:bg-red-600 text-white font-medium transition-colors duration-200"
            disabled={reportContent.length < 10 || isSubmitting}
          >
            {isSubmitting ? "제출 중..." : "신고하기"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
