(() => {
  let closedOnInitialLoad = false;

  const closePrimaryNavAccordions = () => {
    if (closedOnInitialLoad) {
      return;
    }

    closedOnInitialLoad = true;

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
