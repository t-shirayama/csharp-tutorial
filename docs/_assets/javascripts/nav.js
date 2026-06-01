(() => {
  const closePrimaryNavAccordions = () => {
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

  if (window.document$) {
    window.document$.subscribe(closePrimaryNavAccordions);
  } else {
    document.addEventListener("DOMContentLoaded", closePrimaryNavAccordions);
  }
})();
