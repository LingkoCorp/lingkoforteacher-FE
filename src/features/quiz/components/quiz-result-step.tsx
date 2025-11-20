"use client";

import { sampleQuiz } from "@/shared/data/sampleQuiz";
import QuizTemplateBasic from "./quiz-template/quiz-template-basic";
import Logo from "@/shared/ui/logo";
import { QuizData } from "@/types/quiz";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

interface QuizResultStepProps {
  quiz: QuizData;
  onReset: () => void;
}

export default function QuizResultStep({ quiz, onReset }: QuizResultStepProps) {

  // ✅ 학습지 영역 ref
  const printRef = useRef<HTMLDivElement>(null);

  // ✅ 학습지 영역만 프린트
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "quiz-sheet",
    pageStyle: `
      @page { size: A4; margin: 16mm; }
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    `,
  });

  return (
    // ✅ 화면 전체 + 세로 정렬
    <div className="relative min-h-screen w-full">
      {/* ✅ 로고: 왼쪽 위 고정 */}
      <div className="absolute top-0 left-2">
        <Logo />
      </div>

      {/* ✅ 로고 제외한 모든 요소를 중앙으로 모으는 컨테이너 */}
      <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 mt-20">
        
        {/* 안내 헤더 */}
        <div className="w-full max-w-3xl mb-8 bg-gradient-to-r from-primary/10 to-accent/10 p-8 rounded-lg text-center">
          <h1 className="text-3xl font-bold text-primary mb-2">
            학습지가 생성되었습니다!
          </h1>
          <p className="text-muted-foreground">
            아래의 학습 자료를 확인하고 PDF로 다운로드할 수 있습니다.
          </p>
        </div>

        {/* 결과 템플릿 */}
        <div ref={printRef} className="w-full max-w-3xl mb-8">
          <QuizTemplateBasic quiz={quiz} />
        </div>


        {/* 버튼 영역 */}
        <div className="w-full max-w-md space-y-4">
          <button
            onClick={() => handlePrint?.()}  // handlePrint는 optional일 수 있어 ?. 붙이는 습관 추천
            className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors"
          >
            📥 PDF 다운로드
          </button>

          <button
            onClick={onReset}
            className="w-full bg-secondary text-secondary-foreground py-4 rounded-lg font-semibold text-lg hover:bg-secondary/80 transition-colors"
          >
            🏠 홈으로
          </button>
        </div>
      </div>
    </div>
  );
}
