# X Builder 🚀

AI-платформа для full-stack веб-разработки прямо в браузере.

**Live:** https://x-builder-staging.pages.dev

## Стек
- **Remix** + **Vite** + **UnoCSS**
- **Cloudflare Pages + Workers**
- **WebContainers API** (StackBlitz)
- **TypeScript**, **pnpm**

## AI Провайдеры
- Anthropic (Claude)
- OpenAI (GPT-4)
- OpenRouter

## Запуск локально
```bash
# Node.js 20+, pnpm 9+
pnpm install
cp .env.example .env
# Добавь API ключ в .env
pnpm run dev
```
Открой http://localhost:5173

## Деплой (автоматически)
Push в `main` → GitHub Actions → Cloudflare Pages

**Секреты GitHub:**
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## Атрибуция
Основано на [Bolt.new](https://github.com/stackblitz/bolt.new) — MIT лицензия.
