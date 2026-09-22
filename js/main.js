/**
 * Prem Panchal — Data Science & Technology Portfolio
 * Interactive Controller (main.js)
 * 
 * Features:
 * - 3D Card Tilt Physics with Specular Highlights
 * - Scroll-Triggered Reveal Animations (Intersection Observer)
 * - Navigation Scrollspy & Mobile Drawer
 * - Project Overview Modals
 * - Contact Copy-to-Clipboard with Toast Feedback
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. Mobile Menu Toggle
  // =========================================================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      if (isOpen) {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
      } else {
        mobileMenu.classList.remove('hidden');
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-xmark');
      }
    });

    // Close menu when any mobile nav link is clicked
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
      });
    });
  }

  // =========================================================================
  // 2. Active Navigation Spy on Scroll
  // =========================================================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('text-white', 'bg-slate-800/60');
            link.classList.remove('text-slate-400');
          } else {
            link.classList.remove('text-white', 'bg-slate-800/60');
            link.classList.add('text-slate-400');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // =========================================================================
  // 3. 3D Card Hover Tilt Physics
  // =========================================================================
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate rotation (-8 to +8 degrees)
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  // =========================================================================
  // 4. Scroll Reveal Animations (Intersection Observer)
  // =========================================================================
  const revealElements = document.querySelectorAll('.glass-card, .journey-card, .section-badge, .section-title, .section-subtitle');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // =========================================================================
  // 5. Project Modals Data & Logic
  // =========================================================================
  const projectDetails = {
    stock: {
      title: "Stock Market Prediction System",
      badge: "Machine Learning & Analytics",
      tech: ["Python", "Pandas", "Matplotlib", "Seaborn"],
      description: "Developed a machine learning model to analyze historical stock market data and predict market trends using data visualization and predictive analytics.",
      features: [
        "Historical market data ingestion and time-series preprocessing using Pandas.",
        "Trend visualization, moving averages, and volatility distribution charts created with Matplotlib and Seaborn.",
        "Feature engineering and exploratory data analysis to evaluate historical indicators and predict trends.",
        "Data-driven evaluation of predictive analytics models."
      ]
    },
    student: {
      title: "Student Management System",
      badge: "Web Application & Database Integration",
      tech: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB"],
      description: "Developed a web-based application for managing student records with CRUD operations and database integration.",
      features: [
        "Full Create, Read, Update, and Delete (CRUD) operations on student profile records.",
        "Robust backend routing and API endpoints powered by Node.js.",
        "Persistent document storage using MongoDB with structured schema definitions.",
        "Intuitive frontend interface built with HTML, CSS, and interactive JavaScript."
      ]
    },
    ecommerce: {
      title: "Meesho E-Commerce Website",
      badge: "Frontend Web Development",
      tech: ["HTML", "CSS", "JavaScript"],
      description: "Developed a responsive e-commerce website inspired by Meesho, focusing on product listings, user-friendly UI, and frontend functionality.",
      features: [
        "Modern catalog layout showcasing product cards, pricing, and category filters.",
        "Responsive grid design ensuring seamless usability across mobile, tablet, and desktop screens.",
        "Clean, user-centric interface inspired by modern commercial e-commerce platforms."
      ]
    },
    social: {
      title: "Facebook and Instagram Login Page",
      badge: "UI/UX & Authentication Concepts",
      tech: ["HTML", "CSS"],
      description: "Created responsive Facebook and Instagram-style login page concepts with form validation and modern UI styling.",
      features: [
        "Pixel-precise visual styling inspired by major social media authentication screens.",
        "Frontend form layout with input validation feedback and security-conscious design patterns.",
        "Fully responsive layout optimized for mobile and desktop screens."
      ]
    },
    concepts: {
      title: "HTML Website Concepts",
      badge: "Semantic Web Architecture",
      tech: ["HTML", "CSS"],
      description: "Built login page concepts for university, social media, and food café website interfaces.",
      features: [
        "University Portal: Structured student portal login interface with academic styling.",
        "Social Media Portal: Engaging authentication interface for community connectivity.",
        "Food Café Portal: Warm, stylized interface designed for café and ordering system entry."
      ]
    }
  };

  const projectModal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');

  window.openProjectModal = function (projectId) {
    const data = projectDetails[projectId];
    if (!data || !projectModal || !modalContent) return;

    modalContent.innerHTML = `
      <div class="space-y-4">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-300 font-mono text-xs">
          ${data.badge}
        </div>
        <h3 class="text-2xl font-bold font-outfit text-white">${data.title}</h3>
        
        <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
          ${data.description}
        </p>

        <div class="pt-2 border-t border-slate-800">
          <h4 class="text-xs uppercase font-mono text-slate-400 mb-2.5">Key Highlights:</h4>
          <ul class="space-y-2 text-xs sm:text-sm text-slate-300">
            ${data.features.map(f => `<li class="flex items-start gap-2.5"><i class="fa-solid fa-check text-blue-400 text-xs mt-1 shrink-0"></i><span>${f}</span></li>`).join('')}
          </ul>
        </div>

        <div class="pt-3 border-t border-slate-800">
          <div class="text-xs uppercase font-mono text-slate-400 mb-2">Technologies Used:</div>
          <div class="flex flex-wrap gap-1.5">
            ${data.tech.map(t => `<span class="tech-badge">${t}</span>`).join('')}
          </div>
        </div>
      </div>
    `;

    projectModal.classList.remove('hidden');
    requestAnimationFrame(() => {
      projectModal.classList.remove('opacity-0');
    });
  };

  window.closeProjectModal = function () {
    if (!projectModal) return;
    projectModal.classList.add('opacity-0');
    setTimeout(() => {
      projectModal.classList.add('hidden');
    }, 300);
  };

  // Close modal when clicking outside content
  if (projectModal) {
    projectModal.addEventListener('click', e => {
      if (e.target === projectModal) {
        window.closeProjectModal();
      }
    });
  }

  // Close on ESC key
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      window.closeProjectModal();
    }
  });

  // =========================================================================
  // 6. Copy to Clipboard Utility with Toast
  // =========================================================================
  window.copyToClipboard = function (text, button) {
    navigator.clipboard.writeText(text).then(() => {
      const toast = document.getElementById('copy-toast');
      const toastMessage = document.getElementById('toast-message');

      if (toast) {
        toastMessage.textContent = `Copied: ${text}`;
        toast.classList.remove('hidden');
        toast.classList.add('flex');

        setTimeout(() => {
          toast.classList.add('hidden');
          toast.classList.remove('flex');
        }, 2500);
      }

      if (button) {
        const originalIcon = button.innerHTML;
        button.innerHTML = '<i class="fa-solid fa-check text-emerald-400"></i>';
        setTimeout(() => {
          button.innerHTML = originalIcon;
        }, 2000);
      }
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

})();
