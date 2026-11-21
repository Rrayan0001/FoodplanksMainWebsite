import Link from "next/link";
import { restaurant } from "@/lib/restaurant";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sources & image credits — Food Planks" };

export default function Credits() {
  return (
    <main className="credits-page wrap">
      <Link className="text-link" href="/">← Back to Food Planks</Link>
      <p className="eyebrow">THE DETAILS BEHIND THE DESIGN</p>
      <h1>Sources &<br /><em>image credits.</em></h1>
      <h2>Restaurant information</h2>
      <p>
        Food Planks is a multi-cuisine restaurant in Yelahanka New Town, Bengaluru,
        serving North Indian, Continental, Chinese, seafood and biryani, with both
        vegetarian and non-vegetarian dishes. This information was compiled from{" "}
        <a href={restaurant.eazydinerUrl} target="_blank" rel="noreferrer">EazyDiner</a>,{" "}
        <a href={restaurant.listingUrl} target="_blank" rel="noreferrer">Zomato</a>, JustDial,
        tribe.best, and the restaurant’s Facebook and X pages, accessed 21 November 2026.
        Opening hours are listed differently across sources, so this site does not show
        times. Please confirm directly before visiting.
      </p>
      <p>
        Menu links lead to Food Planks’ published Zomato listing. No Zomato booking page
        was found, so table enquiries use the restaurant’s phone number. This website does
        not process or confirm reservations.
      </p>
      <h2>Photography & creative direction</h2>
      <p>
        All photographs on this site are placeholders pending owner-supplied images.
        They do not depict the restaurant’s verified premises. Cuisine cards are editorial
        inspiration, not a confirmed menu. No dish prices, customer reviews, ratings or
        awards have been invented.
      </p>
      <ul>
        <li>Hero, story, interlude, gallery and cuisine-card images — generated placeholders, pending owner photography.</li>
        <li>Logo and emblem — text wordmark only, pending owner artwork.</li>
        <li>Restaurant details — <a href={restaurant.eazydinerUrl}>EazyDiner</a>, <a href={restaurant.listingUrl}>Zomato</a>, JustDial, tribe.best, <a href={restaurant.facebookUrl}>Facebook</a> and <a href={restaurant.xUrl}>X</a>.</li>
      </ul>
      <p>
        Typography: Cormorant Garamond and DM Sans, distributed through Google Fonts.
        Icons: Lucide.
      </p>
    </main>
  );
}
