import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroVideo from "@/assets/hero-coffee-new.mp4.asset.json";
import productPack from "@/assets/anita-pack.jpg.asset.json";
import coffeePack from "@/assets/coffee-pack.png.asset.json";
import teaPack from "@/assets/tea-pack.png.asset.json";
import logo from "@/assets/anita-logo.png.asset.json";
import { SmoothScroll } from "@/components/SmoothScroll";
import { FloatingBeans } from "@/components/FloatingBeans";
import { CoffeeBean } from "@/components/CoffeeBean";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anita Cafe — Premium Filter Coffee & Tea Collection" },
      { name: "description", content: "Crafted for every perfect sip. Premium filter coffee powders and tea blends, sourced, roasted and packed with care." },
      { property: "og:title", content: "Anita Cafe — Premium Filter Coffee & Tea Collection" },
      { property: "og:description", content: "Crafted for every perfect sip. Premium filter coffee powders and tea blends." },
      { property: "og:image", content: coffeePack.url },
      { name: "twitter:image", content: coffeePack.url },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative bg-background text-foreground">
      <SmoothScroll />
      <Nav />
      <Hero />
      <Story />
      <Journey />
      <Product />
      <Brewing />
      <Testimonials />
      <PriceList />
      <WhyUs />
      <Contact />
      <Footer />
      <FloatingButtons />
    </main>
  );
}

/* ---------- NAV ---------- */
function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-4 flex w-[min(1200px,92%)] items-center justify-between rounded-full glass px-5 py-3">
        <a href="#hero" className="flex items-center gap-2">
          <img src={logo.url} alt="Anita Cafe" className="h-10 w-auto" />
          <span className="font-display text-xl tracking-wide text-shine">Anita Cafe</span>
        </a>
        <nav className="hidden gap-7 text-sm text-muted-foreground md:flex">
          {[
            ["Story", "#story"],
            ["Journey", "#journey"],
            ["Products", "#product"],
            ["Pricing", "#pricing"],
            ["Contact", "#contact"],
          ].map(([l, h]) => (
            <a key={h} href={h} className="transition hover:text-[var(--gold)]">
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="rounded-full bg-gradient-gold px-4 py-2 text-sm font-medium text-[oklch(0.18_0.025_140)] shadow-gold transition hover:scale-[1.03]"
        >
          Order Now
        </a>
      </div>
    </header>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section id="hero" ref={ref} className="relative min-h-screen w-full overflow-hidden bg-hero">
      {/* Layer 1: video */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-55"
        src={heroVideo.url}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.13_0.025_145/0.5)] via-[oklch(0.18_0.03_50/0.55)] to-[oklch(0.13_0.025_145)]" />

      {/* Golden sun rays */}
      <div
        className="pointer-events-none absolute -left-40 -top-40 h-[60vw] w-[60vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.88 0.14 85 / 0.35), transparent 60%)",
          filter: "blur(20px)",
        }}
      />

      {/* Layer 2: floating beans */}
      <FloatingBeans />

      {/* Layer 3: content + product */}
      <div className="relative z-10 mx-auto flex min-h-screen w-[min(1200px,92%)] flex-col items-center justify-center pt-24 text-center">
        <span className="mb-6 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-[var(--gold-soft)] opacity-0 [animation:fade-in_1s_ease-out_0.4s_forwards]">
          Premium Filter Coffee · Since Tradition
        </span>
        <div className="opacity-0 [animation:fade-in_1.2s_ease-out_3s_forwards]">
          <h1 className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.95] text-shine">
            Premium Filter Coffee <em className="not-italic text-[var(--cream)]">&amp;</em> Tea Collection
          </h1>
        </div>
        <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg opacity-0 [animation:fade-in_1s_ease-out_3.6s_forwards]">
          Crafted for every perfect sip — rich aroma, authentic taste, and unforgettable moments in every cup.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 opacity-0 [animation:fade-in_1s_ease-out_4.2s_forwards]">
          <a
            href="#product"
            className="rounded-full bg-gradient-gold px-7 py-3 font-medium text-[oklch(0.18_0.025_140)] shadow-gold transition hover:scale-105"
          >
            Explore Coffee
          </a>
          <a
            href="#contact"
            className="rounded-full glass px-7 py-3 font-medium text-foreground transition hover:bg-[oklch(0.95_0.02_80/0.12)]"
          >
            Contact Us
          </a>
        </div>

      </div>
    </section>
  );
}

/* ---------- Generic reveal ---------- */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setShown(true),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

function Reveal({
  children,
  delay = 0,
  from = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  from?: "up" | "left" | "right";
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const initial =
    from === "left"
      ? "translate-x-[-40px]"
      : from === "right"
      ? "translate-x-[40px]"
      : "translate-y-10";
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out ${
        shown ? "translate-x-0 translate-y-0 opacity-100" : `${initial} opacity-0`
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------- STORY ---------- */
function Story() {
  return (
    <section id="story" className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.13_0.025_145)] to-[oklch(0.18_0.03_50)]" />
      <FloatingBeans density={0.5} />
      <div className="relative mx-auto grid w-[min(1200px,92%)] gap-16 md:grid-cols-2 md:items-center">
        <Reveal from="left">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-[var(--gold-soft)]">Our Story</p>
          <h2 className="font-display text-5xl leading-tight md:text-6xl">
            Sourced, roasted &amp; <span className="text-gradient-gold">blended</span> with care.
          </h2>
          <p className="mt-6 text-muted-foreground">
            At Anita Cafe, we carefully source, roast, and blend premium coffee and tea to deliver rich aroma, authentic taste, and unforgettable moments in every cup.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {[
              "Passion for authentic coffee",
              "Carefully selected beans",
              "Traditional roasting process",
              "Freshly ground coffee powder",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="h-1.5 w-6 rounded-full bg-gradient-gold" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal from="right" delay={150}>
          <div className="relative grid grid-cols-2 gap-4">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-gold opacity-20 blur-3xl" />
            <div className="relative group">
              <img
                src={coffeePack.url}
                alt="Anita Cafe premium filter coffee powder pack"
                className="relative h-[480px] w-full rounded-[2rem] object-contain bg-[oklch(0.22_0.03_145)] p-6 shadow-luxe transition-transform duration-500 group-hover:-translate-y-2"
              />
              <p className="mt-3 text-center text-xs uppercase tracking-[0.3em] text-[var(--gold-soft)]">Coffee</p>
            </div>
            <div className="relative group mt-12">
              <img
                src={teaPack.url}
                alt="Anita Cafe premium tea collection pack"
                className="relative h-[480px] w-full rounded-[2rem] object-contain bg-[oklch(0.95_0.04_85)] p-6 shadow-luxe transition-transform duration-500 group-hover:-translate-y-2"
              />
              <p className="mt-3 text-center text-xs uppercase tracking-[0.3em] text-[var(--gold-soft)]">Tea</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- JOURNEY ---------- */
const JOURNEY = [
  { n: "01", t: "Plantation", d: "Mist-soaked estates where every leaf and bean begins." },
  { n: "02", t: "Handpicked Selection", d: "Only the finest cherries and tender leaves make the cut." },
  { n: "03", t: "Roasting & Processing", d: "Slow-roasted and processed to unlock deep aromatic oils." },
  { n: "04", t: "Fresh Grinding", d: "Ground in small batches for peak freshness in every pack." },
  { n: "05", t: "Perfect Brew", d: "Brewed strong, sipped slow — served with tradition." },
];

function Journey() {
  return (
    <section id="journey" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.18_0.03_50)] to-[oklch(0.13_0.025_145)]" />
      <div className="relative mx-auto w-[min(1200px,92%)]">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--gold-soft)]">The Journey</p>
          <h2 className="mt-3 font-display text-5xl md:text-6xl">Coffee &amp; Tea Journey.</h2>
          <p className="mt-3 text-muted-foreground">Scroll horizontally — from plantation to your perfect cup.</p>
        </Reveal>

        <div className="relative mt-16 -mx-[max(0px,calc((100vw-1200px)/2))]">
          <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-[max(16px,calc((100vw-1200px)/2))] pb-8 [scrollbar-width:thin]">
            {JOURNEY.map((s, i) => (
              <div
                key={s.n}
                className="group relative w-[78vw] flex-none snap-center sm:w-[420px]"
              >
                <div className="glass relative h-[420px] overflow-hidden rounded-3xl p-8 shadow-soft transition duration-500 hover:-translate-y-2 hover:shadow-gold">
                  <div className="font-display text-[7rem] leading-none text-gradient-gold opacity-60">{s.n}</div>
                  <h3 className="mt-2 font-display text-3xl">Step {i + 1}</h3>
                  <p className="mt-1 font-display text-2xl text-[var(--gold-soft)]">{s.t}</p>
                  <p className="mt-4 text-sm text-muted-foreground">{s.d}</p>
                  <div className="absolute -bottom-10 -right-10 grid h-40 w-40 place-items-center rounded-full glass shadow-gold opacity-60 animate-spin-slow">
                    <CoffeeBean size={48} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- PRODUCT ---------- */
const COFFEE_PRODUCTS = [
  "Home Blend",
  "Commercial Blend",
  "INS Elite",
  "INS Premium",
  "INS Strong",
  "Arabica RCB",
  "Aroma Gold RCB",
  "Premium Gold RCB",
];
const TEA_PRODUCTS = ["CTC Tea", "Ginger Tea", "Masala Tea"];

function Product() {
  const [tab, setTab] = useState<"coffee" | "tea">("coffee");
  const items = tab === "coffee" ? COFFEE_PRODUCTS : TEA_PRODUCTS;
  const img = tab === "coffee" ? coffeePack.url : teaPack.url;
  return (
    <section id="product" className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.13_0.025_145)] to-[oklch(0.18_0.03_50)]" />
      <FloatingBeans density={0.5} />
      <div className="relative mx-auto w-[min(1200px,92%)]">
        <Reveal>
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-[var(--gold-soft)]">Product Collection</p>
            <h2 className="mt-3 font-display text-5xl md:text-6xl">A pack for every perfect sip.</h2>
          </div>
        </Reveal>

        <div className="mt-12 flex justify-center">
          <div className="glass inline-flex rounded-full p-1.5">
            {(["coffee", "tea"] as const).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setTab(k)}
                className={`rounded-full px-6 py-2.5 text-sm font-medium transition ${
                  tab === k
                    ? "bg-gradient-gold text-[oklch(0.18_0.025_140)] shadow-gold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {k === "coffee" ? "Coffee Collection" : "Tea Collection"}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((name, i) => (
            <ProductCard key={`${tab}-${name}`} name={name} image={img} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ name, image, index }: { name: string; image: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  return (
    <div
      style={{
        animation: `fade-in 0.7s ease-out ${index * 80}ms backwards`,
      }}
    >
      <div
        ref={ref}
        onMouseMove={(e) => {
          const r = ref.current!.getBoundingClientRect();
          setTilt({
            x: ((e.clientX - r.left) / r.width - 0.5) * 2,
            y: ((e.clientY - r.top) / r.height - 0.5) * 2,
          });
        }}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        className="group glass relative h-[340px] overflow-hidden rounded-3xl p-5 shadow-soft transition duration-300 hover:shadow-gold"
        style={{
          transform: `perspective(900px) rotateY(${tilt.x * 8}deg) rotateX(${-tilt.y * 8}deg) scale(${tilt.x || tilt.y ? 1.03 : 1})`,
        }}
      >
        <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-gradient-gold opacity-0 blur-3xl transition group-hover:opacity-30" />
        <div className="grid h-[220px] place-items-center">
          <img src={image} alt={name} className="max-h-full max-w-full object-contain drop-shadow-2xl transition duration-500 group-hover:scale-105" />
        </div>
        <div className="mt-3 text-center">
          <h3 className="font-display text-xl text-shine">{name}</h3>
          <p className="mt-1 text-xs uppercase tracking-[0.25em] text-[var(--gold-soft)]">Premium Blend</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- BREWING ---------- */
function Brewing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height + vh;
      const done = Math.min(Math.max((vh - r.top) / total, 0), 1);
      setP(done);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fill = Math.min(Math.max((p - 0.25) * 2, 0), 1);
  const drip = Math.min(Math.max((p - 0.15) * 2.5, 0), 1);

  return (
    <section id="brewing" ref={sectionRef} className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.18_0.03_50)] via-[oklch(0.13_0.025_145)] to-[oklch(0.18_0.03_50)]" />
      <div className="relative mx-auto grid w-[min(1200px,92%)] gap-16 md:grid-cols-2 md:items-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--gold-soft)]">The Ritual</p>
          <h2 className="mt-3 font-display text-5xl leading-tight md:text-6xl">
            Every cup, <span className="text-gradient-gold">crafted</span> to perfection.
          </h2>
          <p className="mt-6 text-muted-foreground">
            Scroll to watch the brew unfold. Powder meets filter, drip by drip,
            until tradition fills the cup.
          </p>
          <div className="mt-8 space-y-3 text-sm text-muted-foreground">
            <Step label="Coffee powder enters the filter" done={p > 0.1} />
            <Step label="Slow, golden drip begins" done={p > 0.3} />
            <Step label="The cup fills, naturally" done={p > 0.55} />
            <Step label="Steam rises — ready to serve" done={p > 0.75} />
          </div>
        </Reveal>

        <div className="relative mx-auto h-[520px] w-full max-w-[380px]">
          {/* Filter */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2">
            <div className="h-24 w-44 rounded-t-md bg-gradient-to-b from-[oklch(0.55_0.05_80)] to-[oklch(0.35_0.05_60)] shadow-luxe" />
            <div className="mx-auto h-3 w-44 bg-[oklch(0.22_0.03_55)]" />
            <div className="mx-auto h-8 w-32 bg-gradient-to-b from-[oklch(0.35_0.05_60)] to-[oklch(0.22_0.03_55)]" />
            {/* Drip */}
            <div
              className="mx-auto w-[3px] rounded-full bg-gradient-to-b from-[oklch(0.45_0.08_55)] to-[oklch(0.25_0.06_45)] transition-all duration-200"
              style={{ height: `${drip * 120}px`, opacity: drip > 0 ? 1 : 0 }}
            />
          </div>

          {/* Cup */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="relative h-56 w-56">
              <div className="absolute inset-0 rounded-b-[6rem] rounded-t-2xl border-2 border-[oklch(0.95_0.02_80/0.4)] bg-gradient-to-b from-[oklch(0.95_0.02_80/0.15)] to-[oklch(0.95_0.02_80/0.05)] backdrop-blur-md shadow-luxe" />
              {/* Coffee fill */}
              <div
                className="absolute bottom-0 left-0 right-0 overflow-hidden rounded-b-[6rem] transition-all duration-300"
                style={{ height: `${fill * 80}%` }}
              >
                <div className="h-full w-full bg-gradient-to-b from-[oklch(0.4_0.08_55)] to-[oklch(0.18_0.05_45)]" />
                <div className="absolute left-0 right-0 top-0 h-2 bg-[oklch(0.65_0.1_75/0.4)]" />
              </div>
              {/* Handle */}
              <div className="absolute -right-10 top-12 h-24 w-12 rounded-full border-[6px] border-[oklch(0.95_0.02_80/0.4)]" />
              {/* Steam */}
              {fill > 0.5 && (
                <>
                  <div className="absolute -top-4 left-16 h-12 w-2 rounded-full bg-[oklch(0.95_0.02_80/0.5)] blur-md animate-steam" />
                  <div
                    className="absolute -top-4 left-28 h-12 w-2 rounded-full bg-[oklch(0.95_0.02_80/0.4)] blur-md animate-steam"
                    style={{ animationDelay: "1.2s" }}
                  />
                  <div
                    className="absolute -top-4 left-36 h-12 w-2 rounded-full bg-[oklch(0.95_0.02_80/0.35)] blur-md animate-steam"
                    style={{ animationDelay: "2s" }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({ label, done }: { label: string; done: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`h-2 w-2 rounded-full transition ${
          done ? "bg-gradient-gold shadow-gold" : "bg-muted"
        }`}
      />
      <span className={done ? "text-foreground" : ""}>{label}</span>
    </div>
  );
}

/* ---------- TESTIMONIALS ---------- */
const REVIEWS = [
  { n: "Lakshmi R.", c: "Chennai", q: "Tastes exactly like the filter coffee my grandmother used to make. Pure nostalgia." },
  { n: "Arun K.", c: "Bengaluru", q: "Strongest, freshest powder I've tried. The aroma fills the whole kitchen." },
  { n: "Priya S.", c: "Coimbatore", q: "No chicory, no compromise. This is the real thing." },
  { n: "Vikram M.", c: "Madurai", q: "From the first sip — bold, smooth, unforgettable." },
];

function Testimonials() {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.18_0.03_50)] to-[oklch(0.13_0.025_145)]" />
      <div className="relative mx-auto w-[min(1200px,92%)] text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--gold-soft)]">Testimonials</p>
          <h2 className="mt-3 font-display text-5xl md:text-6xl">Loved by coffee enthusiasts.</h2>
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.n} delay={i * 100}>
              <div className="glass h-full rounded-3xl p-6 text-left shadow-soft transition hover:-translate-y-2 hover:shadow-gold">
                <div className="mb-3 text-2xl text-gradient-gold">“</div>
                <p className="text-sm text-foreground">{r.q}</p>
                <div className="mt-6 border-t border-border pt-4">
                  <div className="font-display text-lg">{r.n}</div>
                  <div className="text-xs text-muted-foreground">{r.c}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- WHY US ---------- */
const COFFEE_PRICES: [string, string, string, string][] = [
  ["Home Blend", "₹249", "₹449", "₹899"],
  ["Commercial Blend", "₹199", "₹399", "₹749"],
  ["INS Elite", "₹229", "₹449", "₹849"],
  ["INS Premium", "₹229", "₹449", "₹849"],
  ["INS Strong", "₹219", "₹429", "₹799"],
  ["Arabica RCB", "₹329", "₹649", "₹1199"],
  ["Aroma Gold RCB", "₹299", "₹599", "₹1099"],
  ["Premium Gold RCB", "₹279", "₹549", "₹999"],
];
const TEA_PRICES: [string, string, string, string][] = [
  ["CTC Tea", "₹149", "₹249", "₹449"],
  ["Ginger Tea", "₹279", "₹499", "₹949"],
  ["Masala Tea", "₹299", "₹549", "₹1049"],
];

function PriceList() {
  const [tab, setTab] = useState<"coffee" | "tea">("coffee");
  const rows = tab === "coffee" ? COFFEE_PRICES : TEA_PRICES;
  return (
    <section id="pricing" className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.13_0.025_145)] to-[oklch(0.18_0.03_50)]" />
      <div className="relative mx-auto w-[min(1100px,92%)]">
        <Reveal>
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-[var(--gold-soft)]">Price List</p>
            <h2 className="mt-3 font-display text-5xl md:text-6xl">Honest pricing, every pack.</h2>
          </div>
        </Reveal>

        <div className="mt-10 flex justify-center">
          <div className="glass inline-flex rounded-full p-1.5">
            {(["coffee", "tea"] as const).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setTab(k)}
                className={`rounded-full px-6 py-2.5 text-sm font-medium transition ${
                  tab === k
                    ? "bg-gradient-gold text-[oklch(0.18_0.025_140)] shadow-gold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {k === "coffee" ? "Coffee Products" : "Tea Products"}
              </button>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="mt-10 overflow-hidden rounded-3xl glass shadow-luxe">
            {/* Desktop table */}
            <div className="hidden md:block">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border bg-[oklch(0.95_0.02_80/0.04)] text-xs uppercase tracking-[0.25em] text-[var(--gold-soft)]">
                    <th className="px-6 py-5">Product</th>
                    <th className="px-6 py-5 text-right">250g</th>
                    <th className="px-6 py-5 text-right">500g</th>
                    <th className="px-6 py-5 text-right">1 Kg</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(([name, a, b, c]) => (
                    <tr
                      key={name}
                      className="group border-b border-border/60 transition last:border-0 hover:bg-[oklch(0.82_0.14_85/0.06)]"
                    >
                      <td className="px-6 py-5 font-display text-lg">{name}</td>
                      <td className="px-6 py-5 text-right font-medium text-foreground">{a}</td>
                      <td className="px-6 py-5 text-right font-medium text-foreground">{b}</td>
                      <td className="px-6 py-5 text-right font-display text-lg text-gradient-gold">{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile cards */}
            <div className="divide-y divide-border md:hidden">
              {rows.map(([name, a, b, c]) => (
                <div key={name} className="p-5">
                  <div className="font-display text-lg">{name}</div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                    {[["250g", a], ["500g", b], ["1 Kg", c]].map(([k, v]) => (
                      <div key={k} className="rounded-xl bg-[oklch(0.95_0.02_80/0.05)] py-2.5">
                        <div className="text-[10px] uppercase tracking-widest text-[var(--gold-soft)]">{k}</div>
                        <div className="mt-0.5 font-medium">{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          *Prices inclusive of taxes. Bulk &amp; wholesale enquiries — please contact us.
        </p>
      </div>
    </section>
  );
}

const WHY = [
  { t: "Fresh Beans", d: "Sourced and roasted weekly." },
  { t: "Authentic Taste", d: "Traditional South Indian profile." },
  { t: "Premium Quality", d: "100% pure. No chicory." },
  { t: "Trusted By Customers", d: "Loved across India." },
];

function WhyUs() {
  return (
    <section className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.13_0.025_145)] to-[oklch(0.18_0.03_50)]" />
      <div className="relative mx-auto w-[min(1200px,92%)]">
        <Reveal>
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-[var(--gold-soft)]">Why Choose Us</p>
            <h2 className="mt-3 font-display text-5xl md:text-6xl">Four reasons in every pack.</h2>
          </div>
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <Reveal key={w.t} delay={i * 90}>
              <div className="group relative h-full rounded-3xl glass p-7 shadow-soft transition duration-500 hover:-translate-y-2 hover:rotate-[-1deg] hover:shadow-gold">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-gold text-[oklch(0.18_0.025_140)] shadow-gold">
                  <CoffeeBean size={26} />
                </div>
                <h3 className="font-display text-2xl">{w.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{w.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CONTACT ---------- */
function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.18_0.03_50)] to-[oklch(0.1_0.02_140)]" />
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-25"
        src={heroVideo.url}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-[oklch(0.1_0.02_140/0.6)]" />
      <FloatingBeans density={0.4} />
      <div className="relative mx-auto w-[min(900px,92%)] text-center">
        <Reveal>
          <div className="mx-auto mb-8 grid h-20 w-20 place-items-center rounded-full bg-gradient-gold text-[oklch(0.18_0.025_140)] shadow-gold animate-float">
            <CoffeeBean size={40} />
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-shine">Let's brew together.</h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Wholesale, retail, or just a warm conversation about coffee — we're here.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <ContactCard label="Phone" value="+91 78452 23599" href="tel:+917845223599" />
          <ContactCard label="Email" value="anneyanitha@gmail.com" href="mailto:anneyanitha@gmail.com" />
        </div>

        <Reveal delay={200}>
          <a
            href="https://wa.me/917845223599"
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-8 py-4 font-medium text-[oklch(0.18_0.025_140)] shadow-gold transition hover:scale-105"
          >
            <span className="h-2 w-2 rounded-full bg-[oklch(0.18_0.025_140)]" />
            Chat on WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function ContactCard({ label, value, href }: { label: string; value: string; href?: string }) {
  const inner = (
    <div className="glass h-full rounded-2xl p-6 text-left transition hover:-translate-y-1 hover:shadow-gold">
      <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold-soft)]">{label}</div>
      <div className="mt-2 font-display text-xl">{value}</div>
    </div>
  );
  return href ? <a href={href}>{inner}</a> : inner;
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer className="relative border-t border-border bg-[oklch(0.1_0.02_140)] py-12">
      <div className="mx-auto flex w-[min(1200px,92%)] flex-col items-center justify-between gap-6 md:flex-row">
        <a href="#hero" className="flex items-center gap-2">
          <img src={logo.url} alt="Anita Cafe" className="h-10 w-auto" />
          <span className="font-display text-xl text-shine">Anita Cafe</span>
        </a>
        <nav className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <a href="#story" className="hover:text-[var(--gold)]">Story</a>
          <a href="#product" className="hover:text-[var(--gold)]">Product</a>
          <a href="#brewing" className="hover:text-[var(--gold)]">Brewing</a>
          <a href="#contact" className="hover:text-[var(--gold)]">Contact</a>
        </nav>
        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Anita Cafe · Crafted with care.
        </div>
      </div>
    </footer>
  );
}

/* ---------- FLOATING BUTTONS ---------- */
function FloatingButtons() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <a
        href="https://wa.me/917845223599"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-luxe transition hover:scale-110"
      >
        <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current" aria-hidden="true">
          <path d="M16 .5C7.4.5.5 7.4.5 16c0 2.8.7 5.4 2.1 7.8L.5 31.5l7.9-2c2.3 1.3 4.9 1.9 7.6 1.9 8.6 0 15.5-6.9 15.5-15.5S24.6.5 16 .5zm0 28.2c-2.4 0-4.8-.7-6.8-1.9l-.5-.3-4.7 1.2 1.3-4.6-.3-.5C3.7 20.6 3 18.3 3 16 3 8.8 8.8 3 16 3s13 5.8 13 13-5.8 12.7-13 12.7zm7.3-9.5c-.4-.2-2.4-1.2-2.7-1.3-.4-.1-.6-.2-.9.2s-1 1.3-1.3 1.6c-.2.2-.5.3-.9.1-.4-.2-1.7-.6-3.2-2-1.2-1-2-2.3-2.2-2.7-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.2-.4.3-.6.1-.2.1-.5 0-.7-.1-.2-.9-2.1-1.2-2.9-.3-.8-.6-.7-.9-.7h-.7c-.2 0-.6.1-1 .5s-1.3 1.3-1.3 3.2 1.4 3.7 1.6 4 2.7 4.1 6.5 5.7c.9.4 1.6.6 2.2.8.9.3 1.8.2 2.4.1.7-.1 2.4-1 2.7-1.9.3-.9.3-1.7.2-1.9-.1-.2-.4-.3-.8-.5z"/>
        </svg>
      </a>
      {show && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="grid h-12 w-12 place-items-center rounded-full bg-gradient-gold text-[oklch(0.18_0.025_140)] shadow-gold transition hover:scale-110"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
