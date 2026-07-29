---
title: "Cloud Accounts"
linkTitle: "Cloud Accounts"
weight: 2
description: "Connect and manage your cloud provider accounts."
---

**Cloud Accounts** is where you link cloud providers to Cloud2Gether so the platform can discover resources, run analyzers, and keep your inventory up to date.

Cloud2Gether uses **read-only** access wherever possible — it does not create, modify, or delete resources in your cloud environments.

## Prerequisites

- An active Cloud2Gether account
- Permission in your cloud provider console to create credentials or roles (varies by provider)

## How to access

1. Sign in to Cloud2Gether
2. In the left sidebar, click **Cloud Accounts**
3. Or open: <a href="https://app.cloud2gether.com/cloud-accounts" target="_blank" rel="noopener noreferrer">https://app.cloud2gether.com/cloud-accounts</a>
4. From the Dashboard, you can also use the **Cloud Accounts** first-step card

<!-- TODO: Add screenshot — /images/cloud-accounts/list.png -->

## What you see

The Cloud Accounts page includes:

- **Link account** — opens a menu of supported providers (AWS, Azure, Google, Oracle, Alibaba)
- Search by account name
- Filter by provider
- A table of linked accounts with provider, name, region, tags, status, last update, and **View Account**

If you have no accounts yet, an empty state invites you to link your first account.

## Link a cloud account

1. Click **Link account**
2. Choose a provider from the menu
3. Follow the provider-specific setup guide and enter credentials in Cloud2Gether
4. After linking, the account appears in the list — click **View Account** to manage it

### Provider guides

| Provider | Guide |
|----------|-------|
| **AWS** | [Connect AWS](../../cloud-accounts/aws/) |
| **Azure** | [Connect Azure](../../cloud-accounts/azure/) |
| **Google Cloud (GCP)** | [Connect GCP](../../cloud-accounts/gcp/) |
| **Oracle** | [Connect Oracle](../../cloud-accounts/oracle/) |
| **Alibaba** | [Connect Alibaba](../../cloud-accounts/alibaba/) |

## Manage an existing account

Open **View Account** to work with:

- **Overview** — connection info and sync summary
- **Configuration** — name, tags, retention, sync capabilities
- **Credentials** — update provider credentials
- **Logs** — connection and sync logs for troubleshooting

Full details: [Managing cloud accounts](../../cloud-accounts/managing-accounts/).

## Related

- [Dashboard](../dashboard/)
- [Cloud Accounts section](../../cloud-accounts/)
- [Managing cloud accounts](../../cloud-accounts/managing-accounts/)
