'use client'

import { useState } from 'react'
import { WorksheetForm, WorksheetFormValues } from '@/features/worksheet/components/worksheet-form';
import Logo from '@/shared/ui/logo';

interface WorksheetIntroStepProps {
  onSubmit: (data: WorksheetFormValues) => void;
}

export default function WorksheetIntroStep({ onSubmit }: WorksheetIntroStepProps) {

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
      {/* 화면 왼쪽 위 로고 */}
      <div className="absolute top-0 left-2">
        <Logo />
      </div>

      {/* 가운데 카드 영역 */}
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-primary mb-2">
            lingkoforteacher
          </h1>
          <p className="text-lg text-muted-foreground">
            한국어 선생님을 위한 AI 학습지 생성 툴
          </p>
        </div>

        <WorksheetForm onSubmit={onSubmit} />
      </div>
    </div>
  )
}
