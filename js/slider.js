/* =============================================
   ABOUT PHOTO SLIDER
   ─────────────────────────────────────────────
   Features:
     • Slide transition (translateX) with CSS ease
     • Prev / Next arrow buttons
     • Clickable dot indicators
     • Auto-advance every 4 seconds (pauses on hover)
     • Keyboard arrow key support
     • Touch / swipe support on mobile
   ─────────────────────────────────────────────
   To customise:
     • Change AUTOPLAY_DELAY (ms) below
     • Add/remove <div class="slide"> blocks in HTML
     • Swap image src paths in the HTML
   ============================================= */

(function () {
  /* ── Config ──────────────────────────────── */
  var AUTOPLAY_DELAY = 4000;   // ms between auto-advances (0 = off)

  /* ── DOM refs ────────────────────────────── */
  var slider    = document.getElementById('aboutSlider');
  var track     = document.getElementById('sliderTrack');
  var prevBtn   = document.getElementById('sliderPrev');
  var nextBtn   = document.getElementById('sliderNext');
  var dotsWrap  = document.getElementById('sliderDots');

  /* Bail out gracefully if elements are missing */
  if (!slider || !track || !prevBtn || !nextBtn || !dotsWrap) return;

  var slides    = track.querySelectorAll('.slide');
  var total     = slides.length;
  var current   = 0;
  var autoTimer = null;

  if (total === 0) return;

  /* ── Build dot indicators ────────────────── */
  var dots = [];
  for (var i = 0; i < total; i++) {
    var dot = document.createElement('button');
    dot.className   = 'slider-dot';
    dot.setAttribute('aria-label', 'Go to photo ' + (i + 1));
    dot.dataset.idx = i;
    dotsWrap.appendChild(dot);
    dots.push(dot);
  }

  /* ── Core: go to slide n ─────────────────── */
  function goTo(n) {
    /* Wrap around at both ends */
    if (n < 0)      n = total - 1;
    if (n >= total) n = 0;

    /* Remove active state from old slide and dot */
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');

    current = n;

    /* Slide the track */
    track.style.transform = 'translateX(-' + current * 100 + '%)';

    /* Apply active state to new slide and dot */
    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');

    /* Update ARIA for screen readers */
    slider.setAttribute('aria-label',
      'Photo ' + (current + 1) + ' of ' + total);
  }

  /* ── Auto-advance ────────────────────────── */
  function startAuto() {
    if (!AUTOPLAY_DELAY) return;
    stopAuto();
    autoTimer = setInterval(function () { goTo(current + 1); }, AUTOPLAY_DELAY);
  }

  function stopAuto() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
  }

  /* Pause on hover, resume on leave */
  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);

  /* ── Arrow buttons ───────────────────────── */
  prevBtn.addEventListener('click', function () {
    goTo(current - 1);
    stopAuto(); startAuto();   /* reset timer on manual nav */
  });

  nextBtn.addEventListener('click', function () {
    goTo(current + 1);
    stopAuto(); startAuto();
  });

  /* ── Dot clicks ──────────────────────────── */
  dotsWrap.addEventListener('click', function (e) {
    var dot = e.target.closest('.slider-dot');
    if (!dot) return;
    goTo(parseInt(dot.dataset.idx, 10));
    stopAuto(); startAuto();
  });

  /* ── Keyboard support ────────────────────── */
  slider.setAttribute('tabindex', '0');
  slider.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft')  { goTo(current - 1); stopAuto(); startAuto(); }
    if (e.key === 'ArrowRight') { goTo(current + 1); stopAuto(); startAuto(); }
  });

  /* ── Touch / swipe support ───────────────── */
  var touchStartX = 0;
  var touchStartY = 0;

  slider.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
  }, { passive: true });

  slider.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - touchStartX;
    var dy = e.changedTouches[0].clientY - touchStartY;

    /* Only register horizontal swipes (ignore scroll) */
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) goTo(current + 1);   /* swipe left  → next */
      else        goTo(current - 1);   /* swipe right → prev */
      stopAuto(); startAuto();
    }
  }, { passive: true });

  /* ── Init ────────────────────────────────── */
  goTo(0);       /* show first slide, activate first dot */
  startAuto();   /* begin auto-advance */

})();
