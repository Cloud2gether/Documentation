---
title: "Azure"
linkTitle: "Azure"
weight: 20
description: "Connect and manage your Microsoft Azure account."
tags: ["aws", "integration", "manual", "access-key"]
---

# Connect an AWS Account (Manual Setup)

## Overview

This guide explains how to manually connect an AWS account to Cloud2gether using IAM Access Key authentication.

In this method, IAM permissions must be configured directly inside the AWS Console before completing the integration in Cloud2gether.

---

## Prerequisites

Before starting, ensure you have:

- An active AWS account
- Permission to create IAM users and policies
- Access to the AWS Management Console
- Administrative or delegated IAM permissions

---

# Part 1 — AWS Configuration

## Step 1 — Create an IAM User

1. Log in to the AWS Console.
2. Navigate to **IAM**.
3. Click **Users**.
4. Click **Create user**.
5. Enter a user name (example: `cloud2gether-integration`).
6. Select:
   - ✔ Programmatic access

Click **Next**.

---

## Step 2 — Attach Required Permissions

Cloud2gether requires read-only access to resources, billing information, and infrastructure metadata.

You may:

### Option A — Attach an existing internal Cloud2gether policy (recommended if provided)

OR

### Option B — Create a custom policy with least privilege

At minimum, permissions should include read access to:

- EC2 (Describe*)
- CloudFormation (Describe*)
- CloudWatch (Describe*)
- Cost Explorer (Get*, Describe*)
- S3 (List*)
- IAM (Get*, List*)

⚠️ Always follow your organization’s security and least-privilege standards.

Complete user creation.

---

## Step 3 — Generate Access Keys

1. Open the created IAM user.
2. Go to the **Security credentials** tab.
3. Click **Create access key**.
4. Choose:
   - Application running outside AWS
5. Copy:
   - Access Key ID
   - Secret Access Key

⚠️ The Secret Access Key is shown only once. Store it securely.

---

# Part 2 — Cloud2gether Setup

Navigate to:

**Integrations → Cloud Accounts → Link new AWS cloud account**

You will see the AWS connection form.

---

## Step 4 — Fill Account Information

### 1. Account Name

Enter a logical name to identify this AWS account inside Cloud2gether.

Examples:

- Production AWS
- Finance Account
- Dev Environment

---

### 2. AWS Region

Select the AWS region.

This is the region used for primary integration reference. It does not limit global resource visibility but defines where integration validation occurs.

Example regions:

- South America (São Paulo)
- US East (N. Virginia)
- Europe (Frankfurt)

---

### 3. Required Documentation for Provider Integration

Select:

**Manually**

This indicates IAM permissions were configured directly in AWS instead of using automated CloudFormation setup.

---

### 4. Choose Authentication Method

Select:

**Access Key**

This method authenticates using IAM credentials.

---

### 5. Enter Credentials Information

Fill in:

- Access Key
- Secret Key

Ensure:

- No extra spaces
- Keys are active
- Credentials belong to the intended IAM user

---

## Step 5 — Add Account

Click **Add account**.

Cloud2gether will validate:

- Credential authenticity
- IAM permissions
- Account accessibility

If successful, the account will appear in your Cloud Accounts list.

---

# Troubleshooting

## Invalid Credentials

- Verify Access Key and Secret Key
- Confirm keys are active in IAM
- Ensure no leading or trailing whitespace

---

## Insufficient Permissions

- Review IAM policies attached to the user
- Confirm read permissions for EC2, CloudFormation, Billing, IAM, and CloudWatch

---

## Region Validation Errors

- Confirm selected region exists in your AWS account
- Ensure no SCP (Service Control Policy) restrictions apply

---

# Security Best Practices

- Use least-privilege IAM policies
- Rotate Access Keys periodically
- Avoid using root credentials
- Store credentials securely (e.g., secret manager)
- Disable unused keys immediately

---

# Next Steps

After successful integration, you can:

- View infrastructure resources
- Analyze billing data
- Run lock-in analysis
- Receive optimization recommendations
- Monitor multi-account environments

---

If you need documentation for:

- AWS Role Delegation setup
- Automatic integration using CloudFormation
- IAM policy JSON template
- Multi-account (Organizations) setup

Let me know which one you want next.