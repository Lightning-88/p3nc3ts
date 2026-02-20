"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function LoadingBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    bar.style.width = "0%";
    bar.style.opacity = "1";

    let progress = 0;

    timerRef.current = setInterval(() => {
      progress += Math.random() * 10;

      bar.style.width = progress + "%";
    }, 200);

    if (timerRef.current) clearInterval(timerRef.current);

    bar.style.width = "100%";

    setTimeout(() => {
      bar.style.opacity = "0";
      bar.style.width = "0%";
    }, 500);
  }, [pathname]);

  return (
    <div
      ref={barRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "3px",
        width: "0%",
        transition: "width 0.3s ease, opacity 0.3s ease",
        zIndex: 9999,
        opacity: 0,
      }}
      className="bg-primary"
    />
  );
}
