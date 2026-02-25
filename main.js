// import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded - initializing theme switcher');
  initThemeSwitcher();
  initSmoothScrolling();
  initMobileMenu();
  initNavbarScroll();
  initScrollAnimations();
});

function initThemeSwitcher() {
  const themeButtons = document.querySelectorAll('.theme-btn');
  const savedTheme = localStorage.getItem('portfolio-theme') || 'blue';

  console.log('Initializing theme switcher with saved theme:', savedTheme);
  
  // Apply saved theme
  document.documentElement.setAttribute('data-theme', savedTheme);

  // Set active button
  themeButtons.forEach(btn => {
    if (btn.dataset.theme === savedTheme) {
      btn.classList.add('active');
    }

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const theme = btn.dataset.theme;
      
      console.log('Theme button clicked:', theme);

      // Update theme
      document.documentElement.setAttribute('data-theme', theme);
      
      // Save to localStorage
      localStorage.setItem('portfolio-theme', theme);
      
      // Update active button state
      themeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Force a repaint to ensure CSS updates
      document.body.style.display = 'none';
      document.body.offsetHeight; // Trigger reflow
      document.body.style.display = '';
    });
  });

  // Log current theme for debugging
  console.log('Current theme:', document.documentElement.getAttribute('data-theme'));
}

function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        const mobileMenu = document.querySelector('.nav-menu');
        if (mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
        }
      }
    });
  });

  const heroButtons = document.querySelectorAll('.btn[href^="#"]');
  heroButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

function initMobileMenu() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
    });
  }
}

function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
      navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }

    lastScrollTop = scrollTop;
  });
}

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    '.timeline-item, .education-card, .project-card, .skill-category, .stat-card'
  );

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}
