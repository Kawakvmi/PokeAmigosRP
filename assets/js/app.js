(() => {
  'use strict';
  const store = window.POKE_STORE;
  const catalogPage = document.body.dataset.page === 'catalog';
  const arrow = '<span aria-hidden="true">↗</span>';
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const hasPrice = p => typeof p.price === 'number' && Number.isFinite(p.price);
  const hasPromo = p => hasPrice(p) && typeof p.oldPrice === 'number' && p.oldPrice > p.price;
  const discount = p => Math.round((1 - p.price / p.oldPrice) * 100);
  // Pre-filled order message; nothing is sent until the customer taps "send" in WhatsApp.
  function orderMessage(p) {
    if (!p) return 'Olá, Poke Amigos RP! Gostaria de saber mais sobre os produtos Pokémon TCG.';
    const lines = ['Olá, Poke Amigos RP! Quero fazer um pedido:', `• ${p.name}${hasPrice(p) ? ` — ${money.format(p.price)}` : ''}`];
    if (p.orderNote) lines.push(p.orderNote);
    lines.push('Está disponível?');
    return lines.join('\n');
  }
  const whatsapp = product => `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(orderMessage(product))}`;
  const bestDeal = Math.max(0, ...store.products.filter(hasPromo).map(discount));
  // Any element with data-best-discount="… {n}% …" shows the current best promo.
  const fillBestDeal = () => { if (bestDeal) document.querySelectorAll('[data-best-discount]').forEach(el => { el.textContent = el.dataset.bestDiscount.replace('{n}', bestDeal); }); };
  document.getElementById('site-header').innerHTML = `
    ${bestDeal ? `<a class="top-bar top-promo" href="catalogo.html?formato=combo#produtos"><span class="promo-dot" aria-hidden="true"></span><strong>${escape(store.promo || 'Ofertas')}</strong><span class="top-deal">combos com até ${bestDeal}% off</span><span class="top-cta">Ver ofertas <span aria-hidden="true">↗</span></span></a>` : '<div class="top-bar">Aqui a amizade também é lendária! <span aria-hidden="true">✦</span> <span class="top-location">Ribeirão Preto · SP</span></div>'}
    <header class="site-header"><div class="container header-inner"><a href="index.html" class="brand" aria-label="Poke Amigos RP — Início"><span class="brand-logo"><img src="assets/images/logo-badge-192.png" width="192" height="192" alt="" decoding="async"></span><span class="brand-name">Poke Amigos <small>RP <span aria-hidden="true">✦</span> POKÉMON TCG</small></span></a>
    <nav class="desktop-nav" aria-label="Navegação principal"><a href="index.html" ${!catalogPage ? 'aria-current="page"' : ''}>Início</a><a href="catalogo.html" ${catalogPage ? 'aria-current="page"' : ''}>Catálogo</a><a href="index.html#sobre">A Poke Amigos</a><a href="index.html#duvidas">Dúvidas</a></nav>
    <div class="header-actions"><a class="header-contact" href="${whatsapp()}" target="_blank" rel="noopener noreferrer">Vamos conversar ${arrow}</a><button id="theme-toggle" class="theme-toggle" type="button" aria-label="Modo escuro" aria-pressed="false" title="Ativar modo escuro"><svg class="theme-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 13A8.5 8.5 0 0 1 11 3.5 8.5 8.5 0 1 0 20.5 13Z"/></svg><svg class="theme-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg><span class="theme-label">Dark</span></button><button id="menu-toggle" class="menu-toggle" aria-expanded="false" aria-controls="mobile-menu" aria-label="Abrir menu"><span></span><span></span></button></div></div>
    <nav id="mobile-menu" class="mobile-menu" aria-label="Navegação móvel" hidden><a href="index.html">Início</a><a href="catalogo.html">Catálogo</a><a href="index.html#sobre">A Poke Amigos</a><a href="index.html#duvidas">Dúvidas</a><a href="${whatsapp()}" target="_blank" rel="noopener noreferrer">Conversar no WhatsApp ${arrow}</a></nav></header>`;
  document.getElementById('site-footer').innerHTML = `
    <footer class="site-footer"><div class="container footer-main"><div><a class="footer-brand" href="index.html">Poke Amigos <span>RP</span></a><p>Aqui a amizade também é lendária!<br>Ribeirão Preto · SP</p></div><nav aria-label="Navegação do rodapé"><span class="small-label">EXPLORE</span><a href="catalogo.html">Catálogo</a><a href="index.html#sobre">A Poke Amigos</a><a href="index.html#duvidas">Dúvidas frequentes</a></nav><nav aria-label="Redes e contato"><span class="small-label">VAMOS NOS CONECTAR</span><a href="${store.instagram}" target="_blank" rel="noopener noreferrer">Instagram @pokeamigosrp ${arrow}</a><a href="${whatsapp()}" target="_blank" rel="noopener noreferrer">WhatsApp (16) 99445-1994 ${arrow}</a><a href="${store.whatsappCatalog}" target="_blank" rel="noopener noreferrer">Catálogo no WhatsApp ${arrow}</a></nav></div><div class="container footer-bottom"><span>© ${new Date().getFullYear()} Poke Amigos RP</span><p>Pokémon e suas marcas pertencem aos respectivos titulares.</p><a href="#conteudo">Voltar ao topo ↑</a></div></footer>`;
  fillBestDeal();
  const communityLink = /^https:\/\/(chat\.whatsapp\.com|wa\.me|whatsapp\.com)\//.test(store.whatsappCommunity || '') ? store.whatsappCommunity : `https://wa.me/${store.whatsapp}?text=${encodeURIComponent('Olá, Poke Amigos RP! Quero entrar na comunidade de colecionadores no WhatsApp.')}`;
  document.querySelectorAll('[data-community]').forEach(a => { a.href = communityLink; a.target = '_blank'; a.rel = 'noopener noreferrer'; });
  document.querySelectorAll('[data-whatsapp]').forEach(a => { a.href = whatsapp(); a.target = '_blank'; a.rel = 'noopener noreferrer'; });
  const themeToggle = document.getElementById('theme-toggle');
  function applyTheme(theme) {
    const dark = theme === 'dark';
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.title = dark ? 'Ativar modo claro' : 'Ativar modo escuro';
    themeToggle.querySelector('.theme-label').textContent = dark ? 'Claro' : 'Dark';
    document.querySelector('meta[name="theme-color"]').content = dark ? '#170f25' : '#542394';
  }
  applyTheme(document.documentElement.dataset.theme);
  themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(theme);
    try { localStorage.setItem('poke-amigos-theme', theme); } catch { /* Optional persistence. */ }
  });
  window.addEventListener('storage', event => {
    if (event.key === 'poke-amigos-theme') applyTheme(event.newValue);
  });
  const toggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  function closeMenu() { toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menu'); mobileMenu.hidden = true; }
  toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') === 'true'; toggle.setAttribute('aria-expanded', String(!open)); toggle.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu'); mobileMenu.hidden = open; });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !mobileMenu.hidden) { closeMenu(); toggle.focus(); } });
  matchMedia('(min-width: 1000px)').addEventListener('change', e => { if (e.matches) closeMenu(); });
  const tone = p => /^#[0-9a-f]{3,8}$/i.test(p.tone || '') ? p.tone : '#9b5de5';
  const chatIcon = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4.6 19.4 5.7 15.9A7.6 7.6 0 1 1 8.5 18.6Z"/><path d="M9.2 10.6h5.6M9.2 13.6h3.6"/></svg>';
  const packs = store.packs;
  // Clip paths are defined once and shared by every card, combo and dialog.
  document.body.insertAdjacentHTML('beforeend', `<svg class="clip-defs" width="0" height="0" aria-hidden="true" focusable="false"><defs>${Object.entries(packs).map(([key, m]) => `<clipPath id="pack-clip-${escape(key)}"><path${m.evenodd ? ' clip-rule="evenodd"' : ''} d="${escape(m.clip)}"/></clipPath>`).join('')}</defs></svg>`);
  function packSvg(key, className, style, a11y) {
    const m = packs[key];
    if (!m) return '';
    return `<svg class="pack-art ${className}" viewBox="${escape(m.viewBox)}"${style ? ` style="${style}"` : ''} ${a11y} focusable="false"><image href="${escape(m.image)}" width="${Number(m.width)}" height="${Number(m.height)}" clip-path="url(#pack-clip-${escape(key)})"/></svg>`;
  }
  // Single packaging, or a composed stack/fan for combos.
  function productArt(p, label) {
    const a11y = label ? `role="img" aria-label="${escape(label)}"` : 'aria-hidden="true"';
    const m = p.media || {};
    if (Array.isArray(m.stack)) {
      const items = m.stack.map(([key, x, y, w, r]) => {
        const [, , vw, vh] = (packs[key]?.viewBox || '0 0 1 1').split(/\s+/).map(Number);
        return packSvg(key, 'stack-item', `--x:${+x}%;--y:${+y}%;--w:${+w}%;--r:${+r}deg;aspect-ratio:${vw}/${vh}`, 'aria-hidden="true"');
      }).join('');
      return `<span class="pack-stack${m.fan ? ' is-fan' : ''}" ${a11y}>${items}</span>`;
    }
    return packSvg(m.pack, packs[m.pack]?.wide ? 'is-wide' : '', '', a11y);
  }
  const priceBlock = p => {
    if (!hasPrice(p)) return '<p class="product-price"><strong>Sob consulta</strong><span>valor pelo WhatsApp</span></p>';
    const old = hasPromo(p) ? `<span class="price-old"><span class="sr-only">Antes: </span><s>${money.format(p.oldPrice)}</s></span>` : `<span>${escape(p.priceNote || 'por unidade')}</span>`;
    return `<p class="product-price"><strong><span class="sr-only">Por </span>${money.format(p.price)}</strong>${old}</p>`;
  };
  function productCard(p) {
    const promo = hasPromo(p);
    return `<article class="product-card${promo ? ' is-promo' : ''}" style="--tone:${tone(p)}">
      <button class="product-media" data-product="${escape(p.id)}" aria-label="Ver detalhes de ${escape(p.name)}">
        <span class="media-stage">${productArt(p)}</span>
        ${promo ? `<span class="media-discount">−${discount(p)}%</span>` : ''}
        <span class="media-tag">${escape(p.tag || p.format)}</span>
        <span class="media-series">${escape(p.series || 'Pokémon TCG')}</span>
        <span class="media-hint" aria-hidden="true">Ver detalhes</span>
      </button>
      <div class="product-info">
        <h3><button data-product="${escape(p.id)}">${escape(p.title || p.name)}<span class="sr-only"> — ${escape(p.format)}</span></button></h3>
        <p class="product-meta">${escape(p.meta || p.format)}</p>
        ${priceBlock(p)}
        <a class="product-order" href="${whatsapp(p)}" target="_blank" rel="noopener noreferrer" aria-label="Pedir ${escape(p.name)} no WhatsApp">${chatIcon}<span>Pedir no WhatsApp</span></a>
      </div>
    </article>`;
  }
  const moreTile = () => `<a class="product-more" href="${store.whatsappCatalog}" target="_blank" rel="noopener noreferrer">
      <span class="more-icon" aria-hidden="true">✦</span>
      <strong>Tem muito mais<br> na vitrine.</strong>
      <span class="more-copy">Novidades chegam toda semana no catálogo do WhatsApp.</span>
      <span class="more-link">Abrir catálogo ${arrow}</span>
    </a>`;
  const dialogRoot = document.getElementById('product-dialog-root');
  dialogRoot.innerHTML = `<dialog id="product-dialog" class="product-dialog" aria-labelledby="dialog-title"><button class="dialog-close" aria-label="Fechar detalhes">×</button><div id="dialog-content"></div></dialog>`;
  const dialog = document.getElementById('product-dialog');
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); if (new URL(location.href).searchParams.has('produto')) { const url = new URL(location.href); url.searchParams.delete('produto'); history.replaceState(null, '', url); } });
  function openProduct(id) {
    const p = store.products.find(product => product.id === id); if (!p) return;
    const promo = hasPromo(p);
    const stageClass = p.media?.pack && packs[p.media.pack]?.wide ? ' is-wide-stage' : '';
    const price = hasPrice(p) ? `<div class="dialog-price"><strong>${money.format(p.price)}</strong>${promo ? `<s><span class="sr-only">Antes: </span>${money.format(p.oldPrice)}</s><span class="dialog-save">Economize ${money.format(p.oldPrice - p.price)} · −${discount(p)}%</span>` : `<span class="dialog-note">${escape(p.priceNote || 'por unidade')}</span>`}</div>` : '<p class="availability-label">Preço e disponibilidade sob consulta</p>';
    const includes = Array.isArray(p.includes) && p.includes.length ? `<ul class="dialog-includes" aria-label="O combo inclui">${p.includes.map(item => `<li>${escape(item)}</li>`).join('')}</ul>` : '';
    const disclaimer = p.media?.stack ? 'Imagem ilustrativa montada com as embalagens das coleções. A escolha dos blisters segue o estoque disponível.' : 'Foto de referência da coleção. Artes sortidas e embalagens podem variar conforme o estoque.';
    const checked = new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(`${store.pricesCheckedAt}T12:00:00Z`));
    document.getElementById('dialog-content').innerHTML = `<div class="dialog-image" style="--tone:${tone(p)}"><span class="media-stage${stageClass}">${productArt(p, p.imageAlt)}</span>${promo ? `<span class="media-discount">−${discount(p)}%</span>` : ''}</div><div class="dialog-info"><p class="eyebrow">${escape(p.format)}${promo && store.promo ? ` · ${escape(store.promo)}` : ''}</p><h2 id="dialog-title">${escape(p.name)}</h2>${price}<p>${escape(p.description)}</p>${includes}<p class="image-disclaimer">${disclaimer} Preços do catálogo oficial, conferidos em ${checked}.</p><a class="button primary order-button" href="${whatsapp(p)}" target="_blank" rel="noopener noreferrer">${chatIcon}Pedir no WhatsApp</a><a class="source-link" href="${store.whatsappCatalog}" target="_blank" rel="noopener noreferrer">Ver no catálogo do WhatsApp ${arrow}</a></div>`;
    if (!dialog.open) dialog.showModal(); document.body.classList.add('dialog-open');
    const url = new URL(location.href); url.searchParams.set('produto', p.id); history.replaceState(null, '', url);
  }
  document.addEventListener('click', e => { const button = e.target.closest('[data-product]'); if (button) openProduct(button.dataset.product); });
  const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;
  if (!catalogPage) {
    const combos = store.products.filter(p => p.category === 'combo');
    const singles = store.products.filter(p => p.category !== 'combo');
    document.getElementById('combo-products').innerHTML = combos.map(productCard).join('');
    document.getElementById('featured-products').innerHTML = singles.map(productCard).join('') + moreTile();
    const best = Math.max(0, ...combos.filter(hasPromo).map(discount));
    document.getElementById('combo-count').textContent = `${plural(combos.length, 'combo', 'combos')}${best ? ` · até ${best}% off` : ''}`;
    document.getElementById('featured-count').textContent = plural(singles.length, 'produto', 'produtos');
  } else {
    const search = document.getElementById('product-search');
    const collection = document.getElementById('collection-filter');
    const chips = [...document.querySelectorAll('[data-category]')];
    const params = new URLSearchParams(location.search);
    let category = chips.some(chip => chip.dataset.category === params.get('formato')) ? params.get('formato') : 'all';
    if ([...collection.options].some(option => option.value === params.get('colecao'))) collection.value = params.get('colecao');
    search.value = params.get('busca') || '';
    const normalize = str => str.normalize('NFD').replace(/[̀-ͯ]/g, '').toLocaleLowerCase('pt-BR');
    function renderProducts() {
      const query = normalize(search.value.trim());
      const products = store.products.filter(p => (category === 'all' || p.category === category) && (collection.value === 'all' || (p.collectionIds || []).includes(collection.value)) && normalize(`${p.name} ${p.collection} ${p.format} ${p.meta || ''}`).includes(query));
      document.getElementById('catalog-products').innerHTML = products.map(productCard).join('');
      document.getElementById('empty-results').hidden = products.length > 0;
      document.getElementById('results-count').textContent = plural(products.length, 'produto encontrado', 'produtos encontrados');
      chips.forEach(chip => { const active = chip.dataset.category === category; chip.classList.toggle('active', active); chip.setAttribute('aria-pressed', String(active)); });
      const url = new URL(location.href);
      for (const [key,value] of [['colecao',collection.value],['formato',category],['busca',search.value.trim()]]) { if (value && value !== 'all') url.searchParams.set(key,value); else url.searchParams.delete(key); }
      history.replaceState(null, '', url);
    }
    search.addEventListener('input', renderProducts); collection.addEventListener('change', renderProducts);
    chips.forEach(chip => chip.addEventListener('click', () => { category = chip.dataset.category; renderProducts(); }));
    document.getElementById('clear-filters').addEventListener('click', () => { category = 'all'; collection.value = 'all'; search.value = ''; renderProducts(); search.focus(); });
    renderProducts();
  }
  const initialProduct = new URL(location.href).searchParams.get('produto');
  if (initialProduct) openProduct(initialProduct);
  // Animate once on arrival without hiding content or delaying keyboard access.
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const arrivals = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        arrivals.unobserve(entry.target);
        if (!reducedMotion.matches && !entry.target.contains(document.activeElement)) {
          entry.target.animate([
            { opacity: 0, transform: 'translateY(18px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ], { duration: 650, easing: 'cubic-bezier(.22,1,.36,1)' });
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.section-heading, .product-grid, .collection-grid, .about > div, .faq-layout > div, .contact-banner, .pending-note').forEach(element => arrivals.observe(element));
    reducedMotion.addEventListener('change', event => {
      if (event.matches) {
        arrivals.disconnect();
        document.getAnimations().forEach(animation => animation.cancel());
      }
    });
  }
  // Preserve layout and show an explicit placeholder if a future product image fails.
  document.addEventListener('error', e => { if (e.target instanceof HTMLImageElement) { const image = e.target; image.hidden = true; const message = document.createElement('span'); message.className = 'missing-image'; message.textContent = 'Imagem pendente de atualização'; image.parentElement.append(message); } }, true);
})();
