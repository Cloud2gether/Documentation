---
title: "Lock-In Analyzer"
linkTitle: "Lock-In Analyzer"
weight: 2
description: "Evaluate your infrastructure for vendor lock-in risks and identify alternatives."
---

**Lock-In Analyzer** (sidebar: **Lock In Analyzer**) measures how dependent your infrastructure is on cloud-specific services — and how hard it would be to move, reduce risk, or go multi-cloud.

Continuously monitor selected cloud accounts, identify lock-in drivers, and use Analysis and Compare views to track risk over time.

## Prerequisites

- Linked [cloud accounts](../../cloud-accounts/)
- Plan access to the Lock-In Analyzer module

## How to access

1. Sign in to Cloud2Gether
2. In the left sidebar, expand **Analysis** and click **Lock In Analyzer**
3. Or open: <a href="https://auth.cloud2gether.com/auth/login/password" target="_blank" rel="noopener noreferrer">https://auth.cloud2gether.com/auth/login/password</a>

First visit shows the **Cloud Lock-In Analyzer** welcome screen. Activate monitoring when prompted, then continue to analysis.

<!-- TODO: Add screenshot — /images/lockin-analyzer/welcome.png -->

## Main views

| View | Route | Docs |
|------|-------|------|
| Welcome | `/lock-in-analyzer/welcome` | This page |
| [Analysis](analysis/) | `/lock-in-analyzer/analysis` | Monitored accounts and account detail |
| [Compare](compare/) | `/lock-in-analyzer/compare` | Compare lock-in insights |

## Enable monitoring

1. From the welcome or Analysis screen, choose **Enable monitoring** or **Enable New Monitoring**
2. Select the cloud account(s) to monitor in the activation flow
3. Wait for the first analysis to populate stats and account cards

<!-- TODO: Add screenshot — /images/lockin-analyzer/enable-monitoring.png -->

## Related

- [Analysis](analysis/)
- [Compare](compare/)
- [Resource Catalog](../resource-catalog/)
- [IaC Analyzer](../iac-analyzer/)
