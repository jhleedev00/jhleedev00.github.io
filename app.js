document.addEventListener("DOMContentLoaded", () => {
  // Print handler
  const printBtn = document.getElementById("print");
  if (printBtn) {
    printBtn.addEventListener("click", () => window.print());
  }

  // Match the menu to the visible anchor, including sections nested in the profile.
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const targets = navLinks.map(link => ({
    link,
    target: document.querySelector(link.getAttribute("href"))
  })).filter(item => item.target);
  let navigationFrame = 0;
  const updateNavigation = () => {
    navigationFrame = 0;
    const threshold = (document.querySelector(".navbar")?.getBoundingClientRect().height || 0) + 24;
    let active = targets[0];
    let closestTop = -Infinity;
    targets.forEach(item => {
      const top = item.target.getBoundingClientRect().top;
      if (top <= threshold && top >= closestTop) {
        active = item;
        closestTop = top;
      }
    });
    navLinks.forEach(link => {
      const selected = link === active?.link;
      link.classList.toggle("active", selected);
      if (selected) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };
  const scheduleNavigation = () => {
    if (!navigationFrame) navigationFrame = requestAnimationFrame(updateNavigation);
  };
  window.addEventListener("scroll", scheduleNavigation, { passive: true });
  window.addEventListener("resize", scheduleNavigation);
  window.addEventListener("load", scheduleNavigation);
  updateNavigation();

  // Video poster click to play
  document.querySelectorAll("video").forEach((video) => {
    video.addEventListener("play", () => {
      document.querySelectorAll("video").forEach((otherVideo) => {
        if (otherVideo !== video && !otherVideo.paused) {
          otherVideo.pause();
        }
      });
    });
  });
});
