# Organization App × Documentation — Status das páginas

Análise cruzando as rotas/menu do **Cloud2Gether.Organization.App** com o conteúdo em `Documentation/src/content/en/docs/`.

**Data:** 2026-07-20

**Legenda**

| Status | Significado |
|--------|-------------|
| ✅ Pronta | Página na doc com conteúdo útil (guia/passo a passo) |
| 🟡 Stub | Página existe na estrutura da doc, mas só tem front matter (sem corpo) |
| ❌ Ausente | Página/feature existe no app (ou no menu) e **não há** entrada correspondente na doc |
| 🔜 Soon | Item marcado como `soon` no app (ainda não implementado de fato) |
| 📎 Só doc | Existe na doc, mas não há página equivalente no Organization App |

---

## Resumo

| Categoria | ✅ Prontas | 🟡 Stubs | ❌ Ausentes no doc | 🔜 Soon (app) |
|-----------|-----------|----------|-------------------|---------------|
| Cloud Accounts | 6 | 1 (índice) | Oracle, Alibaba, listagem/detalhe | — |
| Getting Started | 1 (índice) | 3 | — | — |
| Solutions / Analysis | 0 | 5 | subpáginas reais do app | Stack, Cost |
| AI Agents | 0 | 5 | Available / Installed | — |
| Integrations | 0 | 3 | — (Connectors = soon) | Connectors |
| Company / Ops / Marketplace | 0 | 0 | várias páginas do app | Operations |
| About | 0 | 1 | — | — |

**Conclusão:** o único bloco de documentação **pronto** é **Cloud Accounts (AWS, Azure, GCP)**. Quase todo o restante da árvore da doc está como stub, e várias áreas importantes do Organization App (Company, Orders, Service Hub, Your Solutions, subfluxos de analyzers) **não têm página na doc**.

---

## 1. Páginas prontas na Documentation

Conteúdo real escrito (não só front matter):

| Doc path | Corresponde no App | Observação |
|----------|-------------------|------------|
| `docs/_index.md` | — (landing da doc) | Visão geral da plataforma |
| `docs/getting-started/_index.md` | Dashboard / onboarding | Overview; filhos ainda stubs |
| `docs/cloud-accounts/aws/_index.md` | `/cloud-accounts/link-account/aws` | Visão dos 3 métodos AWS |
| `docs/cloud-accounts/aws/access-key/_index.md` | Link AWS (Access Key) | Guia completo |
| `docs/cloud-accounts/aws/role-delegation/_index.md` | Link AWS (Role Delegation) | Guia completo |
| `docs/cloud-accounts/aws/access-key-with-role/_index.md` | Link AWS (Access Key + Role) | Guia completo |
| `docs/cloud-accounts/azure/_index.md` | `/cloud-accounts/link-account/azure` | Guia completo |
| `docs/cloud-accounts/gcp/_index.md` | `/cloud-accounts/link-account/gcp` | Guia completo |

---

## 2. Páginas stub na Documentation (estrutura existe, falta conteúdo)

| Doc path | Esperado mapear no App |
|----------|------------------------|
| `docs/about/_index.md` | Institucional (não é página do app) |
| `docs/getting-started/dashboard/_index.md` | `/home` (Dashboard) |
| `docs/getting-started/cloud-accounts/_index.md` | `/cloud-accounts` (lista) |
| `docs/getting-started/marketplace/_index.md` | Marketplace (redirect externo `environment.app.catalog`) |
| `docs/cloud-accounts/_index.md` | `/cloud-accounts` |
| `docs/solutions/_index.md` | Seção Analysis / Solutions |
| `docs/solutions/resource-catalog/_index.md` | `/resources-catalog` |
| `docs/solutions/lockin-analyzer/_index.md` | `/lock-in-analyzer` |
| `docs/solutions/iac-analyzer/_index.md` | `/iac-analyzer` |
| `docs/solutions/stack-analyzer/_index.md` | Stack Analyzer (`soon` no menu) |
| `docs/ai-agents/_index.md` | `/agents` |
| `docs/ai-agents/chat-agent/_index.md` | Agent Chat (feature flag / layout) |
| `docs/ai-agents/resource-agent/_index.md` | Agente de Resources |
| `docs/ai-agents/iac-agent/_index.md` | Agente de IaC |
| `docs/ai-agents/lockin-agent/_index.md` | Agente de Lock-In |
| `docs/integrations/_index.md` | Connectors (`soon` no menu) |
| `docs/integrations/github/_index.md` | Integração GitHub (não há rota dedicada no app hoje) |
| `docs/integrations/jira/_index.md` | Integração Jira (não há rota dedicada no app hoje) |

---

## 3. Páginas / features do Organization App sem documentação

### 3.1 Menu lateral — implementadas (há rota)

| Menu / Página | Rota(s) no App | Status na Doc |
|---------------|----------------|---------------|
| **Dashboard** | `/home` | 🟡 Stub (`getting-started/dashboard`) |
| **IaC Analyzer** | `/iac-analyzer`, `/welcome`, `/analysis` | 🟡 Stub |
| **Resources Catalog** | `/resources-catalog` (+ `catalog/overview`, `catalog/resources`, `executions`, `executions/:id`, `compare`, `graph`, `welcome`) | 🟡 Stub (só índice; faltam subpáginas) |
| **Lock-In Analyzer** | `/lock-in-analyzer`, `/welcome`, `/analysis`, `/compare` | 🟡 Stub (faltam Analysis / Compare) |
| **Agents** | `/agents/available`, `/agents/installed` | 🟡 Stub genérico; faltam Available/Installed |
| **Cloud Accounts — lista** | `/cloud-accounts` | 🟡 Stub |
| **Cloud Accounts — detalhe** | `/cloud-accounts/:id/overview`, `configuration`, `credentials`, `logs` | ❌ Ausente |
| **Cloud Accounts — Oracle** | `/cloud-accounts/link-account/oracle` | ❌ Ausente |
| **Cloud Accounts — Alibaba** | `/cloud-accounts/link-account/alibaba` | ❌ Ausente |
| **Marketplace** | link externo (catalog) | 🟡 Stub |
| **Your Solutions** | `/your-solutions`, `/deploy/:id/*` (details, documentation, billing, execution-log, create) | ❌ Ausente |
| **Expert Help / Requests** | `/service-hub` (dashboard, job-request, hire-an-experts) | ❌ Ausente |
| **Orders** | `/your-orders`, `/your-orders/:id` | ❌ Ausente |
| **Company — Profile** | `/company-profile` | ❌ Ausente |
| **Company — Users** | `/users` | ❌ Ausente |
| **Company — Teams** | `/teams` | ❌ Ausente |
| **Company — Billing** | `/billing-subscription` | ❌ Ausente |
| **Company — Plans** | `/plans` | ❌ Ausente |
| **User profile** | `/user/profile` | ❌ Ausente |
| **Register** | `/register` | ❌ Ausente |

### 3.2 Menu lateral — `soon` (ainda não implementados)

| Item no menu | Doc |
|--------------|-----|
| Stack Analyzer | 🟡 Stub (`solutions/stack-analyzer`) |
| Cost Analyzer | ❌ Ausente (citado só na intro; sem página) |
| Connectors | 🟡 Stub (`integrations`) |
| Operations — Runs / Activity / Alerts | ❌ Ausente |

### 3.3 Citados na intro da doc, sem página dedicada

Serviços listados em `docs/_index.md` / `getting-started/_index.md` sem doc própria:

- Resources Evolution  
- Stack Evolution (parcialmente coberto pelo stub Stack Analyzer)  
- Costs Analyzer  
- Catalog Resources (parcialmente → Resource Catalog stub)

---

## 4. Mapa completo Organization App → Documentation

```
Organization App                          Documentation
─────────────────────────────────────────────────────────────
Dashboard (/home)                         🟡 getting-started/dashboard
─────────────────────────────────────────────────────────────
Analysis
  IaC Analyzer                            🟡 solutions/iac-analyzer
  Resources Catalog (+ tabs)              🟡 solutions/resource-catalog
  Lock-In Analyzer (+ compare)            🟡 solutions/lockin-analyzer
  Stack Analyzer (soon)                   🟡 solutions/stack-analyzer
  Cost Analyzer (soon)                    ❌
─────────────────────────────────────────────────────────────
Agents (/available, /installed)           🟡 ai-agents/* (stubs por tipo)
Connectors (soon)                         🟡 integrations/*
─────────────────────────────────────────────────────────────
Cloud Accounts
  Lista / Detalhe                         🟡 índice / ❌ detalhe
  AWS (3 métodos)                         ✅ prontas
  Azure                                   ✅ pronta
  GCP                                     ✅ pronta
  Oracle / Alibaba                        ❌
─────────────────────────────────────────────────────────────
Operations (soon)                         ❌
─────────────────────────────────────────────────────────────
Solutions
  Marketplace                             🟡 getting-started/marketplace
  Your Solutions                          ❌
─────────────────────────────────────────────────────────────
Expert Help (Service Hub)                 ❌
Orders                                    ❌
─────────────────────────────────────────────────────────────
Company
  Profile / Users / Teams                 ❌
  Billing / Plans                         ❌
─────────────────────────────────────────────────────────────
Register / User profile                   ❌
About                                     🟡 about (só stub)
```

---

## 5. Prioridade sugerida para completar a doc

Ordenação sugerida alinhada ao que o usuário encontra primeiro no app:

1. **Completar stubs de Getting Started** — Dashboard, Cloud Accounts (lista), Marketplace  
2. **Completar Solutions** — Resource Catalog (overview, resources, executions, compare, graph), Lock-In (analysis + compare), IaC Analyzer  
3. **Cloud Accounts faltantes** — detalhe da conta, Oracle, Alibaba  
4. **Agents** — Available / Installed + tipos de agente  
5. **Company** — Profile, Users, Teams, Billing, Plans  
6. **Your Solutions, Orders, Service Hub**  
7. **Soon** — documentar só quando o feature sair de `soon` (Stack, Cost, Connectors, Operations)

---

## Fonte desta análise

- Rotas: `Cloud2Gether.Organization.App/src/src/app/app-routing.ts` e `*-routing.ts` das páginas  
- Menu: `services/app/layout/app-layout.service.ts` (`buildListSidebarMenuItem`)  
- Conteúdo: `Documentation/src/content/en/docs/**/_index.md`

---

## Progresso por fase

| Fase | Status | Notas |
|------|--------|-------|
| 0 Setup | ✅ | Template em `docs/plans/DOC-PAGE-TEMPLATE.md` |
| 1 Getting Started | ✅ | Dashboard, Cloud Accounts overview, Marketplace |
| 2 Cloud Accounts gaps | ✅ | Managing Accounts + Oracle + Alibaba |
| 3 Solutions / Analysis | ✅ | Resource Catalog (+ subpáginas), Lock-In, IaC, Stack placeholder |
| 4 AI Agents | ✅ | Índice + Available/Installed + Chat/Resource/IaC/Lock-In |
| 5 Company | ✅ | Profile, Users, Teams, Billing, Plans |
| 6 Solutions comerciais | ✅ | Your Solutions + Orders + Expert Help (Service Hub) |
| 7 Account / About / Register | ✅ | Register + Account/User profile + About |
| 8 Screenshots + polish | ⏳ | Em aberto — alerts já migrados para `{{% alert %}}` (Markdown) |

### Atualizado nesta execução (2026-07-20)

| Doc path | Antes | Agora |
|----------|-------|-------|
| `getting-started/dashboard` | 🟡 Stub | ✅ |
| `getting-started/cloud-accounts` | 🟡 Stub | ✅ |
| `getting-started/marketplace` | 🟡 Stub | ✅ |
| `cloud-accounts/_index` | 🟡 Stub | ✅ |
| `cloud-accounts/managing-accounts` | ❌ Ausente | ✅ (nova) |
| `solutions/_index` | 🟡 Stub | ✅ |
| `solutions/resource-catalog` (+ overview, executions, compare, graph) | 🟡 / ❌ | ✅ |
| `solutions/lockin-analyzer` (+ analysis, compare) | 🟡 / ❌ | ✅ |
| `solutions/iac-analyzer` (+ analysis) | 🟡 / ❌ | ✅ |
| `solutions/stack-analyzer` | 🟡 Stub | ✅ (Coming soon) |
| `cloud-accounts/oracle` | ❌ Ausente | ✅ (nova) |
| `cloud-accounts/alibaba` | ❌ Ausente | ✅ (nova) |
| `ai-agents/_index` + available/installed + 4 agent types | 🟡 / ❌ | ✅ |
| `company/` (+ profile, users, teams, billing, plans) | ❌ Ausente | ✅ (nova seção) |
| `solutions/your-solutions` | ❌ Ausente | ✅ |
| `orders/` | ❌ Ausente | ✅ |
| `expert-help/` (+ job-request, hire-an-expert) | ❌ Ausente | ✅ |
| `getting-started/register` | ❌ Ausente | ✅ |
| `account/` (+ profile) | ❌ Ausente | ✅ |
| `about/_index` | 🟡 Stub | ✅ |
