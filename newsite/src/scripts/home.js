(function(){
  "use strict";
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* reveal on scroll */
  var rvs = document.querySelectorAll('.rv');
  if('IntersectionObserver' in window && !reduce){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
    },{threshold:0.12, rootMargin:'0px 0px -8% 0px'});
    rvs.forEach(function(el){io.observe(el);});
  } else { rvs.forEach(function(el){el.classList.add('in');}); }


  /* local tab groups */
  document.querySelectorAll('[data-tabs]').forEach(function(group){
    var buttons = group.querySelectorAll('[data-tab]');
    var panels = group.querySelectorAll('[data-panel]');
    function loadPanelImages(panel){
      if(!panel) return;
      panel.querySelectorAll('img[data-src]').forEach(function(img){
        img.setAttribute('src', img.getAttribute('data-src'));
        img.removeAttribute('data-src');
      });
    }
    buttons.forEach(function(btn, index){
      var target = btn.getAttribute('data-tab');
      var panel = group.querySelector('[data-panel="' + target + '"]');
      var active = btn.classList.contains('active');
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
      btn.setAttribute('tabindex', active ? '0' : '-1');
      if(!btn.id) btn.id = 'tab-' + target;
      if(panel){
        if(!panel.id) panel.id = 'panel-' + target;
        btn.setAttribute('aria-controls', panel.id);
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', btn.id);
        panel.hidden = !active;
      }
      if(active) loadPanelImages(panel);
      btn.addEventListener('click', function(){
        var target = btn.getAttribute('data-tab');
        buttons.forEach(function(b){
          var active = b === btn;
          b.classList.toggle('active', active);
          b.setAttribute('aria-selected', active ? 'true' : 'false');
          b.setAttribute('tabindex', active ? '0' : '-1');
        });
        panels.forEach(function(panel){
          var active = panel.getAttribute('data-panel') === target;
          panel.classList.toggle('active', active);
          panel.hidden = !active;
          if(active) loadPanelImages(panel);
        });
        var ap = group.querySelector('[data-panel="' + target + '"]');
        if(ap && ap.querySelector('#cv-hub')){ running = true; }
        window.dispatchEvent(new Event('resize'));
      });
    });
  });

  /* hero start surface tabs */
  document.querySelectorAll('[data-start-tabs]').forEach(function(group){
    var buttons = group.querySelectorAll('[data-start-tab]');
    var panels = group.querySelectorAll('[data-start-panel]');
    function loadStartPanelImages(panel){
      if(!panel) return;
      panel.querySelectorAll('img[data-src]').forEach(function(img){
        img.setAttribute('src', img.getAttribute('data-src'));
        img.removeAttribute('data-src');
      });
    }
    buttons.forEach(function(btn){
      var target = btn.getAttribute('data-start-tab');
      var panel = group.querySelector('[data-start-panel="' + target + '"]');
      var active = btn.classList.contains('active');
      if(!btn.id) btn.id = 'start-tab-' + target;
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
      btn.setAttribute('tabindex', active ? '0' : '-1');
      if(panel){
        if(!panel.id) panel.id = 'start-panel-' + target;
        btn.setAttribute('aria-controls', panel.id);
        panel.setAttribute('aria-labelledby', btn.id);
        panel.hidden = !active;
      }
      if(active) loadStartPanelImages(panel);
      btn.addEventListener('click', function(){
        var target = btn.getAttribute('data-start-tab');
        buttons.forEach(function(b){
          var active = b === btn;
          b.classList.toggle('active', active);
          b.setAttribute('aria-selected', active ? 'true' : 'false');
          b.setAttribute('tabindex', active ? '0' : '-1');
        });
        panels.forEach(function(panel){
          var active = panel.getAttribute('data-start-panel') === target;
          panel.classList.toggle('active', active);
          panel.hidden = !active;
          if(active) loadStartPanelImages(panel);
        });
      });
    });
  });

  document.querySelectorAll('[data-copy-text]').forEach(function(btn){
    btn.addEventListener('click', function(){
      var text = btn.getAttribute('data-copy-text') || '';
      function done(){
        var old = btn.textContent;
        btn.textContent = 'Copied';
        setTimeout(function(){ btn.textContent = old; }, 1400);
      }
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(text).then(done).catch(function(){});
      }
    });
  });

  /* ---------- canvas topology ---------- */
  function setup(canvas){
    var dpr = Math.max(1, Math.min(2, window.devicePixelRatio||1));
    var r = canvas.getBoundingClientRect();
    canvas.width = r.width*dpr; canvas.height = r.height*dpr;
    var ctx = canvas.getContext('2d');
    ctx.setTransform(dpr,0,0,dpr,0,0);
    return {ctx:ctx, w:r.width, h:r.height};
  }

  var SIGNAL='#FFB23E', STEEL='rgba(126,138,168,0.55)', STEELF='rgba(126,138,168,0.16)', DANGER='#E5604D', INK='#101218', TXT='rgba(236,238,242,0.9)';

  /* ===== HERO: one agent -> coordinated fleet ===== */
  var heroCv=document.getElementById('cv-hero');
  function HeroScene(){
    var s=setup(heroCv), ctx=s.ctx, w=s.w, h=s.h;
    var root={x:w*0.12, y:h*0.5};
    var pos=[[0.40,0.24],[0.40,0.76],[0.60,0.50],[0.78,0.30],[0.88,0.64],[0.66,0.86]];
    var kids=[];
    for(var i=0;i<pos.length;i++){kids.push({x:w*pos[i][0], y:h*pos[i][1], lit:0});}
    var kedges=[[2,3],[2,4],[0,2],[1,5],[4,5]];
    var pulses=[], glows=[], t=0;
    function intent(){ pulses.push({k:Math.floor(Math.random()*kids.length), p:0}); }
    function frame(){
      ctx.clearRect(0,0,w,h);
      kids.forEach(function(k){ctx.strokeStyle=STEELF;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(root.x,root.y);ctx.lineTo(k.x,k.y);ctx.stroke();});
      kedges.forEach(function(e){ctx.strokeStyle='rgba(126,138,168,0.10)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(kids[e[0]].x,kids[e[0]].y);ctx.lineTo(kids[e[1]].x,kids[e[1]].y);ctx.stroke();});
      for(var i=glows.length-1;i>=0;i--){var g=glows[i];g.r+=0.7;g.a*=0.95;if(g.a<0.05){glows.splice(i,1);continue;}ctx.strokeStyle='rgba(255,178,62,'+g.a+')';ctx.lineWidth=1.2;ctx.beginPath();ctx.arc(g.x,g.y,g.r,0,Math.PI*2);ctx.stroke();}
      for(var i=pulses.length-1;i>=0;i--){var p=pulses[i];p.p+=0.024;var k=kids[p.k];var x=root.x+(k.x-root.x)*p.p,y=root.y+(k.y-root.y)*p.p;ctx.fillStyle=SIGNAL;ctx.beginPath();ctx.arc(x,y,2.5,0,Math.PI*2);ctx.fill();if(p.p>=1){k.lit=1;glows.push({x:k.x,y:k.y,r:3,a:0.7});pulses.splice(i,1);}}
      kids.forEach(function(k){k.lit*=0.94;var base=6;if(k.lit>0.05){var gl=ctx.createRadialGradient(k.x,k.y,1,k.x,k.y,base*3);gl.addColorStop(0,'rgba(255,178,62,'+(k.lit*0.5)+')');gl.addColorStop(1,'rgba(255,178,62,0)');ctx.fillStyle=gl;ctx.beginPath();ctx.arc(k.x,k.y,base*3,0,Math.PI*2);ctx.fill();}ctx.fillStyle=INK;ctx.strokeStyle=k.lit>0.05?'rgba(255,178,62,'+(0.5+k.lit*0.5)+')':STEEL;ctx.lineWidth=1.4;ctx.beginPath();ctx.arc(k.x,k.y,base,0,Math.PI*2);ctx.fill();ctx.stroke();});
      var rg=ctx.createRadialGradient(root.x,root.y,1,root.x,root.y,28);rg.addColorStop(0,'rgba(255,178,62,0.22)');rg.addColorStop(1,'rgba(255,178,62,0)');ctx.fillStyle=rg;ctx.beginPath();ctx.arc(root.x,root.y,28,0,Math.PI*2);ctx.fill();
      ctx.fillStyle=INK;ctx.strokeStyle=SIGNAL;ctx.lineWidth=2;ctx.beginPath();ctx.arc(root.x,root.y,10,0,Math.PI*2);ctx.fill();ctx.stroke();
      ctx.fillStyle=SIGNAL;ctx.beginPath();ctx.arc(root.x,root.y,3,0,Math.PI*2);ctx.fill();
      t++; if(t%32===0) intent();
      raf=requestAnimationFrame(frame);
    }
    var raf;
    function start(){ intent(); frame(); }
    function still(){
      ctx.clearRect(0,0,w,h);
      kids.forEach(function(k){ctx.strokeStyle=STEELF;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(root.x,root.y);ctx.lineTo(k.x,k.y);ctx.stroke();});
      kids.forEach(function(k){ctx.fillStyle=INK;ctx.strokeStyle=STEEL;ctx.lineWidth=1.4;ctx.beginPath();ctx.arc(k.x,k.y,6,0,Math.PI*2);ctx.fill();ctx.stroke();});
      ctx.fillStyle=INK;ctx.strokeStyle=SIGNAL;ctx.lineWidth=2;ctx.beginPath();ctx.arc(root.x,root.y,10,0,Math.PI*2);ctx.fill();ctx.stroke();
      ctx.fillStyle=SIGNAL;ctx.beginPath();ctx.arc(root.x,root.y,3,0,Math.PI*2);ctx.fill();
    }
    return {start:start, still:still, stop:function(){cancelAnimationFrame(raf);}};
  }

  /* ===== HUB AND SPOKE ===== */
  var hub = document.getElementById('cv-hub');
  function HubScene(){
    var s=setup(hub), ctx=s.ctx, w=s.w, h=s.h;
    var cx=w/2, cy=h/2+6, R=Math.min(w,h)*0.34;
    var N=8, leaves=[];
    for(var i=0;i<N;i++){var a=(i/N)*Math.PI*2 - Math.PI/2; leaves.push({x:cx+Math.cos(a)*R, y:cy+Math.sin(a)*R});}
    var packets=[]; var t=0; var load=0;
    function spawn(){
      var i=Math.floor(Math.random()*N);
      packets.push({i:i, p:0, dir:1, sp:0.012+Math.random()*0.01});
    }
    function frame(){
      ctx.clearRect(0,0,w,h);
      // spokes
      for(var i=0;i<N;i++){
        ctx.strokeStyle=STEELF; ctx.lineWidth=1;
        ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(leaves[i].x,leaves[i].y); ctx.stroke();
      }
      // leaves
      for(var i=0;i<N;i++){
        ctx.fillStyle=INK; ctx.strokeStyle=STEEL; ctx.lineWidth=1.4;
        ctx.beginPath(); ctx.arc(leaves[i].x,leaves[i].y,7,0,Math.PI*2); ctx.fill(); ctx.stroke();
      }
      // packets travel to hub then back
      load *= 0.94;
      for(var k=packets.length-1;k>=0;k--){
        var pk=packets[k]; pk.p += pk.sp*pk.dir;
        var L=leaves[pk.i], x,y;
        if(pk.dir>0){ x=L.x+(cx-L.x)*pk.p; y=L.y+(cy-L.y)*pk.p; if(pk.p>=1){pk.dir=-1; pk.p=1; load+=1;} }
        else { x=cx+(L.x-cx)*(1-pk.p)*-0+L.x+(cx-L.x)*pk.p; y=L.y+(cy-L.y)*pk.p; if(pk.p<=0){packets.splice(k,1); continue;} }
        ctx.fillStyle=pk.dir>0?STEEL:'rgba(229,96,77,0.85)';
        ctx.beginPath(); ctx.arc(x,y,2.6,0,Math.PI*2); ctx.fill();
      }
      // hub — reddens & pulses with load
      var ld=Math.min(1, load/7);
      var hubR=12+ld*5;
      var glow=ctx.createRadialGradient(cx,cy,2,cx,cy,hubR*2.4);
      glow.addColorStop(0,'rgba(229,96,77,'+(0.20+ld*0.5)+')'); glow.addColorStop(1,'rgba(229,96,77,0)');
      ctx.fillStyle=glow; ctx.beginPath(); ctx.arc(cx,cy,hubR*2.4,0,Math.PI*2); ctx.fill();
      ctx.fillStyle=INK; ctx.strokeStyle='rgba(229,96,77,'+(0.5+ld*0.5)+')'; ctx.lineWidth=1.6+ld*1.4;
      ctx.beginPath(); ctx.arc(cx,cy,hubR,0,Math.PI*2); ctx.fill(); ctx.stroke();
      // congestion bars in hub
      ctx.fillStyle='rgba(229,96,77,'+(0.4+ld*0.6)+')';
      for(var b=0;b<3;b++){ var bh=2+ld*7*Math.random(); ctx.fillRect(cx-5+b*4, cy+3-bh, 2.4, bh); }

      t++; if(t%14===0) spawn();
      raf=requestAnimationFrame(frame);
    }
    var raf;
    function start(){ for(var i=0;i<4;i++) spawn(); frame(); }
    function still(){
      ctx.clearRect(0,0,w,h);
      for(var i=0;i<N;i++){ctx.strokeStyle=STEELF;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(leaves[i].x,leaves[i].y);ctx.stroke();}
      for(var i=0;i<N;i++){ctx.fillStyle=INK;ctx.strokeStyle=STEEL;ctx.lineWidth=1.4;ctx.beginPath();ctx.arc(leaves[i].x,leaves[i].y,7,0,Math.PI*2);ctx.fill();ctx.stroke();}
      ctx.fillStyle=INK;ctx.strokeStyle=DANGER;ctx.lineWidth=2;ctx.beginPath();ctx.arc(cx,cy,13,0,Math.PI*2);ctx.fill();ctx.stroke();
    }
    return {start:start, still:still, stop:function(){cancelAnimationFrame(raf);}};
  }

  /* ===== STIGMERGIC MESH ===== */
  var mesh = document.getElementById('cv-mesh');
  function MeshScene(){
    var s=setup(mesh), ctx=s.ctx, w=s.w, h=s.h;
    // nested layout: root (top) -> 3 parents -> children
    var nodes=[], edges=[];
    var root={x:w/2, y:38, lvl:0};
    nodes.push(root);
    var px=[w*0.24, w*0.5, w*0.76], py=h*0.5;
    var parents=[];
    for(var i=0;i<3;i++){var p={x:px[i], y:py, lvl:1}; nodes.push(p); parents.push(p); edges.push([root,p]);}
    for(var i=0;i<3;i++){
      var cnt=(i===1)?3:2;
      for(var j=0;j<cnt;j++){
        var ang=Math.PI*0.5 + (j-(cnt-1)/2)*0.7;
        var c={x:parents[i].x+Math.cos(ang)*52*(j%2?1:-1)+ (j-(cnt-1)/2)*30, y:py+58+ (j%2)*26, lvl:2};
        c.x=parents[i].x + (j-(cnt-1)/2)*46; c.y=py+62+(j%2)*22;
        nodes.push(c); edges.push([parents[i],c]);
      }
    }
    var signals=[]; // diffusing rings
    var ups=[];     // bubble-up pulses traveling child->parent->root
    var t=0;

    function emit(){
      var leaves=nodes.filter(function(n){return n.lvl===2;});
      var n=leaves[Math.floor(Math.random()*leaves.length)];
      signals.push({x:n.x,y:n.y,r:4,max:46,a:0.9, node:n});
      if(Math.random()<0.5){ // bubble up
        var parent=edges.find(function(e){return e[1]===n;});
        if(parent){ ups.push({from:n, to:parent[0], p:0, stage:0}); }
      }
    }
    function frame(){
      ctx.clearRect(0,0,w,h);
      // faint granted edges
      edges.forEach(function(e){
        ctx.strokeStyle=STEELF; ctx.lineWidth=1;
        ctx.beginPath(); ctx.moveTo(e[0].x,e[0].y); ctx.lineTo(e[1].x,e[1].y); ctx.stroke();
      });
      // diffusing signal rings
      for(var i=signals.length-1;i>=0;i--){
        var g=signals[i]; g.r+=0.8; g.a*=0.965;
        if(g.a<0.04){signals.splice(i,1); continue;}
        ctx.strokeStyle='rgba(255,178,62,'+g.a+')'; ctx.lineWidth=1.4;
        ctx.beginPath(); ctx.arc(g.x,g.y,g.r,0,Math.PI*2); ctx.stroke();
        // neighbors within radius light up
        nodes.forEach(function(nd){
          var d=Math.hypot(nd.x-g.x,nd.y-g.y);
          if(d<g.r+6 && d>g.r-6){ nd.lit=Math.max(nd.lit||0, g.a); }
        });
      }
      // bubble-up pulses
      for(var i=ups.length-1;i>=0;i--){
        var u=ups[i]; u.p+=0.04;
        var fx=u.from.x+(u.to.x-u.from.x)*u.p, fy=u.from.y+(u.to.y-u.from.y)*u.p;
        ctx.fillStyle=SIGNAL; ctx.beginPath(); ctx.arc(fx,fy,3,0,Math.PI*2); ctx.fill();
        if(u.p>=1){
          u.to.lit=1;
          if(u.stage===0 && u.to!==root){
            var nxt=edges.find(function(e){return e[1]===u.to;});
            if(nxt){ ups.push({from:u.to,to:nxt[0],p:0,stage:1}); }
          } else if(u.to===root){
            signals.push({x:root.x,y:root.y,r:6,max:80,a:0.7}); // global ring
          }
          ups.splice(i,1);
        }
      }
      // nodes
      nodes.forEach(function(nd){
        nd.lit=(nd.lit||0)*0.9;
        var base = nd.lvl===0?8.5 : nd.lvl===1?7 : 5.5;
        if(nd.lit>0.05){
          var gl=ctx.createRadialGradient(nd.x,nd.y,1,nd.x,nd.y,base*3);
          gl.addColorStop(0,'rgba(255,178,62,'+(nd.lit*0.55)+')'); gl.addColorStop(1,'rgba(255,178,62,0)');
          ctx.fillStyle=gl; ctx.beginPath(); ctx.arc(nd.x,nd.y,base*3,0,Math.PI*2); ctx.fill();
        }
        ctx.fillStyle=INK;
        ctx.strokeStyle = nd.lit>0.05 ? 'rgba(255,178,62,'+(0.55+nd.lit*0.45)+')' : STEEL;
        ctx.lineWidth = nd.lvl===0?2:1.5;
        ctx.beginPath(); ctx.arc(nd.x,nd.y,base,0,Math.PI*2); ctx.fill(); ctx.stroke();
        if(nd.lvl===0){ ctx.fillStyle='rgba(255,178,62,0.9)'; ctx.beginPath(); ctx.arc(nd.x,nd.y,2.4,0,Math.PI*2); ctx.fill(); }
      });
      t++; if(t%30===0) emit();
      raf=requestAnimationFrame(frame);
    }
    var raf;
    function start(){ emit(); frame(); }
    function still(){
      ctx.clearRect(0,0,w,h);
      edges.forEach(function(e){ctx.strokeStyle=STEELF;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(e[0].x,e[0].y);ctx.lineTo(e[1].x,e[1].y);ctx.stroke();});
      nodes.forEach(function(nd){var base=nd.lvl===0?8.5:nd.lvl===1?7:5.5;ctx.fillStyle=INK;ctx.strokeStyle=(nd.lvl===0?'rgba(255,178,62,0.8)':STEEL);ctx.lineWidth=nd.lvl===0?2:1.5;ctx.beginPath();ctx.arc(nd.x,nd.y,base,0,Math.PI*2);ctx.fill();ctx.stroke();});
    }
    return {start:start, still:still, stop:function(){cancelAnimationFrame(raf);}};
  }

  // build + run when visible
  var hubScene, meshScene, heroScene, running=false;
  function build(){
    if(heroCv) heroScene=HeroScene();
    if(hub) hubScene=HubScene();
    if(mesh) meshScene=MeshScene();
  }
  build();
  if(reduce){
    if(heroScene) heroScene.still();
    if(hubScene) hubScene.still();
    if(meshScene) meshScene.still();
  } else {
    if(heroScene) heroScene.start();
    var tio=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(e.isIntersecting && !running){
          running=true;
          if(hubScene) hubScene.start();
          if(meshScene) meshScene.start();
        }
      });
    },{threshold:0.25});
    var cs=document.getElementById('coordination');
    if(cs) tio.observe(cs);
  }

  // loop ring: an orbit dot travels the cycle; labels stay fixed
  var ring=document.getElementById('loopRing');
  if(ring && !reduce){
    var orbit=document.createElement('div');
    orbit.className='orbit-dot';
    ring.appendChild(orbit);
    var a=0;
    (function spin(){
      a+=0.012;
      var rad=ring.clientWidth*0.5 - 16;
      var cx=ring.clientWidth/2, cy=ring.clientHeight/2;
      orbit.style.left=(cx+Math.cos(a-Math.PI/2)*rad-4)+'px';
      orbit.style.top=(cy+Math.sin(a-Math.PI/2)*rad-4)+'px';
      requestAnimationFrame(spin);
    })();
  }

  // debounced resize rebuild
  var rt;
  window.addEventListener('resize', function(){
    clearTimeout(rt);
    rt=setTimeout(function(){
      if(heroScene) heroScene.stop(); if(hubScene) hubScene.stop(); if(meshScene) meshScene.stop();
      build();
      if(reduce){ if(heroScene)heroScene.still(); if(hubScene)hubScene.still(); if(meshScene)meshScene.still(); }
      else { if(heroScene)heroScene.start(); if(running){ if(hubScene)hubScene.start(); if(meshScene)meshScene.start(); } }
    },220);
  });
})();
