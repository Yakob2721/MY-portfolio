/* =============================================
   CONTACT FORM — validation + submit handler
   Replace the setTimeout block with EmailJS or
   Formspree to actually send emails.
   ============================================= */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm && formSuccess) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const name    = document.getElementById('fname').value.trim();
    const email   = document.getElementById('femail').value.trim();
    const message = document.getElementById('fmessage').value.trim();

    // Flash required empty fields red for 2 s
    if (!name || !email || !message) {
      ['fname', 'femail', 'fmessage'].forEach(id => {
        const el = document.getElementById(id);
        if (el && !el.value.trim()) {
          el.style.borderColor = '#ff4d6d';
          setTimeout(() => { el.style.borderColor = ''; }, 2000);
        }
      });
      return;
    }

    // Show spinner on the button
    const btn = contactForm.querySelector('.form-submit');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';
    }

    // ── REPLACE this block with your real send logic ──
    setTimeout(() => {
      contactForm.style.display = 'none';
      formSuccess.style.display = 'block';
    }, 1500);
    // ──────────────────────────────────────────────────
  });
}

/* =============================================
   FOOTER — dynamic year
   ============================================= */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* =============================================
   BACK TO TOP — called from onclick in HTML
   ============================================= */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
