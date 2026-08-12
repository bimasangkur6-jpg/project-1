const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

class MobileNav {
  constructor() {
    this.toggle = document.getElementById("navToggle");
    this.links = document.getElementById("navLinks");
    if (!this.toggle || !this.links) return;

    this.toggle.addEventListener("click", () => this.set(!this.links.classList.contains("open")));
    this.links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => this.set(false)));
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") this.set(false);
    });
  }

  set(open) {
    this.links.classList.toggle("open", open);
    this.toggle.setAttribute("aria-expanded", String(open));
  }
}

class ScrollReveal {
  constructor() {
    this.items = document.querySelectorAll(".reveal");
    if (!this.items.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      this.items.forEach(el => el.classList.add("visible"));
      return;
    }

    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    this.items.forEach(el => this.observer.observe(el));
  }
}

class StatCounters {
  constructor() {
    this.section = document.getElementById("stats");
    this.numbers = document.querySelectorAll(".stat-number");
    if (!this.section || !this.numbers.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      this.numbers.forEach(el => this.setFinal(el));
      return;
    }

    this.done = false;
    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.done) {
            this.done = true;
            this.numbers.forEach(el => this.animate(el));
            this.observer.unobserve(this.section);
          }
        });
      },
      { threshold: 0.4 }
    );

    this.observer.observe(this.section);
  }

  setFinal(el) {
    el.textContent = el.dataset.target + (el.dataset.suffix || "");
  }

  animate(el) {
    const target = Number(el.dataset.target);
    const suffix = el.dataset.suffix || "";
    const duration = 1400;
    const start = performance.now();

    const step = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }
}

class FaqAccordion {
  constructor() {
    this.items = document.querySelectorAll(".faq-item");
    this.items.forEach(item => {
      const question = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");
      question.addEventListener("click", () => this.toggle(question, answer));
    });
  }

  toggle(question, answer) {
    const isOpen = question.getAttribute("aria-expanded") === "true";

    this.items.forEach(item => {
      const q = item.querySelector(".faq-question");
      const a = item.querySelector(".faq-answer");
      q.setAttribute("aria-expanded", "false");
      a.style.maxHeight = null;
    });

    if (!isOpen) {
      question.setAttribute("aria-expanded", "true");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  }
}

class NavScrollState {
  constructor() {
    this.nav = document.querySelector(".nav-wrap");
    if (!this.nav) return;
    window.addEventListener("scroll", () => this.update(), { passive: true });
    this.update();
  }

  update() {
    this.nav.classList.toggle("scrolled", window.scrollY > 10);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new MobileNav();
  new ScrollReveal();
  new StatCounters();
  new FaqAccordion();
  new NavScrollState();

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
