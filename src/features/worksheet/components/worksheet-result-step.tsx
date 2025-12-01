"use client";

import Logo from "@/shared/ui/logo";
import { WorksheetData } from "@/types/worksheet";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import WorksheetTemplateBasic from "./worksheet-template/worksheet-template-basic";

import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
} from "@/shared/ui/toast";

interface WorksheetResultStepProps {
  worksheet: WorksheetData | null;
  onReset: () => void;
  error: string | null;
}

export default function WorksheetResultStep({
  worksheet,
  onReset,
  error,
}: WorksheetResultStepProps) {
  const printRef = useRef<HTMLDivElement>(null);

  // ✅ 링크 복사 토스트 open 상태
  const [copyToastOpen, setCopyToastOpen] = useState(false);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "worksheet",
    pageStyle: `
      @page { size: A4; margin: 16mm; }
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    `,
  });

  // ✅ 링크 복사 + 토스트 열기
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText("https://www.lingkoforteacher.kr/");
      setCopyToastOpen(true);
    } catch (err) {
      console.error("링크 복사 실패:", err);
      // 필요하면 여기서 실패용 토스트도 따로 만들 수 있음
    }
  };

  // 1) 에러만 있는 경우
  if (error && !worksheet) {
    return (
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4">
        <div className="absolute top-0 left-2">
          <Logo />
        </div>

        <div className="w-full max-w-md text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">
            😥 학습지 생성에 문제가 생겼어요
          </h1>
          <p className="text-muted-foreground mb-8">{error}</p>

          <button
            onClick={onReset}
            className="w-full bg-secondary text-secondary-foreground py-4 rounded-lg font-semibold text-lg hover:bg-secondary/80 transition-colors"
          >
            🏠 홈으로
          </button>
        </div>
      </div>
    );
  }

  // 2) 안전망
  if (!worksheet) {
    return (
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4">
        <div className="absolute top-0 left-2">
          <Logo />
        </div>
        <p className="text-muted-foreground">
          아직 학습지 데이터를 불러오지 못했습니다. 홈으로 돌아가 다시 시도해 주세요.
        </p>
        <button
          onClick={onReset}
          className="mt-6 bg-secondary text-secondary-foreground py-3 px-6 rounded-lg font-semibold hover:bg-secondary/80 transition-colors"
        >
          🏠 홈으로
        </button>
      </div>
    );
  }

  // 3) 정상적으로 worksheet가 있는 경우
  return (
    <ToastProvider swipeDirection="right">
      <div className="relative min-h-screen w-full">
        <div className="absolute top-0 left-2">
          <Logo />
        </div>

        <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 mt-20">
          <div className="w-full max-w-3xl mb-8 bg-gradient-to-r from-primary/10 to-accent/10 p-8 rounded-lg text-center">
            <h1 className="text-3xl font-bold text-primary mb-2">
              학습지가 생성되었습니다!
            </h1>
            <p className="text-muted-foreground">
              아래의 내용을 확인하고 PDF로 다운로드할 수 있습니다.
            </p>
          </div>

          <div ref={printRef} className="w-full max-w-3xl mb-8">
            <WorksheetTemplateBasic worksheetData={worksheet} />
          </div>

          <div className="w-full max-w-md space-y-4">
            <button
              onClick={() => handlePrint?.()}
              className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors"
            >
              PDF 다운로드
            </button>

            <button
              onClick={handleCopyLink}
              className="w-full bg-secondary text-secondary-foreground py-4 rounded-lg font-semibold text-lg hover:bg-secondary/80 transition-colors"
            >
              링크 복사하기
            </button>

            <button
              onClick={onReset}
              className="w-full bg-secondary text-secondary-foreground py-4 rounded-lg font-semibold text-lg hover:bg-secondary/80 transition-colors"
            >
              홈으로
            </button>
          </div>
        </div>
      </div>

      {/* ✅ 링크 복사 완료 토스트 */}
      <Toast
        open={copyToastOpen}
        onOpenChange={setCopyToastOpen}
        duration={2000} // 2초 후 자동 닫힘
      >
        <div className="grid gap-1">
          <ToastTitle>링크 복사 완료</ToastTitle>
          <ToastDescription>
            링크가 클립보드에 복사되었습니다.
          </ToastDescription>
        </div>
      </Toast>

      {/* ✅ 토스트가 실제로 렌더링될 위치 */}
      <ToastViewport />
    </ToastProvider>
  );
}
