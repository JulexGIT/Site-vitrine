const topbar = document.querySelector('.topbar');
const navToggle = document.querySelector('.nav-toggle');
const pageTransition = document.querySelector('.page-transition');

if (navToggle && topbar) {
  navToggle.addEventListener('click', () => topbar.classList.toggle('open'));
}

document.querySelectorAll('a[href$=".html"], .brand').forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http')) return;
    event.preventDefault();
    document.body.classList.add('is-loading');
    setTimeout(() => (window.location.href = href), 520);
  });
});

window.addEventListener('pageshow', () => {
  document.body.classList.remove('is-loading');
  if (pageTransition) pageTransition.style.transform = 'translateY(100%)';
});

const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('.reveal-on-scroll').forEach((el) => revealObserver.observe(el));

document.querySelectorAll('.counter').forEach((counter) => {
  const target = Number(counter.dataset.target || 0);
  const run = () => {
    const start = performance.now();
    const duration = 1300;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      counter.textContent = Math.round(target * e);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const obs = new IntersectionObserver((entries, o) => {
    if (entries[0].isIntersecting) {
      run();
      o.disconnect();
    }
  }, { threshold: 0.55 });
  obs.observe(counter);
});

const depthItems = document.querySelectorAll('[data-depth]');
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / innerWidth - .5) * 2;
  const y = (e.clientY / innerHeight - .5) * 2;
  depthItems.forEach((item) => {
    const d = Number(item.dataset.depth || 0);
    item.style.transform = `translate3d(${x * d * .45}px, ${y * d * .32}px, 0)`;
  });
});

const filters = document.querySelectorAll('[data-filter]');
if (filters.length) {
  const items = document.querySelectorAll('.portfolio-item');
  filters.forEach((button) => {
    button.addEventListener('click', () => {
      filters.forEach((b) => b.classList.remove('active'));
      button.classList.add('active');
      const key = button.dataset.filter;
      items.forEach((item) => {
        const match = key === 'all' || item.dataset.category.includes(key);
        item.classList.toggle('hide', !match);
      });
    });
  });
}
