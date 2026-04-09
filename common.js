// ===== LOADING =====
window.addEventListener('load',function(){
    setTimeout(function(){document.getElementById('loading').classList.add('hidden')},1200);
});

// ===== MOBILE NAV =====
(function(){
    // Create overlay
    var ov=document.createElement('div');
    ov.className='nav-overlay';
    ov.id='navOverlay';
    document.body.appendChild(ov);
    ov.addEventListener('click',function(){closeNav()});
    // Add decorative elements to nav
    var nl=document.getElementById('navLinks');
    if(nl){
        ['nav-deco-top','nav-deco-bottom','nav-deco-line','nav-deco-line2'].forEach(function(c){
            var d=document.createElement('div');d.className=c;nl.appendChild(d);
        });
    }
    // 固定SNSリンクを全ページに自動追加（未設置ページのみ）
    if(!document.querySelector('.hero-social')){
        var s=document.createElement('div');
        s.className='hero-social';
        s.innerHTML='<a href="https://www.tiktok.com/@soramaru_ao_v" target="_blank" rel="noopener" aria-label="TikTok"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.7a8.18 8.18 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.13z"/></svg></a>'+
            '<a href="https://x.com/soramaru_ao_" target="_blank" rel="noopener" aria-label="X"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>'+
            '<a href="https://www.instagram.com/soramaru_ao_v" target="_blank" rel="noopener" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>'+
            '<a href="https://soramaruaov.booth.pm" target="_blank" rel="noopener" aria-label="BOOTH"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm3 3h8v2H8V8zm0 4h8v2H8v-2z"/></svg></a>';
        document.body.appendChild(s);
    }
})();
var scrollPos=0;
function toggleNav(){
    var open=document.getElementById('navLinks').classList.toggle('open');
    document.getElementById('navOverlay').classList.toggle('open');
    if(open){
        scrollPos=window.pageYOffset;
        document.body.classList.add('nav-open');
        document.body.style.top=-scrollPos+'px';
    }else{
        document.body.classList.remove('nav-open');
        document.body.style.top='';
        window.scrollTo(0,scrollPos);
    }
}
function closeNav(){
    document.getElementById('navLinks').classList.remove('open');
    document.getElementById('navOverlay').classList.remove('open');
    document.body.classList.remove('nav-open');
    document.body.style.top='';
    window.scrollTo(0,scrollPos);
}

// ===== STARS =====
var cv=document.getElementById('stars-canvas'),cx=cv.getContext('2d'),stars=[];
function resize(){cv.width=innerWidth;cv.height=innerHeight}
function makeStars(){
    stars=[];var n=Math.floor((cv.width*cv.height)/8000);
    for(var i=0;i<n;i++)
        stars.push({x:Math.random()*cv.width,y:Math.random()*cv.height,
            r:Math.random()*1.5+.3,a:Math.random()*.8+.2,
            s:Math.random()*.02+.005,p:Math.random()*Math.PI*2});
}
function drawStars(){
    cx.clearRect(0,0,cv.width,cv.height);var t=Date.now()*.001;
    for(var i=0;i<stars.length;i++){
        var s=stars[i],f=Math.sin(t*s.s*10+s.p)*.3+.7;
        cx.beginPath();cx.arc(s.x,s.y,s.r,0,Math.PI*2);
        cx.fillStyle='rgba(240,215,140,'+(s.a*f)+')';cx.fill();
    }
    requestAnimationFrame(drawStars);
}
resize();makeStars();drawStars();
addEventListener('resize',function(){resize();makeStars()});

// ===== SHOOTING STARS =====
setInterval(function(){
    var s=document.createElement('div');s.className='shooting-star';
    s.style.left=Math.random()*innerWidth+'px';
    s.style.top=Math.random()*(innerHeight*.5)+'px';
    document.body.appendChild(s);setTimeout(function(){s.remove()},1000);
},5000);

// ===== SCROLL REVEAL =====
var observer=new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:0.1});
document.querySelectorAll('.reveal').forEach(function(el){observer.observe(el)});

// ===== NAV EVENT LISTENERS =====
var hamburger=document.querySelector('.hamburger');
if(hamburger)hamburger.addEventListener('click',toggleNav);
// ナビリンク: 明示的にbody状態をクリアしてから遷移
document.querySelectorAll('.nav-links a').forEach(function(a){
    a.addEventListener('click',function(e){
        var href=this.getAttribute('href');
        if(!href||href.charAt(0)==='#')return;
        e.preventDefault();
        document.body.classList.remove('nav-open');
        document.body.style.top='';
        window.location.href=href;
    });
});

// ===== MASCOT =====
var mascot=document.getElementById('sdMascot');
if(mascot){
    var mSrcs=['SD3.png','SD1.png','Touka_s.png'],mIdx=0;
    mascot.addEventListener('click',function(){
        mIdx=(mIdx+1)%mSrcs.length;
        mascot.style.transform='scale(1.3) rotate(15deg)';
        setTimeout(function(){mascot.src=mSrcs[mIdx];mascot.style.transform=''},200);
    });
}
