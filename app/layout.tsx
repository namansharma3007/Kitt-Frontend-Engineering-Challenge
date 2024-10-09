import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import Provider from "@/redux/provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Search Flight",
  description: "Search Flight",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-screen h-screen">
        <div>
          <Toaster />
        </div>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
