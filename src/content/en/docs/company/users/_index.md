---
title: "Users"
linkTitle: "Users"
weight: 2
description: "Invite users and manage roles and status in your organization."
---

**Users** (page title: **Users list**) lets you manage people in your organization — invite new users, search the list, and take role-based actions such as resending invites or removing users.

Subtitle in the app: *Manage users and their roles in your organization.*

## Prerequisites

- Access to **Company → Users**
- Invite and remove actions depend on your role (Admin/Owner capabilities in the app)

## How to access

1. Sign in to Cloud2Gether
2. In the left sidebar, expand **Company** → **Users**
3. Or open: <a href="https://auth.cloud2gether.com/auth/login/password" target="_blank" rel="noopener noreferrer">https://auth.cloud2gether.com/auth/login/password</a>
4. From the Dashboard, open **Company users** → view all

<!-- TODO: Add screenshot — /images/company/users-list.png -->

## What you see

### Invite

Eligible roles see an invite control in the page actions area to invite a user to the organization.

### Search

- Field: **Search name or email**
- Click **Search** to filter the list

### Users table

| Column | Description |
|--------|-------------|
| **Name** | User display with email |
| **Last access** | Last time the user accessed the platform |
| **Created at** | When the user/invite was created |
| **Role** | Organization role (or *Undefined*) |
| **Status** | Current status (for example Active, Invited) |
| **Options** | Role-aware actions menu |

Use **Load more** when additional pages of users are available.

If nothing matches your search: *No users found*.

## Common actions (Options menu)

Depending on your role and the target user, **Options** may include:

- **Resend invite** — for invited users who have not joined yet
- **Remove user** — remove a user from the organization (with confirmation)

{{% alert color="warning" title="Owner role" %}}
Some actions (including changing Company Profile) require the **Owner** role. Use this Users list to review who has which role.
{{% /alert %}}

## Related

- [Company Profile](../profile/)
- [Teams](../teams/)
- [Company](../)
