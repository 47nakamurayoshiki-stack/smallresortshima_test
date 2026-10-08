const L=[['TOP','index.html'],['FEATURES','index.html#features'],['FACILITY','facility.html'],['ACTIVITY','index.html#activity'],['ACCESS','access.html'],['Q&A','index.html#qa'],['VOICE','index.html#voice'],['CONTACT','index.html#contact']];
const RES='https://travel.yahoo.co.jp/00921890/'; // ←WEB予約URLに差し替え
const nav=L.map(([t,h])=>`<a class="en" href="${h}">${t}</a>`).join('');
const IG='<a class="ig" href="https://www.instagram.com/smallresortshima/" target="_blank"><img src="img/instagram.png" alt="Instagram"></a>';
document.body.insertAdjacentHTML('afterbegin',`<header><a class="logo en" href="index.html">Small Resort 志摩</a><nav id="gn">${nav}${IG}<a class="btn mb" href="${RES}">WEB予約はこちら ――</a></nav><button class="burger" aria-label="menu" onclick="gn.classList.toggle('on')"><i></i><i></i><i></i></button></header>`);
document.body.insertAdjacentHTML('beforeend',`<footer><div class="w"><div><h3>スモールリゾート志摩</h3><p>〒517-0704 三重県志摩市志摩町越賀759-3</p><p><a class="btn" href="${RES}">WEB予約はこちら ――</a></p><p style="font-size:12px"><a href="index.html#contact">当サイトに関するお問い合わせはこちら</a><br><a href="privacy.html">プライバシーポリシー</a></p></div><nav class="en">${nav}${IG}</nav></div><small>©スモールリゾート志摩 Allrights Reserved.</small></footer><div id="lb"><img alt=""></div>`);
// 仮画像: 画像ファイルが無い場合はグレーを表示(img/ に差し替えるだけでOK)
const PH='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="600" height="400" fill="#b9c9cc"/><text x="300" y="210" font-size="28" text-anchor="middle" fill="#fff">IMAGE</text></svg>');
const fb=i=>{if(i.src!==PH)i.src=PH};
document.addEventListener('error',e=>e.target.tagName=='IMG'&&fb(e.target),true);
document.querySelectorAll('img').forEach(i=>i.complete&&!i.naturalWidth&&fb(i));
// スライダー
document.querySelectorAll('.sl').forEach(s=>{const t=s.querySelector('.tr'),n=t.children.length,d=s.querySelector('.dots');let k=0;
d.innerHTML='<i></i>'.repeat(n);const go=x=>{k=(x+n)%n;t.style.transform=`translateX(-${k*100}%)`;[...d.children].forEach((e,j)=>e.classList.toggle('on',j==k))};
s.querySelector('.p').onclick=()=>go(k-1);s.querySelector('.n').onclick=()=>go(k+1);go(0);setInterval(()=>go(k+1),5000)});
// 画像拡大
const lb=document.getElementById('lb');document.addEventListener('click',e=>{const i=e.target.closest('[data-zoom] img');if(!i||i.closest('header,footer,#lb'))return;lb.firstChild.src=i.src;lb.classList.add('on')});lb.onclick=()=>lb.classList.remove('on');
// フォーム送信
const f=document.getElementById('cf');if(f)f.onsubmit=async e=>{e.preventDefault();const m=document.getElementById('msg');m.textContent='送信中...';
try{const r=await fetch('contact.php',{method:'POST',body:new FormData(f)});const j=await r.json();m.textContent=j.message;if(j.ok)f.reset()}catch{m.textContent='送信に失敗しました。時間をおいて再度お試しください。'}};
// スクロールでフェードイン
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const t=e.target;t.classList.add('in');io.unobserve(t);setTimeout(()=>{t.classList.remove('fi','in');t.style.transitionDelay=''},1500)}),{threshold:.15});
document.querySelectorAll('main .h2,.h2,.sub,.lead,.feat,.card,details,form,.arrow,.info,.map iframe,.g img').forEach(el=>{if(el.closest('.hero'))return;
if(el.matches('.g img')){el.style.transitionDelay=([...el.parentNode.children].indexOf(el)%4*.12)+'s'}
el.classList.add('fi');io.observe(el)})}
