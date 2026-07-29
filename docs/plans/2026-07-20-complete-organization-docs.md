# Complete Organization App Documentation — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Completar todas as páginas de documentação do Cloud2Gether alinhadas ao Organization App, partindo dos stubs e gaps listados em `ORGANIZATION-APP-DOCS-STATUS.md`.

**Architecture:** Conteúdo Hugo/Docsy em inglês (`content/en/docs/`), no mesmo padrão dos guias AWS já prontos (front matter YAML, `{{< alert >}}`, passos numerados, TODO de screenshots). Cada página deve descrever o fluxo real da UI do Organization App (rotas + labels do menu). Features marcadas `soon` no app **não** recebem guia completo — só nota “Coming soon” até existirem.

**Tech Stack:** Hugo Extended + Docsy, Markdown, shortcodes Docsy (`alert`, links relativos). App de referência: Angular Organization App.

**Status baseline:** `Documentation/ORGANIZATION-APP-DOCS-STATUS.md`

**Convenções (obrigatórias em toda página):**

1. Front matter mínimo: `title`, `linkTitle`, `weight`, `description`
2. Idioma: **inglês** (site atual é `en-us`)
3. Tom: how-to do usuário final (não API interna)
4. Links para o app: `https://app.cloud2gether.com/...` quando fizer sentido
5. Screenshots: placeholder HTML comment `<!-- TODO: Add screenshot — /images/... -->` (coleta de imagens em lote na Fase 8)
6. Após cada página: `cd Documentation/src && npm run build` (ou `npm run serve` para preview)
7. Atualizar checklist em `ORGANIZATION-APP-DOCS-STATUS.md` (🟡→✅ ou adicionar ✅ nas ausentes) ao fechar cada fase
8. **Não documentar** Stack Analyzer, Cost Analyzer, Connectors/Integrations detalhadas, Operations enquanto estiverem `soon` — só placeholder curto

---

## Fases e ordem

| Fase | Foco | Páginas ~ | Dependência |
|------|------|-----------|-------------|
| 0 | Setup / template / checklist vivo | — | — |
| 1 | Getting Started | 3 stubs | Fase 0 |
| 2 | Cloud Accounts (gaps) | índice + detalhe + Oracle/Alibaba | Fase 1 |
| 3 | Solutions / Analysis | Resource Catalog, Lock-In, IaC + subpáginas | Fase 1 |
| 4 | AI Agents | índice + 4 agentes + available/installed | Fase 3 |
| 5 | Company | Profile, Users, Teams, Billing, Plans | Fase 1 |
| 6 | Solutions comerciais | Marketplace, Your Solutions, Orders, Service Hub | Fase 5 |
| 7 | Conta / About / Register | User profile, Register, About | Fase 5 |
| 8 | Screenshots + polish + soon placeholders | todos TODOs de imagem | Fases 1–7 |

---

### Task 0: Template e checklist de execução

**Files:**
- Create: `Documentation/docs/plans/DOC-PAGE-TEMPLATE.md`
- Modify: `Documentation/ORGANIZATION-APP-DOCS-STATUS.md` (adicionar seção “Progresso por fase”)

**Step 1: Criar template reutilizável**

Conteúdo mínimo de `DOC-PAGE-TEMPLATE.md`:

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
3. Or open: `https://app.cloud2gether.com/<route>`

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

**Step 2: Adicionar progresso no status file**

No final de `ORGANIZATION-APP-DOCS-STATUS.md`, seção:

```markdown
## Progresso por fase

| Fase | Status | Notas |
|------|--------|-------|
| 0 Setup | ⏳ | |
| 1 Getting Started | ⏳ | |
| ... | | |
```

**Step 3: Commit**

```bash
git add docs/plans/DOC-PAGE-TEMPLATE.md ORGANIZATION-APP-DOCS-STATUS.md
git commit -m "docs: add page template and phase progress tracker"
```

---

### Task 1: Getting Started — Dashboard

**Files:**
- Modify: `Documentation/src/content/en/docs/getting-started/dashboard/_index.md`
- Reference app: `Cloud2Gether.Organization.App/.../pages/home/` (`HomeComponent`, cards de profile/plan/infrastructure)

**Step 1: Explorar a UI no código**

Ler `home.component.html` + filhos (`card-profile`, `plan`, `infrastructure`, `card-list`) e listar widgets visíveis.

**Step 2: Escrever o corpo da página**

Cobrir: o que é o Dashboard, widgets (organization profile, plan, infrastructure summary, listas), link pós-checkout Stripe se houver, próximo passo (conectar Cloud Account).

**Step 3: Preview**

```bash
cd Documentation/src
npm run serve
```

Abrir `/docs/getting-started/dashboard/` e conferir sidebar/links.

**Step 4: Commit**

```bash
git add src/content/en/docs/getting-started/dashboard/_index.md
git commit -m "docs: complete Getting Started Dashboard page"
```

---

### Task 2: Getting Started — Cloud Accounts overview

**Files:**
- Modify: `Documentation/src/content/en/docs/getting-started/cloud-accounts/_index.md`
- Modify: `Documentation/src/content/en/docs/cloud-accounts/_index.md` (índice da seção — conteúdo complementar, não duplicar guias AWS)

**Step 1: Documentar fluxo de listagem**

Rota `/cloud-accounts`: listar contas, CTA “link account”, providers (AWS, Azure, GCP, Oracle, Alibaba). Linkar para `../cloud-accounts/aws/`, `azure/`, `gcp/`.

**Step 2: No índice `cloud-accounts/_index.md`**

Tabela de providers + status (AWS/Azure/GCP ready; Oracle/Alibaba “guide coming”) + link para detalhe da conta (quando a Task 4 existir).

**Step 3: Commit**

```bash
git add src/content/en/docs/getting-started/cloud-accounts/_index.md src/content/en/docs/cloud-accounts/_index.md
git commit -m "docs: complete Cloud Accounts overview pages"
```

---

### Task 3: Getting Started — Marketplace

**Files:**
- Modify: `Documentation/src/content/en/docs/getting-started/marketplace/_index.md`
- Reference: menu Solutions → Marketplace (`environment.app.catalog` no layout)

**Step 1: Escrever página**

Explicar que Marketplace abre o catálogo externo; diferença vs **Your Solutions**; como navegar Solutions → Marketplace.

**Step 2: Commit**

```bash
git add src/content/en/docs/getting-started/marketplace/_index.md
git commit -m "docs: complete Marketplace getting started page"
```

---

### Task 4: Cloud Accounts — detalhe da conta

**Files:**
- Create: `Documentation/src/content/en/docs/cloud-accounts/managing-accounts/_index.md`
- Modify: `Documentation/src/content/en/docs/cloud-accounts/_index.md` (linkar)

**Step 1: Mapear abas do app**

Rotas: `/:id/overview`, `configuration`, `credentials`, `logs` (`new-cloudaccounts-routing.ts`).

**Step 2: Documentar cada aba**

O que o usuário vê/edita; avisos de segurança em credentials; logs para troubleshooting.

**Step 3: Commit**

```bash
git add src/content/en/docs/cloud-accounts/managing-accounts/_index.md src/content/en/docs/cloud-accounts/_index.md
git commit -m "docs: add managing cloud accounts detail guide"
```

---

### Task 5: Cloud Accounts — Oracle e Alibaba

**Files:**
- Create: `Documentation/src/content/en/docs/cloud-accounts/oracle/_index.md`
- Create: `Documentation/src/content/en/docs/cloud-accounts/alibaba/_index.md`
- Reference app: `link-account-oracle/`, `link-account-alibaba/`

**Step 1: Extrair campos do formulário Angular**

Ler componentes de link Oracle/Alibaba (campos, validações, textos de ajuda).

**Step 2: Escrever guias no padrão Azure/GCP**

Prerequisites → valores necessários → passos no console do provider → passos no Cloud2Gether.

**Step 3: Commit**

```bash
git add src/content/en/docs/cloud-accounts/oracle/_index.md src/content/en/docs/cloud-accounts/alibaba/_index.md
git commit -m "docs: add Oracle and Alibaba cloud account guides"
```

---

### Task 6: Solutions — índice e Resource Catalog

**Files:**
- Modify: `Documentation/src/content/en/docs/solutions/_index.md`
- Modify: `Documentation/src/content/en/docs/solutions/resource-catalog/_index.md`
- Create (subpáginas):
  - `.../resource-catalog/overview/_index.md`
  - `.../resource-catalog/resources/_index.md`
  - `.../resource-catalog/executions/_index.md`
  - `.../resource-catalog/compare/_index.md`
  - `.../resource-catalog/graph/_index.md`

**Step 1: Índice Solutions**

Descrever menu **Analysis** no app; listar Resource Catalog, Lock-In, IaC; Stack/Cost como Coming soon.

**Step 2: Resource Catalog hub**

Welcome gate, tabs: Catalog (Overview/Resources), Executions, Compare, Graph. Rotas em `resources-catalog-routing.ts`.

**Step 3: Uma página por subfluxo** (5 arquivos)

Cada uma: purpose → how to access → main actions → related.

**Step 4: Commit**

```bash
git add src/content/en/docs/solutions/
git commit -m "docs: complete Solutions index and Resource Catalog guides"
```

---

### Task 7: Solutions — Lock-In Analyzer

**Files:**
- Modify: `Documentation/src/content/en/docs/solutions/lockin-analyzer/_index.md`
- Create: `.../lockin-analyzer/analysis/_index.md`
- Create: `.../lockin-analyzer/compare/_index.md`

**Step 1: Documentar welcome + activate monitoring**

Referência: `lock-in-welcome`, `activate-monitoring-modal`, hub guard.

**Step 2: Analysis e Compare**

Cards de conta, drill-down de categoria, fluxo de compare entre execuções/contas.

**Step 3: Commit**

```bash
git add src/content/en/docs/solutions/lockin-analyzer/
git commit -m "docs: complete Lock-In Analyzer documentation"
```

---

### Task 8: Solutions — IaC Analyzer

**Files:**
- Modify: `Documentation/src/content/en/docs/solutions/iac-analyzer/_index.md`
- Create (se necessário): `.../iac-analyzer/analysis/_index.md`

**Step 1: Documentar welcome, ativação do hub, analysis**

Referência: `iac-welcome`, `iac-new-analysis-modal`, `iac-account-detail`.

**Step 2: Commit**

```bash
git add src/content/en/docs/solutions/iac-analyzer/
git commit -m "docs: complete IaC Analyzer documentation"
```

---

### Task 9: Solutions — Stack Analyzer (placeholder only)

**Files:**
- Modify: `Documentation/src/content/en/docs/solutions/stack-analyzer/_index.md`

**Step 1: Escrever página “Coming soon”**

1 parágrafo do que será + alert info; **sem** passos inventados.

**Step 2: Commit**

```bash
git add src/content/en/docs/solutions/stack-analyzer/_index.md
git commit -m "docs: add Stack Analyzer coming soon placeholder"
```

---

### Task 10: AI Agents

**Files:**
- Modify: `Documentation/src/content/en/docs/ai-agents/_index.md`
- Modify: `.../chat-agent/_index.md`, `resource-agent/`, `iac-agent/`, `lockin-agent/`
- Create: `.../ai-agents/available/_index.md`
- Create: `.../ai-agents/installed/_index.md`
- Reference: `agents-routing.ts` (`/agents/available`, `/agents/installed`)

**Step 1: Índice Agents**

Como abrir Agents no menu; diferença Available vs Installed; relação com módulos Analysis.

**Step 2: Páginas Available / Installed**

Como instalar, o que “installed” significa, requisitos de plano se houver.

**Step 3: Páginas por tipo de agente**

Cada stub: o que o agente faz, quando usar, como invocar a partir do módulo relacionado.

**Step 4: Commit**

```bash
git add src/content/en/docs/ai-agents/
git commit -m "docs: complete AI Agents documentation"
```

---

### Task 11: Company — Profile, Users, Teams

**Files:**
- Create: `Documentation/src/content/en/docs/company/_index.md`
- Create: `.../company/profile/_index.md`
- Create: `.../company/users/_index.md`
- Create: `.../company/teams/_index.md`

**Step 1: Criar seção Company na doc**

weight sugerido: 6 (ajustando About se necessário). Sidebar Docsy descobre por pasta.

**Step 2: Documentar cada tela**

- Profile: `/company-profile`
- Users: `/users` (convite, roles se existir na UI)
- Teams: `/teams` + dialogs de members

**Step 3: Commit**

```bash
git add src/content/en/docs/company/
git commit -m "docs: add Company Profile, Users, and Teams guides"
```

---

### Task 12: Company — Billing e Plans

**Files:**
- Create: `.../company/billing/_index.md`
- Create: `.../company/plans/_index.md`
- Reference: `billing-subscription/`, `plans/`, `plan-change-modal`

**Step 1: Billing**

Assinatura atual, gerenciar pagamento, o que o usuário pode alterar.

**Step 2: Plans**

Cards de plano, upgrade/downgrade, impacto nos módulos gated (`PlanAccessService` / menu Analysis).

**Step 3: Commit**

```bash
git add src/content/en/docs/company/billing/_index.md src/content/en/docs/company/plans/_index.md
git commit -m "docs: add Billing and Plans documentation"
```

---

### Task 13: Your Solutions, Orders, Service Hub

**Files:**
- Create: `Documentation/src/content/en/docs/solutions/your-solutions/_index.md` (ou `operations/your-solutions` — preferir sob Solutions para bater com o menu)
- Create: `Documentation/src/content/en/docs/orders/_index.md`
- Create: `Documentation/src/content/en/docs/expert-help/_index.md` (+ job-request / hire se precisar)

**Step 1: Your Solutions**

Lista, deploy flow, abas details / documentation / billing / execution-log (`your-solutions-routing.ts`).

**Step 2: Orders**

Lista e detalhe `/your-orders/:id`.

**Step 3: Expert Help / Service Hub**

Dashboard, Job Request (create/details), Hire an Experts search.

**Step 4: Commit**

```bash
git add src/content/en/docs/solutions/your-solutions/ src/content/en/docs/orders/ src/content/en/docs/expert-help/
git commit -m "docs: add Your Solutions, Orders, and Expert Help guides"
```

---

### Task 14: Register, User profile, About

**Files:**
- Create: `Documentation/src/content/en/docs/getting-started/register/_index.md` (ou `account/register`)
- Create: `Documentation/src/content/en/docs/account/profile/_index.md`
- Modify: `Documentation/src/content/en/docs/about/_index.md`

**Step 1: Register + User profile**

Fluxo `/register` e `/user/profile`.

**Step 2: About**

Missão / o que é Cloud2Gether (pode reaproveitar texto do `_index.md` sem duplicar demais).

**Step 3: Commit**

```bash
git add src/content/en/docs/getting-started/register/ src/content/en/docs/account/ src/content/en/docs/about/_index.md
git commit -m "docs: add Register, user profile, and About pages"
```

---

### Task 15: Integrations / Connectors — placeholders only

**Files:**
- Modify: `Documentation/src/content/en/docs/integrations/_index.md`
- Modify: `.../github/_index.md`, `.../jira/_index.md`

**Step 1: Coming soon em todas**

Sem inventar setup. Mencionar que Connectors está no menu como soon.

**Step 2: Commit**

```bash
git add src/content/en/docs/integrations/
git commit -m "docs: mark Integrations as coming soon placeholders"
```

---

### Task 16: Screenshots e polish final

**Files:**
- Create images under `Documentation/src/static/images/...` (ou `assets/`)
- Replace `<!-- TODO: Add screenshot -->` nas páginas escritas
- Modify: `ORGANIZATION-APP-DOCS-STATUS.md` → marcar tudo ✅ / 🔜

**Step 1: Inventário de TODOs**

```bash
rg "TODO: Add screenshot" Documentation/src/content
```

**Step 2: Capturar screenshots no app (sandbox/dev)**

Nomenclatura: `/images/<area>/<screen>.png` (ex.: `/images/cloud-accounts/list.png`).

**Step 3: Build de produção**

```bash
cd Documentation/src
npm run build
```

Expected: build Hugo sem erro.

**Step 4: Commit**

```bash
git add src/static/images src/content ORGANIZATION-APP-DOCS-STATUS.md
git commit -m "docs: add screenshots and mark documentation status complete"
```

---

## Critérios de “página completa”

Uma página só sai de 🟡/❌ para ✅ quando:

- [ ] Tem intro + how to access + steps (ou Coming soon explícito se feature soon)
- [ ] Labels batem com o menu/UI do Organization App
- [ ] Links internos para páginas relacionadas
- [ ] Build Hugo passa
- [ ] Status file atualizado

---

## Estimativa (ordem de grandeza)

| Fase | Esforço sugerido |
|------|------------------|
| 0–1 Getting Started | 0.5–1 dia |
| 2 Cloud Accounts gaps | 1–1.5 dias |
| 3 Solutions/Analysis | 2–3 dias |
| 4 Agents | 1 dia |
| 5–6 Company + comercial | 2 dias |
| 7 Account/About | 0.5 dia |
| 8 Screenshots | 1–2 dias |
| **Total** | **~8–11 dias** |

---

## Fora de escopo (até feature existir no app)

- Stack Analyzer (além do placeholder)
- Cost Analyzer (criar stub Coming soon só se quiser simetria no índice)
- Operations (Runs / Activity / Alerts)
- Integrações GitHub/Jira com setup real
- Documentação de API / backend

---

## Referências rápidas

| O quê | Onde |
|-------|------|
| Status gap analysis | `Documentation/ORGANIZATION-APP-DOCS-STATUS.md` |
| Menu do app | `.../app-layout.service.ts` → `buildListSidebarMenuItem` |
| Rotas | `.../app-routing.ts` |
| Padrão de conteúdo | `docs/cloud-accounts/aws/access-key/_index.md` |
| Preview local | `cd Documentation/src && npm run serve` |
