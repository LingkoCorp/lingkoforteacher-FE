import { NextRequest, NextResponse } from "next/server";
import { generateWorksheetContent } from "@/lib/gemini";
import { transformToWorksheetStructure } from "@/lib/worksheet-transformer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { level, nationality, goal, extra_note } = body;

    // Validate required fields
    if (!level || !nationality || !goal) {
      return NextResponse.json(
        { error: "Missing required fields: level, nationality, goal" },
        { status: 400 }
      );
    }

    // Validate level
    const validLevels = ["beginner", "intermediate", "advanced"];
    if (!validLevels.includes(level)) {
      return NextResponse.json(
        { error: `Invalid level. Must be one of: ${validLevels.join(", ")}` },
        { status: 400 }
      );
    }

    // Generate content using Gemini
    const content = await generateWorksheetContent(
      level,
      nationality,
      goal,
      extra_note
    );

    // Transform to worksheet structure
    const worksheetStructure = transformToWorksheetStructure(content);

    // Return response matching the expected format
    return NextResponse.json({
      status: "COMPLETED",
      content: {
        situationTitle: content.situationTitle,
        situation: content.situation,
        expressions: content.expressions,
        vocabulary: content.vocabulary,
        grammar_points: content.grammar_points,
        worksheet_structure: worksheetStructure,
      },
    });
  } catch (error) {
    console.error("Worksheet generation error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      {
        status: "FAILED",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
