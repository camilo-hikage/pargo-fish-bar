# Pargo Fish Bar — site

Site estático (HTML + CSS + JS, sem build). Drinks autorais e cozinha marítima,
Ubatuba/SP.

## Rodar localmente

Abra o `index.html` no navegador, ou sirva a pasta:

```bash
npx serve .
```

## Estrutura

```
index.html         Página única (hero, sobre, menu, galeria, contato/reserva, footer)
assets/styles.css  Estilo — paleta oxblood + creme + azul-poeira (do logo)
assets/script.js   Header ao rolar, menu mobile, abas do menu, reveal, ano
assets/logo.jpg    Logo (mascote) — usado recortado no círculo do header/footer
materials/          Arquivos-fonte (logo original etc.)
```

## O que ainda é placeholder (trocar)

- **Fotos** — todos os blocos com "FOTO". Coloque as imagens em `assets/` e troque
  os `<div class="ph ...">` por `<img>` (ou defina `background-image` nas classes).
- **WhatsApp** — `https://wa.me/5512000000000` no HTML (2 lugares) → número real.
- **Instagram** — link genérico no footer → `instagram.com/<perfil>`.
- **Horário** — "Terça a domingo · 17h — 00h" é chute; confirmar.
- **Menu** — itens e preços são exemplo.
- **Mapa** — o bloco em "contato" é placeholder; dá pra pôr um embed do Google Maps.

## Deploy

Qualquer host de site estático: GitHub Pages, Netlify, Vercel, Cloudflare Pages.
No GitHub Pages: Settings → Pages → Deploy from a branch → `main` / `/ (root)`.
