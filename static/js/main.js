(function () {
  'use strict';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobile menu ---------- */
  var btn = document.getElementById('menu-btn');
  var menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    var iconOpen = document.getElementById('icon-open');
    var iconClose = document.getElementById('icon-close');
    var setMenu = function (open) {
      menu.classList.toggle('hidden', !open);
      iconOpen.classList.toggle('hidden', open);
      iconClose.classList.toggle('hidden', !open);
      btn.setAttribute('aria-expanded', String(open));
    };
    btn.addEventListener('click', function () { setMenu(menu.classList.contains('hidden')); });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    window.addEventListener('resize', function () { if (window.innerWidth >= 768) setMenu(false); });
  }

  /* ---------- Header style on scroll ---------- */
  var header = document.getElementById('site-header');
  var onScroll = function () { if (header) header.classList.toggle('is-scrolled', window.scrollY > 20); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll-spy for nav ---------- */
  var links = document.querySelectorAll('.nav-link[data-nav]');
  var sections = [];
  links.forEach(function (l) {
    var s = document.getElementById(l.dataset.nav);
    if (s) sections.push({ el: s, link: l });
  });
  if (sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (l) { l.classList.remove('is-active'); });
          var hit = sections.find(function (s) { return s.el === e.target; });
          if (hit) hit.link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s.el); });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Portfolio tabs (Projects / Certificates) + mobile carousel ---------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var items = document.querySelectorAll('.portfolio-item');
  var track = document.getElementById('portfolio-track');
  var prevBtn = document.getElementById('portfolio-prev');
  var nextBtn = document.getElementById('portfolio-next');
  var controls = document.getElementById('portfolio-controls');
  var curEl = document.getElementById('portfolio-current');
  var totEl = document.getElementById('portfolio-total');

  var visibleItems = function () {
    return Array.prototype.filter.call(items, function (it) { return !it.classList.contains('hidden'); });
  };
  var stepSize = function () {
    var v = visibleItems();
    if (v.length > 1) return v[1].offsetLeft - v[0].offsetLeft;
    return track ? track.clientWidth : 1;
  };
  var currentIndex = function () {
    return Math.max(0, Math.min(visibleItems().length - 1, Math.round(track.scrollLeft / stepSize())));
  };
  var updateCarousel = function () {
    if (!track || !controls) return;
    var total = visibleItems().length, idx = currentIndex();
    controls.classList.toggle('invisible', total <= 1);
    if (curEl) curEl.textContent = total ? idx + 1 : 0;
    if (totEl) totEl.textContent = total;
    if (prevBtn) prevBtn.disabled = idx <= 0;
    if (nextBtn) nextBtn.disabled = idx >= total - 1;
  };
  var pending = null, pendingTimer;
  var goTo = function (i) {
    var total = visibleItems().length;
    pending = Math.max(0, Math.min(total - 1, i));
    track.scrollTo({ left: pending * stepSize(), behavior: 'smooth' });
    clearTimeout(pendingTimer);
    pendingTimer = setTimeout(function () { pending = null; }, 800);
  };
  // while a smooth scroll is still running, quick taps build on the target card
  var baseIndex = function () { return pending !== null ? pending : currentIndex(); };
  if (track) {
    var ticking = false;
    track.addEventListener('scroll', function () {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () { updateCarousel(); ticking = false; });
    }, { passive: true });
    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(baseIndex() - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(baseIndex() + 1); });
    window.addEventListener('resize', updateCarousel);
  }

  var applyFilter = function (f) {
    filterBtns.forEach(function (x) { x.classList.toggle('is-active', x.dataset.filter === f); });
    items.forEach(function (it) {
      var show = it.classList.contains(f);
      it.classList.toggle('hidden', !show);
      if (show) it.classList.add('is-visible');
    });
    if (track) {
      track.style.scrollBehavior = 'auto';
      track.scrollLeft = 0;
      track.style.scrollBehavior = '';
      updateCarousel();
    }
  };
  if (filterBtns.length) {
    // hide a tab if it has nothing in it
    filterBtns.forEach(function (b) {
      if (!document.querySelector('.portfolio-item.' + b.dataset.filter)) b.classList.add('hidden');
      b.addEventListener('click', function () { applyFilter(b.dataset.filter); });
    });
    // start on Projects, or Certificates if there are no projects
    applyFilter(document.querySelector('.portfolio-item.project') ? 'project' : 'certificate');
  }

  /* ---------- Optional images from static/images ----------
     <img data-img-base="/static/images/projects/my-slug"> tries .jpg, .png, .webp.
     If none exist the <img> is removed and the SVG fallback underneath stays visible. */
  var exts = ['jpg', 'jpeg', 'png', 'webp'];
  document.querySelectorAll('img[data-img-base]').forEach(function (img) {
    var base = img.getAttribute('data-img-base'), n = 0;
    img.addEventListener('error', function () {
      n++;
      if (n < exts.length) { img.src = base + '.' + exts[n]; } else { img.remove(); }
    });
    img.src = base + '.' + exts[0];
  });

  /* ---------- Typing effect ---------- */
  var typed = document.getElementById('typed-text');
  var source = document.querySelectorAll('#roles-source li');
  var roles = Array.prototype.map.call(source, function (li) { return li.textContent.trim(); }).filter(Boolean);
  if (typed && roles.length && !reduceMotion) {
    var i = 0, c = 0, del = false;
    (function tick() {
      var cur = roles[i];
      if (!del) {
        c++;
        typed.textContent = cur.slice(0, c);
        if (c >= cur.length) { del = true; return setTimeout(tick, 1400); }
      } else {
        c--;
        typed.textContent = cur.slice(0, c);
        if (c <= 0) { del = false; i = (i + 1) % roles.length; return setTimeout(tick, 300); }
      }
      setTimeout(tick, del ? 45 : 90);
    })();
  }

  /* ---------- Neural-network background ---------- */
  var canvas = document.getElementById('neural-bg');
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var w, h, dpr, nodes = [], mouse = { x: -9999, y: -9999 };

    var resize = function () {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      var r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.max(24, Math.min(80, Math.round((w * h) / 18000)));
      nodes = [];
      for (var n = 0; n < count; n++) {
        nodes.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.6 + 0.8
        });
      }
    };

    var maxDist = function () { return w < 640 ? 100 : 140; };

    var draw = function () {
      ctx.clearRect(0, 0, w, h);
      var md = maxDist();
      for (var a = 0; a < nodes.length; a++) {
        var p = nodes[a];
        if (!reduceMotion) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
        for (var b = a + 1; b < nodes.length; b++) {
          var q = nodes[b], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < md) {
            ctx.strokeStyle = 'rgba(34,211,238,' + (0.22 * (1 - d / md)) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        var mx = p.x - mouse.x, my = p.y - mouse.y, md2 = Math.sqrt(mx * mx + my * my);
        if (md2 < 160) {
          ctx.strokeStyle = 'rgba(139,92,246,' + (0.45 * (1 - md2 / 160)) + ')';
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        ctx.fillStyle = 'rgba(165,243,252,0.85)';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
    };

    var raf, running = true;
    var loop = function () { draw(); if (running && !reduceMotion) raf = requestAnimationFrame(loop); };

    resize(); loop();
    var rt;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { resize(); if (reduceMotion) draw(); }, 150); });
    canvas.parentElement.addEventListener('mousemove', function (e) {
      var r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    canvas.parentElement.addEventListener('mouseleave', function () { mouse.x = mouse.y = -9999; });

    /* Pause when hero is off-screen to save battery */
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        running = en[0].isIntersecting;
        if (running && !reduceMotion) { cancelAnimationFrame(raf); loop(); }
      }).observe(canvas);
    }
  }
})();
