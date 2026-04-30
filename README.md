# Deepak Meena Portfolio 2.0 - Frequencies

Personality-driven 3D portfolio built with Next.js (App Router), Three.js (`@react-three/fiber`), Tailwind CSS, and Framer Motion.

## Stack

- Next.js 14+ with static export (`output: "export"`)
- TypeScript
- Tailwind CSS v3
- Three.js via `@react-three/fiber` + `@react-three/drei`
- Framer Motion
- EmailJS + react-hot-toast

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment values:

```bash
cp .env.example .env.local
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Set:

- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

3. Start development:

```bash
npm run dev
```

4. Build static output:

```bash
npm run build
```

Static files are emitted to `out/`.

5. Run lint checks:

```bash
npm run lint
```

## Deployment (Vercel Hobby - Free)

1. Push this project to GitHub.
2. Import the repo into Vercel.
3. Keep framework preset as Next.js.
4. Add environment variables from `.env.example` in Vercel Project Settings.
5. Deploy.

No paid add-ons are required:

- No `next/image` optimization pipeline.
- No analytics/speed-insights packages.
- No server runtime required for hosting (static export only).

## Structure

```text
app/
components/
  canvas/
  providers/
  sections/
  ui/
lib/
public/
```

## Notes

- GitHub repositories are fetched at build time from the public REST API with a hardcoded fallback.
- Contact form sends email through EmailJS client-side integration.
- Resume lives at `public/Deepak_Meena_Resume.pdf`.
- `app/sitemap.ts` generates `/sitemap.xml` for search indexing.
