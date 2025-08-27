// hex-inline.js — plain JS file served from /assets
(function () {
  let initialized = false;

  // timers + listeners we can fully clean up
  let timeouts = [];
  let robotTimer = null;
  let resizeHandler = null;
  let orientationHandler = null;

  // helpers
  function q(sel) { return document.querySelector(sel); }
  function qa(sel) { return document.querySelectorAll(sel); }
  function createTimeout(fn, ms) { const id = setTimeout(fn, ms); timeouts.push(id); return id; }
  function clearAllTimeouts() { timeouts.forEach(clearTimeout); timeouts = []; }

  function applyGlowEffect(container) {
    const hexagons = container.querySelectorAll('.hex, .hex-alt');
    hexagons.forEach((hexagon) => {
      createTimeout(() => {
        hexagon.classList.add('glow');
      }, Math.random() * 2000);
    });
  }

  function startRandomRobotAnimation(container) {
    const hexagons = container.querySelectorAll('.hex, .hex-alt');
    if (!hexagons.length) return;

    if (robotTimer) clearInterval(robotTimer);

    robotTimer = setInterval(() => {
      // remove any existing robot images
      container.querySelectorAll('.hex img, .hex-alt img').forEach((img) => img.remove());

      // pick a random hex
      const randomHex = hexagons[Math.floor(Math.random() * hexagons.length)];

      // ensure parent is positioned (CSS should set this too)
      randomHex.style.position = 'relative';

      const img = document.createElement('img');
      img.src = Math.random() < 0.5 ? '/assets/robolft.png' : '/assets/roborgt.png';
      img.alt = 'Robot';
      img.className = 'robot';
      randomHex.appendChild(img);

      // fade out after 2s, then remove
      createTimeout(() => {
        img.classList.add('fade-out');
        createTimeout(() => {
          if (img.parentNode) img.parentNode.removeChild(img);
        }, 1000);
      }, 2000);
    }, 3000);
  }

  function createHexagons(container, placeholder, overlay) {
    container.innerHTML = '';

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const hexagonWidth = 100;
    const hexagonHeight = hexagonWidth * 0.75; // matches your math
    const hexagonsPerRow = Math.floor(viewportWidth / hexagonWidth);
    const totalRows = Math.floor(viewportHeight / hexagonHeight);

    let reducedHexagonCount = Math.floor((totalRows * hexagonsPerRow) * 0.6);
    reducedHexagonCount = Math.floor(reducedHexagonCount / hexagonsPerRow) * hexagonsPerRow;

    for (let i = 0; i < reducedHexagonCount; i++) {
      const hex = document.createElement('div');
      hex.className = (i % 2 === 0) ? 'hex' : 'hex-alt';
      container.appendChild(hex);

      // stagger fade-in
      createTimeout(() => {
        hex.classList.add('show');
      }, i * 100);
    }

    // hide placeholder immediately after creation begins
    placeholder.style.display = 'none';

    // when stagger completes, show overlay + glow + robots
    createTimeout(() => {
      overlay.classList.add('show');
      applyGlowEffect(container);
      startRandomRobotAnimation(container);
    }, reducedHexagonCount * 100);
  }

  function destroy() {
    // stop timers/listeners
    clearAllTimeouts();
    if (robotTimer) { clearInterval(robotTimer); robotTimer = null; }
    if (resizeHandler) { window.removeEventListener('resize', resizeHandler); resizeHandler = null; }
    if (orientationHandler) { window.removeEventListener('orientationchange', orientationHandler); orientationHandler = null; }

    // reset DOM state so a fresh init always produces the full effect
    const container = q('.hexagon-line');
    const overlay = q('.overlay');
    const placeholder = q('.hexagon-placeholder');

    if (container) {
      // remove robots & hexes
      container.querySelectorAll('.hex img, .hex-alt img').forEach((img) => img.remove());
      container.innerHTML = '';
    }
    if (overlay) overlay.classList.remove('show');
    if (placeholder) placeholder.style.display = 'block';

    initialized = false;
  }

  function init() {
    if (initialized) return;
    const container = q('.hexagon-line');
    const placeholder = q('.hexagon-placeholder');
    const overlay = q('.overlay');

    if (!container || !placeholder || !overlay) {
      // DOM not present (other route)
      return;
    }

    // initial pass
    placeholder.style.display = 'block';
    createHexagons(container, placeholder, overlay);

    // debounced reflow on resize/orientation
    let pending = null;
    resizeHandler = () => {
      if (pending) cancelAnimationFrame(pending);
      pending = requestAnimationFrame(() => {
        createHexagons(container, placeholder, overlay);
      });
    };
    orientationHandler = resizeHandler;

    window.addEventListener('resize', resizeHandler);
    window.addEventListener('orientationchange', orientationHandler);

    initialized = true;
  }

  // public API
  window.HexDemo = { init, destroy };
})();
