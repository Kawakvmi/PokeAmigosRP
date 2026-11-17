// Decorative foil light, clipped to the existing packaging silhouettes.
(() => {
  'use strict';
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.hero-pack').forEach((pack, index) => {
    const svg = pack.querySelector('.pack-cutout');
    if (!svg) return;
    const [x, y, width, height] = svg.getAttribute('viewBox').split(/\s+/).map(Number);
    const clip = svg.querySelector('image').getAttribute('clip-path');
    const sheenId = `pack-sheen-${index}`;
    const lightId = `pack-light-${index}`;
    svg.querySelector('defs').insertAdjacentHTML('beforeend', `
      <linearGradient id="${sheenId}" x1="0" y1="0.2" x2="1" y2="0.8">
        <stop offset="0.25" stop-color="#d6b4ff" stop-opacity="0"/>
        <stop offset="0.43" stop-color="#c9eeff" stop-opacity="0.12"/>
        <stop offset="0.5" stop-color="#ffffff" stop-opacity="0.7"/>
        <stop offset="0.57" stop-color="#ffe6bd" stop-opacity="0.16"/>
        <stop offset="0.75" stop-color="#d6b4ff" stop-opacity="0"/>
      </linearGradient>
      <radialGradient id="${lightId}" gradientUnits="userSpaceOnUse" cx="${x + width / 2}" cy="${y + height / 2}" r="${width * 0.8}">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.48"/>
        <stop offset="0.3" stop-color="#e8d6ff" stop-opacity="0.22"/>
        <stop offset="1" stop-color="#b787ed" stop-opacity="0"/>
      </radialGradient>`);
    svg.insertAdjacentHTML('beforeend', `
      <g class="pack-light" clip-path="${clip}" aria-hidden="true" pointer-events="none">
        <rect x="${x}" y="${y}" width="${width}" height="${height}" fill="url(#${lightId})"/>
        <rect class="pack-sheen" x="${x}" y="${y}" width="${width}" height="${height}" fill="url(#${sheenId})"/>
      </g>`);
    const light = svg.querySelector(`#${lightId}`);
    let pressedPointer = null;
    let pressedPointerType = null;
    let frame = 0;
    let pointerPosition;
    function moveLight(event) {
      if (reducedMotion.matches) return;
      pointerPosition = { x: event.clientX, y: event.clientY };
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const matrix = svg.getScreenCTM();
        if (!matrix) return;
        // Account for the rotated SVG and its preserveAspectRatio letterboxing.
        const point = new DOMPoint(pointerPosition.x, pointerPosition.y).matrixTransform(matrix.inverse());
        light.setAttribute('cx', Math.max(x, Math.min(x + width, point.x)));
        light.setAttribute('cy', Math.max(y, Math.min(y + height, point.y)));
      });
    }
    function reset() {
      pack.classList.remove('is-lit', 'is-pressed');
      pressedPointer = null;
      pressedPointerType = null;
      cancelAnimationFrame(frame);
      frame = 0;
    }
    pack.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse') { pack.classList.add('is-lit'); moveLight(event); }
    }, { passive: true });
    pack.addEventListener('pointerdown', event => {
      if (!event.isPrimary || event.button !== 0) return;
      pressedPointer = event.pointerId;
      pressedPointerType = event.pointerType;
      pack.classList.add('is-lit', 'is-pressed');
      moveLight(event);
    }, { passive: true });
    pack.addEventListener('pointermove', event => {
      if (event.pointerType === 'mouse' || event.pointerId === pressedPointer) moveLight(event);
    }, { passive: true });
    pack.addEventListener('pointerleave', reset, { passive: true });
    pack.addEventListener('contextmenu', event => {
      if (pressedPointer !== null && pressedPointerType !== 'mouse') event.preventDefault();
    });
    window.addEventListener('pointerup', event => {
      if (event.pointerId !== pressedPointer) return;
      if (event.pointerType === 'mouse') {
        pressedPointer = null;
        pressedPointerType = null;
        pack.classList.remove('is-pressed');
      } else reset();
    }, { passive: true });
    window.addEventListener('pointercancel', reset, { passive: true });
    window.addEventListener('blur', reset);
    document.addEventListener('visibilitychange', () => { if (document.hidden) reset(); });
    reducedMotion.addEventListener('change', () => {
      reset();
      light.setAttribute('cx', x + width / 2);
      light.setAttribute('cy', y + height / 2);
    });
  });
})();
