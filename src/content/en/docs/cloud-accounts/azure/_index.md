---
title: "Azure"
linkTitle: "Azure"
weight: 2
description: "Connect and manage your Microsoft Azure subscription."
---

Connecting your Azure subscription to Cloud2Gether allows the platform to discover and analyze your cloud resources, costs, and infrastructure. Cloud2Gether requires **read-only** access to your Azure subscription — it will never create, modify, or delete any resources.

The integration uses **Microsoft Entra ID (Azure AD) App Registration** with a client secret to authenticate. A service principal is created automatically when you register the app, and you assign it read-only roles on your subscription.

## Prerequisites

Before you begin, make sure you have:

- An active **Azure subscription**
- Access to <a href="https://portal.azure.com" target="_blank" rel="noopener noreferrer">Azure Portal</a> with permissions to:
  - Register applications in **Microsoft Entra ID** (Azure AD)
  - Assign roles on the target **subscription** (requires Owner or User Access Administrator role)
- A **Cloud2Gether account** — <a href="https://app.cloud2gether.com/signup" target="_blank" rel="noopener noreferrer">sign up here</a> if you don't have one

## Information You Will Need

At the end of this setup, you will have collected four values to enter in Cloud2Gether:

| Value | Where to Find It |
|-------|-------------------|
| **Tenant ID** (Directory ID) | Microsoft Entra ID → Overview |
| **Client ID** (Application ID) | App Registration → Overview |
| **Client Secret** | App Registration → Certificates & secrets |
| **Subscription ID** | Subscriptions → Overview |

---

# Part 1 — Azure Configuration

## Step 1 — Register an Application in Microsoft Entra ID

An App Registration creates an identity that Cloud2Gether uses to authenticate with your Azure environment.

1. Sign in to the <a href="https://portal.azure.com" target="_blank" rel="noopener noreferrer">Azure Portal</a>
2. Navigate to **Microsoft Entra ID** (formerly Azure Active Directory)
3. In the left sidebar, click **App registrations**
4. Click **+ New registration**

<!-- TODO: Add screenshot — /images/azure/entra-app-registrations.png -->

5. Fill in the registration form:
   - **Name**: Enter a descriptive name, for example: `Cloud2Gether Integration`
   - **Supported account types**: Select **Accounts in this organizational directory only** (Single tenant)
   - **Redirect URI**: Leave blank (not required)
6. Click **Register**

<!-- TODO: Add screenshot — /images/azure/entra-register-app.png -->

After registration, you will be taken to the application's **Overview** page. Copy the following values:

- **Application (client) ID** — this is your **Client ID**
- **Directory (tenant) ID** — this is your **Tenant ID**

<!-- TODO: Add screenshot — /images/azure/entra-app-overview.png -->

{{< alert color="info" title="Finding Your Tenant ID" >}}
The Tenant ID (Directory ID) is also available at **Microsoft Entra ID → Overview**. It is the same value across all app registrations in your directory.
{{< /alert >}}

---

## Step 2 — Create a Client Secret

A client secret is a password that Cloud2Gether uses to authenticate as the registered application.

1. In the App Registration page, click **Certificates & secrets** in the left sidebar
2. Select the **Client secrets** tab
3. Click **+ New client secret**

<!-- TODO: Add screenshot — /images/azure/entra-certificates-secrets.png -->

4. Fill in the details:
   - **Description**: Enter a descriptive label, for example: `Cloud2Gether secret`
   - **Expires**: Choose an expiration period (recommended: **24 months**)
5. Click **Add**

{{< alert color="danger" title="Important" >}}
Copy the **Value** column immediately after creation. This is the **only time** you can view the client secret value. If you lose it, you will need to create a new one. The **Secret ID** is not the same as the secret value.
{{< /alert >}}

<!-- TODO: Add screenshot — /images/azure/entra-secret-created.png -->

Store the **Client Secret Value** securely — you will need it when connecting in Cloud2Gether.

---

## Step 3 — Assign Roles to the Application

The application's service principal needs read-only access to your Azure subscription. You must assign two roles:

| Role | Purpose |
|------|---------|
| **Reader** | Read-only access to all Azure resources in the subscription |
| **Monitoring Data Reader** | Access to monitoring metrics and diagnostic data |

### Assign the Reader Role

1. In the Azure Portal, navigate to **Subscriptions**
2. Select the subscription you want to connect to Cloud2Gether
3. Click **Access control (IAM)** in the left sidebar
4. Click **+ Add** → **Add role assignment**

<!-- TODO: Add screenshot — /images/azure/subscription-iam.png -->

5. In the **Role** tab, search for `Reader` and select the **Reader** role
6. Click **Next**
7. In the **Members** tab:
   - Select **User, group, or service principal**
   - Click **+ Select members**
   - Search for your application name (e.g., `Cloud2Gether Integration`)
   - Select the application and click **Select**
8. Click **Review + assign**

<!-- TODO: Add screenshot — /images/azure/subscription-role-assignment-reader.png -->

### Assign the Monitoring Data Reader Role

Repeat the same process for the Monitoring Data Reader role:

1. In the same subscription's **Access control (IAM)**, click **+ Add** → **Add role assignment**
2. Search for `Monitoring Data Reader` and select it
3. Click **Next**
4. In the **Members** tab, select the same application (`Cloud2Gether Integration`)
5. Click **Review + assign**

<!-- TODO: Add screenshot — /images/azure/subscription-role-assignment-monitoring.png -->

### Verify Role Assignments

1. In **Access control (IAM)**, click the **Role assignments** tab
2. Confirm that your application appears with both roles:
   - **Reader**
   - **Monitoring Data Reader**

<!-- TODO: Add screenshot — /images/azure/subscription-role-assignments-list.png -->

{{< alert color="info" title="Multiple Subscriptions" >}}
If you want Cloud2Gether to analyze multiple subscriptions, repeat Step 3 for each subscription. You can reuse the same App Registration — just assign the Reader and Monitoring Data Reader roles on each additional subscription.
{{< /alert >}}

---

## Step 4 — Copy Your Subscription ID

1. Navigate to **Subscriptions** in the Azure Portal
2. Click on the subscription you assigned the roles to
3. Copy the **Subscription ID** from the Overview page

<!-- TODO: Add screenshot — /images/azure/subscription-overview.png -->

---

# Part 2 — Cloud2Gether Setup

## Step 5 — Connect in Cloud2Gether

1. Log in to <a href="https://app.cloud2gether.com" target="_blank" rel="noopener noreferrer">Cloud2Gether</a>
2. In the left sidebar, click **Cloud Accounts**
3. Click the **Add Account** button
4. Select **Azure** as the cloud provider

<!-- TODO: Add screenshot — /images/azure/c2g-azure-add-account.png -->

## Step 6 — Enter Account Information

### 1. Account Name

Enter a logical name to identify this Azure subscription inside Cloud2Gether.

Examples:
- `Azure Production`
- `Azure Dev/Test`
- `Finance Subscription`

### 2. Azure Credentials

Enter the four values you collected during the Azure configuration:

| Field | Value |
|-------|-------|
| **Tenant ID** | The Directory (tenant) ID from Microsoft Entra ID |
| **Client ID** | The Application (client) ID from the App Registration |
| **Client Secret** | The secret value you copied in Step 2 |
| **Subscription ID** | The subscription ID from Step 4 |

<!-- TODO: Add screenshot — /images/azure/c2g-azure-credentials-form.png -->

{{< alert color="warning" title="Common Mistakes" >}}
- Ensure there are **no extra spaces** when pasting values
- Use the secret **Value**, not the **Secret ID**
- The **Client ID** is the Application ID, not the Object ID
{{< /alert >}}

## Step 7 — Add the Account

1. Click **Add Account**
2. Cloud2Gether will validate:
   - Credential authenticity
   - Role assignments and permissions
   - Subscription accessibility

If successful, the account will appear in your Cloud Accounts list.

{{< alert color="success" title="Done!" >}}
Your Azure subscription is now connected. Cloud2Gether will start scanning your resources and they will appear in your dashboard within a few minutes.
{{< /alert >}}

---

# Troubleshooting

## Invalid Credentials

- Verify the **Tenant ID**, **Client ID**, and **Client Secret** are correct
- Confirm the client secret has not expired
- Ensure no leading or trailing whitespace in the pasted values
- Make sure you copied the secret **Value** (not the Secret ID)

## Insufficient Permissions

- Verify both **Reader** and **Monitoring Data Reader** roles are assigned on the subscription
- Confirm the roles are assigned to the correct service principal (the app registration name)
- Check that the role assignments are at the **subscription level**, not a resource group

## Application Not Found

- Ensure the App Registration exists and has not been deleted
- Verify you are using the correct Tenant ID for the directory where the app was registered

## Expired Client Secret

- Client secrets have an expiration date. If your secret has expired:
  1. Go to the App Registration → **Certificates & secrets**
  2. Create a new client secret
  3. Update the secret in Cloud2Gether's Cloud Accounts settings

---

# Security Best Practices

- Use the **minimum required roles** (Reader + Monitoring Data Reader)
- Set a reasonable **secret expiration** and rotate before it expires
- Avoid granting **Contributor** or **Owner** roles — Cloud2Gether only needs read access
- Use **dedicated App Registrations** for third-party integrations instead of reusing existing ones
- Monitor sign-in activity for the service principal in **Microsoft Entra ID → Enterprise applications → Sign-in logs**
- Consider using **Conditional Access policies** to restrict where the service principal can authenticate from

---

# Next Steps

After successful integration, you can:

- Explore your resources in the [Resource Catalog](/solutions/resource-catalog/)
- Analyze infrastructure costs
- Run lock-in analysis across your multi-cloud environment
- Set up additional cloud accounts ([AWS](../aws/), [GCP](../gcp/)) for a unified view
