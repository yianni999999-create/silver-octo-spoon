"use client";

import { useState, useEffect, useRef } from "react";

/* ─── Small reusable components ─── */

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Menu", href: "#menu" },
    { label: "Experience", href: "#experience" },
    { label: "Reviews", href: "#reviews" },
    { label: "Visit Us", href: "#visit" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "background 0.3s, box-shadow 0.3s",
        background: scrolled ? "rgba(13,33,55,0.97)" : "transparent",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.3)" : "none",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a href="#" style={{ textDecoration: "none" }}>
          <span
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 22,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "0.02em",
            }}
          >
            The Promenade Grille
          </span>
        </a>

        {/* Desktop links */}
        <div
          style={{ display: "flex", gap: 32, alignItems: "center" }}
          className="hide-mobile"
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{
                color: "rgba(255,255,255,0.85)",
                textDecoration: "none",
                fontSize: 15,
                fontWeight: 500,
                letterSpacing: "0.04em",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#f5924a")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.85)")
              }
            >
              {l.label}
            </a>
          ))}
          <a
            href="#visit"
            style={{
              background: "var(--orange)",
              color: "#fff",
              padding: "10px 22px",
              borderRadius: 6,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.05em",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.background = "var(--orange-light)")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.background = "var(--orange)")
            }
          >
            Plan Your Visit
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="show-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
          }}
        >
          <div
            style={{
              width: 24,
              height: 2,
              background: "#fff",
              marginBottom: 5,
              transition: "transform 0.2s",
              transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none",
            }}
          />
          <div
            style={{
              width: 24,
              height: 2,
              background: "#fff",
              marginBottom: 5,
              opacity: menuOpen ? 0 : 1,
              transition: "opacity 0.2s",
            }}
          />
          <div
            style={{
              width: 24,
              height: 2,
              background: "#fff",
              transition: "transform 0.2s",
              transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "rgba(13,33,55,0.98)",
            padding: "16px 24px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: "rgba(255,255,255,0.9)",
                textDecoration: "none",
                fontSize: 17,
                fontWeight: 500,
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#visit"
            onClick={() => setMenuOpen(false)}
            style={{
              background: "var(--orange)",
              color: "#fff",
              padding: "12px 22px",
              borderRadius: 6,
              textDecoration: "none",
              fontSize: 15,
              fontWeight: 700,
              textAlign: "center",
              marginTop: 8,
            }}
          >
            Plan Your Visit
          </a>
        </div>
      )}
    </nav>
  );
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function FadeSection({
  children,
  delay = 0,
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function WaveDivider({
  fill = "#fff",
  bg = "transparent",
  flip = false,
}: {
  fill?: string;
  bg?: string;
  flip?: boolean;
}) {
  return (
    <div
      style={{
        background: bg,
        lineHeight: 0,
        transform: flip ? "scaleY(-1)" : "none",
      }}
    >
      <svg
        viewBox="0 0 1440 60"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", width: "100%" }}
      >
        <path
          d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <span style={{ color: "#e8721c", fontSize: 18, letterSpacing: 2 }}>
      {"★".repeat(count)}
    </span>
  );
}

function Badge({ icon, text }: { icon: string; text: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: 8,
        padding: "10px 16px",
        color: "rgba(255,255,255,0.9)",
        fontSize: 14,
        fontWeight: 500,
      }}
    >
      <span style={{ fontSize: 18 }}>{icon}</span>
      {text}
    </div>
  );
}

function MenuCard({
  title,
  items,
  icon,
  delay = 0,
}: {
  title: string;
  items: string[];
  icon: string;
  delay?: number;
}) {
  return (
    <FadeSection delay={delay}>
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: "32px 28px",
          boxShadow: "0 4px 24px rgba(13,33,55,0.08)",
          border: "1px solid rgba(13,33,55,0.07)",
          height: "100%",
        }}
      >
        <div style={{ fontSize: 36, marginBottom: 12 }}>{icon}</div>
        <h3
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 20,
            fontWeight: 700,
            color: "var(--navy)",
            marginBottom: 20,
          }}
        >
          {title}
        </h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {items.map((item) => (
            <li
              key={item}
              style={{
                padding: "10px 0",
                borderBottom: "1px solid #f0ece6",
                color: "var(--text-mid)",
                fontSize: 15,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--orange)",
                  flexShrink: 0,
                }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </FadeSection>
  );
}

function ReviewCard({
  quote,
  sub,
  author,
  delay = 0,
}: {
  quote: string;
  sub: string;
  author: string;
  delay?: number;
}) {
  return (
    <FadeSection delay={delay}>
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: "32px 28px",
          boxShadow: "0 4px 24px rgba(13,33,55,0.07)",
          border: "1px solid rgba(13,33,55,0.07)",
          position: "relative",
          height: "100%",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 16,
            left: 24,
            fontSize: 64,
            color: "rgba(232,114,28,0.12)",
            fontFamily: "Georgia, serif",
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          &ldquo;
        </span>

        <div style={{ position: "relative" }}>
          <Stars />
          <p
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 18,
              fontWeight: 700,
              color: "var(--navy)",
              margin: "12px 0 8px",
            }}
          >
            &ldquo;{quote}&rdquo;
          </p>
          <p style={{ color: "var(--text-mid)", fontSize: 14, marginBottom: 16 }}>
            {sub}
          </p>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "var(--orange)",
              letterSpacing: "0.04em",
            }}
          >
            — {author}
          </span>
        </div>
      </div>
    </FadeSection>
  );
}

function StepCard({
  num,
  title,
  desc,
  delay = 0,
}: {
  num: number;
  title: string;
  desc: string;
  delay?: number;
}) {
  return (
    <FadeSection delay={delay}>
      <div style={{ textAlign: "center", padding: "0 12px" }}>
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "var(--orange)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            fontWeight: 800,
            margin: "0 auto 20px",
            boxShadow: "0 4px 16px rgba(232,114,28,0.35)",
          }}
        >
          {num}
        </div>
        <h3
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 19,
            fontWeight: 700,
            color: "var(--navy)",
            marginBottom: 10,
          }}
        >
          {title}
        </h3>
        <p style={{ color: "var(--text-mid)", fontSize: 15, lineHeight: 1.6 }}>
          {desc}
        </p>
      </div>
    </FadeSection>
  );
}

export default function Home() {
  return (
    <>
      <style>{`
        .hide-mobile { display: flex !important; }
        .show-mobile { display: none !important; }
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
        @media (max-width: 900px) {
          .grid-3 { grid-template-columns: 1fr !important; }
        }
        .step-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
        @media (max-width: 700px) {
          .step-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        .hero-h1 { font-size: clamp(2.4rem, 5vw, 4rem); }
        .hero-sub { font-size: clamp(1rem, 2vw, 1.25rem); }
        .hero-btns { flex-direction: row; }
        @media (max-width: 540px) {
          .hero-btns { flex-direction: column !important; align-items: stretch !important; }
        }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
        @media (max-width: 860px) {
          .info-grid { grid-template-columns: 1fr !important; }
        }
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>

      <NavBar />

      {/* ── HERO ── */}
      <section
        id="hero"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(160deg, #0d2137 0%, #163556 55%, #1d4a73 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: "120px 24px 80px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "-10%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(232,114,28,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            left: "-8%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(29,74,115,0.5) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, opacity: 0.12 }}>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%" }}>
            <path d="M0,40 C240,70 480,10 720,40 C960,70 1200,10 1440,40 L1440,80 L0,80 Z" fill="#7ec8e3" />
          </svg>
        </div>

        <div style={{ maxWidth: 760, textAlign: "center", position: "relative", zIndex: 2 }}>
          <div
            className="animate-fade-up"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(232,114,28,0.18)",
              border: "1px solid rgba(232,114,28,0.4)",
              borderRadius: 100,
              padding: "6px 18px",
              marginBottom: 28,
              fontSize: 13,
              fontWeight: 600,
              color: "#f5924a",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Havre de Grace Waterfront
          </div>

          <h1
            className="hero-h1 animate-fade-up"
            style={{
              fontFamily: "Georgia, serif",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.15,
              marginBottom: 24,
              animationDelay: "0.1s",
            }}
          >
            Eat by the Water.{" "}
            <span style={{ color: "#f5924a" }}>Taste Maryland</span> at Its Best.
          </h1>

          <p
            className="hero-sub animate-fade-up"
            style={{
              color: "rgba(255,255,255,0.78)",
              lineHeight: 1.7,
              maxWidth: 560,
              margin: "0 auto 40px",
              animationDelay: "0.2s",
            }}
          >
            Crab cakes, soft shell sandwiches, burgers, shakes, and more—served fresh
            along the scenic Chesapeake Bay waterfront.
          </p>

          <div
            className="hero-btns animate-fade-up"
            style={{ display: "flex", gap: 16, justifyContent: "center", animationDelay: "0.3s" }}
          >
            <a
              href="#menu"
              style={{
                background: "var(--orange)",
                color: "#fff",
                padding: "15px 34px",
                borderRadius: 8,
                textDecoration: "none",
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: "0.04em",
                boxShadow: "0 4px 20px rgba(232,114,28,0.4)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(232,114,28,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "none";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(232,114,28,0.4)";
              }}
            >
              View Menu
            </a>
            <a
              href="#visit"
              style={{
                background: "transparent",
                color: "#fff",
                padding: "15px 34px",
                borderRadius: 8,
                textDecoration: "none",
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: "0.04em",
                border: "2px solid rgba(255,255,255,0.35)",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#fff";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.35)";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              Find Us Today
            </a>
          </div>

          <div
            className="animate-fade-up"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "center",
              marginTop: 52,
              animationDelay: "0.45s",
            }}
          >
            <Badge icon="🕐" text="Open 11 AM – 8 PM Daily" />
            <Badge icon="🌊" text="Waterfront Dining" />
            <Badge icon="🚗" text="Free Parking" />
            <Badge icon="👨‍👩‍👧" text="Family Friendly" />
          </div>
        </div>
      </section>

      <WaveDivider fill="var(--cream)" bg="#1d4a73" />

      {/* ── SIGNATURE EXPERIENCE ── */}
      <section id="about" style={{ background: "var(--cream)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeSection>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <p style={{ color: "var(--orange)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: 13, marginBottom: 12 }}>
                The Promenade Grille Experience
              </p>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.9rem, 3.5vw, 2.7rem)", fontWeight: 700, color: "var(--navy)", marginBottom: 20 }}>
                Simple. Fresh. Unforgettable.
              </h2>
              <p style={{ color: "var(--text-mid)", fontSize: 17, lineHeight: 1.8, maxWidth: 640, margin: "0 auto" }}>
                At The Promenade Grille, we keep things simple—fresh food, generous portions, and a view you can&apos;t beat. Whether you&apos;re grabbing a quick bite or soaking in the sunset, every meal comes with a side of Chesapeake Bay breeze.
              </p>
            </div>
          </FadeSection>

          <div className="grid-3">
            {[
              { icon: "🦀", title: "Fresh Maryland Seafood", body: "From hand-formed crab cakes seasoned with Old Bay to crispy soft shell sandwiches—we celebrate everything the Chesapeake has to offer.", delay: 0 },
              { icon: "🌅", title: "Waterfront Setting", body: "Steps from the promenade and marina, enjoy your meal with boats drifting by and unforgettable golden-hour sunsets over the bay.", delay: 0.1 },
              { icon: "🍔", title: "Something for Everyone", body: "Burgers, chicken sandwiches, hush puppies, loaded fries, and hand-spun milkshakes—comfort classics done right for the whole family.", delay: 0.2 },
            ].map((f) => (
              <FadeSection key={f.title} delay={f.delay}>
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    padding: "36px 28px",
                    boxShadow: "0 2px 20px rgba(13,33,55,0.06)",
                    border: "1px solid rgba(13,33,55,0.07)",
                    textAlign: "center",
                    height: "100%",
                  }}
                >
                  <div style={{ fontSize: 44, marginBottom: 16 }}>{f.icon}</div>
                  <h3 style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 700, color: "var(--navy)", marginBottom: 12 }}>{f.title}</h3>
                  <p style={{ color: "var(--text-mid)", fontSize: 15, lineHeight: 1.7 }}>{f.body}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fill="var(--navy)" bg="var(--cream)" flip />

      {/* ── MENU ── */}
      <section id="menu" style={{ background: "var(--navy)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeSection>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p style={{ color: "var(--orange-light)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: 13, marginBottom: 12 }}>
                What We&apos;re Known For
              </p>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.9rem, 3.5vw, 2.7rem)", fontWeight: 700, color: "#fff", marginBottom: 16 }}>
                Our Menu
              </h2>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16, maxWidth: 480, margin: "0 auto" }}>
                Fresh, seasonal, and made to satisfy. Here are some of our most-loved dishes.
              </p>
            </div>
          </FadeSection>

          <div className="grid-3">
            <MenuCard icon="🦀" title="Maryland Favorites" items={["Crab Cake Sandwich (Old Bay seasoned)", "Soft Shell Crab Sandwich", "Fish & Chips", "Clam Strips Basket"]} delay={0} />
            <MenuCard icon="🍔" title="Grill Classics" items={["Cheeseburgers", "Chicken Sandwiches", "Italian Sausage Sub", "Grilled Hot Dogs"]} delay={0.1} />
            <MenuCard icon="🍟" title="Fan Favorites" items={["Hush Puppies with Honey Butter", "Loaded Fries", "Milkshakes", "Root Beer Floats"]} delay={0.2} />
          </div>

          <FadeSection delay={0.3}>
            <p style={{ textAlign: "center", color: "rgba(255,255,255,0.5)", fontSize: 14, marginTop: 36 }}>
              Menu is seasonal and subject to change. Call{" "}
              <a href="tel:+14109391416" style={{ color: "var(--orange-light)", textDecoration: "none" }}>
                (410) 939-1416
              </a>{" "}
              for today&apos;s availability.
            </p>
          </FadeSection>
        </div>
      </section>

      <WaveDivider fill="var(--cream)" bg="var(--navy)" />

      {/* ── LOCATION / EXPERIENCE ── */}
      <section id="experience" style={{ background: "var(--cream)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="info-grid">
            <FadeSection>
              <p style={{ color: "var(--orange)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: 13, marginBottom: 16 }}>
                Waterfront Location
              </p>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.9rem, 3.5vw, 2.7rem)", fontWeight: 700, color: "var(--navy)", marginBottom: 20, lineHeight: 1.2 }}>
                More Than a Meal—It&apos;s a View
              </h2>
              <p style={{ color: "var(--text-mid)", fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>
                Located right on the waterfront in Havre de Grace, enjoy your meal steps from the promenade, marina, and scenic walking paths. Watch boats drift by, feel the breeze, and catch unforgettable sunsets.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { icon: "📍", label: "352 Commerce St, Havre de Grace, MD 21078" },
                  { icon: "🕐", label: "Open daily · 11:00 AM – 8:00 PM" },
                  { icon: "📞", label: "(410) 939-1416" },
                  { icon: "🌊", label: "Millard Tydings Memorial Park Waterfront" },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 15, color: "var(--text-mid)" }}>
                    <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://maps.google.com/?q=352+Commerce+St+Havre+de+Grace+MD"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: 32,
                  background: "var(--navy)",
                  color: "#fff",
                  padding: "13px 28px",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--navy-mid)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--navy)")}
              >
                Get Directions
              </a>
            </FadeSection>

            <FadeSection delay={0.15}>
              <div
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: "0 8px 40px rgba(13,33,55,0.14)",
                  border: "4px solid #fff",
                  aspectRatio: "4/3",
                  background: "var(--navy-mid)",
                }}
              >
                <iframe
                  title="The Promenade Grille Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3052.1946394539!2d-76.09366!3d39.5456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c7e5b6f3c71f35%3A0x31bd5a4ed6f4f88b!2s352%20Commerce%20St%2C%20Havre%20de%20Grace%2C%20MD%2021078!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                />
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: "var(--sand-dark)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeSection>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <p style={{ color: "var(--orange)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: 13, marginBottom: 12 }}>
                How It Works
              </p>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.9rem, 3.5vw, 2.7rem)", fontWeight: 700, color: "var(--navy)" }}>
                Quick, Easy, Casual
              </h2>
            </div>
          </FadeSection>

          <div className="step-grid">
            <StepCard num={1} title="Order at the Window" desc="Walk up, browse our menu board, and place your order at our counter window." delay={0} />
            <StepCard num={2} title="Pick Up Your Food" desc="When your name is called, grab your fresh, hot order—ready just for you." delay={0.12} />
            <StepCard num={3} title="Enjoy the View" desc="Find a spot on the waterfront patio and soak in the scenic Chesapeake Bay backdrop." delay={0.24} />
          </div>
        </div>
      </section>

      <WaveDivider fill="var(--navy)" bg="var(--sand-dark)" flip />

      {/* ── REVIEWS ── */}
      <section id="reviews" style={{ background: "var(--navy)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeSection>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p style={{ color: "var(--orange-light)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: 13, marginBottom: 12 }}>
                What Guests Are Saying
              </p>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.9rem, 3.5vw, 2.7rem)", fontWeight: 700, color: "#fff" }}>
                Don&apos;t Just Take Our Word For It
              </h2>
            </div>
          </FadeSection>

          <div className="grid-3">
            <ReviewCard quote="Great food and a view." sub="Delicious meals, generous portions, and worth every minute." author="Google Reviewer" delay={0} />
            <ReviewCard quote="Amazing Maryland crab." sub="Fresh, hot, and packed with flavor—exactly what you want from a waterfront stop." author="Yelp Reviewer" delay={0.1} />
            <ReviewCard quote="Better than expected." sub="From sandwiches to shakes, customers are pleasantly surprised every visit." author="TripAdvisor Reviewer" delay={0.2} />
          </div>
        </div>
      </section>

      <WaveDivider fill="var(--cream)" bg="var(--navy)" />

      {/* ── TRUST ── */}
      <section style={{ background: "var(--cream)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <FadeSection>
            <div style={{ background: "#fff", borderRadius: 20, padding: "52px 48px", boxShadow: "0 4px 32px rgba(13,33,55,0.07)", border: "1px solid rgba(13,33,55,0.07)" }}>
              <span style={{ fontSize: 44, display: "block", marginBottom: 16 }}>✨</span>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.1rem)", fontWeight: 700, color: "var(--navy)", marginBottom: 20 }}>
                We&apos;re Always Improving
              </h2>
              <p style={{ color: "var(--text-mid)", fontSize: 16, lineHeight: 1.8, marginBottom: 32 }}>
                We&apos;re committed to serving fresh, high-quality food every day and keeping our space clean, comfortable, and enjoyable for everyone. Your feedback helps us get better—every single season.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                {[
                  { icon: "🍎", label: "Fresh Daily" },
                  { icon: "📱", label: "Apple Pay & Contactless" },
                  { icon: "🥡", label: "Takeout Available" },
                  { icon: "🌿", label: "Outdoor Seating" },
                  { icon: "🍦", label: "Desserts Served" },
                ].map((b) => (
                  <div
                    key={b.label}
                    style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--cream)", border: "1px solid var(--sand-dark)", borderRadius: 100, padding: "8px 16px", fontSize: 14, color: "var(--text-mid)", fontWeight: 500 }}
                  >
                    <span>{b.icon}</span>
                    {b.label}
                  </div>
                ))}
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section
        id="visit"
        style={{
          background: "linear-gradient(135deg, #0d2137 0%, #163556 60%, #1d4a73 100%)",
          padding: "100px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(232,114,28,0.12) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <FadeSection>
            <p style={{ color: "var(--orange-light)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: 13, marginBottom: 16 }}>
              Don&apos;t Miss the Season
            </p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: 20 }}>
              Come for the food—<br />
              <span style={{ color: "#f5924a" }}>stay for the view.</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 16, lineHeight: 1.7, marginBottom: 40 }}>
              Open daily from 11 AM to 8 PM at the Havre de Grace waterfront. No reservations needed—just show up and enjoy.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", marginBottom: 48 }}>
              <a
                href="https://maps.google.com/?q=352+Commerce+St+Havre+de+Grace+MD"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "var(--orange)",
                  color: "#fff",
                  padding: "15px 36px",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  boxShadow: "0 4px 20px rgba(232,114,28,0.45)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(232,114,28,0.55)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "none";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(232,114,28,0.45)";
                }}
              >
                Plan Your Visit
              </a>
              <a
                href="tel:+14109391416"
                style={{
                  background: "transparent",
                  color: "#fff",
                  padding: "15px 36px",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  border: "2px solid rgba(255,255,255,0.35)",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#fff";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.35)";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                Call Us
              </a>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, maxWidth: 600, margin: "0 auto" }}>
              {[
                { icon: "📍", title: "Address", val: "352 Commerce St\nHavre de Grace, MD" },
                { icon: "🕐", title: "Hours", val: "11:00 AM – 8:00 PM\nOpen Every Day" },
                { icon: "📞", title: "Phone", val: "(410) 939-1416" },
              ].map((info) => (
                <div key={info.title} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "20px 16px", textAlign: "center" }}>
                  <span style={{ fontSize: 24, display: "block", marginBottom: 8 }}>{info.icon}</span>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>{info.title}</p>
                  <p style={{ color: "#fff", fontSize: 14, fontWeight: 500, whiteSpace: "pre-line" }}>{info.val}</p>
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#07151f", padding: "32px 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "Georgia, serif", color: "rgba(255,255,255,0.9)", fontSize: 16, fontWeight: 600, marginBottom: 6 }}>
          The Promenade Grille
        </p>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
          352 Commerce St, Havre de Grace, MD 21078 &nbsp;·&nbsp; (410) 939-1416
        </p>
        <p style={{ color: "rgba(255,255,255,0.22)", fontSize: 12, marginTop: 16 }}>
          © {new Date().getFullYear()} The Promenade Grille. All rights reserved.
        </p>
      </footer>
    </>
  );
}
