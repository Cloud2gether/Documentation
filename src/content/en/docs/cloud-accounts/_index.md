---
title: "Cloud Accounts"
linkTitle: "Cloud Accounts"
weight: 2
icon: fas fa-cloud
description: "Manage your cloud provider accounts and credentials."
---

Connect your cloud providers to Cloud2Gether so Analysis modules (Resource Catalog, Lock-In Analyzer, IaC Analyzer, and more) can discover and evaluate your infrastructure.

Cloud2Gether requires **read-only** access. It will not create, modify, or delete resources in your accounts.

## In the app

1. Open **Cloud Accounts** in the left sidebar
2. Click **Link account** and choose a provider
3. Complete the provider setup, then manage the account from the list

Quick start in Getting Started: [Cloud Accounts overview](../getting-started/cloud-accounts/).

## Supported providers

| Provider | Documentation | Status |
|----------|---------------|--------|
| [AWS](aws/) | Access Key, Role Delegation, Access Key + Role | Ready |
| [Azure](azure/) | Entra ID app registration + client secret | Ready |
| [GCP](gcp/) | Service account JSON key | Ready |
| [Oracle](oracle/) | API Key Authentication (OCID + PEM) | Ready |
| [Alibaba](alibaba/) | Access Key ID + Secret | Ready |

## Managing linked accounts

After an account is connected, open it from the list to use **Overview**, **Configuration**, **Credentials**, and **Logs**.

See [Managing cloud accounts](managing-accounts/) for a full walkthrough of each tab.

## Related

- [Getting Started — Cloud Accounts](../getting-started/cloud-accounts/)
- [Dashboard](../getting-started/dashboard/)
- [Solutions](../solutions/)
