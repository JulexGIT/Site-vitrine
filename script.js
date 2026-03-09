const revealElements = document.querySelectorAll('.reveal-on-scroll');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
);

revealElements.forEach((el) => revealObserver.observe(el));

const counters = document.querySelectorAll('.counter');

const animateCounter = (counter) => {
  const target = Number(counter.dataset.target);
  const duration = 1500;
  const start = performance.now();

  const tick = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    counter.textContent = Math.round(target * eased).toString();

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => counterObserver.observe(counter));

const parallaxItems = document.querySelectorAll('[data-depth]');

window.addEventListener('mousemove', (event) => {
  const x = (event.clientX / window.innerWidth - 0.5) * 2;
  const y = (event.clientY / window.innerHeight - 0.5) * 2;

  parallaxItems.forEach((item) => {
    const depth = Number(item.dataset.depth || 0);
    item.style.transform = `translate3d(${x * depth * 0.4}px, ${y * depth * 0.35}px, 0)`;
  });
});

window.addEventListener(
  'scroll',
  () => {
    const offset = window.scrollY * 0.08;
    document.querySelector('.aurora-a').style.transform = `translateY(${offset}px)`;
    document.querySelector('.aurora-b').style.transform = `translateY(${-offset * 0.7}px)`;
  },
  { passive: true }
);
