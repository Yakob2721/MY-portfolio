/* =============================================
   SKILLS TABS — switch between skill categories
   ============================================= */
document.querySelectorAll('.skills-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    // Deactivate all tabs + panels
    document.querySelectorAll('.skills-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.skills-panel').forEach(p => p.classList.remove('active'));

    // Activate clicked tab + matching panel
    tab.classList.add('active');
    const panel = document.getElementById('tab-' + tab.dataset.tab);
    panel.classList.add('active');

    // Re-run bar animation for the newly visible panel
    panel.querySelectorAll('.skill-bar-fill').forEach(bar => {
      bar.style.width = '0%';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        bar.style.width = bar.dataset.width + '%';
      }));
    });
  });
});
