import type { Metadata } from "next";
import "./globals.css";
import { PortfolioProvider } from "@/lib/context/PortfolioContext";

export const metadata: Metadata = {
  title: "Anil404 — Anil Kumar Rout | AI & Software Engineering",
  description: "Anil Kumar Rout (Anil404) - Software Engineer & AI Researcher. Specializing in Deep Generative Models, Distributed Systems & Computational Neuroscience.",
  keywords: ["Anil Kumar Rout", "Anil404", "AI Researcher", "Software Engineer", "Next.js", "PyTorch", "Supabase", "CUDA", "Obsidian"],
  authors: [{ name: "Anil Kumar Rout", url: "https://anil404.dev" }],
  openGraph: {
    title: "Anil404 — Anil Kumar Rout | AI & Software Engineering",
    description: "Building intelligent things with code. B.Tech CSE (AI & ML) // Distributed Systems & Computational Neuroscience.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Epilogue:wght@600;700;800;900&family=Kanit:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0c0c0c] text-[#e5e2e1] antialiased selection:bg-[#6b0fa6] selection:text-[#fcfdff] min-h-screen">
        <PortfolioProvider>
          {children}
        </PortfolioProvider>
      </body>
    </html>
  );
}
