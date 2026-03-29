// Reveal sections and project rows as they enter view.
(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) e.target.classList.add('reveal');
      }
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.signal-inner, .lab-list li').forEach((el) => {
    el.classList.add('reveal-on-scroll');
    observer.observe(el);
  });
})();

// Keep footer year current
(function () {
  const year = new Date().getFullYear();
  const copyright = document.querySelector('.copyright');
  if (!copyright) return;
  copyright.textContent = `© ${year} Hivemind Studio`;
})();

// Boot-up terminal intro
(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const boot = document.getElementById('boot');
  const log = document.getElementById('boot-log');
  if (!boot || !log) return; // safety

  const lines = [
    'HIVEMIND STUDIO v2026.0 :: initializing...\n',
    'bios.ok  mem.check  [OK]\n',
    'neural_fabrics [ONLINE]\n',
    'synthetic_worlds [READY]\n',
    'toolchain [LINKED]\n',
    '\nEnter the Lab to proceed >'
  ];

  let i = 0; // line index
  let j = 0; // char index
  let cancelled = false;

  function hideBoot() {
    boot.classList.add('hidden');
    setTimeout(() => { boot.remove(); }, 600);
    window.removeEventListener('keydown', skip);
    window.removeEventListener('click', skip);
  }

  function skip() {
    cancelled = true;
    log.textContent = lines.join('');
    hideBoot();
  }

  function typeNext() {
    if (cancelled) return;
    if (i >= lines.length) { hideBoot(); return; }
    const current = lines[i];
    log.textContent += current[j] || '';
    j++;
    if (j < current.length) {
      setTimeout(typeNext, prefersReduced ? 0 : Math.max(12, Math.random() * 28));
    } else {
      i++; j = 0;
      setTimeout(typeNext, prefersReduced ? 0 : 260);
    }
  }

  if (prefersReduced) {
    skip();
  } else {
    window.addEventListener('keydown', skip, { once: false });
    window.addEventListener('click', skip, { once: false });
    setTimeout(typeNext, 240);
  }
})();

// Subtle pointer motion in the hero to add depth without fighting the layout.
(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hero = document.querySelector('.hero');
  const orbA = document.querySelector('.hero-orb-a');
  const orbB = document.querySelector('.hero-orb-b');

  if (prefersReduced || !hero || !orbA || !orbB) return;

  hero.addEventListener('pointermove', (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    orbA.style.transform = `translate(${x * 24}px, ${y * 18}px)`;
    orbB.style.transform = `translate(${x * -18}px, ${y * -14}px)`;
  });

  hero.addEventListener('pointerleave', () => {
    orbA.style.transform = '';
    orbB.style.transform = '';
  });
})();
