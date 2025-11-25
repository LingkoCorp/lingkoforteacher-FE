"use client";

import Logo from "@/shared/ui/logo";
import { useEffect, useState } from "react";

interface WorksheetGenerateStepProps {
  onStart: () => void;
  loading: boolean;
}

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
          const next = prev + Math.random() * 15;
          return next >= 90 ? 90 : next;
        });
      }, 300);

      return () => clearInterval(interval);
    } else {
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
