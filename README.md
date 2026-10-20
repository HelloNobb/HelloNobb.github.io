# HelloNobb.github.io

Portfolio and resume site, built by GitHub Pages' built-in Jekyll. No build setup needed.

## Edit content

| What | File |
|---|---|
| Name, tagline, email, GitHub | `_config.yml` |
| Intro paragraph | `index.html` |
| Resume (web) | `resume.md` |
| Resume (PDF) | `assets/resume.pdf` |
| Projects | `_projects/*.md` |

## Add a project

1. Copy `_projects/project-a.md` to `_projects/<slug>.md`. The slug becomes the URL: `/projects/<slug>/`.
2. Fill in the front matter. `date` decides the order (newest first); only the year is shown.
3. Put media in `assets/projects/<slug>/` and point `cover` at it.
4. Leave a link (`github`, `video`, `play`) empty to hide its button.
5. For images in the body, add `{: loading="lazy"}` after the image to lazy-load it.

The list and the detail page update automatically on push.

## Deploy

Push to `main`. In the repo, Settings > Pages > Source: "Deploy from a branch", `main` / `(root)`.
Site: https://hellonobb.github.io
