---
title: "Register"
linkTitle: "Register"
weight: 4
description: "Finish creating your Cloud2Gether organization after signing up."
---

**Register** completes organization setup in the Organization App after you create an account. The page collects your company profile so Cloud2Gether can finish provisioning your organization.

Route: `/register`  
Outside the main authenticated layout (logo + company profile form).

## Prerequisites

- A Cloud2Gether identity created via signup/login (<a href="https://app.cloud2gether.com/signup" target="_blank" rel="noopener noreferrer">sign up</a> / auth portal as used by your environment)
- Access to the register flow when the app redirects you to finish organization setup

## How to access

1. Sign up or sign in through the Cloud2Gether authentication experience
2. When prompted to finish account creation, you are taken to the register page  
   Or open: <a href="https://app.cloud2gether.com/register" target="_blank" rel="noopener noreferrer">https://app.cloud2gether.com/register</a> (when available for your session)

<!-- TODO: Add screenshot — /images/account/register.png -->

## What you see

Header copy:

- **Company profile**
- *Enter your organization information to finish your account creation*

### Fields

Complete the organization form:

| Field | Purpose |
|-------|---------|
| **Company name** | Organization display name |
| **Industry sector** | Sector classification |
| **Company size** | Organization size |
| **Timezone** | Organization timezone |
| **Company languages** | Languages used by the organization (chip list) |

### Actions

- **Back** — return to the previous step/page
- **Next** — submit and continue setup

While saving, the app may show: *We're setting up your account. This may take a few moments.*

## After registration

When setup completes, continue to the [Dashboard](../dashboard/) and:

1. [Link a cloud account](../cloud-accounts/)
2. Explore [Marketplace](../marketplace/) or Analysis tools
3. Invite teammates under [Company → Users](../../company/users/)

{{< alert color="info" title="Company Profile later" >}}
Owners can update organization details anytime under **Company → Profile**. See [Company Profile](../../company/profile/).
{{< /alert >}}

## Related

- [Dashboard](../dashboard/)
- [Company Profile](../../company/profile/)
- [User profile](../../account/profile/)
- [Getting Started](../)
