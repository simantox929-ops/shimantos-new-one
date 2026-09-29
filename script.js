const root=document.documentElement;const toggle=document.querySelector('#themeToggle');const saved=localStorage.getItem('theme');if(saved)root.dataset.theme=saved;function sync(){toggle.textContent=root.dataset.theme==='dark'?'☀':'☾'}sync();toggle.addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';localStorage.setItem('theme',root.dataset.theme);sync()});
const menu=document.querySelector('.menu-btn'),links=document.querySelector('.nav-links');menu.addEventListener('click',()=>{links.classList.toggle('open');menu.setAttribute('aria-expanded',links.classList.contains('open'))});document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));document.querySelector('#year').textContent=new Date().getFullYear();

// Local like + comment demo (GitHub Pages compatible; stored per browser/device)
document.querySelectorAll('.photo-card').forEach(card=>{
  const id=card.dataset.photo, likeKey=`photo-${id}-liked`, countKey=`photo-${id}-likes`, commentsKey=`photo-${id}-comments`;
  const likeBtn=card.querySelector('.like-btn'), count=card.querySelector('.like-count'), list=card.querySelector('.comment-list'), form=card.querySelector('.comment-form'), input=form.querySelector('input');
  let liked=localStorage.getItem(likeKey)==='true', likes=Number(localStorage.getItem(countKey)||0), comments=JSON.parse(localStorage.getItem(commentsKey)||'[]');
  const syncLike=()=>{likeBtn.classList.toggle('liked',liked);likeBtn.firstChild.textContent=liked?'♥ Liked ':'♡ Like ';count.textContent=likes};
  const renderComments=()=>{list.innerHTML='';comments.forEach(c=>{const div=document.createElement('div');div.className='comment';div.textContent=c;list.appendChild(div)})};
  syncLike();renderComments();
  likeBtn.addEventListener('click',()=>{liked=!liked;likes=Math.max(0,likes+(liked?1:-1));localStorage.setItem(likeKey,liked);localStorage.setItem(countKey,likes);syncLike()});
  card.querySelector('.focus-comment').addEventListener('click',()=>input.focus());
  form.addEventListener('submit',e=>{e.preventDefault();const value=input.value.trim();if(!value)return;comments.push(value);comments=comments.slice(-20);localStorage.setItem(commentsKey,JSON.stringify(comments));input.value='';renderComments()});
});
