import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pairscope — Free, Science-Backed Relationship Assessment",
  description:
    "Free 10-minute relationship assessment based on 50+ years of science. Get a personalized report with insights and conversation scripts. For singles and couples.",
  openGraph: {
    title: "Pairscope — See Your Relationship Clearly",
    description:
      "A free, research-backed relationship diagnostic grounded in Gottman, attachment theory, and Big Five personality science. 10 minutes. No signup. Real insights.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pairscope — See Your Relationship Clearly",
    description:
      "Free 10-min relationship diagnostic based on Gottman's research, attachment theory & Big Five personality science. Real insights, not a quiz. For singles and couples.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${instrumentSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
