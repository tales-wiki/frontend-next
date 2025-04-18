import Layout from "@/components/layout/Layout";
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "테일즈위키",
  icons: {
    icon: "/icons/logo.ico",
    apple: "/icons/logo.ico",
    shortcut: "/icons/logo.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={notoSansKR.className}>
        <Layout>{children}</Layout>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
