"use client";

import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { ChevronDown, ChevronUp } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Viewer = dynamic(
  () => import("@toast-ui/react-editor").then((mod) => mod.Viewer),
  { ssr: false }
);

interface ArticleViewerProps {
  content: string;
}

export default function ArticleViewer({ content }: ArticleViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [tocContent, setTocContent] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    const updateToc = () => {
      if (viewerRef.current) {
        const headings = viewerRef.current.querySelectorAll(
          "h1, h2, h3, h4, h5, h6"
        );

        if (headings.length > 0) {
          const tocItems = Array.from(headings).map((heading, index) => {
            const headingId = `heading-${index}`;
            heading.id = headingId;
            const level = parseInt(heading.tagName[1]);

            return (
              <li
                key={index}
                style={{ marginLeft: `${(level - 1) * 0.75}rem` }}
                className="text-sm text-gray-600 hover:text-blue-600 py-1"
              >
                <a
                  href={`#${headingId}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const targetElement = document.getElementById(headingId);
                    if (targetElement) {
                      targetElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }}
                >
                  {heading.textContent}
                </a>
              </li>
            );
          });

          setTocContent(<ul className="space-y-2">{tocItems}</ul>);
        }
      }
    };

    // 초기 렌더링 후 TOC 업데이트
    const timer = setTimeout(updateToc, 100);

    // Viewer가 업데이트될 때마다 TOC 업데이트
    const observer = new MutationObserver(updateToc);
    if (viewerRef.current) {
      observer.observe(viewerRef.current, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [content]);

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={() => setIsTocOpen(!isTocOpen)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          {isTocOpen ? (
            <>
              <ChevronUp className="w-4 h-4" />
              목차 열기
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              목차 보기
            </>
          )}
        </button>
        {isTocOpen && tocContent && (
          <div className="mt-2 bg-gray-100 rounded-lg p-4">{tocContent}</div>
        )}
      </div>
      <div ref={viewerRef}>
        <Viewer initialValue={content} />
      </div>
    </div>
  );
}
