(function(){
  var path=location.pathname.split('/').pop()||'index.html';
  var PAGES=[
    {file:'colordrop.html',label:'ColorDrop'},
    {file:'hue.html',label:'HUE'},
    {file:'chroma.html',label:'Chroma'},
    {file:'upscale.html',label:'UpScale'},
    {file:'urlclean.html',label:'URLClean'},
  ];
  var nav=document.createElement('nav');
  nav.className='site-nav';

  var brand=document.createElement('a');
  brand.className='nav-brand';
  brand.href='index.html';
  brand.textContent='Hropiberhtaz';
  nav.appendChild(brand);

  var clock=document.createElement('div');
  clock.className='nav-clock';
  nav.appendChild(clock);
  function tick(){
    var n=new Date();
    clock.textContent=
      String(n.getHours()).padStart(2,'0')+':'+
      String(n.getMinutes()).padStart(2,'0')+':'+
      String(n.getSeconds()).padStart(2,'0');
  }
  tick();setInterval(tick,1000);

  var links=document.createElement('div');
  links.className='nav-links';
  PAGES.forEach(function(p){
    var a=document.createElement('a');
    a.className='nav-link'+(p.file===path?' active':'');
    a.href=p.file;a.textContent=p.label;
    links.appendChild(a);
  });
  nav.appendChild(links);
  document.body.insertBefore(nav,document.body.firstChild);

  document.querySelectorAll('.marquee-track').forEach(function(t){
    t.innerHTML=t.innerHTML+t.innerHTML;
  });
})();
