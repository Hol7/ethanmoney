
'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";

import {
  ArrowRight,
  Shield,
  Clock,
  Globe,
  ChevronDown,
  Menu,
  X,
  Users,
  CheckCircle,
} from "lucide-react";

/**
 * Modern EthanMoney landing (bilingual EN/FR)
 * - Toggle language with top-right button
 * - Inter font loaded inline (for quick demo). Move to global CSS in production.
 * - Glassmorphism card, floating trust indicators, micro-animations, counters
 * - Uses Tailwind classes; adjust to match your Tailwind config where needed.
 */

export default function EthanMoneyLanding() {
  const [lang, setLang] = useState("en"); // 'en' or 'fr'
  const t = (en, fr) => (lang === "en" ? en : fr);

  const [fromCountry, setFromCountry] = useState("france");
  const [amount, setAmount] = useState("100");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [counters, setCounters] = useState({ users: 0, transfers: 0, rating: 0 });

  // Exchange + calculation logic (same as yours but cleaned a bit)
  const exchangeRate = fromCountry === "france" ? 656 : 0.0015;
  const parsedAmount = Number(amount) || 0;
  const calculatedAmount =
    fromCountry === "france"
      ? Math.round(parsedAmount * exchangeRate).toLocaleString()
      : (parsedAmount * exchangeRate).toFixed(2);

  const getFees = (amt) => {
    const value = Number(amt) || 0;
    if (fromCountry === "france") {
      if (value <= 150) return value > 100 ? 5.4 : 4.8;
      return 30.0;
    } else {
      if (value <= 60000) return 7788;
      if (value <= 150000) return 17700;
      if (value <= 180000) return 19116;
      if (value <= 240000) return 22056;
      if (value <= 300000) return 24780;
      if (value <= 600000) return 40356;
      if (value <= 800000) return 49088;
      return 59000;
    }
  };
  const fees = getFees(amount);

  // Animated counters (micro-animation)
  useEffect(() => {
    let raf;
    const target = { users: 1000, transfers: 2000, rating: 4.9 };
    const duration = 1200;
    const start = performance.now();
    const step = (now) => {
      const tTime = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const ease = 1 - Math.pow(1 - tTime, 3);
      setCounters({
        users: Math.round(target.users * ease),
        transfers: Math.round(target.transfers * ease),
        rating: Math.round((target.rating * ease) * 10) / 10,
      });
      if (tTime < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  // small accessibility helpers
  const ariaLang = lang === "en" ? "English" : "Français";

  return (
    <div
      className="min-h-screen text-gray-800"
      style={{
        // design tokens — swap as needed
        "--brand-1": "#009542", // green
        "--brand-2": "#eb5437", // accent orange
        "--accent-2": "#f4ab42",
        fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      }}
      lang={lang}
    >
      {/* Inter font import (quick demo). Move this into global CSS or head in production */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap'); 
        /* small custom keyframes for subtle micro-animations */
        @keyframes floaty { 0% { transform: translateY(0); } 50% { transform: translateY(-6px); } 100% { transform: translateY(0);} }
        .floaty { animation: floaty 4s ease-in-out infinite; }
        .glass { background: rgba(255,255,255,0.14); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.12); }
      `}</style>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div
                className="rounded-lg px-3 py-2 text-lg font-extrabold"
                style={{ color: "var(--brand-2)" }}
              >
                {/* Ethan Money */}
                  <Image
                  className="dark:invert"
                  src="/logo.svg"
                  alt="Next.js logo"
                  width={200}
                  height={150}
                  priority
                />
              </div>
              <div className="hidden sm:flex items-center text-sm gap-6">
                <a className="hover:underline" href="#send">
                  {t("Send Money", "Envoyer de l'argent")}
                </a>
                <a className="hover:underline" href="#rates">
                  {t("Rates", "Tarifs")}
                </a>
                <a className="hover:underline" href="#how">
                  {t("How it works", "Comment ça marche")}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-3">
                <button
                  className="px-4 py-2 rounded-md text-sm font-medium hover:shadow-sm transition"
                  aria-label={t("Sign in", "Se connecter")}
                >
                  {t("Sign in", "Se connecter")}
                </button>
                <button
                  className="px-5 py-2 rounded-full text-sm font-semibold shadow-sm hover:opacity-95 transition"
                  style={{ backgroundColor: "var(--brand-2)", color: "#fff" }}
                >
                  {t("Get started", "Commencer")}
                </button>
              </div>

              <button
                aria-expanded={mobileMenuOpen}
                aria-label={t("Toggle menu", "Ouvrir le menu")}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              {/* Language toggle */}
              <button
                className="ml-2 text-xs px-2 py-1 rounded-md border cursor-pointer"
                onClick={() => setLang(lang === "en" ? "fr" : "en")}
                aria-label={t("Change language", "Changer la langue")}
                title={`${t("Current", "Langue actuelle")}: ${ariaLang}`}
              >
                {lang === "en" ? "FR" : "EN"}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-4 py-4 space-y-3">
              <a href="#send" className="block font-medium">
                {t("Send Money", "Envoyer")}
              </a>
              <a href="#rates" className="block font-medium">
                {t("Rates", "Tarifs")}
              </a>
              <a href="#how" className="block font-medium">
                {t("How it works", "Comment ça marche")}
              </a>
              <div className="flex gap-2">
                <button className="flex-1 cursor-pointer px-4 py-2 rounded-md border">Sign in</button>
                <button className="flex-1 cursor-pointer px-4 py-2 rounded-md text-white" style={{ backgroundColor: "var(--brand-2)" }}>
                  {t("Get started", "Commencer")}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="send"
        className="relative overflow-hidden"
        aria-label={t("Hero", "Héros")}
      >
        {/* Background lifestyle photo */}
        <div className="absolute inset-0 -z-10 bg-" style={{ background: 'linear-gradient(135deg, #009542 0%, #006b30 100%)' }}>
          <img
            src="https://img.freepik.com/premium-photo/home-phone-happy-black-woman-social-media-connected-internet-with-website-notification-news-digital-african-girl-online-typing-texting-networking-mobile-app-search-content_590464-202075.jpg"
            alt={t("Family holding hands", "Famille se tenant la main")}
            className="w-full h-full object-cover grayscale-[.05] brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/25 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4 drop-shadow-sm">
                {t(
                  "Fast, secure money transfers to Congo-Brazzaville",
                  "Transferts rapides et sécurisés vers le Congo-Brazzaville"
                )}
              </h1>
              <p className="text-base md:text-lg mb-6 max-w-xl leading-relaxed text-white/90">
                {t(
                  "Send money from France and Germany to Congo-Brazzaville with competitive rates and low fees. Pay with PayPal or cash.",
                  "Envoyez de l'argent depuis la France et l'Allemagne vers le Congo-Brazzaville à des taux compétitifs et frais réduits. Payez par PayPal ou en espèces."
                )}
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  className="inline-flex items-center cursor-pointer gap-2 px-5 py-3 rounded-full font-semibold shadow-lg transform hover:-translate-y-0.5 transition"
                  style={{ backgroundColor: "var(--brand-2)", color: "#fff" }}
                >
                  {t("Send money now", "Envoyer maintenant")}
                  <ArrowRight size={18} />
                </button>

                {/* <button className="px-5 py-3 rounded-full bg-white/90 font-semibold hover:shadow-md transition">
                  {t("Learn more", "En savoir plus")}
                </button> */}
              </div>

              {/* Floating trust indicators */}
              <div className="mt-8 flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-3 p-3 rounded-lg glass shadow-sm floaty" style={{ minWidth: 160 }}>
                  <Users size={20} className="opacity-90" />
                  <div>
                    <div className="text-sm font-semibold">{counters.users.toLocaleString()}</div>
                    <div className="text-xs text-white/80">{t("Customers", "Clients")}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg glass shadow-sm animate-[pulse_3s_infinite]">
                  <CheckCircle size={20} className="opacity-90" />
                  <div>
                    <div className="text-sm font-semibold">{counters.rating}★</div>
                    <div className="text-xs text-white/80">{t("Avg. rating", "Note moyenne")}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg glass shadow-sm floaty" style={{ animationDelay: "0.6s", minWidth: 160 }}>
                  <ArrowRight size={20} className="opacity-90" />
                  <div>
                    <div className="text-sm font-semibold">{counters.transfers.toLocaleString()}</div>
                    <div className="text-xs text-white/80">{t("Transfers made", "Transferts effectués")}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculator Card: glassmorphism + micro animations */}
            <div className="w-full bg-white text-black" >
              <div className="glass rounded-2xl p-5 sm:p-8 shadow-2xl border border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold" style={{ color: "var(--brand-1)" }}>
                    {t("Calculate your transfer", "Calculez votre transfert")}
                  </h3>
                  <div className="text-xs text-black">{t("Instant preview", "Aperçu instantané")}</div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs text-black block">{t("You send", "Vous envoyez")}</label>
                  <div className="relative">
                    <input
                      type="number"
                      inputMode="numeric"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full rounded-xl p-4 pr-28 font-semibold text-lg focus:outline-none outline-2 outline-offset-0 transition-shadow shadow-sm"
                      aria-label={t("Amount to send", "Montant à envoyer")}
                    />
                    <select
                      value={fromCountry}
                      onChange={(e) => setFromCountry(e.target.value)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-md p-2 px-3 text-sm font-medium"
                      aria-label={t("Currency", "Monnaie")}
                    >
                      <option value="france">EUR</option>
                      <option value="congo">FCFA</option>
                    </select>
                  </div>
                  <p className="text-xs text-black">
                    {t("Fees", "Frais")}:{" "}
                    <span className="font-semibold">
                      {fromCountry === "france" ? `${fees.toFixed(2)} €` : `${fees.toLocaleString()} FCFA`}
                    </span>
                  </p>

                  <div className="flex items-center justify-center py-2">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--accent-2)" }}>
                      <ArrowRight className="text-black transform rotate-90" />
                    </div>
                  </div>

                  <label className="text-xs text-black block">{t("Recipient gets", "Le destinataire reçoit")}</label>
                  <div className="relative">
                    <input
                      readOnly
                      value={calculatedAmount}
                      className="w-full rounded-xl p-4 pr-24 bg-white/10 text-lg font-semibold focus:outline-none outline-2 outline-offset-0 transition-shadow shadow-sm"
                      aria-label={t("Recipient amount", "Montant reçu")}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">
                      {fromCountry === "france" ? "FCFA" : "EUR"}
                    </span>
                  </div>
                  <p className="text-xs text-black">
                    {t("Exchange rate", "Taux")}: 1 {fromCountry === "france" ? "EUR" : "FCFA"} = {exchangeRate}{" "}
                    {fromCountry === "france" ? "FCFA" : "EUR"}
                  </p>

                  <button
                    className="w-full py-3 rounded-lg font-semibold shadow hover:shadow-md transform hover:-translate-y-[2px] transition"
                    style={{ backgroundColor: "var(--brand-2)", color: "#fff" }}
                  >
                    {t("Continue", "Continuer")}
                  </button>
                </div>
              </div>

              {/* small micro-copy and badges */}
              <div className="mt-3 flex flex-wrap gap-2 items-center text-xs text-gray-600">
                <span className="flex items-center gap-2 bg-white/90 px-3 py-1 rounded-full shadow-sm">
                  <Shield size={14} /> {t("Bank-grade security", "Sécurité bancaire")}
                </span>
                <span className="flex items-center gap-2 bg-white/90 px-3 py-1 rounded-full shadow-sm">
                  <Clock size={14} /> {t("Fast transfers", "Transferts rapides")}
                </span>
                <span className="flex items-center gap-2 bg-white/90 px-3 py-1 rounded-full shadow-sm">
                  <Globe size={14} /> {t("Multi-pay options", "Multi-options de paiement")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-12 bg-gray-50" id="how">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: "var(--brand-1)" }}>
            {t("Why choose Ethan Money?", "Pourquoi choisir Ethan Money ?")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard title={t("Safe & Secure","Sûr & Sécurisé")} icon={<Shield />} color="var(--brand-1)">
              {t(
                "Your money is protected with bank-level security and encryption.",
                "Votre argent est protégé par une sécurité de niveau bancaire et un chiffrement."
              )}
            </FeatureCard>

            <FeatureCard title={t("Fast Transfers","Transferts rapides")} icon={<Clock />} color="var(--accent-2)">
              {t("Most transfers are completed within hours.", "La plupart des transferts sont effectués en quelques heures.")}
            </FeatureCard>

            <FeatureCard title={t("Multiple Payment Options","Options de paiement")} icon={<Globe />} color="var(--brand-1)">
              {t("Pay with PayPal or cash. Flexible payment methods.", "Payez par PayPal ou en espèces. Méthodes flexibles.")}
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* PRICING / RATES — enhanced comparison */}
      <section id="rates" className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <h3 className="text-2xl font-bold" style={{ color: "var(--brand-1)" }}>
                {t("Our rates", "Nos tarifs")}
              </h3>
              <p className="text-sm text-gray-600">{t("Transparent pricing with no hidden fees", "Tarification transparente sans frais cachés")}</p>
            </div>

            <div className="flex gap-3">
              <div className="text-xs text-gray-700 flex items-center gap-2 px-3 py-2 rounded-md border">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "var(--brand-1)" }} />
                {t("From France", "Depuis la France")}
              </div>
              <div className="text-xs text-gray-700 flex items-center gap-2 px-3 py-2 rounded-md border">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "var(--brand-2)" }} />
                {t("From Congo", "Depuis le Congo")}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Card: From France */}
            <div className="rounded-2xl border ring-1 ring-inset ring-gray-100 p-4">
              <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: "var(--brand-1)", color: "#fff" }}>
                <div>
                  <h4 className="text-lg font-bold">From France</h4>
                  <div className="text-sm opacity-90">1 EUR = 656 FCFA</div>
                </div>
                <div className="text-right">
                  <div className="text-xs">{t("Typical fee","Frais typique")}</div>
                  <div className="text-lg font-semibold">4.80 €</div>
                </div>
              </div>

              <div className="p-4">
                <PricingRow label="0 - 50 €" value="4.80 €" highlight />
                <PricingRow label="50.01 - 100 €" value="4.80 €" />
                <PricingRow label="100.01 - 150 €" value="5.40 €" />
                <PricingRow label="150.01 - 1,000 €" value="30.00 €" />
                <div className="mt-4">
                  <div className="text-xs text-gray-500 mb-2">{t("Compare", "Comparer")}</div>
                  <div className="flex gap-2 items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div className="h-full" style={{ width: "12%", backgroundColor: "var(--brand-1)" }} />
                    </div>
                    <div className="text-xs text-gray-600">You save vs banks</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card: From Congo */}
            <div className="rounded-2xl border ring-1 ring-inset ring-gray-100 p-4">
              <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: "var(--brand-2)", color: "#fff" }}>
                <div>
                  <h4 className="text-lg font-bold">From Congo</h4>
                  <div className="text-sm opacity-90">1 FCFA = 0.0015 EUR</div>
                </div>
                <div className="text-right">
                  <div className="text-xs">{t("Typical fee","Frais typique")}</div>
                  <div className="text-lg font-semibold">7,788 FCFA</div>
                </div>
              </div>

              <div className="p-4">
                <PricingRow label="0 - 60,000" value="7,788 FCFA" highlight />
                <PricingRow label="60,001 - 150,000" value="17,700 FCFA" />
                <PricingRow label="150,001 - 180,000" value="19,116 FCFA" />
                <PricingRow label="180,001 - 240,000" value="22,056 FCFA" />
                <PricingRow label="240,001 - 300,000" value="24,780 FCFA" />
                <div className="mt-4">
                  <div className="text-xs text-gray-500 mb-2">{t("Comparison", "Comparaison")}</div>
                  <div className="flex gap-2 items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div className="h-full" style={{ width: "18%", backgroundColor: "var(--brand-2)" }} />
                    </div>
                    <div className="text-xs text-gray-600">{t("Competitive vs alternatives", "Compétitif vs alternatives")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF & TRUST */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-1 gap-6 items-center">
            {/* <div>
              <h3 className="text-2xl font-bold mb-3">{t("Trusted by thousands", "Approuvé par des milliers")}</h3>
              <p className="text-sm text-gray-600 mb-6">{t("Real metrics from real customers", "Des métriques réelles de vrais clients")}</p>

              <div className="flex gap-4 items-center">
                <div className="p-4 rounded-lg bg-white shadow-sm">
                  <div className="text-sm text-gray-500">{t("Customers", "Clients")}</div>
                  <div className="text-xl font-bold">{counters.users.toLocaleString()}</div>
                </div>
                <div className="p-4 rounded-lg bg-white shadow-sm">
                  <div className="text-sm text-gray-500">{t("Transfers", "Transferts")}</div>
                  <div className="text-xl font-bold">{counters.transfers.toLocaleString()}</div>
                </div>
                <div className="p-4 rounded-lg bg-white shadow-sm">
                  <div className="text-sm text-gray-500">{t("Average rating","Note moyenne")}</div>
                  <div className="text-xl font-bold">{counters.rating}★</div>
                </div>
              </div>
            </div> */}

            {/* Certifications */}
            {/* <div>
              <h4 className="text-lg font-semibold mb-3">{t("Certifications & Trust", "Certifications & Confiance")}</h4>
              <p className="text-sm text-gray-600 mb-4">{t("We maintain the highest standards", "Nous maintenons les normes les plus élevées")}</p>

              <div className="flex flex-wrap gap-3 items-center">
                <div className="p-3 bg-white rounded-lg shadow-sm flex items-center gap-3">
                  <img src="https://via.placeholder.com/48x30?text=PCI" alt="PCI" className="h-6" />
                  <div className="text-sm">
                    <div className="font-semibold">PCI DSS</div>
                    <div className="text-xs text-gray-500">{t("Compliant","Conforme")}</div>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg shadow-sm flex items-center gap-3">
                  <img src="https://via.placeholder.com/48x30?text=ISO" alt="ISO" className="h-6" />
                  <div className="text-sm">
                    <div className="font-semibold">ISO 27001</div>
                    <div className="text-xs text-gray-500">{t("Information security","Sécurité de l'information")}</div>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg shadow-sm flex items-center gap-3">
                  <img src="https://via.placeholder.com/48x30?text=KYC" alt="KYC" className="h-6" />
                  <div className="text-sm">
                    <div className="font-semibold">{t("Strong KYC","KYC strict")}</div>
                    <div className="text-xs text-gray-500">{t("Verified partners","Partenaires vérifiés")}</div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12" style={{ backgroundColor: "var(--accent-2)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {t("Ready to send money?", "Prêt à envoyer de l'argent ?")}
          </h2>
          <p className="text-white/90 mb-6">{t("Join thousands who trust Ethan Money.", "Rejoignez des milliers qui nous font confiance.")}</p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-3 rounded-full bg-white font-semibold" style={{ color: "var(--brand-1)" }}>
              {t("Get started now", "Commencer maintenant")}
            </button>
            <button className="px-8 py-3 rounded-full bg-white/10 text-white border border-white/20">
              {t("Contact sales", "Contacter les ventes")}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
            <div>
              <Image
                  className="dark:invert"
                  src="/logo.svg"
                  alt="Next.js logo"
                  width={180}
                  height={150}
                  priority
                />
              {/* <h4 className="font-bold text-lg mb-2" style={{ color: "var(--accent-2)" }}>Ethan Money</h4> */}
              <p className="text-sm text-gray-300">{t("Fast, secure money transfers between Europe and Congo-Brazzaville", "Transferts rapides et sécurisés entre l'Europe et le Congo-Brazzaville")}</p>
              <p className="text-sm text-gray-300">+242-06-781-56-99</p>
              <p className="text-sm text-gray-300">+33-6-13-64-95-19</p>
            </div>
            <div>
              <h5 className="font-semibold mb-2">{t("Company", "Entreprise")}</h5>
              <ul className="space-y-1 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">{t("About us", "À propos")}</a></li>
                <li><a href="#" className="hover:text-white">{t("Careers", "Carrières")}</a></li>
                <li><a href="#" className="hover:text-white">{t("Press", "Presse")}</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-2">{t("Support", "Support")}</h5>
              <ul className="space-y-1 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">{t("Help Center", "Centre d'aide")}</a></li>
                <li><a href="#" className="hover:text-white">{t("Contact us", "Nous contacter")}</a></li>
                <li><a href="#" className="hover:text-white">{t("FAQ", "FAQ")}</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-2">{t("Legal", "Juridique")}</h5>
              <ul className="space-y-1 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">{t("Privacy Policy", "Politique de confidentialité")}</a></li>
                <li><a href="#" className="hover:text-white">{t("Terms of Service", "Conditions d'utilisation")}</a></li>
                <li><a href="#" className="hover:text-white">{t("Cookie Policy", "Politique de cookies")}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Ethan Money. {t("All rights reserved.", "Tous droits réservés.")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* Small helper components used above (keeps main component tidy) */
function FeatureCard({ title, icon, color, children }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition">
      <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: color }}>
        {React.cloneElement(icon, { size: 20, color: "#fff" })}
      </div>
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{children}</p>
    </div>
  );
}

function PricingRow({ label, value, highlight }) {
  return (
    <div className={`flex items-center justify-between py-2 ${highlight ? "bg-white/20 rounded-md p-2" : ""}`}>
      <div className="text-sm font-medium text-gray-700">{label}</div>
      <div className="text-sm font-semibold text-gray-900">{value}</div>
    </div>
  );
}






// import React, { useState } from 'react';
// import { ArrowRight, Shield, Clock, Globe, ChevronDown, Menu, X } from 'lucide-react';

// export default function EthanMoneyLanding() {
//   const [fromCountry, setFromCountry] = useState('france');
//   const [amount, setAmount] = useState('100');
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const exchangeRate = fromCountry === 'france' ? 656 : 0.0015;
//   const calculatedAmount = fromCountry === 'france' 
//     ? (parseFloat(amount) * 656).toFixed(0)
//     : (parseFloat(amount) * 0.0015).toFixed(2);

//   const getFees = (amt) => {
//     const value = parseFloat(amt);
//     if (fromCountry === 'france') {
//       if (value <= 50) return 4.80;
//       if (value <= 100) return 4.80;
//       if (value <= 150) return 5.40;
//       return 30.00;
//     } else {
//       if (value <= 60000) return 7788;
//       if (value <= 150000) return 17700;
//       if (value <= 180000) return 19116;
//       if (value <= 240000) return 22056;
//       if (value <= 300000) return 24780;
//       if (value <= 600000) return 40356;
//       if (value <= 800000) return 49088;
//       return 59000;
//     }
//   };

//   const fees = getFees(amount);

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Navigation */}
//       <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center">
//               <span className="text-2xl font-bold" style={{ color: '#eb5437' }}>
//                 Ethan Money
//               </span>
//             </div>
            
//             <div className="hidden md:flex items-center space-x-8">
//               <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Send Money</a>
//               <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Rates</a>
//               <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">How it works</a>
//               <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Help</a>
//               <button className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium">
//                 Sign in
//               </button>
//               <button 
//                 className="px-6 py-2 rounded-full text-white font-medium hover:opacity-90 transition-opacity"
//                 style={{ backgroundColor: '#eb5437' }}
//               >
//                 Get started
//               </button>
//             </div>

//             <button 
//               className="md:hidden"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile menu */}
//         {mobileMenuOpen && (
//           <div className="md:hidden border-t border-gray-200">
//             <div className="px-4 py-4 space-y-3">
//               <a href="#" className="block text-gray-700 font-medium">Send Money</a>
//               <a href="#" className="block text-gray-700 font-medium">Rates</a>
//               <a href="#" className="block text-gray-700 font-medium">How it works</a>
//               <a href="#" className="block text-gray-700 font-medium">Help</a>
//               <button className="w-full text-left text-gray-700 font-medium">Sign in</button>
//               <button 
//                 className="w-full px-6 py-2 rounded-full text-white font-medium"
//                 style={{ backgroundColor: '#eb5437' }}
//               >
//                 Get started
//               </button>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Hero Section */}
//       <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #009542 0%, #006b30 100%)' }}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div className="text-white">
//               <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
//                 Fast, secure money transfers to Congo-Brazzaville
//               </h1>
//               <p className="text-lg sm:text-xl mb-8 text-white opacity-90">
//                 Send money from France and Germany to Congo-Brazzaville with competitive rates and low fees. Pay with PayPal or cash.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <button 
//                   className="px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center"
//                   style={{ backgroundColor: '#eb5437', color: 'white' }}
//                 >
//                   Send money now
//                   <ArrowRight className="ml-2" size={20} />
//                 </button>
//                 <button className="px-8 py-4 rounded-full bg-white font-semibold text-lg hover:bg-gray-50 transition-colors" style={{ color: '#009542' }}>
//                   Learn more
//                 </button>
//               </div>
//             </div>

//             {/* Calculator Card */}
//             <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
//               <h3 className="text-2xl font-bold mb-6" style={{ color: '#009542' }}>Calculate your transfer</h3>
              
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">You send</label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       value={amount}
//                       onChange={(e) => setAmount(e.target.value)}
//                       className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg text-2xl font-semibold focus:outline-none focus:border-green-500 pr-24"
//                     />
//                     <select
//                       value={fromCountry}
//                       onChange={(e) => setFromCountry(e.target.value)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 border-l-2 border-gray-300 pl-3 pr-2 py-2 text-lg font-medium focus:outline-none"
//                     >
//                       <option value="france">EUR</option>
//                       <option value="congo">FCFA</option>
//                     </select>
//                   </div>
//                   <p className="text-sm text-gray-500 mt-2">
//                     Fees: {fromCountry === 'france' ? `${fees.toFixed(2)} EUR` : `${fees.toLocaleString()} FCFA`}
//                   </p>
//                 </div>

//                 <div className="flex justify-center">
//                   <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f4ab42' }}>
//                     <ArrowRight className="transform rotate-90 text-white" size={24} />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Recipient gets</label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       value={calculatedAmount}
//                       readOnly
//                       className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg text-2xl font-semibold bg-gray-50 pr-24"
//                     />
//                     <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg font-medium text-gray-600">
//                       {fromCountry === 'france' ? 'FCFA' : 'EUR'}
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-500 mt-2">
//                     Exchange rate: 1 {fromCountry === 'france' ? 'EUR' : 'FCFA'} = {exchangeRate} {fromCountry === 'france' ? 'FCFA' : 'EUR'}
//                   </p>
//                 </div>

//                 <button 
//                   className="w-full py-4 rounded-lg text-white font-semibold text-lg hover:opacity-90 transition-opacity"
//                   style={{ backgroundColor: '#eb5437' }}
//                 >
//                   Continue
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16" style={{ color: '#009542' }}>
//             Why choose Ethan Money?
//           </h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
//               <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: '#eb5437' }}>
//                 <Shield className="text-white" size={28} />
//               </div>
//               <h3 className="text-xl font-bold mb-4" style={{ color: '#009542' }}>Safe & Secure</h3>
//               <p className="text-gray-600 leading-relaxed">
//                 Your money is protected with bank-level security and encryption. We're committed to keeping your transfers safe.
//               </p>
//             </div>

//             <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
//               <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: '#f4ab42' }}>
//                 <Clock className="text-white" size={28} />
//               </div>
//               <h3 className="text-xl font-bold mb-4" style={{ color: '#009542' }}>Fast Transfers</h3>
//               <p className="text-gray-600 leading-relaxed">
//                 Most transfers are completed within hours. Your loved ones receive money quickly when they need it most.
//               </p>
//             </div>

//             <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
//               <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: '#009542' }}>
//                 <Globe className="text-white" size={28} />
//               </div>
//               <h3 className="text-xl font-bold mb-4" style={{ color: '#009542' }}>Multiple Payment Options</h3>
//               <p className="text-gray-600 leading-relaxed">
//                 Pay with PayPal or cash. We offer flexible payment methods to make sending money convenient for you.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Pricing Tables */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4" style={{ color: '#009542' }}>
//             Our rates
//           </h2>
//           <p className="text-center text-gray-600 mb-16 text-lg">Transparent pricing with no hidden fees</p>

//           <div className="grid lg:grid-cols-2 gap-8">
//             {/* From France */}
//             <div className="border-2 rounded-2xl overflow-hidden" style={{ borderColor: '#009542' }}>
//               <div className="p-6 text-white" style={{ backgroundColor: '#009542' }}>
//                 <h3 className="text-2xl font-bold mb-2">From France</h3>
//                 <p className="text-lg opacity-90">Exchange rate: 1 EUR = 656 FCFA</p>
//               </div>
//               <div className="p-6">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="border-b-2" style={{ borderColor: '#f4ab42' }}>
//                       <th className="text-left py-3 font-semibold text-gray-700">Amount (EUR)</th>
//                       <th className="text-right py-3 font-semibold text-gray-700">Fees</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     <tr><td className="py-4">0 - 50.00</td><td className="text-right py-4 font-medium">4.80 €</td></tr>
//                     <tr><td className="py-4">50.01 - 100.00</td><td className="text-right py-4 font-medium">4.80 €</td></tr>
//                     <tr><td className="py-4">100.01 - 150.00</td><td className="text-right py-4 font-medium">5.40 €</td></tr>
//                     <tr><td className="py-4">150.01 - 1,000.00</td><td className="text-right py-4 font-medium">30.00 €</td></tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* From Congo */}
//             <div className="border-2 rounded-2xl overflow-hidden" style={{ borderColor: '#eb5437' }}>
//               <div className="p-6 text-white" style={{ backgroundColor: '#eb5437' }}>
//                 <h3 className="text-2xl font-bold mb-2">From Congo</h3>
//                 <p className="text-lg opacity-90">Exchange rate: 1 FCFA = 0.0015 EUR</p>
//               </div>
//               <div className="p-6">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="border-b-2" style={{ borderColor: '#f4ab42' }}>
//                       <th className="text-left py-3 font-semibold text-gray-700">Amount (FCFA)</th>
//                       <th className="text-right py-3 font-semibold text-gray-700">Fees</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     <tr><td className="py-4">0 - 60,000</td><td className="text-right py-4 font-medium">7,788 FCFA</td></tr>
//                     <tr><td className="py-4">60,001 - 150,000</td><td className="text-right py-4 font-medium">17,700 FCFA</td></tr>
//                     <tr><td className="py-4">150,001 - 180,000</td><td className="text-right py-4 font-medium">19,116 FCFA</td></tr>
//                     <tr><td className="py-4">180,001 - 240,000</td><td className="text-right py-4 font-medium">22,056 FCFA</td></tr>
//                     <tr><td className="py-4">240,001 - 300,000</td><td className="text-right py-4 font-medium">24,780 FCFA</td></tr>
//                     <tr><td className="py-4">300,001 - 600,000</td><td className="text-right py-4 font-medium">40,356 FCFA</td></tr>
//                     <tr><td className="py-4">600,001 - 800,000</td><td className="text-right py-4 font-medium">49,088 FCFA</td></tr>
//                     <tr><td className="py-4">800,001 - 1,000,000</td><td className="text-right py-4 font-medium">59,000 FCFA</td></tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20" style={{ backgroundColor: '#f4ab42' }}>
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
//             Ready to send money?
//           </h2>
//           <p className="text-xl text-white mb-8 opacity-90">
//             Join thousands of customers who trust Ethan Money for their international transfers
//           </p>
//           <button 
//             className="px-10 py-4 rounded-full bg-white font-semibold text-lg hover:shadow-lg transition-shadow"
//             style={{ color: '#009542' }}
//           >
//             Get started now
//           </button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-4 gap-8 mb-8">
//             <div>
//               <h4 className="font-bold text-lg mb-4" style={{ color: '#f4ab42' }}>Ethan Money</h4>
//               <p className="text-gray-400 text-sm">Fast, secure money transfers between Europe and Congo-Brazzaville</p>
//             </div>
//             <div>
//               <h5 className="font-semibold mb-4">Company</h5>
//               <ul className="space-y-2 text-sm text-gray-400">
//                 <li><a href="#" className="hover:text-white">About us</a></li>
//                 <li><a href="#" className="hover:text-white">Careers</a></li>
//                 <li><a href="#" className="hover:text-white">Press</a></li>
//               </ul>
//             </div>
//             <div>
//               <h5 className="font-semibold mb-4">Support</h5>
//               <ul className="space-y-2 text-sm text-gray-400">
//                 <li><a href="#" className="hover:text-white">Help Center</a></li>
//                 <li><a href="#" className="hover:text-white">Contact us</a></li>
//                 <li><a href="#" className="hover:text-white">FAQ</a></li>
//               </ul>
//             </div>
//             <div>
//               <h5 className="font-semibold mb-4">Legal</h5>
//               <ul className="space-y-2 text-sm text-gray-400">
//                 <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
//                 <li><a href="#" className="hover:text-white">Terms of Service</a></li>
//                 <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
//               </ul>
//             </div>
//           </div>
//           <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
//             <p>&copy; 2024 Ethan Money. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
