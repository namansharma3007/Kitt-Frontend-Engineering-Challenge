import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const jsonFilePath = path.join(process.cwd(), "data/airports.json");

const jsonData = fs.readFileSync(jsonFilePath, "utf-8");

const data: Airport[] = JSON.parse(jsonData).airports;

export async function GET() {
  try {
    return NextResponse.json(
      { message: "Airports fetched successfully", data: data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const {from, to} = await req.json();

    if (!from || !to) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }
    const flights = data.filter(
      (airport) => airport.code === from || airport.code === to
    );
    return NextResponse.json(
      { message: "Flights fetched successfully", data: flights },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error reading fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
