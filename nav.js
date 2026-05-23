/* ============================================================
   HROPIBERHTAZ — Shared JS (nav.js)
   Include on every page: <script src="nav.js"></script>
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. Inject animated background ─────────────────────── */
  function injectBackground() {
    const canvas = document.createElement('div');
    canvas.className = 'bg-canvas';
    canvas.innerHTML = `
      <div class="bg-grid"></div>
      <div class="bg-scan"></div>
      <div class="bg-orb"></div>
      <div class="bg-orb"></div>
      <div class="bg-orb"></div>
    `;
    document.body.insertAdjacentElement('afterbegin', canvas);
  }

  /* ── 2. Tool definitions ────────────────────────────────── */
  const TOOLS = [
    { label: 'ColorDrop', href: 'colordrop.html', id: 'colordrop' },
    { label: 'HUE',       href: 'hue.html',       id: 'hue'       },
    { label: 'Chroma',    href: 'chroma.html',     id: 'chroma'    },
    { label: 'UpScale',   href: 'upscale.html',    id: 'upscale'   },
    { label: 'URLClean',  href: 'urlclean.html',   id: 'urlclean'  },
  ];

  function homeHref() {
    return 'index.html';
  }

  /* ── 3. Build nav ───────────────────────────────────────── */
  function buildNav() {
    const path = window.location.pathname;
    const currentId = TOOLS.find(t => path.includes(t.id))?.id ?? 'home';

    const linksHTML = TOOLS.map(t => {
      const active = currentId === t.id ? ' class="active"' : '';
      return `<li><a href="${t.href}"${active}>${t.label}</a></li>`;
    }).join('');

    const drawerHTML = TOOLS.map(t => {
      const active = currentId === t.id ? ' class="active"' : '';
      return `<a href="${t.href}"${active}>${t.label}</a>`;
    }).join('');

    const nav = document.createElement('nav');
    nav.className = 'nav';
    nav.setAttribute('role', 'navigation');
    nav.innerHTML = `
      <a class="nav-logo" href="${homeHref()}">
        HROPI<span>BERHTAZ</span>
      </a>
      <ul class="nav-links">${linksHTML}</ul>
      <button class="nav-theme-toggle" id="themeToggle" aria-label="Toggle theme">☀</button>
      <button class="nav-burger" id="navBurger" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    `;

    const drawer = document.createElement('div');
    drawer.className = 'nav-drawer';
    drawer.id = 'navDrawer';
    drawer.innerHTML = drawerHTML;

    document.body.insertAdjacentElement('afterbegin', drawer);
    document.body.insertAdjacentElement('afterbegin', nav);
  }

  /* ── 4. Mobile burger toggle ────────────────────────────── */
  function initBurger() {
    const burger = document.getElementById('navBurger');
    const drawer = document.getElementById('navDrawer');
    if (!burger || !drawer) return;
    burger.addEventListener('click', () => {
      const open = drawer.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
    });
    document.addEventListener('click', e => {
      if (!burger.contains(e.target) && !drawer.contains(e.target)) {
        drawer.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── 5. Theme toggle (light/dark) ───────────────────────── */
  function initTheme() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;

    const saved = localStorage.getItem('hb-theme');
    if (saved === 'light') applyLight();

    btn.addEventListener('click', () => {
      const isLight = document.documentElement.classList.toggle('light');
      localStorage.setItem('hb-theme', isLight ? 'light' : 'dark');
      btn.textContent = isLight ? '☽' : '☀';
    });
  }

  function applyLight() {
    document.documentElement.classList.add('light');
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = '☽';
  }

  /* ── 6. Inject page wrapper ─────────────────────────────── */
  function wrapPage() {
    let page = document.getElementById('page');
    if (!page) {
      page = document.createElement('div');
      page.id = 'page';
      const toMove = Array.from(document.body.children).filter(el =>
        !el.classList.contains('bg-canvas') &&
        !el.classList.contains('nav') &&
        !el.classList.contains('nav-drawer')
      );
      toMove.forEach(el => page.appendChild(el));
      document.body.appendChild(page);
    }
  }

  /* ── 7. Inject footer ───────────────────────────────────── */
  function injectFooter() {
    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = `
      <div class="footer-logo">HROPI<span>BERHTAZ</span></div>
      <ul class="footer-links">
        ${TOOLS.map(t => `<li><a href="${t.href}">${t.label}</a></li>`).join('')}
      </ul>
      <p class="footer-copy">© 2026 · All rights reserved</p>
    `;
    document.getElementById('page')?.appendChild(footer);
  }

  /* ── 8. Boot ────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    injectBackground();
    buildNav();
    wrapPage();
    injectFooter();
    initBurger();
    initTheme();
  });

})();
