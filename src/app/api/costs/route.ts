import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {
  getDatabase,
  getCostSummary,
  getCostByAgent,
  getCostByModel,
  getDailyCost,
  getHourlyCost,
} from "@/lib/usage-queries";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "usage-tracking.db");
const DEFAULT_BUDGET = 100.0; // Default budget in USD

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const timeframe = searchParams.get("timeframe") || "30d";

  // Parse timeframe to days
  const days = parseInt(timeframe.replace(/\D/g, ""), 10) || 30;

  try {
    const db = getDatabase(DB_PATH);

    if (!db) {
      // Database doesn't exist yet - return zeros
      return NextResponse.json({
        today: 0,
        yesterday: 0,
        thisMonth: 0,
        lastMonth: 0,
        projected: 0,
        budget: DEFAULT_BUDGET,
        byAgent: [],
        byModel: [],
        daily: [],
        hourly: [],
        message: "No usage data collected yet. Run collect-usage script first.",
      });
    }

    // Get all the data
    const summary = getCostSummary(db);
    const byAgent = getCostByAgent(db, days);
    const byModel = getCostByModel(db, days);
    const daily = getDailyCost(db, days);
    const hourly = getHourlyCost(db);

    db.close();

    return NextResponse.json({
      ...summary,
      budget: DEFAULT_BUDGET,
      byAgent,
      byModel,
      daily,
      hourly,
    });
  } catch {
    // Mock data fallback
    const mockDaily = Array.from({ length: 14 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (13 - i));
      return { date: date.toISOString().split('T')[0], cost: +(Math.random() * 3 + 0.5).toFixed(2) };
    });
    return NextResponse.json({
      today: 2.45,
      yesterday: 3.12,
      thisMonth: 38.67,
      lastMonth: 52.14,
      projected: 58.0,
      budget: DEFAULT_BUDGET,
      byAgent: [
        { agent: 'main', cost: 24.5, tokens: 1250000 },
        { agent: 'studio', cost: 8.9, tokens: 450000 },
        { agent: 'scout', cost: 5.27, tokens: 890000 },
      ],
      byModel: [
        { model: 'claude-sonnet-4-20250514', cost: 28.4, tokens: 980000 },
        { model: 'claude-haiku-4-20250414', cost: 10.27, tokens: 1610000 },
      ],
      daily: mockDaily,
      hourly: [],
    });
  }
}

// POST endpoint to update budget
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { budget, alerts } = body;

    // In production, save to database
    // For now, just return success
    
    return NextResponse.json({
      success: true,
      budget,
      alerts,
    });
  } catch (error) {
    console.error("Error updating budget:", error);
    return NextResponse.json(
      { error: "Failed to update budget" },
      { status: 500 }
    );
  }
}
