(() => {
  const pages = [...document.querySelectorAll('.sheet')];
  const nav = [...document.querySelectorAll('nav [data-project]')];
  document.documentElement.classList.add('js');
  document.querySelectorAll('video').forEach(video => {
    video.closest('figure').style.setProperty('--poster', `url("${video.getAttribute('poster')}")`);
  });
  let pending = false;
  function updateActiveProject() {
    pending = false;
    const readingLine = Math.min(window.innerHeight * 0.3, 250);
    const active = pages.filter(page => page.getBoundingClientRect().top <= readingLine).at(-1) || pages[0];
    nav.forEach(a => {
      if (a.dataset.project === active.dataset.project) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
    const activeLink = nav.find(a => a.dataset.project === active.dataset.project);
    document.querySelector('.current-label').textContent = active.dataset.project === 'warehouse'
      ? '진행 중인 프로젝트 · LOGITLE' : activeLink.querySelector('small').textContent;
  }
  function scheduleUpdate() {
    if (!pending) { pending = true; requestAnimationFrame(updateActiveProject); }
  }
  document.querySelector('#print').addEventListener('click', () => window.print());
  window.addEventListener('scroll', scheduleUpdate, {passive: true});
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('hashchange', scheduleUpdate);
  updateActiveProject();
})();
