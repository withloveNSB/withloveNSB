document.addEventListener('DOMContentLoaded', () => {

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
    }, { threshold: 0.15 });
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
