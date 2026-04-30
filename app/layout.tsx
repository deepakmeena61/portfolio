import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Deepak Meena | Applied AI & GenAI Engineer",
  description:
    "Portfolio of Deepak Meena — Applied AI / GenAI Engineer. LLMs, RAG, ML Systems. Also: soccer player, DJ, cook, and occasional philosopher.",
  keywords: [
    "AI Engineer",
    "GenAI",
    "LLM",
    "RAG",
    "Machine Learning",
    "Portfolio",
    "Deepak Meena"
  ],
  authors: [{ name: "Deepak Meena" }],
  openGraph: {
    title: "Deepak Meena | Applied AI & GenAI Engineer",
    description:
      "Turning Data into Intelligent Products — and mixing beats while doing it.",
    url: "https://deepakmeena.vercel.app",
    siteName: "Deepak Meena",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Deepak Meena | Applied AI & GenAI Engineer",
    description:
      "Turning Data into Intelligent Products — and mixing beats while doing it.",
    images: ["/og-image.png"]
  },
  metadataBase: new URL("https://deepakmeena.vercel.app")
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
