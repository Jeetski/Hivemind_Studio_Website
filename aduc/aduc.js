// Minimal interactivity: set GitHub links and enable smooth scroll / copy
(function(){
  const body = document.body;
  const gh = body.getAttribute('data-github') || '';
  const zip = body.getAttribute('data-zip') || '';
  const repoLink = document.getElementById('dlRepo');
  const zipLink  = document.getElementById('dlZip');
  if (repoLink) repoLink.href = gh || '#';
  if (zipLink)  zipLink.href  = zip || '#';

  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const tgt = document.querySelector(id);
      if (!tgt) return;
      e.preventDefault();
      tgt.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // One-click copy for code blocks
  document.querySelectorAll('pre.code').forEach((pre) => {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'Copy';
    btn.style.cssText = 'position:absolute; right:10px; top:10px; padding:4px 8px; font-size:12px;';
    pre.style.position = 'relative';
    pre.appendChild(btn);
    btn.addEventListener('click', async () => {
      try {
        const text = pre.innerText.replace(/^Copy\n/, '');
        await navigator.clipboard.writeText(text);
        const t = btn.textContent; btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = t, 1000);
      } catch {}
    });
  });
})();

