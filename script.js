/* =========================================================
   INVITACIÓN OSCAR ANDRÉS · 30 AÑOS
   JavaScript principal
   ========================================================= */

const EVENT_DATE = new Date("2026-10-10T19:00:00-05:00").getTime();
const WHATSAPP_PHONE = "573183624235";

document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {

  initVideo();
  initCountdown();
  initRevealAnimations();
  initGallery();
  initRsvp();
});

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
    } catch (error) {
      console.warn("No fue posible iniciar el video con sonido.", error);
      video.muted = true;
      await video.play();
      playButton.classList.add("hidden");
    }
  });

  video.addEventListener("play", () => {
    playButton.classList.add("hidden");
  });

  video.addEventListener("ended", () => {
    playButton.classList.remove("hidden");
  });
}

/* ---------- CUENTA REGRESIVA ---------- */

function initCountdown() {
  const elements = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds")
  };

  if (Object.values(elements).some((element) => !element)) return;

  function updateCountdown() {
    const difference = EVENT_DATE - Date.now();

    if (difference <= 0) {
      elements.days.textContent = "00";
      elements.hours.textContent = "00";
      elements.minutes.textContent = "00";
      elements.seconds.textContent = "00";
      return;
    }

    const days = Math.floor(difference / 86400000);
    const hours = Math.floor((difference % 86400000) / 3600000);
    const minutes = Math.floor((difference % 3600000) / 60000);
    const seconds = Math.floor((difference % 60000) / 1000);

    elements.days.textContent = String(days).padStart(2, "0");
    elements.hours.textContent = String(hours).padStart(2, "0");
    elements.minutes.textContent = String(minutes).padStart(2, "0");
    elements.seconds.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
}

/* ---------- ANIMACIONES DE ENTRADA ---------- */

function initRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");

  if (!elements.length) return;

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((element) => observer.observe(element));
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

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("active")) return;

    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showImage(currentIndex - 1);
    if (event.key === "ArrowRight") showImage(currentIndex + 1);
  });
}

/* ---------- CONFIRMACIÓN POR WHATSAPP ---------- */

function initRsvp() {
  const modal = document.getElementById("rsvpModal");
  const openButton = document.getElementById("openRsvp");
  const closeButton = document.getElementById("closeRsvp");
  const form = document.getElementById("rsvpForm");

  if (!modal || !openButton || !closeButton || !form) return;

  function openModal() {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.getElementById("guestName")?.focus();
  }

  function closeModal() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  }

  openButton.addEventListener("click", openModal);
  closeButton.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("guestName").value.trim();
    const attendance = document.getElementById("attendance").value;
    const guests = document.getElementById("guests").value;
    const message = document.getElementById("message").value.trim();

    const whatsappMessage = [
      "✨ *Confirmación de asistencia · Oscar Andrés* ✨",
      "",
      `*Nombre:* ${name}`,
      `*Asistencia:* ${attendance}`,
      `*Número de personas:* ${guests}`,
      message ? `*Mensaje:* ${message}` : ""
    ].filter(Boolean).join("\n");

    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });

}
