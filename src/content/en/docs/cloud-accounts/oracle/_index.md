---
title: "Oracle"
linkTitle: "Oracle"
weight: 4
description: "Connect and manage your Oracle Cloud Infrastructure (OCI) tenancy."
---

Connecting your Oracle Cloud Infrastructure (OCI) tenancy to Cloud2Gether allows the platform to discover and analyze your cloud resources. Cloud2Gether uses **API Key Authentication** with a user OCID, tenancy OCID, API key fingerprint, and private key (PEM).

Cloud2Gether requires **read-only** style access for discovery and analysis — it should not be granted write permissions beyond what is needed for authentication.

## Prerequisites

Before you begin, make sure you have:

- An active **Oracle Cloud Infrastructure (OCI)** tenancy
- Access to the <a href="https://cloud.oracle.com/" target="_blank" rel="noopener noreferrer">OCI Console</a> with permission to:
  - View your **User OCID** and **Tenancy OCID**
  - Create or upload an **API signing key** for your user
- A **Cloud2Gether account** — <a href="https://auth.cloud2gether.com/register/profile" target="_blank" rel="noopener noreferrer">sign up here</a> if you don't have one

## Information You Will Need

| Value | Where to Find It |
|-------|------------------|
| **User OCID** | OCI Console → Profile (user menu) → User settings → OCID |
| **Tenancy OCID** | OCI Console → Administration → Tenancy details → OCID |
| **API Key Fingerprint** | User settings → API Keys (after uploading the public key) |
| **Private Key (PEM)** | The private key file generated when you create the API key pair |
| **Region** (optional) | Home region or the region you want Cloud2Gether to focus on |

---

# Part 1 — Oracle Cloud Configuration

## Step 1 — Collect your User OCID

1. Sign in to the <a href="https://cloud.oracle.com/" target="_blank" rel="noopener noreferrer">OCI Console</a>
2. Open your **user profile** menu (top-right)
3. Go to **User settings** (or **My profile**)
4. Copy the **OCID** — it starts with `ocid1.user.oc1...`

<!-- TODO: Add screenshot — /images/oracle/user-ocid.png -->

## Step 2 — Collect your Tenancy OCID

1. In the OCI Console, open the navigation menu
2. Go to **Governance & Administration** → **Tenancy details** (wording may vary slightly by console version)
3. Copy the tenancy **OCID** — it starts with `ocid1.tenancy.oc1...`

<!-- TODO: Add screenshot — /images/oracle/tenancy-ocid.png -->

## Step 3 — Create an API signing key

Cloud2Gether authenticates with an OCI **API signing key** pair.

1. Still in **User settings**, open the **API Keys** section
2. Click **Add API key**
3. Choose one of these options:
   - **Generate API key pair** (recommended if you do not already have keys), or
   - **Paste public key** / upload an existing public key
4. If you generate a new pair, **download the private key** immediately and store it securely
5. After the key is added, copy the **Fingerprint** (format like `aa:bb:cc:dd:...`)

<!-- TODO: Add screenshot — /images/oracle/api-keys.png -->

{{% alert color="danger" title="Important" %}}
The **private key (PEM)** is shown or downloaded only when you create it. Store it securely and never commit it to source control or share it in chat. You will paste the PEM content into Cloud2Gether.
{{% /alert %}}

## Step 4 — Confirm read access for discovery

Ensure the OCI user (or a group the user belongs to) has policies that allow **read/inspect** access to the resources you want Cloud2Gether to analyze.

{{% alert color="info" title="Least privilege" %}}
Prefer policies that grant inspect/read on compartments you care about, rather than broad manage permissions. If your organization uses a dedicated automation user, create the API key on that user and use its OCID in Cloud2Gether.
{{% /alert %}}

---

# Part 2 — Connect in Cloud2Gether

## Step 1 — Open the Oracle link flow

1. Sign in to Cloud2Gether
2. In the left sidebar, open **Cloud Accounts**
3. Click **Link account** → **Oracle**
4. Or open: <a href="https://auth.cloud2gether.com/auth/login/password" target="_blank" rel="noopener noreferrer">https://auth.cloud2gether.com/auth/login/password</a>

The page title is **Link new Oracle Cloud account**. The authentication method is **API Key Authentication**.

<!-- TODO: Add screenshot — /images/oracle/c2g-link-oracle.png -->

## Step 2 — Fill in the form

Complete the steps in the app:

| Step in app | Field | What to enter |
|-------------|-------|---------------|
| 1 | **Select an account name** | A friendly name in Cloud2Gether (e.g. `Oracle Production`) |
| 2 | **User OCID** | `ocid1.user.oc1...` |
| 3 | **Tenancy OCID** | `ocid1.tenancy.oc1...` |
| 4 | **API Key Fingerprint** | Fingerprint from OCI API Keys |
| 5 | **Private Key (PEM)** | Full PEM content (`-----BEGIN RSA PRIVATE KEY-----` ... `-----END RSA PRIVATE KEY-----`) |
| 6 | **Region** (optional) | Select a region if offered |

## Step 3 — Create the configuration

1. Click **Create configuration**
2. Wait while Cloud2Gether validates the credentials
3. On success, you are returned to the Cloud Accounts list — open **View Account** to manage Overview, Configuration, Credentials, and Logs

{{% alert color="warning" title="Validation failed?" %}}
If you see **We couldn't verify your Oracle credentials**, double-check the User OCID, Tenancy OCID, fingerprint, and that the private key matches the uploaded public key. Also confirm the user has policy access to the tenancy/compartments you expect.
{{% /alert %}}

## Related

- [Cloud Accounts overview](../)
- [Managing cloud accounts](../managing-accounts/)
- [Getting Started — Cloud Accounts](../../getting-started/cloud-accounts/)
- [AWS](../aws/) · [Azure](../azure/) · [GCP](../gcp/) · [Alibaba](../alibaba/)
