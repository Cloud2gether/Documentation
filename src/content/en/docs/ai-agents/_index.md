---
title: "AI Agents"
linkTitle: "AI Agents"
weight: 4
icon: fas fa-robot
description: "AI-powered agents that work alongside your team to automate cloud operations."
---

**Agents** extend Cloud2Gether with specialized AI capabilities for discovery, governance, and analysis across your cloud environment.

In the Organization App, open **Agents** in the left sidebar to browse the marketplace, install agents, and manage what is already enabled for your organization.

Separately, the **Chat Agent** (C2G AI) can appear in the app layout as a conversational assistant when the feature is enabled for your environment.

## How to access

1. Sign in to Cloud2Gether
2. In the left sidebar, click **Agents**
3. Or open: <a href="https://auth.cloud2gether.com/auth/login/password" target="_blank" rel="noopener noreferrer">https://auth.cloud2gether.com/auth/login/password</a>

The page title is **Agents**, with the subtitle: *Install and manage agents to unlock capabilities and insights across your cloud environment.*

<!-- TODO: Add screenshot — /images/agents/agents-page.png -->

## Tabs

| Tab | Route | Purpose |
|-----|-------|---------|
| [Available](available/) | `/agents/available` | Browse agents you can install |
| [Installed](installed/) | `/agents/installed` | Manage agents already enabled |

## Agent types

| Agent | Category | Works with |
|-------|----------|------------|
| [Chat Agent](chat-agent/) | Conversational | App-wide assistant (layout) |
| [Resource Agent](resource-agent/) | Core | Resources Catalog |
| [IaC Agent](iac-agent/) | Governance | Analysis / IaC |
| [Lock-In Agent](lockin-agent/) | Governance | Analysis / Lock-In |

The marketplace may also list additional agents (for example **Cost Optimization**) depending on what is published for your tenant.

## Prerequisites

- An active Cloud2Gether organization
- Linked [cloud accounts](../cloud-accounts/) so agents that rely on the latest cloud execution have data to work with
- Access to the Analysis modules related to the agent (Resource Catalog, Lock-In, IaC) when those agents are installed

## Related

- [Resource Catalog](../solutions/resource-catalog/)
- [Lock-In Analyzer](../solutions/lockin-analyzer/)
- [IaC Analyzer](../solutions/iac-analyzer/)
- [Cloud Accounts](../cloud-accounts/)
