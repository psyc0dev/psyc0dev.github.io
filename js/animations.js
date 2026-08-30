/**
 * Altitude / psyc0dev — GSAP Timelines, ScrollTriggers & Lucide Micro-Animations
 * Midnight Financial Editorial Motion System with Dynamic Navbar Scrollspy
 */

class AnimationController {
  constructor() {
    this.initSmoothScroll();
    this.initMobileNav();
    this.initBrandLogo();
    this.initLucideIcons();
    this.initCopyButtons();
    this.initPageLoader(() => {
      this.onPageReady();
    });
  }

  onPageReady() {
    this.initHeroEntrance();
    this.initScrollTriggers();
    this.initScrollSpy();
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  }

  initBrandLogo() {
    const brandLogo = document.querySelector('.brand-logo');
    if (!brandLogo) return;

    brandLogo.addEventListener('click', (e) => {
      e.preventDefault();

      // 1. Reset URL to default without hash fragment
      if (window.location.hash) {
        history.pushState('', document.title, window.location.pathname + window.location.search);
      }

      // 2. Close mobile drawer if open
      const drawer = document.getElementById('mobile-nav-drawer');
      const toggleBtn = document.getElementById('mobile-menu-toggle');
      if (drawer && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden', 'true');
        drawer.style.display = 'none';
        if (toggleBtn) {
          toggleBtn.setAttribute('aria-expanded', 'false');
          if (typeof lucide !== 'undefined') {
            toggleBtn.innerHTML = `<i data-lucide="menu" class="anim-icon" style="width: 20px; height: 20px;"></i>`;
            lucide.createIcons();
          }
        }
      }

      // 3. Smooth scroll to the top of the page
      if (this.lenis) {
        this.lenis.scrollTo(0, {
          duration: 1.15,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }

      // 4. Reset active nav links
      document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        link.classList.remove('active');
      });

      // 5. Interactive brand glyph micro-animation
      if (typeof gsap !== 'undefined') {
        const glyph = brandLogo.querySelector('.brand-avatar, .brand-glyph, svg');
        if (glyph) {
          gsap.fromTo(glyph, 
            { rotate: 0, scale: 0.8 }, 
            { rotate: 360, scale: 1.1, duration: 0.7, ease: 'back.out(2)', onComplete: () => {
              gsap.to(glyph, { scale: 1, duration: 0.2 });
            }}
          );
        }
      }
    });
  }

  initMobileNav() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const drawer = document.getElementById('mobile-nav-drawer');
    const drawerLinks = document.querySelectorAll('.mobile-nav-link');

    if (!toggleBtn || !drawer) return;

    let isAnimating = false;

    const toggleDrawer = (open) => {
      const isOpen = open !== undefined ? open : !drawer.classList.contains('open');
      if (isAnimating && open === undefined) return;

      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      
      if (typeof lucide !== 'undefined') {
        toggleBtn.innerHTML = isOpen 
          ? `<i data-lucide="x" class="anim-icon" style="width: 20px; height: 20px;"></i>` 
          : `<i data-lucide="menu" class="anim-icon" style="width: 20px; height: 20px;"></i>`;
        lucide.createIcons();
      }

      if (isOpen) {
        drawer.classList.add('open');
        drawer.setAttribute('aria-hidden', 'false');
        drawer.style.display = 'flex';

        if (typeof gsap !== 'undefined') {
          isAnimating = true;
          gsap.killTweensOf([drawer, drawerLinks, '.mobile-nav-index', '.mobile-nav-link .anim-icon', '.mobile-nav-label', '.mobile-nav-arrow']);

          // Drawer slide and glass fade
          gsap.fromTo(drawer, 
            { y: -20, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.35, ease: 'power3.out' }
          );

          // Staggered luxury card tab slide-in with scale & blur
          gsap.fromTo(drawerLinks, 
            { y: 26, opacity: 0, scale: 0.94, filter: 'blur(6px)' }, 
            { 
              y: 0, 
              opacity: 1, 
              scale: 1, 
              filter: 'blur(0px)',
              stagger: 0.045, 
              duration: 0.42, 
              ease: 'power3.out',
              delay: 0.04,
              onComplete: () => { isAnimating = false; }
            }
          );

          // Index numbering slide
          gsap.fromTo('.mobile-nav-index',
            { x: -10, opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.045, duration: 0.36, ease: 'power2.out', delay: 0.08 }
          );

          // Icon spring punch
          gsap.fromTo('.mobile-nav-link .anim-icon', 
            { scale: 0.3, rotate: -25, opacity: 0 }, 
            { 
              scale: 1, 
              rotate: 0, 
              opacity: 1,
              stagger: 0.045, 
              duration: 0.48, 
              ease: 'back.out(2)',
              delay: 0.08 
            }
          );

          // Label reveal
          gsap.fromTo('.mobile-nav-label',
            { x: -6, opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.045, duration: 0.38, ease: 'power2.out', delay: 0.1 }
          );

          // Arrow slide
          gsap.fromTo('.mobile-nav-arrow',
            { x: -8, opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.045, duration: 0.35, ease: 'power2.out', delay: 0.12 }
          );
        }
      } else {
        drawer.setAttribute('aria-hidden', 'true');
        if (typeof gsap !== 'undefined') {
          isAnimating = true;
          gsap.killTweensOf([drawer, drawerLinks]);

          gsap.to(drawerLinks, {
            opacity: 0,
            y: -10,
            scale: 0.96,
            filter: 'blur(4px)',
            stagger: 0.02,
            duration: 0.18,
            ease: 'power2.in'
          });

          gsap.to(drawer, {
            y: -14,
            opacity: 0,
            duration: 0.22,
            ease: 'power2.in',
            onComplete: () => {
              drawer.classList.remove('open');
              drawer.style.display = 'none';
              isAnimating = false;
            }
          });
        } else {
          drawer.classList.remove('open');
          drawer.style.display = 'none';
        }
      }
    };

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDrawer();
    });

    drawerLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            toggleDrawer(false);
            this.navigateToTarget(target);
          }
        }
      });
    });

    // Close drawer on click outside
    document.addEventListener('click', (e) => {
      if (drawer.classList.contains('open') && !drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
        toggleDrawer(false);
      }
    });
  }

  navigateToTarget(target) {
    if (!target) return;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - 52;

    if (this.lenis) {
      this.lenis.scrollTo(targetTop, {
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
    }

    // Section transition animation
    if (typeof gsap !== 'undefined') {
      const sectionTitle = target.querySelector('.section-title, .hero-headline, h2, h1');
      if (sectionTitle) {
        gsap.fromTo(sectionTitle,
          { textShadow: '0 0 20px rgba(43, 127, 255, 0.9)', color: '#ffffff' },
          { textShadow: '0 0 0px rgba(43, 127, 255, 0)', color: '', duration: 1.2, ease: 'power2.out', delay: 0.3 }
        );
      }
    }
  }

  initSmoothScroll() {
    if (typeof Lenis === 'undefined') return;

    this.lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      infinite: false
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
      this.lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        this.lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (time) => {
        this.lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }

    // Intercept all internal anchor links for buttery-smooth Lenis scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href && href !== '#' && href.length > 1) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            this.lenis.scrollTo(target, {
              offset: -56,
              duration: 1.2,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
          }
        }
      });
    });

    // Footer back-to-top (fixed header can't be a scroll target, so scroll to 0 directly)
    document.querySelectorAll('.back-to-top').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.lenis) {
          this.lenis.scrollTo(0, {
            duration: 1.15,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });
  }

  initPageLoader(onComplete) {
    const loader = document.getElementById('page-loader');
    const player = document.getElementById('hello-lottie-player');

    if (!loader) {
      document.body.classList.remove('is-loading');
      if (onComplete) onComplete();
      return;
    }

    let isDismissed = false;

    const finishLoading = () => {
      if (isDismissed) return;
      isDismissed = true;

      loader.style.pointerEvents = 'none';
      window.scrollTo(0, 0);
      if (this.lenis) this.lenis.scrollTo(0, { immediate: true });

      // 1. Initialize component entrance immediately so initial state is hidden before reveal
      if (onComplete) onComplete();

      // 2. Remove is-loading so page becomes visible in animated state
      document.body.classList.remove('is-loading');

      if (typeof gsap !== 'undefined') {
        gsap.to('.loader-inner', {
          scale: 0.94,
          opacity: 0,
          y: -15,
          duration: 0.4,
          ease: 'power2.in'
        });

        gsap.to(loader, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => {
            loader.classList.add('dismissed');
            loader.style.display = 'none';
            if (loader.parentNode) {
              loader.parentNode.removeChild(loader);
            }
          }
        });
      } else {
        loader.classList.add('dismissed');
        loader.style.display = 'none';
        if (loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
      }
    };

    if (player) {
      // Listen for the animation complete event
      player.addEventListener('complete', () => {
        finishLoading();
      });

      player.addEventListener('ready', () => {
        try {
          const lottie = player.getLottie && player.getLottie();
          if (lottie) {
            lottie.addEventListener('complete', finishLoading);
          }
        } catch (err) {
          // ignore
        }
      });
    }
  }

  initHeroEntrance() {
    if (typeof gsap === 'undefined') return;

    gsap.killTweensOf(['.top-nav', '.hero-headline', '.hero-subhead', '.hero-cta-group > *', '.mountain-ridge-container']);

    // Hero Entrance Timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.top-nav', 
      { y: -30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.7 }
    )
    .fromTo('.hero-headline', 
      { y: 35, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.85, ease: 'power4.out' }, 
      '-=0.35'
    )
    .fromTo('.hero-subhead', 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.7 }, 
      '-=0.45'
    )
    .fromTo('.hero-cta-group > *', 
      { y: 16, opacity: 0 }, 
      { y: 0, opacity: 1, stagger: 0.12, duration: 0.55 }, 
      '-=0.35'
    )
    .fromTo('.mountain-ridge-container', 
      { opacity: 0, y: 15 }, 
      { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 
      '-=0.35'
    );
  }

  initScrollTriggers() {
    if (typeof gsap === 'undefined') return;

    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Workflow Tiles Stagger
      gsap.from('.workflow-tile', {
        scrollTrigger: {
          trigger: '.workflow-grid',
          start: 'top 80%'
        },
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out'
      });

      // Project Specimen Cards Stagger
      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 80%'
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out'
      });

      // Data Table Container reveal
      gsap.from('.data-table-container', {
        scrollTrigger: {
          trigger: '.data-table-container',
          start: 'top 85%'
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
      });
    }
  }

  initScrollSpy() {
    const nav = document.querySelector('.top-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    const onScroll = () => {
      const scrollY = window.scrollY;

      // 1. Dynamic navbar background & shadow on scroll
      if (nav) {
        if (scrollY > 20) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      }

      // 2. Highlight active nav link based on scroll position
      let currentSectionId = '';
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + scrollY - 90;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id');
        }
      });

      if (currentSectionId) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
          }
        });

        document.querySelectorAll('.mobile-nav-link').forEach(mLink => {
          mLink.classList.remove('active');
          if (mLink.getAttribute('href') === `#${currentSectionId}`) {
            mLink.classList.add('active');
          }
        });
      } else {
        // At the hero (before any section) nothing in the nav is highlighted.
        navLinks.forEach(link => link.classList.remove('active'));
        document.querySelectorAll('.mobile-nav-link').forEach(mLink => mLink.classList.remove('active'));
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Smooth scroll and immediate active state on click
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            this.navigateToTarget(target);
          }
        }
      });
    });
  }

  initLucideIcons() {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  initCopyButtons() {
    const snippetBoxes = document.querySelectorAll('.copy-snippet-box');
    snippetBoxes.forEach(box => {
      let revertTimer = null;

      const markCopied = () => {
        box.classList.add('copied');
        if (revertTimer) clearTimeout(revertTimer);
        revertTimer = setTimeout(() => box.classList.remove('copied'), 2000);
      };

      const legacyCopy = (text) => {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        let ok = false;
        try {
          ok = document.execCommand('copy');
        } catch (e) {
          ok = false;
        }
        document.body.removeChild(ta);
        return ok;
      };

      box.addEventListener('click', () => {
        const textToCopy =
          box.getAttribute('data-copy') || box.textContent.trim();
        const t = window.__t || ((ru, en) => en);

        const write = navigator.clipboard
          ? navigator.clipboard.writeText(textToCopy)
          : Promise.reject(new Error('no clipboard api'));

        write.then(() => {
          this.showToast(`${t('Скопировано: ', 'Copied to clipboard: "')}${textToCopy}${t('"', '"')}`);
          markCopied();
        }).catch(() => {
          if (legacyCopy(textToCopy)) {
            this.showToast(`${t('Скопировано: ', 'Copied to clipboard: "')}${textToCopy}${t('"', '"')}`);
            markCopied();
          } else {
            this.showToast(t('Скопировано!', 'Copied text!'));
          }
        });
      });
    });
  }

  showToast(message) {
    let toast = document.querySelector('.toast-msg');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-msg';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
}

window.AnimationController = AnimationController;
