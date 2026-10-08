/**
 * Modern Developer Portfolio - Main Interactive Script
 * Features: Dark/Light Mode, Typewriter, Filters, Counters, Modals, Form Toast
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initTypewriter();
  initNavbarScroll();
  initScrollReveal();
  initStatsCounter();
  initSkillProgressBars();
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
   2. Typewriter Effect
   ========================================================================== */
function initTypewriter() {
  const textElement = document.getElementById('typewriterText');
  if (!textElement) return;

  const roles = [
    'Full Stack Engineer',
    'UI/UX Craftsman',
    'Cloud & DevOps Enthusiast',
    'Open Source Contributor'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      textElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      textElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 85;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 1800; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 350; // Pause before new word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. Sticky Navbar & Active Link Highlights
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

  // Close mobile offcanvas/navbar collapse when a link is clicked
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
   4. Scroll Reveal Animations (IntersectionObserver)
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================================================
   5. Animated Stats Counter
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (!statNumbers.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          statNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 1800;
            const startTime = performance.now();

            function updateCounter(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease-out cubic formula
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const currentValue = Math.floor(easeOut * target);

              counter.textContent = currentValue + suffix;

              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                counter.textContent = target + suffix;
              }
            }

            requestAnimationFrame(updateCounter);
          });
          obs.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* ==========================================================================
   6. Skills Progress Bars Fill Animation
   ========================================================================== */
function initSkillProgressBars() {
  const skillBars = document.querySelectorAll('.custom-progress-bar');
  if (!skillBars.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = `${progress}%`;
          });
          obs.disconnect();
        }
      });
    },
    { threshold: 0.2 }
  );

  const skillsSection = document.querySelector('.skills-section');
  if (skillsSection) {
    observer.observe(skillsSection);
  }
}

/* ==========================================================================
   7. Portfolio Project Filtering
   ========================================================================== */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory.includes(filterValue)) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.92)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   8. Dynamic Project Quick View Modal
   ========================================================================== */
const projectData = {
  1: {
    title: "PulseHub - Enterprise SaaS Analytics",
    category: "Full Stack / SaaS",
    image: "assets/img/project-1.svg",
    desc: "A high-performance real-time analytics dashboard serving over 42,000 active users. Engineered with React, Node.js microservices, and ClickHouse for sub-second query performance on terabytes of event logs.",
    features: [
      "Real-time event streaming and conversion funnels",
      "Interactive data visualizations with WebGL acceleration",
      "Role-based access control (RBAC) and SAML SSO integration",
      "Automated PDF report scheduler with cron"
    ],
    tech: ["React.js", "Node.js", "ClickHouse", "Docker", "Tailwind CSS"],
    liveUrl: "https://pulsehub.example.com",
    githubUrl: "https://github.com/example/pulsehub-analytics"
  },
  2: {
    title: "Nexus AI - Automated Code Intelligence",
    category: "AI & Full Stack",
    image: "assets/img/project-2.svg",
    desc: "An intelligent generative AI assistant for engineering teams. Translates requirements to code architecture, audits security vulnerabilities, and generates end-to-end unit test suites with 98% coverage.",
    features: [
      "LLM integration with streaming tokens via SSE",
      "Semantic code search using vector embeddings (Pinecone)",
      "Automated GitHub PR review bot integration",
      "Local execution sandbox for test validation"
    ],
    tech: ["Next.js 14", "Python FastAPI", "LangChain", "OpenAI API", "PostgreSQL"],
    liveUrl: "https://nexus-ai.example.com",
    githubUrl: "https://github.com/example/nexus-ai-studio"
  },
  3: {
    title: "FinPay Global - Digital Cross-Border Wallet",
    category: "FinTech / API",
    image: "assets/img/project-3.svg",
    desc: "A secure cross-border payment platform with automated currency conversion, PCI-DSS compliant payment processing, and instantaneous settlement via Stripe & Plaid integrations.",
    features: [
      "Multi-currency virtual wallet with real-time FX rates",
      "Stripe Connect & Plaid Instant Bank Verification",
      "Two-factor authentication with biometrics (WebAuthn)",
      "Automated invoicing & ledger reconciliation"
    ],
    tech: ["TypeScript", "Express.js", "Redis", "Stripe API", "PostgreSQL"],
    liveUrl: "https://finpay.example.com",
    githubUrl: "https://github.com/example/finpay-platform"
  },
  4: {
    title: "AuraFit - Cross-Platform Health Tracker",
    category: "Mobile / Frontend",
    image: "assets/img/project-4.svg",
    desc: "A seamless health tracking application that aggregates metrics across smartwatches and mobile sensors. Features real-time heart rate graphing and customized workout recommendations.",
    features: [
      "Offline-first synchronization with SQLite and Couchbase",
      "WebSocket connection with sub-20ms heartbeat latency",
      "Apple HealthKit & Google Fit API data synchronization",
      "Dark-mode prioritized accessible user interface"
    ],
    tech: ["React Native", "GraphQL", "Node.js", "SQLite", "Chart.js"],
    liveUrl: "https://aurafit.example.com",
    githubUrl: "https://github.com/example/aurafit-mobile"
  },
  5: {
    title: "KubePulse - Kubernetes Cluster Monitor",
    category: "Cloud / DevOps",
    image: "assets/img/project-5.svg",
    desc: "An infrastructure observability cockpit built to monitor container clusters across AWS EKS and GCP. Detects pod crashes, visualizes memory pressure, and alerts team Slack channels in real time.",
    features: [
      "Automated Prometheus metrics scraping and Grafana views",
      "Dynamic pod auto-scaler simulator for stress tests",
      "Slack and PagerDuty webhook alerting triggers",
      "Terraform modular configuration templates included"
    ],
    tech: ["Go (Golang)", "Kubernetes", "Prometheus", "Docker", "AWS"],
    liveUrl: "https://kubepulse.example.com",
    githubUrl: "https://github.com/example/kubepulse-monitor"
  },
  6: {
    title: "TaskFlow - Enterprise Kanban Workspace",
    category: "Full Stack / Productivity",
    image: "assets/img/project-6.svg",
    desc: "An enterprise-grade collaborative workflow manager with drag-and-drop boards, live team cursor presence, and automation rules that streamline agile sprint deliveries.",
    features: [
      "Multiplayer live cursors and updates using WebSockets",
      "Drag-and-drop Kanban columns with smooth physics",
      "Custom trigger workflows (e.g. status change notifications)",
      "Exportable Sprint burndown & velocity charts"
    ],
    tech: ["Vue.js 3", "Node.js", "Socket.io", "MongoDB", "Bootstrap 5"],
    liveUrl: "https://taskflow.example.com",
    githubUrl: "https://github.com/example/taskflow-workspace"
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
  const modalLiveLink = document.getElementById('modalProjectLive');
  const modalGithubLink = document.getElementById('modalProjectGithub');

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
        li.className = 'mb-1 d-flex align-items-center gap-2';
        li.innerHTML = `<i class="bi bi-check-circle-fill text-success"></i> <span>${feat}</span>`;
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

      // Update links
      modalLiveLink.href = data.liveUrl;
      modalGithubLink.href = data.githubUrl;

      // Open modal
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    });
  });
}

/* ==========================================================================
   9. Contact Form Validation & Toast Notification
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
    submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status"></span> Sending...`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      form.reset();
      form.classList.remove('was-validated');

      // Trigger Toast notification
      if (toastEl) {
        const toast = new bootstrap.Toast(toastEl, { delay: 4000 });
        toast.show();
      }
    }, 1200);
  });
}

/* ==========================================================================
   10. Back to Top Button
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
