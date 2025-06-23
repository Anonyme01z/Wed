const NAV_LINKS = [
  { id: 'hero-slider', label: 'Home' },
  { id: 'couple', label: 'The Couple' },
  { id: 'story', label: 'Our Story' },
  { id: 'events', label: 'Events' },
  { id: 'gallery', label: 'Gallery' }
];

const SOCIALS = [
  { href: 'https://instagram.com/', icon: 'fab fa-instagram', label: 'Instagram' },
  { href: 'https://facebook.com/', icon: 'fab fa-facebook', label: 'Facebook' }
];

export function initNavbar() {
  const navRoot = document.getElementById('navbar');
  if (!navRoot) return;
  navRoot.innerHTML = `
    <div class="nav-brand">E & I</div>
    <button class="nav-toggle" aria-label="Toggle menu"><span></span><span></span><span></span></button>
    <div class="nav-links">
      ${NAV_LINKS.map(link => `<a href="#${link.id}" data-scroll="${link.id}">${link.label}</a>`).join('')}
    </div>
    <div class="nav-socials">
      ${SOCIALS.map(s => `<a href="${s.href}" target="_blank" aria-label="${s.label}"><i class="${s.icon}"></i></a>`).join('')}
    </div>
  `;

  // Hamburger menu toggle
  const navToggle = navRoot.querySelector('.nav-toggle');
  const navLinks = navRoot.querySelector('.nav-links');
  navToggle.onclick = () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('open');
  };

  // Close menu on link click (mobile)
  navLinks.querySelectorAll('a[data-scroll]').forEach(link => {
    link.onclick = function(e) {
      e.preventDefault();
      const target = document.getElementById(this.dataset.scroll);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
    };
  });

  // Highlight active link on scroll
  window.addEventListener('scroll', () => {
    let current = '';
    NAV_LINKS.forEach(link => {
      const section = document.getElementById(link.id);
      if (section && window.scrollY >= section.offsetTop - 80) {
        current = link.id;
      }
    });
    navRoot.querySelectorAll('a[data-scroll]').forEach(link => {
      link.classList.toggle('active', link.dataset.scroll === current);
    });
  });
}
