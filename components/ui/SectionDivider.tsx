"use client";

interface Props {
  /** color of the section ABOVE the divider */
  topColor?: string;
  /** color of the section BELOW the divider */
  bottomColor?: string;
  flip?: boolean;
}

export function DiagonalDivider({
  topColor = "#1a1d3a",
  bottomColor = "#f8fafc",
  flip = false,
}: Props) {
  return (
    <div className="relative w-full h-12 md:h-16 overflow-hidden" style={{ background: bottomColor }} aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        style={{ transform: flip ? "scaleY(-1)" : undefined }}
      >
        <polygon points="0,0 1440,0 1440,40 0,80" fill={topColor} />
      </svg>
    </div>
  );
}
