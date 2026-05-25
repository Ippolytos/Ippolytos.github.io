/* ============================================================
   HROPIBERHTAZ — Shared JavaScript (included on every page)
   ============================================================ */
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

/* ── Background Enso (replaces yin-yang) ─────────────────── */
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
  const cx = SIZE/2, cy = SIZE/2;
  let _buf=null, _bufTheme=null;

  function drawEnso(){
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    ctx.clearRect(0,0,SIZE,SIZE);
    const themeKey = isLight?'l':'d';
    if(_buf && _bufTheme===themeKey){
      ctx.save();ctx.globalAlpha=isLight?0.14:0.10;ctx.drawImage(_buf,0,0);ctx.restore();return;
    }
    _bufTheme = themeKey;
    const buf = document.createElement('canvas');_buf=buf;
    buf.width=SIZE;buf.height=SIZE;
    const bx=buf.getContext('2d');

    // Colour palette per theme
    const stroke1 = isLight ? 'rgba(164,93,60,0.82)'  : 'rgba(168,196,144,0.75)';  // main arc
    const stroke2 = isLight ? 'rgba(176,100,132,0.40)' : 'rgba(201,160,160,0.35)'; // inner ring
    const stroke3 = isLight ? 'rgba(164,93,60,0.18)'  : 'rgba(168,196,144,0.12)';  // ghost track
    const dotFill = isLight ? 'rgba(164,93,60,0.65)'  : 'rgba(168,196,144,0.55)';  // gap dot

    bx.translate(cx,cy);

    // Ghost track (full circle, very faint)
    const R = SIZE*0.40;
    bx.beginPath();bx.arc(0,0,R,0,Math.PI*2);
    bx.strokeStyle=stroke3;bx.lineWidth=3;bx.stroke();

    // Inner ring (harmony ring, slightly offset)
    const Ri = SIZE*0.28;
    bx.beginPath();bx.arc(0,0,Ri,-Math.PI*0.1,Math.PI*1.85);
    bx.strokeStyle=stroke2;bx.lineWidth=2.5;bx.lineCap='round';bx.stroke();

    // Main Enso arc (~330° open circle, brushstroke feel)
    bx.beginPath();
    bx.arc(0,0,R, Math.PI*0.08, Math.PI*1.96);
    bx.strokeStyle=stroke1;
    bx.lineWidth=10;bx.lineCap='round';bx.stroke();

    // Taper effect: second stroke slightly thinner, slightly inset
    bx.beginPath();
    bx.arc(0,0,R-1, Math.PI*0.08, Math.PI*0.9);
    const grad=bx.createLinearGradient(-R,0,R,0);
    grad.addColorStop(0,stroke1);grad.addColorStop(1,'rgba(0,0,0,0)');
    bx.strokeStyle=grad;bx.lineWidth=4;bx.stroke();

    // Small dot in the gap — the "imperfection" that makes Enso alive
    const gapAngle = Math.PI*0.02;
    bx.beginPath();bx.arc(Math.cos(gapAngle)*R, Math.sin(gapAngle)*R, 7,0,Math.PI*2);
    bx.fillStyle=dotFill;bx.fill();

    // Centre micro dot
    bx.beginPath();bx.arc(0,0,4,0,Math.PI*2);
    bx.fillStyle=isLight?'rgba(164,93,60,0.3)':'rgba(168,196,144,0.25)';bx.fill();

    ctx.save();ctx.globalAlpha=isLight?0.14:0.10;ctx.drawImage(_buf,0,0);ctx.restore();
  }

  drawEnso();
  new MutationObserver(drawEnso).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});

  let currentAngle=0,targetAngle=0,rafId=null;
  function loop(){const diff=targetAngle-currentAngle;if(Math.abs(diff)<0.01){currentAngle=targetAngle;canvas.style.transform='rotate('+currentAngle.toFixed(3)+'deg)';rafId=null;return;}currentAngle+=diff*0.08;canvas.style.transform='rotate('+currentAngle.toFixed(3)+'deg)';rafId=requestAnimationFrame(loop);}
  window.addEventListener('scroll',function(){const maxScroll=document.body.scrollHeight-window.innerHeight;const pct=maxScroll>0?window.scrollY/maxScroll:0;targetAngle=pct*1080;if(!rafId)rafId=requestAnimationFrame(loop);},{passive:true});
})();

/* ── Splash Screen ────────────────────────────────────────── */
(function(){
  const splash = document.getElementById('site-splash');
  if(!splash) return;

  // Read saved theme immediately so splash starts in the right colours
  const saved = localStorage.getItem('hrop-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);

  // Build the SVG Enso inside the splash
  const ensoWrap = splash.querySelector('.splash-symbol-wrap');
  if(ensoWrap){
    ensoWrap.innerHTML = `
      <svg id="splash-enso" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <!-- Ghost track -->
        <circle class="splash-enso-track" cx="60" cy="60" r="47"/>
        <!-- Inner harmony ring -->
        <path class="splash-enso-inner"
          d="M 60,30 A 30,30 0 1,1 59.9,30"/>
        <!-- Main Enso arc (~330°) -->
        <path class="splash-enso-arc"
          d="M 60,13 A 47,47 0 1,1 56,107"/>
        <!-- Gap dot -->
        <circle class="splash-enso-dot" cx="63" cy="13.5" r="4.5"/>
        <!-- Centre dot -->
        <circle cx="60" cy="60" r="3" class="splash-enso-dot" opacity="0.5"/>
      </svg>`;
  }

  const bar = splash.querySelector('.splash-bar');
  let prog = 0, interval;

  function advanceBar(){
    // Accelerate toward 90%, then stall until we force-finish
    const step = prog < 70 ? 1.8 : prog < 88 ? 0.4 : 0.05;
    prog = Math.min(prog + step, 90);
    if(bar) bar.style.width = prog + '%';
  }

  interval = setInterval(advanceBar, 40);

  function dismiss(){
    clearInterval(interval);
    if(bar) bar.style.width = '100%';
    setTimeout(()=>{
      splash.classList.add('splash-out');
      setTimeout(()=>{ splash.style.display='none'; }, 600);
    }, 280);
  }

  // Dismiss once page is fully loaded, minimum 1.4s for brand presence
  const minWait = new Promise(r=>setTimeout(r, 1400));
  const pageLoad = new Promise(r=>{
    if(document.readyState==='complete') r();
    else window.addEventListener('load', r, {once:true});
  });
  Promise.all([minWait, pageLoad]).then(dismiss);
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
