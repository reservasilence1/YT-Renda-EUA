# VSL Static Page

Projeto reorganizado para deploy estático no GitHub + Vercel.

## Como subir
1. Crie um repositório no GitHub.
2. Envie todos os arquivos desta pasta para a raiz do repositório.
3. Na Vercel, importe o repositório.
4. Framework Preset: **Other**.
5. Build Command: deixe vazio ou use `npm run build`.
6. Output Directory: deixe vazio / raiz do projeto.

## Observação
O ZIP original estava sem vários arquivos locais de CSS, JS e imagens exportados do WordPress/Elementor. Por isso foram adicionados arquivos fallback para evitar erros 404 e manter a página carregando na Vercel. Scripts externos importantes, como pixel e player, foram preservados; alguns arquivos que já estavam dentro do ZIP foram apontados localmente.
