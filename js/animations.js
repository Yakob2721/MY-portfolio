/* =============================================
   SCROLL REVEAL
   Fades in .fade-in-up elements as they enter
   the viewport. Also triggers skill bar fills.
   ============================================= */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add('visible');

    // Animate any skill progress bars inside this element
    entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
      bar.style.width = (bar.dataset.width || 0) + '%';
    });

    // Once revealed, stop observing — no need to re-trigger
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12 });

// Observe every fade-in-up element
document.querySelectorAll('.fade-in-up').forEach(el => revealObserver.observe(el));
