// Data Arrays - Edit these to update content
const skills = [
  {
    name: "Lorem Script",
    level: "Expert",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    name: "Ipsum Framework",
    level: "Advanced",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    name: "Dolor Language",
    level: "Expert",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    name: "Sit Learning",
    level: "Advanced",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    name: "Amet Database",
    level: "Expert",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    name: "Consectetur Viz",
    level: "Intermediate",
    description:
      "Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.",
  },
];

const experiences = [
  {
    role: "Senior Lorem Developer",
    company: "Ipsum Technologies",
    duration: "Jan 2024 - Present",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
  {
    role: "Dolor Analysis Specialist",
    company: "Sit Analytics Corp",
    duration: "Jun 2023 - Dec 2023",
    details:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.",
  },
  {
    role: "Freelance Amet Developer",
    company: "Independent",
    duration: "Mar 2022 - May 2023",
    details:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.",
  },
];

const projects = [
  {
    name: "Lorem Portfolio Platform",
    description:
      "A comprehensive lorem ipsum platform built with modern dolor technologies, featuring responsive design and smooth consectetur animations.",
    link: "https://github.com/lorem/portfolio",
  },
  {
    name: "Ipsum Analytics Dashboard",
    description:
      "Real-time analytics dashboard for tracking lorem metrics with interactive dolor visualizations and comprehensive sit reporting.",
    link: "https://github.com/lorem/analytics",
  },
  {
    name: "Dolor Management System",
    description:
      "Full-stack application for managing lorem processes with user authentication, real-time updates, and collaborative ipsum features.",
    link: "https://github.com/lorem/management",
  },
  {
    name: "Sit Visualization Tool",
    description:
      "Interactive data visualization tool for exploring complex lorem datasets with multiple chart types and advanced filtering capabilities.",
    link: "https://github.com/lorem/visualization",
  },
  {
    name: "Amet Mobile App",
    description:
      "Cross-platform mobile application with lorem-based features, offline support, and beautiful consectetur user interface.",
    link: "https://github.com/lorem/mobile",
  },
  {
    name: "Consectetur API Service",
    description:
      "RESTful API service built with modern lorem architecture, featuring comprehensive documentation and robust error handling.",
    link: "https://github.com/lorem/api",
  },
];

const contactInfo = {
  email: "lorem@ipsum.com",
  phone: "+1 234 567 8900",
};

// Typewriter Effect
const typewriterTexts = [
  "Frontend Development",
  "Lorem Engineering",
  "Ipsum Design",
  "Full Stack Development",
  "Problem Solving",
];

let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typewriterTimeout;

function typewriterEffect() {
  const typewriterElement = document.querySelector(".typewriter-text");
  const currentText = typewriterTexts[currentTextIndex];

  if (isDeleting) {
    typewriterElement.textContent = currentText.substring(
      0,
      currentCharIndex - 1
    );
    currentCharIndex--;
  } else {
    typewriterElement.textContent = currentText.substring(
      0,
      currentCharIndex + 1
    );
    currentCharIndex++;
  }

  let typingSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && currentCharIndex === currentText.length) {
    typingSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && currentCharIndex === 0) {
    isDeleting = false;
    currentTextIndex = (currentTextIndex + 1) % typewriterTexts.length;
    typingSpeed = 500;
  }

  typewriterTimeout = setTimeout(typewriterEffect, typingSpeed);
}

// Theme Toggle
function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");

  // Set default theme to dark
  document.documentElement.setAttribute("data-theme", "dark");

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);

    // Add smooth transition
    document.body.style.transition =
      "background-color 0.3s ease, color 0.3s ease";
    setTimeout(() => {
      document.body.style.transition = "";
    }, 300);
  });
}

// Enhanced Mouse Tracking for Floating Grid
function initFloatingGridInteraction() {
  const floatingGrid = document.getElementById("floating-grid");
  const gridItems = document.querySelectorAll(".grid-item");

  floatingGrid.addEventListener("mousemove", (e) => {
    const rect = floatingGrid.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    gridItems.forEach((item, index) => {
      const itemRect = item.getBoundingClientRect();
      const itemCenterX = itemRect.left + itemRect.width / 2;
      const itemCenterY = itemRect.top + itemRect.height / 2;

      const deltaX = (e.clientX - itemCenterX) * 0.1;
      const deltaY = (e.clientY - itemCenterY) * 0.1;

      const rotateX = (mouseY - (itemCenterY - centerY)) * 0.05;
      const rotateY = (mouseX - (itemCenterX - centerX)) * -0.05;

      item.style.transform = `
        translate(${deltaX}px, ${deltaY}px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
        scale(${1 + Math.abs(deltaX + deltaY) * 0.001})
      `;
    });
  });

  floatingGrid.addEventListener("mouseleave", () => {
    gridItems.forEach((item) => {
      item.style.transform =
        "translate(0px, 0px) rotateX(0deg) rotateY(0deg) scale(1)";
    });
  });

  // Add individual item hover effects
  gridItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
      item.style.zIndex = "10";
    });

    item.addEventListener("mouseleave", () => {
      item.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
      item.style.zIndex = "1";
    });
  });
}

// Enhanced Intersection Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Add stagger effect for cards
      if (
        entry.target.classList.contains("skill-card") ||
        entry.target.classList.contains("project-card")
      ) {
        const cards = entry.target.parentElement.children;
        const index = Array.from(cards).indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 0.1}s`;
      }
    }
  });
}, observerOptions);

// Initialize animations with enhanced effects
function initAnimations() {
  // Observe sections
  document.querySelectorAll(".section").forEach((section) => {
    observer.observe(section);
  });

  // Observe cards with stagger effect
  setTimeout(() => {
    document.querySelectorAll(".skill-card").forEach((card, index) => {
      setTimeout(() => {
        observer.observe(card);
      }, index * 50);
    });

    document.querySelectorAll(".timeline-item").forEach((item, index) => {
      setTimeout(() => {
        observer.observe(item);
      }, index * 100);
    });

    document.querySelectorAll(".project-card").forEach((card, index) => {
      setTimeout(() => {
        observer.observe(card);
      }, index * 75);
    });
  }, 300);
}

function renderSkills() {
  const skillsContainer = document.getElementById("skills-container");
  skillsContainer.innerHTML = skills
    .map(
      (skill, index) => `
        <div class="skill-card" style="animation-delay: ${index * 0.1}s">
            <div class="skill-header">
                <h3 class="skill-name">${skill.name}</h3>
                <span class="skill-level">${skill.level}</span>
            </div>
            <p class="skill-description">${skill.description}</p>
        </div>
    `
    )
    .join("");
}

function renderExperience() {
  const experienceContainer = document.getElementById("experience-container");
  experienceContainer.innerHTML = experiences
    .map(
      (exp, index) => `
        <div class="timeline-item" style="animation-delay: ${index * 0.2}s">
            <div class="experience-card">
                <h3 class="experience-role">${exp.role}</h3>
                <h4 class="experience-company">${exp.company}</h4>
                <p class="experience-duration">${exp.duration}</p>
                <p class="experience-details">${exp.details}</p>
            </div>
        </div>
    `
    )
    .join("");
}

function renderProjects() {
  const projectsContainer = document.getElementById("projects-container");
  projectsContainer.innerHTML = projects
    .map(
      (project, index) => `
        <div class="project-card" onclick="window.open('${
          project.link
        }', '_blank')" style="animation-delay: ${index * 0.1}s">
            <div class="project-content">
                <h3 class="project-name">${project.name}</h3>
                <p class="project-description">${project.description}</p>
                <a href="${
                  project.link
                }" class="project-link" onclick="event.stopPropagation();">
                    View Project →
                </a>
            </div>
        </div>
    `
    )
    .join("");
}

// Enhanced smooth scrolling
function initSmoothScrolling() {
  document
    .querySelectorAll(".nav-link, .hero-actions .btn, .footer-links a")
    .forEach((link) => {
      if (link.getAttribute("href")?.startsWith("#")) {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const targetId = link.getAttribute("href");
          const targetSection = document.querySelector(targetId);

          if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
              top: offsetTop,
              behavior: "smooth",
            });
          }
        });
      }
    });
}

// Enhanced active navigation
function initActiveNavigation() {
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveNav() {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", throttle(updateActiveNav, 16));
  updateActiveNav();
}

// Enhanced navbar scroll effect
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");

  function updateNavbar() {
    const currentTheme = document.documentElement.getAttribute("data-theme");

    if (window.scrollY > 50) {
      if (currentTheme === "dark") {
        navbar.style.background = "rgba(10, 10, 10, 0.95)";
      } else {
        navbar.style.background = "rgba(255, 255, 255, 0.95)";
      }
      navbar.style.backdropFilter = "blur(20px)";
    } else {
      if (currentTheme === "dark") {
        navbar.style.background = "rgba(10, 10, 10, 0.8)";
      } else {
        navbar.style.background = "rgba(255, 255, 255, 0.8)";
      }
      navbar.style.backdropFilter = "blur(12px)";
    }
  }

  window.addEventListener("scroll", throttle(updateNavbar, 16));
  updateNavbar();

  // Update navbar on theme change
  const themeToggle = document.getElementById("theme-toggle");
  themeToggle.addEventListener("click", () => {
    setTimeout(updateNavbar, 100);
  });
}

// Copy to clipboard with enhanced feedback
function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      showToast(`Copied "${text}" to clipboard!`);
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
      showToast("Failed to copy to clipboard", "error");
    });
}

// Enhanced toast notification
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");
  const toastIcon = document.querySelector(".toast-icon");

  toastMessage.textContent = message;
  toastIcon.textContent = type === "success" ? "✓" : "✗";
  toastIcon.style.background =
    type === "success" ? "var(--success)" : "var(--error)";

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Enhanced interactive effects
function initInteractiveEffects() {
  // Enhanced project card hover effects
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)";
    });
  });

  // Add parallax effect to decoration circles
  const decorationCircles = document.querySelectorAll(".decoration-circle");

  window.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    decorationCircles.forEach((circle, index) => {
      const speed = (index + 1) * 0.5;
      const x = (mouseX - 0.5) * speed;
      const y = (mouseY - 0.5) * speed;

      circle.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
}

// Performance optimization
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Enhanced loading animation
function addLoadingAnimation() {
  document.body.style.opacity = "0";
  window.addEventListener("load", () => {
    document.body.style.transition = "opacity 0.8s ease";
    document.body.style.opacity = "1";

    // Trigger hero animations
    setTimeout(() => {
      document.querySelector(".hero").classList.add("loaded");
    }, 500);
  });
}

// Parallax effect for background elements
function initParallax() {
  const decorationCircles = document.querySelectorAll(".decoration-circle");

  function updateParallax() {
    const scrolled = window.scrollY;

    decorationCircles.forEach((circle, index) => {
      const speed = (index + 1) * 0.1;
      const yPos = scrolled * speed;
      circle.style.transform = `translateY(${yPos}px)`;
    });
  }

  window.addEventListener("scroll", throttle(updateParallax, 16));
}

// Initialize everything
document.addEventListener("DOMContentLoaded", () => {
  addLoadingAnimation();
  initThemeToggle();
  initFloatingGridInteraction();

  renderSkills();
  renderExperience();
  renderProjects();

  initAnimations();
  initSmoothScrolling();
  initActiveNavigation();
  initNavbarScroll();
  initInteractiveEffects();
  initParallax();

  setTimeout(typewriterEffect, 1000);

  console.log("🚀 Modern portfolio loaded successfully!");
  console.log("📧 Contact: lorem@ipsum.com");
  console.log("🎨 Theme: Dark mode default with light mode toggle");
  console.log("🖱️ Try hovering over the floating grid!");
});

// Handle visibility change
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    clearTimeout(typewriterTimeout);
  } else {
    setTimeout(typewriterEffect, 100);
  }
});

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.key === "h" && !e.ctrlKey && !e.altKey) {
    document.querySelector("#home").scrollIntoView({ behavior: "smooth" });
  }
  if (e.key === "c" && !e.ctrlKey && !e.altKey) {
    document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
  }
  if (e.key === "t" && !e.ctrlKey && !e.altKey) {
    document.getElementById("theme-toggle").click();
  }
});

// Expose functions globally
window.copyToClipboard = copyToClipboard;
