/* Popoyo Concierge — single-page logic */

const WHATSAPP_NUMBER = "50589750052"; // Karen — Popoyo, NI
const EMAIL_ADDRESS = "concierge@popoyo.co";

/* ================== i18n ================== */

const I18N = {
  en: {
    "meta.title": "Popoyo Concierge — Anything you need in Popoyo, Nicaragua",
    "meta.description": "One message. Stays, rides, surf, lessons, dinners, spa, childcare. We arrange it. You enjoy Popoyo.",
    "hero.headline1": "Your Popoyo,",
    "hero.headline2": "handled.",
    "hero.lead": "Tell us what you need. We arrange it.",
    "cta.whatsapp": "Message on WhatsApp",
    "cta.email": "Email us",
    "hero.meta": "Reply within minutes · English & Español · Popoyo, Nicaragua",
    "services.title": "We arrange",
    "service.stays": "Stays",
    "service.airport": "Airport pickup",
    "service.cars": "Cars",
    "service.motos": "Motos",
    "service.atvs": "ATVs",
    "service.surfboards": "Surfboards",
    "service.surfLessons": "Surf lessons",
    "service.excursions": "Excursions",
    "service.spa": "Spa",
    "service.childcare": "Childcare",
    "service.restaurants": "Restaurant bookings",
    "service.chef": "Private chef",
    "service.dates": "Romantic dates",
    "service.anything": "Anything else",
    "middle.title": "Don't see it? Ask anyway.",
    "middle.lead": "If it makes your trip easier, we'll arrange it.",
    "middle.cta": "WhatsApp Karen",
    "reviews.eyebrow": "Reviews",
    "reviews.source": "From our sister business, Karen & JJ Moto Rental — same team, same care.",
    "reviews.via": "via Google reviews",
    "contact.title": "Get in touch",
    "contact.whatsapp.label": "WhatsApp",
    "contact.whatsapp.sub": "Karen — replies fast",
    "contact.email.label": "Email",
    "contact.email.sub": "Plan ahead, send details",
    "footer.line": "Popoyo Concierge · Popoyo, Nicaragua",
    "lang.switchTo": "Español",
    "lang.flag": "🇪🇸",
    "wa.prefill": "Hi Karen, I'd like help arranging:",
    "email.subject": "Popoyo Concierge request",
  },
  es: {
    "meta.title": "Popoyo Concierge — Todo lo que necesites en Popoyo, Nicaragua",
    "meta.description": "Un mensaje. Alojamiento, traslados, surf, clases, cenas, spa, niñeras. Lo organizamos. Tú disfrutas Popoyo.",
    "hero.headline1": "Tu Popoyo,",
    "hero.headline2": "listo.",
    "hero.lead": "Dinos qué necesitas. Lo organizamos.",
    "cta.whatsapp": "Escríbenos por WhatsApp",
    "cta.email": "Envíanos un correo",
    "hero.meta": "Respuesta en minutos · Español & English · Popoyo, Nicaragua",
    "services.title": "Organizamos",
    "service.stays": "Alojamiento",
    "service.airport": "Traslado del aeropuerto",
    "service.cars": "Carros",
    "service.motos": "Motos",
    "service.atvs": "Cuatrimotos",
    "service.surfboards": "Tablas de surf",
    "service.surfLessons": "Clases de surf",
    "service.excursions": "Excursiones",
    "service.spa": "Spa",
    "service.childcare": "Cuido de niños",
    "service.restaurants": "Reservas de restaurante",
    "service.chef": "Chef privado",
    "service.dates": "Citas románticas",
    "service.anything": "Cualquier otra cosa",
    "middle.title": "¿No lo ves? Pregúntanos igual.",
    "middle.lead": "Si te facilita el viaje, lo organizamos.",
    "middle.cta": "WhatsApp a Karen",
    "reviews.eyebrow": "Reseñas",
    "reviews.source": "De nuestro negocio hermano, Karen & JJ Moto Rental — mismo equipo, misma atención.",
    "reviews.via": "vía Google reviews",
    "contact.title": "Contáctanos",
    "contact.whatsapp.label": "WhatsApp",
    "contact.whatsapp.sub": "Karen — responde rápido",
    "contact.email.label": "Correo",
    "contact.email.sub": "Planifica con tiempo, envía los detalles",
    "footer.line": "Popoyo Concierge · Popoyo, Nicaragua",
    "lang.switchTo": "English",
    "lang.flag": "🇬🇧",
    "wa.prefill": "Hola Karen, me gustaría ayuda organizando:",
    "email.subject": "Solicitud Popoyo Concierge",
  },
};

function detectLang() {
  const stored = localStorage.getItem("lang");
  if (stored === "en" || stored === "es") return stored;
  const nav = (navigator.language || "en").toLowerCase();
  return nav.startsWith("es") ? "es" : "en";
}

let LANG = detectLang();

function t(key) {
  return I18N[LANG][key] ?? I18N.en[key] ?? key;
}

function applyI18n() {
  document.documentElement.lang = LANG;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const val = t(key);
    if (typeof val !== "string") return;
    const attr = el.getAttribute("data-i18n-attr");
    if (attr) el.setAttribute(attr, val);
    else el.textContent = val;
  });

  // Page title (separate from <title> innerText for some browsers)
  document.title = t("meta.title");

  // Toggle button shows the OTHER language to switch to.
  const flagEl = document.getElementById("langFlag");
  const labelEl = document.getElementById("langLabel");
  if (flagEl) flagEl.textContent = t("lang.flag");
  if (labelEl) labelEl.textContent = t("lang.switchTo");

  updateLinkUrls();
  renderReviews();
}

function setLang(lang) {
  LANG = lang;
  localStorage.setItem("lang", lang);
  applyI18n();
}

function toggleLang() {
  setLang(LANG === "en" ? "es" : "en");
}

/* ================== Links (WhatsApp / mailto) ================== */

function updateLinkUrls() {
  const waText = encodeURIComponent(t("wa.prefill"));
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;
  const mailUrl = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(t("email.subject"))}`;

  ["ctaWhatsappPrimary", "ctaWhatsappMiddle", "ctaWhatsappContact", "ctaWhatsappFloat"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = waUrl;
  });
  ["ctaEmailPrimary", "ctaEmailContact"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = mailUrl;
  });
}

/* ================== Reviews ================== */

// 5★ Google reviews of Karen & JJ Moto Rental — sister business, same team.
// Source: https://maps.app.goo.gl/ZCk4z9estajyz2JLA
const REVIEWS = [
  { name: "Sean", text: "Good prices, convenient and timely drop off and pick up, great bike. Highly recommended. Thanks!", when: "4 days ago", whenEs: "hace 4 días" },
  { name: "Leila Chan Currie", text: "Super smooth and easy rental! Very happy with the moto I got, and the people were really sweet and helpful. A few of my friends also rented and had no issues either. Go for it!", when: "6 days ago", whenEs: "hace 6 días" },
  { name: "Paul MALA", text: "Great experience! The owners are accommodating and the vehicles are of excellent quality!", when: "2 months ago", whenEs: "hace 2 meses" },
  { name: "Corentin FRANCOIS", text: "Super responsive and accommodating, quality motorcycles. A big thank you for the recommendations and good advice, I highly recommend them!", when: "2 months ago", whenEs: "hace 2 meses" },
  { name: "João Pedro Corrêa dos Santos", text: "Impeccable service and the motorcycle is also in excellent condition. They deliver the motorcycle to your accommodation with a full tank. Always attentive to anything you need.", when: "2 months ago", whenEs: "hace 2 meses" },
  { name: "Jana Schilling", text: "Highly recommend Karen's Moto Rental. Smooth process, excellent bike, and very kind people. They delivered the bike on time, came back for any adjustment I needed & were super helpful. One of the best rental experiences I've had. Thank you Karen & Dani!!", when: "3 months ago", whenEs: "hace 3 meses" },
  { name: "Melanie Velasquez Gallo", text: "JJ and Karen are wonderful. They rented us their motorcycle, which was brand new and ran perfectly. Besides the excellent rental service, they took us to the bus stop and recommended a friend who could pick us up in Managua.", when: "5 months ago", whenEs: "hace 5 meses" },
  { name: "Katherinevanessa Tovalvega", text: "The best rentals in Popoyo! Quality service. Highly recommend 😀😀", when: "8 months ago", whenEs: "hace 8 meses" },
  { name: "Guillaume Gelderblom", text: "Good scooters, easy to ride, good communication with Karen. Was great and fun to travel around Popoyo. Muchas Gracias.", when: "9 months ago", whenEs: "hace 9 meses" },
  { name: "Deric Cheng", text: "These motos were high quality, reliable, and the team was extremely responsive whenever I had any issues ☺️ Would strongly recommend!", when: "9 months ago", whenEs: "hace 9 meses" },
  { name: "Lou Nkpa", text: "Great experience with them. It's a local family business with very reasonable prices and great service!", when: "9 months ago", whenEs: "hace 9 meses" },
  { name: "Animatronik Eventos", text: "Impeccable service. They delivered my motorcycle and picked it up from Hacienda Iguana immediately and at no extra cost.", when: "9 months ago", whenEs: "hace 9 meses" },
  { name: "Roei Taieb", text: "Perfect, the best motorcycle for Popoyo 🙌", when: "9 months ago", whenEs: "hace 9 meses" },
];

const AVATAR_COLORS = [
  "#0b6b80", "#ff5a3c", "#1a8c52", "#7c3aed",
  "#d97706", "#0ea5e9", "#be123c", "#475569",
];

function colorFor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

function initials(name) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function starsSvg() {
  const star = '<svg width="13" height="13" viewBox="0 0 24 24" fill="#ff5a3c" aria-hidden="true">' +
    '<path d="M12 2.5l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17.6 5.9 21l1.5-6.8L2.2 9.5l6.9-.7L12 2.5z"/>' +
    '</svg>';
  return star.repeat(5);
}

function reviewCardHtml(r) {
  const c = colorFor(r.name);
  const when = LANG === "es" ? r.whenEs : r.when;
  return (
    '<article class="review-card">' +
      '<div class="review-head">' +
        '<div class="review-who">' +
          '<div class="review-avatar" style="background:' + c + '">' + escapeHtml(initials(r.name)) + '</div>' +
          '<div>' +
            '<div class="review-name">' + escapeHtml(r.name) + '</div>' +
            '<div class="review-when">' + escapeHtml(when) + '</div>' +
          '</div>' +
        '</div>' +
        '<div style="display:inline-flex;gap:1px;">' + starsSvg() + '</div>' +
      '</div>' +
      '<p class="review-text">' + escapeHtml(r.text) + '</p>' +
      '<div class="review-source-tag">' + escapeHtml(t("reviews.via")) + '</div>' +
    '</article>'
  );
}

function renderReviews() {
  const row = document.getElementById("reviewRow");
  if (!row) return;
  row.innerHTML = REVIEWS.map(reviewCardHtml).join("");
}

/* ================== Wire-up ================== */

document.addEventListener("DOMContentLoaded", () => {
  applyI18n();
  const toggle = document.getElementById("langToggle");
  if (toggle) toggle.addEventListener("click", toggleLang);
});
