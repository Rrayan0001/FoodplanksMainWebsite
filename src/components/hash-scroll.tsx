"use client";

import { useEffect } from "react";

export function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash === "#") return;
    const id = decodeURIComponent(hash.slice(1));
    const scroll = () => {
      const target = document.getElementById(id);
      if (!target) return;
      const pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - pad;
      window.scrollTo({ top, behavior: "instant" });
    };
    const frame = requestAnimationFrame(scroll);
    const onLoad = () => requestAnimationFrame(scroll);
    window.addEventListener("load", onLoad);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", onLoad);
    };
  }, []);
  return null;
}
