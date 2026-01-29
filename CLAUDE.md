# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Cloud2Gether Documentation site built with Hugo and the Google Docsy theme. Deployed to https://docs.cloud2gether.com via AWS CodeBuild/CloudFront.

## Build Commands

All commands run from the `src/` directory:

```bash
cd src
npm install              # Install PostCSS dependencies (required first time)
npm run dev              # Local dev server with drafts enabled (hugo server -D)
npm run serve            # Local server without drafts
npm run build            # Production build (hugo --gc --minify)
```

Hugo Extended 0.110.0+ is required for SCSS/PostCSS processing.

## Architecture

```
src/                      # Hugo source root
├── hugo.toml            # Main Hugo configuration
├── content/en/          # English documentation content
├── layouts/partials/    # Custom navbar.html and footer.html overrides
├── assets/scss/         # Brand colors and custom styles
│   ├── _variables_project.scss  # Color palette
│   └── _styles_project.scss     # Custom CSS
└── themes/docsy/        # Google Docsy theme (git submodule)

devops/                   # CI/CD configuration
├── buildspec.yml        # AWS CodeBuild spec
├── cloudformation-stack.yaml
└── pipeline-stack.yaml
```

## Key Configuration

- **hugo.toml**: Site settings, menu structure, Docsy params, navbar CTA links
- **Theme**: Docsy is a git submodule - clone with `--recursive` or run `git submodule update --init --recursive`
- **Build output**: Goes to `src/public/` (not root)

## Content

- All content in `src/content/en/` organized by section (getting-started, cloud_account, cloud_analyzer, integrations, lockin, marketplace)
- Front matter uses TOML format (triple `+++`)
- Uses Docsy shortcodes: `{{< blocks/cover >}}`, `{{< blocks/feature >}}`

## Customizations

The navbar and footer are heavily customized in `layouts/partials/`. Brand colors defined in `_variables_project.scss`:
- Primary: #324DFF
- Success: #7BD21D
- Accent: #23F7B8

## Deployment

Push triggers AWS CodeBuild (devops/buildspec.yml) which runs SonarQube analysis, builds with Hugo, and deploys to S3/CloudFront.
