# Validação da entrega

Data: 07/11/2026. Navegador Chromium da prévia local.

- Sintaxe de `products.js`, `app.js` e `server.mjs`: verificada com `npm run check`, sem erros.
- Homepage e catálogo: medidos em viewports de 320, 390, 768 e 1440 pixels; largura do documento igual à largura útil, sem rolagem lateral.
- Catálogo: uma, duas e três colunas conforme a largura. Todas as imagens do catálogo carregaram.
- Menu móvel: abertura e navegação ao catálogo verificadas.
- Filtro de blisters: um resultado; busca inexistente: zero resultados e estado vazio visível; botão de limpar restabelece os resultados.
- Coleção Escuridão Absoluta + formato booster: um resultado. Busca por `escuridao` encontra o nome acentuado.
- Detalhes: nome, descrição, aviso de referência, consulta no WhatsApp e publicação de origem presentes.
- Escape fecha o diálogo e devolve o foco ao botão que o abriu.
- Links de consulta: número oficial e mensagem com produto verificados pela URL; nenhuma mensagem foi enviada.
- Dúvidas: expansão de pergunta e conteúdo confirmados.
- Log do navegador durante o teste do catálogo: sem erros.

Capturas de desktop e celular foram geradas para revisão. As verificações usam viewports simulados; não substituem uma rodada em aparelhos físicos. A loja ainda precisa confirmar estoque, preço, versões fotográficas e condições comerciais antes de anunciar ofertas ou vender online.

Nenhuma publicação em hospedagem foi realizada. Não houve teste de checkout, pois esta versão é uma vitrine com consulta.

## Revisão de tema e efeitos — 07/11/2026

Os testes de navegador descritos acima correspondem à entrega anterior. Nesta revisão:

- `npm run check`: passou, incluindo o novo `theme.js`.
- Inicialização do tema executada em Node/VM: preferência clara, escura, ausente, inválida e armazenamento bloqueado; todos os cinco cenários passaram.
- Verificação de HTML: IDs únicos, recursos locais existentes e inicialização do tema antes do CSS nas duas páginas.
- Servidor local: HTTP 200 para homepage, catálogo, CSS, scripts alterados e ambas as fotos usadas nos recortes.
- Contraste calculado dos pares principais do modo escuro: texto 16,20:1; texto secundário em card 8,22:1; links sobre lavanda escura 6,64:1; botão principal 6,55:1; hover do botão 5,29:1. Essa medição não equivale a uma auditoria visual completa.
- Integridade dos dados: continuam exatamente três produtos com fonte do Instagram; preço e estoque permanecem `null`.
- Retomada da validação: **10 testes de integração passaram em jsdom 26.1.0**, executando o HTML e os scripts reais. Foram verificados alternância/estado acessível/persistência do tema nas duas páginas; funcionamento com armazenamento bloqueado; menu móvel e fechamento por Escape com retorno ao botão; atualização do tema por evento de outra aba; busca sem acentos, filtros combinados, estado vazio e limpeza; conteúdo dos detalhes, URLs de consulta e limpeza ao fechar; abertura por URL compartilhada; e presença do conteúdo com movimento reduzido e sem IntersectionObserver.
- O jsdom foi instalado somente em uma pasta temporária de QA. Nenhuma dependência foi adicionada ao projeto. Esse ambiente não renderiza pixels: abertura/fechamento nativos do diálogo e media queries foram simulados para testar a lógica, sem validar aparência, foco contido ou responsividade real.
- Conferência visual e interações reais nesta revisão: **pendentes**. O host de automação do navegador estava indisponível e o acesso ao Chrome pela ferramenta de uso do computador foi negado. Não foram produzidas novas capturas nem repetidos os testes de viewport, foco, filtros ou alternância do tema no navegador.

Revisar claro/escuro em 320, 390, 768 e 1440 px, os recortes e a preferência após navegar/recarregar antes da publicação. Nenhuma publicação foi feita nesta revisão.

## Acabamento de brilho nas embalagens — 08/11/2026

- Adicionado `shine.js`, carregado apenas na homepage: reflexo diagonal, iluminação acompanhando o cursor e glow no contorno. As camadas SVG usam os mesmos recortes das fotos, inclusive o furo da embalagem.
- Toque pressionado ativa o efeito; soltar, cancelar o gesto, sair da imagem ou perder o foco limpa o estado. Os eventos de ponteiro são passivos e o CSS permite rolagem vertical e zoom por pinça. Movimento reduzido mantém iluminação estática.
- `npm run check` passou, incluindo `shine.js`.
- Nove verificações em jsdom passaram: recortes/referências SVG; hover e atualização agrupada por frame; saída; toque e soltura fora da imagem; cancelamento de gesto; toque secundário; tratamento de menu de contexto; perda de foco; preferência de movimento reduzido.
- Limite: a geometria SVG foi simulada nesses testes. A nova aparência do reflexo e o toque em aparelho físico ainda não foram observados. A captura enviada pelo usuário mostra a capa anterior a esse acabamento e serviu de referência visual.

## Card de treinador — 08/11/2026

- Removido o alinhamento por `float` que fazia o texto contornar a estrela. O card agora usa flex, insígnia SVG de escudo e duas linhas explícitas: “De treinador” / “pra treinador.”, com entrelinha de 1,45 e espaçamento próprio.
- Aplicado vidro translúcido com degradê, desfoque do fundo, reflexo interno e cores específicas para claro/escuro.
- Ponto luminoso com pequeno rastro percorre a borda arredondada a cada 6,5 segundos. A animação é feita em SVG/CSS, sem JavaScript adicional, sem interceptar toques e desativada pela preferência de movimento reduzido.
- HTML do componente e sintaxe da folha de estilos conferidos com parsers locais. A captura do usuário orientou o ajuste; não houve nova conferência renderizada no navegador.
