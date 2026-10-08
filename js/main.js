/**
 * Lakpa Sherpa - AI Engineer Portfolio Script
 * Interactive Features: Theme Switcher, Typewriter, Project Modals, Skills Filtering, Contact Validation & Toast
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initTypewriter();
  initNavbarScroll();
  initScrollReveal();
  initSkillFiltering();
  initProjectFiltering();
  initProjectModal();
  initContactForm();
  initBackToTop();
  initCurrentYear();
});

function initCurrentYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ==========================================================================
   1. Theme Toggle (Dark / Light)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const htmlEl = document.documentElement;

  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

  applyTheme(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }

  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    if (themeIcon) {
      if (theme === 'light') {
        themeIcon.classList.remove('bi-moon-stars-fill');
        themeIcon.classList.add('bi-sun-fill');
      } else {
        themeIcon.classList.remove('bi-sun-fill');
        themeIcon.classList.add('bi-moon-stars-fill');
      }
    }
  }
}

/* ==========================================================================
   2. Typewriter Effect for AI Engineer
   ========================================================================== */
function initTypewriter() {
  const textElement = document.getElementById('typewriterText');
  if (!textElement) return;

  const roles = [
    'AI Engineer',
    'Machine Learning Specialist',
    'Deep Learning Practitioner',
    'LLMs & AI Agents Builder',
    'Intelligent Software Developer'
  ];

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    textElement.textContent = roles[0];
    const cursor = document.querySelector('.typewriter-cursor');
    if (cursor) cursor.style.display = 'none';
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      textElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      textElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 85;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 1900; // Pause at end of title
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 350; // Pause before next title
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. Sticky Navbar & Mobile Offcanvas Auto-Close
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar-custom');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navCollapse = document.getElementById('navbarNav');
  if (navCollapse) {
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      });
    });
  }
}

/* ==========================================================================
   4. Premium Scroll Reveal Animations (Progressive & Staggered)
   ========================================================================== */
function initScrollReveal() {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-fade-in, .reveal-scale-in');
  if (!revealElements.length) return;

  if (isReducedMotion) {
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  // Pre-apply staggered transition delays for grid cards
  const gridGroups = document.querySelectorAll('#skillsContainer, #projectsGrid, .resume-highlights-grid, .timeline, .experience-focus-grid');
  gridGroups.forEach(group => {
    const children = group.children;
    Array.from(children).forEach((child, idx) => {
      const delay = Math.min(idx * 75, 450); // Progressive cascade up to 450ms
      child.style.transitionDelay = `${delay}ms`;
    });
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle('revealed', entry.isIntersecting);
      });
    },
    {
      threshold: 0.01,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  document.body.classList.add('scroll-reveal-ready');
  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   5. Skills Categories Quick Filter
   ========================================================================== */
function initSkillFiltering() {
  const skillFilters = document.querySelectorAll('.skill-filter-btn');
  const skillBoxes = document.querySelectorAll('.skill-filter-item');
  if (!skillFilters.length || !skillBoxes.length) return;

  const hideTimers = new Map();

  skillFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilters.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filterVal = btn.getAttribute('data-skill-filter');

      skillBoxes.forEach(item => {
        const hideTimer = hideTimers.get(item);
        if (hideTimer) {
          clearTimeout(hideTimer);
          hideTimers.delete(item);
        }

        const categories = (item.getAttribute('data-skill-category') || '').split(/\s+/);
        const matchesFilter = filterVal === 'all' || categories.includes(filterVal);
        if (matchesFilter) {
          item.style.display = '';
          requestAnimationFrame(() => item.classList.remove('is-filtering-out'));
        } else {
          item.classList.add('is-filtering-out');
          hideTimers.set(item, setTimeout(() => {
            item.style.display = 'none';
            hideTimers.delete(item);
          }, 250));
        }
      });
    });
  });
}

/* ==========================================================================
   6. Projects Filter
   ========================================================================== */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.projects-section .filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category') || '';
        if (filterValue === 'all' || itemCategory.includes(filterValue)) {
          item.style.display = '';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   7. Dynamic Project Details Modal Data
   ========================================================================== */
const projectData = {
  1: {
    title: "Student Management System",
    category: "Full Stack & Web Application",
    image: "assets/img/project-student-system.svg",
    desc: "A full-stack Student Management System engineered to efficiently manage student information, academic records, and administrative operations. Features a clean, responsive admin dashboard with relational database persistence and role-based actions.",
    features: [
      "Student registration and detailed student profiles",
      "Full CRUD operations (Add, edit, update, delete student records)",
      "High-speed student search by ID, name, or department",
      "Academic information, marks, and course enrollment records",
      "Relational MySQL database integration with structured schemas",
      "Secure administrative authentication and role authorization",
      "Admin dashboard with real-time operational metrics",
      "Fully responsive user interface optimized across desktop and mobile"
    ],
    tech: ["Python", "Flask", "MySQL", "HTML5", "CSS3", "JavaScript", "REST APIs"]
  }
};

function initProjectModal() {
  const modalElement = document.getElementById('projectDetailsModal');
  if (!modalElement) return;

  const quickViewBtns = document.querySelectorAll('.quick-view-btn');
  const modalImg = document.getElementById('modalProjectImg');
  const modalTitle = document.getElementById('modalProjectTitle');
  const modalCategory = document.getElementById('modalProjectCategory');
  const modalDesc = document.getElementById('modalProjectDesc');
  const modalFeaturesList = document.getElementById('modalProjectFeatures');
  const modalTechStack = document.getElementById('modalProjectTech');

  quickViewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project-id');
      const data = projectData[projectId];
      if (!data) return;

      modalImg.src = data.image;
      modalImg.alt = data.title;
      modalTitle.textContent = data.title;
      modalCategory.textContent = data.category;
      modalDesc.textContent = data.desc;

      // Populate features
      modalFeaturesList.innerHTML = '';
      data.features.forEach(feat => {
        const li = document.createElement('li');
        li.className = 'mb-2 d-flex align-items-start gap-2';
        li.innerHTML = `<i class="bi bi-check-circle-fill text-success mt-1"></i> <span>${feat}</span>`;
        modalFeaturesList.appendChild(li);
      });

      // Populate tech badges
      modalTechStack.innerHTML = '';
      data.tech.forEach(t => {
        const span = document.createElement('span');
        span.className = 'project-tag';
        span.textContent = t;
        modalTechStack.appendChild(span);
      });

      // Open modal
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    });
  });
}

/* ==========================================================================
   8. Contact Form Validation & Toast Notification
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const toastEl = document.getElementById('contactToast');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    // Simulate sending state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status"></span> Sending Message...`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      form.reset();
      form.classList.remove('was-validated');

      // Trigger Toast notification
      if (toastEl) {
        const toast = new bootstrap.Toast(toastEl, { delay: 4500 });
        toast.show();
      }
    }, 1100);
  });
}

/* ==========================================================================
   9. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
