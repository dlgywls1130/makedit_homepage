import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import { draftMode } from "next/headers";
import Link from "next/link";
import { VisualEditing } from "next-sanity/visual-editing";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { site, siteUrl } from "@/lib/site";

// Latin display face for headlines; Korean falls back to self-hosted Pretendard (unicode-range subsets).
const display = Inter_Tight({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-inter-tight" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "ko_KR",
    url: "/",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#f5f4f0" };

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { isEnabled: isDraft } = await draftMode();

  return (
    <html lang="ko" className={`${display.variable} ${mono.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        {isDraft && (
          <>
            <VisualEditing />
            <Link
              href="/api/draft-mode/disable"
              prefetch={false}
              className="fixed right-4 bottom-4 z-50 bg-accent px-4 py-2 font-mono text-xs text-ink"
            >
              미리보기 모드 · 종료
            </Link>
          </>
        )}
      </body>
    </html>
  );
}
