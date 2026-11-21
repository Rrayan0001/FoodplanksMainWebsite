"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollLock } from "./use-scroll-lock";

const SEEN_KEY = "foodplanks-welcome-seen";
const SHOW_MS = 1800;
const EXIT_MS = 550;

/**
 * Premium welcome intro: four wooden planks sketch themselves in,
 * the wordmark rises, then the veil lifts.
 * Shows once per tab session; skipped entirely for reduced motion.
 * ?welcome=stay forces the show for previews without consuming the session.
 */
export default function WelcomeOverlay() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const leftRef = useRef(false);
  const skipRef = useRef<HTMLButtonElement>(null);
  useScrollLock(visible);

  const dismiss = useCallback(() => {
    if (leftRef.current) return;
    leftRef.current = true;
    setLeaving(true);
    window.setTimeout(() => {
      // Rendering null keeps this component mounted, so effect cleanup won't
      // run — restore background interactivity here instead of on unmount.
      document
        .querySelectorAll<HTMLElement>("header, main, footer, .mobile-actions")
        .forEach(element => {
          element.inert = false;
        });
      // Preview mode must not consume the once-per-session show.
      const stay = new URLSearchParams(window.location.search).get("welcome") === "stay";
      if (!stay) {
        try {
          sessionStorage.setItem(SEEN_KEY, "1");
        } catch {
          /* private mode: replay next visit */
        }
      }
      setVisible(false);
    }, EXIT_MS);
  }, []);

  useEffect(() => {
    // ?welcome=stay freezes the intro for deterministic testing and always
    // forces a show (bypasses the seen check); production never uses it.
    const stay = new URLSearchParams(window.location.search).get("welcome") === "stay";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!stay) {
      let seen = false;
      try {
        seen = sessionStorage.getItem(SEEN_KEY) === "1";
      } catch {
        seen = false;
      }
      if (seen) return;
    }
    // Deferred a frame so the splash mounts after hydration without an SSR mismatch.
    const frame = requestAnimationFrame(() => {
      setVisible(true);
      skipRef.current?.focus({ preventScroll: true });
    });
    const background = Array.from(
      document.querySelectorAll<HTMLElement>("header, main, footer, .mobile-actions"),
    );
    const previous = background.map(element => element.inert);
    background.forEach(element => {
      element.inert = true;
    });
    // Auto-dismiss in production; preview mode stays until Skip/Escape.
    const auto = stay ? 0 : window.setTimeout(dismiss, SHOW_MS);
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        dismiss();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(auto);
      background.forEach((element, index) => {
        element.inert = previous[index];
      });
      document.removeEventListener("keydown", onKey);
    };
  }, [dismiss]);

  if (!visible) return null;

  return (
    <div
      className={`welcome ${leaving ? "welcome-leaving" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Food Planks"
    >
      <div className="welcome-inner">
        <p className="welcome-eyebrow">A WOODEN-THEMED ESCAPE IN YELAHANKA</p>
        <svg className="welcome-doodle" viewBox="0 0 171 168" fill="none" aria-hidden="true">
          <path pathLength={100} d="M32 30 H138 A12 12 0 0 1 150 42 A12 12 0 0 1 138 54 H32 A12 12 0 0 1 20 42 A12 12 0 0 1 32 30 Z" />
          <path pathLength={100} d="M27 68 H143 A12 12 0 0 1 155 80 A12 12 0 0 1 143 92 H27 A12 12 0 0 1 15 80 A12 12 0 0 1 27 68 Z" />
          <path pathLength={100} d="M35 106 H135 A12 12 0 0 1 147 118 A12 12 0 0 1 135 130 H35 A12 12 0 0 1 23 118 A12 12 0 0 1 35 106 Z" />
          <path pathLength={100} d="M29 144 H141 A12 12 0 0 1 153 156 A12 12 0 0 1 141 168 H29 A12 12 0 0 1 17 156 A12 12 0 0 1 29 144 Z" />
        </svg>
        <p className="welcome-word">Food Planks</p>
        <p className="welcome-sub">YELAHANKA</p>
        <p className="welcome-tag">Gather round. Stay a while.</p>
        <div className="welcome-loader" aria-hidden="true">
          <span />
        </div>
        <p className="welcome-hint">SETTING YOUR TABLE</p>
      </div>
      <button ref={skipRef} className="welcome-skip" onClick={dismiss}>
        Skip intro
      </button>
    </div>
  );
}
