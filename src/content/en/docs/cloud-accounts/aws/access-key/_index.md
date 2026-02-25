---
title: "Access Key & Secret Key"
linkTitle: "Access Key & Secret Key"
weight: 1
description: "Connect your AWS account using IAM user access keys."
---

This guide walks you through connecting your AWS account to Cloud2Gether using an **IAM Access Key and Secret Key**. This is the simplest connection method, ideal for quick setups and development environments.

{{< alert color="warning" title="Security Note" >}}
Access keys are long-lived credentials. For production environments, consider using [Role Delegation](../role-delegation/) instead, which uses temporary credentials and is more secure.
{{< /alert >}}

## Part 1: Create an IAM User in AWS

### Step 1: Open the IAM Console

1. Sign in to the <a href="https://console.aws.amazon.com/" target="_blank" rel="noopener noreferrer">AWS Management Console</a>
2. Navigate to **IAM** (Identity and Access Management) by searching for "IAM" in the top search bar
3. In the left sidebar, click **Users**

<!-- TODO: Add screenshot of IAM Users page — /images/aws/iam-users-page.png -->

### Step 2: Create a New User

1. Click the **Create user** button
2. Enter a user name, for example: `cloud2gether-readonly`
3. Click **Next**

<!-- TODO: Add screenshot of Create User form — /images/aws/iam-create-user.png -->

### Step 3: Attach Permissions

1. Select **Attach policies directly**
2. In the search box, type `ReadOnlyAccess`
3. Check the box next to the **ReadOnlyAccess** managed policy
4. Click **Next**

<!-- TODO: Add screenshot of permissions page — /images/aws/iam-create-user-permissions.png -->

{{< alert color="info" title="About ReadOnlyAccess" >}}
The `ReadOnlyAccess` policy grants read-only access to all AWS services. This allows Cloud2Gether to discover and analyze all your cloud resources without being able to modify anything.
{{< /alert >}}

### Step 4: Review and Create

1. Review the user configuration
2. Click **Create user**

### Step 5: Generate Access Keys

1. Click on the newly created user name to open its details
2. Go to the **Security credentials** tab
3. Scroll down to the **Access keys** section
4. Click **Create access key**

<!-- TODO: Add screenshot of Security Credentials tab — /images/aws/iam-security-credentials.png -->

### Step 6: Configure Access Key

1. Select **Third-party service** as the use case
2. Check the confirmation box acknowledging the recommendation
3. Click **Next**
4. Optionally add a description tag (e.g., `Cloud2Gether integration`)
5. Click **Create access key**

<!-- TODO: Add screenshot of access key use case selection — /images/aws/iam-create-access-key.png -->

### Step 7: Copy Your Credentials

You will see your **Access Key ID** and **Secret Access Key**. Copy both values and store them securely.

{{< alert color="danger" title="Important" >}}
This is the **only time** you can view or copy the Secret Access Key. If you lose it, you will need to create a new access key. Store these credentials securely and never share them publicly.
{{< /alert >}}

<!-- TODO: Add screenshot of access key created page — /images/aws/iam-access-key-created.png -->

---

## Part 2: Connect in Cloud2Gether

### Step 1: Navigate to Cloud Accounts

1. Log in to <a href="https://app.cloud2gether.com" target="_blank" rel="noopener noreferrer">Cloud2Gether</a>
2. In the left sidebar, click **Cloud Accounts**
3. Click the **Add Account** button
4. Select **AWS** as the cloud provider

### Step 2: Enter Account Details

1. **Account name**: Enter a descriptive name for this account (e.g., `My AWS Production`)
2. Select the **Access Key & Secret Key** connection method

<!-- TODO: Add screenshot of Cloud2Gether Access Key form — /images/aws/c2g-access-key-form.png -->

### Step 3: Enter Your Credentials

1. Paste your **Access Key ID** in the corresponding field
2. Paste your **Secret Access Key** in the corresponding field

### Step 4: Add the Account

1. Click **Add Account**
2. Cloud2Gether will validate your credentials and begin discovering your AWS resources

{{< alert color="success" title="Done!" >}}
Your AWS account is now connected. Cloud2Gether will start scanning your resources and they will appear in your dashboard within a few minutes.
{{< /alert >}}

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **Invalid credentials** | Verify you copied the Access Key ID and Secret Access Key correctly. Generate a new key if needed. |
| **Access denied errors** | Ensure the `ReadOnlyAccess` policy is attached to the IAM user. |
| **Resources not appearing** | Allow a few minutes for the initial resource discovery to complete. |

## Next Steps

- Explore your resources in the [Resource Catalog](/solutions/resource-catalog/)
- Set up additional cloud accounts for a multi-cloud view
