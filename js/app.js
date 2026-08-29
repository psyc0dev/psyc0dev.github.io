/**
 * Altitude / psyc0dev — Main Application Orchestrator
 * Bootstraps GSAP animations, Lucide icons, and interactive filters.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize GSAP & Lucide Animations
  let animations = null;
  if (typeof AnimationController !== 'undefined') {
    animations = new AnimationController();
  }

  // 2. Project Filtering Chips
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

  // 3. Contact Form Handler
  // Paste your deployed worker URL here (see cloudflare-worker/README.md).
  // While it is empty, submitting the form opens the visitor's mail client.
  const CONTACT_ENDPOINT = 'https://psyc0dev-contact.psyc0dev.workers.dev/submit';

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const label = btn ? btn.querySelector('span') : null;
      const t = window.__t || ((ru, en) => en);

      const payload = {
        name: (document.getElementById('contact-name')?.value || '').trim(),
        email: (document.getElementById('contact-email')?.value || '').trim(),
        telegram: (document.getElementById('contact-telegram')?.value || '')
          .trim()
          .replace(/^@+/, ''),
        message: (document.getElementById('contact-message')?.value || '').trim(),
        _gotcha: document.getElementById('contact-gotcha')?.value || '',
      };

      const finish = (msg) => {
        if (animations) animations.showToast(msg);
        if (label) label.textContent = t('Отправить', 'Send Message');
        if (btn) btn.disabled = false;
      };

      if (label) label.textContent = t('Отправка...', 'Sending...');
      if (btn) btn.disabled = true;

      try {
        if (!CONTACT_ENDPOINT) {
          // No worker configured yet: hand the message to the mail client.
          const tg = payload.telegram ? '\nTelegram: @' + payload.telegram : '';
          const subject = encodeURIComponent('Portfolio message from ' + payload.name);
          const body = encodeURIComponent(
            payload.message + tg + '\n\nFrom: ' + payload.name + ' <' + payload.email + '>'
          );
          window.location.href =
            'mailto:psyc0dev.main@gmail.com?subject=' + subject + '&body=' + body;
          finish(t('Открываю почту...', 'Opening your mail client...'));
          return;
        }

        const res = await fetch(CONTACT_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const out = await res.json().catch(() => ({}));
        if (res.ok && out.ok) {
          finish(t('Сообщение отправлено!', 'Message sent!'));
          contactForm.reset();
        } else {
          finish(
            t('Не отправилось: ' + (out.error || 'server error'), 'Failed: ' + (out.error || 'server error'))
          );
        }
      } catch (err) {
        finish(t('Ошибка сети. Напишите на почту.', 'Network error. Email me instead.'));
      }
    });
  }

  // 4. CS2 cheat preview: tap toggle (touch) + outside/Escape close
  const cs2Preview = document.querySelector('.hover-preview');
  if (cs2Preview) {
    cs2Preview.addEventListener('click', (e) => {
      if (cs2Preview.classList.contains('no-img')) return;
      e.stopPropagation();
      cs2Preview.classList.toggle('tapped');
    });
    document.addEventListener('click', (e) => {
      if (!cs2Preview.contains(e.target)) cs2Preview.classList.remove('tapped');
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') cs2Preview.classList.remove('tapped');
    });
    // if menu.png is missing, hide the hover affordance entirely
    document.addEventListener(
      'error',
      (e) => {
        const img = e.target;
        if (
          img &&
          img.classList &&
          img.classList.contains('hover-preview-img')
        ) {
          const host = img.closest('.hover-preview');
          if (host) host.classList.add('no-img');
        }
      },
      true
    );
  }
});
