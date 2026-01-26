import { useEffect, useState, useRef } from "react";

interface Options extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export function useInView({
  threshold = 0,
  rootMargin = "0px",
  freezeOnceVisible = false,
}: Options = {}) {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        setIntersecting(isElementIntersecting);

        if (isElementIntersecting && freezeOnceVisible) {
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, freezeOnceVisible]);

  return { ref, isIntersecting };
}
