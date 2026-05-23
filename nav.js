(function () {
  'use strict';
  const path = location.pathname.split('/').pop() || 'index.html';
  const PAGES = [
    { file: 'colordrop.html', label: 'ColorDrop' },
    { file: 'hue.html',       label: 'HUE'       },
    { file: 'chroma.html',    label: 'Chroma'    },
    { file: 'upscale.html',   label: 'UpScale'   },
    { file: 'urlclean.html',  label: 'URLClean'  },
  ];
  const nav = document.createElement('nav');
  nav.className = 'site-nav';
  nav.innerHTML = PAGES.map(p =>
    `<a class="nav-link${p.file === path ? ' active' : ''}" href="${p.file}">${p.label}</a>`
  ).join('');
  document.body.insertBefore(nav, document.body.firstChild);
  /* duplicate once — CSS -50% makes seamless infinite loop */
  document.querySelectorAll('.marquee-track').forEach(function(t) {
    t.innerHTML = t.innerHTML + t.innerHTML;
  });
})();
