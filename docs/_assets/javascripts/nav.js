(() => {
  const storageKey = "csharp-tutorial-nav-closed-once";

  const hasClosedOnThisTab = () => {
    try {
      return sessionStorage.getItem(storageKey) === "true";
    } catch {
      return window.__csharpTutorialNavClosedOnce === true;
    }
  };

  const markClosedOnThisTab = () => {
    try {
      sessionStorage.setItem(storageKey, "true");
    } catch {
      window.__csharpTutorialNavClosedOnce = true;
    }
  };

  const closePrimaryNavAccordions = () => {
    if (hasClosedOnThisTab()) {
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
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", closePrimaryNavAccordions, { once: true });
  } else {
    closePrimaryNavAccordions();
  }
})();
