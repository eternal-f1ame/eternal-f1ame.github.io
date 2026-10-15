# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio for Aaditya Baranwal, forked from Once UI's Magic Portfolio (`@once-ui-system/magic-portfolio` in `package.json`). Deployed to GitHub Pages as a static export on the custom domain `sochastic.me`; `vercel.json` additionally declares a Vercel target.

## Commands

- `npm run dev`: dev server at http://localhost:3000. The only local target where the API routes exist.
- `npm run build`: static export to `./out` (Next.js `output: 'export'`); currently 20 prerendered pages.
- `npm start`: **does not work here**, because `next start` refuses `output: 'export'`. Preview a build with `npx serve@latest out` (or `python3 -m http.server` inside `out/`).
- `./deploy-to-github-pages.sh`: wraps `npm run build` and prints next-step instructions. The real deploy is `.github/workflows/deploy.yml`: Node 18, `npm ci`, `npm run build`, uploads `./out`, deploys on push to main/master.
- No test, lint, or format script is wired into npm, and Biome is not a dependency. `biome.json` is a **Biome 1.9.4** config (2-space, 100-col, double quotes); a bare `npx @biomejs/biome` fetches 2.x and aborts on the config, so pin it: `npx @biomejs/biome@1.9.4 check src/`. The tree is not Biome-clean (~138 diagnostics, mostly formatting and import order), so never run `--write`/`--fix` across the repo; format only what you touch. ESLint is installed but disabled during builds (`next.config.mjs`).

## Architecture

### Static export caveat (important)
`next.config.mjs` sets `output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`:
- The build labels `/api/authenticate`, `/api/check-auth` and `/og` as `ƒ Dynamic` and silently omits them from `out/`, with no error and no warning beyond the edge-runtime note. On GitHub Pages this means the cookie password gate (`protectedRoutes` + `RouteGuard`) can never authenticate, and the OG image URLs every `generateMetadata` emits (`https://${baseURL}/og?title=…`, edge runtime in `src/app/og/route.tsx`) 404. Both work only under `npm run dev` or on Vercel.
- `trailingSlash: true` is why `RouteGuard` strips a trailing `/` before matching `routes`, whose keys are written without one.

### Content-driven model
Site copy and structural switches live in two files, not in component JSX:
- `src/app/resources/config.js`: `baseURL` (bare host, no scheme; callers write `https://${baseURL}`), `routes` (per-page on/off), `protectedRoutes`, `style` theming tokens, background `effects`, `display`, `mailchimp`.
- `src/app/resources/content.js`: `person`, `social`, `newsletter`, `home`, `about` (experience/studies/skills), `blog`, `work`, `publications`, `gallery`. It is a `.js` file that **contains JSX**: many values are React nodes (`<>…</>`, `<InlineCode>`, `<strong>`), so they render as markup but cannot be serialized or turned into JSON. Both server pages and client components (`Header`) import it.

- `src/app/resources/palette.scss` defines the monochrome `--scheme-brand-*` and `--scheme-accent-*` ramps. `config.js` selects them with `brand: "custom"` / `accent: "custom"`, which `[data-brand="custom"]` in `src/once-ui/tokens/function.scss` maps through; `layout.tsx` imports the file after the once-ui tokens, so the vendored library stays untouched. The background effects inherit these ramps (the gradient uses `brand-background-strong`, the dots use `brand-on-background-weak`), so editing the ramp restyles the effects as well.

- `src/app/resources/glass.scss` is the glass and motion layer, global classes imported by `layout.tsx`: `.glass` (hairline edge, specular inset, backdrop blur), `.glass-sheen` (a highlight that follows the pointer), `.glass-interactive` (lift on hover, press on active), `.glass-panel`, `.glass-tile`, `.glass-button` (a light sweep, for once-ui `Button`/`IconButton` via `className`). One easing curve and three durations (`--ease-glide`, `--glide-quick/--glide/--glide-slow`) for the whole site. Wrap a surface in `src/components/Glass.tsx` rather than using the classes bare: it writes the `--mx`/`--my` pointer position the sheen reads. Glass goes on surfaces you touch or that hold a picture (hero panel, project and post cards, poem tiles, gallery tiles); lists of type (papers, roles) stay flat, which is what keeps it from reading as wallpaper. Everything honours `prefers-reduced-motion`.

Re-exported through `src/app/resources/index.ts`, imported as `@/app/resources` / `@/app/resources/content`.

### Three content pipelines
1. **MDX collections**: blog `src/app/blog/posts/*.mdx` → `src/app/blog/[slug]/page.tsx`; projects `src/app/work/projects/*.mdx` → `src/app/work/[slug]/page.tsx`. Both call `getPosts([...pathSegments])` (`src/app/utils/utils.ts`: `fs` + `gray-matter`, path resolved from `process.cwd()`, missing dir → `notFound()`), and `generateStaticParams` enumerates slugs at build time. Slug comes from the filename, so a `slug:` frontmatter key is ignored, as is any key outside the `Metadata` type (`title`, `publishedAt`, `summary`, `image`, `images`, `tag`, `team`, `link`); the current project files carry unused `stack:`/`date:` keys, and every project now sets `summary`, which is what the cards render as their description. `images[]` drives the project `Carousel`; blog `tag` is a comma-separated string split into `Tag`s. `Posts`/`Projects` sort by `publishedAt` desc and slice by `range`.
2. **Arrays in `content.js`**: `/publications` renders `publications.papers` (`title`/`venue`/`year` required, `authors`/`link`/`award` optional; entries are ordered by hand, published venues first and unpublished last) directly; no MDX, no per-paper route. Both `/publications` and the landing page render the list through `src/components/publications/Papers.tsx`; `<Papers featured />` filters to the entries carrying a `featured` rank and sorts by it, so the landing page's three papers and their order are set in `content.js` (`featured: 1`, `2`, `3`) independently of the publications page order.
3. **Gallery items**: `gallery.items` mixes `type: "poem"` (a `.txt` in `public/gallery/poems/` that `PoemCard` `fetch`es client-side, plus a cover image in `public/assets/`) and `type: "picture"` (`src`/`alt`/`orientation` → `ImageCard`; none configured today). Adding a poem = drop the `.txt` and the image into `public/`, then add the entry.

MDX rendering goes through `src/components/mdx.tsx` (`CustomMDX` via `next-mdx-remote/rsc`), which remaps `h1`–`h6` to `HeadingLink` (auto-slugged anchors, paired with `ScrollToHash`), `img` to `SmartImage`, `a` to `SmartLink`, plus custom `Table` and `CodeBlock`. A new MDX collection needs a directory, a `[slug]/page.tsx` calling `getPosts`, and a `RouteGuard` entry (see Conventions).

### Landing page
`src/app/page.tsx` is an index rather than a hero, and it composes entirely from content: the identity block from `person` plus `home.subline` and `social`, then three featured papers, the three most recent `about.work.experiences`, one `Projects` card (rendered with the `flush` prop so it lines up with the section headings) plus a compact list of the remaining projects, an "Off the clock" section (the three newest poem covers, the community lines whose `about.volunteering.items` carry a `featured` rank, and the one line of prose in `home.sections.life.intro`), then two `Posts`. The identity block sits in a `Glass` panel. Section labels and their "see all" links live in `home.sections`, so adding or renaming a section is a content edit. Each section is gated on its `routes` entry.

### Design system: `src/once-ui/`
Vendored Once UI library; treat it as a third-party dependency, not project code, with one deliberate exception: its `px` were converted to `em` and its root font size unpinned (see Units and breakpoints), so re-vendoring or upgrading it means redoing that conversion. ~50 components (Flex/Column/Row, Grid, Heading, Button, SmartImage, Carousel, RevealFx, Background, ToastProvider, …) from `@/once-ui/components`, `CodeBlock` from `@/once-ui/modules`. SCSS tokens in `src/once-ui/tokens/` (theme, scheme, typography, border, shadow, layout) are driven by the `data-*` attributes `src/app/layout.tsx` sets on `<html>` from `config.js` `style`. Any icon name used anywhere (`social[].icon`, `prefixIcon`, `<Icon name>`) must be registered in `iconLibrary` in `src/once-ui/icons.ts`; add the react-icons import there first. Prefer composing existing once-ui primitives; reach for `src/components/*.module.scss` only when a primitive doesn't fit.

### Layout & routing
`src/app/layout.tsx` is the single root layout: loads once-ui SCSS, wires fonts (Inter + Source Code Pro), applies theme `data-*` attrs, renders `Background` + `Header` + `<RouteGuard>{children}</RouteGuard>` + `Footer`. `RouteGuard` (`src/components/RouteGuard.tsx`, client component) renders `NotFound` unless the normalized path is enabled in `routes` or starts with one of the **hardcoded** `dynamicRoutes = ["/blog", "/work"]`, then gates `protectedRoutes` behind the password fetch. Live pages: `/`, `/about`, `/work` (+ `/work/[slug]`), `/blog` (+ `/blog/[slug]`), `/gallery`, `/publications`. `sitemap.ts` and `robots.ts` generate from `routes` + MDX slugs. `RoutePrefetch` (client, mounted in the layout) warms the rest of the site once the browser is idle: every blog and project payload, plus the gallery covers. Top level routes are deliberately left out, since the header nav is `next/link` and Next already prefetches those; adding them again just refetches each payload under a second cache key. It backs off on saveData and 2g, and holds the images back on 3g.

Naming drift worth knowing: the route is still `/work` with MDX under `src/app/work/projects/`, but `work.label` is "Pastime" and that is what the nav and back-buttons display.

### Path aliases & assets
`@/*` → `./src/*` (`tsconfig.json`), `strict: false` but `strictNullChecks: true`, `pageExtensions` includes `.mdx` (`next.config.mjs`). Served files live in `public/` (including `public/CNAME`, the copy that lands in `out/`); the tracked `assets/` directory at the repo root holds original images/favicon sets and is **not** served.

## Units and breakpoints

- **`em`, never `px`.** Every size in `src/` is in `em` (the vendored once-ui library included; its `px` were converted at 1em = 16px, and its existing `rem` tokens kept). The only exceptions: `src/app/og/route.tsx`, which Satori renders to a PNG rather than a browser, and the numeric keys in `MasonryGrid.tsx`, which `react-masonry-css` compares against `window.innerWidth`.
- **The root follows the visitor.** `--font-scaling-*` in `src/once-ui/tokens/theme.scss` is `1em` (it shipped as a pinned `16px`, which overrode the browser text-size setting), so every `em` and `rem` on the site scales with it. Careful with `em` inside an element that sets its own `font-size`: padding there is relative to that size, as in `.glass-tile-label`.
- **Breakpoints** live in `src/app/resources/breakpoints.scss`, in `em` so the layout switches on the visitor's text size: `--xs` 30em (phones), `--s` 48em, `--m` 64em, `--l` 90em, `--xl` above. It is listed after once-ui's own file in `postcss.config.js` (`@csstools/postcss-global-data`), so these definitions win and resolve in every `.scss` without an import. The gallery runs 1 / 2 / 3 columns at `--xs` / `--m` / wider.
- **Screenshots:** headless Chrome clamps windows to a 500px minimum, so `--window-size=400` lays out JavaScript-driven layout (the masonry grid) at 500px. Use DevTools-protocol device emulation for true phone widths.

## Conventions

- Adding a top-level route takes three edits: enable it in `routes` (`src/app/resources/config.js`), add its `ToggleButton` block in `src/components/Header.tsx` (nav links are hardcoded per route, each gated on `routes[...]`), and, if it has nested pages, add its prefix to `dynamicRoutes` in `RouteGuard.tsx`, or the page 404s client-side.
- Don't put strings in component JSX when they belong in `content.js`; every other page does it that way.
- New MDX post: drop the file in the right directory with `title` + `publishedAt` frontmatter (blog entries also want `summary`); it appears automatically, sorted by `publishedAt` desc.
- Password-protected pages need `PORTFOLIO_PASSWORD` in env and a runtime target (Vercel/dev), never GitHub Pages. The single `protectedRoutes` entry today is a leftover template slug with no matching MDX file.
