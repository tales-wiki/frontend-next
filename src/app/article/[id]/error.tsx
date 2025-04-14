"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { FaExclamationCircle } from "react-icons/fa";

export default function Error({ error }: { error: Error }) {
  return (
    <Alert
      variant="destructive"
      className="border-1 border-red-500 bg-red-50 text-red-500"
    >
      <FaExclamationCircle className="h-4 w-4" />
      <AlertDescription>{error.message}</AlertDescription>
    </Alert>
  );
}
