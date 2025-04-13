import { Button } from "@/components/ui/button";

export default function RunnerWriter() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold text-gray-900">글작성</h1>
        </div>
        <Button
          size="sm"
          className="bg-slate-600 hover:bg-slate-700 text-white"
        >
          작성하기
        </Button>
      </div>
    </div>
  );
}
