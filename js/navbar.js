/* =============================================
   NAVBAR — glass effect on scroll + active link
   ============================================= */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links > li > a:not(.nav-cta)');
const sections = document.querySelectorAll('section[id]');

if (navbar) {
  window.addEventListener('scroll', () => {
    // Glass background once scrolled past 20px
    navbar.classList.toggle('scrolled', window.scrollY > 20);

    // Highlight nav link for the current visible section
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 130) current = sec.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  });
}

/* =============================================
   HAMBURGER + MOBILE MENU
   ============================================= */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function closeMobile() {
  if (!hamburger || !mobileMenu) return;
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow =
      mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close when any mobile link is tapped
  document.querySelectorAll('.mobile-link')
    .forEach(l => l.addEventListener('click', closeMobile));

  // Close when tapping outside the menu items (on the dark overlay)
  mobileMenu.addEventListener('click', e => {
    if (e.target === mobileMenu) closeMobile();
  });
}
