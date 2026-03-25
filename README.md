# FBI Parody Date Site

Animated Next.js landing page for a funny romantic reveal.

## Features
- Password lock before the site opens
- Custom target name via environment variable
- Custom photo from the `public` folder
- Background music with browser-safe play toggle
- Vercel-ready Next.js App Router project
- Tailwind CSS styling with custom cinematic animations

## 1) Install

```bash
npm install
```

## 2) Add your custom values
Create a `.env.local` file:

```bash
NEXT_PUBLIC_TARGET_NAME=Anu
NEXT_PUBLIC_SITE_PASSWORD=love123
NEXT_PUBLIC_AUDIO_FILE=/music.mp3
```

## 3) Add your real assets
Replace these files inside `public/`:
- `suspect-photo.jpg` -> her photo
- `music.mp3` -> your song

You can keep the placeholder files if you want to test first.

## 4) Run locally

```bash
npm run dev
```

## 5) Deploy to Vercel
Push this project to GitHub, then import it in Vercel.

Or deploy with the CLI:

```bash
npm i -g vercel
vercel
vercel --prod
```

## Notes
- Password lock is client-side because it uses `NEXT_PUBLIC_*` variables. It is perfect for a cute private reveal, but it is not secure for protecting sensitive content.
- Many browsers block autoplay. The site tries to start music after unlock, and also includes a music button as fallback.
- Vercel automatically supports Next.js deployments.

## Suggested edits
- Change the final sentence text in `app/page.tsx`
- Update the evidence list with your own inside `app/page.tsx`
- Tweak colors and animation timing in `app/globals.css`
"# FBI" 
