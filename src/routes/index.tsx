import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroVideo from "@/assets/hero-coffee.mp4.asset.json";
import productPack from "@/assets/anita-pack.jpg.asset.json";
import logo from "@/assets/anita-logo.png.asset.json";
import { SmoothScroll } from "@/components/SmoothScroll";
import { FloatingBeans } from "@/components/FloatingBeans";
import { CoffeeBean } from "@/components/CoffeeBean";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anita Cafe — Premium Filter Coffee Powder" },
      { name: "description", content: "From bean to brew. Authentic South Indian filter coffee, freshly ground. 100% pure coffee, no chicory." },
      { property: "og:title", content: "Anita Cafe — Premium Filter Coffee Powder" },
      { property: "og:description", content: "From bean to brew. Authentic South Indian filter coffee, freshly ground." },
      { property: "og:image", content: productPack.url },
      { name: "twitter:image", content: productPack.url },
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
            ["Product", "#product"],
            ["Brewing", "#brewing"],
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
        <h1 className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.95] text-shine opacity-0 [animation:fade-in_1.2s_ease-out_3s_forwards]">
          From Bean <em className="not-italic text-[var(--cream)]">to</em> Brew
        </h1>
        <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg opacity-0 [animation:fade-in_1s_ease-out_3.6s_forwards]">
          Experience the rich aroma of authentic South Indian coffee — freshly
          ground, slowly roasted, eternally honest.
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
            A passion <span className="text-gradient-gold">brewed</span> through generations.
          </h2>
          <p className="mt-6 text-muted-foreground">
            We hand-select each bean from the misty hills of South India,
            slow-roast them in small batches, and freshly grind every pack so
            the soul of the bean reaches your cup intact.
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
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-gold opacity-20 blur-3xl" />
            <img
              src={productPack.url}
              alt="Anita Cafe coffee in its origin landscape"
              className="relative h-[520px] w-full rounded-[2rem] object-cover shadow-luxe"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- JOURNEY ---------- */
const JOURNEY = [
  { n: "01", t: "Coffee Plantation", d: "Mist-soaked hills where every bean begins." },
  { n: "02", t: "Handpicked Cherries", d: "Only the ripest cherries make the cut." },
  { n: "03", t: "Roasted Beans", d: "Slow-roasted to unlock deep aromatic oils." },
  { n: "04", t: "Freshly Ground", d: "Ground in small batches for peak freshness." },
  { n: "05", t: "The Perfect Cup", d: "Brewed strong, served with tradition." },
];

function Journey() {
  return (
    <section id="journey" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.18_0.03_50)] to-[oklch(0.13_0.025_145)]" />
      <div className="relative mx-auto w-[min(1200px,92%)]">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--gold-soft)]">The Journey</p>
          <h2 className="mt-3 font-display text-5xl md:text-6xl">Bean to cup, layer by layer.</h2>
        </Reveal>

        <div className="relative mt-16">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[var(--gold)] to-transparent md:block" />
          <div className="space-y-12 md:space-y-24">
            {JOURNEY.map((s, i) => (
              <Reveal key={s.n} from={i % 2 ? "right" : "left"} delay={i * 80}>
                <div
                  className={`flex flex-col items-center gap-6 md:flex-row ${
                    i % 2 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="md:w-1/2">
                    <div className="glass rounded-3xl p-8 shadow-soft transition hover:-translate-y-1 hover:shadow-luxe">
                      <div className="font-display text-7xl text-gradient-gold">{s.n}</div>
                      <h3 className="mt-2 font-display text-3xl">{s.t}</h3>
                      <p className="mt-3 text-muted-foreground">{s.d}</p>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2">
                    <div className="mx-auto grid h-40 w-40 place-items-center rounded-full glass shadow-gold animate-spin-slow">
                      <CoffeeBean size={64} />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- PRODUCT ---------- */
const FEATURES = [
  { t: "Rich Aroma", d: "Deep, lingering notes of cocoa and caramel." },
  { t: "Strong Flavor", d: "Bold South Indian roast, never bitter." },
  { t: "Freshly Ground", d: "Sealed at peak freshness, batch by batch." },
  { t: "Premium Quality", d: "100% pure coffee. No chicory. Ever." },
];

function Product() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  return (
    <section id="product" className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.13_0.025_145)] to-[oklch(0.18_0.03_50)]" />
      <div
        className="absolute left-1/2 top-1/2 -z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(0.82 0.14 85 / 0.25), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <FloatingBeans density={0.6} />
      <div className="relative mx-auto w-[min(1200px,92%)]">
        <Reveal>
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-[var(--gold-soft)]">The Product</p>
            <h2 className="mt-3 font-display text-5xl md:text-6xl">A pack worthy of the bean.</h2>
          </div>
        </Reveal>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1fr_1.1fr_1fr]">
          {/* Left features */}
          <div className="space-y-6">
            {FEATURES.slice(0, 2).map((f, i) => (
              <Reveal key={f.t} from="left" delay={i * 100}>
                <FeatureCard {...f} />
              </Reveal>
            ))}
          </div>

          {/* Center product */}
          <div
            ref={ref}
            onMouseMove={(e) => {
              const r = ref.current!.getBoundingClientRect();
              setMouse({
                x: ((e.clientX - r.left) / r.width - 0.5) * 2,
                y: ((e.clientY - r.top) / r.height - 0.5) * 2,
              });
            }}
            onMouseLeave={() => setMouse({ x: 0, y: 0 })}
            className="relative mx-auto h-[560px] w-full max-w-[360px]"
          >
            <div
              className="relative h-full w-full transition-transform duration-300 ease-out"
              style={{
                transform: `perspective(1400px) rotateY(${mouse.x * 18}deg) rotateX(${-mouse.y * 12}deg)`,
              }}
            >
              <div className="absolute -inset-8 rounded-[2rem] bg-gradient-gold opacity-30 blur-3xl" />
              <img
                src={productPack.url}
                alt="Anita Cafe Premium Filter Coffee Powder"
                className="relative h-full w-full rounded-[2rem] object-cover shadow-luxe"
              />
            </div>
          </div>

          {/* Right features */}
          <div className="space-y-6">
            {FEATURES.slice(2).map((f, i) => (
              <Reveal key={f.t} from="right" delay={i * 100}>
                <FeatureCard {...f} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ t, d }: { t: string; d: string }) {
  return (
    <div className="glass rounded-2xl p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-gold">
      <h3 className="font-display text-2xl text-gradient-gold">{t}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{d}</p>
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
