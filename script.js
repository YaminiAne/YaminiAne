const addStyle = (href) => {
  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = href;
  document.head.appendChild(style);
};

addStyle('refinement.css');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#site-nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));
document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
const page = document.body.dataset.page;
const extraStyles = { about: 'story.css', projects: 'health-focus.css' };
if (extraStyles[page]) addStyle(extraStyles[page]);
document.querySelectorAll('[data-nav]').forEach((link) => {
  if (link.getAttribute('href') === 'work.html') link.textContent = 'Work';
  if (link.getAttribute('href') === 'projects.html') link.textContent = 'Projects';
  if (link.getAttribute('href') === 'blog.html') link.textContent = 'Blog';
  if (link.dataset.nav === page) {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  }
});
const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.12 });
  items.forEach((item) => observer.observe(item));
} else {
  items.forEach((item) => item.classList.add('visible'));
}
