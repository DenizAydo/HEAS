import type { SVGProps } from "react";
import type { IconName } from "../types";

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name" | "stroke"> {
  name: IconName;
  size?: number;
  stroke?: number;
  color?: string;
}

export function Icon({
  name,
  size = 16,
  color = "currentColor",
  stroke = 1.6,
  ...rest
}: IconProps) {
  const props: SVGProps<SVGSVGElement> = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...rest,
  };
  switch (name) {
    case "cockpit":
      return (
        <svg {...props}>
          <rect x="3" y="4" width="18" height="6" rx="1.5" />
          <rect x="3" y="14" width="11" height="6" rx="1.5" />
          <rect x="16" y="14" width="5" height="6" rx="1.5" />
        </svg>
      );
    case "lens":
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="6" />
          <path d="M16 16l4 4" />
          <path d="M11 8v6M8 11h6" />
        </svg>
      );
    case "profile":
      return (
        <svg {...props}>
          <circle cx="12" cy="8" r="3.4" />
          <path d="M5 20c1.5-3.6 4-5 7-5s5.5 1.4 7 5" />
        </svg>
      );
    case "map":
      return (
        <svg {...props}>
          <path d="M4 7l5-2 6 2 5-2v12l-5 2-6-2-5 2z" />
          <path d="M9 5v12M15 7v12" />
        </svg>
      );
    case "info":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v5M12 8.2v.1" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...props}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "back":
      return (
        <svg {...props}>
          <path d="M19 12H5M11 6l-6 6 6 6" />
        </svg>
      );
    case "check":
      return (
        <svg {...props}>
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      );
    case "x":
      return (
        <svg {...props}>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      );
    case "alert":
      return (
        <svg {...props}>
          <path d="M12 4l9 16H3z" />
          <path d="M12 10v5M12 17.5v.1" />
        </svg>
      );
    case "scope":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3.5" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
        </svg>
      );
    case "lock":
      return (
        <svg {...props}>
          <rect x="5" y="11" width="14" height="9" rx="1.5" />
          <path d="M8 11V8a4 4 0 018 0v3" />
        </svg>
      );
    case "spark":
      return (
        <svg {...props}>
          <path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l4 4M14 14l4 4M18 6l-4 4M10 14l-4 4" />
        </svg>
      );
    case "doc":
      return (
        <svg {...props}>
          <path d="M7 3h8l4 4v14H7z" />
          <path d="M15 3v4h4" />
          <path d="M10 13h6M10 17h6" />
        </svg>
      );
  }
}
