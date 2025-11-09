const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('site-nav');

if (navToggle && siteNav) {
  const toggleNav = () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('no-scroll', isOpen);
  };

  navToggle.addEventListener('click', toggleNav);

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && siteNav.classList.contains('is-open')) {
      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
    }
  });
}

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const contactForm = document.querySelector('[data-contact-form]');
if (contactForm) {
  const feedbackEl = contactForm.querySelector('[data-feedback]');

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const entries = Object.fromEntries(formData.entries());
    const requiredFields = ['name', 'email', 'company', 'stage'];
    const missing = requiredFields.filter((field) => !entries[field]?.trim());

    if (missing.length) {
      if (feedbackEl) {
        feedbackEl.hidden = false;
        feedbackEl.dataset.status = 'error';
        feedbackEl.textContent = 'Please fill in all required fields so we can route your request quickly.';
      } else {
        alert('Please fill in all required fields so we can route your request quickly.');
      }
      return;
    }

    if (feedbackEl) {
      feedbackEl.hidden = false;
      feedbackEl.dataset.status = 'success';
      feedbackEl.textContent = 'Thanks for reaching out. A NovaEdge specialist will reply within one business day.';
    } else {
      alert('Thanks for reaching out. A NovaEdge specialist will reply within one business day.');
    }

    contactForm.reset();
  });
}

const animatedElements = document.querySelectorAll('[data-animate]');
if (animatedElements.length) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            entry.target.addEventListener(
              'transitionend',
              () => {
                entry.target.classList.remove('is-animating');
              },
              { once: true }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    animatedElements.forEach((element) => {
      const delay = element.dataset.animateDelay;
      if (delay) {
        element.style.transitionDelay = delay;
      }
      element.classList.add('is-animating');
      observer.observe(element);
    });
  }
}
