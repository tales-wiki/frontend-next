"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime3 } from "@/lib/utils/DateFormatter";
import { Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";

interface BlockedIP {
  blockedIpId: number;
  ip: string;
  createdAt: string;
}

export default function IPBlockPage() {
  const [blockedIPs, setBlockedIPs] = useState<BlockedIP[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [newIP, setNewIP] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { ref, inView } = useInView();

  const fetchBlockedIPs = useCallback(
    async (page: number) => {
      if (isLoading) return;
      setIsLoading(true);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/ip-block?page=${page}`,
          { cache: "no-store", credentials: "include" }
        );

        if (!response.ok) {
          throw new Error("IP 차단 목록을 불러오는데 실패했습니다.");
        }

        const data = await response.json();
        const newIPs = data.payload;

        if (newIPs.length === 0) {
          setHasMore(false);
        } else {
          setBlockedIPs((prev) => [...prev, ...newIPs]);
          setPage((prev) => prev + 1);
        }
      } catch (error) {
        console.error("Error fetching blocked IPs:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading]
  );

  const handleAddIP = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/ip-block`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ ip: newIP }),
        }
      );

      if (!response.ok) {
        throw new Error("IP 차단에 실패했습니다.");
      }

      toast.success("IP가 성공적으로 차단되었습니다.");
      setIsDialogOpen(false);
      setNewIP("");
      setBlockedIPs([]);
      setPage(0);
      setHasMore(true);
      fetchBlockedIPs(0);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("IP 차단 중 오류가 발생했습니다.");
      }
    }
  };

  const handleRemoveIP = async (ip: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/ip-block`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ ip }),
        }
      );

      if (!response.ok) {
        throw new Error("IP 차단 해제에 실패했습니다.");
      }

      toast.success("IP 차단이 해제되었습니다.");
      setBlockedIPs((prev) => prev.filter((blockedIP) => blockedIP.ip !== ip));
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("IP 차단 해제 중 오류가 발생했습니다.");
      }
    }
  };

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      fetchBlockedIPs(page);
    }
  }, [inView, hasMore, isLoading, page, fetchBlockedIPs]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">IP 차단 관리</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-50 p-6 rounded-lg">
            <DialogHeader className="pb-4">
              <DialogTitle className="text-xl font-semibold text-gray-800">
                IP 차단 추가
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  IP 주소
                </label>
                <Input
                  placeholder="예: 127.0.0.1"
                  value={newIP}
                  onChange={(e) => setNewIP(e.target.value)}
                  className="bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500 placeholder:text-gray-400"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsDialogOpen(false)}
                  className="h-8 px-3 text-sm border-gray-200 hover:bg-gray-100"
                >
                  취소
                </Button>
                <Button
                  size="sm"
                  onClick={handleAddIP}
                  className="h-8 px-3 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-200"
                >
                  추가
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="border border-gray-200 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 border-b border-gray-200">
              <TableHead className="w-[100px] font-semibold text-gray-600 px-6">
                ID
              </TableHead>
              <TableHead className="font-semibold text-gray-600 px-6 text-right">
                IP 주소
              </TableHead>
              <TableHead className="font-semibold text-gray-600 px-6 w-[180px] text-right">
                차단일
              </TableHead>
              <TableHead className="font-semibold text-gray-600 px-6 w-[100px] text-right">
                작업
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blockedIPs.map((blockedIP) => (
              <TableRow
                key={blockedIP.blockedIpId}
                className="hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0"
              >
                <TableCell className="font-medium text-gray-900 px-6">
                  {blockedIP.blockedIpId}
                </TableCell>
                <TableCell className="text-gray-700 px-6 text-right">
                  {blockedIP.ip}
                </TableCell>
                <TableCell className="text-gray-500 px-6 w-[180px] text-right">
                  {formatDateTime3(blockedIP.createdAt)}
                </TableCell>
                <TableCell className="px-6 text-right">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="bg-red-400 hover:bg-red-500 text-white p-2 h-8 w-8 shadow-sm hover:shadow-md transition-shadow"
                    onClick={() => handleRemoveIP(blockedIP.ip)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div ref={ref} className="h-10 flex items-center justify-center">
        {isLoading && (
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
        )}
      </div>
    </div>
  );
}
