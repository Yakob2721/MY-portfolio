/* =============================================
   LIGHTBOX — open images/videos in a full-screen
   popup when a project media card is clicked
   ============================================= */
const lightbox      = document.getElementById('lightbox');
const lightboxMedia = document.getElementById('lightboxMedia');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(type, src) {
  lightboxMedia.innerHTML = ''; // clear previous content

  if (type === 'image') {
    // Show a full-size image
    const img = document.createElement('img');
    img.src = src; img.alt = 'Project preview';
    lightboxMedia.appendChild(img);

  } else if (type === 'youtube') {
    // Embed YouTube with autoplay
    const iframe = document.createElement('iframe');
    iframe.src = src + '?autoplay=1&rel=0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.frameBorder = '0';
    lightboxMedia.appendChild(iframe);

  } else if (type === 'video') {
    // Native HTML5 video player
    const video = document.createElement('video');
    video.src = src; video.controls = true; video.autoplay = true;
    video.style.background = '#000';
    lightboxMedia.appendChild(video);
  }

  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightboxMedia.innerHTML = ''; // stops audio/video playback
  document.body.style.overflow = '';
}

// Open on project media click
document.querySelectorAll('.project-media').forEach(m => {
  m.addEventListener('click', () => openLightbox(m.dataset.type, m.dataset.src));
});

// Close ways: button, backdrop click, Escape key
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
