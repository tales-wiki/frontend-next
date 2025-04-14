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

  const handleSubmit = async () => {
    try {
      // TODO: 신고 API 호출 구현
      console.log("신고 내용:", reportContent, "문서 ID:", articleVersionId);
    } catch (error) {
      console.error("신고 제출 중 오류 발생:", error);
    }
  };

  return (
    <Dialog>
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
            className="min-h-[120px] focus-visible:ring-1 focus-visible:ring-red-200 border-gray-200"
          />
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-red-500 hover:bg-red-600 text-white font-medium transition-colors duration-200"
            disabled={reportContent.length < 10}
          >
            신고하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
