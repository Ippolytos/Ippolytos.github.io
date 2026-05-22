/* ============================================================
   HROPIBERHTAZ — Shared JS (nav.js)
   Include on every page: <script src="../nav.js"></script>
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

  /* ── 2. Inject navigation ───────────────────────────────── */
  const TOOLS = [
    { label: 'ColorDrop', href: 'tools/colordrop.html', id: 'colordrop' },
    { label: 'HUE',       href: 'tools/hue.html',       id: 'hue'       },
    { label: 'Chroma',    href: 'tools/chroma.html',     id: 'chroma'    },
    { label: 'UpScale',   href: 'tools/upscale.html',    id: 'upscale'   },
    { label: 'URLClean',  href: 'tools/urlclean.html',   id: 'urlclean'  },
  ];

  function resolveHref(raw) {
    // Works whether called from root (index.html) or from tools/xxx.html
    const depth = window.location.pathname.split('/').filter(Boolean).length;
    const inTools = window.location.pathname.includes('/tools/');
    if (inTools) {
      // We're already in tools/ — strip 'tools/' prefix
      return raw.replace('tools/', '');
    }
    return raw;
  }

  function homeHref() {
    return window.location.pathname.includes('/tools/') ? '../index.html' : 'index.html';
  }

  function buildNav() {
    // Detect current page
    const path = window.location.pathname;
    const currentId = TOOLS.find(t => path.includes(t.id))?.id ?? 'home';

    const linksHTML = TOOLS.map(t => {
      const href = resolveHref(t.href);
      const active = currentId === t.id ? ' class="active"' : '';
      return `<li><a href="${href}"${active}>${t.label}</a></li>`;
    }).join('');

    const drawerHTML = TOOLS.map(t => {
      const href = resolveHref(t.href);
      const active = currentId === t.id ? ' class="active"' : '';
      return `<a href="${href}"${active}>${t.label}</a>`;
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

  /* ── 3. Mobile burger toggle ────────────────────────────── */
  function initBurger() {
    const burger = document.getElementById('navBurger');
    const drawer = document.getElementById('navDrawer');
    if (!burger || !drawer) return;
    burger.addEventListener('click', () => {
      const open = drawer.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
    });
    // Close on outside click
    document.addEventListener('click', e => {
      if (!burger.contains(e.target) && !drawer.contains(e.target)) {
        drawer.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── 4. Theme toggle (light/dark) ───────────────────────── */
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

  /* ── 5. Inject page wrapper ─────────────────────────────── */
  function wrapPage() {
    // Ensure a #page div exists wrapping everything inside body (after nav/bg)
    let page = document.getElementById('page');
    if (!page) {
      page = document.createElement('div');
      page.id = 'page';
      // Move all direct children that aren't .bg-canvas/.nav/.nav-drawer into #page
      const toMove = Array.from(document.body.children).filter(el =>
        !el.classList.contains('bg-canvas') &&
        !el.classList.contains('nav') &&
        !el.classList.contains('nav-drawer')
      );
      toMove.forEach(el => page.appendChild(el));
      document.body.appendChild(page);
    }
  }

  /* ── 6. Inject footer ───────────────────────────────────── */
  function injectFooter() {
    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = `
      <div class="footer-logo">HROPI<span>BERHTAZ</span></div>
      <ul class="footer-links">
        ${TOOLS.map(t => `<li><a href="${resolveHref(t.href)}">${t.label}</a></li>`).join('')}
      </ul>
      <p class="footer-copy">© 2026 · All rights reserved</p>
    `;
    document.getElementById('page')?.appendChild(footer);
  }

  /* ── 7. Boot ────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    injectBackground();
    buildNav();
    wrapPage();
    injectFooter();
    initBurger();
    initTheme();
  });

})();