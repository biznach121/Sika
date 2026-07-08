"use client";

import { useEffect, useState } from "react";

/**
 * Animated search placeholder: types each suggestion character by character,
 * holds, deletes, then moves to the next. Words come from `brand.search`.
 * Respects `prefers-reduced-motion` (falls back to the first suggestion).
 */
export function useTypewriterPlaceholder(
  words: string[],
  { prefix = "Search ", typeMs = 70, deleteMs = 35, holdMs = 1600 } = {},
) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (words.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(words[0]);
      return;
    }

    let wordIndex = 0;
    let chars = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const word = words[wordIndex % words.length];
      chars += deleting ? -1 : 1;
      setText(word.slice(0, chars));

      let delay = deleting ? deleteMs : typeMs;
      if (!deleting && chars === word.length) {
        deleting = true;
        delay = holdMs;
      } else if (deleting && chars === 0) {
        deleting = false;
        wordIndex += 1;
        delay = typeMs * 4;
      }
      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, typeMs);
    return () => clearTimeout(timer);
  }, [words]);

  return `${prefix}“${text}”`;
}
