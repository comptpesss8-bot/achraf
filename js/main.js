(function () {
  const root = document.documentElement, body = document.body;
  root.classList.add("js");

  /* Écran de chargement : vidéo plein écran + progression */
  const loader = document.getElementById("loader"), vid = document.getElementById("intro");
  const fill = document.getElementById("ld-fill"), pct = document.getElementById("ld-pct");
  let closed = false, loaded = document.readyState === "complete";
  window.addEventListener("load", () => { loaded = true; });
  function hideLoader() {
    if (closed) return; closed = true;
    fill.style.transform = "scaleX(1)"; pct.textContent = "100%";
    setTimeout(() => {
      loader.classList.add("hidden");
      body.classList.remove("is-loading");
      setTimeout(() => loader.remove(), 1000);
    }, 250);
  }
  const t0 = performance.now(), DUR = 4200;
  (function tick() {
    if (closed) return;
    const d = vid.duration > 0 && !vid.paused ? vid.duration * 1000 : DUR;
    const t = vid.currentTime > 0 ? vid.currentTime * 1000 : performance.now() - t0;
    const p = Math.min(t / d, 1);
    fill.style.transform = "scaleX(" + p + ")";
    pct.textContent = Math.round(p * 100) + "%";
    if (p >= 1 && loaded) return hideLoader();
    requestAnimationFrame(tick);
  })();
  vid.play && vid.play().catch(() => {});
  setTimeout(hideLoader, 9000);

  /* Navigation */
  const navbar = document.querySelector(".navbar"), burger = document.querySelector(".burger");
  const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 20);
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
  function setMenu(open) {
    body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  }
  burger.addEventListener("click", () => setMenu(!body.classList.contains("menu-open")));
  document.querySelectorAll("#nav-menu a").forEach(a => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

  /* Onglets évènements */
  document.querySelectorAll(".tab").forEach(tab => tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => { t.classList.toggle("active", t === tab); t.setAttribute("aria-selected", t === tab); });
    document.getElementById("ev-upcoming").hidden = tab.dataset.tab !== "upcoming";
    document.getElementById("ev-past").hidden = tab.dataset.tab !== "past";
  }));

  /* Apparition au scroll */
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
    }), { threshold: 0.15 });
    items.forEach(el => io.observe(el));
  } else items.forEach(el => el.classList.add("visible"));
})();


(function(){var lb=document.getElementById("lightbox"),im=lb.querySelector("img");
document.querySelectorAll(".g-item").forEach(function(b){b.addEventListener("click",function(){var i=b.querySelector("img");im.src=i.src;im.alt=i.alt;lb.classList.add("open")})});
lb.addEventListener("click",function(){lb.classList.remove("open")});
document.addEventListener("keydown",function(e){if(e.key==="Escape")lb.classList.remove("open")});})();


(function(){var home=document.getElementById("home"),ev=document.getElementById("event-page");
function route(){var h=location.hash;
 if(h==="#evenement-14-novembre"){home.hidden=true;ev.hidden=false;window.scrollTo(0,0);}
 else{var was=home.hidden;home.hidden=false;ev.hidden=true;
  if(was){var t=h.length>1&&document.getElementById(h.slice(1));setTimeout(function(){t?t.scrollIntoView():window.scrollTo(0,0)},0);}}}
window.addEventListener("hashchange",route);route();})();
