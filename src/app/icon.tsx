import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "32px",
          height: "32px",
          display: "flex",
          borderRadius: "6px",
          overflow: "hidden",
        }}
      >
        <div style={{ width: "33.33%", height: "100%", background: "#002395" }} />
        <div style={{ width: "33.33%", height: "100%", background: "#FFFFFF" }} />
        <div style={{ width: "33.34%", height: "100%", background: "#ED2939" }} />
      </div>
    ),
    { ...size }
  );
}
