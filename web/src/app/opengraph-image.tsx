import { ImageResponse } from "next/og";

export const alt = "Makedit — MAKE WHAT MATTERS. EDIT WHAT DOESN'T.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default share image. Project pages override it with their CMS thumbnail.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#111111",
          color: "#f5f4f0",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 800, letterSpacing: -1 }}>
          MAKE<span style={{ color: "#a3a29c" }}>DIT</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 800, lineHeight: 0.95, letterSpacing: -4 }}>
          <span>MAKE WHAT MATTERS.</span>
          <span style={{ display: "flex" }}>
            EDIT WHAT&nbsp;
            <span style={{ display: "flex", position: "relative" }}>
              DOESN&apos;T.
              <span style={{ position: "absolute", left: 0, right: 0, top: 44, height: 8, background: "#8b78f6" }} />
            </span>
          </span>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#a3a29c" }}>makedit.co.kr</div>
      </div>
    ),
    size,
  );
}
