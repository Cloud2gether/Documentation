---
title: "Role Delegation"
linkTitle: "Role Delegation"
weight: 2
description: "Connect your AWS account using cross-account IAM role delegation."
---

This guide walks you through connecting your AWS account to Cloud2Gether using **IAM Role Delegation**. This is the **recommended** method for production environments because it uses temporary credentials and does not require storing long-lived access keys.

{{< alert color="success" title="Recommended Method" >}}
Role Delegation follows AWS security best practices. Cloud2Gether assumes a role in your account using temporary credentials that are automatically rotated, eliminating the risk of leaked long-lived keys.
{{< /alert >}}

## How It Works

With Role Delegation, you create an IAM role in your AWS account that **trusts Cloud2Gether's AWS account**. When Cloud2Gether needs to access your resources, it assumes this role using the AWS Security Token Service (STS), receiving temporary credentials that expire automatically.

```
┌─────────────────────┐         STS AssumeRole         ┌─────────────────────┐
│   Cloud2Gether      │ ──────────────────────────────► │   Your AWS Account  │
│   AWS Account       │                                 │                     │
│                     │ ◄────────────────────────────── │   IAM Role with     │
│                     │     Temporary Credentials       │   ReadOnlyAccess    │
└─────────────────────┘                                 └─────────────────────┘
```

---

## Part 1: Create an IAM Role in AWS

You can set up the IAM role either **automatically using CloudFormation** or **manually** through the IAM console.

{{< tabpane text=true >}}

{{% tab header="Automatically (CloudFormation)" %}}

### Automatic Setup via CloudFormation

The easiest way to create the required IAM role is using Cloud2Gether's CloudFormation template, which automatically provisions everything you need.

#### Step 1: Start in Cloud2Gether

1. Log in to <a href="https://app.cloud2gether.com" target="_blank" rel="noopener noreferrer">Cloud2Gether</a>
2. Navigate to **Cloud Accounts** → **Add Account** → **AWS**
3. Enter an **account name**
4. Select the **AWS region** where the CloudFormation stack will be created
5. Choose **Automatically using CloudFormation**

<!-- TODO: Add screenshot of Cloud2Gether CloudFormation option — /images/aws/c2g-role-delegation-cloudformation.png -->

#### Step 2: Launch the CloudFormation Stack

1. Click the **Launch** button — you will be redirected to the AWS Console
2. The CloudFormation template will be pre-loaded with the required parameters
3. Review the template details
4. Check the acknowledgement box at the bottom (for IAM resource creation)
5. Click **Create Stack**

<!-- TODO: Add screenshot of AWS CloudFormation Create Stack page — /images/aws/cf-create-stack.png -->

#### Step 3: Wait for Stack Creation

1. Wait for the stack status to change to **CREATE_COMPLETE** (usually takes 1-2 minutes)
2. Go to the **Outputs** tab to find the **Role ARN**

<!-- TODO: Add screenshot of CloudFormation Outputs — /images/aws/cf-stack-outputs.png -->

#### Step 4: Complete in Cloud2Gether

1. Back in Cloud2Gether, check the confirmation box: *"I confirm that the Cloud2Gether IAM Role has been added to the AWS Account"*
2. Enter your **AWS Account ID**
3. Enter the **Role ARN** from the CloudFormation Outputs tab
4. Click **Add Account**

{{% /tab %}}

{{% tab header="Manually (IAM Console)" %}}

### Manual Setup via IAM Console

If you prefer full control or your organization restricts CloudFormation usage, you can create the IAM role manually.

#### Step 1: Open the IAM Console

1. Sign in to the <a href="https://console.aws.amazon.com/" target="_blank" rel="noopener noreferrer">AWS Management Console</a>
2. Navigate to **IAM** → **Roles**
3. Click **Create role**

<!-- TODO: Add screenshot of IAM Roles page — /images/aws/iam-roles-page.png -->

#### Step 2: Select Trusted Entity

1. Select **AWS account** as the trusted entity type
2. Select **Another AWS account**
3. Enter Cloud2Gether's Account ID: `<CLOUD2GETHER_ACCOUNT_ID>`
4. (Optional) Check **Require external ID** and enter the External ID shown in the Cloud2Gether platform

<!-- TODO: Add screenshot of trusted entity config — /images/aws/iam-role-trust-policy.png -->

{{< alert color="info" title="External ID" >}}
The External ID provides an additional layer of security against the <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/confused-deputy.html" target="_blank" rel="noopener noreferrer">confused deputy problem</a>. You can find the External ID in the Cloud2Gether platform when adding a new AWS account.
{{< /alert >}}

#### Step 3: Attach Permissions

1. In the search box, type `ReadOnlyAccess`
2. Check the box next to the **ReadOnlyAccess** managed policy
3. Click **Next**

<!-- TODO: Add screenshot of role permissions — /images/aws/iam-role-permissions.png -->

#### Step 4: Name and Create the Role

1. Enter a role name, for example: `Cloud2GetherReadOnlyRole`
2. Optionally add a description: `Read-only access role for Cloud2Gether platform`
3. Review the trusted entities and permissions
4. Click **Create role**

<!-- TODO: Add screenshot of role review — /images/aws/iam-create-role.png -->

#### Step 5: Copy the Role ARN

1. Click on the newly created role name to open its details
2. Copy the **Role ARN** (it looks like `arn:aws:iam::123456789012:role/Cloud2GetherReadOnlyRole`)

<!-- TODO: Add screenshot of role ARN — /images/aws/iam-role-arn.png -->

{{% /tab %}}

{{< /tabpane >}}

---

## Part 2: Connect in Cloud2Gether

### Step 1: Navigate to Cloud Accounts

1. Log in to <a href="https://app.cloud2gether.com" target="_blank" rel="noopener noreferrer">Cloud2Gether</a>
2. In the left sidebar, click **Cloud Accounts**
3. Click the **Add Account** button
4. Select **AWS** as the cloud provider

### Step 2: Enter Account Details

1. **Account name**: Enter a descriptive name for this account (e.g., `AWS Production`)
2. Select the **AWS region**
3. Choose **Role Delegation** as the connection method

<!-- TODO: Add screenshot of Cloud2Gether Role Delegation form — /images/aws/c2g-role-delegation-form.png -->

### Step 3: Enter Role Delegation Info

1. Check the confirmation box: *"I confirm that the Cloud2Gether IAM Role has been added to the AWS Account"*
2. Enter your **AWS Account ID** (12-digit number found in the top-right corner of the AWS Console)
3. Enter the **AWS Role ARN** you copied earlier

{{< alert color="info" title="Where to find your Account ID" >}}
Your AWS Account ID is a 12-digit number. You can find it by clicking your account name in the top-right corner of the AWS Management Console, or by running `aws sts get-caller-identity` in the AWS CLI.
{{< /alert >}}

### Step 4: Add the Account

1. Click **Add Account**
2. Cloud2Gether will validate the role assumption and begin discovering your AWS resources

{{< alert color="success" title="Done!" >}}
Your AWS account is now connected via Role Delegation. Cloud2Gether will start scanning your resources and they will appear in your dashboard within a few minutes.
{{< /alert >}}

---

## Trust Policy Reference

For reference, this is the trust policy that should be attached to your IAM role. If you used CloudFormation, this was configured automatically.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::<CLOUD2GETHER_ACCOUNT_ID>:root"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "<YOUR_EXTERNAL_ID>"
        }
      }
    }
  ]
}
```

Replace `<CLOUD2GETHER_ACCOUNT_ID>` with Cloud2Gether's AWS Account ID and `<YOUR_EXTERNAL_ID>` with the External ID provided in the Cloud2Gether platform.

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **Access denied when assuming role** | Verify the trust policy contains the correct Cloud2Gether Account ID and External ID. |
| **Role not found** | Ensure the Role ARN is correct and the role exists in the specified account. |
| **CloudFormation stack failed** | Check the **Events** tab in CloudFormation for error details. Common issues include insufficient permissions to create IAM roles. |
| **Resources not appearing** | Allow a few minutes for the initial resource discovery to complete. |

## Next Steps

- Explore your resources in the [Resource Catalog](/solutions/resource-catalog/)
- Set up additional cloud accounts for a multi-cloud view
