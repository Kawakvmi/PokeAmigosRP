/* Fonte única do catálogo. Preços conferidos no catálogo oficial do WhatsApp em `pricesCheckedAt`.
 * Ao mudar um preço lá, atualize aqui: `price` é o valor atual; `oldPrice` (opcional) é o "de",
 * exibido riscado com o selo de desconto calculado automaticamente.
 * Arquivo clássico para a prévia funcionar inclusive ao abrir index.html.
 *
 * Imagens: `packs` recorta cada embalagem na foto original (viewBox e clip em pixels da imagem).
 * Cada produto usa `media.pack` (uma embalagem) ou `media.stack` (composição para combos):
 *   [embalagem, x% do centro, y% do centro, largura%, rotação em graus]. `fan: true` abre em leque.
 * Categorias: 'combo', 'blister-triplo', 'blister-unitario' (os botões ficam em catalogo.html).
 */
window.POKE_STORE = {
  name: 'Poke Amigos RP',
  instagram: 'https://www.instagram.com/pokeamigosrp/',
  whatsapp: '5516994451994',
  whatsappCatalog: 'https://wa.me/c/5516994451994',
  // Link de convite da comunidade/grupo (ex.: 'https://chat.whatsapp.com/XXXX').
  // Vazio = o botão "Entrar na comunidade" abre o WhatsApp da loja pedindo o convite.
  whatsappCommunity: '',
  pricesCheckedAt: '2026-11-11',
  promo: 'Black Month',
  packs: {
    caos: { image: 'assets/images/caos-booster.jpg', viewBox: '143 14 314 573', width: 600, height: 600, clip: 'M144 15H455L449 126V490L455 553V586H144V553L150 493V126Z' },
    escuridao: { image: 'assets/images/escuridao-booster.jpg', viewBox: '203 48 381 691', width: 787, height: 787, evenodd: true, clip: 'M230 49H557L583 74V236L537 283V505L583 551V712L555 738H232L204 712V551L250 505V283L204 236V74Z M341 97C331 97 325 103 325 112C325 121 330 125 341 125H448C459 125 464 120 464 111C464 103 459 99 451 97L406 81C399 79 390 79 383 82Z' },
    triplo: { image: 'assets/images/escuridao-triplo.webp', viewBox: '0 21 468 457', width: 468, height: 500, wide: true, clip: 'M7 23H461Q467 23 467 29V470Q467 476 461 476H7Q1 476 1 470V29Q1 23 7 23Z' }
  },
  products: [
    {
      id: 'combo-master', name: 'Combo Master', title: 'Combo Master', category: 'combo', format: 'Combo',
      meta: '2 blisters triplos + 4 unitários', tag: 'Combo · 6 itens', series: 'Black Month', promo: true,
      collection: 'Escuridão Absoluta + blisters à sua escolha', collectionIds: ['escuridao-absoluta', 'caos-ascendente'],
      price: 121.00, oldPrice: 145.76, tone: '#9b5de5',
      includes: ['2 blisters triplos Escuridão Absoluta', '4 blisters unitários à sua escolha'],
      description: 'O combo possui 2 blisters triplos de Escuridão Absoluta e 4 blisters unitários, escolhidos entre os disponíveis no estoque.',
      orderNote: 'Quais blisters unitários estão disponíveis para eu escolher?',
      media: { stack: [['triplo', 44, 25, 86, -8], ['triplo', 57, 34, 86, 6], ['escuridao', 22, 71, 44, -14], ['caos', 40, 73, 44, -5], ['escuridao', 60, 73, 44, 5], ['caos', 78, 71, 44, 14]] },
      imageAlt: 'Composição ilustrativa com dois blisters triplos Escuridão Absoluta e quatro blisters unitários'
    },
    {
      id: 'combo-mix-especial', name: 'Combo Mix Especial', title: 'Combo Mix Especial', category: 'combo', format: 'Combo',
      meta: '1 blister triplo + 2 unitários', tag: 'Combo · 3 itens', series: 'Black Month', promo: true,
      collection: 'Escuridão Absoluta + blisters à sua escolha', collectionIds: ['escuridao-absoluta', 'caos-ascendente'],
      price: 64.90, oldPrice: 72.88, tone: '#d14fb0',
      includes: ['1 blister triplo Escuridão Absoluta', '2 blisters unitários à sua escolha'],
      description: 'O combo tem um blister triplo de Escuridão Absoluta e 2 blisters unitários à sua escolha, entre os disponíveis no estoque.',
      orderNote: 'Quais blisters unitários estão disponíveis para eu escolher?',
      media: { stack: [['triplo', 50, 28, 96, -5], ['caos', 31, 70, 50, -10], ['escuridao', 69, 70, 50, 9]] },
      imageAlt: 'Composição ilustrativa com um blister triplo Escuridão Absoluta e dois blisters unitários'
    },
    {
      id: 'combo-estoque-reforcado', name: 'Combo Estoque Reforçado', title: 'Combo Estoque Reforçado', category: 'combo', format: 'Combo',
      meta: '10 blisters unitários', tag: 'Combo · 10 itens', series: 'Black Month', promo: true,
      collection: 'Blisters à sua escolha', collectionIds: ['escuridao-absoluta', 'caos-ascendente'],
      price: 119.00, oldPrice: 149.90, tone: '#e0479e',
      includes: ['10 blisters unitários à sua escolha'],
      description: 'Combo de 10 blisters unitários à sua escolha, entre os disponíveis no nosso estoque.',
      orderNote: 'Quais blisters estão disponíveis para eu escolher?',
      media: { fan: true, stack: [-18, -14, -10, -6, -2, 2, 6, 10, 14, 18].map((r, i) => [i % 2 ? 'escuridao' : 'caos', 50, 52, 48, r]) },
      imageAlt: 'Composição ilustrativa com dez blisters unitários em leque'
    },
    {
      id: 'combo-cacadores-de-oferta', name: 'Combo Caçadores de Oferta', title: 'Combo Caçadores de Oferta', category: 'combo', format: 'Combo',
      meta: '5 blisters unitários', tag: 'Combo · 5 itens', series: 'Black Month', promo: true,
      collection: 'Blisters à sua escolha', collectionIds: ['escuridao-absoluta', 'caos-ascendente'],
      price: 64.90, oldPrice: 74.95, tone: '#f0a03c',
      includes: ['5 blisters unitários à sua escolha'],
      description: 'Combo com 5 blisters unitários à sua escolha, entre os disponíveis no estoque.',
      orderNote: 'Quais blisters estão disponíveis para eu escolher?',
      media: { fan: true, stack: [-16, -8, 0, 8, 16].map((r, i) => [i % 2 ? 'escuridao' : 'caos', 50, 52, 52, r]) },
      imageAlt: 'Composição ilustrativa com cinco blisters unitários em leque'
    },
    {
      id: 'blister-triplo-escuridao-absoluta', name: 'Blister Triplo Escuridão Absoluta – Slowpoke', title: 'Escuridão Absoluta', category: 'blister-triplo', format: 'Blister triplo',
      meta: 'Blister triplo · Slowpoke', tag: 'Blister 3x', series: 'Megaevolução', priceNote: 'carta promo Slowpoke',
      collection: 'Escuridão Absoluta', collectionIds: ['escuridao-absoluta'],
      price: 42.99, tone: '#a75ce6',
      description: 'Blister triplo da coleção Escuridão Absoluta, com 3 boosters e a carta promocional Slowpoke.',
      media: { pack: 'triplo' },
      imageAlt: 'Blister triplo Escuridão Absoluta com carta promocional Slowpoke'
    },
    {
      id: 'blister-unitario-caos-ascendente', name: 'Blister Unitário Caos Ascendente – Sortidos', title: 'Caos Ascendente', category: 'blister-unitario', format: 'Blister unitário',
      meta: 'Blister unitário · sortido', tag: 'Blister', series: 'Megaevolução', priceNote: 'arte sortida',
      collection: 'Caos Ascendente', collectionIds: ['caos-ascendente'],
      price: 13.99, tone: '#f0a03c',
      description: 'Blister unitário da coleção Caos Ascendente. As artes são sortidas, conforme o estoque.',
      orderNote: 'Quais artes estão disponíveis?',
      media: { pack: 'caos' },
      imageAlt: 'Booster Caos Ascendente com arte de Mega Pyroar'
    },
    {
      id: 'blister-unitario-escuridao-absoluta', name: 'Blister Unitário Escuridão Absoluta – Sortidos', title: 'Escuridão Absoluta', category: 'blister-unitario', format: 'Blister unitário',
      meta: 'Blister unitário · sortido', tag: 'Blister', series: 'Megaevolução', priceNote: 'arte sortida',
      collection: 'Escuridão Absoluta', collectionIds: ['escuridao-absoluta'],
      price: 13.99, tone: '#e0479e',
      description: 'Blister unitário da coleção Escuridão Absoluta. As artes são sortidas, conforme o estoque.',
      orderNote: 'Quais artes estão disponíveis?',
      media: { pack: 'escuridao' },
      imageAlt: 'Blister unitário Escuridão Absoluta com arte de Mega Chandelure'
    }
  ]
};
