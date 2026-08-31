---
title: "Managing Cloud Accounts"
linkTitle: "Managing Accounts"
weight: 10
description: "View, configure, update credentials, and troubleshoot linked cloud accounts."
---

After you link a cloud account, use the account detail page to review connection health, adjust sync settings, rotate credentials, and inspect logs.

## Prerequisites

- At least one [linked cloud account](../)
- Access to the Cloud Accounts area in your organization

## How to access

1. Sign in to Cloud2Gether
2. Open **Cloud Accounts** in the left sidebar
3. In the accounts table, click **View Account** for the account you want to manage
4. Use **Back to Accounts** at the top to return to the list

Sign in to access: <a href="https://auth.cloud2gether.com/auth/login/password" target="_blank" rel="noopener noreferrer">https://auth.cloud2gether.com/auth/login/password</a>

<!-- TODO: Add screenshot — /images/cloud-accounts/account-detail-header.png -->

## Tabs

| Tab | Purpose |
|-----|---------|
| **Overview** | Connection info, status, tags, and last sync statistics |
| **Configuration** | Account name, labels/tags, data retention, sync capabilities |
| **Credentials** | Provider-specific credentials used by Cloud2Gether |
| **Logs** | Connection and sync logs for troubleshooting |

---

## Overview

The Overview tab shows:

### Connection Info

- **Account Name**
- **Account ID**
- **Region** (or All regions)
- **Status**
- **Tags** (when defined)

### Sync Summary

- Last sync execution time
- Total capabilities / executed capabilities
- Next scheduled sync

You may also see an AI assistant panel with context for this cloud account connection.

<!-- TODO: Add screenshot — /images/cloud-accounts/overview-tab.png -->

---

## Configuration

Use Configuration to keep the account organized and control what Cloud2Gether syncs.

1. Open the **Configuration** tab
2. Update fields as needed:
   - **Account name** — display name in Cloud2Gether
   - **Labels & Tags** — chips to identify the account
   - **Data Retention** — retention period for collected data
   - **Sync Settings** — toggles for each available capability (what data to collect and keep updated)
3. Click **Update** to save

{{% alert color="info" title="Sync capabilities" %}}
If no capabilities appear, the provider may not expose sync options yet for this account. Check back after the connection is healthy, or contact support.
{{% /alert %}}

<!-- TODO: Add screenshot — /images/cloud-accounts/configuration-tab.png -->

---

## Credentials

The **Credentials** tab shows the credential form for the account’s provider (AWS, Azure, GCP, Oracle, or Alibaba). Use it when you need to rotate keys, update roles, or fix an authentication failure.

{{% alert color="warning" title="Security" %}}
Treat credentials as secrets. Prefer short-lived or role-based access when your provider supports it (for example, AWS Role Delegation). Never share credentials in tickets or chat.
{{% /alert %}}

For initial setup guides, see:

- [AWS](../aws/)
- [Azure](../azure/)
- [GCP](../gcp/)
- [Oracle](../oracle/)
- [Alibaba](../alibaba/)

<!-- TODO: Add screenshot — /images/cloud-accounts/credentials-tab.png -->

---

## Logs

The **Logs** tab lists Cloud2Gether connection logs for this cloud provider account.

1. Optionally filter by **type** and **status**
2. Review each row: timestamp, type, and Success / Failure
3. Use failures to diagnose credential, permission, or sync issues

If the table is empty, no logs are available yet for this account.

<!-- TODO: Add screenshot — /images/cloud-accounts/logs-tab.png -->

## Related

- [Cloud Accounts overview](../)
- [Getting Started — Cloud Accounts](../../getting-started/cloud-accounts/)
- [AWS](../aws/) · [Azure](../azure/) · [GCP](../gcp/) · [Oracle](../oracle/) · [Alibaba](../alibaba/)
