// ===================== NETLIFY - MAIN.JS (UPDATED) ===================== //

// --------------------- Loading Animation --------------------- //
// Fade in main-wrapper after page fully loads
$(window).on("load", function () {
  $("body").animate({ opacity: 1 }, 200);
});

// --------------------- Navbar Dropdown Animation (Desktop) --------------------- //
(function () {
  const navbar = document.querySelector(".navbar");
  const navbarBg = document.querySelector(".navbar--bg");
  const dropdowns = document.querySelectorAll(".navbar--dropdown");

  if (!navbar || dropdowns.length === 0) return;

  let activeDropdown = null;

  // Initialize all dropdown lists and items (desktop only)
  function initDesktopDropdowns() {
    if (window.innerWidth < 992) return;

    dropdowns.forEach((dropdown) => {
      const list = dropdown.querySelector(".navbar--dropdown-list");
      const trigger = dropdown.querySelector(".navbar--dropdown-trigger");
      const line = trigger ? trigger.querySelector(".dropdown--line") : null;

      if (list) {
        gsap.set(list, {
          display: "none",
          height: 0,
          overflow: "hidden",
        });

        // Initialize dropdown items
        const items = list.querySelectorAll('[animate="dropdownnav"]');
        gsap.set(items, {
          opacity: 0,
          y: "1rem",
        });
      }

      // Initialize line
      if (line) {
        gsap.set(line, { width: "0%" });
      }
    });
  }

  // Function to close a dropdown
  function closeDropdown(dropdown) {
    const list = dropdown.querySelector(".navbar--dropdown-list");
    const trigger = dropdown.querySelector(".navbar--dropdown-trigger");
    const line = trigger ? trigger.querySelector(".dropdown--line") : null;

    if (!list) return;

    gsap.to(list, {
      height: 0,
      duration: 0.3,
      ease: "power4.out",
      onComplete: () => {
        gsap.set(list, { display: "none" });
      },
    });

    // Revert trigger color
    if (trigger) {
      gsap.to(trigger, {
        color: "",
        duration: 0.3,
        ease: "power4.out",
      });
    }

    // Animate line out
    if (line) {
      gsap.to(line, {
        width: "0%",
        duration: 0.3,
        ease: "power4.out",
      });
    }
  }

  // Function to open a dropdown
  function openDropdown(dropdown, animate = false) {
    const list = dropdown.querySelector(".navbar--dropdown-list");
    const trigger = dropdown.querySelector(".navbar--dropdown-trigger");
    const line = trigger ? trigger.querySelector(".dropdown--line") : null;

    if (!list) return;

    // First set display to flex with height 0
    gsap.set(list, { display: "flex", height: 0 });

    // Then animate height to auto
    gsap.to(list, {
      height: "auto",
      duration: 0.3,
      ease: "power4.out",
    });

    // Animate dropdown items with stagger if requested
    if (animate) {
      const items = list.querySelectorAll('[animate="dropdownnav"]');
      gsap.to(items, {
        opacity: 1,
        y: "0rem",
        duration: 0.4,
        ease: "power4.out",
        stagger: 0.05,
      });
    }

    // Animate trigger color
    if (trigger) {
      gsap.to(trigger, {
        color: "#0133F6",
        duration: 0.3,
        ease: "power4.out",
      });
    }

    // Animate line in
    if (line) {
      gsap.to(line, {
        width: "100%",
        duration: 0.3,
        ease: "power4.out",
      });
    }
  }

  // Function to reset dropdown items
  function resetDropdownItems(dropdown) {
    const list = dropdown.querySelector(".navbar--dropdown-list");
    if (!list) return;

    const items = list.querySelectorAll('[animate="dropdownnav"]');
    gsap.set(items, {
      opacity: 0,
      y: "1rem",
    });
  }

  // Function to activate navbar style
  function activateNavbarStyle() {
    const navButtons = navbar.querySelectorAll(".btn.is--nav");

    if (navbarBg) {
      gsap.to(navbarBg, {
        backgroundColor: "#F2F3F6",
        borderBottomColor: "#C0C2D0",
        duration: 0.3,
        ease: "power4.out",
      });
    }

    gsap.to(navbar, {
      color: "#040A44",
      duration: 0.3,
      ease: "power4.out",
    });

    navButtons.forEach((btn) => {
      gsap.to(btn, {
        backgroundColor: "#040A44",
        color: "#F2F3F6",
        duration: 0.3,
        ease: "power4.out",
      });
    });
  }

  // Function to deactivate navbar style
  function deactivateNavbarStyle() {
    const navButtons = navbar.querySelectorAll(".btn.is--nav");

    if (navbarBg) {
      gsap.to(navbarBg, {
        backgroundColor: "", // Reset to original
        borderBottomColor: "",
        duration: 0.3,
        ease: "power4.out",
      });
    }

    gsap.to(navbar, {
      color: "", // Reset to original
      duration: 0.3,
      ease: "power4.out",
    });

    navButtons.forEach((btn) => {
      gsap.to(btn, {
        backgroundColor: "",
        color: "",
        duration: 0.3,
        ease: "power4.out",
      });
    });
  }

  // Add hover listeners to each dropdown (desktop only)
  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector(".navbar--dropdown-trigger");
    if (!trigger) return;

    // Mouseenter on trigger
    trigger.addEventListener("mouseenter", function () {
      if (window.innerWidth < 992) return;
      if (activeDropdown === dropdown) return;

      const isNewDropdown = activeDropdown !== null;
      const isFirstOpen = activeDropdown === null;

      if (activeDropdown && activeDropdown !== dropdown) {
        closeDropdown(activeDropdown);
        resetDropdownItems(activeDropdown);
      }

      openDropdown(dropdown, isFirstOpen || isNewDropdown);
      activateNavbarStyle();
      activeDropdown = dropdown;
    });
  });

  // Add hover listeners to .navlink elements (desktop only)
  const navlinks = navbar.querySelectorAll(".navlink");
  navlinks.forEach((navlink) => {
    const line = navlink.querySelector(".dropdown--line");
    if (line) gsap.set(line, { width: "0%" });

    navlink.addEventListener("mouseenter", function () {
      if (window.innerWidth < 992) return;

      if (activeDropdown) {
        closeDropdown(activeDropdown);
        resetDropdownItems(activeDropdown);
        activeDropdown = null;
        deactivateNavbarStyle();
      }

      if (line) {
        gsap.to(line, {
          width: "100%",
          duration: 0.3,
          ease: "power4.out",
        });
      }
    });

    navlink.addEventListener("mouseleave", function () {
      if (window.innerWidth < 992) return;
      if (line) {
        gsap.to(line, {
          width: "0%",
          duration: 0.3,
          ease: "power4.out",
        });
      }
    });
  });

  // Close dropdown when hovering out of navbar (desktop only)
  navbar.addEventListener("mouseleave", function () {
    if (window.innerWidth < 992) return;

    if (activeDropdown) {
      closeDropdown(activeDropdown);
      resetDropdownItems(activeDropdown);
      activeDropdown = null;
    }
    deactivateNavbarStyle();
  });

  initDesktopDropdowns();

  let wasDesktop = window.innerWidth >= 992;
  window.addEventListener("resize", function () {
    const isDesktop = window.innerWidth >= 992;

    if (isDesktop !== wasDesktop) {
      wasDesktop = isDesktop;

      if (isDesktop) {
        initDesktopDropdowns();
        activeDropdown = null;
      } else {
        dropdowns.forEach((dropdown) => {
          const list = dropdown.querySelector(".navbar--dropdown-list");
          const trigger = dropdown.querySelector(".navbar--dropdown-trigger");
          const line = trigger ? trigger.querySelector(".dropdown--line") : null;

          if (list) {
            gsap.set(list, { display: "", height: "", overflow: "" });
            const items = list.querySelectorAll('[animate="dropdownnav"]');
            gsap.set(items, { opacity: "", y: "" });
          }
          if (trigger) gsap.set(trigger, { color: "" });
          if (line) gsap.set(line, { width: "" });
        });
        activeDropdown = null;
      }
    }
  });
})();

// --------------------- Mobile Navbar Dropdown Animation --------------------- //
(function () {
  const dropdowns = document.querySelectorAll(".navbar--dropdown");
  if (dropdowns.length === 0) return;

  let activeDropdown = null;
  let activeCloseFunction = null;

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector(".navbar--dropdown-trigger");
    const list = dropdown.querySelector(".navbar--dropdown-list");
    const bg = dropdown.querySelector(".navbar--dropdown-bg");
    const goBack = list ? list.querySelector(".navbar--goback") : null;

    if (!trigger || !list) return;

    function initMobileDropdown() {
      if (window.innerWidth >= 992) return;
      gsap.set(list, { display: "none", x: "100vw" });
      if (bg) gsap.set(bg, { opacity: 0 });
    }

    function openDropdown() {
      gsap.set(list, { display: "flex", x: "100vw" });
      gsap.to(list, { x: "0vw", duration: 0.5, ease: "power4.out" });

      if (bg) {
        gsap.to(bg, { opacity: 1, duration: 0.5, ease: "power4.out" });
      }

      activeDropdown = dropdown;
      activeCloseFunction = closeDropdown;
    }

    function closeDropdown() {
      gsap.to(list, {
        x: "100vw",
        duration: 0.5,
        ease: "power4.out",
        onComplete: () => gsap.set(list, { display: "none" }),
      });

      if (bg) {
        gsap.to(bg, { opacity: 0, duration: 0.5, ease: "power4.out" });
      }

      if (activeDropdown === dropdown) {
        activeDropdown = null;
        activeCloseFunction = null;
      }
    }

    trigger.addEventListener("click", function (e) {
      if (window.innerWidth >= 992) return;
      e.preventDefault();
      e.stopPropagation();
      openDropdown();
    });

    if (goBack) {
      goBack.addEventListener("click", function (e) {
        if (window.innerWidth >= 992) return;
        e.preventDefault();
        e.stopPropagation();
        closeDropdown();
      });
    }

    initMobileDropdown();

    let wasMobile = window.innerWidth < 992;
    window.addEventListener("resize", function () {
      const isMobile = window.innerWidth < 992;

      if (isMobile !== wasMobile) {
        wasMobile = isMobile;

        if (isMobile) {
          initMobileDropdown();
        } else {
          gsap.set(list, { display: "", x: "0vw" });
          if (bg) gsap.set(bg, { opacity: "" });
        }
      }
    });
  });

  window.closeMobileDropdown = function () {
    if (activeCloseFunction) activeCloseFunction();
  };
})();

// --------------------- Navbar Solution Items Hover (Desktop) --------------------- //
(function () {
  if (window.innerWidth <= 992) return;

  const solutionItems = document.querySelectorAll(".navbar--solution-item");
  if (solutionItems.length === 0) return;

  const parentContainer = solutionItems[0].parentElement;
  if (!parentContainer) return;

  solutionItems.forEach((item) => {
    const svgItem = item.querySelector(".solution--svg-item");
    const paragraph = item.querySelector(".paragraph-small-130");

    if (svgItem) gsap.set(svgItem, { opacity: 0, x: "-1.5rem" });
    if (paragraph) gsap.set(paragraph, { opacity: 1, x: "0rem" });
  });

  let currentlyHovered = null;

  function resetAllItems() {
    solutionItems.forEach((item) => {
      gsap.to(item, { opacity: 1, duration: 0.3, ease: "power4.out" });

      const svgItem = item.querySelector(".solution--svg-item");
      const paragraph = item.querySelector(".paragraph-small-130");

      if (svgItem) gsap.to(svgItem, { opacity: 0, x: "-1.5rem", duration: 0.3, ease: "power4.out" });
      if (paragraph) gsap.to(paragraph, { opacity: 1, x: "0rem", duration: 0.3, ease: "power4.out" });
    });

    currentlyHovered = null;
  }

  solutionItems.forEach((currentItem) => {
    const currentSvg = currentItem.querySelector(".solution--svg-item");
    const currentParagraph = currentItem.querySelector(".paragraph-small-130");

    currentItem.addEventListener("mouseenter", function () {
      if (currentlyHovered && currentlyHovered !== currentItem) {
        const prevSvg = currentlyHovered.querySelector(".solution--svg-item");
        const prevParagraph = currentlyHovered.querySelector(".paragraph-small-130");

        if (prevSvg) gsap.to(prevSvg, { opacity: 0, x: "-1.5rem", duration: 0.3, ease: "power4.out" });
        if (prevParagraph) gsap.to(prevParagraph, { opacity: 1, x: "0rem", duration: 0.3, ease: "power4.out" });
      }

      solutionItems.forEach((item) => {
        gsap.to(item, { opacity: item !== currentItem ? 0.3 : 1, duration: 0.3, ease: "power4.out" });
      });

      if (currentSvg) gsap.to(currentSvg, { opacity: 1, x: "0rem", duration: 0.3, ease: "power4.out" });
      if (currentParagraph) gsap.to(currentParagraph, { opacity: 0, x: "1.5rem", duration: 0.3, ease: "power4.out" });

      currentlyHovered = currentItem;
    });

    currentItem.addEventListener("mouseleave", function () {
      setTimeout(() => {
        let hoveringItem = false;
        solutionItems.forEach((item) => {
          if (item.matches(":hover")) hoveringItem = true;
        });
        if (!hoveringItem) resetAllItems();
      }, 10);
    });
  });

  parentContainer.addEventListener("mouseleave", resetAllItems);

  window.addEventListener("resize", function () {
    if (window.innerWidth <= 992) {
      solutionItems.forEach((item) => {
        gsap.set(item, { opacity: 1 });
        const svgItem = item.querySelector(".solution--svg-item");
        const paragraph = item.querySelector(".paragraph-small-130");
        if (svgItem) gsap.set(svgItem, { opacity: 0, x: "-1.5rem" });
        if (paragraph) gsap.set(paragraph, { opacity: 1, x: "0rem" });
      });
      currentlyHovered = null;
    }
  });
})();

// --------------------- Resource Links Hover (Desktop) --------------------- //
(function () {
  if (window.innerWidth <= 992) return;

  const resourceLinks = document.querySelectorAll(".resource--link");
  if (resourceLinks.length === 0) return;

  const parentContainer = resourceLinks[0].parentElement;
  if (!parentContainer) return;

  resourceLinks.forEach((link) => {
    const svg = link.querySelector(".resource--link-svg");
    if (svg) gsap.set(svg, { opacity: 0, x: "-1.5rem" });
  });

  let currentlyHovered = null;

  function resetAllLinks() {
    resourceLinks.forEach((link) => {
      gsap.to(link, { opacity: 1, duration: 0.3, ease: "power4.out" });
      const svg = link.querySelector(".resource--link-svg");
      if (svg) gsap.to(svg, { opacity: 0, x: "-1.5rem", duration: 0.3, ease: "power4.out" });
    });
    currentlyHovered = null;
  }

  resourceLinks.forEach((currentLink) => {
    const currentSvg = currentLink.querySelector(".resource--link-svg");

    currentLink.addEventListener("mouseenter", function () {
      if (currentlyHovered && currentlyHovered !== currentLink) {
        const prevSvg = currentlyHovered.querySelector(".resource--link-svg");
        if (prevSvg) gsap.to(prevSvg, { opacity: 0, x: "-1.5rem", duration: 0.3, ease: "power4.out" });
      }

      resourceLinks.forEach((link) => {
        gsap.to(link, { opacity: link !== currentLink ? 0.3 : 1, duration: 0.3, ease: "power4.out" });
      });

      if (currentSvg) gsap.to(currentSvg, { opacity: 1, x: "0rem", duration: 0.3, ease: "power4.out" });

      currentlyHovered = currentLink;
    });

    currentLink.addEventListener("mouseleave", function () {
      setTimeout(() => {
        let hoveringLink = false;
        resourceLinks.forEach((link) => {
          if (link.matches(":hover")) hoveringLink = true;
        });
        if (!hoveringLink) resetAllLinks();
      }, 10);
    });
  });

  parentContainer.addEventListener("mouseleave", resetAllLinks);

  window.addEventListener("resize", function () {
    if (window.innerWidth <= 992) {
      resourceLinks.forEach((link) => {
        gsap.set(link, { opacity: 1 });
        const svg = link.querySelector(".resource--link-svg");
        if (svg) gsap.set(svg, { opacity: 0, x: "-1.5rem" });
      });
      currentlyHovered = null;
    }
  });
})();

// --------------------- Mobile Hamburger Menu Animation --------------------- //
(function () {
  const menuTrigger = document.querySelector(".menu--trigger");
  const menuOpen = document.querySelector(".menu--open");
  const menuClose = document.querySelector(".menu--close");
  const menuInner = document.querySelector(".navbar-menu--inner");
  const navbar = document.querySelector(".navbar");
  const navbarBg = document.querySelector(".navbar--bg");

  if (!menuTrigger || !menuOpen || !menuClose || !menuInner || !navbar) {
    return;
  }

  let isMenuOpen = false;

  function initializeMobileMenu() {
    if (window.innerWidth >= 992) return;

    gsap.set(menuClose, { opacity: 0 });
    gsap.set(menuInner, { display: "none", x: "100vw" });

    const menuItems = menuInner.querySelectorAll('[animate="navbar"]');
    gsap.set(menuItems, { opacity: 0, y: "1rem" });
  }

  function openMenu() {
    const menuItems = menuInner.querySelectorAll('[animate="navbar"]');
    const navButtons = navbar.querySelectorAll(".btn.is--nav");

    document.body.style.overflow = "hidden";

    gsap.to(menuOpen, { opacity: 0, duration: 0.3, ease: "power4.out" });
    gsap.to(menuClose, { opacity: 1, duration: 0.3, ease: "power4.out" });

    gsap.set(menuInner, { display: "flex", x: "100vw" });
    gsap.to(menuInner, { x: "0vw", duration: 0.5, ease: "power4.out" });

    gsap.to(menuItems, {
      opacity: 1,
      y: "0rem",
      duration: 0.4,
      ease: "power4.out",
      stagger: 0.05,
      delay: 0.2,
    });

    gsap.to(navbar, { color: "#040a44", duration: 0.3, ease: "power4.out" });

    if (navbarBg) {
      gsap.to(navbarBg, { backgroundColor: "rgba(242, 243, 246, 0.6)", duration: 0.3, ease: "power4.out" });
    }

    navButtons.forEach((btn) => {
      gsap.to(btn, { backgroundColor: "#040a44", color: "#f2f3f6", duration: 0.3, ease: "power4.out" });
    });

    isMenuOpen = true;
  }

  function closeMenu() {
    const menuItems = menuInner.querySelectorAll('[animate="navbar"]');
    const navButtons = navbar.querySelectorAll(".btn.is--nav");

    document.body.style.overflow = "";

    gsap.to(menuClose, { opacity: 0, duration: 0.3, ease: "power4.out" });
    gsap.to(menuOpen, { opacity: 1, duration: 0.3, ease: "power4.out" });

    gsap.to(menuInner, {
      x: "100vw",
      duration: 0.5,
      ease: "power4.out",
      onComplete: () => gsap.set(menuInner, { display: "none" }),
    });

    gsap.set(menuItems, { opacity: 0, y: "1rem" });

    gsap.to(navbar, { color: "", duration: 0.3, ease: "power4.out" });

    if (navbarBg) {
      gsap.to(navbarBg, { backgroundColor: "", duration: 0.3, ease: "power4.out" });
    }

    navButtons.forEach((btn) => {
      gsap.to(btn, { backgroundColor: "", color: "", duration: 0.3, ease: "power4.out" });
    });

    isMenuOpen = false;
  }

  menuTrigger.addEventListener("click", function () {
    if (window.innerWidth >= 992) return;

    if (typeof window.closeMobileDropdown === "function") {
      window.closeMobileDropdown();
    }

    if (isMenuOpen) closeMenu();
    else openMenu();
  });

  initializeMobileMenu();

  let wasMobile = window.innerWidth < 992;
  window.addEventListener("resize", function () {
    const isMobile = window.innerWidth < 992;

    if (isMobile !== wasMobile) {
      wasMobile = isMobile;

      if (isMobile) {
        initializeMobileMenu();
        isMenuOpen = false;
      } else {
        gsap.set(menuOpen, { opacity: 1 });
        gsap.set(menuClose, { opacity: 0 });
        gsap.set(menuInner, { display: "", x: "0vw" });
        const menuItems = menuInner.querySelectorAll('[animate="navbar"]');
        gsap.set(menuItems, { opacity: 1, y: "0rem" });
        document.body.style.overflow = "";
        isMenuOpen = false;
      }
    }
  });
})();

// --------------------- Navbar Scroll Behavior --------------------- //
(function () {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  let lastScrollY = window.scrollY;
  const scrollThreshold = window.innerHeight * 0.25;

  function handleNavbarScroll() {
    const currentScrollY = window.scrollY;
    const isScrollingDown = currentScrollY > lastScrollY;

    if (currentScrollY < scrollThreshold) {
      navbar.style.transform = "translateY(0)";
    } else {
      navbar.style.transform = isScrollingDown ? "translateY(-100%)" : "translateY(0)";
    }

    lastScrollY = currentScrollY;
  }

  let ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        handleNavbarScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  handleNavbarScroll();
})();

// --------------------- Eyebrow Text Cycling Animation --------------------- //
(function () {
  const eyebrowElement = document.querySelector('[animation="eyebrow"]');
  if (!eyebrowElement) return;

  const phrases = [
    "From field to office",
    "From data to decision",
    "From risk to reliability",
    "From reactive to proactive.",
  ];

  let currentIndex = 0;
  let isAnimating = false;
  let currentSplit = null;

  function initializeText() {
    const textWithSpaces = phrases[currentIndex].replace(/ /g, '<span class="space"> </span>');
    eyebrowElement.innerHTML = textWithSpaces;
    eyebrowElement.setAttribute("aria-label", phrases[currentIndex]);

    currentSplit = new SplitText(eyebrowElement, { type: "chars", charsClass: "char" });
  }

  function animateTextChange() {
    if (isAnimating) return;
    isAnimating = true;

    if (!currentSplit) {
      currentSplit = new SplitText(eyebrowElement, { type: "chars", charsClass: "char" });
    }

    const oldChars = currentSplit.chars;

    gsap.to(oldChars, {
      yPercent: -100,
      opacity: 0,
      stagger: 0.03,
      duration: 0.4,
      ease: "power2.out",
    });

    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute";
    tempDiv.style.top = "0";
    tempDiv.style.left = "0";
    tempDiv.style.width = "100%";

    currentIndex = (currentIndex + 1) % phrases.length;
    const textWithSpaces = phrases[currentIndex].replace(/ /g, '<span class="space"> </span>');
    tempDiv.innerHTML = textWithSpaces;
    eyebrowElement.appendChild(tempDiv);

    const newSplit = new SplitText(tempDiv, { type: "chars", charsClass: "char" });
    const newChars = newSplit.chars;

    gsap.set(newChars, { yPercent: 100, opacity: 0 });

    gsap.to(newChars, {
      yPercent: 0,
      opacity: 1,
      stagger: 0.03,
      duration: 0.4,
      ease: "power2.out",
      onComplete: () => {
        currentSplit.revert();
        eyebrowElement.innerHTML = tempDiv.innerHTML;
        eyebrowElement.setAttribute("aria-label", phrases[currentIndex]);

        currentSplit = new SplitText(eyebrowElement, { type: "chars", charsClass: "char" });

        isAnimating = false;
        setTimeout(animateTextChange, 2000);
      },
    });
  }

  initializeText();
  setTimeout(animateTextChange, 2000);
})();

// --------------------- ✅ HERO IMAGES SYNC WITH EYEBROW --------------------- //
(function () {
  const HERO_SCOPE_SELECTOR = ".section.is--home-hero";
  const EYEBROW_SELECTOR = '[animation="eyebrow"]';
  const VISUAL_SELECTOR = 'img.absolute--img[image]';

  const phrases = [
    "From field to office",
    "From data to decision",
    "From risk to reliability",
    "From reactive to proactive.",
  ];

  const heroScope = document.querySelector(HERO_SCOPE_SELECTOR);
  const eyebrowEl = document.querySelector(EYEBROW_SELECTOR);

  if (!heroScope || !eyebrowEl) return;

  const heroImgs = Array.from(heroScope.querySelectorAll(VISUAL_SELECTOR));
  if (!heroImgs.length) return;

  heroImgs.forEach((img) => {
    img.style.position = img.style.position || "absolute";
    img.style.inset = img.style.inset || "0";
    img.style.transition = img.style.transition || "opacity 450ms ease";
  });

  function forceOpacity(el, value) {
    el.style.setProperty("opacity", String(value), "important");
  }

  function setActiveByValue(imageValue) {
    heroImgs.forEach((img) => {
      const isMatch = img.getAttribute("image") === String(imageValue);

      img.classList.toggle("is-active", isMatch);
      img.setAttribute("aria-hidden", isMatch ? "false" : "true");

      forceOpacity(img, isMatch ? 1 : 0);
      img.style.pointerEvents = isMatch ? "auto" : "none";
    });
  }

  function syncFromAriaLabel() {
    const label = (eyebrowEl.getAttribute("aria-label") || "").trim();
    if (!label) return;

    const idx = phrases.findIndex((p) => p === label);
    if (idx !== -1) setActiveByValue(idx + 1);
  }

  syncFromAriaLabel();
  setActiveByValue(1);

  const observer = new MutationObserver(() => {
    syncFromAriaLabel();
  });

  observer.observe(eyebrowEl, { attributes: true, attributeFilter: ["aria-label"] });
  observer.observe(eyebrowEl, { childList: true, subtree: true });
})();

// --------------------- ✅ Hover Circle Follow Mouse (FIXED - works like before) --------------------- //
(function () {
  const logoParents = document.querySelectorAll(".trusted--logo-parent");
  const lines = document.querySelectorAll(".lines");

  if (!logoParents.length && !lines.length) return;

  function setupFollower(el) {
    const setX = gsap.quickTo(el, "x", { duration: 0.35, ease: "power2.out" });
    const setY = gsap.quickTo(el, "y", { duration: 0.35, ease: "power2.out" });
    return { setX, setY };
  }

  logoParents.forEach((parent) => {
    const hoverCircle = parent.querySelector(".hover--circle");
    if (!hoverCircle) return;

    gsap.set(hoverCircle, { opacity: 0, scale: 0.85, x: 0, y: 0 });

    const { setX, setY } = setupFollower(hoverCircle);

    parent.addEventListener("mousemove", (e) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const halfW = hoverCircle.offsetWidth / 2;
      const halfH = hoverCircle.offsetHeight / 2;

      setX(x - halfW);
      setY(y - halfH);
    });

    parent.addEventListener("mouseenter", () => {
      gsap.to(hoverCircle, { opacity: 0.3, scale: 1, duration: 0.25, ease: "power2.out" });
    });

    parent.addEventListener("mouseleave", () => {
      gsap.to(hoverCircle, { opacity: 0, scale: 0.85, duration: 0.25, ease: "power2.out" });
    });
  });

  if (lines.length) {
    lines.forEach((line) => {
      const circle = line.querySelector(".hover--circle.is--100");
      if (!circle) return;
      gsap.set(circle, { opacity: 0, x: 0, y: 0 });
    });

    function moveLineCircles(e) {
      lines.forEach((line) => {
        const circle = line.querySelector(".hover--circle.is--100");
        if (!circle) return;

        if (!circle._follower) circle._follower = setupFollower(circle);

        const rect = line.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const halfW = circle.offsetWidth / 2;
        const halfH = circle.offsetHeight / 2;

        circle._follower.setX(x - halfW);
        circle._follower.setY(y - halfH);
      });
    }

    const gridTrusted = document.querySelector(".grid--trusted");
    const scope = gridTrusted || document;

    scope.addEventListener("mousemove", moveLineCircles);

    scope.addEventListener("mouseenter", () => {
      lines.forEach((line) => {
        const circle = line.querySelector(".hover--circle.is--100");
        if (circle) gsap.to(circle, { opacity: 1, duration: 0.25, ease: "power2.out" });
      });
    });

    scope.addEventListener("mouseleave", () => {
      lines.forEach((line) => {
        const circle = line.querySelector(".hover--circle.is--100");
        if (circle) gsap.to(circle, { opacity: 0, duration: 0.25, ease: "power2.out" });
      });
    });
  }
})();

// --------------------- ✅ Offer Slide Hover Animation (Desktop + Mobile) - STICKY + NO GLITCH --------------------- //
(function () {
  let swiperInstance = null;

  // Desktop hover functionality
  function initOfferSlides() {
    if (window.innerWidth <= 992) return;

    const offerSlides = document.querySelectorAll(".swiper-slide.offer--slide");
    const firstSlide = document.querySelector(".swiper-slide.is--offer-first");
    if (!offerSlides.length || !firstSlide) return;

    // ✅ Scope that includes BOTH columns (titles + right content)
    const sliderScope =
      document.querySelector(".grid--21.is--slider") ||
      firstSlide.closest(".grid--21") ||
      firstSlide.closest(".section") ||
      document.querySelector(".offers-slider") ||
      firstSlide.closest(".swiper");

    if (!sliderScope) return;

    let lockedActiveSlide = null; // ✅ sticky state

    function applyVisibility(slide, isActive) {
      const icon = slide.querySelector(".offer--slide-icon");
      const content = slide.querySelector(".offer--slide-content");
      const paragraph = slide.querySelector(".offer--slide-titles .paragraph-large");

      [icon, content, paragraph].forEach((el) => {
        if (!el) return;
        gsap.set(el, {
          visibility: isActive ? "visible" : "hidden",
          pointerEvents: isActive ? "auto" : "none",
        });
      });
    }

    function setInactive(slide) {
      if (!slide) return;

      slide.classList.remove("is-active");
      applyVisibility(slide, false);

      const icon = slide.querySelector(".offer--slide-icon");
      const content = slide.querySelector(".offer--slide-content");
      const paragraph = slide.querySelector(".offer--slide-titles .paragraph-large");

      gsap.to(slide, { opacity: 0.3, duration: 0.25, ease: "power2.out" });
      if (icon) gsap.to(icon, { x: "-1rem", opacity: 0, duration: 0.25, ease: "power2.out" });
      if (content) gsap.to(content, { opacity: 0, duration: 0.25, ease: "power2.out" });
      if (paragraph) gsap.to(paragraph, { x: "-1rem", opacity: 0, duration: 0.25, ease: "power2.out" });
    }

    function setActive(slide) {
      if (!slide) return;
      if (lockedActiveSlide === slide) return; // ✅ no re-trigger

      // Remove active everywhere
      offerSlides.forEach((s) => s.classList.remove("is-active"));
      firstSlide.classList.remove("is-active");

      // Inactivate previous locked
      if (lockedActiveSlide && lockedActiveSlide !== slide) setInactive(lockedActiveSlide);

      // Activate new
      slide.classList.add("is-active");
      applyVisibility(slide, true);

      const icon = slide.querySelector(".offer--slide-icon");
      const content = slide.querySelector(".offer--slide-content");
      const paragraph = slide.querySelector(".offer--slide-titles .paragraph-large");

      gsap.to(slide, { opacity: 1, duration: 0.25, ease: "power2.out" });
      if (icon) gsap.to(icon, { x: "0rem", opacity: 1, duration: 0.25, ease: "power2.out" });
      if (content) gsap.to(content, { opacity: 1, duration: 0.25, ease: "power2.out" });
      if (paragraph) gsap.to(paragraph, { x: "0rem", opacity: 1, duration: 0.25, ease: "power2.out" });

      lockedActiveSlide = slide; // ✅ STICKY
    }

    function setFirstAsDefault() {
      offerSlides.forEach((s) => setInactive(s));

      firstSlide.classList.add("is-active");
      applyVisibility(firstSlide, true);

      const icon = firstSlide.querySelector(".offer--slide-icon");
      const content = firstSlide.querySelector(".offer--slide-content");
      const paragraph = firstSlide.querySelector(".offer--slide-titles .paragraph-large");

      gsap.to(firstSlide, { opacity: 1, duration: 0.25, ease: "power2.out" });
      if (icon) gsap.set(icon, { x: "0rem", opacity: 1, visibility: "visible", pointerEvents: "auto" });
      if (content) gsap.set(content, { opacity: 1, visibility: "visible", pointerEvents: "auto" });
      if (paragraph) gsap.set(paragraph, { x: "0rem", opacity: 1, visibility: "visible", pointerEvents: "auto" });

      lockedActiveSlide = firstSlide;
    }

    // Init all as inactive
    offerSlides.forEach((slide) => {
      gsap.set(slide, { opacity: 0.3 });

      const icon = slide.querySelector(".offer--slide-icon");
      const content = slide.querySelector(".offer--slide-content");
      const paragraph = slide.querySelector(".offer--slide-titles .paragraph-large");

      if (icon) gsap.set(icon, { x: "-1rem", opacity: 0, visibility: "hidden", pointerEvents: "none" });
      if (content) gsap.set(content, { opacity: 0, visibility: "hidden", pointerEvents: "none" });
      if (paragraph) gsap.set(paragraph, { x: "-1rem", opacity: 0, visibility: "hidden", pointerEvents: "none" });
    });

    // Default
    setFirstAsDefault();

    // ✅ Bind hover: only changes active when entering a NEW slide
    function bindHover(slide) {
      const targets = [
        slide,
        slide.querySelector(".offer--slide-titles"),
        slide.querySelector(".offer--slide-content-parent"),
        slide.querySelector(".offer--slide-content"),
      ].filter(Boolean);

      targets.forEach((t) => {
        t.addEventListener("mouseenter", () => setActive(slide), { passive: true });
      });
    }

    offerSlides.forEach(bindHover);
    bindHover(firstSlide);

    // ✅ Reset ONLY when leaving the WHOLE scope (and ignore internal moves)
    sliderScope.addEventListener("mouseout", (e) => {
      const toEl = e.relatedTarget;

      // if moving inside the scope, ignore
      if (toEl && sliderScope.contains(toEl)) return;

      // leaving the scope -> reset
      setFirstAsDefault();
    });
  }

  // Mobile slider functionality
  function initOfferSlider() {
    if (window.innerWidth > 992) return;

    const slider = document.querySelector(".offers-slider");
    if (!slider) return;
    if (typeof Swiper === "undefined") return;

    if (swiperInstance) {
      swiperInstance.destroy(true, true);
      swiperInstance = null;
    }

    swiperInstance = new Swiper(".offers-slider", {
      slidesPerView: "auto",
      spaceBetween: parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.25,
      navigation: {
        nextEl: ".offer-slider-btn.is--next",
        prevEl: ".offer-slider-btn.is--prev",
        disabledClass: "swiper-button-disabled",
      },
      on: {
        init: function () {
          updateSlideNumbers(this);
          updateSliderMargins(this);
        },
        slideChange: function () {
          updateSlideNumbers(this);
          updateSliderMargins(this);
        },
      },
    });

    function updateSliderMargins(swiper) {
      const sliderEl = document.querySelector(".offers-slider");
      if (!sliderEl) return;

      const isFirstSlide = swiper.activeIndex === 0;
      const isLastSlide = swiper.activeIndex === swiper.slides.length - 1;

      sliderEl.classList.remove("is--first", "is--middle", "is--last");

      if (isFirstSlide) sliderEl.classList.add("is--first");
      else if (isLastSlide) sliderEl.classList.add("is--last");
      else sliderEl.classList.add("is--middle");
    }
  }

  function updateSlideNumbers(swiper) {
    const currentSlideNumber = document.querySelector(".slide--number:first-child");
    const totalSlideNumber = document.querySelector(".slide--number:last-child");
    if (currentSlideNumber) currentSlideNumber.textContent = swiper.activeIndex + 1;
    if (totalSlideNumber) totalSlideNumber.textContent = swiper.slides.length;
  }

  const isDesktop = window.innerWidth > 992;
  if (isDesktop) initOfferSlides();
  else initOfferSlider();

  let wasDesktop = isDesktop;
  window.addEventListener("resize", function () {
    const isDesktopNow = window.innerWidth > 992;
    if (isDesktopNow !== wasDesktop) {
      wasDesktop = isDesktopNow;

      if (isDesktopNow) {
        if (swiperInstance) {
          swiperInstance.destroy(true, true);
          swiperInstance = null;
        }
        initOfferSlides();
      } else {
        initOfferSlider();
      }
    }
  });
})();

// --------------------- How It Works Scroll Animation --------------------- //
(function () {
  if (window.innerWidth <= 992) return;

  const triggersParent = document.querySelector(".howitworks--triggers-parent");
  const triggers = document.querySelectorAll(".howitworks--trigger");
  const parents = document.querySelectorAll(".howitworks--parent");

  if (!triggersParent || triggers.length === 0 || parents.length === 0) return;

  parents.forEach((parent) => {
    const content = parent.querySelector(".howitworks--content");
    const response = parent.querySelector(".howitworks--response");
    const line = parent.querySelector(".howitworks--line");

    if (content) gsap.set(content, { opacity: 0.3 });
    if (response) gsap.set(response, { height: 0, overflow: "hidden" });
    if (line) gsap.set(line, { width: "0%" });
  });

  const initialYPercent = [0, 100, 200];
  const initialYRem = [0, 3, 6];
  const finalYPercent = [-200, -100, 0];
  const finalYRem = [-6, -3, 0];

  parents.forEach((parent, index) => {
    const img = parent.querySelector(".howitworks--img");
    if (img) {
      const remInPx = initialYRem[index] * parseFloat(getComputedStyle(document.documentElement).fontSize);
      gsap.set(img, { yPercent: initialYPercent[index], y: remInPx });
    }
  });

  parents.forEach((parent, index) => {
    const img = parent.querySelector(".howitworks--img");
    if (img) {
      const remInPx = finalYRem[index] * parseFloat(getComputedStyle(document.documentElement).fontSize);
      gsap.to(img, {
        yPercent: finalYPercent[index],
        y: remInPx,
        ease: "none",
        scrollTrigger: { trigger: triggersParent, start: "top bottom", end: "bottom bottom", scrub: true },
      });
    }

    const imgInner = parent.querySelector(".howitworks--img--inner");
    if (imgInner) gsap.set(imgInner, { yPercent: 0, filter: "blur(10rem)" });
  });

  triggers.forEach((trigger, index) => {
    const parent = parents[index];
    if (!parent) return;

    const content = parent.querySelector(".howitworks--content");
    const response = parent.querySelector(".howitworks--response");
    const line = parent.querySelector(".howitworks--line");

    gsap.timeline({
      scrollTrigger: {
        trigger,
        start: "top bottom",
        onEnter: () => {
          if (index > 0 && parents[index - 1]) {
            const prevContent = parents[index - 1].querySelector(".howitworks--content");
            const prevResponse = parents[index - 1].querySelector(".howitworks--response");
            if (prevContent) gsap.to(prevContent, { opacity: 0.3, duration: 0.4, ease: "power2.out" });
            if (prevResponse) gsap.to(prevResponse, { height: 0, duration: 0.4, ease: "power2.out" });
          }
          if (content) gsap.to(content, { opacity: 1, duration: 0.4, ease: "power2.out" });
          if (response) gsap.to(response, { height: "auto", duration: 0.4, ease: "power2.out" });
        },
        onLeaveBack: () => {
          if (content) gsap.to(content, { opacity: 0.3, duration: 0.4, ease: "power2.out" });
          if (response) gsap.to(response, { height: 0, duration: 0.4, ease: "power2.out" });

          if (index > 0 && parents[index - 1]) {
            const prevContent = parents[index - 1].querySelector(".howitworks--content");
            const prevResponse = parents[index - 1].querySelector(".howitworks--response");
            if (prevContent) gsap.to(prevContent, { opacity: 1, duration: 0.4, ease: "power2.out" });
            if (prevResponse) gsap.to(prevResponse, { height: "auto", duration: 0.4, ease: "power2.out" });
          }
        },
      },
    });

    if (line) {
      gsap.to(line, {
        width: "100%",
        ease: "none",
        scrollTrigger: { trigger, start: "top bottom", end: "bottom bottom", scrub: true },
      });
    }
  });

  const section = document.querySelector(".section.is--howworks");

  parents.forEach((parent, index) => {
    const imgInner = parent.querySelector(".howitworks--img--inner");
    if (!imgInner) return;

    if (index === 0) {
      gsap.to(imgInner, {
        yPercent: -10,
        filter: "blur(0rem)",
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "top center", scrub: true },
      });
    } else if (index === 1) {
      gsap.to(imgInner, {
        yPercent: -10,
        filter: "blur(0rem)",
        ease: "none",
        scrollTrigger: { trigger: triggersParent, start: "top bottom", end: "top center", scrub: true },
      });
    } else if (index === 2) {
      gsap.to(imgInner, {
        yPercent: -10,
        filter: "blur(0rem)",
        ease: "none",
        scrollTrigger: { trigger: triggersParent, start: "center bottom", end: "center center", scrub: true },
      });
    }
  });
})();

// --------------------- What Offers Hover Circle --------------------- //
(function () {
  const section = document.querySelector(".section.is--whatoffers");
  const container = document.querySelector(".relative.is--whatworks");
  const hoverCircle = document.querySelector(".hover--circle.is--what");

  if (!section || !container || !hoverCircle) return;

  gsap.set(hoverCircle, { opacity: 0 });

  let mouseX = 0;
  let mouseY = 0;

  section.addEventListener("mousemove", function (e) {
    const rect = container.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  section.addEventListener("mouseenter", function () {
    gsap.to(hoverCircle, { opacity: 0.3, duration: 0.3, ease: "power2.out" });
  });

  section.addEventListener("mouseleave", function () {
    gsap.to(hoverCircle, { opacity: 0, duration: 0.3, ease: "power2.out" });
  });

  gsap.ticker.add(() => {
    gsap.to(hoverCircle, {
      x: mouseX,
      y: mouseY,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });
  });
})();

// --------------------- Number Counter Animation --------------------- //
(function () {
  const numberCounters = document.querySelectorAll(".number--count");
  if (numberCounters.length === 0) return;

  if (typeof ScrollTrigger === "undefined") return;

  numberCounters.forEach((counter) => {
    const originalText = counter.textContent.trim();
    const targetNumber = parseInt(originalText);
    const digitCount = originalText.length;

    if (isNaN(targetNumber)) return;

    counter.setAttribute("data-target", targetNumber);
    const targetString = targetNumber.toString().padStart(digitCount, "0");

    let html = "";
    for (let i = 0; i < digitCount; i++) {
      const targetDigit = parseInt(targetString[i]);
      let columnHTML = "";
      const startDigit = (targetDigit + 1) % 10;

      for (let j = 0; j < 10; j++) {
        const digit = (startDigit + j) % 10;
        columnHTML += `<span class="digit-item">${digit}</span>`;
      }

      html += `<span class="digit-wrapper"><span class="digit-column">${columnHTML}</span></span>`;
    }

    counter.innerHTML = html;

    ScrollTrigger.create({
      trigger: counter,
      start: "top bottom",
      once: true,
      onEnter: () => {
        const columns = counter.querySelectorAll(".digit-column");
        columns.forEach((column, index) => {
          gsap.fromTo(
            column,
            { y: "0em" },
            { y: "-9em", duration: 2, ease: "power2.out", delay: 0.4 + index * 0.1 }
          );
        });
      },
    });
  });
})();

// --------------------- Footer Accordion (Mobile) --------------------- //
(function () {
  function initFooterAccordion() {
    if (window.innerWidth >= 992) return;

    const titleParents = document.querySelectorAll(".footer--title-parent");
    if (titleParents.length === 0) return;

    let activeParent = null;

    titleParents.forEach((titleParent) => {
      const column = titleParent.closest(".footer--column");
      if (!column) return;

      const inner = column.querySelector(".footer--inner");
      const icon = titleParent.querySelector(".footer-title-icon");
      if (!inner) return;

      gsap.set(inner, { height: 0, overflow: "hidden" });
      if (icon) gsap.set(icon, { rotation: 0 });

      titleParent.addEventListener("click", () => {
        const isActive = activeParent === titleParent;

        if (activeParent && activeParent !== titleParent) {
          const prevColumn = activeParent.closest(".footer--column");
          const prevInner = prevColumn.querySelector(".footer--inner");
          const prevIcon = activeParent.querySelector(".footer-title-icon");

          gsap.to(prevInner, { height: 0, duration: 0.3, ease: "power2.out" });
          if (prevIcon) gsap.to(prevIcon, { rotation: 0, duration: 0.3, ease: "power2.out" });
        }

        if (isActive) {
          gsap.to(inner, { height: 0, duration: 0.3, ease: "power2.out" });
          if (icon) gsap.to(icon, { rotation: 0, duration: 0.3, ease: "power2.out" });
          activeParent = null;
        } else {
          gsap.to(inner, { height: "auto", duration: 0.3, ease: "power2.out" });
          if (icon) gsap.to(icon, { rotation: 180, duration: 0.3, ease: "power2.out" });
          activeParent = titleParent;
        }
      });
    });
  }

  initFooterAccordion();

  let wasMobile = window.innerWidth < 992;
  window.addEventListener("resize", () => {
    const isMobile = window.innerWidth < 992;
    if (isMobile !== wasMobile) {
      wasMobile = isMobile;

      if (isMobile) {
        initFooterAccordion();
      } else {
        const footerInners = document.querySelectorAll(".footer--inner");
        const footerIcons = document.querySelectorAll(".footer-title-icon");

        footerInners.forEach((inner) => gsap.set(inner, { height: "auto", overflow: "visible" }));
        footerIcons.forEach((icon) => gsap.set(icon, { rotation: 0 }));
      }
    }
  });
})();

// --------------------- Button Hover Animation --------------------- //
(function () {
  const buttons = document.querySelectorAll(".btn");
  if (buttons.length === 0) return;

  buttons.forEach((btn) => {
    const hoverClose = btn.querySelector(".hover--close");
    const hoverOpen = btn.querySelector(".hover--open");

    if (!hoverClose || !hoverOpen) return;

    gsap.set(hoverClose, { width: "auto" });
    gsap.set(hoverOpen, { width: 0 });

    btn.addEventListener("mouseenter", function () {
      gsap.to(hoverClose, { width: 0, duration: 0.3, ease: "power2.out" });
      gsap.to(hoverOpen, { width: "auto", duration: 0.3, ease: "power2.out" });
    });

    btn.addEventListener("mouseleave", function () {
      gsap.to(hoverClose, { width: "auto", duration: 0.3, ease: "power2.out" });
      gsap.to(hoverOpen, { width: 0, duration: 0.3, ease: "power2.out" });
    });
  });
})();


// --------------------- Marquee Animation --------------------- //

  const scrollSpeed = 50; // Pixels per second

  function startScrolling(element) {
    const scrollWidth = element.offsetWidth;
    let startTime = null;

    function animate(time) {
      if (!startTime) startTime = time;

      const timeElapsed = time - startTime;
      const scrollPosition = (timeElapsed * scrollSpeed / 1000) % scrollWidth;

      element.style.transform = `translateX(${-scrollPosition}px)`;
      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.is--scrolling').forEach(startScrolling);
  });
