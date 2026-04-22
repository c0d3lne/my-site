"use client";

/**
 * GB Detailing - Full Homepage
 * ================================
 * Built with Next.js (React TSX) + Tailwind CSS
 * Dark luxury design using #090818 as base background.
 *
 * SECTIONS:
 * 1. Navigation
 * 2. Hero
 * 3. Services / Quote & Booking
 * 4. About Us
 * 5. Terms & Conditions
 * 6. Footer
 *
 * HOW TO USE:
 * - Place this file at: app/page.tsx (or pages/index.tsx)
 * - Install dependencies: npm install react-datepicker
 * - For Stripe: npm install @stripe/stripe-js
 * - Add your Stripe publishable key where indicated below
 * - Tailwind must be configured in your project
 */

import { useState, useMemo } from "react";

// ─────────────────────────────────────────────
// PRICE CONFIGURATION — Edit prices here easily
// ─────────────────────────────────────────────
const PRICES = {
  exteriorClean: 25,       // Base exterior clean
  interiorClean: 40,       // Base interior clean
  polishAddon: 10,         // Polish add-on
  dogHairAddon: 20,        // Dog hair / hazard add-on
  biohazardCleaning: 70,   // Biohazard (minimum price)
  travelFee: 15,           // Travel fee surcharge
  dropOffDiscount: 0.20,   // 20% discount for drop-off
  depositPercent: 0.10,    // 10% deposit required
};

// ─────────────────────────────────────────────
// BOOKING AVAILABILITY CONFIG
// ─────────────────────────────────────────────
const AVAILABLE_DAYS = [1, 3, 6, 0]; // Mon=1, Wed=3, Sat=6, Sun=0
const TIME_SLOTS = [
  "10:00am", "11:00am", "12:00pm",
  "1:00pm", "2:00pm", "3:00pm", "4:00pm",
];

// ─────────────────────────────────────────────
// STRIPE CONFIG — Replace with your publishable key
// ─────────────────────────────────────────────
// const STRIPE_PUBLISHABLE_KEY = "pk_test_YOUR_KEY_HERE";

// ─────────────────────────────────────────────
// HELPER: Format currency
// ─────────────────────────────────────────────
const fmt = (n: number) => `£${n.toFixed(2)}`;

// ─────────────────────────────────────────────
// NAVIGATION COMPONENT
// ─────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const links = ["Home", "Quote", "About", "Terms"];

  return (
    <nav
      style={{ backgroundColor: "rgba(9,8,24,0.92)" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/5"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-900/40">
            <span className="text-white font-black text-sm tracking-tight">GB</span>
          </div>
          <span className="text-white font-semibold text-lg tracking-wide">
            GB <span className="text-blue-400">Detailing</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className="text-slate-400 hover:text-white text-sm tracking-widest uppercase transition-colors duration-200"
              >
                {l}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#quote"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-full transition-all duration-200 shadow-lg shadow-blue-900/40"
            >
              Book Now
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-slate-400 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-white/5 px-6 pb-4">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="block py-3 text-slate-400 hover:text-white text-sm tracking-widest uppercase border-b border-white/5"
            >
              {l}
            </a>
          ))}
          <a
            href="#quote"
            onClick={() => setOpen(false)}
            className="block mt-4 text-center px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-full"
          >
            Book Now
          </a>
        </div>
      )}
    </nav>
  );
}

// ─────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
      style={{ backgroundColor: "#090818" }}
    >
      {/* Subtle radial glow behind headline */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Thin decorative horizontal rule */}
      <div className="absolute top-36 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-blue-500/40 to-transparent" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Eyebrow label */}
        <p className="text-blue-400 text-xs tracking-[0.35em] uppercase mb-6 font-medium">
          Professional Car Detailing · Cambridge & Surrounding Areas
        </p>

        {/* Main headline */}
        <h1 className="text-white font-black leading-[1.05] mb-6"
          style={{ fontSize: "clamp(2.6rem, 7vw, 5.5rem)", letterSpacing: "-0.02em" }}
        >
          Your Car Deserves<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            The Best.
          </span>
        </h1>

        {/* Sub-description */}
        <p className="text-slate-400 text-lg leading-relaxed max-w-xl mx-auto mb-10">
          GB Detailing delivers showroom-quality results at your doorstep.
          Expert interior & exterior cleaning, polishing, and specialist
          biohazard services — done right, every time.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#quote"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition-all duration-200 shadow-xl shadow-blue-900/40 text-base"
          >
            Get a Quote
          </a>
          <a
            href="#about"
            className="px-8 py-4 border border-white/15 hover:border-white/30 text-slate-300 hover:text-white font-medium rounded-full transition-all duration-200 text-base"
          >
            Learn More
          </a>
        </div>

        {/* Social proof badges */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-8 text-slate-500 text-sm">
          {["5★ Rated", "Mobile Service", "Same-Week Booking"].map((b) => (
            <span key={b} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Hero image placeholder — replace src with your own photos */}
      <div className="relative z-10 mt-16 w-full max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Exterior Detail" },
            { label: "Interior Clean" },
            { label: "Polish & Finish" },
          ].map((img, i) => (
            <div
              key={i}
              className="relative rounded-2xl overflow-hidden border border-white/8 aspect-[4/3] bg-slate-900 flex items-end"
              style={{ boxShadow: "0 0 40px rgba(59,130,246,0.06)" }}
            >
              {/*
                ── IMAGE PLACEHOLDER ─────────────────────────────
                Replace the div below with:
                <Image src="/your-photo.jpg" alt="..." fill className="object-cover" />
                Make sure to import Image from 'next/image'
                ─────────────────────────────────────────────────
              */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <svg className="w-12 h-12 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="relative z-10 w-full p-3 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-white/70 text-xs font-medium tracking-wide">{img.label}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-slate-600 text-xs mt-3 tracking-wide">
          ↑ Replace placeholders with your own detailing photos
        </p>
      </div>

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #090818)" }}
      />
    </section>
  );
}

// ─────────────────────────────────────────────
// QUOTE & BOOKING SECTION
// ─────────────────────────────────────────────
function QuoteBooking() {
  // ── Service selection state ──
  const [services, setServices] = useState({
    exterior: false,
    interior: false,
    polish: false,
    dogHair: false,
    biohazard: false,
  });

  // ── Extras state ──
  const [travelFee, setTravelFee] = useState(false);
  const [dropOff, setDropOff] = useState(false);

  // ── Notes state ──
  const [carNotes, setCarNotes] = useState("");
  const [biohazardDetails, setBiohazardDetails] = useState("");

  // ── Booking state ──
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  // ── Contact info ──
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // ── Stripe loading state — REMOVED (no payment needed) ──

  // ── Terms agreement — must be checked before sending quote ──
  const [termsAgreed, setTermsAgreed] = useState(false);

  // ─────────────────────────────────────────────
  // PRICE CALCULATION
  // ─────────────────────────────────────────────
  const breakdown = useMemo(() => {
    const items: { label: string; amount: number }[] = [];

    if (services.exterior) items.push({ label: "Exterior Clean (base)", amount: PRICES.exteriorClean });
    if (services.interior) items.push({ label: "Interior Clean (base)", amount: PRICES.interiorClean });
    if (services.polish) items.push({ label: "Polish Add-on", amount: PRICES.polishAddon });
    if (services.dogHair) items.push({ label: "Dog Hair / Hazard Add-on", amount: PRICES.dogHairAddon });
    if (services.biohazard) items.push({ label: "Biohazard Cleaning (min)", amount: PRICES.biohazardCleaning });
    if (travelFee) items.push({ label: "Travel Fee", amount: PRICES.travelFee });

    let subtotal = items.reduce((acc, i) => acc + i.amount, 0);

    // Apply drop-off discount AFTER summing
    let discountAmount = 0;
    if (dropOff && subtotal > 0) {
      discountAmount = subtotal * PRICES.dropOffDiscount;
      items.push({ label: "Drop-off Discount (20%)", amount: -discountAmount });
      subtotal -= discountAmount;
    }

    const deposit = subtotal * PRICES.depositPercent;

    return { items, subtotal, deposit };
  }, [services, travelFee, dropOff]);

  // ─────────────────────────────────────────────
  // DATE PICKER — Only allow Mon, Wed, Sat, Sun
  // ─────────────────────────────────────────────
  // We generate the next 60 days and filter to available ones
  const availableDates = useMemo(() => {
    const dates: string[] = [];
    const today = new Date();
    for (let i = 1; i <= 60; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      if (AVAILABLE_DAYS.includes(d.getDay())) {
        dates.push(d.toISOString().split("T")[0]);
      }
    }
    return dates;
  }, []);

  const dayLabel = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
  };

  // ─────────────────────────────────────────────
  // BUILD QUOTE MESSAGE
  // Compiles all selected options into a readable
  // message string for WhatsApp or Facebook
  // ─────────────────────────────────────────────
  const buildQuoteMessage = () => {
    const lines: string[] = [];
    lines.push("Hi GB Detailing! I'd like to get a quote 👋");
    lines.push("");
    lines.push("*Services requested:*");
    if (services.exterior) lines.push(`• Exterior Clean — £${PRICES.exteriorClean}`);
    if (services.interior) lines.push(`• Interior Clean — £${PRICES.interiorClean}`);
    if (services.polish) lines.push(`• Polish Add-on — +£${PRICES.polishAddon}`);
    if (services.dogHair) lines.push(`• Dog Hair / Hazard Add-on — +£${PRICES.dogHairAddon}`);
    if (services.biohazard) lines.push(`• Biohazard Cleaning — £${PRICES.biohazardCleaning}+`);
    if (travelFee) lines.push(`• Travel Fee — +£${PRICES.travelFee}`);
    if (dropOff) lines.push(`• Drop-off (20% discount applied)`);
    lines.push("");
    lines.push(`*Estimated total: £${breakdown.subtotal.toFixed(2)}*`);
    if (selectedDate && selectedTime) {
      lines.push(`*Preferred date:* ${dayLabel(selectedDate)} at ${selectedTime}`);
    }
    if (carNotes) lines.push(`*Vehicle notes:* ${carNotes}`);
    if (services.biohazard && biohazardDetails) lines.push(`*Biohazard details:* ${biohazardDetails}`);
    if (name) lines.push(`*Name:* ${name}`);
    if (phone) lines.push(`*Phone:* ${phone}`);
    if (email) lines.push(`*Email:* ${email}`);
    return lines.join("\n");
  };

  // ── Open WhatsApp with pre-filled message ──
  // Replace 44XXXXXXXXXX with your WhatsApp number (no spaces, include country code)
  const handleWhatsApp = () => {
    const msg = encodeURIComponent(buildQuoteMessage());
    window.open(`https://wa.me/4407594780797?text=${msg}`, "_blank"); // ← Replace number
  };

  // ── Open Facebook Messenger ──
  // Replace YOUR_PAGE_NAME with your Facebook page username
  const handleFacebook = () => {
    window.open("https://m.me/Gberrisdetails", "_blank"); // ← Replace page name
  };

  // ── Checkbox helper ──
  const toggle = (key: keyof typeof services) =>
    setServices((s) => ({ ...s, [key]: !s[key] }));

  return (
    <section
      id="quote"
      className="py-24 px-6"
      style={{ backgroundColor: "#090818" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-blue-400 text-xs tracking-[0.3em] uppercase mb-3 font-medium">Get In Touch</p>
          <h2 className="text-white font-black text-4xl md:text-5xl mb-4" style={{ letterSpacing: "-0.02em" }}>
            Get a Quote
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Build your quote below, then send it directly to us via WhatsApp or Facebook — we&apos;ll get back to you to confirm your booking.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* ── LEFT: Services & Extras ── */}
          <div className="space-y-6">

            {/* Services Card */}
            <div
              className="rounded-2xl border border-white/8 p-7"
              style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
            >
              <h3 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 text-xs flex items-center justify-center font-bold">1</span>
                Select Services
              </h3>

              <div className="space-y-3">
                {/* Main services */}
                {[
                  { key: "exterior" as const, label: "Exterior Clean", price: PRICES.exteriorClean, note: "Base price — may vary by size/condition" },
                  { key: "interior" as const, label: "Interior Clean", price: PRICES.interiorClean, note: "Base price — may vary by size/condition" },
                  { key: "polish" as const, label: "Polish Add-on", price: PRICES.polishAddon, note: "Applied after exterior clean" },
                  { key: "dogHair" as const, label: "Dog Hair / Hazard Add-on", price: PRICES.dogHairAddon, note: "Excessive pet hair or general hazard" },
                  { key: "biohazard" as const, label: "Biohazard Cleaning", price: PRICES.biohazardCleaning, note: "Blood, vomit, urine, faeces etc. — minimum price" },
                ].map((svc) => (
                  <label
                    key={svc.key}
                    className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-150 ${
                      services[svc.key]
                        ? "border-blue-500/50 bg-blue-600/10"
                        : "border-white/6 hover:border-white/15 bg-white/2"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="mt-1 accent-blue-500 w-4 h-4 cursor-pointer"
                      checked={services[svc.key]}
                      onChange={() => toggle(svc.key)}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-white font-medium text-sm">{svc.label}</span>
                        <span className="text-blue-300 font-semibold text-sm whitespace-nowrap">
                          {svc.key === "biohazard" ? `£${svc.price}+` : fmt(svc.price)}
                        </span>
                      </div>
                      <p className="text-slate-500 text-xs mt-0.5">{svc.note}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Extras Card */}
            <div
              className="rounded-2xl border border-white/8 p-7"
              style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
            >
              <h3 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 text-xs flex items-center justify-center font-bold">2</span>
                Service Options
              </h3>

              <div className="space-y-3">
                <label className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${travelFee ? "border-blue-500/50 bg-blue-600/10" : "border-white/6 hover:border-white/15"}`}>
                  <input type="checkbox" className="mt-1 accent-blue-500 w-4 h-4" checked={travelFee} onChange={() => setTravelFee(!travelFee)} />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-white font-medium text-sm">Mobile — We Come to You</span>
                      <span className="text-amber-400 font-semibold text-sm">+{fmt(PRICES.travelFee)}</span>
                    </div>
                    <p className="text-slate-500 text-xs mt-0.5">Travel fee applies outside local area</p>
                  </div>
                </label>

                <label className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${dropOff ? "border-green-500/50 bg-green-600/10" : "border-white/6 hover:border-white/15"}`}>
                  <input type="checkbox" className="mt-1 accent-green-500 w-4 h-4" checked={dropOff} onChange={() => setDropOff(!dropOff)} />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-white font-medium text-sm">Drop-off at Our Location</span>
                      <span className="text-green-400 font-semibold text-sm">−20%</span>
                    </div>
                    <p className="text-slate-500 text-xs mt-0.5">Save 20% by dropping your car off yourself</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Notes Card */}
            <div
              className="rounded-2xl border border-white/8 p-7"
              style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
            >
              <h3 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 text-xs flex items-center justify-center font-bold">3</span>
                Vehicle Notes
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-slate-400 text-sm block mb-2">Car size / condition notes</label>
                  <textarea
                    className="w-full bg-white/4 border border-white/8 rounded-xl p-4 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500/50 resize-none"
                    rows={3}
                    placeholder="e.g. Large SUV, moderate dirt, been sitting for 3 months..."
                    value={carNotes}
                    onChange={(e) => setCarNotes(e.target.value)}
                  />
                </div>

                {/* Biohazard details — only shown if biohazard selected */}
                {services.biohazard && (
                  <div>
                    <label className="text-slate-400 text-sm block mb-2">
                      Biohazard details <span className="text-red-400">*required</span>
                    </label>
                    <textarea
                      className="w-full bg-red-950/20 border border-red-500/20 rounded-xl p-4 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-red-500/50 resize-none"
                      rows={3}
                      placeholder="Please describe what the biohazard is and where it is located in the vehicle..."
                      value={biohazardDetails}
                      onChange={(e) => setBiohazardDetails(e.target.value)}
                    />
                    <p className="text-red-400/70 text-xs mt-2">
                      ⚠ Biohazard jobs are subject to inspection. Final price confirmed on arrival.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Booking + Summary + Payment ── */}
          <div className="space-y-6">

            {/* Date Picker Card */}
            <div
              className="rounded-2xl border border-white/8 p-7"
              style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
            >
              <h3 className="text-white font-semibold text-lg mb-1 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 text-xs flex items-center justify-center font-bold">4</span>
                Choose a Date
              </h3>
              <p className="text-slate-500 text-xs mb-5">Available: Mon, Wed, Sat & Sun — 10am to 5pm</p>

              {/* Date select */}
              <select
                className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/50 mb-4 appearance-none cursor-pointer"
                value={selectedDate}
                onChange={(e) => { setSelectedDate(e.target.value); setSelectedTime(""); }}
              >
                <option value="" className="bg-slate-900">— Select a date —</option>
                {availableDates.map((d) => (
                  <option key={d} value={d} className="bg-slate-900">
                    {dayLabel(d)}
                  </option>
                ))}
              </select>

              {/* Time slots — shown after date is selected */}
              {selectedDate && (
                <div>
                  <p className="text-slate-400 text-sm mb-3">Select a time slot:</p>
                  <div className="grid grid-cols-4 gap-2">
                    {TIME_SLOTS.map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`py-2 px-1 rounded-lg text-xs font-medium border transition-all ${
                          selectedTime === t
                            ? "bg-blue-600 border-blue-500 text-white"
                            : "border-white/10 text-slate-400 hover:border-white/25 hover:text-white"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Details Card */}
            <div
              className="rounded-2xl border border-white/8 p-7"
              style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
            >
              <h3 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 text-xs flex items-center justify-center font-bold">5</span>
                Your Details
              </h3>

              <div className="space-y-3">
                {[
                  { label: "Full Name", value: name, setter: setName, placeholder: "John Smith", type: "text" },
                  { label: "Phone Number", value: phone, setter: setPhone, placeholder: "07700 000000", type: "tel" },
                  { label: "Email Address", value: email, setter: setEmail, placeholder: "john@example.com", type: "email" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="text-slate-400 text-sm block mb-1.5">{field.label}</label>
                    <input
                      type={field.type}
                      className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500/50"
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={(e) => field.setter(e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Price Summary Card */}
            <div
              className="rounded-2xl border border-blue-500/20 p-7"
              style={{ backgroundColor: "rgba(59,130,246,0.05)" }}
            >
              <h3 className="text-white font-semibold text-lg mb-5">Your Quote Summary</h3>

              {breakdown.items.length === 0 ? (
                <p className="text-slate-500 text-sm">Select services above to see your estimated quote.</p>
              ) : (
                <>
                  <div className="space-y-2.5 mb-5">
                    {breakdown.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-slate-400">{item.label}</span>
                        <span className={item.amount < 0 ? "text-green-400" : "text-white"}>
                          {item.amount < 0 ? `−${fmt(Math.abs(item.amount))}` : fmt(item.amount)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <div className="flex justify-between">
                      <span className="text-slate-300 font-medium">Estimated Total</span>
                      <span className="text-white font-bold text-lg">{fmt(breakdown.subtotal)}</span>
                    </div>
                  </div>

                  <p className="text-slate-500 text-xs mt-4">
                    * This is an estimate. Final price confirmed after vehicle inspection.
                  </p>
                </>
              )}
            </div>

            {/* Terms Agreement Checkbox */}
            <label
              className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                termsAgreed
                  ? "border-blue-500/50 bg-blue-600/10"
                  : "border-white/10 hover:border-white/20 bg-white/2"
              }`}
            >
              <input
                type="checkbox"
                className="mt-0.5 accent-blue-500 w-4 h-4 shrink-0 cursor-pointer"
                checked={termsAgreed}
                onChange={() => setTermsAgreed(!termsAgreed)}
              />
              <span className="text-slate-400 text-sm leading-relaxed">
                I have read and agree to the{" "}
                <a
                  href="#terms"
                  className="text-blue-400 underline hover:text-blue-300 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  Terms & Conditions
                </a>
                {" "}of GB Detailing. I understand the final price may vary based on vehicle condition.
              </span>
            </label>

            {/* ── CONTACT BUTTONS ── */}
            {/* Shown once terms are agreed. Opens WhatsApp or Facebook with the quote pre-filled. */}
            <div className="space-y-3">
              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsApp}
                disabled={breakdown.subtotal === 0 || !termsAgreed}
                className={`w-full py-4 rounded-xl font-semibold text-base transition-all duration-200 flex items-center justify-center gap-3 ${
                  breakdown.subtotal > 0 && termsAgreed
                    ? "bg-[#25D366] hover:bg-[#1ebe5a] text-white shadow-lg shadow-green-900/30"
                    : "bg-white/5 text-slate-600 cursor-not-allowed"
                }`}
              >
                {/* WhatsApp icon */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {breakdown.subtotal === 0
                  ? "Select services to continue"
                  : !termsAgreed
                  ? "Please agree to the Terms & Conditions"
                  : `Send Quote via WhatsApp`}
              </button>

              {/* Facebook Messenger Button */}
              <button
                onClick={handleFacebook}
                disabled={breakdown.subtotal === 0 || !termsAgreed}
                className={`w-full py-4 rounded-xl font-semibold text-base transition-all duration-200 flex items-center justify-center gap-3 ${
                  breakdown.subtotal > 0 && termsAgreed
                    ? "bg-[#0866FF] hover:bg-[#0052d4] text-white shadow-lg shadow-blue-900/30"
                    : "bg-white/5 text-slate-600 cursor-not-allowed"
                }`}
              >
                {/* Facebook Messenger icon */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z" />
                </svg>
                {breakdown.subtotal > 0 && termsAgreed ? "Message Us on Facebook" : ""}
              </button>
            </div>

            <p className="text-center text-slate-500 text-xs">
              Your quote details will be sent automatically — we&apos;ll confirm your booking and discuss next steps.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// ABOUT US SECTION
// ─────────────────────────────────────────────
function About() {
  return (
    <section
      id="about"
      className="py-24 px-6 border-t border-white/5"
      style={{ backgroundColor: "#090818" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Text content */}
          <div>
            <p className="text-blue-400 text-xs tracking-[0.3em] uppercase mb-4 font-medium">About Us</p>
            <h2 className="text-white font-black text-4xl md:text-5xl mb-6" style={{ letterSpacing: "-0.02em" }}>
              Passion for<br />Perfection.
            </h2>
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                GB Detailing was founded on a simple belief: every car deserves to be treated
                with care and expertise. Based in Cambridge and serving the surrounding areas,
                we bring professional detailing directly to your door — or you can drop off
                with us for a discounted rate.
              </p>
              <p>
                Whether it&apos;s a deep interior clean, a thorough exterior wash and detail,
                or specialist biohazard cleaning, we approach every job with the same
                attention to detail and commitment to quality results.
              </p>
              <p>
                We use professional-grade products and pride ourselves on honest pricing
                and reliable service. No hidden fees — just a clean car and a smile.
              </p>
            </div>

            {/* Contact info */}
            <div className="mt-10 space-y-4">
              <h3 className="text-white font-semibold text-lg">Get In Touch</h3>

              <a
                href="tel:+44YOURNUMBER"
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 transition-all">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-slate-300 group-hover:text-white transition-colors">
                  +44 07594 780 797 {/* ← Replace with your number */}
                </span>
              </a>

              {/* Social links */}
              {[
                {
                  name: "Facebook",
                  url: "https://facebook.com/Gberrisdetails", // ← Replace URL
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  ),
                },
                {
                  name: "Instagram",
                  url: "https://instagram.com/gb_detaling", // ← Replace URL
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth={2} />
                      <circle cx="12" cy="12" r="4" strokeWidth={2} />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" strokeWidth={0} />
                    </svg>
                  ),
                },
                {
                  name: "TikTok",
                  url: "https://tiktok.com/@gb_details", // ← Replace URL
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.69a8.18 8.18 0 004.79 1.53V6.77a4.84 4.84 0 01-1.03-.08z" />
                    </svg>
                  ),
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:border-blue-500/50 transition-all">
                    {social.icon}
                  </div>
                  <span className="text-slate-300 group-hover:text-white transition-colors">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Image placeholders */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Our Work", tall: true },
              { label: "Team", tall: false },
              { label: "Before & After", tall: false },
              { label: "Our Van", tall: true },
            ].map((img, i) => (
              <div
                key={i}
                className={`rounded-2xl border border-white/8 bg-slate-900 flex items-end overflow-hidden ${img.tall ? "row-span-2" : ""}`}
                style={{ minHeight: img.tall ? "280px" : "130px" }}
              >
                {/*
                  ── IMAGE PLACEHOLDER ──────────────────────────
                  Replace with:
                  <Image src="/your-photo.jpg" alt="..." fill className="object-cover" />
                  ───────────────────────────────────────────────
                */}
                <div className="w-full h-full flex items-center justify-center min-h-[130px]">
                  <svg className="w-10 h-10 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// TERMS & CONDITIONS SECTION
// ─────────────────────────────────────────────
function Terms() {
  const terms = [
    {
      title: "General Service Agreement",
      body: "By booking with GB Detailing, the customer agrees to all terms outlined below. All services are carried out to a high professional standard; however, results may vary depending on the condition of the vehicle.",
      bullets: [],
    },
    {
      title: "Vehicle Condition and Pre-Existing Damage",
      body: "Customers must declare any pre-existing damage before the service begins. GB Detailing is not responsible for pre-existing damage including, but not limited to:",
      bullets: ["Scratches", "Paint defects", "Worn interiors", "Loose trims or components"],
      footer: "All vehicles are inspected prior to service. Photographs may be taken and recorded. Customers may be required to confirm existing damage before work begins.",
    },
    {
      title: "Biohazard and Specialist Cleaning",
      body: "Biohazard services (including blood, vomit, urine, feces, or other bodily fluids):",
      bullets: [
        "Must be clearly disclosed before booking",
        "Are subject to inspection before final pricing",
        "May be refused at the discretion of GB Detailing",
      ],
      footer: "Failure to disclose biohazards may result in cancellation without refund.",
    },
    {
      title: "Deposits and Payments",
      body: "A 10% deposit is required to secure all bookings. Deposits are non-refundable. The deposit will be deducted from the final balance. The remaining balance is due upon completion of the service.",
      bullets: [],
    },
    {
      title: "Cancellations",
      body: "Cancellations must be made at least 24 hours in advance. Failure to cancel within this time will result in loss of deposit.",
      bullets: [],
    },
    {
      title: "Time and Scheduling",
      body: "All service times are estimates only and may vary depending on vehicle condition. GB Detailing is not liable for delays caused by vehicle condition, weather, or unforeseen circumstances.",
      bullets: [],
    },
    {
      title: "Risk Disclaimer",
      body: "While every care is taken, detailing work may involve risk when working on aged paintwork, fragile materials, or previously damaged areas. GB Detailing will always act with care and professionalism but cannot be held responsible for issues arising from pre-existing wear or weakened materials.",
      bullets: [],
    },
    {
      title: "Mobile Service Requirements",
      body: "For mobile services, the customer must provide:",
      bullets: [
        "A minimum of 1.5 metres of working space",
        "Access to water",
        "Access to electricity",
        "A safe working environment",
      ],
      footer: "GB Detailing reserves the right to refuse or cancel a booking if conditions are unsuitable. Work may be stopped at any time if safety becomes a concern. In such cases, no refund will be issued.",
    },
    {
      title: "Pricing Adjustments",
      body: "Final pricing may vary depending on vehicle size, condition, or undisclosed issues. Customers will be informed of any additional charges before work continues.",
      bullets: [],
    },
    {
      title: "Photography and Media",
      body: "GB Detailing may take before and after photographs for documentation, quality control, and marketing purposes. Vehicle registration plates and personal details will be concealed. Customers may request that their vehicle is not used for marketing. Permission will always be requested prior to publishing images.",
      bullets: [],
    },
    {
      title: "Agreement",
      body: "By booking a service, the customer confirms they have read and agreed to these Terms and Conditions.",
      bullets: [],
    },
  ];

  return (
    <section
      id="terms"
      className="py-24 px-6 border-t border-white/5"
      style={{ backgroundColor: "#090818" }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-blue-400 text-xs tracking-[0.3em] uppercase mb-3 font-medium">Legal</p>
          <h2 className="text-white font-black text-4xl md:text-5xl mb-4" style={{ letterSpacing: "-0.02em" }}>
            Terms & Conditions
          </h2>
          <p className="text-slate-500 text-sm">
            Last updated: {new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
          </p>
        </div>

        <div className="space-y-4">
          {terms.map((term, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/6 p-6 hover:border-white/12 transition-all duration-200"
              style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
            >
              <div className="flex gap-5">
                <span className="text-blue-500/50 font-mono text-sm mt-0.5 shrink-0 w-6">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-2">{term.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{term.body}</p>
                  {term.bullets && term.bullets.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {term.bullets.map((b, bi) => (
                        <li key={bi} className="flex items-start gap-2 text-slate-400 text-sm">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-500/60 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                  {"footer" in term && term.footer && (
                    <p className="text-slate-400 text-sm leading-relaxed mt-2">{term.footer}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-slate-600 text-xs text-center mt-10">
          By booking with GB Detailing, you agree to all of the above terms and conditions.
          For questions, contact us via the details in the About section.
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="border-t border-white/5 py-10 px-6"
      style={{ backgroundColor: "#090818" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center">
            <span className="text-white font-black text-xs">GB</span>
          </div>
          <span className="text-slate-400 text-sm">GB Detailing</span>
        </div>
        <p className="text-slate-600 text-xs text-center">
          © {new Date().getFullYear()} GB Detailing. All rights reserved. Professional Car Detailing · Cambridge, UK.
        </p>
        <div className="flex gap-5">
          {["Home", "Quote", "About", "Terms"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-slate-600 hover:text-slate-400 text-xs tracking-wide transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE — Assembles all sections
// ─────────────────────────────────────────────
export default function Home() {
  return (
    <main style={{ backgroundColor: "#090818", fontFamily: "'system-ui', sans-serif" }}>
      <Nav />
      <Hero />
      <QuoteBooking />
      <About />
      <Terms />
      <Footer />
    </main>
  );
}