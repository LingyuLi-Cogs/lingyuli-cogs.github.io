# lingyuli-cogs.github.io

Personal site for Lingyu Li, built with Jekyll and served by GitHub Pages.
It has no theme gem: every layout, include, and style lives in this repo.

## Run it locally

```bash
bundle install
bundle exec jekyll serve
```

Then open <http://localhost:4000>.

## Where things live

| Path | What it holds |
| --- | --- |
| `index.md` | Home page. Hero text sits in the front matter, the biography is the markdown body. |
| `_data/publications.yml` | The Selected Research list. One YAML entry per paper. |
| `_posts/` | Blog posts, named `YYYY-MM-DD-slug.md`. |
| `poster.md`, `blog.md`, `404.md` | The remaining pages. |
| `_layouts/`, `_includes/` | Page shells, header, footer, icon sprite. |
| `css/main.scss` | The whole stylesheet, including design tokens. |
| `fonts/` | Geist and Geist Mono, self-hosted (latin + latin-ext, variable). |
| `assets/js/site.js` | Theme toggle, scroll reveals, sticky-header hairline. |
| `image/` | Photos. Files ending in `-900`, `-1000`, or `-web` are the resized copies the pages actually load. |

## Adding things

**A paper.** Append an entry to `_data/publications.yml`. Newest goes first.

```yaml
- title: "Paper title"
  url: "https://example.org/paper"
  authors: "Lingyu Li, Co Author †"
  venue: "ICML 2026"          # short label shown in the left rail
  venue_full: "Proceedings…"  # optional, printed under the authors
  tldr: >
    One paragraph. It renders behind the TL;DR toggle.
```

**A post.** Add `_posts/YYYY-MM-DD-slug.md` with `layout: post`, a `title`, a `date`,
and an optional `tldr` used as the summary on the blog index.

**A poster.** Drop the full-size file in `image/`, make a resized copy
(`sips -Z 1600 in.png --out out-web.jpg`), then add a `<figure class="poster">`
block to `poster.md`. Point the link at the original and the `img` at the copy.

## Design notes

- Colours, spacing, radii, and easing are CSS custom properties at the top of
  `css/main.scss`. Change them there, not in individual rules.
- Three corner radii only: `--r` (10px) for surfaces and media, `--r-sm` (6px) for
  controls, `--r-xs` (4px) for inline bits like code and focus rings.
- Light and dark are both first-class. Dark follows the system by default and the
  header toggle overrides it, remembered in `localStorage`.
- Motion is deliberately quiet, and everything collapses to static under
  `prefers-reduced-motion: reduce`.
- The page background is a canvas texture: SVG fractal grain plus a woven
  thread grid, drawn on one fixed layer behind the content. `--texture` is the
  dial; `0` removes it. Raising it much past `0.9` starts eating into the
  contrast of `--ink-3`, so recheck that if you do.

## Build gotcha

GitHub Pages compiles this with **Ruby Sass 3.7.4** (via jekyll-sass-converter
1.5.2), not Dart Sass. It is the stricter, long-deprecated implementation, and
it rejects things modern Sass accepts. `url()` inside a custom property value is
one of them, which is why `--grain` is written as `#{'url("...")'}`. Check
<https://pages.github.com/versions.json> before relying on a newer Sass feature,
and compile with that version rather than `npx sass` when in doubt.

## Credits

Started from Alex Branham's
[github-pages-academic-starter-kit](https://github.com/jabranham/github-pages-academic-starter-kit).
Icons are [Phosphor](https://phosphoricons.com) (MIT), inlined as a sprite in
`_includes/icons.html`. Type is [Geist](https://vercel.com/font) (SIL OFL 1.1).

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/80x15.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.
