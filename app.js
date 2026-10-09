document.addEventListener("DOMContentLoaded", () => {
  // Prefer full-resolution posters; unavailable YouTube sizes can return a
  // successful response containing only a tiny placeholder image.
  const thumbnailReady = [...document.querySelectorAll(".youtube-print-card img")].map(img => {
    const videoId = img.src.match(/\/vi\/([^/]+)\//)?.[1];
    if (!videoId) return Promise.resolve();
    return new Promise(resolve => {
      const sizes = ["maxresdefault", "sddefault", "hqdefault"];
      let index = 0;
      const finish = () => {
        img.removeEventListener("load", loaded);
        img.removeEventListener("error", failed);
        resolve();
      };
      const next = () => {
        img.src = `https://img.youtube.com/vi/${videoId}/${sizes[index]}.jpg`;
      };
      const failed = () => {
        if (++index < sizes.length) next();
        else finish();
      };
      const loaded = () => {
        if (img.naturalWidth <= 120) failed();
        else finish();
      };
      img.addEventListener("load", loaded);
      img.addEventListener("error", failed);
      next();
    });
  });

  // Avoid opening print preview while the higher-resolution posters are loading.
  const printBtn = document.getElementById("print");
  if (printBtn) {
    printBtn.addEventListener("click", async () => {
      if (printBtn.disabled) return;
      printBtn.disabled = true;
      let timeout;
      try {
        await Promise.race([
          Promise.all(thumbnailReady),
          new Promise(resolve => { timeout = setTimeout(resolve, 8000); })
        ]);
        window.print();
      } finally {
        clearTimeout(timeout);
        printBtn.disabled = false;
      }
    });
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
