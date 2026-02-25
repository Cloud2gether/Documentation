---
title: "Access Key + Role Name"
linkTitle: "Access Key + Role Name"
weight: 3
description: "Connect your AWS account using IAM access keys combined with role assumption."
---

This guide walks you through connecting your AWS account to Cloud2Gether using an **Access Key combined with a Role Name**. This hybrid method is useful when you have a central IAM user that needs to **assume roles across multiple AWS accounts**, providing both credential-based authentication and role-based access control.

## When to Use This Method

This method is ideal when:

- You manage **multiple AWS accounts** from a central management account
- Your organization uses a **hub-and-spoke** IAM model where a central user assumes roles in target accounts
- You need **programmatic access** combined with **role-based permissions**

```
┌──────────────────────┐     AssumeRole      ┌──────────────────────┐
│  Management Account  │ ──────────────────►  │  Target Account A    │
│                      │                      │  Role: C2GReadOnly   │
│  IAM User:           │     AssumeRole      ├──────────────────────┤
│  cloud2gether-user   │ ──────────────────►  │  Target Account B    │
│  (Access Key)        │                      │  Role: C2GReadOnly   │
└──────────────────────┘                      └──────────────────────┘
```

---

## Part 1: Create the IAM Role in the Target AWS Account

First, create an IAM role in the AWS account you want Cloud2Gether to analyze.

### Step 1: Open the IAM Console

1. Sign in to the <a href="https://console.aws.amazon.com/" target="_blank" rel="noopener noreferrer">AWS Management Console</a> for the **target account**
2. Navigate to **IAM** → **Roles**
3. Click **Create role**

### Step 2: Select Trusted Entity

1. Select **AWS account** as the trusted entity type
2. Select **Another AWS account**
3. Enter the **Account ID** of the AWS account where your IAM user resides (the management account)

<!-- TODO: Add screenshot of trusted entity config — /images/aws/iam-role-trust-entity-same.png -->

### Step 3: Attach Permissions

1. Search for `ReadOnlyAccess`
2. Check the box next to the **ReadOnlyAccess** managed policy
3. Click **Next**

### Step 4: Name and Create the Role

1. Enter a role name, for example: `Cloud2GetherReadOnlyRole`
2. Click **Create role**
3. Click on the newly created role and copy the **Role ARN**

---

## Part 2: Create the IAM User in the Management Account

Now, create an IAM user that has permission to assume the role you just created.

### Step 1: Create a New IAM User

1. Sign in to the <a href="https://console.aws.amazon.com/" target="_blank" rel="noopener noreferrer">AWS Management Console</a> for the **management account**
2. Navigate to **IAM** → **Users** → **Create user**
3. Enter a user name, for example: `cloud2gether-assume-role`
4. Click **Next**

### Step 2: Create an AssumeRole Policy

Instead of attaching `ReadOnlyAccess` directly, this user only needs permission to assume the target role.

1. Select **Attach policies directly**
2. Click **Create policy** (opens a new tab)
3. Switch to the **JSON** tab and paste the following policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "sts:AssumeRole",
      "Resource": [
        "arn:aws:iam::<TARGET_ACCOUNT_ID>:role/Cloud2GetherReadOnlyRole"
      ]
    }
  ]
}
```

Replace `<TARGET_ACCOUNT_ID>` with the AWS Account ID of the target account where the role was created.

{{< alert color="info" title="Multiple Accounts" >}}
To assume roles in multiple target accounts, add each role ARN to the `Resource` array:
```json
"Resource": [
  "arn:aws:iam::111111111111:role/Cloud2GetherReadOnlyRole",
  "arn:aws:iam::222222222222:role/Cloud2GetherReadOnlyRole"
]
```
{{< /alert >}}

4. Click **Next**
5. Name the policy, for example: `Cloud2GetherAssumeRolePolicy`
6. Click **Create policy**

### Step 3: Attach the Policy to the User

1. Go back to the user creation tab
2. Click the refresh button next to the policy list
3. Search for `Cloud2GetherAssumeRolePolicy`
4. Check the box next to it
5. Click **Next** → **Create user**

### Step 4: Generate Access Keys

1. Click on the newly created user
2. Go to the **Security credentials** tab
3. Click **Create access key**
4. Select **Third-party service** as the use case
5. Click **Next** → **Create access key**
6. Copy the **Access Key ID** and **Secret Access Key**

{{< alert color="danger" title="Important" >}}
This is the **only time** you can view or copy the Secret Access Key. Store these credentials securely.
{{< /alert >}}

---

## Part 3: Update the Role Trust Policy

Ensure the role in the target account trusts the IAM user you created.

1. In the **target account**, go to **IAM** → **Roles**
2. Click on **Cloud2GetherReadOnlyRole**
3. Go to the **Trust relationships** tab
4. Click **Edit trust policy**
5. Verify the trust policy allows the management account:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::<MANAGEMENT_ACCOUNT_ID>:root"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

Replace `<MANAGEMENT_ACCOUNT_ID>` with the Account ID where the IAM user resides.

{{< alert color="info" title="Restricting Trust" >}}
For tighter security, you can restrict the trust to the specific IAM user instead of the entire account:
```json
"Principal": {
  "AWS": "arn:aws:iam::<MANAGEMENT_ACCOUNT_ID>:user/cloud2gether-assume-role"
}
```
{{< /alert >}}

---

## Part 4: Connect in Cloud2Gether

### Step 1: Navigate to Cloud Accounts

1. Log in to <a href="https://app.cloud2gether.com" target="_blank" rel="noopener noreferrer">Cloud2Gether</a>
2. In the left sidebar, click **Cloud Accounts**
3. Click the **Add Account** button
4. Select **AWS** as the cloud provider

### Step 2: Enter Account Details

1. **Account name**: Enter a descriptive name for this account (e.g., `AWS Production - Assumed Role`)
2. Select the **Access Key + Role Name** connection method

<!-- TODO: Add screenshot of Cloud2Gether Access Key + Role form — /images/aws/c2g-access-key-role-form.png -->

### Step 3: Enter Your Credentials

1. Paste your **Access Key ID**
2. Paste your **Secret Access Key**
3. Enter the **Role Name** or **Role ARN** of the role in the target account (e.g., `Cloud2GetherReadOnlyRole` or the full ARN)

### Step 4: Add the Account

1. Click **Add Account**
2. Cloud2Gether will use the access keys to assume the specified role and begin discovering resources

{{< alert color="success" title="Done!" >}}
Your AWS account is now connected using Access Key + Role Name. Cloud2Gether will assume the specified role to scan your resources, and they will appear in your dashboard within a few minutes.
{{< /alert >}}

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **Access denied when assuming role** | Verify the IAM user has the `sts:AssumeRole` permission and the role's trust policy allows the user/account. |
| **Invalid credentials** | Ensure the Access Key ID and Secret Access Key are correct. |
| **Role not found** | Verify the role name/ARN is correct and the role exists in the target account. |
| **Resources not appearing** | Allow a few minutes for the initial resource discovery to complete. |

## Next Steps

- Explore your resources in the [Resource Catalog](/solutions/resource-catalog/)
- Set up additional cloud accounts for a multi-cloud view
