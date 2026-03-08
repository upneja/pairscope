import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pairscope — Understand Yourself as a Partner",
  description:
    "A free, research-backed relationship health diagnostic grounded in 50+ years of relationship science. Take the assessment and receive a personalized report with actionable insights.",
  openGraph: {
    title: "Pairscope — Understand Yourself as a Partner",
    description:
      "A free, research-backed diagnostic grounded in 50 years of relationship science.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pairscope — Understand Yourself as a Partner",
    description:
      "A free, research-backed diagnostic grounded in 50 years of relationship science.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
