(() => {
  const html = document.documentElement;
  const readPagesStorageKey = "csharp-tutorial-read-pages";

  html.classList.add("csharp-tutorial-nav-loading");

  const showPrimaryNav = () => {
    html.classList.remove("csharp-tutorial-nav-loading");
    html.classList.add("csharp-tutorial-nav-ready");
  };

  const loadingFallback = window.setTimeout(showPrimaryNav, 1200);

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

  const updateReadState = (link, button, hasRead) => {
    link.classList.add("csharp-tutorial-read-state");
    link.classList.toggle("csharp-tutorial-read", hasRead);
    link.classList.toggle("csharp-tutorial-unread", !hasRead);

    button.classList.toggle("csharp-tutorial-read-toggle--read", hasRead);
    button.classList.toggle("csharp-tutorial-read-toggle--unread", !hasRead);
    button.setAttribute("aria-pressed", String(hasRead));
    button.setAttribute("aria-label", hasRead ? "未読に戻す" : "読了にする");
    button.title = hasRead ? "未読に戻す" : "読了にする";
  };

  const createReadToggle = (link, path) => {
    const item = link.closest(".md-nav__item");
    const existingButton = item?.querySelector(":scope > .csharp-tutorial-read-toggle");

    if (!item) {
      return null;
    }

    item.classList.add("csharp-tutorial-read-item");

    if (existingButton) {
      return existingButton;
    }

    const button = document.createElement("button");

    button.className = "csharp-tutorial-read-toggle";
    button.type = "button";
    button.textContent = "✓";
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const readPages = getReadPages();
      const hasRead = readPages.has(path);

      if (hasRead) {
        readPages.delete(path);
      } else {
        readPages.add(path);
      }

      saveReadPages(readPages);
      updateReadState(link, button, !hasRead);
    });

    item.insertBefore(button, link);

    return button;
  };

  const applyReadStateToPrimaryNav = () => {
    const readPages = getReadPages();

    document
      .querySelectorAll(
        ".md-sidebar--primary .md-nav__item:not(.md-nav__item--nested) > .md-nav__link[href]",
      )
      .forEach((link) => {
        const url = new URL(link.href);

        if (url.hash) {
          return;
        }

        const path = normalizePath(url.pathname);
        const hasRead = readPages.has(path);
        const button = createReadToggle(link, path);

        if (button) {
          updateReadState(link, button, hasRead);
        }
      });
  };

  const closePrimaryNavAccordions = () => {
    try {
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
    } catch {
      showPrimaryNav();
    } finally {
      window.clearTimeout(loadingFallback);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", closePrimaryNavAccordions, { once: true });
  } else {
    closePrimaryNavAccordions();
  }
})();
