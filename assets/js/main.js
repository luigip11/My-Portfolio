/**
* Template Name: iPortfolio - v3.3.0
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

const onWindowReady = (callback) => {
  if (document.readyState === 'complete') {
    callback();
    return;
  }

  window.addEventListener('load', callback, { once: true });
};

const waitForSections = () => {
  if (window.sectionsReady && typeof window.sectionsReady.then === 'function') {
    return window.sectionsReady;
  }

  return Promise.resolve();
};

const initPortfolioApp = () => {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all);
    if (!selectEl) return;

    if (all) {
      selectEl.forEach((item) => item.addEventListener(type, listener));
      return;
    }

    selectEl.addEventListener(type, listener);
  };

  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

  const navbarlinks = select('#navbar .scrollto', true);
  const navbarlinksActive = () => {
    const position = window.scrollY + 200;

    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;

      const section = select(navbarlink.hash);
      if (!section) return;

      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  };

  const scrollto = (el) => {
    const target = select(el);
    if (!target) return;

    window.scrollTo({
      top: target.offsetTop,
      behavior: 'smooth'
    });
  };

  const backtotop = select('.back-to-top');
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active');
      } else {
        backtotop.classList.remove('active');
      }
    };

    toggleBacktotop();
    onscroll(document, toggleBacktotop);
    onWindowReady(toggleBacktotop);
  }

  navbarlinksActive();
  onscroll(document, navbarlinksActive);
  onWindowReady(navbarlinksActive);

  on('click', '.mobile-nav-toggle', function() {
    select('body').classList.toggle('mobile-nav-active');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  const sidebarToggle = select('.sidebar-toggle');
  const brandLink = select('.brand-link');
  const logoCircle = select('.res-circle');
  const desktopSidebarQuery = window.matchMedia('(min-width: 1200px)');
  const isDesktopSidebar = () => desktopSidebarQuery.matches;
  const isSidebarCollapsed = () => document.body.classList.contains('sidebar-collapsed');
  const syncSidebarToggleLabel = () => {
    if (!sidebarToggle) return;

    sidebarToggle.setAttribute('aria-label', isSidebarCollapsed() ? 'Espandi sidebar' : 'Collassa sidebar');
  };

  if (logoCircle) {
    let logoPointerInside = false;

    const syncLogoState = () => {
      const shouldShowHamburger = logoPointerInside && isDesktopSidebar() && !isSidebarCollapsed();
      logoCircle.classList.toggle('logo-hovered', shouldShowHamburger);
    };

    const syncDesktopSidebarMode = () => {
      if (isDesktopSidebar()) return;

      document.body.classList.remove('sidebar-collapsed');
      logoPointerInside = false;
      syncLogoState();
      syncSidebarToggleLabel();
    };

    const isEventInsideCircle = (event) => {
      const rect = logoCircle.getBoundingClientRect();
      const radius = rect.width / 2;
      const centerX = rect.left + radius;
      const centerY = rect.top + radius;
      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;

      return (deltaX * deltaX) + (deltaY * deltaY) <= radius * radius;
    };

    logoCircle.addEventListener('pointermove', (event) => {
      logoPointerInside = isEventInsideCircle(event);
      syncLogoState();
    });

    logoCircle.addEventListener('pointerleave', () => {
      logoPointerInside = false;
      syncLogoState();
    });

    if (sidebarToggle) {
      syncDesktopSidebarMode();
      syncSidebarToggleLabel();
      sidebarToggle.addEventListener('click', () => {
        if (!isDesktopSidebar()) {
          syncDesktopSidebarMode();
          return;
        }

        document.body.classList.toggle('sidebar-collapsed');
        syncSidebarToggleLabel();
        logoPointerInside = false;
        syncLogoState();
      });
    }

    if (brandLink) {
      brandLink.addEventListener('click', (event) => {
        if (!isSidebarCollapsed() || !isDesktopSidebar()) return;

        event.preventDefault();
        document.body.classList.remove('sidebar-collapsed');
        syncSidebarToggleLabel();
        syncLogoState();
        brandLink.blur();
      });
    }

    if (typeof desktopSidebarQuery.addEventListener === 'function') {
      desktopSidebarQuery.addEventListener('change', syncDesktopSidebarMode);
    } else if (typeof desktopSidebarQuery.addListener === 'function') {
      desktopSidebarQuery.addListener(syncDesktopSidebarMode);
    }
  } else if (sidebarToggle) {
    const syncDesktopSidebarMode = () => {
      if (!isDesktopSidebar()) {
        document.body.classList.remove('sidebar-collapsed');
      }

      syncSidebarToggleLabel();
    };

    syncDesktopSidebarMode();
    syncSidebarToggleLabel();
    sidebarToggle.addEventListener('click', () => {
      if (!isDesktopSidebar()) {
        syncDesktopSidebarMode();
        return;
      }

      document.body.classList.toggle('sidebar-collapsed');
      syncSidebarToggleLabel();
    });

    if (typeof desktopSidebarQuery.addEventListener === 'function') {
      desktopSidebarQuery.addEventListener('change', syncDesktopSidebarMode);
    } else if (typeof desktopSidebarQuery.addListener === 'function') {
      desktopSidebarQuery.addListener(syncDesktopSidebarMode);
    }
  }

  on('click', '.scrollto', function(e) {
    if (!select(this.hash)) return;

    e.preventDefault();

    const body = select('body');
    if (body.classList.contains('mobile-nav-active')) {
      body.classList.remove('mobile-nav-active');
      const navbarToggle = select('.mobile-nav-toggle');
      if (navbarToggle) {
        navbarToggle.classList.toggle('bi-list');
        navbarToggle.classList.toggle('bi-x');
      }
    }

    scrollto(this.hash);
  }, true);

  onWindowReady(() => {
    if (window.location.hash && select(window.location.hash)) {
      scrollto(window.location.hash);
    }
  });

  const typed = select('.typed');
  if (typed && typeof Typed !== 'undefined') {
    const typedStrings = typed.getAttribute('data-typed-items').split(',');
    new Typed('.typed', {
      strings: typedStrings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  const pureCounters = select('.purecounter', true);
  if (pureCounters.length > 0) {
    const animateCounter = (counter) => {
      const start = Number(counter.getAttribute('data-purecounter-start') || 0);
      const end = Number(counter.getAttribute('data-purecounter-end') || 0);
      const duration = Number(counter.getAttribute('data-purecounter-duration') || 1) * 1000;
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(start + ((end - start) * progress));
        counter.textContent = value;

        if (progress < 1) {
          window.requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = end;
        }
      };

      window.requestAnimationFrame(updateCounter);
    };

    if ('IntersectionObserver' in window) {
      const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      }, {
        threshold: 0.5
      });

      pureCounters.forEach((counter) => {
        counterObserver.observe(counter);
      });
    } else {
      pureCounters.forEach((counter) => {
        animateCounter(counter);
      });
    }
  }

  const skillsContent = select('.skills-content');
  if (skillsContent) {
    const skillProgressBars = select('.skills .progress', true);
    const animateSkills = () => {
      if (skillsContent.dataset.animated === 'true') return;

      skillsContent.dataset.animated = 'true';
      skillProgressBars.forEach((skillItem, index) => {
        const progressBar = skillItem.querySelector('.progress-bar');
        const valueLabel = skillItem.querySelector('.val');
        if (!progressBar || !valueLabel) return;

        const targetValue = Number(progressBar.getAttribute('aria-valuenow') || 0);
        const duration = 1100 + (index * 45);
        const startTime = performance.now();

        progressBar.style.width = '0%';
        valueLabel.textContent = '0%';

        const updateSkillProgress = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          const currentValue = Math.round(targetValue * easedProgress);

          progressBar.style.width = `${targetValue * easedProgress}%`;
          valueLabel.textContent = `${currentValue}%`;

          if (progress < 1) {
            window.requestAnimationFrame(updateSkillProgress);
          } else {
            progressBar.style.width = `${targetValue}%`;
            valueLabel.textContent = `${targetValue}%`;
          }
        };

        window.requestAnimationFrame(updateSkillProgress);
      });
    };

    skillProgressBars.forEach((skillItem) => {
      const valueLabel = skillItem.querySelector('.val');
      const progressBar = skillItem.querySelector('.progress-bar');
      if (!valueLabel || !progressBar) return;

      valueLabel.textContent = '0%';
      progressBar.style.width = '0%';
    });

    if ('IntersectionObserver' in window) {
      const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          animateSkills();
          observer.unobserve(entry.target);
        });
      }, {
        threshold: 0.35
      });

      skillsObserver.observe(skillsContent);
    } else if (typeof Waypoint !== 'undefined') {
      new Waypoint({
        element: skillsContent,
        offset: '80%',
        handler: function() {
          animateSkills();
          this.destroy();
        }
      });
    } else {
      animateSkills();
    }
  }

  onWindowReady(() => {
    const portfolioContainer = select('.portfolio-container');
    if (!portfolioContainer || typeof Isotope === 'undefined') return;

    const portfolioIsotope = new Isotope(portfolioContainer, {
      itemSelector: '.portfolio-item'
    });

    const portfolioFilters = select('#portfolio-flters li', true);
    on('click', '#portfolio-flters li', function(e) {
      e.preventDefault();
      portfolioFilters.forEach((el) => {
        el.classList.remove('filter-active');
      });
      this.classList.add('filter-active');

      portfolioIsotope.arrange({
        filter: this.getAttribute('data-filter')
      });

      portfolioIsotope.on('arrangeComplete', () => {
        if (typeof AOS !== 'undefined') {
          AOS.refresh();
        }
      });
    }, true);
  });

  if (typeof GLightbox !== 'undefined') {
    GLightbox({
      selector: '.portfolio-lightbox'
    });
  }

  if (select('.portfolio-details-slider') && typeof Swiper !== 'undefined') {
    new Swiper('.portfolio-details-slider', {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });
  }

  if (select('.testimonials-slider') && typeof Swiper !== 'undefined') {
    new Swiper('.testimonials-slider', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      }
    });
  }

  onWindowReady(() => {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  });

  const themeButton = document.getElementById('btnSwitchCss');
  const themeStylesheet = document.querySelector('link[href="assets/css/style.css"], link[href="assets/css/light.css"]');
  const heroSection = document.getElementById('hero');
  const aboutSection = document.getElementById('about');
  const heroFadeElements = document.querySelectorAll('.hero-scroll, .scrolldown, .chevrondown');

  const setThemeIcon = (isLightTheme) => {
    if (!themeButton) return;

    themeButton.classList.toggle('bi-sun', !isLightTheme);
    themeButton.classList.toggle('bi-moon', isLightTheme);
  };

  const updateHeroOpacity = () => {
    const opacity = Math.max(0, 1 - (window.scrollY / 650));
    heroFadeElements.forEach((element) => {
      element.style.opacity = opacity;
    });
  };

  const updateSidebarRevealProgress = () => {
    if (!heroSection || !aboutSection) {
      document.body.style.setProperty('--hero-sidebar-progress', '1');
      document.body.classList.remove('hero-sidebar-hidden');
      return;
    }

    const revealStart = heroSection.offsetTop + (heroSection.offsetHeight * 0.42);
    const revealEnd = Math.max(revealStart + 1, aboutSection.offsetTop - (window.innerHeight * 0.12));
    const progress = Math.max(0, Math.min(1, (window.scrollY - revealStart) / (revealEnd - revealStart)));

    document.body.style.setProperty('--hero-sidebar-progress', progress.toFixed(3));
    document.body.classList.toggle('hero-sidebar-hidden', progress < 0.08);
  };

  if (themeButton && themeStylesheet) {
    let isLightTheme = themeStylesheet.getAttribute('href') === 'assets/css/light.css';
    setThemeIcon(isLightTheme);

    themeButton.addEventListener('click', () => {
      isLightTheme = !isLightTheme;
      themeStylesheet.setAttribute('href', isLightTheme ? 'assets/css/light.css' : 'assets/css/style.css');
      setThemeIcon(isLightTheme);
    });
  }

  if (heroFadeElements.length > 0) {
    updateHeroOpacity();
    window.addEventListener('scroll', updateHeroOpacity, { passive: true });
  }

  updateSidebarRevealProgress();
  window.addEventListener('scroll', updateSidebarRevealProgress, { passive: true });
  window.addEventListener('resize', updateSidebarRevealProgress);
};

waitForSections()
  .then(() => {
    initPortfolioApp();
  })
  .catch((error) => {
    console.error('Page initialization failed:', error);
  });
