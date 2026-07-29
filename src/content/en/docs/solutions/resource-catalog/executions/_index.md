---
title: "Sync Executions"
linkTitle: "Sync Executions"
weight: 2
description: "Track resource catalog sync runs and drill into individual executions."
---

**Sync executions** shows the history of catalog sync jobs that collect resources from your cloud accounts. Use this view to verify that discovery is running and to investigate failed or incomplete runs.

## How to access

1. Open **Analysis → Resources catalog**
2. Select the **Sync executions** tab

URL: `/resources-catalog/executions`

Open a specific run at `/resources-catalog/executions/<id>` for sync-run details.

<!-- TODO: Add screenshot — /images/resources-catalog/sync-executions.png -->

## What you can do

1. Review the list of sync executions and their status
2. Open an execution to inspect sync runs and outcomes
3. Return to **Catalog** after a successful sync to see updated inventory

{{% alert color="info" title="Tip" %}}
If the catalog looks empty, check Sync executions first and confirm your [cloud accounts](../../../cloud-accounts/) are connected and syncing.
{{% /alert %}}

## Related

- [Resource Catalog](../)
- [Overview & Resources](../overview/)
- [Managing cloud accounts](../../../cloud-accounts/managing-accounts/)
