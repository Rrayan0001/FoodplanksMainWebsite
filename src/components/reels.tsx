"use client";

import Image from "next/image";
import { Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { reels } from "@/lib/reels";
import { useScrollLock } from "./use-scroll-lock";

export function ReelsStrip() {
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useScrollLock(selected !== null);

  useEffect(() => {
    if (selected === null) return;
    const element = dialog.current;
    element?.showModal();
    return () => element?.close();
  }, [selected]);

  const close = () => setSelected(null);

  return (
    <>
      <div className="reels-grid">
        {reels.map((reel, index) => (
          <button
            key={reel.src}
            type="button"
            className="reel-card"
            onClick={() => setSelected(index)}
            aria-label={`Play ${reel.title}`}
          >
            <Image src={reel.poster} alt={reel.title} fill sizes="(max-width: 760px) 150px, 205px" />
            <span className="reel-card-overlay">
              <span className="reel-card-caption">{reel.title}</span>
              <Play size={26} aria-hidden="true" className="reel-play-badge" />
            </span>
          </button>
        ))}
      </div>
      <div className="reels-more">
        <span className="reel-dialog-eyebrow">MORE FROM THE KITCHEN</span>
        <div className="reels-photos">
          {["food-7", "food-8", "food-9"].map((name, index) => (
            <div className="reels-photo" key={name}>
              <Image src={`/images/${name}.jpg`} alt={`A dish at Food Planks, Yelahanka — photo ${index + 1}`} fill sizes="(max-width: 760px) 30vw, 220px" />
            </div>
          ))}
        </div>
      </div>
      {selected !== null && (
        <dialog
          ref={dialog}
          className="reel-dialog"
          aria-label={`${reels[selected].title} — Food Planks reel`}
          onCancel={event => { event.preventDefault(); close(); }}
          onClick={event => { if (event.target === event.currentTarget) close(); }}
          onKeyDown={event => {
            if (event.key === "Escape") { event.preventDefault(); close(); }
          }}
        >
          <button type="button" className="icon-button reel-dialog-close" onClick={close} aria-label="Close reel"><X size={22} /></button>
          <div className="reel-dialog-body">
            <video
              className="reel-dialog-video"
              src={reels[selected].src}
              poster={reels[selected].poster}
              controls
              muted
              playsInline
              autoPlay
              preload="metadata"
            />
            <div className="reel-dialog-copy">
              <span className="eyebrow">FOOD PLANKS REEL</span>
              <h2>{reels[selected].title}</h2>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
