(() => {
  const html = document.documentElement;

  html.classList.add("csharp-tutorial-nav-loading");

  const showPrimaryNav = () => {
    html.classList.remove("csharp-tutorial-nav-loading");
    html.classList.add("csharp-tutorial-nav-ready");
  };

  const showPrimaryNavAfterPaint = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(showPrimaryNav);
    });
  };

  const getStorageKey = () => {
    const currentPath = location.pathname.replace(/\/$/, "");
    const activeTab = [...document.querySelectorAll(".md-tabs__link")]
      .map((link) => ({
        path: new URL(link.href).pathname.replace(/\/$/, ""),
        title: link.textContent.trim(),
      }))
      .filter(({ path }) => currentPath === path || currentPath.startsWith(`${path}/`))
      .sort((a, b) => b.path.length - a.path.length)[0];

    return `csharp-tutorial-nav-closed-once:${activeTab?.title || location.pathname}`;
  };

  const hasClosedOnThisTab = () => {
    try {
      return sessionStorage.getItem(getStorageKey()) === "true";
    } catch {
      return window.__csharpTutorialNavClosedOnce?.[getStorageKey()] === true;
    }
  };

  const markClosedOnThisTab = () => {
    try {
      sessionStorage.setItem(getStorageKey(), "true");
    } catch {
      window.__csharpTutorialNavClosedOnce = {
        ...window.__csharpTutorialNavClosedOnce,
        [getStorageKey()]: true,
      };
    }
  };

  const closePrimaryNavAccordions = () => {
    if (hasClosedOnThisTab()) {
      showPrimaryNav();
      return;
    }

    markClosedOnThisTab();

    document
      .querySelectorAll(".md-sidebar--primary .md-nav__toggle")
      .forEach((toggle) => {
        toggle.checked = false;

        const item = toggle.closest(".md-nav__item--nested");
        const nav = item?.querySelector(":scope > .md-nav");

        if (nav) {
          nav.setAttribute("aria-expanded", "false");
        }
      });

    showPrimaryNavAfterPaint();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", closePrimaryNavAccordions, { once: true });
  } else {
    closePrimaryNavAccordions();
  }
})();
