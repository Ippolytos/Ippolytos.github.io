/* ============================================================
   HROPIBERHTAZ — Shared JavaScript (included on every page)
   ============================================================ */

/* INITIAL PAGE LOAD SCREEN — original harmony animation */
(function(){
  // CSS for intro screen
  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Licorice&display=swap');
    #yinyang-intro{position:fixed;inset:0;z-index:999999;background:#0d0f0e;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:32px;transition:opacity .9s cubic-bezier(.4,0,.2,1),transform .9s cubic-bezier(.4,0,.2,1);}
    #yinyang-intro.fade-out{opacity:0;transform:scale(1.04);pointer-events:none;}
    #yinyang-intro.gone{display:none;}
    .yy-canvas-wrap{position:relative;width:240px;height:240px;filter:drop-shadow(0 0 40px rgba(168,196,144,0.18)) drop-shadow(0 0 80px rgba(143,201,184,0.1));}
    #yy-canvas{width:240px;height:240px;}
    .yy-brand{font-family:'Licorice',cursive;font-size:38px;font-weight:400;color:rgba(168,196,144,0.92);letter-spacing:1px;opacity:0;animation:yyFadeUp 1s cubic-bezier(.22,1,.36,1) 0.4s forwards;}
    .yy-tagline{font-family:'Playfair Display',serif;font-style:italic;font-size:15px;color:rgba(226,232,222,0.6);letter-spacing:3px;opacity:0;animation:yyFadeUp 1s cubic-bezier(.22,1,.36,1) 0.7s forwards;}
    .yy-sub{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:5px;text-transform:uppercase;color:rgba(168,196,144,0.45);opacity:0;animation:yyFadeUp 1s cubic-bezier(.22,1,.36,1) 1.05s forwards;}
    @keyframes yyFadeUp{from{opacity:0;transform:translateY(12px) scale(.98);}to{opacity:1;transform:translateY(0) scale(1);}}
  `;
  document.head.appendChild(style);

  // HTML
  const intro = document.createElement('div');
  intro.id = 'yinyang-intro';
  intro.innerHTML = `
    <div class="yy-canvas-wrap"><canvas id="yy-canvas" width="480" height="480"></canvas></div>
    <div class="yy-brand">Hropiberhtaz</div>
    <div class="yy-tagline">Harmony in every pixel</div>
    <div class="yy-sub">Loading</div>`;
  document.body.insertBefore(intro, document.body.firstChild);

  const canvas = document.getElementById('yy-canvas');
  const ctx = canvas.getContext('2d');
  const W = 480, H = 480, cx = W/2, cy = H/2;
  const TOTAL_DURATION = 3200;
  let startTime = null;

  function ease(t){return t<0.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;}
  function easeOut(t){return 1-Math.pow(1-t,3);}

  const GREEN='rgba(168,196,144,',TEAL='rgba(143,201,184,',ROSE='rgba(201,160,160,',GOLD='rgba(200,176,96,',WHITE='rgba(226,232,222,';

  function drawHarmony(t){
    ctx.clearRect(0,0,W,H);
    const ringP=Math.min(t/0.25,1),ringAlpha=easeOut(ringP);
    const pulse=0.5+0.5*Math.sin(t*Math.PI*8);
    for(let i=3;i>=1;i--){ctx.beginPath();ctx.arc(cx,cy,185+i*12,0,Math.PI*2);ctx.strokeStyle=GREEN+(ringAlpha*0.04*(4-i)*(1+pulse*0.3))+')';ctx.lineWidth=8;ctx.stroke();}
    const ringEnd=ringAlpha*Math.PI*2;
    ctx.save();ctx.translate(cx,cy);ctx.rotate(-Math.PI/2);
    ctx.beginPath();ctx.arc(0,0,185,0,ringEnd);ctx.strokeStyle=GREEN+Math.min(ringAlpha*1.4,1)+')';ctx.lineWidth=1.5;ctx.stroke();
    for(let i=0;i<12;i++){const angle=(i/12)*Math.PI*2,tickT=i/12;if(ringAlpha<tickT)continue;const ta=easeOut(Math.max(0,(ringAlpha-tickT)/(1/12)));const isMain=i%3===0,len=isMain?14:8,r=185;ctx.save();ctx.rotate(angle);ctx.beginPath();ctx.moveTo(r-len,0);ctx.lineTo(r,0);ctx.strokeStyle=isMain?GREEN+(ta*0.9)+')':TEAL+(ta*0.45)+')';ctx.lineWidth=isMain?1.5:0.8;ctx.stroke();ctx.restore();}
    ctx.restore();
    const flowerP=Math.min(Math.max((t-0.18)/0.37,0),1),flowerAlpha=easeOut(flowerP),petalR=72;
    ctx.save();ctx.translate(cx,cy);
    for(let i=0;i<6;i++){const angle=(i/6)*Math.PI*2-Math.PI/6,petalT=i/6;if(flowerP<petalT)continue;const pa=easeOut(Math.min((flowerP-petalT)/(1/6),1));const px=Math.cos(angle)*petalR,py=Math.sin(angle)*petalR;ctx.beginPath();ctx.arc(px,py,petalR,0,Math.PI*2);ctx.strokeStyle=TEAL+(pa*0.22)+')';ctx.lineWidth=1;ctx.stroke();}
    if(flowerAlpha>0){ctx.beginPath();ctx.arc(0,0,petalR,0,Math.PI*2);ctx.strokeStyle=TEAL+(flowerAlpha*0.28)+')';ctx.lineWidth=1;ctx.stroke();}
    ctx.restore();
    const symP=Math.min(Math.max((t-0.35)/0.4,0),1),symAlpha=easeOut(symP),loopR=52;
    ctx.save();ctx.translate(cx,cy);
    const triColors=[GREEN,ROSE,TEAL];
    for(let i=0;i<3;i++){const angle=(i/3)*Math.PI*2-Math.PI/2,bx=Math.cos(angle)*(loopR*0.72),by=Math.sin(angle)*(loopR*0.72),ringProgress=Math.min(Math.max((symP-i*0.15)/0.55,0),1),ra=easeOut(ringProgress);ctx.beginPath();ctx.arc(bx,by,loopR,0,Math.PI*2*ra);ctx.strokeStyle=triColors[i]+(ra*0.85)+')';ctx.lineWidth=2.5;ctx.lineCap='round';ctx.stroke();ctx.beginPath();ctx.arc(bx,by,loopR*0.65,0,Math.PI*2*ra);ctx.strokeStyle=triColors[i]+(ra*0.18)+')';ctx.lineWidth=8;ctx.stroke();}
    ctx.restore();
    const spokeP=Math.min(Math.max((t-0.5)/0.32,0),1);
    ctx.save();ctx.translate(cx,cy);
    for(let i=0;i<24;i++){const angle=(i/24)*Math.PI*2,sT=i/24;if(spokeP<sT*0.6)continue;const sa=easeOut(Math.min((spokeP-sT*0.6)/0.4,1)),innerR=130,outerR=165;ctx.beginPath();ctx.moveTo(Math.cos(angle)*innerR,Math.sin(angle)*innerR);ctx.lineTo(Math.cos(angle)*(innerR+(outerR-innerR)*sa),Math.sin(angle)*(innerR+(outerR-innerR)*sa));ctx.strokeStyle=i%6===0?GOLD+(sa*0.6)+')':GREEN+(sa*0.2)+')';ctx.lineWidth=i%6===0?1.2:0.6;ctx.stroke();}
    ctx.restore();
    const starP=Math.min(Math.max((t-0.62)/0.28,0),1),starAlpha=easeOut(starP),starScale=easeOut(starP);
    if(starAlpha>0){ctx.save();ctx.translate(cx,cy);ctx.scale(starScale,starScale);const drawStar=(r1,r2,pts,rot,color,alpha,lw)=>{ctx.beginPath();for(let i=0;i<=pts*2;i++){const a=(i/(pts*2))*Math.PI*2+rot,r=i%2===0?r1:r2;i===0?ctx.moveTo(Math.cos(a)*r,Math.sin(a)*r):ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);}ctx.closePath();ctx.strokeStyle=color+alpha+')';ctx.lineWidth=lw;ctx.stroke();};drawStar(38,18,6,-Math.PI/2,GREEN,starAlpha*0.9,1.5);drawStar(26,12,6,-Math.PI/6,TEAL,starAlpha*0.55,1);drawStar(14,7,6,-Math.PI/2,WHITE,starAlpha*0.7,1);ctx.beginPath();ctx.arc(0,0,4*starScale,0,Math.PI*2);ctx.fillStyle=GREEN+starAlpha+')';ctx.fill();ctx.beginPath();ctx.arc(0,0,10,0,Math.PI*2);ctx.strokeStyle=GREEN+(starAlpha*0.35)+')';ctx.lineWidth=4;ctx.stroke();ctx.restore();}
    const bloomP=Math.min(Math.max((t-0.75)/0.25,0),1);
    if(bloomP>0){ctx.save();ctx.translate(cx,cy);for(let i=0;i<18;i++){const baseAngle=(i/18)*Math.PI*2,orbitAngle=baseAngle+bloomP*Math.PI*0.5*(i%2===0?1:-1),orbitR=148+Math.sin(baseAngle*3)*16,px=Math.cos(orbitAngle)*orbitR,py=Math.sin(orbitAngle)*orbitR,pa=easeOut(Math.min((bloomP-(i/18)*0.3)/0.7,1));if(pa<=0)continue;const dotR=i%3===0?2.5:1.5;ctx.beginPath();ctx.arc(px,py,dotR,0,Math.PI*2);const colors=[GREEN,TEAL,ROSE,GOLD];ctx.fillStyle=colors[i%4]+(pa*0.85)+')';ctx.fill();}ctx.restore();}
  }

  function animate(ts){
    if(!startTime)startTime=ts;
    const elapsed=ts-startTime,t=Math.min(elapsed/TOTAL_DURATION,1);
    drawHarmony(ease(t));
    if(elapsed<TOTAL_DURATION+600){requestAnimationFrame(animate);}
    else{setTimeout(()=>{intro.classList.add('fade-out');setTimeout(()=>intro.classList.add('gone'),940);},150);}
  }
  setTimeout(()=>requestAnimationFrame(animate),60);
})();

/* PAGE TRANSITION OVERLAY */
(function(){
  const overlay = document.createElement('div');
  overlay.id = 'page-transition-overlay';
  overlay.innerHTML = `<div class="pto-inner"><div class="pto-yinyang" id="pto-yinyang"></div><div class="pto-label" id="pto-label">Loading…</div><div class="pto-sub" id="pto-sub">One moment</div></div>`;
  document.body.appendChild(overlay);
  const size=90,yy=document.getElementById('pto-yinyang'),cv=document.createElement('canvas');
  cv.width=cv.height=size;yy.appendChild(cv);
  const ctx2=cv.getContext('2d'),r2=size*0.46,cx2=size/2,cy2=size/2;
  ctx2.save();ctx2.translate(cx2,cy2);
  ctx2.beginPath();ctx2.arc(0,0,r2,-Math.PI/2,Math.PI/2,false);ctx2.arc(0,r2/2,r2/2,Math.PI/2,-Math.PI/2,true);ctx2.arc(0,-r2/2,r2/2,Math.PI/2,-Math.PI/2,false);ctx2.closePath();ctx2.fillStyle='#fff';ctx2.fill();
  ctx2.beginPath();ctx2.arc(0,0,r2,Math.PI/2,-Math.PI/2,false);ctx2.arc(0,-r2/2,r2/2,-Math.PI/2,Math.PI/2,true);ctx2.arc(0,r2/2,r2/2,-Math.PI/2,Math.PI/2,false);ctx2.closePath();ctx2.fillStyle='#000';ctx2.fill();
  ctx2.beginPath();ctx2.arc(0,-r2/2,r2/6.5,0,Math.PI*2);ctx2.fillStyle='#000';ctx2.fill();
  ctx2.beginPath();ctx2.arc(0,r2/2,r2/6.5,0,Math.PI*2);ctx2.fillStyle='#fff';ctx2.fill();
  ctx2.beginPath();ctx2.arc(0,0,r2,0,Math.PI*2);ctx2.strokeStyle='rgba(168,196,144,0.7)';ctx2.lineWidth=1.5;ctx2.stroke();
  ctx2.restore();
  let angle=0,spinning=false;
  function spin(){if(!spinning)return;angle+=5;cv.style.transform='rotate('+angle+'deg)';requestAnimationFrame(spin);}
  const toolMeta={'colordrop.html':{label:'ColorDrop',sub:'Loading color picker…',color:'#a8c490'},'hue.html':{label:'HUE Editor',sub:'Loading image editor…',color:'#c9a0a0'},'chroma.html':{label:'Chroma',sub:'Loading recolor engine…',color:'#8fc9b8'},'upscale.html':{label:'UpScale',sub:'Loading Lanczos engine…',color:'#c8b060'},'urlclean.html':{label:'URLClean',sub:'Loading URL stripper…',color:'#b0a8d0'},'index.html':{label:'Hropiberhtaz',sub:'Going home…',color:'#a8c490'}};
  function showTransition(href,done){const key=href.split('/').pop().split('?')[0];const meta=toolMeta[key]||{label:key,sub:'Loading…',color:'#a8c490'};document.getElementById('pto-label').textContent=meta.label;document.getElementById('pto-sub').textContent=meta.sub;cv.style.filter='drop-shadow(0 0 16px '+meta.color+')';overlay.style.setProperty('--pto-accent',meta.color);overlay.classList.add('active');spinning=true;spin();setTimeout(done,700);}
  document.addEventListener('click',function(e){const a=e.target.closest('a[href]');if(!a)return;const href=a.getAttribute('href');if(!href||href.startsWith('http')||href.startsWith('#')||href.startsWith('mailto'))return;e.preventDefault();showTransition(href,()=>{window.location.href=href;});});
  window.addEventListener('pageshow',()=>{overlay.classList.remove('active');spinning=false;});
})();

(function(){const el=document.getElementById('live-clock');function tick(){const n=new Date();el.textContent=n.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false});}tick();setInterval(tick,1000);})();

(function(){const bar=document.getElementById('scroll-prog');let _t=false;window.addEventListener('scroll',()=>{if(_t)return;_t=true;requestAnimationFrame(()=>{bar.style.width=Math.min(window.scrollY/(document.body.scrollHeight-window.innerHeight)*100,100)+'%';_t=false;});},{passive:true});})();

(function(){
  const btn=document.getElementById('moonbeam-toggle'),icon=document.getElementById('moonbeam-icon'),root=document.documentElement;
  const saved=localStorage.getItem('hrop-theme')||'dark';applyTheme(saved);
  btn.addEventListener('click',()=>{const next=root.getAttribute('data-theme')==='light'?'dark':'light';applyTheme(next);localStorage.setItem('hrop-theme',next);});
  function applyTheme(t){root.setAttribute('data-theme',t);icon.textContent=t==='light'?'☽':'☀';btn.title=t==='light'?'Dark mode':'Light mode';}
})();

(function(){const ham=document.getElementById('ham-toggle'),nav=document.getElementById('mobile-nav'),close=document.getElementById('mobile-nav-close');ham.addEventListener('click',()=>nav.classList.add('open'));close.addEventListener('click',()=>nav.classList.remove('open'));nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));})();

(function(){const h=document.getElementById('main-header');let _t=false;window.addEventListener('scroll',()=>{if(_t)return;_t=true;requestAnimationFrame(()=>{h.classList.toggle('scrolled-down',window.scrollY>80);_t=false;});},{passive:true});})();

function showToast(msg){const t=document.getElementById('toasty-pop');t.textContent=msg;t.classList.add('popping');setTimeout(()=>t.classList.remove('popping'),2200);}

(function(){
  const hint=document.getElementById('keyboard-whisper');let t;
  function showHint(msg){hint.textContent=msg;hint.classList.add('show');clearTimeout(t);t=setTimeout(()=>hint.classList.remove('show'),2000);}
  document.addEventListener('keydown',e=>{
    if(e.target.tagName==='INPUT'||e.target.isContentEditable)return;
    if(e.key==='t'||e.key==='T'){document.getElementById('moonbeam-toggle').click();showHint('⌨  Toggle theme');}
    if(e.key==='?')showHint('T = Theme  ? = Help');
  });
})();

(function(){
  const canvas=document.getElementById('wobbly-bg-thingy'),ctx=canvas.getContext('2d');let W,H;
  function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;}resize();window.addEventListener('resize',resize,{passive:true});
  let mx=-9999,my=-9999,t=0,_mm=false;
  document.addEventListener('mousemove',e=>{if(_mm)return;_mm=true;requestAnimationFrame(()=>{mx=e.clientX;my=e.clientY;_mm=false;});},{passive:true});
  let _stop=false;document.addEventListener('visibilitychange',()=>{_stop=document.hidden;if(!_stop)requestAnimationFrame(loop);});
  function loop(){if(_stop)return;ctx.clearRect(0,0,W,H);t+=0.007;const isLight=document.documentElement.getAttribute('data-theme')==='light';const a1=isLight?'rgba(164,93,60,0.03)':'rgba(168,196,144,0.025)';const a2=isLight?'rgba(176,96,96,0.025)':'rgba(201,160,160,0.02)';if(mx>0){const grd=ctx.createRadialGradient(mx,my,0,mx,my,280);grd.addColorStop(0,isLight?'rgba(164,93,60,.04)':'rgba(168,196,144,.035)');grd.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);}for(let i=0;i<3;i++){const bx=W*(0.2+i*0.3)+Math.sin(t+i)*70,by=H*(0.3+i*0.2)+Math.cos(t*.7+i)*55,br=260+Math.sin(t+i*2)*45;const g=ctx.createRadialGradient(bx,by,0,bx,by,br);g.addColorStop(0,i===1?a2:a1);g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);}requestAnimationFrame(loop);}loop();
})();

(function(){
  const canvas=document.getElementById('floaty-dot-world'),ctx=canvas.getContext('2d');let W,H;
  const isDark=()=>document.documentElement.getAttribute('data-theme')!=='light';
  const CDARK=['#a8c490','#7a9870','rgba(184,208,170,.5)','#c9a0a0'],CLIGHT=['#A45D3C','#CC7722','#B86484','#9B525D'];
  const gc=()=>isDark()?CDARK:CLIGHT;
  function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;}resize();window.addEventListener('resize',resize,{passive:true});
  function P(){this.boot(true);}
  P.prototype.boot=function(r){this.x=Math.random()*W;this.y=r?Math.random()*H:H+8;this.rv=.6+Math.random()*1.5;this.vy=-(0.14+Math.random()*.26);this.vx=(Math.random()-.5)*.22;this.al=0;this.tal=.08+Math.random()*.22;this.col=gc()[Math.floor(Math.random()*4)];};
  P.prototype.step=function(){this.x+=this.vx;this.y+=this.vy;this.al+=(this.tal-this.al)*.04;if(this.y<-8){this.boot(false);this.col=gc()[Math.floor(Math.random()*4)];}};
  P.prototype.paint=function(){ctx.globalAlpha=this.al;ctx.fillStyle=this.col;ctx.beginPath();ctx.arc(this.x,this.y,this.rv,0,Math.PI*2);ctx.fill();};
  const particles=[];for(let i=0;i<30;i++)particles.push(new P());
  let _stop=false;document.addEventListener('visibilitychange',()=>{_stop=document.hidden;if(!_stop)requestAnimationFrame(loop);});
  function loop(){if(_stop)return;ctx.clearRect(0,0,W,H);particles.forEach(p=>{p.step();p.paint();});ctx.globalAlpha=1;requestAnimationFrame(loop);}loop();
})();

(function(){
  const canvas = document.getElementById('bg-yinyang');
  if(!canvas) return;
  canvas.style.position = 'fixed';
  canvas.style.top = '50%';
  canvas.style.left = '50%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '0';
  canvas.style.willChange = 'transform';
  canvas.style.transformOrigin = 'center center';
  const SIZE = 700;
  canvas.width = SIZE; canvas.height = SIZE;
  canvas.style.width = SIZE + 'px'; canvas.style.height = SIZE + 'px';
  canvas.style.marginLeft = (-SIZE/2) + 'px'; canvas.style.marginTop = (-SIZE/2) + 'px';
  const ctx = canvas.getContext('2d');
  const r = SIZE * 0.46, cx = SIZE / 2, cy = SIZE / 2;
  let _buf=null,_bufTheme=null;
  function drawSymbol() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    ctx.clearRect(0, 0, SIZE, SIZE);
    const themeKey=isLight?'l':'d';
    if(_buf&&_bufTheme===themeKey){ctx.save();ctx.globalAlpha=isLight?0.13:0.09;ctx.drawImage(_buf,0,0);ctx.restore();return;}
    _bufTheme=themeKey;
    const buf=document.createElement('canvas');_buf=buf;
    buf.width = SIZE; buf.height = SIZE;
    const bx = buf.getContext('2d');
    bx.translate(cx, cy);
    bx.beginPath();bx.arc(0,0,r,-Math.PI/2,Math.PI/2,false);bx.arc(0,r/2,r/2,Math.PI/2,-Math.PI/2,true);bx.arc(0,-r/2,r/2,Math.PI/2,-Math.PI/2,false);bx.closePath();bx.fillStyle=isLight?'#1a1a1a':'#ffffff';bx.fill();
    bx.beginPath();bx.arc(0,0,r,Math.PI/2,-Math.PI/2,false);bx.arc(0,-r/2,r/2,-Math.PI/2,Math.PI/2,true);bx.arc(0,r/2,r/2,-Math.PI/2,Math.PI/2,false);bx.closePath();bx.fillStyle=isLight?'#d0ccc4':'#000000';bx.fill();
    const dotR=r/6.5;
    bx.beginPath();bx.arc(0,-r/2,dotR,0,Math.PI*2);bx.fillStyle=isLight?'#f0ece4':'#000000';bx.fill();
    bx.beginPath();bx.arc(0,r/2,dotR,0,Math.PI*2);bx.fillStyle=isLight?'#2a1a0e':'#ffffff';bx.fill();
    bx.beginPath();bx.arc(0,0,r,0,Math.PI*2);bx.strokeStyle=isLight?'rgba(164,93,60,0.9)':'rgba(168,196,144,0.7)';bx.lineWidth=1.5;bx.stroke();
    ctx.save();ctx.globalAlpha=isLight?0.13:0.09;ctx.drawImage(_buf,0,0);ctx.restore();
  }
  drawSymbol();
  new MutationObserver(drawSymbol).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  let currentAngle=0,targetAngle=0,rafId=null;
  function loop(){const diff=targetAngle-currentAngle;if(Math.abs(diff)<0.01){currentAngle=targetAngle;canvas.style.transform='rotate('+currentAngle.toFixed(3)+'deg)';rafId=null;return;}currentAngle+=diff*0.14;canvas.style.transform='rotate('+currentAngle.toFixed(3)+'deg)';rafId=requestAnimationFrame(loop);}
  window.addEventListener('scroll',function(){const maxScroll=document.body.scrollHeight-window.innerHeight;const pct=maxScroll>0?window.scrollY/maxScroll:0;targetAngle=pct*2160;if(!rafId)rafId=requestAnimationFrame(loop);},{passive:true});
})();

(function(){
  const els=document.querySelectorAll('.poppy-reveal,.poppy-left,.poppy-right,.poppy-bloom');
  function markDone(el){el.addEventListener('animationend',function f(){el.removeEventListener('animationend',f);el.classList.add('done-sprouting');});}
  const io=new IntersectionObserver(entries=>{entries.forEach(e=>{const el=e.target;if(e.isIntersecting){el.classList.add('awake');if((el.classList.contains('chunk-title')||el.classList.contains('big-heading'))&&!el.classList.contains('done-sprouting'))markDone(el);}else{el.classList.remove('awake');el.classList.remove('done-sprouting');if(el.classList.contains('chunk-title')||el.classList.contains('big-heading')){el.style.animation='none';void el.offsetWidth;el.style.animation='';}}});},{threshold:.08,rootMargin:'0px 0px -40px 0px'});
  els.forEach(el=>io.observe(el));
})();

document.addEventListener('click',e=>{const btn=e.target.closest('.squish-btn,.preset-lump,.toggle-pebble');if(!btn)return;const r=btn.getBoundingClientRect(),sz=Math.max(r.width,r.height)*2,rip=document.createElement('span');rip.className='ripple-splash';rip.style.cssText=`width:${sz}px;height:${sz}px;left:${e.clientX-r.left-sz/2}px;top:${e.clientY-r.top-sz/2}px`;btn.appendChild(rip);rip.addEventListener('animationend',()=>rip.remove());});

(function(){document.querySelectorAll('.squishy-card,.lumpy-card').forEach(el=>{let _t=false;el.addEventListener('mousemove',e=>{if(_t)return;_t=true;requestAnimationFrame(()=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(900px) rotateY(${x*4}deg) rotateX(${-y*4}deg) scale(1.01)`;_t=false;});});el.addEventListener('mouseleave',()=>{el.style.transform='';});});})();

(function(){document.querySelectorAll('.cozy-btn-filled').forEach(btn=>{let _t=false,_r=null;btn.addEventListener('mouseenter',()=>{_r=btn.getBoundingClientRect();});btn.addEventListener('mousemove',e=>{if(_t)return;_t=true;requestAnimationFrame(()=>{const r=_r||btn.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;btn.style.transform=`translate(${x*.1}px,${y*.1}px) scale(1.04)`;_t=false;});});btn.addEventListener('mouseleave',()=>{btn.style.transform='';_r=null;});});})();

(function(){
  function armFileInput(input){
    if(input._veilArmed)return;input._veilArmed=true;
    const veil=document.getElementById('file-loading-veil'),veilMsg=document.getElementById('veil-msg-text');
    let fileDialogOpen=false;
    function showVeil(msg){if(veilMsg)veilMsg.textContent=msg||'Processing…';if(veil)veil.classList.add('visible');}
    function hideVeil(){if(veil)veil.classList.remove('visible');}
    const origClick=input.click.bind(input);
    input.click=function(){openFV();origClick();};
    input.addEventListener('click',openFV);
    input.addEventListener('change',()=>{fileDialogOpen=false;hideVeil();});
    function openFV(){if(fileDialogOpen)return;fileDialogOpen=true;showVeil('Opening file explorer…');const onFocus=()=>{setTimeout(()=>{if(fileDialogOpen){fileDialogOpen=false;hideVeil();}},300);window.removeEventListener('focus',onFocus);};window.addEventListener('focus',onFocus);}
  }
  document.querySelectorAll('input[type="file"]').forEach(armFileInput);
  new MutationObserver(muts=>{muts.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1){if(n.matches&&n.matches('input[type="file"]'))armFileInput(n);n.querySelectorAll&&n.querySelectorAll('input[type="file"]').forEach(armFileInput);}}))}
  ).observe(document.body,{childList:true,subtree:true});
})();

(function(){
  const btn=document.getElementById('lofi-leaf');if(!btn)return;
  const lbl=document.getElementById('audio-label');
  let playing=false,ctx=null,nodes=[];
  function makeLofi(){
    ctx=new(window.AudioContext||window.webkitAudioContext)();
    const freq=[262,330,392,523,659];
    freq.forEach((f,i)=>{
      const osc=ctx.createOscillator(),gain=ctx.createGain(),filt=ctx.createBiquadFilter();
      osc.type='sine';osc.frequency.value=f;
      filt.type='lowpass';filt.frequency.value=600;
      gain.gain.value=0;
      osc.connect(filt);filt.connect(gain);gain.connect(ctx.destination);
      osc.start();
      setTimeout(()=>{gain.gain.linearRampToValueAtTime(0.04+Math.random()*.02,ctx.currentTime+0.5);},i*180);
      nodes.push({osc,gain});
    });
  }
  btn.addEventListener('click',()=>{
    if(!playing){
      if(!ctx)makeLofi();
      else nodes.forEach(n=>n.gain.gain.linearRampToValueAtTime(0.04,ctx.currentTime+0.3));
      btn.classList.add('vibing');lbl.textContent='playing';playing=true;
    }else{
      nodes.forEach(n=>n.gain.gain.linearRampToValueAtTime(0,ctx.currentTime+0.4));
      btn.classList.remove('vibing');lbl.textContent='lo-fi';playing=false;
    }
  });
})();
