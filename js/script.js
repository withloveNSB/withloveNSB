document.addEventListener('DOMContentLoaded', () => {

  // ---- Passcode gate (a light deterrent, not strong security) ----
  // To change the passcode, replace PASS_HASH with the SHA-256 of the new code
  // (lowercase, no spaces).
  const PASS_HASH = '0c08648e9038df85d9630a03723cbefcaa729c6941768088f4645f433d7514e1';
  const gate = document.getElementById('passGate');
  const form = document.getElementById('passForm');
  const input = document.getElementById('passInput');
  const errBox = document.getElementById('passError');

  function openGate() {
    document.body.classList.remove('passlocked');
    if (gate) gate.style.display = 'none';
  }
  async function sha256(text) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  }
  let already = false;
  try { already = sessionStorage.getItem('nsb_ok') === '1'; } catch (e) {}
  if (already || !gate) { openGate(); }
  else {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const code = input.value.trim().toLowerCase().replace(/\s+/g, '');
      let ok = false;
      try { ok = (await sha256(code)) === PASS_HASH; } catch (err) { errBox.textContent = 'Please open this page in a modern browser.'; return; }
      if (ok) {
        try { sessionStorage.setItem('nsb_ok', '1'); } catch (e2) {}
        openGate();
      } else {
        errBox.textContent = "That isn't quite right. Please try again.";
        form.classList.remove('shake'); void form.offsetWidth; form.classList.add('shake');
        input.select();
      }
    });
    input.focus();
  }

  // ---- Gate: reveal the rest of the site on Enter ----
  const enterBtn = document.getElementById('enterBtn');
  const body = document.body;

  enterBtn.addEventListener('click', () => {
    body.classList.remove('locked');
    document.getElementById('content').style.display = 'block';
    // give the browser a tick to render before scrolling
    requestAnimationFrame(() => {
      document.getElementById('journey').scrollIntoView({ behavior: 'smooth' });
    });
    initRevealAndSpy();
  });

  // Allow Enter key to trigger the button when focused
  enterBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      enterBtn.click();
    }
  });


  // ---- Envelopes: tap to open / close a letter ----
  document.querySelectorAll('.envelope').forEach(env => {
    const btn = env.querySelector('.env-toggle');
    btn.addEventListener('click', () => {
      const open = env.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  function initRevealAndSpy() {
    // Scroll-reveal
    const revealEls = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -5% 0px' });
    revealEls.forEach(el => io.observe(el));

    // Scrollspy for ribbon nav + mobile chapter label
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav.ribbon a');
    const mobileChapter = document.getElementById('mobileChapter');

    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === '#' + id;
            link.classList.toggle('active', isActive);
            if (isActive) mobileChapter.textContent = link.dataset.label;
          });
        }
      });
    }, { threshold: 0.5, rootMargin: '-10% 0px -40% 0px' });

    sections.forEach(sec => spy.observe(sec));

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealEls.forEach(el => el.classList.add('in'));
    }
  }

});
