"use client";
import { useState } from "react";
import SearchFlights from "@/components/SearchFlights";

export default function Page() {
  const [greeting, setGreeting] = useState<string>(getGreeting());

  return (
    <div className="w-screen md:h-1/2 h-screen flex flex-col gap-3 items-center justify-center md:mx-0 mx-2">
      <h1 className="text-4xl font-semibold">{greeting}, Brian</h1>
      <div className="flex flex-col shadow-md border border-gray-200 p-4 rounded-md gap-8">
        <p className="bg-gray-100 px-6 py-1 rounded-sm flex justify-center w-32">
          Flights
        </p>
        <SearchFlights />
      </div>
    </div>
  );
}

function getGreeting() {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 5 && hour < 12) {
    return "Good Morning";
  } else if (hour >= 12 && hour < 17) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
}
