import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BriefCraft — AI Content Brief Generator",
  description:
    "Generate structured content briefs in seconds. Paste a topic, get a complete brief with audience insights, SEO keywords, outline, and tone guide — powered by Claude.",
  openGraph: {
    title: "BriefCraft — AI Content Brief Generator",
    description: "Generate structured content briefs in seconds.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0a",
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
