// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import Logo from '@/shared/ui/logo'

// export default function Home() {

//   const router = useRouter()

//   const handleClick = () => {
//     router.push('/lingkoforteacher')
//   }

//   return (
//     <main className="min-h-screen bg-background flex items-center justify-center p-4">
//       <div className="relative min-h-screen w-full flex items-center justify-center">
//         <div className="absolute top-0 left-2">
//           <Logo />
//         </div>

//         <button
//           onClick={handleClick}
//           className="px-4 py-2 rounded-md border text-sm font-medium hover:bg-accent hover:text-accent-foreground transition"
//         >
//           lingkoforteacher
//         </button>
//       </div>
//     </main>
//   )
// }

"use client";

import { useCallback, useState } from "react";
import WorksheetIntroStep from "@/features/worksheet/components/worksheet-intro-step";
import WorksheetGenerateStep from "@/features/worksheet/components/worksheet-generate-step";
import WorksheetResultStep from "@/features/worksheet/components/worksheet-result-step";
import { WorksheetFormValues } from "@/features/worksheet/components/worksheet-form";
import { useWorksheet } from "@/features/worksheet/hooks/useWorksheet";

export default function WorksheetPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const { request, setRequest, result, loading, error, submit, reset } =
    useWorksheet();

  const handleIntroSubmit = (data: WorksheetFormValues) => {
    setRequest({
      level: data.level,
      nationality: data.languageCode,
      goal: data.goal,
      extra_note: data.extraNote ?? "",
    });
    setCurrentStep(2);
  };

  const handleGenerateStart = useCallback(async () => {
    await submit();        // 여기서 1~3분 동안 폴링
    setCurrentStep(3);     // 끝나면 결과/에러 화면으로 이동
  }, [submit]);

  const handleResultReset = () => {
    reset();
    setCurrentStep(1);
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      {currentStep === 1 && (
        <WorksheetIntroStep onSubmit={handleIntroSubmit} />
      )}

      {currentStep === 2 && (
        <WorksheetGenerateStep onStart={handleGenerateStart} loading={loading} />
      )}

      {currentStep === 3 && (
        <WorksheetResultStep
          worksheet={result}
          error={error}
          onReset={handleResultReset}
        />
      )}
    </main>
  );
}
