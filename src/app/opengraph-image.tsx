import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name} Open Graph`;
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background:
            "linear-gradient(135deg, #0f172a 0%, #111827 45%, #dc2626 100%)",
          color: "white",
          padding: "56px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top right, rgba(255,255,255,0.18), transparent 32%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.16)",
              padding: "14px 24px",
              fontSize: "28px",
              fontWeight: 700,
            }}
          >
            {siteConfig.name}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "780px" }}>
            <div style={{ fontSize: "72px", fontWeight: 800, lineHeight: 1.05 }}>
              Hayatin Her Aninda
              <br />
              Guvendesiniz
            </div>
            <div
              style={{
                fontSize: "32px",
                lineHeight: 1.4,
                color: "rgba(255,255,255,0.85)",
              }}
            >
              Kasko, trafik, saglik ve konut sigortasinda size en uygun teklifleri
              hizli ve guvenli sekilde alin.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "28px",
              color: "rgba(255,255,255,0.78)",
            }}
          >
            <span>{siteConfig.contact.phoneDisplay}</span>
            <span>Konya / Karatay</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
