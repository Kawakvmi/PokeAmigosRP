# Plano do site

## Direção

Vitrine de Pokémon TCG que aproxima a coleção e o atendimento. Visual claro, roxo e lavanda extraídos da logo, títulos expressivos, fotografias reais e uma composição leve. A prioridade em celular é reconhecer a marca, explorar produtos e consultar um item sem obstáculos.

## Jornada inicial

1. Início: reconhecer marca e localização, acessar catálogo ou perfil oficial.
2. Vitrine: conhecer os três produtos comprovados, com condições sob consulta.
3. Coleções: entrar no catálogo já filtrado por Caos Ascendente ou Escuridão Absoluta.
4. Catálogo: combinar busca, coleção e formato; contagem atualizada e recuperação de busca vazia.
5. Detalhes: ler o que foi confirmado, observar a foto de referência e abrir o post de origem.
6. Consulta: abrir WhatsApp com o produto na mensagem; o visitante decide se envia.
7. Marca e dúvidas: entender o posicionamento e saber que entrega, condições e estoque precisam de conversa direta.

## Acessibilidade e responsividade

HTML semântico, idioma pt-BR, navegações nomeadas, salto para conteúdo, rótulos de formulário, foco visível, alt descritivo, `aria-pressed` nos filtros e `aria-live` na contagem. Menu móvel com estado expandido, fechamento com Escape e ao selecionar um destino. Modal nativo com foco contido, fechamento por Escape e retorno ao disparador. Movimento reduzido respeitado. Layout fluido com grades de uma, duas e três colunas e controles de toque com área mínima de 42–44px. Nenhuma ação essencial depende de hover.

## Decisões de implementação

HTML/CSS/JavaScript estáticos, sem etapa de instalação, adequados ao início da operação e fáceis de hospedar. Dados separados da interface permitem uma futura migração para CMS/API sem reescrever o conteúdo. Cabeçalho, rodapé e diálogo compartilham código. Fotos locais com dimensões explícitas e carregamento tardio abaixo da primeira dobra; fontes alternativas preservam a leitura sem rede. Busca aceita acentos ou sua ausência. Filtros combinados e produto aberto ficam na URL para compartilhamento.

## Evolução sugerida

### Ajustes visuais implementados — 07/11/2026

- Alternância claro/escuro acessível no cabeçalho das duas páginas, com estado `aria-pressed`, ícones de lua/sol e persistência local opcional.
- Paleta escura em roxo profundo, degradês discretos e cores próprias para campos, cards, avisos e modal. As áreas das fotos mantêm um fundo claro para preservar sua leitura; a logo original também mantém seu suporte claro.
- Glow em controles, transições suaves, entrada das seções e flutuação discreta das embalagens, respeitando movimento reduzido. Conteúdo permanece acessível mesmo sem animações ou IntersectionObserver.
- Recortes vetoriais na exibição das duas fotos da capa, sem fundo branco externo, sem distorcer proporções e sem modificar os arquivos de origem.

### Próximas etapas

- Confirmar dados pendentes e substituir referências fotográficas por ativos autorizados.
- Validar com o cliente as condições comerciais e publicar o domínio.
- Conectar um CMS quando a atualização manual ficar frequente; manter publicação, data e verificação por produto.
- Só integrar carrinho, estoque sincronizado, pagamentos, frete e políticas quando a operação definir essas regras.
- Ao conhecer o domínio, incluir URLs canônicas, sitemap e metadados sociais. Dados estruturados de ofertas dependem de valores e disponibilidade reais.

Os arquivos de implementação desta entrega permanecem na pasta original do projeto. A documentação registra a pesquisa e os dados faltantes para a próxima etapa.
