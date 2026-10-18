/* =============================================
   TYPEWRITER — cycles through role titles
   REPLACE: edit the roles[] array with your own
   ============================================= */
const roles = [
  'Software Developer.',
  'Network Engineer.',
  'Video Editor.',
  'UI/UX Designer.',
  'Creative Technologist.'
];

const tw = document.getElementById('typewriter');
let roleIdx = 0, charIdx = 0, deleting = false;

function type() {
  const current = roles[roleIdx];
  tw.textContent = deleting
    ? current.substring(0, charIdx--)
    : current.substring(0, charIdx++);

  let delay = deleting ? 60 : 100;

  if (!deleting && charIdx === current.length + 1) {
    delay    = 1800;   // pause at end of word
    deleting = true;
  } else if (deleting && charIdx === 0) {
    deleting = false;
    roleIdx  = (roleIdx + 1) % roles.length;
    delay    = 400;    // pause before next word
  }

  setTimeout(type, delay);
}

type();
