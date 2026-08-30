
(function () {
  const STORAGE_KEY = 'psyc0dev-lang';
  const TITLES = { en: 'psyc0dev | Portfolio', ru: 'psyc0dev | Портфолио' };

  const RU = [

    { s: '.nav-links a[href="#focus"]', t: 'Что я делаю' },
    { s: '.nav-links a[href="#projects"]', t: 'Проекты' },
    { s: '.nav-links a[href="#stack"]', t: 'Стек' },
    { s: '.nav-links a[href="#about"]', t: 'Обо мне' },
    { s: '.nav-links a[href="#contact"]', t: 'Контакты' },
    { s: '.nav-action .btn-ghost span', t: 'Контакты' },
    { s: '.mobile-nav-link[href="#focus"] span', t: 'Что я делаю' },
    { s: '.mobile-nav-link[href="#projects"] span', t: 'Избранные проекты' },
    { s: '.mobile-nav-link[href="#stack"] span', t: 'Технологии' },
    { s: '.mobile-nav-link[href="#about"] span', t: 'Обо мне' },
    { s: '.mobile-cta-link span', t: 'Написать мне' },
    { s: '.hero-cta-group .btn-inverse span', t: 'Мои проекты' },
    { s: '.hero-cta-group .btn-ghost span', t: 'Картинки' },
    { s: '.footer-col a[href="#focus"]', t: 'Что я делаю' },
    { s: '.footer-col a[href="#projects"]', t: 'Проекты' },
    { s: '.footer-col a[href="#stack"]', t: 'Стек' },
    { s: '.footer-col a[href="#about"]', t: 'Обо мне' },
    { s: '.footer-col a[href="#contact"]', t: 'Контакты' },

    { s: '.hero-headline', h: 'Привет, я psyc0dev. Делаю быстрый и точный софт для веба и десктопа.' },
    { s: '.hero-subhead', h: 'Мои проекты: кроссплатформенные десктоп-приложения на <strong>Tauri</strong> и <strong>Rust</strong>, фулстек-веб-платформы на <strong>TypeScript</strong> и <strong>Vite</strong>, а ещё Telegram-боты и бэкенды под них.' },

    { s: '#focus .section-title', h: 'Что я делаю' },
    { s: '#focus .section-subhead', h: 'Я собираю десктоп-приложения и веб-платформы, пишу ботов и разбираюсь в системах, которые за ними стоят.' },
    { s: '#focus .workflow-tile:nth-child(1) .workflow-tile-label', t: 'Веб-приложения и платформы' },
    { s: '#focus .workflow-tile:nth-child(2) .workflow-tile-label', t: 'Десктоп-приложения на Tauri + Rust' },
    { s: '#focus .workflow-tile:nth-child(3) .workflow-tile-label', t: 'Telegram-боты и автоматизация' },
    { s: '#focus .workflow-tile:nth-child(4) .workflow-tile-label', t: 'API и бэкенд-системы' },
    { s: '#focus .workflow-tile:nth-child(5) .workflow-tile-label', t: 'Производительность и системная разработка' },

    { s: '#projects .section-title', h: 'Избранные проекты' },
    { s: '#projects .section-subhead', h: 'Это проекты, которые я выпустил. Каждая карточка ведёт в репозиторий на GitHub.' },
    { s: '#projects .project-card:nth-of-type(1) .project-card-header .project-tag', t: 'ДЕСКТОП + ВЕБ' },
    { s: '#projects .project-card:nth-of-type(2) .project-card-header .project-tag', t: 'ОТКРЫТЫЙ КОД' },
    { s: '#projects .project-card:nth-of-type(3) .project-card-header .project-tag', t: 'ФОРК + АПДЕЙТЫ' },
    { s: '#projects .project-card:nth-of-type(4) .project-card-header .project-tag', t: 'ОТКРЫТЫЙ КОД' },
    { s: '#projects .project-card:nth-of-type(5) .project-card-header .project-tag', t: 'АВТОМАТИЗАЦИЯ' },
    { s: '#projects .project-card:nth-of-type(6) .project-card-header .project-tag', t: 'ТУЛИНГ' },
    { s: '#projects .project-card:nth-of-type(1) .project-desc', h: 'Платформа подготовки к IELTS: тренировочные тесты на время, ИИ-оценка письма, словарь и группы с преподавателем. Один React-фронтенд и один Hono-бэкенд собираются и в Tauri 2-приложение, и в веб-версию на Cloudflare Workers.' },
    { s: '#projects .project-card:nth-of-type(2) .project-desc', h: 'Go-тулкит безопасности для Windows: находит отладчики, виртуалки и DLL-инъекции и заметно осложняет реверс-инжиниринг. Ставится в проект одним go get.' },
    { s: '#projects .project-card:nth-of-type(3) .project-desc', h: 'API-прокси, совместимый с Anthropic, поверх AWS CodeWhisperer от Kiro. Мой форк добавляет поддержку tools и новые модели Claude, так что Claude Code CLI и любой Anthropic-совместимый клиент работают без изменений.' },
    { s: '#projects .project-card:nth-of-type(4) .project-desc', h: 'Плагин-миниигра для Paper-серверов (API 1.21): лобби, жизненный цикл матча и админ-команды. Чистая Java.' },
    { s: '#projects .project-card:nth-of-type(5) .project-desc', h: 'Telegram-бот, который скачивает видео с YouTube. Отправляешь ссылку, получаешь файл. Никакой рекламы и трекинга.' },
    { s: '#projects .project-card:nth-of-type(6) .project-desc', h: 'Чекер прокси с массовой проверкой. Валидирует живые прокси, чтобы у моих ботов и парсеров был чистый пул.' },
    { s: 'a.project-link-btn[target="_blank"]', t: 'Исходники' },
    { s: 'a.project-link-btn[href="#stack"]', t: 'Смотреть стек' },

    { s: '#stack .section-title', h: 'Технологии' },
    { s: '#stack .section-subhead', h: 'Языки, фреймворки и инструменты, которые я использую, и насколько я в каждом уверен.' },
    { s: '.data-table thead th:nth-child(1)', t: 'Домен' },
    { s: '.data-table thead th:nth-child(2)', t: 'Технологии и инструменты' },
    { s: '.data-table thead th:nth-child(3)', t: 'Для чего использую' },
    { s: '.data-table thead th:nth-child(4)', t: 'Уровень' },
    { s: '.data-table tbody tr:nth-child(1) td:nth-child(1)', t: 'Десктоп-приложения' },
    { s: '.data-table tbody tr:nth-child(2) td:nth-child(1)', t: 'Фронтенд и веб' },
    { s: '.data-table tbody tr:nth-child(3) td:nth-child(1)', t: 'Бэкенд и облако' },
    { s: '.data-table tbody tr:nth-child(4) td:nth-child(1)', t: 'Боты и автоматизация' },
    { s: '.data-table tbody tr:nth-child(5) td:nth-child(1)', t: 'Системы и производительность' },
    { s: '.data-table tbody tr:nth-child(1) td:nth-child(3)', t: 'Кроссплатформенные приложения из одной кодовой базы' },
    { s: '.data-table tbody tr:nth-child(2) td:nth-child(3)', t: 'Сайты, магазины, дашборды, интерактивные интерфейсы' },
    { s: '.data-table tbody tr:nth-child(3) td:nth-child(3)', t: 'API, real-time сервисы, деплой на edge' },
    { s: '.data-table tbody tr:nth-child(4) td:nth-child(3)', t: 'Магазин-боты, платежи, чекеры, тулинг' },
    { s: '.data-table tbody tr:nth-child(5) td:nth-child(3)', t: 'Нативный тулинг, сжатие, бенчмарки' },
    { s: '.data-table tbody tr:nth-child(1) td:nth-child(4) .project-tag', t: 'КАЖДЫЙ ДЕНЬ' },
    { s: '.data-table tbody tr:nth-child(2) td:nth-child(4) .project-tag', t: 'УВЕРЕННО' },
    { s: '.data-table tbody tr:nth-child(3) td:nth-child(4) .project-tag', t: 'УВЕРЕННО' },
    { s: '.data-table tbody tr:nth-child(4) td:nth-child(4) .project-tag', t: 'КАЖДЫЙ ДЕНЬ' },
    { s: '.data-table tbody tr:nth-child(5) td:nth-child(4) .project-tag', t: 'УВЕРЕННО' },

    { s: '#about .section-title', h: 'Обо мне' },
    { s: '#about .section-subhead', h: 'Почему этот сайт выглядит именно так.' },
    { s: '#about .feature-lead:nth-of-type(1)', h: 'Большинство проектов я делаю, потому что хочу сделать жизнь людей лучше, и воссоздаю миниигры и плагины из детства. Скоро могу выложить исходники <span class="hover-preview" tabindex="0">CS2-чита<img class="hover-preview-img" src="assets/menu.png" alt="" loading="lazy" /></span>, написанного в этом году.' },
    { s: '#about .btn-ghost span', t: 'Написать мне' },
    { s: '#about .form-card .sidebar-label', t: 'КОРОТКО О ГЛАВНОМ' },
    { s: '#about .form-card .font-mono div:nth-child(1)', h: '<span class="text-voltage">ФОКУС:</span> веб · десктоп · боты' },
    { s: '#about .form-card .font-mono div:nth-child(2)', h: '<span class="text-voltage">СТЕК:</span> TypeScript · Rust · Go · Python' },
    { s: '#about .form-card .font-mono div:nth-child(3)', h: '<span class="text-voltage">САЙТ:</span> собран вручную, без фреймворков' },
    { s: '#about .form-card .font-mono div:nth-child(4)', h: '<span class="text-voltage">ЛИЦЕНЗИЯ:</span> MIT, код открыт' },
    { s: '#about .form-card .font-mono div:nth-child(5)', h: '<span class="text-voltage">СТАТУС:</span> открыт к интересным проектам' },

    { s: '#contact .section-title', h: 'Контакты' },
    { s: '#contact .section-subhead', h: 'Хотите начать проект или поболтать? Пишите на почту.' },
    { s: '#contact .feature-copy .feature-lead', h: 'Расскажите про веб-приложение, десктоп-тул или системную задачу, которую нужно решить. Лучше всего через Telegram. Форма приходит на Телеграм.' },
    { s: '#contact .feature-copy label.form-label', t: 'ПОЧТА:' },
    { s: '#contact-form label[for="contact-name"]', t: 'Ваше имя' },
    { s: '#contact-form label[for="contact-email"]', t: 'Почта' },
    { s: '#contact-form label[for="contact-telegram"]', t: 'Телеграм (необязательно)' },
    { s: '#contact-form label[for="contact-message"]', t: 'Сообщение' },
    { s: '#contact-name', ph: 'Иван Иванов' },
    { s: '#contact-message', ph: 'Расскажите о проекте, сроках или идее...' },
    { s: '#contact-form button span', t: 'Отправить' },

    { s: '.footer-cols .footer-col:nth-child(1) .sidebar-label', t: 'РАЗДЕЛЫ' },
    { s: '.footer-cols .footer-col:nth-child(2) .sidebar-label', t: 'ПРОЧЕЕ' },
    { s: '.footer-bottom > span', h: '© 2026 <strong>psyc0dev</strong>. <span class="footer-hand">Спроектировано и собрано вручную, без фреймворков.</span> <span class="footer-mit">Лицензия MIT</span>' },
    { s: '.back-to-top span', t: 'Наверх' },
  ];

  let captured = null;
  let current = 'en';
  let animating = false;

  function capture() {
    captured = [];
    for (const rule of RU) {
      document.querySelectorAll(rule.s).forEach((el) => {
        captured.push({
          el,
          html: el.innerHTML,
          placeholder: el.getAttribute('placeholder'),
        });
      });
    }
  }

  function swapText(el, text) {

    const nodes = Array.from(el.childNodes).filter(
      (n) => n.nodeType === 3 && n.textContent.trim()
    );
    if (nodes.length) {
      nodes[nodes.length - 1].textContent = text;
    } else {
      el.textContent = text;
    }
  }

  function textSwap(lang) {
    if (lang === 'en') {
      for (const c of captured) {
        c.el.innerHTML = c.html;
        if (c.placeholder !== null) c.el.setAttribute('placeholder', c.placeholder);
      }
    } else {
      for (const rule of RU) {
        document.querySelectorAll(rule.s).forEach((el) => {
          if (rule.h !== undefined) el.innerHTML = rule.h;
          else if (rule.t !== undefined) swapText(el, rule.t);
          else if (rule.ph !== undefined) el.setAttribute('placeholder', rule.ph);
        });
      }
    }
  }

  function animateTextSwap(lang) {
    const reduced =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (typeof gsap === 'undefined') {
      textSwap(lang);
      return;
    }

    const els = new Set();
    for (const rule of RU) {
      document.querySelectorAll(rule.s).forEach((el) => els.add(el));
    }
    const list = Array.from(els);
    if (!list.length) {
      textSwap(lang);
      return;
    }

    animating = true;

    if (reduced) {
      gsap.to(list, {
        opacity: 0,
        duration: 0.2,
        ease: 'power1.out',
        onComplete: () => {
          textSwap(lang);
          gsap.to(list, {
            opacity: 1,
            duration: 0.35,
            ease: 'power1.in',
            clearProps: 'opacity',
            onComplete: () => {
              animating = false;
            },
          });
        },
      });
      return;
    }

    gsap.to(list, {
      opacity: 0,
      y: 12,
      duration: 0.3,
      stagger: 0.004,
      ease: 'power2.in',
      onComplete: () => {
        textSwap(lang);
        gsap.fromTo(
          list,
          { opacity: 0, y: -12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.006,
            ease: 'power3.out',
            clearProps: 'opacity,transform',
            onComplete: () => {
              animating = false;
            },
          }
        );
      },
    });
  }

  function apply(lang, animate = true) {
    if (animating) return;
    current = lang;
    window.__lang = lang;
    document.documentElement.lang = lang;
    document.title = TITLES[lang];

    document.querySelectorAll('.lang-option').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    document.querySelectorAll('.lang-toggle-label').forEach((el) => {
      el.textContent = lang.toUpperCase();
    });
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {

    }

    if (animate) animateTextSwap(lang);
    else textSwap(lang);

    window.dispatchEvent(new CustomEvent('psyc0dev:lang'));
  }

  window.__t = (ru, en) => (current === 'ru' ? ru : en);

  document.addEventListener('DOMContentLoaded', () => {
    capture();

    let saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch (e) {

    }
    const initial =
      saved === 'ru' || saved === 'en'
        ? saved
        : (navigator.language || '').toLowerCase().startsWith('ru')
          ? 'ru'
          : 'en';
    if (initial !== 'en') apply(initial, false);

    document.querySelectorAll('.lang-option').forEach((btn) => {
      btn.addEventListener('click', () => apply(btn.dataset.lang));
    });
    document.querySelectorAll('.lang-toggle').forEach((btn) => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('flipped');
        apply(current === 'en' ? 'ru' : 'en');
      });
    });
  });
})();
