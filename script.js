// Small enhancement: reveal effect on scroll for lab items
(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) e.target.classList.add('reveal');
      }
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.lab-list li').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(6px)';
    el.style.transition = 'opacity 400ms ease, transform 400ms ease';
    observer.observe(el);
  });

  // When revealed, fade in
  const style = document.createElement('style');
  style.textContent = `.lab-list li.reveal{opacity:1 !important; transform:translateY(0) !important;}`;
  document.head.appendChild(style);
})();

// Boot-up terminal intro
(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const boot = document.getElementById('boot');
  const log = document.getElementById('boot-log');
  if (!boot || !log) return; // safety

  const lines = [
    'HIVEMIND STUDIO v2025.0 :: initializing...\n',
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

