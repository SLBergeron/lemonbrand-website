import { ImageResponse } from "next/og";

// OG Image dimensions (standard)
export const ogImageSize = {
  width: 1200,
  height: 630,
};

// Shared content type for OG generation
export const ogImageContentType = "image/png";

// LemonBrand orange
const BRAND_ORANGE = "#E67E22";

interface OgImageProps {
  title: string;
  subtitle?: string;
  badge?: string;
}

/**
 * Generate a branded OG image for Learn app with:
 * - Large title text
 * - Lemon logo
 * - Wordmark SVG at bottom
 * - Dot grid background
 * - Orange radial gradients
 */
export function generateOgImage({ title, subtitle, badge }: OgImageProps) {
  // Generate dot grid as array of elements
  const dots: React.ReactNode[] = [];
  const spacing = 32;
  const rows = Math.ceil(630 / spacing);
  const cols = Math.ceil(1200 / spacing);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      dots.push(
        <div
          key={`${row}-${col}`}
          style={{
            position: "absolute",
            left: col * spacing + 16,
            top: row * spacing + 16,
            width: 4,
            height: 4,
            borderRadius: 2,
            backgroundColor: "rgba(230, 126, 34, 0.12)",
          }}
        />
      );
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FAFAFA",
          position: "relative",
        }}
      >
        {/* Orange radial gradient - top left */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 600,
            height: 600,
            borderRadius: 300,
            background: "radial-gradient(circle, rgba(230, 126, 34, 0.15) 0%, rgba(230, 126, 34, 0) 70%)",
          }}
        />

        {/* Orange radial gradient - bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: -150,
            right: -100,
            width: 700,
            height: 700,
            borderRadius: 350,
            background: "radial-gradient(circle, rgba(243, 156, 18, 0.12) 0%, rgba(243, 156, 18, 0) 70%)",
          }}
        />

        {/* Dot grid background */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
          }}
        >
          {dots}
        </div>

        {/* Content container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            zIndex: 10,
          }}
        >
          {/* Badge */}
          {badge && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: "rgba(230, 126, 34, 0.1)",
                padding: "8px 20px",
                borderRadius: 20,
                fontSize: 18,
                fontWeight: 600,
                color: BRAND_ORANGE,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {badge}
            </div>
          )}

          {/* Lemon Logo */}
          <svg
            width="80"
            height="80"
            viewBox="0 0 256 256"
            fill="none"
          >
            <path
              d="M84.1833 41.8891C79.895 37.6008 72.9091 37.5534 69.0895 42.229C53.2039 61.6746 44.4478 86.1339 44.5055 111.522C44.5716 140.579 56.1778 168.472 76.771 189.065C97.3641 209.658 125.257 221.265 154.314 221.331C179.702 221.388 204.162 212.632 223.607 196.747C228.283 192.927 228.235 185.941 223.947 181.653C219.659 177.365 212.758 177.412 207.988 181.113C192.72 192.959 173.837 199.463 154.264 199.419C131.019 199.366 108.704 190.081 92.2298 173.606C75.7553 157.132 66.4703 134.817 66.4175 111.572C66.373 91.9989 72.8768 73.116 84.7228 57.8478C88.4238 53.0777 88.4716 46.1774 84.1833 41.8891Z"
              fill={BRAND_ORANGE}
            />
            <path
              d="M161.342 186.139C153.214 188.317 145.776 180.879 147.954 172.751L156.431 141.113C158.609 132.985 168.769 130.262 174.719 136.213L197.88 159.373C203.83 165.323 201.108 175.483 192.98 177.661L161.342 186.139Z"
              fill={BRAND_ORANGE}
            />
            <path
              d="M94.4052 119.202C86.2772 121.38 78.8396 113.942 81.0175 105.814L89.4949 74.1758C91.6728 66.0478 101.833 63.3254 107.783 69.2755L130.944 92.4363C136.894 98.3864 134.171 108.546 126.043 110.724L94.4052 119.202Z"
              fill={BRAND_ORANGE}
            />
            <path
              d="M131.067 171.555C128.889 179.683 118.729 182.405 112.779 176.455L89.6183 153.295C83.6682 147.344 86.3905 137.184 94.5185 135.007L126.157 126.529C134.285 124.351 141.722 131.789 139.545 139.917L131.067 171.555Z"
              fill={BRAND_ORANGE}
            />
          </svg>

          {/* Title */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#1a1a1a",
              textAlign: "center",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: 1000,
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          {subtitle && (
            <div
              style={{
                fontSize: 28,
                fontWeight: 400,
                color: "#666666",
                textAlign: "center",
                maxWidth: 800,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        {/* Wordmark + Learn badge at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          {/* Small lemon icon */}
          <svg width="28" height="28" viewBox="0 0 256 256" fill="none">
            <path
              d="M84.1833 41.8891C79.895 37.6008 72.9091 37.5534 69.0895 42.229C53.2039 61.6746 44.4478 86.1339 44.5055 111.522C44.5716 140.579 56.1778 168.472 76.771 189.065C97.3641 209.658 125.257 221.265 154.314 221.331C179.702 221.388 204.162 212.632 223.607 196.747C228.283 192.927 228.235 185.941 223.947 181.653C219.659 177.365 212.758 177.412 207.988 181.113C192.72 192.959 173.837 199.463 154.264 199.419C131.019 199.366 108.704 190.081 92.2298 173.606C75.7553 157.132 66.4703 134.817 66.4175 111.572C66.373 91.9989 72.8768 73.116 84.7228 57.8478C88.4238 53.0777 88.4716 46.1774 84.1833 41.8891Z"
              fill={BRAND_ORANGE}
            />
            <path
              d="M161.342 186.139C153.214 188.317 145.776 180.879 147.954 172.751L156.431 141.113C158.609 132.985 168.769 130.262 174.719 136.213L197.88 159.373C203.83 165.323 201.108 175.483 192.98 177.661L161.342 186.139Z"
              fill={BRAND_ORANGE}
            />
            <path
              d="M94.4052 119.202C86.2772 121.38 78.8396 113.942 81.0175 105.814L89.4949 74.1758C91.6728 66.0478 101.833 63.3254 107.783 69.2755L130.944 92.4363C136.894 98.3864 134.171 108.546 126.043 110.724L94.4052 119.202Z"
              fill={BRAND_ORANGE}
            />
            <path
              d="M131.067 171.555C128.889 179.683 118.729 182.405 112.779 176.455L89.6183 153.295C83.6682 147.344 86.3905 137.184 94.5185 135.007L126.157 126.529C134.285 124.351 141.722 131.789 139.545 139.917L131.067 171.555Z"
              fill={BRAND_ORANGE}
            />
          </svg>

          {/* LemonBrand text */}
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#1a1a1a",
              letterSpacing: "-0.01em",
            }}
          >
            LemonBrand
          </div>

          {/* Learn badge */}
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: BRAND_ORANGE,
              backgroundColor: "rgba(230, 126, 34, 0.1)",
              padding: "4px 10px",
              borderRadius: 6,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Learn
          </div>
        </div>
      </div>
    ),
    {
      ...ogImageSize,
    }
  );
}
