---
title: "IaC Analyzer"
linkTitle: "IaC Analyzer"
weight: 3
description: "Measure Infrastructure as Code adoption and identify gaps in coverage."
---

**IaC Analyzer** (sidebar: **Infrastructure**) helps you understand how much of your cloud infrastructure is managed as code — and what still needs to be standardized, documented, or converted into IaC.

Use continuous monitoring to find unmanaged resources, coverage gaps, configuration drift, and opportunities to improve adoption.

## Prerequisites

- Linked [cloud accounts](../../cloud-accounts/)
- Plan access to the IaC Analyzer module

## How to access

1. Sign in to Cloud2Gether
2. In the left sidebar, expand **Analysis** and click **Infrastructure**
3. Or open: <a href="https://auth.cloud2gether.com/auth/login/password" target="_blank" rel="noopener noreferrer">https://auth.cloud2gether.com/auth/login/password</a>

First visit shows the **IaC Analysis** welcome screen. Activate analysis when prompted, then continue to the hub.

<!-- TODO: Add screenshot — /images/iac-analyzer/welcome.png -->

## IaC Hub (Analysis)

URL: `/iac-analyzer/analysis`

The hub includes:

- Title **IaC Hub** with subtitle about continuous diagnosis and progress tracking
- **New monitoring** to start monitoring additional accounts
- KPI cards summarizing adoption across monitored accounts
- An account list — open an account for detail (query param `account`)

From account detail you can re-run analysis and review findings. Use **Back to Account list** to return.

<!-- TODO: Add screenshot — /images/iac-analyzer/hub.png -->

## Start monitoring

1. Click **New monitoring** (or follow the welcome CTA)
2. Complete the new analysis modal (select account / options as shown)
3. Wait for results to populate KPIs and the account list

## Related

- [Analysis detail flow](analysis/)
- [Resource Catalog](../resource-catalog/)
- [Lock-In Analyzer](../lockin-analyzer/)
