---
title: "Alibaba"
linkTitle: "Alibaba"
weight: 5
description: "Connect and manage your Alibaba Cloud account."
---

Connecting your Alibaba Cloud account to Cloud2Gether allows the platform to discover and analyze your cloud resources. Authentication uses an **Access Key ID** and **Access Key Secret** associated with your Alibaba Cloud account (or RAM user).

Cloud2Gether requires **read-only** style access for discovery and analysis — prefer a RAM user with read-only policies rather than your root account.

## Prerequisites

Before you begin, make sure you have:

- An active **Alibaba Cloud** account
- Access to the <a href="https://www.alibabacloud.com/" target="_blank" rel="noopener noreferrer">Alibaba Cloud console</a> with permission to:
  - View your **Account ID**
  - Create **AccessKeys** (preferably on a RAM user)
- A **Cloud2Gether account** — <a href="https://auth.cloud2gether.com/register/profile" target="_blank" rel="noopener noreferrer">sign up here</a> if you don't have one

## Information You Will Need

| Value | Where to Find It |
|-------|------------------|
| **Account ID** | Alibaba Cloud console → account avatar / Account Management → Account ID |
| **Region** | The region you want Cloud2Gether to use for this connection |
| **Access Key ID** | RAM user → Authentication → AccessKey (or AccessKey Management) |
| **Access Key Secret** | Shown only when the AccessKey is created |

---

# Part 1 — Alibaba Cloud Configuration

## Step 1 — Find your Account ID

1. Sign in to the <a href="https://www.alibabacloud.com/" target="_blank" rel="noopener noreferrer">Alibaba Cloud console</a>
2. Open your account menu (avatar / account name)
3. Locate **Account ID** (sometimes labeled Account ID / UID)
4. Copy the value — you will paste it into Cloud2Gether

<!-- TODO: Add screenshot — /images/alibaba/account-id.png -->

## Step 2 — Create a RAM user (recommended)

Using the root AccessKey is strongly discouraged. Create a dedicated RAM user for Cloud2Gether:

1. Open **Resource Access Management (RAM)** in the Alibaba Cloud console
2. Go to **Identities** → **Users**
3. Click **Create User**
4. Enter a logon name (for example: `cloud2gether-readonly`)
5. Enable **OpenAPI Access** / programmatic access so an AccessKey can be created
6. Finish creating the user

<!-- TODO: Add screenshot — /images/alibaba/ram-create-user.png -->

## Step 3 — Attach a read-only policy

1. Open the RAM user you created
2. Go to **Permissions** / **Add Permissions**
3. Attach a read-only policy appropriate for discovery, for example:
   - System policy such as **ReadOnlyAccess** (if available for your account type), or
   - A custom policy that grants read/list/describe on the services you want analyzed
4. Confirm the permission grant

{{% alert color="info" title="Least privilege" %}}
Grant only the read permissions required for the resources Cloud2Gether should inventory. Avoid AdministratorAccess or other write-capable policies.
{{% /alert %}}

## Step 4 — Create an AccessKey

1. Open the RAM user → **Authentication** → **AccessKey** (labels may vary)
2. Click **Create AccessKey**
3. Complete any security verification required by Alibaba Cloud
4. Copy the **AccessKey ID** and **AccessKey Secret**

<!-- TODO: Add screenshot — /images/alibaba/create-access-key.png -->

{{% alert color="danger" title="Important" %}}
The **Access Key Secret** is shown only once. Store it securely. If you lose it, create a new AccessKey and update Credentials in Cloud2Gether.
{{% /alert %}}

---

# Part 2 — Connect in Cloud2Gether

## Step 1 — Open the Alibaba link flow

1. Sign in to Cloud2Gether
2. In the left sidebar, open **Cloud Accounts**
3. Click **Link account** → **Alibaba**
4. Or open: <a href="https://auth.cloud2gether.com/auth/login/password" target="_blank" rel="noopener noreferrer">https://auth.cloud2gether.com/auth/login/password</a>

The page title is **Link new Alibaba cloud account**.

<!-- TODO: Add screenshot — /images/alibaba/c2g-link-alibaba.png -->

## Step 2 — Fill in the form

Complete the steps in the app:

| Step in app | Field | What to enter |
|-------------|-------|---------------|
| 1 | **Select an account name** | A friendly name in Cloud2Gether (e.g. `Alibaba Production`) |
| 2 | **Account ID** | Your Alibaba Cloud Account ID |
| 3 | **Region** | Select or enter the region |
| 4 | **Access Key ID** | AccessKey ID from RAM |
| 5 | **Access Key Secret** | AccessKey Secret from RAM |

## Step 3 — Create the configuration

1. Click **Create configuration**
2. Wait while Cloud2Gether validates the credentials
3. On success, return to the Cloud Accounts list and open **View Account** to manage Overview, Configuration, Credentials, and Logs

{{% alert color="warning" title="Validation failed?" %}}
If you see **We couldn't verify your Alibaba credentials**, confirm the Account ID, region, Access Key ID/Secret, and that the RAM user still has an active AccessKey with sufficient read permissions.
{{% /alert %}}

## Related

- [Cloud Accounts overview](../)
- [Managing cloud accounts](../managing-accounts/)
- [Getting Started — Cloud Accounts](../../getting-started/cloud-accounts/)
- [AWS](../aws/) · [Azure](../azure/) · [GCP](../gcp/) · [Oracle](../oracle/)
