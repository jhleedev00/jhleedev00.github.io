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

  const projectToggle = document.querySelector('[aria-controls="project-jump-menu"]');
  const projectMenu = document.getElementById("project-jump-menu");
  const positionProjectMenu = () => {
    const rect = projectToggle.getBoundingClientRect();
    const width = Math.min(300, window.innerWidth - 24);
    projectMenu.style.width = `${width}px`;
    projectMenu.style.left = `${Math.max(12, Math.min(rect.left, window.innerWidth - width - 12))}px`;
    projectMenu.style.top = `${rect.bottom + 8}px`;
  };
  const closeProjectMenu = () => {
    projectMenu.hidden = true;
    projectToggle.setAttribute("aria-expanded", "false");
  };
  projectToggle.addEventListener("click", () => {
    const opening = projectMenu.hidden;
    projectMenu.hidden = !opening;
    projectToggle.setAttribute("aria-expanded", String(opening));
    if (opening) positionProjectMenu();
  });
  projectToggle.addEventListener("keydown", event => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      projectMenu.hidden = false;
      projectToggle.setAttribute("aria-expanded", "true");
      positionProjectMenu();
      projectMenu.querySelector("a").focus();
    }
  });
  projectMenu.addEventListener("click", event => {
    if (event.target.closest("a")) closeProjectMenu();
  });
  document.addEventListener("click", event => {
    if (!event.target.closest(".nav-dropdown-wrapper")) closeProjectMenu();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !projectMenu.hidden) {
      closeProjectMenu();
      projectToggle.focus();
    }
  });
  document.addEventListener("focusin", event => {
    if (!event.target.closest(".nav-dropdown-wrapper")) closeProjectMenu();
  });
  window.addEventListener("resize", () => {
    if (!projectMenu.hidden) positionProjectMenu();
  });
  document.querySelector(".nav-menu").addEventListener("scroll", closeProjectMenu, { passive: true });

  // Match the menu to the visible anchor, including sections nested in the profile.
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const targets = navLinks.map(link => ({
    link,
    target: document.querySelector(link.getAttribute("href") || link.dataset.section)
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
