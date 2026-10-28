# HelloNobb.github.io

Portfolio and resume site, built by GitHub Pages' built-in Jekyll. No build setup needed.

## Edit content

| What | File |
|---|---|
| Name, slogan, intro paragraph (`about`), profile photo, email, top-right links | `_config.yml` |
| Resume (web) | `resume.md` |
| Resume (PDF) | `assets/resume.pdf` (regenerate after editing the resume or slogan, see `FOR_ME.md` 7) |
| Projects | `_projects/*.md` |

## Add a project

1. Copy an existing file such as `_projects/gloomy.md` to `_projects/<slug>.md`. The slug becomes the URL: `/projects/<slug>/`.
2. Fill in the front matter. `order` decides the position everywhere (smaller first); `date` only supplies the year shown.
3. Put media in `assets/projects/<slug>/` and point `cover` at it.
4. Leave a link (`github`, `video`, `play`, `web`) empty to hide its button.
5. For images in the body, use `{% include img.html src="/assets/projects/<slug>/file.webp" alt="..." %}`. It lazy-loads and skips missing files.

The ABOUT overview, the PORTFOLIO page and the detail page update automatically on push.

## Deploy

Push to `main`. In the repo, Settings > Pages > Source: "Deploy from a branch", `main` / `(root)`.
Site: https://hellonobb.github.io
