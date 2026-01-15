"use client";

import { useState } from "react";

export function ExpandableText({
  text,
  maxLength = 100,
}: {
  text: string;
  maxLength?: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isLongText = text.length > maxLength;
  const displayText =
    isExpanded || !isLongText ? text : text.slice(0, maxLength) + "...";

  return (
    <div>
      <p className="text-justify whitespace-pre-line">
        {displayText}{" "}
        {isLongText && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm hover:underline mt-1 text-disabled"
          >
            {isExpanded ? "Show Less" : "Show More"}
          </button>
        )}
      </p>
    </div>
  );
}
