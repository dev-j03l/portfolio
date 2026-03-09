# Joel Mathew Jojan — Personal Portfolio

A Linux desktop–inspired portfolio built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Edit content

All portfolio content lives in **`data/portfolioData.ts`**. See the comments at the top of that file for where to update:

- **name, title, location, bio** — profile and about
- **experience[]** — experience window
- **projects[]** — projects window
- **skills[]** — skills window
- **education** — education section
- **contact, socialLinks** — contact and top bar links
- **resumeUrl** — resume window (place your PDF in `public/resume.pdf`)

## Build

```bash
npm run build
npm start
```

## Tech stack

- Next.js 15 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
