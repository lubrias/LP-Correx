const revealElements = document.querySelectorAll('.reveal');
const statNumbers = document.querySelectorAll('.stat-number');

const revealObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				revealObserver.unobserve(entry.target);
			}
		});
	},
	{ threshold: 0.2 }
);

revealElements.forEach((el) => revealObserver.observe(el));

const animateStat = (element) => {
	const target = Number(element.dataset.target || 0);
	const duration = 1300;
	const start = performance.now();

	const tick = (time) => {
		const elapsed = Math.min((time - start) / duration, 1);
		const eased = 1 - Math.pow(1 - elapsed, 3);
		const current = Math.round(target * eased);
		element.textContent = String(current);

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
	{ threshold: 0.5 }
);

statNumbers.forEach((item) => statsObserver.observe(item));
