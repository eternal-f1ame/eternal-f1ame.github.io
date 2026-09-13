# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio for Aaditya Baranwal, forked from Once UI's Magic Portfolio (`@once-ui-system/magic-portfolio` in `package.json`). Deployed to GitHub Pages as a static export on the custom domain `sochastic.me`; `vercel.json` additionally declares a Vercel target.

## Commands

- `npm run dev` — dev server at http://localhost:3000. The only local target where the API routes exist.
- `npm run build` — static export to `./out` (Next.js `output: 'export'`); currently 20 prerendered pages.
- `npm start` — **does not work here**: `next start` refuses `output: 'export'`. Preview a build with `npx serve@latest out` (or `python3 -m http.server` inside `out/`).
- `./deploy-to-github-pages.sh` — wraps `npm run build` and prints next-step instructions. The real deploy is `.github/workflows/deploy.yml`: Node 18, `npm ci`, `npm run build`, uploads `./out`, deploys on push to main/master.
- No test, lint, or format script is wired into npm, and Biome is not a dependency. `biome.json` is a **Biome 1.9.4** config (2-space, 100-col, double quotes); a bare `npx @biomejs/biome` fetches 2.x and aborts on the config, so pin it: `npx @biomejs/biome@1.9.4 check src/`. The tree is not Biome-clean (~138 diagnostics, mostly formatting and import order), so never run `--write`/`--fix` across the repo — format only what you touch. ESLint is installed but disabled during builds (`next.config.mjs`).

## Architecture

### Static export caveat (important)
`next.config.mjs` sets `output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`:
- The build labels `/api/authenticate`, `/api/check-auth` and `/og` as `ƒ Dynamic` and silently omits them from `out/` — no error, no warning beyond the edge-runtime note. On GitHub Pages this means the cookie password gate (`protectedRoutes` + `RouteGuard`) can never authenticate, and the OG image URLs every `generateMetadata` emits (`https://${baseURL}/og?title=…`, edge runtime in `src/app/og/route.tsx`) 404. Both work only under `npm run dev` or on Vercel.
- `trailingSlash: true` is why `RouteGuard` strips a trailing `/` before matching `routes`, whose keys are written without one.

### Content-driven model
Site copy and structural switches live in two files, not in component JSX:
- `src/app/resources/config.js` — `baseURL` (bare host, no scheme; callers write `https://${baseURL}`), `routes` (per-page on/off), `protectedRoutes`, `style` theming tokens, background `effects`, `display`, `mailchimp`.
- `src/app/resources/content.js` — `person`, `social`, `newsletter`, `home`, `about` (experience/studies/skills), `blog`, `work`, `publications`, `gallery`. It is a `.js` file that **contains JSX**: many values are React nodes (`<>…</>`, `<InlineCode>`, `<strong>`), so they render as markup but cannot be serialized or turned into JSON. Both server pages and client components (`Header`) import it.

Re-exported through `src/app/resources/index.ts`, imported as `@/app/resources` / `@/app/resources/content`.

### Three content pipelines
1. **MDX collections** — blog `src/app/blog/posts/*.mdx` → `src/app/blog/[slug]/page.tsx`; projects `src/app/work/projects/*.mdx` → `src/app/work/[slug]/page.tsx`. Both call `getPosts([...pathSegments])` (`src/app/utils/utils.ts`: `fs` + `gray-matter`, path resolved from `process.cwd()`, missing dir → `notFound()`), and `generateStaticParams` enumerates slugs at build time. Slug comes from the filename — a `slug:` frontmatter key is ignored, as is any key outside the `Metadata` type (`title`, `publishedAt`, `summary`, `image`, `images`, `tag`, `team`, `link`); the current project files carry unused `stack:`/`date:` keys. `images[]` drives the project `Carousel`; blog `tag` is a comma-separated string split into `Tag`s. `Posts`/`Projects` sort by `publishedAt` desc and slice by `range`.
2. **Arrays in `content.js`** — `/publications` renders `publications.papers` (`title`/`venue`/`year` required, `authors`/`link`/`award` optional — entries are ordered by hand: published venues first, then unpublished) directly; no MDX, no per-paper route.
3. **Gallery items** — `gallery.items` mixes `type: "poem"` (a `.txt` in `public/gallery/poems/` that `PoemCard` `fetch`es client-side, plus a cover image in `public/assets/`) and `type: "picture"` (`src`/`alt`/`orientation` → `ImageCard`; none configured today). Adding a poem = drop the `.txt` and the image into `public/`, then add the entry.

MDX rendering goes through `src/components/mdx.tsx` (`CustomMDX` via `next-mdx-remote/rsc`), which remaps `h1`–`h6` to `HeadingLink` (auto-slugged anchors, paired with `ScrollToHash`), `img` to `SmartImage`, `a` to `SmartLink`, plus custom `Table` and `CodeBlock`. A new MDX collection needs a directory, a `[slug]/page.tsx` calling `getPosts`, and a `RouteGuard` entry (see Conventions).

### Design system: `src/once-ui/`
Vendored Once UI library — treat as a third-party dependency, not project code. ~50 components (Flex/Column/Row, Grid, Heading, Button, SmartImage, Carousel, RevealFx, Background, ToastProvider, …) from `@/once-ui/components`, `CodeBlock` from `@/once-ui/modules`. SCSS tokens in `src/once-ui/tokens/` (theme, scheme, typography, border, shadow, layout) are driven by the `data-*` attributes `src/app/layout.tsx` sets on `<html>` from `config.js` `style`. Any icon name used anywhere (`social[].icon`, `prefixIcon`, `<Icon name>`) must be registered in `iconLibrary` in `src/once-ui/icons.ts` — add the react-icons import there first. Prefer composing existing once-ui primitives; reach for `src/components/*.module.scss` only when a primitive doesn't fit.

### Layout & routing
`src/app/layout.tsx` is the single root layout: loads once-ui SCSS, wires fonts (Inter + Source Code Pro), applies theme `data-*` attrs, renders `Background` + `Header` + `<RouteGuard>{children}</RouteGuard>` + `Footer`. `RouteGuard` (`src/components/RouteGuard.tsx`, client component) renders `NotFound` unless the normalized path is enabled in `routes` or starts with one of the **hardcoded** `dynamicRoutes = ["/blog", "/work"]`, then gates `protectedRoutes` behind the password fetch. Live pages: `/`, `/about`, `/work` (+ `/work/[slug]`), `/blog` (+ `/blog/[slug]`), `/gallery`, `/publications`. `sitemap.ts` and `robots.ts` generate from `routes` + MDX slugs.

Naming drift worth knowing: the route is still `/work` with MDX under `src/app/work/projects/`, but `work.label` is "Pastime" and that is what the nav and back-buttons display.

### Path aliases & assets
`@/*` → `./src/*` (`tsconfig.json`), `strict: false` but `strictNullChecks: true`, `pageExtensions` includes `.mdx` (`next.config.mjs`). Served files live in `public/` (including `public/CNAME`, the copy that lands in `out/`); the tracked `assets/` directory at the repo root holds original images/favicon sets and is **not** served.

## Conventions

- Adding a top-level route takes three edits: enable it in `routes` (`src/app/resources/config.js`), add its `ToggleButton` block in `src/components/Header.tsx` (nav links are hardcoded per route, each gated on `routes[...]`), and, if it has nested pages, add its prefix to `dynamicRoutes` in `RouteGuard.tsx` — otherwise the page 404s client-side.
- Don't put strings in component JSX when they belong in `content.js` — every other page does it that way.
- New MDX post: drop the file in the right directory with `title` + `publishedAt` frontmatter (blog entries also want `summary`); it appears automatically, sorted by `publishedAt` desc.
- Password-protected pages need `PORTFOLIO_PASSWORD` in env and a runtime target (Vercel/dev), never GitHub Pages. The single `protectedRoutes` entry today is a leftover template slug with no matching MDX file.
