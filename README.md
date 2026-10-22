# RR Comercio de Pecas Usadas - Prototipo

Prototipo navegavel de alta fidelidade com tres ambientes integrados: portal/loja, aplicativo do cliente e sistema empresarial. Todos os dados sao ficticios e as operacoes sao simuladas no navegador.

## Tecnologias

- Next.js 16 com App Router
- React 19 e TypeScript
- CSS responsivo com identidade preto, grafite e amarelo
- Lucide para iconografia
- `localStorage` versionado por meio de uma interface de repositorio
- Testes de regras criticas com o test runner do Node

## Instalar e executar

Requer Node.js 20.9 ou superior.

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

Validacoes disponiveis:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## Ambientes e rotas

- Portal: `/`, `/pecas`, `/pecas/P001`, `/sobre`, `/contato`, `/solicitar-peca`, `/carrinho` e `/checkout`
- Cliente: `/app`, `/minha-conta`, `/minha-conta/pedidos` e `/minha-conta/veiculos`
- Demonstracao de perfis: `/demo`
- Gestao: `/gestao` e modulos em `/gestao/veiculos`, `/gestao/desmontagem`, `/gestao/pecas`, `/gestao/estoque`, `/gestao/orcamentos`, `/gestao/vendas`, `/gestao/pedidos`, `/gestao/clientes`, `/gestao/fornecedores`, `/gestao/financeiro`, `/gestao/solicitacoes`, `/gestao/relatorios` e `/gestao/configuracoes`

Todas as rotas sao atendidas diretamente pelo App Router.

## Perfis demonstrativos

Em `/demo`, selecione Administrador, Vendedor, Estoquista, Desmontagem, Financeiro ou Cliente. Os acessos mudam apenas a experiencia demonstrativa; nao existe autenticacao real nesta fase.

## Roteiro de apresentacao

1. Acesse o portal e filtre pecas no catalogo.
2. Abra uma peca, envie uma solicitacao de compatibilidade e confira em `/gestao/solicitacoes`.
3. Adicione uma peca ao carrinho e simule um pagamento aprovado no checkout.
4. Confira o pedido e o estoque na gestao.
5. Em `/gestao/vendas`, simule uma venda no balcao e observe a baixa da unidade nos demais ambientes.
6. Veja a experiencia mobile em `/app`.
7. Em `/gestao/configuracoes`, use **Restaurar demonstracao** para recuperar a base inicial.

## Persistencia e regras

O estado usa a chave versionada `rr-demo:v1` no `localStorage`. Portal, aplicativo e gestao compartilham os mesmos dados no mesmo navegador e sincronizam alteracoes entre abas pelo evento `storage`.

O prototipo revalida disponibilidade antes da venda, impede a revenda da mesma unidade, nao baixa estoque em pagamento recusado e preserva os dados do item no pedido. Isso nao substitui transacoes de banco de dados nem controle real de concorrencia.

## Imagens

O logotipo fornecido esta em `public/brand/rr-logo.png`. Como nao foram fornecidas fotos licenciadas dos produtos, os cards usam ilustracoes neutras identificadas como demonstrativas; nenhuma foto de produto incorreto foi usada como substituta.

Para a versao comercial final, fornecer fotos de farois, lanternas, alternadores, motores de partida, retrovisores, portas, capos, radiadores, cambios, bancos, modulos eletronicos e demais pecas cadastradas.

## Estrutura para Supabase

O contrato `DemoRepository` separa a interface da persistencia. Uma integracao futura pode implementar o mesmo contrato com Supabase, mantendo dados, regras de negocio e componentes desacoplados. Nenhum SDK, segredo ou variavel de servico real e necessario para abrir esta versao.

## Publicar na Vercel

1. Envie o repositorio ao GitHub.
2. Importe o projeto na Vercel.
3. Use o framework Next.js e o comando `npm run build`.
4. Nao sao necessarias variaveis de ambiente.

O manifesto PWA esta em `public/manifest.webmanifest`. O modo independente e as cores estao preparados; uma estrategia de cache offline de estoque nao foi adicionada para evitar apresentar disponibilidade antiga como atual.

## Limites desta fase

- Sem banco, login, pagamento, emissao fiscal ou frete real.
- Valores, pessoas, contatos e operacoes sao ficticios.
- Impressos e comprovantes sao demonstrativos e sem valor fiscal.
- A persistencia e local a cada navegador/dispositivo.
