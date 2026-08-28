# Documentation Page Template

Reuse this structure for every new Organization App docs page.

```markdown
---
title: "Page Title"
linkTitle: "Short Title"
weight: 1
description: "One-line description for SEO/sidebar."
---

Brief intro (1–2 paragraphs): what this screen does and when to use it.

## Prerequisites

- Cloud2Gether account
- (permissions / cloud account / plan module if gated)

## How to access

1. Sign in to Cloud2Gether
2. In the left sidebar, go to **Menu > Item**
3. Or open: `https://auth.cloud2gether.com/auth/login/password/<route>`

## What you see

Describe main regions / tabs / actions (mirror UI labels exactly).

## Step-by-step

### Step 1: ...

1. ...

<!-- TODO: Add screenshot — /images/<area>/<name>.png -->

{{< alert color="info" title="Tip" >}}
Optional tip.
{{< /alert >}}

## Related

- [Other page](../other/)
```

## Conventions

- Language: **English**
- Match sidebar/menu labels from Organization App exactly
- Use Docsy alerts: `info`, `warning`, `danger`
- Screenshots: leave `<!-- TODO: Add screenshot — /images/... -->` until Phase 8
- Features marked `soon` in the app: write a short **Coming soon** page only — do not invent steps
