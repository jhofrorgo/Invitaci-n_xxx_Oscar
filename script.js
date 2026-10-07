/* =========================================================
   INVITACIÓN OSCAR ANDRÉS · 30 AÑOS
   JavaScript de Animaciones y Efectos Mágicos
   ========================================================= */

const EVENT_DATE = new Date("2026-10-10T19:00:00-05:00").getTime();
const WHATSAPP_PHONE = "573183624235";

document.documentElement.classList.add("js");

function startAnimations() {
  initMagicParticles();
  initMagicSparks();
  initSectionSparkles();
  initRandomSparkleBursts();
  initVideo();
  initCountdown();
  initRevealAnimations();
  initGallery();
  initRsvp();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startAnimations);
} else {
  startAnimations();
}

/* ---------- PARTÍCULAS DORADAS FLOTANTES ---------- */
function initMagicParticles() {
  let container = document.querySelector(".magic-particles");
  if (!container) {
    container = document.createElement("div");
    container.className = "magic-particles";
    document.body.prepend(container);
  }

  container.innerHTML = "";
  const count = window.innerWidth < 720 ? 25 : 40;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("span");
    particle.className = "magic-particle";
    particle.style.setProperty("--size", `${(Math.random() * 2 + 1.5).toFixed(1)}px`);
    particle.style.setProperty("--left", `${(Math.random() * 100).toFixed(1)}%`);
    particle.style.setProperty("--top", `${(Math.random() * 100).toFixed(1)}%`);
    particle.style.setProperty("--duration", `${(Math.random() * 4 + 4).toFixed(1)}s`);
    particle.style.setProperty("--delay", `${(-Math.random() * 6).toFixed(1)}s`);
    particle.style.setProperty("--drift", `${(Math.random() * 30 - 15).toFixed(1)}px`);
    container.appendChild(particle);
  }
}

/* ---------- DESTELLOS TIPO ESTRELLA (CRUZ) ---------- */
function initMagicSparks() {
  const container = document.querySelector(".magic-particles");
  if (!container) return;

  const count = window.innerWidth < 720 ? 12 : 20;

  for (let i = 0; i < count; i++) {
    const spark = document.createElement("span");
    spark.className = "magic-spark";
    spark.style.setProperty("--spark-size", `${(Math.random() * 3 + 3).toFixed(1)}px`);
    spark.style.setProperty("--spark-left", `${(Math.random() * 94 + 3).toFixed(1)}%`);
    spark.style.setProperty("--spark-top", `${(Math.random() * 92 + 4).toFixed(1)}%`);
    spark.style.setProperty("--spark-duration", `${(Math.random() * 3 + 3.5).toFixed(1)}s`);
    spark.style.setProperty("--spark-delay", `${(-Math.random() * 6).toFixed(1)}s`);
    container.appendChild(spark);
  }
}

/* ---------- DESTELLOS EN SECCIONES ---------- */
function initSectionSparkles() {
  const sections = document.querySelectorAll("section, header");

  sections.forEach((section) => {
    if (section.querySelector(".sparkle-light")) return;
    const amount = 2;
    for (let i = 0; i < amount; i++) {
      const sparkle = document.createElement("span");
      sparkle.className = "sparkle-light";
      sparkle.style.left = `${15 + Math.random() * 70}%`;
      sparkle.style.top = `${20 + Math.random() * 60}%`;
      sparkle.style.setProperty("--blink", `${(3.5 + Math.random() * 3).toFixed(1)}s`);
      sparkle.style.setProperty("--delay", `${(-Math.random() * 4).toFixed(1)}s`);
      section.appendChild(sparkle);
    }
  });
}

/* ---------- FLASH OCASIONAL EXTRA ---------- */
function initRandomSparkleBursts() {
  const container = document.querySelector(".magic-particles");
  if (!container) return;

  setInterval(() => {
    if (document.hidden) return;
    const burst = document.createElement("span");
    burst.className = "magic-spark magic-spark-burst";
    burst.style.setProperty("--spark-size", `${(Math.random() * 4 + 4).toFixed(1)}px`);
    burst.style.left = `${10 + Math.random() * 80}%`;
    burst.style.top = `${10 + Math.random() * 80}%`;
    burst.style.setProperty("--burst-duration", "1.5s");
    container.appendChild(burst);

    setTimeout(() => burst.remove(), 1600);
  }, 3000);
}

/* ---------- VIDEO ---------- */
function initVideo() {
  const video = document.getElementById("invitacionVideo");
  const playButton = document.getElementById("videoPlayBtn");

  if (!video || !playButton) return;

  playButton.addEventListener("click", async () => {
    video.muted = false;
    try {
      await video.play();
      playButton.classList.add("hidden");
    } catch (e) {
      video.muted = true;
      await video.play();
      playButton.classList.add("hidden");
    }
  });
}

/* ---------- CUENTA REGRESIVA ---------- */
function initCountdown() {
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function update() {
    const diff = EVENT_DATE - Date.now();
    if (diff <= 0) return;

    daysEl.textContent = String(Math.floor(diff / 86400000)).padStart(2, "0");
    hoursEl.textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, "0");
    minutesEl.textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
    secondsEl.textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}

/* ---------- ANIMACIONES DE ENTRADA ---------- */
function initRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  elements.forEach((el) => observer.observe(el));
}

/* ---------- GALERÍA / LIGHTBOX ---------- */
function initGallery() {
  const visibleImages = Array.from(document.querySelectorAll(".gallery img"));
  const hiddenImages = Array.from(document.querySelectorAll(".hidden-gallery img"));
  const allImages = [...visibleImages, ...hiddenImages];

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-img");
  const closeButton = document.querySelector(".lightbox-close");
  const previousButton = document.querySelector(".lightbox-prev");
  const nextButton = document.querySelector(".lightbox-next");
  const openGalleryButton = document.getElementById("openGalleryBtn");

  if (!lightbox || !lightboxImage || !allImages.length) return;

  let currentIndex = 0;

  function showImage(index) {
    currentIndex = (index + allImages.length) % allImages.length;
    lightboxImage.src = allImages[currentIndex].src;
    lightboxImage.alt = allImages[currentIndex].alt;
  }

  function openLightbox(index) {
    showImage(index);
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  visibleImages.forEach((image, index) => {
    image.addEventListener("click", () => openLightbox(index));
  });

  openGalleryButton?.addEventListener("click", () => openLightbox(0));
  closeButton?.addEventListener("click", closeLightbox);
  previousButton?.addEventListener("click", () => showImage(currentIndex - 1));
  nextButton?.addEventListener("click", () => showImage(currentIndex + 1));
}

/* ---------- RSVP ---------- */
function initRsvp() {
  const modal = document.getElementById("rsvpModal");
  const openBtn = document.getElementById("openRsvp");
  const closeBtn = document.getElementById("closeRsvp");
  const form = document.getElementById("rsvpForm");

  if (!modal || !openBtn) return;

  openBtn.addEventListener("click", () => modal.classList.add("show"));
  closeBtn?.addEventListener("click", () => modal.classList.remove("show"));

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("guestName")?.value || "";
    const attendance = document.getElementById("attendance")?.value || "";
    const guests = document.getElementById("guests")?.value || "1";
    const message = document.getElementById("message")?.value || "";

    const text = `✨ *Confirmación Oscar Andrés* ✨\n\n*Nombre:* ${name}\n*Asistencia:* ${attendance}\n*Personas:* ${guests}\n${message ? `*Mensaje:* ${message}` : ""}`;
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`, "_blank");
  });
}