import Image from "next/image";
import { ArrowDown, ArrowUpRight, Clock3, MapPin, MoveUpRight, Phone } from "lucide-react";
import { Header, Reveal, FlavourMenu, Gallery, BookingButton, MotionRibbon, MobileActions } from "@/components/experience";
import { HeroImage } from "@/components/hero-image";
import { ReelsStrip } from "@/components/reels";
import { HashScroll } from "@/components/hash-scroll";
import WelcomeOverlay from "@/components/welcome-overlay";
import { BrandStar } from "@/components/brand-star";
import { restaurant } from "@/lib/restaurant";

export default function Home() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <HashScroll />
    <WelcomeOverlay />
    <Header />
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <HeroImage />
        <div className="hero-shade" />
        <div className="hero-content wrap">
          <div className="eyebrow hero-eyebrow"><span className="little-star"><BrandStar /></span> A WOODEN-THEMED ESCAPE IN YELAHANKA</div>
          <h1 id="hero-title"><span className="hero-line"><span>Gather round.</span></span><span className="hero-line"><em>Stay a while.</em></span></h1>
          <p>A cosy, wood-and-lights restaurant<br />with a menu for the whole table.</p>
          <div className="hero-actions"><BookingButton className="button button-peach">Find your table <ArrowUpRight size={18} /></BookingButton><a className="hero-menu-link" href="#flavours">A taste of Food Planks <span><ArrowUpRight size={20} aria-hidden="true" /></span></a></div>
        </div>
        <div className="hero-bottom wrap"><a href="#story" className="scroll-cue"><span><ArrowDown size={16} /></span> GOOD THINGS AWAIT</a><p>YELAHANKA NEW TOWN, BENGALURU <span>13.0878° N · 77.5904° E</span></p></div>
        <a className="round-stamp" href="#story" aria-label="Discover the Food Planks feeling"><svg viewBox="0 0 120 120" aria-hidden="true"><defs><path id="stamp-circle" d="M60,60m-44,0a44,44 0 1,1 88,0a44,44 0 1,1 -88,0" /></defs><text><textPath href="#stamp-circle" textLength="273">FAMILY · FRIENDS · FOOD · </textPath></text></svg><span className="stamp-center"><span className="stamp-word">Food<br />Planks</span></span></a>
      </section>

      <MotionRibbon />

      <section id="story" className="story section-light section-space">
        <div className="wrap story-grid">
          <Reveal className="story-images"><div className="story-photo"><Image src="/images/exterior-3.jpg" alt="Wooden seating and warm lights at Food Planks, Yelahanka" fill sizes="(max-width: 760px) 85vw, 40vw" /></div><div className="story-detail"><Image src="/images/drinks-upright.jpg" alt="Colourful cocktails and mocktails on the table at Food Planks, Yelahanka" fill sizes="(max-width: 760px) 42vw, 18vw" /></div><span className="image-caption">A TABLE MADE FOR GATHERING</span><span className="photo-note">good food.<br /><em>good company.</em></span></Reveal>
          <Reveal className="story-copy"><p className="eyebrow"><span className="line" /> THE FOOD PLANKS FEELING</p><h2>Wood, warmth and<br />room for <em>everyone.</em></h2><p className="body-copy">Food Planks is a wooden-themed restaurant in Yelahanka New Town, with string lights, flowers and murals, and seats both indoors and out.</p><p className="body-copy">The menu moves between North Indian, Continental and Chinese, with seafood, biryani and salads too. Come with family, friends or a crowd; celebrations are welcome.</p><a className="text-link" href="#visit">Meet us at Food Planks <ArrowUpRight size={18} /></a></Reveal>
        </div>
      </section>

      <section id="flavours" className="flavours section-space">
        <div className="wrap"><Reveal className="section-heading"><div><p className="eyebrow"><span className="line" /> A MENU FOR EVERYONE</p><h2>Something for<br /><em>every plate.</em></h2></div><p>North Indian, Continental and Chinese.<br />Seafood, biryani and more.</p></Reveal><FlavourMenu /><div className="menu-footer"><p>A little cuisine inspiration. Discover current dishes and prices in the full menu.</p><a href={restaurant.menuUrl} target="_blank" rel="noreferrer" className="button button-outline">Explore the full menu <ArrowUpRight size={18} /></a></div></div>
      </section>

      <section className="interlude" aria-label="Pull up a chair"><Image src="/images/exterior-4.jpg" alt="Evening at the wooden hut seating of Food Planks, Yelahanka" fill sizes="100vw" /><div className="interlude-shade" /><Reveal className="interlude-copy"><span className="eyebrow">PULL UP A CHAIR</span><h2>Room for<br /><em>one more plate.</em></h2><span className="interlude-star" aria-hidden="true"><BrandStar /></span></Reveal><span className="interlude-caption">A MOOD WORTH MAKING TIME FOR</span></section>

      <section id="moments" className="moments section-light section-space"><div className="wrap"><Reveal className="section-heading"><div><p className="eyebrow"><span className="line" /> GATHER, EAT, STAY</p><h2>Bring your people.<br /><em>Take your time.</em></h2></div><p>A family lunch. A birthday.<br />Or just a Tuesday dinner out.<br />There’s always a reason to gather.</p></Reveal><Gallery /><div className="moments-bottom"><span>GOOD FOOD IS A REASON. GOOD COMPANY IS THE OCCASION.</span><span className="tiny-flower" aria-hidden="true"><BrandStar /></span></div></div></section>

      <section id="reels" className="reels section-light section-space" aria-label="Food Planks reels"><div className="wrap"><Reveal className="section-heading"><div><p className="eyebrow"><span className="line" /> THE FEED ON THE PLATE</p><h2>The reels.<br /><em>Straight from the feed.</em></h2><p>Watch the moments you follow — now playing here at Food Planks.</p></div></Reveal><ReelsStrip /></div></section>

      <section id="visit" className="visit section-space"><div className="wrap visit-grid"><Reveal className="visit-copy"><p className="eyebrow"><span className="line" /> WE’LL SAVE YOU A SEAT</p><h2>Let’s make<br />a little <em>time.</em></h2><p>Your next good memory could start<br />with a table at Food Planks.</p><BookingButton className="button button-peach">Plan your visit <ArrowUpRight size={18} /></BookingButton><span className="booking-note">Call to plan your table</span></Reveal><Reveal className="visit-card"><span className="visit-star" aria-hidden="true"><BrandStar /></span><span className="eyebrow">FIND YOUR WAY</span><h3>Come find<br />your table.</h3><div className="visit-details"><div><MapPin size={18} /><p>{restaurant.address}<span>Karnataka, India</span></p></div><div><Clock3 size={18} /><p>{restaurant.hours}<span>Confirm directly before you visit</span></p></div><div><Phone size={18} /><p><a href={restaurant.contactUrl}>{restaurant.phone}</a><span><a href="tel:+919901178899">{restaurant.phoneSecondary}</a></span></p></div></div><a className="text-link" href={restaurant.directionsUrl} target="_blank" rel="noreferrer">Get directions <MoveUpRight size={19} /></a><span className="card-coordinates">13.0878° N &nbsp; / &nbsp; 77.5904° E</span></Reveal></div></section>
    </main>
    <MobileActions />
    <footer className="footer"><div className="wrap"><div className="footer-top"><a className="brand" href="#" aria-label="Food Planks home"><Image src="/images/logo-fp.png" alt="Food Planks — Taste of the Town" width={148} height={117} className="brand-footer-logo" /></a><p>Come hungry.<br /><em>Leave a little happier.</em></p><a className="back-top" href="#">BACK TO TOP <ArrowUpRight size={18} /></a></div><div className="footer-links"><span>FAMILY · FRIENDS · FOOD</span><nav aria-label="Footer navigation"><a href="#story">Our story</a><a href={restaurant.menuUrl} target="_blank" rel="noreferrer">The menu <ArrowUpRight size="1em" aria-hidden="true" /></a><a href="#visit">Find us</a></nav></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Food Planks, Yelahanka</span><span>Gather round. Stay a while.</span><span className="footer-social"><a href={restaurant.facebookUrl} target="_blank" rel="noreferrer">Facebook</a> · <a href={restaurant.xUrl} target="_blank" rel="noreferrer">X</a> · <a href="/credits">Sources & image credits</a></span></div></div></footer>
  </>;
}
