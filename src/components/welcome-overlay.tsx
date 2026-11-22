"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollLock } from "./use-scroll-lock";

const SEEN_KEY = "foodplanks-welcome-seen";
const SHOW_MS = 1800;
const EXIT_MS = 550;

const archColors = ["#e9b44c", "#fdf6e3", "#f6dfae", "#e9b44c", "#fdf6e3", "#e9b44c", "#f7cf7e"];

function archPath(index: number) {
  const cx = 100;
  const baseY = 98 - index * 2.5;
  const width = 94 - index * 11;
  const topY = 30 + index * 8;
  const wave = 5.2 - index * 0.3;
  const steps = 48;
  let d = "";
  for (let step = 0; step <= steps; step += 1) {
    const u = step / steps;
    const x = cx - width + 2 * width * u;
    const dome = Math.sin(Math.PI * u);
    const y = baseY - (baseY - topY) * dome + wave * Math.sin(6 * Math.PI * u) * dome;
    d += `${step === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return d.trim();
}

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
        <svg className="welcome-doodle" viewBox="0 0 200 100" fill="none" aria-hidden="true">
          {archColors.map((color, index) => <path key={color} pathLength={100} style={{ stroke: color }} d={archPath(index)} />)}
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
