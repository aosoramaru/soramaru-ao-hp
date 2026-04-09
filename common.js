// ===== LOADING / WELCOME (post office) =====
(function(){
    var loadingEl=document.getElementById('loading');
    if(!loadingEl)return;
    var name=null,deptLabel=null,setupDone=false,welcomed=false;
    try{
        name=localStorage.getItem('soramaru_user_name');
        deptLabel=localStorage.getItem('soramaru_dept_label');
        setupDone=localStorage.getItem('soramaru_setup_done')==='1';
        welcomed=localStorage.getItem('soramaru_welcome_shown')==='1';
    }catch(e){}
    var shouldWelcome=setupDone&&!welcomed&&!!name&&!!deptLabel;
    var shouldPersonal=setupDone&&welcomed&&!!name&&!!deptLabel;

    if(shouldWelcome){
        loadingEl.classList.add('is-welcome');
        loadingEl.innerHTML=
            '<div class="welcome-inner">'+
                '<div class="welcome-brand">SORAMARU POST OFFICE</div>'+
                '<div class="welcome-title">宙丸郵便局</div>'+
                '<div class="welcome-divider"></div>'+
                '<div class="welcome-dept">YOUR DIVISION</div>'+
                '<div class="welcome-dept-name">'+escapeHtml(deptLabel)+'</div>'+
                '<div class="welcome-user">'+escapeHtml(name)+'</div>'+
                '<div class="welcome-divider2"></div>'+
                '<div class="welcome-message">ようこそ宙丸郵便局へ</div>'+
            '</div>';
        requestAnimationFrame(function(){loadingEl.classList.add('welcome-show')});
    }else if(shouldPersonal){
        // 通常ローディング(パーソナライズ版): 既存imgを残してpタグだけ差し替え
        var lp=loadingEl.querySelector('p');
        if(lp){
            lp.classList.add('loading-personal');
            lp.innerHTML=
                '<span class="lp-dept">'+escapeHtml(deptLabel)+'</span>'+
                '<span class="lp-name">'+escapeHtml(name)+'</span>'+
                '<span class="lp-status">閲覧中...</span>';
        }
    }

    window.addEventListener('load',function(){
        var delay=shouldWelcome?3400:1200;
        setTimeout(function(){
            loadingEl.classList.add('hidden');
            if(shouldWelcome){
                try{localStorage.setItem('soramaru_welcome_shown','1')}catch(e){}
            }
        },delay);
    });
    function escapeHtml(s){
        return String(s).replace(/[&<>"']/g,function(c){
            return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
        });
    }
})();

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

// ===== POST OFFICE: NAV BADGE (名前/配属表示) =====
(function(){
    var hamb=document.querySelector('.hamburger');
    if(!hamb||!hamb.parentNode)return;
    var name=null,deptLabel=null;
    try{
        name=localStorage.getItem('soramaru_user_name');
        deptLabel=localStorage.getItem('soramaru_dept_label');
    }catch(e){}
    var displayName=name||'流青群';
    var displayDept=deptLabel||'未所属';
    function esc(s){return String(s).replace(/[&<>"']/g,function(c){return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]})}
    var badge=document.createElement('a');
    badge.className='nav-badge';
    badge.href='setting.html';
    badge.title='公式設定で変更';
    badge.innerHTML=
        '<span class="nav-badge-dept">'+esc(displayDept)+'</span>'+
        '<span class="nav-badge-name">'+esc(displayName)+'</span>';
    hamb.parentNode.insertBefore(badge,hamb);
})();

// ===== POST OFFICE: SETUP MODAL =====
(function(){
    var KEY_NAME='soramaru_user_name';
    var KEY_DEPT='soramaru_dept';
    var KEY_DEPT_LABEL='soramaru_dept_label';
    var KEY_DONE='soramaru_setup_done';
    var KEY_WELCOMED='soramaru_welcome_shown';
    var KEY_SKIP='soramaru_setup_skip';

    var DEPARTMENTS=[
        {key:'dept1',emoji:'⚔️',label:'第1課 特務'},
        {key:'dept2',emoji:'📣',label:'第2課 広報宣伝部'},
        {key:'dept3',emoji:'🐺',label:'第3課 ルドのお世話係'},
        {key:'dept4',emoji:'📮',label:'第4課 配達部'}
    ];

    function get(k){try{return localStorage.getItem(k)}catch(e){return null}}
    function set(k,v){try{localStorage.setItem(k,v)}catch(e){}}

    function escapeHtml(s){
        return String(s).replace(/[&<>"']/g,function(c){
            return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
        });
    }

    function buildWelcomeOverlay(){
        var name=get(KEY_NAME);
        var deptLabel=get(KEY_DEPT_LABEL);
        if(!name||!deptLabel)return;
        set(KEY_WELCOMED,'1');
        var w=document.createElement('div');
        w.id='welcomeScreen';
        w.innerHTML=
            '<div class="welcome-inner">'+
                '<div class="welcome-brand">SORAMARU POST OFFICE</div>'+
                '<div class="welcome-title">宙丸郵便局</div>'+
                '<div class="welcome-divider"></div>'+
                '<div class="welcome-dept">YOUR DIVISION</div>'+
                '<div class="welcome-dept-name">'+escapeHtml(deptLabel)+'</div>'+
                '<div class="welcome-user">'+escapeHtml(name)+'</div>'+
                '<div class="welcome-divider2"></div>'+
                '<div class="welcome-message">ようこそ宙丸郵便局へ</div>'+
            '</div>';
        document.body.appendChild(w);
        requestAnimationFrame(function(){
            w.classList.add('show');
            setTimeout(function(){w.classList.add('fade')},2800);
            setTimeout(function(){w.remove()},3700);
        });
    }

    function buildSetup(){
        var ov=document.createElement('div');
        ov.id='setupOverlay';
        var deptHtml=DEPARTMENTS.map(function(d){
            return '<button type="button" class="setup-dept-btn" data-key="'+d.key+'" data-label="'+escapeHtml(d.label)+'"><span class="dept-emoji">'+d.emoji+'</span>'+escapeHtml(d.label)+'</button>';
        }).join('');
        ov.innerHTML=
            '<div class="setup-card">'+
                '<div class="setup-label">SORAMARU POST OFFICE</div>'+
                '<h2>ようこそ、宙丸郵便局へ</h2>'+
                '<p class="setup-desc">あなたの名前と配属を登録すると、<br>宙丸郵便局の局員として出勤できます。</p>'+
                '<input type="text" class="setup-input" id="setupNameInput" placeholder="あなたの名前 (例: TikTokのお名前)" maxlength="20">'+
                '<div class="setup-dept-list">'+deptHtml+'</div>'+
                '<div class="setup-actions">'+
                    '<button type="button" class="setup-btn-primary" id="setupSubmit" disabled>登録する</button>'+
                    '<button type="button" class="setup-btn-skip" id="setupSkip">あとで</button>'+
                '</div>'+
            '</div>';
        document.body.appendChild(ov);
        requestAnimationFrame(function(){ov.classList.add('show')});

        var nameInput=document.getElementById('setupNameInput');
        var submitBtn=document.getElementById('setupSubmit');
        var skipBtn=document.getElementById('setupSkip');
        var selectedKey=null,selectedLabel=null;

        function refreshSubmit(){
            submitBtn.disabled=!(nameInput.value.trim()&&selectedKey);
        }
        nameInput.addEventListener('input',refreshSubmit);
        ov.querySelectorAll('.setup-dept-btn').forEach(function(b){
            b.addEventListener('click',function(){
                ov.querySelectorAll('.setup-dept-btn').forEach(function(x){x.classList.remove('selected')});
                b.classList.add('selected');
                selectedKey=b.dataset.key;
                selectedLabel=b.dataset.label;
                refreshSubmit();
            });
        });
        submitBtn.addEventListener('click',function(){
            var name=nameInput.value.trim();
            if(!name||!selectedKey)return;
            set(KEY_NAME,name);
            set(KEY_DEPT,selectedKey);
            set(KEY_DEPT_LABEL,selectedLabel);
            set(KEY_DONE,'1');
            ov.classList.remove('show');
            setTimeout(function(){
                ov.remove();
                buildWelcomeOverlay();
            },500);
        });
        skipBtn.addEventListener('click',function(){
            set(KEY_SKIP,'1');
            ov.classList.remove('show');
            setTimeout(function(){ov.remove()},500);
        });
    }

    function init(){
        // 既にセットアップ済み or スキップ済み: 何もしない
        if(get(KEY_DONE)==='1')return;
        if(get(KEY_SKIP)==='1')return;
        // 初回: ローディング消えた後にセットアップを表示
        setTimeout(buildSetup,1600);
    }

    if(document.readyState==='loading'){
        document.addEventListener('DOMContentLoaded',init);
    }else{
        init();
    }
})();
