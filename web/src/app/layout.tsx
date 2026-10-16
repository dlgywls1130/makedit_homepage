import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import { draftMode } from "next/headers";
import Link from "next/link";
import { VisualEditing } from "next-sanity/visual-editing";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { site, siteUrl } from "@/lib/site";

// Fonts from the design: Inter for Latin, Noto Sans KR for Korean. Both are self-hosted by next/font.
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: "--font-inter" });
const notoKr = Noto_Sans_KR({ weight: ["400", "500", "700"], variable: "--font-noto-kr", preload: false });

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

export const viewport: Viewport = { themeColor: "#111111" };

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { isEnabled: isDraft } = await draftMode();

  return (
    <html lang="ko" className={`${inter.variable} ${notoKr.variable}`}>
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
