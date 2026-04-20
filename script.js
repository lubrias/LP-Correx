
// ─── Reveal on scroll ──────────────────────────────────────────────
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((el) => revealObserver.observe(el));

// ─── Contador animado de estatísticas ─────────────────────────────
const statNumbers = document.querySelectorAll('.stat-number');

const animateStat = (element) => {
  const target = Number(element.dataset.target || 0);
  const suffix = element.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();

  const tick = (time) => {
    const elapsed = Math.min((time - start) / duration, 1);
    const eased = 1 - Math.pow(1 - elapsed, 3); // easeOutCubic
    const current = Math.round(target * eased);
    element.textContent = String(current) + suffix;

    if (elapsed < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateStat(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

statNumbers.forEach((item) => statsObserver.observe(item));

// ─── Toggle de tema (dark / light) ─────────────────────────────────
const themeToggle = document.getElementById('theme-toggle');
const STORAGE_KEY = 'correx-landing-theme';

const getTheme = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) || 'dark';
  } catch (e) {
    return 'dark';
  }
};

const setTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (e) {
    /* storage indisponível, ignora */
  }
};

// Inicializa com o tema salvo (já feito inline no <head>, mas reforça aqui)
setTheme(getTheme());

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
}

// ─── Scroll spy no menu (destaca a seção ativa) ────────────────────
const menuLinks = document.querySelectorAll('.menu a');
const sections = Array.from(menuLinks)
  .map((link) => {
    const id = link.getAttribute('href');
    return id && id.startsWith('#') ? document.querySelector(id) : null;
  })
  .filter(Boolean);

if (sections.length) {
  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = '#' + entry.target.id;
          menuLinks.forEach((link) => {
            if (link.getAttribute('href') === id) {
              link.style.color = 'var(--text-primary)';
              link.style.background = 'var(--bg-hover)';
            } else {
              link.style.color = '';
              link.style.background = '';
            }
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((section) => spyObserver.observe(section));
}
