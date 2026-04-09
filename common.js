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
})();
function toggleNav(){
    document.getElementById('navLinks').classList.toggle('open');
    document.getElementById('navOverlay').classList.toggle('open');
}
function closeNav(){
    document.getElementById('navLinks').classList.remove('open');
    document.getElementById('navOverlay').classList.remove('open');
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
