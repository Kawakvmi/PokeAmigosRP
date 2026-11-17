# Poke Amigos RP

Homepage e catálogo estáticos, em português, feitos para celular primeiro. Sem dependências de instalação, banco de dados ou build. Os arquivos podem ser abertos diretamente em um navegador moderno; para validar o comportamento completo, use o servidor local.

## Abrir a prévia

Com Node.js 22 ou superior, abra o terminal nesta pasta e execute `npm run dev`. Acesse http://127.0.0.1:4173. Encerre com Ctrl+C. Também é possível abrir `index.html` diretamente. Para conferir a sintaxe, execute `npm run check`.

## Estrutura

- `index.html`: apresentação, produtos, coleções, marca, dúvidas e contato.
- `catalogo.html`: busca por nome sem distinção de acentos, filtros combinados por coleção e formato, resultados e estado vazio.
- `assets/js/products.js`: fonte única de dados, contato e evidências dos produtos.
- `assets/js/app.js`: componentes compartilhados, navegação móvel, filtros, detalhes e links de consulta.
- `assets/js/theme.js`: restaura o tema antes da primeira pintura; o botão no cabeçalho alterna claro/escuro e salva a preferência localmente.
- `assets/js/shine.js`: reflexo e glow interativos nas embalagens da capa, com mouse ou toque pressionado.
- `assets/css/styles.css`: identidade visual roxa/lavanda, tipografia, componentes, pontos de adaptação e movimento reduzido.
- `assets/images/`: logo original e fotografias reais de referência. `logo-badge.png` (512px) e `logo-badge-192.png` (cabeçalho e favicon) são o selo circular recortado do original, com fundo transparente. `banner-campfire.jpg` (cena de fundo do topo do catálogo), `banner-kanto.webp` (banner final da home) e `banner-gengar.jpg` (card da comunidade no catálogo) são artes fornecidas pela loja. `banner-pikachu.jpg` ficou guardada, sem uso no momento.
- `docs/PESQUISA.md`: análise das referências, fontes, confirmação de contato, limitações e pendências.
- `docs/PLANO.md`: decisões de UX, manutenção e evolução.

## Atualizar o catálogo

Altere `window.POKE_STORE.products` em `assets/js/products.js`. Os preços vieram do catálogo oficial do WhatsApp (conferidos em `pricesCheckedAt`); quando mudarem lá, atualize aqui:

- `price`: valor atual. `oldPrice` (opcional): valor "de", exibido riscado; o selo de desconto e a economia são calculados sozinhos.
- `category`: `combo`, `blister-triplo` ou `blister-unitario` (os botões de filtro ficam em `catalogo.html`).
- `collectionIds`: coleções em que o produto aparece no filtro (combos "à sua escolha" entram nas duas).
- `media.pack` usa uma embalagem recortada de `packs`; `media.stack` monta a composição dos combos.
- `orderNote`: pergunta extra incluída na mensagem do pedido (ex.: quais artes estão disponíveis).

Comunidade: cole o link de convite do grupo em `whatsappCommunity` (início de `products.js`). Enquanto estiver vazio, "Entrar na comunidade" abre o WhatsApp da loja com o pedido de entrada já escrito.

"Pedir no WhatsApp" abre a conversa com produto e preço já escritos; nada é enviado sem o cliente tocar em enviar. Estoque, artes sortidas e itens dos combos são confirmados na conversa.

Os filtros ficam na URL e podem ser compartilhados. Detalhes também possuem link com `?produto=identificador`. O diálogo nativo mantém foco e suporta Escape. Nenhum clique no WhatsApp envia a mensagem automaticamente.

## Aparência e movimento

O controle de tema aparece no topo da homepage e do catálogo. O modo escuro usa roxo profundo, luzes em degradê e contraste ajustado em textos, filtros e detalhes. A preferência é mantida em `localStorage` quando disponível; use a prévia HTTP para compartilhá-la entre as páginas. Sem acesso ao armazenamento, a troca continua funcionando na página atual.

Os botões possuem glow suave em hover e foco. As seções entram com movimento discreto, as embalagens da capa flutuam levemente e navegadores compatíveis fazem uma transição entre páginas. A preferência de movimento reduzido desativa as animações. Os recortes SVG da capa apenas delimitam a exibição das fotografias existentes, incluindo o furo da embalagem; os arquivos originais e a logo permanecem intactos.

As duas embalagens da capa também recebem um reflexo diagonal e um ponto de luz que acompanha o mouse. No celular, o brilho permanece enquanto o dedo pressiona a imagem e se encerra ao soltar ou quando o navegador inicia a rolagem. O efeito reaproveita os recortes existentes. Com movimento reduzido, a iluminação fica estática.

## Colocar no ar

Esta entrega é local; não houve publicação ou contratação. Envie `index.html`, `catalogo.html` e `assets/` para uma hospedagem estática com HTTPS. Não é necessário enviar `server.mjs`, `docs/`, `package.json` ou este README. Configure o domínio definitivo antes de adicionar canonical, sitemap e metadados sociais com URLs absolutas. Não foram inventados endereço, CNPJ, domínio, pagamentos, entrega, depoimentos ou estoque.

As fontes do Google são o único recurso externo carregado pela página. Se indisponíveis, há fontes locais alternativas. Nenhum rastreador, cadastro ou cookie de marketing foi incluído.
