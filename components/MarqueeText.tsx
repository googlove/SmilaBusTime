import { ReactNode } from "react";

interface MarqueeTextProps {
  children: ReactNode;
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
  className?: string;
}

export default function MarqueeText({ children, direction = "left", speed = "normal", className = "" }: MarqueeTextProps) {
  const speedClass = {
    slow: "animate-marquee-slow",
    normal: "animate-marquee",
    fast: "animate-marquee-fast"
  };

  const directionClass = direction === "right" ? "animate-marquee-reverse" : "";

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className={`inline-block ${speedClass[speed]} ${directionClass}`}>
        {children}
      </div>
    </div>
  );
}