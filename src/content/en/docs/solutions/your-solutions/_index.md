---
title: "Your Solutions"
linkTitle: "Your Solutions"
weight: 5
description: "Browse solutions acquired by your organization and deploy them to cloud accounts."
---

**Your Solutions** (sidebar: **Solutions → Your Solutions**) is where you manage solutions linked to your organization — browse acquired solutions, open configuration, and run deployments.

In the app the list page title is **Deploy Solution**, with subtitle: *Browse and deploy solutions to your organization.*

## Prerequisites

- An active Cloud2Gether organization
- Ideally at least one purchased/acquired solution from the [Marketplace](../../getting-started/marketplace/)
- Linked [cloud accounts](../../cloud-accounts/) before deploying

## How to access

1. Sign in to Cloud2Gether
2. In the left sidebar, expand **Solutions** → **Your Solutions**
3. Or open: <a href="https://auth.cloud2gether.com/auth/login/password" target="_blank" rel="noopener noreferrer">https://auth.cloud2gether.com/auth/login/password</a>

<!-- TODO: Add screenshot — /images/solutions/your-solutions-list.png -->

## List view

Filter and search your solutions:

- Tabs such as **Acquired**, **In progress**, and **Executed**
- Search by **name or description**
- Filters for **Provider** and **Category**
- **Search** and **Load more** when additional results exist

Each solution appears as a deploy-oriented card. Open details to continue configuration or deployment.

### Empty state

If you have no solutions yet:

> You haven't purchased any solutions yet. Visit our marketplace to unlock the full potential of the Cloud for your business.

## Solution configuration

Open a solution to its deploy dashboard (`/your-solutions/deploy/<id>/...`). From there you can:

| Tab | Route segment | Purpose |
|-----|---------------|---------|
| **Solutions details** | `solutions-details` | Solution configuration overview |
| **Documentation** | `documentation` | Solution documentation |
| **Billing** | `billing` | Billing related to the solution |
| **Execution log** | `execution-log` | Deployment execution history |

Use **Back to your solutions** to return to the list. The side panel includes **Deploy solution** to start a new deployment.

<!-- TODO: Add screenshot — /images/solutions/deploy-dashboard.png -->

## Deploy a solution

1. From the solution dashboard, click **Deploy solution** (route: `/your-solutions/deploy/<id>/create`)
2. Complete the wizard steps, typically including:
   - Stack name
   - Cloud account selection
   - Permissions
   - Parametrization
3. Click **Next** / **Deploy solution** as prompted
4. Review the success confirmation when deployment completes
5. Use **Exit to solutions** or **Back** as needed during the flow

{{% alert color="info" title="Marketplace vs Your Solutions" %}}
Browse and buy from **Marketplace**. Manage and deploy what you own under **Your Solutions**.
{{% /alert %}}

## Related

- [Marketplace](../../getting-started/marketplace/)
- [Solutions](../)
- [Orders](../../orders/)
- [Cloud Accounts](../../cloud-accounts/)
