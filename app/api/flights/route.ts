import {  NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const jsonFilePath = path.join(process.cwd(), "data/flights.json");

const jsonData = fs.readFileSync(jsonFilePath, "utf-8");

const data: FlightData[] = JSON.parse(jsonData).flights;

export async function GET() {
  try {
    return NextResponse.json(
      { message: "Flights fetched successfully", data: data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return NextResponse.json(
      { error: "Failed to fetch flights data" },
      { status: 500 }
    );
  }
}
