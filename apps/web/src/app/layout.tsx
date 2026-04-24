import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BlockThread",
  description:
    "Convert clothing photos into Roblox classic shirt and pants templates.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
