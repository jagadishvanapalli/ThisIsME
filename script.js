(() => {
  "use strict";

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const icons = () => window.lucide?.createIcons({ attrs: { "stroke-width": 1.65 } });
  const refreshScroll = () => window.ScrollTrigger?.refresh();

  const projectData = {
    cloud: {
      category: "CLOUD ENGINEERING / INFRASTRUCTURE AS CODE",
      title: "AWS Enterprise Landing Zone",
      summary: "A hands-on AWS infrastructure project using Terraform. The public repository documents the initial network foundation; my wider professional work also covers landing zones, account provisioning, and cloud governance.",
      features: [
        "Terraform-defined VPC, public subnet, and Internet Gateway.",
        "Public route table and route table association for network connectivity.",
        "An infrastructure-as-code foundation for further AWS landing-zone work.",
        "Related professional experience with multi-account environments, AFT, IAM, and centralized logging."
      ],
      tags: ["AWS", "Terraform", "VPC", "Infrastructure as Code"],
      url: "https://github.com/jagadishvanapalli/aws-enterprise-landing-zone",
      link: "View GitHub repository"
    },
    legal: {
      category: "ARTIFICIAL INTELLIGENCE / MCA FINAL-YEAR PROJECT",
      title: "Legal Document Simplification for Non-Experts",
      summary: "A practical AI application that helps non-experts understand complex contracts, policies, and agreements through simplified language. Built with Python, Streamlit, and transformer-based NLP.",
      features: [
        "T5-based text simplification through an approachable Streamlit interface.",
        "Legal clause detection and highlighting, including liability and termination.",
        "Document upload and OCR integration for scanned inputs, as shared in my project announcement.",
        "Telugu-language support and text-to-speech for more accessible output."
      ],
      tags: ["Python", "Streamlit", "T5", "NLP", "OCR"],
      url: "https://github.com/jagadishvanapalli/Legal_Document_simplification-AIML",
      link: "View GitHub repository"
    },
    restaurant: {
      category: "DESIGN / FIGMA PROTOTYPING",
      title: "Restaurant UI Prototype",
      summary: "An exploration of a restaurant web experience through high-fidelity interface design in Figma, connecting visual design, reusable components, and user flows. The portfolio artwork uses an illustrative restaurant photograph.",
      features: [
        "High-fidelity restaurant interface designed in Figma.",
        "Connected screens and interactive prototype flows.",
        "Visual hierarchy and reusable interface components.",
        "A focus on clear navigation and a welcoming dining experience."
      ],
      tags: ["Figma", "UI/UX", "Prototyping"],
      url: "https://www.figma.com/proto/Ud0jDNbolEvgaUYouNytdK/figresturent?page-id=0%3A1&node-id=1-4&scaling=scale-down&starting-point-node-id=1%3A4",
      link: "Open Figma prototype"
    },
    portfolio: {
      category: "WEB DEVELOPMENT / PERSONAL PROJECT",
      title: "My Portfolio Website",
      summary: "The portfolio you're exploring: a personal website that connects my cloud engineering work, academic projects, and creative interests using HTML, CSS, and JavaScript.",
      features: [
        "Responsive layouts for mobile, tablet, and desktop.",
        "Scroll-triggered motion with support for reduced-motion preferences.",
        "Project filtering, accessible detail dialogs, and theme switching.",
        "Updated experience, education, credentials, and direct contact links."
      ],
      tags: ["HTML", "CSS", "JavaScript", "GSAP"],
      url: "https://github.com/jagadishvanapalli/myportfolio",
      link: "View portfolio repository"
    }
  };

  icons();
  $("#year").textContent = String(new Date().getFullYear());

  // Theme persistence is optional; restricted browsers still work without storage.
  const themeButton = $(".theme-toggle");
  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    themeButton.setAttribute("aria-pressed", String(theme === "light"));
    themeButton.setAttribute("aria-label", theme === "light" ? "Switch to dark theme" : "Switch to light theme");
    themeButton.setAttribute("title", theme === "light" ? "Switch to dark theme" : "Switch to light theme");
    themeButton.innerHTML = theme === "light" ? '<i data-lucide="moon" aria-hidden="true"></i>' : '<i data-lucide="sun" aria-hidden="true"></i>';
    $('meta[name="theme-color"]').content = theme === "light" ? "#f1f3ed" : "#111410";
    icons();
  }
  try { if (localStorage.getItem("jk-theme") === "light") setTheme("light"); } catch {}
  themeButton.addEventListener("click", () => {
    const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(theme);
    try { localStorage.setItem("jk-theme", theme); } catch {}
  });

  const menuButton = $(".menu-toggle");
  const navigation = $("#navigation");
  function setMenu(open, restoreFocus = false) {
    navigation.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menuButton.title = open ? "Close menu" : "Open menu";
    menuButton.innerHTML = open ? '<i data-lucide="x" aria-hidden="true"></i>' : '<i data-lucide="menu" aria-hidden="true"></i>';
    icons();
    if (open) navigation.querySelector("a").focus();
    if (!open && restoreFocus) menuButton.focus();
  }
  menuButton.addEventListener("click", () => setMenu(!navigation.classList.contains("open")));
  $$("#navigation a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (event) => {
    if (!navigation.classList.contains("open")) return;
    if (event.key === "Escape") {
      setMenu(false, true);
      return;
    }
    if (event.key === "Tab") {
      const links = [...navigation.querySelectorAll("a"), menuButton];
      const first = links[0], last = links[links.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  window.addEventListener("resize", () => { if (window.innerWidth >= 768 && navigation.classList.contains("open")) setMenu(false); }, { passive: true });

  const dialog = $(".project-dialog");
  let lastProjectButton;
  $$("[data-open-project]").forEach((button) => {
    button.addEventListener("click", () => {
      const project = projectData[button.dataset.openProject];
      if (!project) return;
      lastProjectButton = button;
      $("#dialog-category").textContent = project.category;
      $("#dialog-title").textContent = project.title;
      $("#dialog-summary").textContent = project.summary;
      $("#dialog-features").replaceChildren(...project.features.map((text) => {
        const item = document.createElement("li"); item.textContent = text; return item;
      }));
      $("#dialog-tags").replaceChildren(...project.tags.map((text) => {
        const tag = document.createElement("span"); tag.textContent = text; return tag;
      }));
      $("#dialog-link").href = project.url;
      $("#dialog-link span").textContent = project.link;
      dialog.showModal();
      document.body.classList.add("dialog-open");
    });
  });
  $(".dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("dialog-open");
    lastProjectButton?.focus({ preventScroll: true });
  });

  const projects = $$(".project");
  $$(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("active")) return;
      $$(".filter-button").forEach((item) => {
        item.classList.toggle("active", item === button);
        item.setAttribute("aria-pressed", String(item === button));
      });
      if (window.gsap) {
        window.ScrollTrigger?.getAll().filter((trigger) => trigger.vars.id?.startsWith("project-")).forEach((trigger) => trigger.kill());
        gsap.killTweensOf(projects);
        gsap.set(projects, { clearProps: "opacity,visibility,transform" });
      }
      const selected = [];
      projects.forEach((project) => {
        project.hidden = button.dataset.filter !== "all" && project.dataset.category !== button.dataset.filter;
        if (!project.hidden) selected.push(project);
      });
      $("#filter-status").textContent = button.dataset.filter === "all" ? "Showing all 4 projects." : "Showing " + selected.length + " " + button.textContent.trim() + " project.";
      if (window.gsap && !reduceMotion.matches) gsap.fromTo(selected, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .4, stagger: .06, clearProps: "opacity,transform" });
      refreshScroll();
    });
  });

  const moreCredentials = $("#more-certifications");
  const credentialsButton = $(".credentials-toggle");
  credentialsButton.addEventListener("click", () => {
    const expanded = credentialsButton.getAttribute("aria-expanded") === "true";
    moreCredentials.hidden = expanded;
    credentialsButton.setAttribute("aria-expanded", String(!expanded));
    credentialsButton.querySelector("span").textContent = expanded ? "View all 10 credentials" : "Show fewer credentials";
    credentialsButton.querySelector("svg").style.transform = expanded ? "" : "rotate(45deg)";
    refreshScroll();
  });
  $(".experience-details").addEventListener("toggle", refreshScroll);

  let toastTimer;
  function toast(message) {
    clearTimeout(toastTimer);
    $(".toast").textContent = message;
    $(".toast").classList.add("visible");
    toastTimer = setTimeout(() => $(".toast").classList.remove("visible"), 2600);
  }
  function legacyCopy(text) {
    const previousFocus = document.activeElement;
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.cssText = "position:fixed;left:-9999px;top:0";
    document.body.append(field);
    field.select();
    const success = document.execCommand("copy");
    field.remove();
    previousFocus?.focus({ preventScroll: true });
    return success;
  }
  $(".copy-email").addEventListener("click", async (event) => {
    const email = event.currentTarget.dataset.email;
    try {
      if (navigator.clipboard?.writeText) {
        try { await navigator.clipboard.writeText(email); } catch { if (!legacyCopy(email)) throw new Error("Copy unavailable"); }
      } else if (!legacyCopy(email)) throw new Error("Copy unavailable");
      toast("Email copied. Let's make something good.");
    } catch { toast(email); }
  });

  let scrollFrame;
  function updateProgress() {
    scrollFrame = null;
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    $(".reading-progress").style.transform = "scaleX(" + (distance > 0 ? Math.min(1, window.scrollY / distance) : 0) + ")";
    $(".site-header").classList.toggle("scrolled", window.scrollY > 15);
  }
  window.addEventListener("scroll", () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateProgress);
  }, { passive: true });
  window.addEventListener("resize", updateProgress, { passive: true });
  updateProgress();

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        $$("#navigation a").forEach((link) => {
          const active = link.hash === "#" + entry.target.id;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-15% 0px -60% 0px", threshold: 0 });
    $$("main section[id]").forEach((section) => sectionObserver.observe(section));
  }

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    // A media-query context restores every style when reduced motion is enabled.
    const motion = gsap.matchMedia();
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      const intro = gsap.timeline({ defaults: { duration: .9, ease: "power3.out" } });
      intro.from(".hero-topline", { y: -10, opacity: 0 }, 0)
        .from(".hero-intro", { y: 18, opacity: 0 }, .05)
        .from(".hero-first", { y: 65, opacity: 0 }, .12)
        .from(".hero-last", { y: 35, opacity: 0 }, .24)
        .from(".hero-portrait", { y: 36, opacity: 0, duration: 1.1 }, .28)
        .from(".hero-note, .hero-disciplines", { y: 24, opacity: 0, stagger: .1 }, .55)
        .from(".hero-bottom", { opacity: 0 }, .75);
      $$(".reveal").forEach((element) => {
        gsap.from(element, { opacity: 0, y: 28, duration: .75, ease: "power2.out", scrollTrigger: { trigger: element, start: "top 94%", once: true } });
      });
      projects.forEach((project, index) => {
        gsap.from(project, { opacity: 0, y: 38, duration: .8, ease: "power2.out", scrollTrigger: { id: "project-" + index, trigger: project, start: "top 92%", once: true } });
      });
      gsap.from(".about-statement", { opacity: .28, scrollTrigger: { trigger: ".about-statement", start: "top 88%", end: "bottom 53%", scrub: .6 } });
      gsap.from(".date-line", { scaleY: 0, scrollTrigger: { trigger: ".experience-layout", start: "top 80%", end: "bottom 50%", scrub: .6 } });
      gsap.to(".hero-title", { y: -45, opacity: .45, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: .8 } });
      gsap.to(".hero-portrait", { y: 35, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: .8 } });
    });
    document.fonts?.ready.then(refreshScroll);
    window.addEventListener("load", refreshScroll, { once: true });
  }
})();
