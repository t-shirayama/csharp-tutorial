(() => {
  const html = document.documentElement;
  const readPagesStorageKey = "csharp-tutorial-read-pages";

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

  const normalizePath = (path) => {
    const withoutIndex = path.replace(/\/index\.html$/, "/");
    const withoutTrailingSlash = withoutIndex.replace(/\/$/, "");

    return withoutTrailingSlash || "/";
  };

  const getReadPages = () => {
    try {
      const value = JSON.parse(localStorage.getItem(readPagesStorageKey) || "[]");

      return new Set(Array.isArray(value) ? value : []);
    } catch {
      return new Set(window.__csharpTutorialReadPages || []);
    }
  };

  const saveReadPages = (readPages) => {
    const value = [...readPages].sort();

    try {
      localStorage.setItem(readPagesStorageKey, JSON.stringify(value));
    } catch {
      window.__csharpTutorialReadPages = value;
    }
  };

  const markCurrentPageAsRead = () => {
    const readPages = getReadPages();

    readPages.add(normalizePath(location.pathname));
    saveReadPages(readPages);

    return readPages;
  };

  const applyReadStateToPrimaryNav = () => {
    const readPages = markCurrentPageAsRead();

    document
      .querySelectorAll(".md-sidebar--primary .md-nav__link[href]")
      .forEach((link) => {
        const path = normalizePath(new URL(link.href).pathname);
        const hasRead = readPages.has(path);

        link.classList.add("csharp-tutorial-read-state");
        link.classList.toggle("csharp-tutorial-read", hasRead);
        link.classList.toggle("csharp-tutorial-unread", !hasRead);
      });
  };

  const closePrimaryNavAccordions = () => {
    applyReadStateToPrimaryNav();

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
