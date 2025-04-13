import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="container mx-auto">
      <h1 className="text-4xl font-bold mb-8">
        테일즈위키에 오신 것을 환영합니다!
      </h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>테일즈위키란?</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            <li>익명성과 공익성을 목적으로 만들어진 사이트입니다.</li>
            <li>누구나 쉽게 사전을 작성하고 편집할 수 있습니다.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>주의사항</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              부적절한 내용이나 욕설, 비방 등의 게시물은 삭제될 수 있습니다.
            </li>
            <li>타인의 신상 정보나 개인정보를 공개하는 것은 금지됩니다.</li>
            <li>
              다른 사용자들을 존중하고 배려하는 마음으로 글을 작성해주세요.
            </li>
            <li>
              허위 정보나 오해의 소지가 있는 내용은 자제해주시기 바랍니다.
            </li>
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
