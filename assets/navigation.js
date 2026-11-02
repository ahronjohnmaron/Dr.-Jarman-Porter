const MOBILE_BREAKPOINT = 768;

document.querySelectorAll("header").forEach((header) => {
  const toggle = header.querySelector(".mobile-menu-toggle");
  const desktopNavigation = header.querySelector(".desktop-navigation");
  const mobileNavigation = header.querySelector(".mobile-navigation");

  if (!toggle || !desktopNavigation || !mobileNavigation) return;

  const links = [...desktopNavigation.querySelectorAll("a")].map((link) => {
    const mobileLink = link.cloneNode(true);
    mobileLink.className = "mobile-navigation__link";
    return mobileLink;
  });

  mobileNavigation.replaceChildren(...links);

  const setMenuOpen = (open, returnFocus = false) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    mobileNavigation.hidden = !open;
    mobileNavigation.dataset.open = String(open);

    if (returnFocus) toggle.focus();
  };

  toggle.addEventListener("click", () => {
    setMenuOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  mobileNavigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenuOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false, true);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= MOBILE_BREAKPOINT) setMenuOpen(false);
  });
});
