import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  BookOpen, GraduationCap, Sparkles, Globe2, Heart, Users, Calendar,
  FileText, ShieldCheck, Compass, ArrowRight, Star, CheckCircle2,
  Mail, MessageCircle, Instagram, Facebook, Menu, X, Quote,
} from "lucide-react";
import heroAsset from "@/assets/hero-readers.png.asset.json";
import founderAsset from "@/assets/founder.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Reita Learning Studio — Building Confident Readers for Life" },
      { name: "description", content: "Premium online reading and literacy academy for children ages 3–14. Personalised phonics, comprehension, spelling and writing instruction from qualified educators." },
      { property: "og:title", content: "Reita Learning Studio — Building Confident Readers for Life" },
      { property: "og:description", content: "Personalised online literacy tuition that helps children become confident, capable, lifelong readers." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroAsset.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroAsset.url },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        name: "Reita Learning Studio",
        description: "Online reading and literacy academy for children ages 3–14.",
        founder: { "@type": "Person", name: "Rita Onyia" },
        areaServed: "Worldwide",
      }),
    }],
  }),
  component: Home,
});

/* ─────────── Contact details ─────────── */
const EMAIL = "ReitaLearningStudio@gmail.com";
const WHATSAPP_NUMBER = "+234 704 5928 232";
const WHATSAPP_DIGITS = "2347045928232";
const WHATSAPP_MSG = encodeURIComponent(
  "Hello Reita Learning Studio! I'd like to book a free reading assessment for my child."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_DIGITS}?text=${WHATSAPP_MSG}`;
const EMAIL_URL = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Free Reading Assessment Booking"
)}&body=${encodeURIComponent(
  "Hello Reita Learning Studio,\n\nI'd like to book a free reading assessment for my child.\n\nChild's age:\nPreferred days/times:\nAny notes:\n\nThank you!"
)}`;

/* ─────────── Tiny utilities ─────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setShown(true), io.disconnect()),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const { ref, shown } = useReveal();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!shown) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, to]);
  return <span ref={ref as any}>{n}{suffix}</span>;
}

/* ─────────── Page ─────────── */
function Home() {
  const [navOpen, setNavOpen] = useState(false);

  const nav = [
    { href: "#programmes", label: "Programmes" },
    { href: "#why", label: "Why Reita" },
    { href: "#process", label: "How it Works" },
    { href: "#founder", label: "Founder" },
    { href: "#stories", label: "Stories" },
  ];

  return (
    <div className="min-h-dvh bg-background text-foreground">
      {/* Announcement */}
      <div className="bg-forest-deep text-cream text-center text-sm py-2.5 container-px">
        <span className="opacity-90">Now enrolling — </span>
        <strong className="text-gold">Book a free reading assessment today.</strong>
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
        <div className="container-px max-w-7xl mx-auto flex items-center justify-between h-18 py-4">
          <a href="#top" className="flex items-center gap-2.5 shrink-0">
            <span className="inline-grid place-items-center w-10 h-10 rounded-xl bg-forest text-cream">
              <BookOpen className="w-5 h-5" />
            </span>
            <span className="font-display text-xl font-bold text-forest-deep tracking-tight">
              Reita <span className="text-gold">Learning</span>
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {nav.map(n => (
              <a key={n.href} href={n.href} className="text-foreground/75 hover:text-forest transition-colors">
                {n.label}
              </a>
            ))}
          </nav>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex items-center gap-2 bg-forest text-cream px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-forest-deep transition shadow-soft">
            Book Free Assessment <ArrowRight className="w-4 h-4" />
          </a>
          <button
            className="md:hidden p-2 rounded-lg border border-border"
            aria-label={navOpen ? "Close menu" : "Open menu"}
            onClick={() => setNavOpen(v => !v)}
          >
            {navOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {navOpen && (
          <div className="md:hidden border-t border-border bg-background container-px py-4 flex flex-col gap-3">
            {nav.map(n => (
              <a key={n.href} href={n.href} onClick={() => setNavOpen(false)} className="py-2 text-foreground/80">
                {n.label}
              </a>
            ))}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => setNavOpen(false)} className="mt-2 inline-flex justify-center items-center gap-2 bg-forest text-cream px-5 py-3 rounded-full text-sm font-semibold">
              Book Free Assessment <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-br from-forest-soft via-background to-gold-soft" />
        <div aria-hidden className="absolute -top-32 -right-32 w-[40rem] h-[40rem] rounded-full bg-gold/20 blur-3xl -z-10" />
        <div className="container-px max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16 lg:py-24">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 bg-background border border-border px-4 py-1.5 rounded-full text-xs font-semibold text-forest-deep shadow-soft">
              <Sparkles className="w-3.5 h-3.5 text-gold" /> International Online Literacy Academy
            </span>
            <h1 className="mt-6 font-display text-[2.6rem] sm:text-5xl lg:text-[4rem] font-bold text-forest-deep leading-[1.02]">
              Helping Children Become <span className="italic text-forest">Confident Readers</span> for Life.
            </h1>
            <p className="mt-6 text-lg text-foreground/75 max-w-xl leading-relaxed">
              Expert online reading and literacy support for children aged 3–14. Through personalised
              instruction, we help children build confidence in reading, phonics, spelling,
              comprehension and writing.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-forest text-cream px-7 py-4 rounded-full font-semibold shadow-elegant hover:bg-forest-deep transition">
                <MessageCircle className="w-4 h-4" /> Book a Free Reading Assessment
              </a>
              <a href={EMAIL_URL} className="inline-flex items-center gap-2 bg-background border-2 border-forest/15 text-forest-deep px-7 py-4 rounded-full font-semibold hover:border-forest transition">
                <Mail className="w-4 h-4" /> Email Us
              </a>
            </div>
            <p className="mt-6 font-display italic text-forest text-lg">
              Let's build confident readers together.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-gold/30 to-forest/20 rounded-[2.5rem] blur-2xl -z-10" />
            <div className="relative rounded-[2rem] overflow-hidden shadow-elegant border-8 border-background">
              <img
                src={heroAsset.url}
                alt="Two smiling children reading books together in a warm classroom"
                className="w-full h-full object-cover aspect-[4/5] lg:aspect-[5/6]"
                loading="eager"
                fetchPriority="high"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-background rounded-2xl shadow-elegant px-5 py-4 flex items-center gap-3 border border-border max-w-[260px] animate-float">
              <div className="grid place-items-center w-11 h-11 rounded-xl bg-gold-soft text-forest-deep">
                <Star className="w-5 h-5 fill-gold text-gold" />
              </div>
              <div>
                <div className="text-sm font-bold text-forest-deep">95% Parent Satisfaction</div>
                <div className="text-xs text-muted-foreground">Across 10+ countries</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-border bg-forest-soft/40">
        <div className="container-px max-w-7xl mx-auto py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { Icon: GraduationCap, label: "Qualified Educators" },
            { Icon: BookOpen, label: "500+ Lessons Delivered" },
            { Icon: Heart, label: "95% Parent Satisfaction" },
            { Icon: Globe2, label: "Families Across 10+ Countries" },
          ].map(({ Icon, label }) => (
            <div key={label} className="flex items-center gap-3 min-w-0">
              <span className="grid place-items-center w-10 h-10 rounded-xl bg-background text-forest shrink-0 shadow-soft">
                <Icon className="w-5 h-5" />
              </span>
              <span className="text-sm font-semibold text-forest-deep truncate">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Impact */}
      <section className="container-px max-w-7xl mx-auto py-24">
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase text-gold">Our Impact</p>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-forest-deep">
            Real progress. Measurable confidence.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { n: 18, suf: "+", label: "Months Average Reading Age Improvement" },
            { n: 95, suf: "%", label: "Parent Satisfaction" },
            { n: 500, suf: "+", label: "Lessons Delivered" },
            { n: 10, suf: "+", label: "Countries Served" },
          ].map((s) => (
            <div key={s.label} className="rounded-3xl bg-card border border-border p-8 hover:shadow-elegant transition group">
              <div className="font-display text-6xl font-bold text-forest-deep group-hover:text-forest transition">
                <CountUp to={s.n} suffix={s.suf} />
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why */}
      <section id="why" className="bg-forest-soft/30 py-24">
        <div className="container-px max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-sm font-semibold tracking-widest uppercase text-gold">Why Reita</p>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-forest-deep">
              Why families choose Reita Learning Studio.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { Icon: Users, t: "Personalised Learning", d: "Every lesson is tailored to your child's age, level and learning style — no generic worksheets." },
              { Icon: GraduationCap, t: "Qualified Literacy Specialists", d: "Lessons led by trained educators with deep expertise in early literacy and reading development." },
              { Icon: Calendar, t: "Flexible Online Lessons", d: "Choose lesson times that fit family life, from anywhere in the world." },
              { Icon: FileText, t: "Monthly Progress Reports", d: "Clear, parent-friendly reports so you always know how your child is growing." },
              { Icon: ShieldCheck, t: "Evidence-Based Teaching", d: "Methods grounded in research — phonics, fluency, comprehension and writing pedagogy." },
              { Icon: Heart, t: "Child-Centred Learning", d: "A warm, encouraging environment where children feel safe to try, struggle and succeed." },
            ].map(({ Icon, t, d }) => (
              <div key={t} className="bg-card rounded-3xl p-8 border border-border hover:shadow-elegant hover:-translate-y-1 transition duration-300">
                <span className="grid place-items-center w-12 h-12 rounded-2xl bg-gold-soft text-forest-deep mb-5">
                  <Icon className="w-6 h-6" />
                </span>
                <h3 className="text-xl font-bold text-forest-deep">{t}</h3>
                <p className="mt-2 text-foreground/70 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programmes */}
      <section id="programmes" className="container-px max-w-7xl mx-auto py-24">
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase text-gold">Our Programmes</p>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-forest-deep">
            Programmes designed around the child you know.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { t: "Reading Confidence", d: "Children who once avoided reading begin to pick up books on their own — willingly, even joyfully." },
            { t: "Phonics Foundations", d: "Strong, systematic phonics that unlock decoding and set children up for fluent independent reading." },
            { t: "Reading Comprehension", d: "From recognising words to truly understanding stories, ideas and information." },
            { t: "Spelling", d: "Confident, accurate spellers who write without fear of the page." },
            { t: "Writing", d: "Children learn to organise their thoughts and express ideas clearly, in their own voice." },
            { t: "One-to-One Online Support", d: "Focused, distraction-free sessions with a specialist who knows your child by name." },
          ].map((p, i) => (
            <div key={p.t} className="group relative rounded-3xl border border-border bg-card p-8 overflow-hidden hover:border-forest/30 transition">
              <div aria-hidden className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gold/10 group-hover:bg-gold/25 transition" />
              <div className="relative">
                <div className="text-xs font-semibold text-gold tracking-widest">PROGRAMME 0{i + 1}</div>
                <h3 className="mt-3 text-2xl font-bold text-forest-deep">{p.t}</h3>
                <p className="mt-3 text-foreground/70 leading-relaxed">{p.d}</p>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:text-forest-deep">
                  Book a free assessment <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stories */}
      <section id="stories" className="bg-forest-deep text-cream py-24 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,oklch(0.78_0.13_78/.18),transparent_60%)]" />
        <div className="container-px max-w-7xl mx-auto relative">
          <div className="max-w-2xl mb-14">
            <p className="text-sm font-semibold tracking-widest uppercase text-gold">Student Success Stories</p>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold">
              Small wins. Big confidence. Lifelong readers.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { h: "From hesitant reader to confident learner", d: "A young learner who once dreaded reading aloud now volunteers first in class — and asks for harder books." },
              { h: "Building strong reading foundations", d: "Through systematic phonics, an early reader moved from sounding out single letters to reading full storybooks independently." },
              { h: "Growing confidence through personalised support", d: "Weekly one-to-one sessions helped a shy reader rediscover her voice, her curiosity and her love of stories." },
            ].map(s => (
              <div key={s.h} className="rounded-3xl bg-cream/5 border border-cream/10 p-8 backdrop-blur-sm">
                <Quote className="w-8 h-8 text-gold mb-4" />
                <h3 className="text-xl font-bold">{s.h}</h3>
                <p className="mt-3 text-cream/80 leading-relaxed text-sm">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section id="founder" className="container-px max-w-7xl mx-auto py-24">
        <div className="grid lg:grid-cols-[5fr_7fr] gap-12 lg:gap-16 items-center">
          <div className="relative">
            <div aria-hidden className="absolute -inset-4 bg-gradient-to-br from-gold/30 to-forest/15 rounded-[2.5rem] blur-2xl -z-10" />
            <div className="relative rounded-[2rem] overflow-hidden shadow-elegant border-8 border-background">
              <img
                src={founderAsset.url}
                alt="Rita Onyia, founder of Reita Learning Studio"
                className="w-full h-full object-cover aspect-[4/5]"
                loading="lazy"
              />
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase text-gold">Meet the Founder</p>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-forest-deep">
              Hello, I'm <span className="italic">Rita Onyia</span>.
            </h2>
            <div className="mt-6 space-y-4 text-foreground/75 leading-relaxed text-lg">
              <p>I'm the founder of Reita Learning Studio. I hold a Bachelor's Degree in Early Childhood Education and am passionate about helping children develop the literacy skills they need to succeed in school and beyond.</p>
              <p>Through personalised instruction and evidence-based teaching strategies, our academy helps children become confident, capable and enthusiastic readers.</p>
            </div>
            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              {[
                "Bachelor's Degree in Early Childhood Education",
                "TEFL Certified English Teacher",
                "TRCN Licensed Teacher",
                "Special Educational Needs (SEN) Trained",
              ].map(q => (
                <div key={q} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-forest-deep">{q}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-forest text-cream px-6 py-3 rounded-full text-sm font-semibold hover:bg-forest-deep transition shadow-soft">
                <MessageCircle className="w-4 h-4" /> Book a Free Assessment with Rita
              </a>
              <a href={EMAIL_URL} className="inline-flex items-center gap-2 border-2 border-forest/15 text-forest-deep px-6 py-3 rounded-full text-sm font-semibold hover:border-forest transition">
                <Mail className="w-4 h-4" /> Email Rita
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="bg-gold-soft/40 py-24">
        <div className="container-px max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-sm font-semibold tracking-widest uppercase text-gold">How It Works</p>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-forest-deep">
              A simple path from first hello to lifelong reader.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { Icon: Calendar,   t: "Book a Free Reading Assessment", d: "A relaxed conversation to understand your child's current reading and goals." },
              { Icon: Compass,    t: "Receive a Personalised Learning Plan", d: "A clear plan tailored to your child's age, level and learning style." },
              { Icon: BookOpen,   t: "Attend Engaging Online Lessons", d: "Warm, focused one-to-one sessions at times that fit your family." },
              { Icon: Sparkles,   t: "Celebrate Your Child's Progress", d: "Regular reports and visible growth in confidence, fluency and joy." },
            ].map((s, i) => (
              <div key={s.t} className="relative rounded-3xl bg-background border border-border p-7 hover:shadow-elegant transition">
                <div className="flex items-center justify-between">
                  <span className="grid place-items-center w-12 h-12 rounded-2xl bg-forest text-cream">
                    <s.Icon className="w-5 h-5" />
                  </span>
                  <span className="font-display text-5xl font-bold text-gold/40">0{i + 1}</span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-forest-deep">{s.t}</h3>
                <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="container-px max-w-7xl mx-auto py-24">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-forest-deep text-cream p-10 sm:p-16 lg:p-24 text-center shadow-elegant">
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,oklch(0.78_0.13_78/.25),transparent_55%)]" />
          <div className="relative max-w-3xl mx-auto">
            <Sparkles className="w-10 h-10 text-gold mx-auto" />
            <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
              Every child deserves the confidence to read.
            </h2>
            <p className="mt-6 text-cream/80 text-lg leading-relaxed">
              Give your child the opportunity to build strong reading skills, greater confidence and a
              lifelong love for learning. Start with a free reading assessment today.
            </p>
            <a href="#cta" className="mt-10 inline-flex items-center gap-2 bg-gold text-forest-deep px-8 py-4 rounded-full font-bold shadow-elegant hover:bg-cream transition">
              Book Your Free Reading Assessment <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-forest-deep text-cream/85 pt-20 pb-10">
        <div className="container-px max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2 max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="grid place-items-center w-10 h-10 rounded-xl bg-gold text-forest-deep">
                <BookOpen className="w-5 h-5" />
              </span>
              <span className="font-display text-xl font-bold text-cream">Reita Learning Studio</span>
            </div>
            <p className="mt-5 font-display italic text-gold text-lg">
              Let's build confident readers together.
            </p>
            <p className="mt-3 text-sm text-cream/70 leading-relaxed">
              An international online literacy academy helping children ages 3–14 become confident, capable lifelong readers.
            </p>
          </div>
          <div>
            <h4 className="font-display text-base font-bold text-cream mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              {nav.map(n => (
                <li key={n.href}><a href={n.href} className="hover:text-gold transition">{n.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-base font-bold text-cream mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="mailto:hello@reitalearningstudio.com" className="flex items-center gap-2 hover:text-gold transition"><Mail className="w-4 h-4" /> hello@reitalearningstudio.com</a></li>
              <li><a href="#" className="flex items-center gap-2 hover:text-gold transition"><MessageCircle className="w-4 h-4" /> WhatsApp</a></li>
            </ul>
            <div className="mt-5 flex gap-3">
              <a href="#" aria-label="Instagram" className="grid place-items-center w-10 h-10 rounded-xl border border-cream/15 hover:bg-gold hover:text-forest-deep hover:border-gold transition"><Instagram className="w-4 h-4" /></a>
              <a href="#" aria-label="Facebook" className="grid place-items-center w-10 h-10 rounded-xl border border-cream/15 hover:bg-gold hover:text-forest-deep hover:border-gold transition"><Facebook className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
        <div className="container-px max-w-7xl mx-auto mt-16 pt-8 border-t border-cream/10 flex flex-col sm:flex-row gap-4 justify-between text-xs text-cream/60">
          <p>© 2026 Reita Learning Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold transition">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition">Terms &amp; Conditions</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

