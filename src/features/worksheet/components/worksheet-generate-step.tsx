"use client";

import Logo from "@/shared/ui/logo";
import { useEffect, useState } from "react";

interface WorksheetGenerateStepProps {
  onStart: () => void;
  loading: boolean;
}

const MAX_FAKE_PROGRESS = 95; // loading 중일 때는 95%까지만
const TICK_MS = 100;          // 0.1초마다
const STEP = 1.2;             // 한 번에 1.2%씩 증가 (부드럽게)

export default function WorksheetGenerateStep({
  onStart,
  loading,
}: WorksheetGenerateStepProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    onStart();
  }, [onStart]);

  useEffect(() => {
    if (loading) {
      setProgress(0);

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= MAX_FAKE_PROGRESS) return prev; // 95%에서 멈춤
          const next = prev + STEP;
          return next > MAX_FAKE_PROGRESS ? MAX_FAKE_PROGRESS : next;
        });
      }, TICK_MS);

      return () => clearInterval(interval);
    } else {
      // 실제 작업 끝나면 자연스럽게 100%로 마무리
      setProgress(100);
    }
  }, [loading]);

  const displayProgress = Math.min(Math.round(progress), 100);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
      <div className="absolute top-0 left-2">
        <Logo />
      </div>

      <div className="mt-32 mb-16 text-center">
        <h1 className="text-6xl font-bold text-primary mb-8">
          {displayProgress}%
        </h1>

        <div className="bg-secondary rounded-lg overflow-hidden h-2 w-80 mx-auto">
          <div
            className="bg-primary h-full transition-all duration-300"
            style={{ width: `${displayProgress}%` }}
          />
        </div>

        <p className="mt-6 text-muted-foreground">
          학습지를 생성하고 있어요...
        </p>
      </div>
    </div>
  );
}
