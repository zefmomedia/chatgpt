const nav = document.querySelector('.nav');
const toggle = document.querySelector('.menu-toggle');

// Border under nav once the page scrolls
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });

// Mobile menu
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', false);
  });
});

// Fade elements in as they enter the viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Contact form: opens the visitor's email client with the message filled in
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const subject = encodeURIComponent(`New project inquiry from ${form.name.value}`);
  const body = encodeURIComponent(`${form.message.value}\n\n— ${form.name.value} (${form.email.value})`);
  window.location.href = `mailto:creative@zefmo.com?subject=${subject}&body=${body}`;
  form.querySelector('.form-note').textContent = 'Thanks! Your email app should open to send the message.';
});

document.getElementById('year').textContent = new Date().getFullYear();
