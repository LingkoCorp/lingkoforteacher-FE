'use client'

import { Card } from '@/shared/ui/card';
import { WorksheetData } from '@/types/worksheet'

interface WorksheetTemplateBasicProps {
  worksheetData: WorksheetData;
}

export default function WorksheetTemplateBasic({ worksheetData: worksheetData }: WorksheetTemplateBasicProps) {
  return (
    <div className="w-full max-w-4xl space-y-10 print:space-y-8">
      {/* Header Section */}
      <div className="space-y-3 print:page-break-after-avoid">
        <h1 className="text-4xl font-bold text-primary print:text-2xl">
          🎬 {worksheetData.situationTitle}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed print:text-base">
          {worksheetData.situation}
        </p>
      </div>

      {/* Section 1: Key Expressions */}
      <div className="space-y-4 print:page-break-inside-avoid">
        <h2 className="text-2xl font-bold text-primary border-b-2 border-primary pb-2 print:text-xl">
          📝 주요 표현
        </h2>
        <div className="grid gap-3">
          {worksheetData.expressions.map((expr, idx) => (
            <Card
              key={idx}
              className="p-4 border-l-4 border-l-primary print:break-inside-avoid print:page-break-inside-avoid"
            >
              <div className="space-y-1">
                <div className="text-lg font-semibold text-foreground print:text-base">
                  {expr.korean}
                </div>
                <div className="text-sm text-muted-foreground italic">
                  {expr.romanization}
                </div>
                <div className="text-base text-accent font-medium print:text-sm">
                  {expr.translation}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Section 2: Vocabulary */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-primary border-b-2 border-primary pb-2 print:text-xl">
          📚 주요 단어
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2 print:gap-2">
          {worksheetData.vocabulary.map((vocab, idx) => (
            <Card
              key={idx}
              className="p-3 border-l-4 border-l-accent print:p-2 print:break-inside-avoid"
            >
              <div className="space-y-1">
                <div className="text-lg font-semibold text-foreground print:text-base">
                  {vocab.korean}
                </div>
                <div className="text-sm text-muted-foreground print:text-xs">
                  {vocab.romanization}
                </div>
                <div className="text-sm text-accent print:text-xs">
                  {vocab.translation}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Section 3: Grammar */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-primary border-b-2 border-primary pb-2 print:text-xl">
          🔤 문법 패턴
        </h2>
        <div className="grid gap-4 print:gap-2">
          {worksheetData.grammar_points.map((gram, idx) => (
            <Card key={idx} className="p-5 border-l-4 border-l-primary print:p-3 print:break-inside-avoid">
              <div className="space-y-3">
                <div>
                  <div className="text-lg font-bold text-primary print:text-base">{gram.korean}</div>
                  <div className="text-sm text-muted-foreground print:text-xs">{gram.romanization}</div>
                </div>

                <div className="text-base text-foreground print:text-sm">{gram.translation}</div>

                <div className="bg-secondary/30 p-3 rounded-md print:p-2 print:bg-opacity-20">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide print:text-xs">
                    예문
                  </div>
                  <p className="text-sm text-foreground print:text-xs mt-2 mb-1">
                    {gram.example}
                  </p>
                  <p className="text-xs text-muted-foreground italic print:text-xs">{gram.example_romanization}</p>
                  <p className="text-xs text-accent font-medium print:text-xs">{gram.example_translation}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Section 4: Practice Questions */}
      {/* <div className="space-y-4">
        <h2 className="text-2xl font-bold text-primary border-b-2 border-primary pb-2 print:text-xl">
          ✏️ 연습 문제
        </h2>
        <div className="space-y-4 print:space-y-2">
          <div className="bg-background p-4 rounded-lg border border-border print:p-2 print:border-0 print:bg-white">
            <p className="font-semibold text-foreground mb-3 print:text-sm">
              문제 1: 손님이 들어왔을 때 인사 표현을 고르세요.
            </p>
            <div className="space-y-2 print:space-y-1">
              <label className="flex items-center gap-3 p-2 hover:bg-secondary/20 rounded cursor-pointer print:p-1">
                <input type="checkbox" className="w-4 h-4 print:w-3 print:h-3" />
                <span className="print:text-xs">안녕하세요!</span>
              </label>
              <label className="flex items-center gap-3 p-2 hover:bg-secondary/20 rounded cursor-pointer print:p-1">
                <input type="checkbox" className="w-4 h-4 print:w-3 print:h-3" />
                <span className="print:text-xs">어서 오세요! 주문 도와드리겠습니다.</span>
              </label>
              <label className="flex items-center gap-3 p-2 hover:bg-secondary/20 rounded cursor-pointer print:p-1">
                <input type="checkbox" className="w-4 h-4 print:w-3 print:h-3" />
                <span className="print:text-xs">감사합니다!</span>
              </label>
            </div>
          </div>

          <div className="bg-background p-4 rounded-lg border border-border print:p-2 print:border-0 print:bg-white">
            <p className="font-semibold text-foreground mb-3 print:text-sm">
              문제 2: 결제 방법을 물어볼 때 사용하는 표현은?
            </p>
            <div className="space-y-2 print:space-y-1">
              <label className="flex items-center gap-3 p-2 hover:bg-secondary/20 rounded cursor-pointer print:p-1">
                <input type="checkbox" className="w-4 h-4 print:w-3 print:h-3" />
                <span className="print:text-xs">카드로 할까요?</span>
              </label>
              <label className="flex items-center gap-3 p-2 hover:bg-secondary/20 rounded cursor-pointer print:p-1">
                <input type="checkbox" className="w-4 h-4 print:w-3 print:h-3" />
                <span className="print:text-xs">결제는 카드로 하시겠어요, 현금으로 하시겠어요?</span>
              </label>
              <label className="flex items-center gap-3 p-2 hover:bg-secondary/20 rounded cursor-pointer print:p-1">
                <input type="checkbox" className="w-4 h-4 print:w-3 print:h-3" />
                <span className="print:text-xs">돈을 내세요.</span>
              </label>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}