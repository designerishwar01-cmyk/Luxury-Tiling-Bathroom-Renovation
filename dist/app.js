'use strict';
const MAPS_URL='https://www.google.com/maps/place/Luxury+Tiling+%26+Bathroom+Renovation/data=!4m7!3m6!1s0x487613834ab49989:0xab554b63fdfc1775!8m2!3d51.5192223!4d-0.3256128!16s%2Fg%2F11mksmryk1!19sChIJiZm0SoMTdkgRdRf8_WNLVas?authuser=0&hl=en&g_ep=EgoyMDI2MDkyNy4xIJJjKgBIAVAD&rclk=1';
document.querySelectorAll('[data-maps]').forEach(a=>a.href=MAPS_URL);
document.getElementById('year').textContent=new Date().getFullYear();
const timer=document.getElementById('countdown');
const DEMO_EXPIRES_AT=Date.parse(window.DEMO_START_AT)+7*24*60*60*1000;
function updateCountdown(){const remaining=Math.max(0,DEMO_EXPIRES_AT-Date.now());if(!Number.isFinite(remaining)){timer.textContent='Preview timing unavailable.';return}if(remaining===0){timer.textContent='This preview has expired.';return}const total=Math.floor(remaining/1000),days=Math.floor(total/86400),hours=Math.floor(total%86400/3600),minutes=Math.floor(total%3600/60),seconds=total%60;timer.textContent=`${days} Days ${String(hours).padStart(2,'0')} Hours ${String(minutes).padStart(2,'0')} Minutes ${String(seconds).padStart(2,'0')} Seconds`}
updateCountdown();setInterval(updateCountdown,1000);
const menu=document.getElementById('menu-toggle'),nav=document.getElementById('navigation');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');document.body.classList.remove('menu-open')}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');document.body.classList.toggle('menu-open',open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();menu.focus()}if(e.key==='Tab'&&menu.getAttribute('aria-expanded')==='true'){const links=[...nav.querySelectorAll('a'),menu];const first=links[0],last=links[links.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
const motion=matchMedia('(prefers-reduced-motion: reduce)');
if('IntersectionObserver'in window){document.documentElement.classList.add('js');const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}}),{threshold:.08,rootMargin:'0px 0px -20px 0px'});document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el))}
const header=document.getElementById('header'),transform=document.getElementById('transformations'),stages=[...document.querySelectorAll('.transform-stages>div')],process=document.querySelector('.process-grid');
const clamp=v=>Math.min(1,Math.max(0,v));let scheduled=false;
function updateScroll(){scheduled=false;header.classList.toggle('scrolled',window.scrollY>100);if(!motion.matches){const rect=transform.getBoundingClientRect();const mobile=window.innerWidth<=700;const progress=mobile?clamp((innerHeight*.8-rect.top)/(rect.height*.68)):clamp((78-rect.top)/(rect.height-innerHeight+78));transform.style.setProperty('--progress',progress.toFixed(4));const stage=Math.min(2,Math.floor(progress*3));stages.forEach((el,i)=>el.classList.toggle('active',i===stage));const pr=process.getBoundingClientRect();process.style.setProperty('--line-progress',clamp((innerHeight*.85-pr.top)/(mobile?pr.height:innerHeight*.5)));}else{transform.style.setProperty('--progress',.5);process.style.setProperty('--line-progress',1)}}
function onScroll(){if(!scheduled){scheduled=true;requestAnimationFrame(updateScroll)}}
window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',()=>{if(innerWidth>1000)closeMenu();onScroll()});motion.addEventListener('change',onScroll);updateScroll();
