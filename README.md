# Coelho & Dockhorn Fine Bakery

Vitrine da padaria de Canoas, com catálogo, agenda de feiras e encomendas pelo WhatsApp.

```sh
npm install
npm run dev
npm run build
npm run preview
```

A compilação gera a página estática em `dist/`. Produtos, agenda e contatos ficam em `src/App.tsx`. As fotos ficam em `src/assets/`.

## Catálogo no Neon

A vitrine publicada na Vercel consulta `/api/catalog`. Configure `DATABASE_URL` somente no servidor, com uma conta de leitura, e aplique `database/001_catalog.sql` com a conta responsável pela migração. A coluna `published` controla quais produtos são exibidos. A cópia em `src/catalog.json` é usada na renderização inicial e em caso de indisponibilidade temporária.
