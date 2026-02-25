---
title: "AWS"
linkTitle: "AWS"
weight: 1
description: "Connect and manage your Amazon Web Services account."
---

Connecting your AWS account to Cloud2Gether allows the platform to discover and analyze your cloud resources, costs, and infrastructure. Cloud2Gether requires **read-only** access to your AWS account — it will never create, modify, or delete any resources.

## Prerequisites

Before you begin, make sure you have:

- An active **AWS account** with access to the <a href="https://console.aws.amazon.com/iam/" target="_blank" rel="noopener noreferrer">IAM Console</a>
- Permissions to **create IAM users and/or roles** in your AWS account
- A **Cloud2Gether account** — <a href="https://app.cloud2gether.com/signup" target="_blank" rel="noopener noreferrer">sign up here</a> if you don't have one

## Connection Methods

Cloud2Gether supports three methods to connect your AWS account. Choose the one that best fits your security requirements and organizational setup.

| Method | Security | Complexity | Best For |
|--------|----------|------------|----------|
| [Access Key & Secret Key](access-key/) | Medium | Low | Quick setup, development and testing environments |
| [Role Delegation](role-delegation/) | **High** | Medium | **Production environments, multi-account setups (Recommended)** |
| [Access Key + Role Name](access-key-with-role/) | High | Medium | Central account assuming roles across multiple accounts |

{{< alert color="info" title="Recommendation" >}}
For production environments, we strongly recommend using **Role Delegation**. It avoids storing long-lived credentials and follows AWS security best practices by using temporary credentials through IAM role assumption.
{{< /alert >}}

## Required AWS Permissions

Regardless of the connection method you choose, Cloud2Gether needs **read-only access** to your AWS services in order to inventory resources, analyze costs, and provide recommendations.

The simplest approach is to use the AWS managed policy **`ReadOnlyAccess`** (ARN: `arn:aws:iam::aws:policy/ReadOnlyAccess`). This policy grants read-only access to all AWS services.

{{< alert color="warning" title="Custom Policies" >}}
If your organization requires a more restrictive policy, you can create a custom IAM policy that grants read-only access only to the specific services you want Cloud2Gether to analyze. Contact our support team for guidance on minimum required permissions.
{{< /alert >}}

## Next Steps

Choose your preferred connection method and follow the step-by-step guide:

- [Access Key & Secret Key](access-key/) — Use IAM user credentials directly
- [Role Delegation](role-delegation/) — Create a cross-account IAM role (recommended)
- [Access Key + Role Name](access-key-with-role/) — Use IAM user credentials to assume a role
