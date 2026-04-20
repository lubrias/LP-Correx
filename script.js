
// --- Reveal on scroll ----------------------------------------------------
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
  { threshold: 0.15 }
);

revealElements.forEach((el) => revealObserver.observe(el));

// --- Contador de estatísticas -------------------------------------------
const statNumbers = document.querySelectorAll('.stat-number');

const animateStat = (element) => {
  const target = Number(element.dataset.target || 0);
  const suffix = element.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();

  const tick = (time) => {
    const elapsed = Math.min((time - start) / duration, 1);
    const eased = 1 - Math.pow(1 - elapsed, 3);
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

// --- Toggle de tema (dark / light) --------------------------------------
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
  } catch (e) {}
};

// Inicializa com o tema salvo
setTheme(getTheme());

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
}