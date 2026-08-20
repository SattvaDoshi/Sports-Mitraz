
const slides = [...document.querySelectorAll('.slide')];
const dots = [...document.querySelectorAll('.dot')];
let current = 0, timer;

function showSlide(i){
  if(!slides.length) return;
  current = (i + slides.length) % slides.length;
  slides.forEach((s,idx)=>s.classList.toggle('active', idx===current));
  dots.forEach((d,idx)=>d.classList.toggle('active', idx===current));
}
function nextSlide(){showSlide(current+1)}
function prevSlide(){showSlide(current-1)}
function startAuto(){ stopAuto(); timer=setInterval(nextSlide, 4500); }
function stopAuto(){ if(timer) clearInterval(timer); }

document.querySelector('.next')?.addEventListener('click',()=>{nextSlide();startAuto()});
document.querySelector('.prev')?.addEventListener('click',()=>{prevSlide();startAuto()});
dots.forEach((d,i)=>d.addEventListener('click',()=>{showSlide(i);startAuto()}));
document.querySelector('.slider')?.addEventListener('mouseenter',stopAuto);
document.querySelector('.slider')?.addEventListener('mouseleave',startAuto);
startAuto();
