/**
 * Altitude / psyc0dev — Main Application Orchestrator
 * Bootstraps Developer Terminal, GSAP animations, Lucide icons, and interactive filters.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Developer Terminal CLI
  let terminal = null;
  if (typeof DeveloperTerminal !== 'undefined') {
    terminal = new DeveloperTerminal('developer-terminal');
  }

  // 2. Initialize GSAP & Lucide Animations
  let animations = null;
  if (typeof AnimationController !== 'undefined') {
    animations = new AnimationController();
  }

  // 3. Project Filtering Chips
  const filterPills = document.querySelectorAll('.project-filter-pill');
  const projectCards = document.querySelectorAll('.project-card');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.dataset.filter;

      projectCards.forEach(card => {
        const category = card.dataset.category || 'all';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(card, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
          }
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Contact Form Handler
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const sender = document.getElementById('contact-name')?.value || 'Guest';
      const email = document.getElementById('contact-email')?.value || 'unknown@domain';
      const msg = document.getElementById('contact-message')?.value || '';

      if (animations) {
        animations.showToast(`Message dispatched from ${sender}! Check terminal log.`);
      }

      if (terminal) {
        terminal.execute(`echo [DISPATCH SUCCESS] Transmission from ${sender} (${email}) queued.`);
      }

      contactForm.reset();
    });
  }
});
