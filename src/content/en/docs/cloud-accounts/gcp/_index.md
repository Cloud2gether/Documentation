---
title: "GCP"
linkTitle: "GCP"
weight: 3
description: "Connect and manage your Google Cloud Platform project."
---

Connecting your Google Cloud project to Cloud2Gether allows the platform to discover and analyze your cloud resources, costs, and infrastructure. Cloud2Gether requires **read-only** access to your GCP project — it will never create, modify, or delete any resources.

The integration uses a **Service Account Key (JSON)** to authenticate. You create a service account in your GCP project, assign it read-only roles, generate a JSON key file, and upload it to Cloud2Gether.

## Prerequisites

Before you begin, make sure you have:

- An active **Google Cloud project** with billing enabled
- Access to the <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer">Google Cloud Console</a> with permissions to:
  - Create **service accounts** (requires `iam.serviceAccounts.create` permission)
  - Manage **IAM roles** on the project (requires `resourcemanager.projects.setIamPolicy` permission)
- A **Cloud2Gether account** — <a href="https://app.cloud2gether.com/signup" target="_blank" rel="noopener noreferrer">sign up here</a> if you don't have one

## Information You Will Need

At the end of this setup, you will have:

| Item | Description |
|------|-------------|
| **Service Account JSON Key** | A downloaded `.json` key file used to authenticate |
| **Organization ID** (optional) | Your Google Cloud Organization ID, if you want org-level visibility |

---

# Part 1 — GCP Configuration

## Step 1 — Create a Service Account

A service account is a special Google account that represents your application (Cloud2Gether) rather than a person.

1. Sign in to the <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer">Google Cloud Console</a>
2. Select the **project** you want to connect to Cloud2Gether from the project selector at the top
3. Navigate to **IAM & Admin** → **Service Accounts** (or search for "Service Accounts" in the top search bar)
4. Click **+ Create Service Account**

<!-- TODO: Add screenshot — /images/gcp/gcp-service-accounts-page.png -->

5. Fill in the service account details:
   - **Service account name**: Enter a descriptive name, for example: `cloud2gether-readonly`
   - **Service account ID**: This is auto-generated from the name (e.g., `cloud2gether-readonly@your-project.iam.gserviceaccount.com`)
   - **Description** (optional): `Read-only service account for Cloud2Gether integration`
6. Click **Create and Continue**

<!-- TODO: Add screenshot — /images/gcp/gcp-create-service-account.png -->

---

## Step 2 — Grant IAM Roles

After creating the service account, you need to assign roles that grant read-only access to your project resources.

1. In the **Grant this service account access to project** step, click **+ Add Another Role** to add the following roles:

| Role | Purpose |
|------|---------|
| **Viewer** (`roles/viewer`) | Read-only access to all project resources |
| **Monitoring Viewer** (`roles/monitoring.viewer`) | Access to monitoring metrics and dashboards |

2. In the **Select a role** dropdown, search for `Viewer` and select **Viewer**
3. Click **+ Add Another Role**
4. Search for `Monitoring Viewer` and select **Monitoring Viewer**
5. Click **Continue**

<!-- TODO: Add screenshot — /images/gcp/gcp-service-account-roles.png -->

{{< alert color="info" title="About the Viewer Role" >}}
The **Viewer** role grants read-only access to all resources in the project. This allows Cloud2Gether to discover and analyze your infrastructure without being able to modify anything. For a more granular approach, see the [Custom Role](#custom-role-optional) section below.
{{< /alert >}}

6. The **Grant users access to this service account** step is optional — you can skip it
7. Click **Done**

---

## Step 3 — Generate a JSON Key File

Cloud2Gether authenticates using a service account key file in JSON format.

1. In the **Service Accounts** list, click on the service account you just created (`cloud2gether-readonly`)
2. Go to the **Keys** tab
3. Click **Add Key** → **Create new key**

<!-- TODO: Add screenshot — /images/gcp/gcp-service-account-keys.png -->

4. Select **JSON** as the key type
5. Click **Create**

<!-- TODO: Add screenshot — /images/gcp/gcp-create-key-json.png -->

The JSON key file will be **automatically downloaded** to your computer.

{{< alert color="danger" title="Important" >}}
Store this JSON key file securely. It contains credentials that provide access to your GCP project. If you lose this file, you can generate a new key, but the old key cannot be recovered. Never commit this file to source control or share it publicly.
{{< /alert >}}

The JSON key file will look similar to this:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "cloud2gether-readonly@your-project-id.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  ...
}
```

---

## Step 4 — Enable Required APIs (if not already enabled)

Cloud2Gether needs certain Google Cloud APIs to be enabled in your project to discover resources. Most projects have these enabled by default, but verify the following are active:

1. Navigate to **APIs & Services** → **Enabled APIs & services**
2. Ensure the following APIs are enabled (click **+ Enable APIs and Services** to enable any that are missing):

| API | Purpose |
|-----|---------|
| **Cloud Resource Manager API** | Discover project and organization structure |
| **Compute Engine API** | Inventory compute resources |
| **Cloud Monitoring API** | Access monitoring data |
| **Cloud Asset API** | Inventory all cloud assets |
| **Cloud Billing API** | Access billing and cost data |

<!-- TODO: Add screenshot — /images/gcp/gcp-enabled-apis.png -->

{{< alert color="info" title="Enabling APIs via gcloud CLI" >}}
You can also enable APIs using the `gcloud` CLI:
```bash
gcloud services enable cloudresourcemanager.googleapis.com \
  compute.googleapis.com \
  monitoring.googleapis.com \
  cloudasset.googleapis.com \
  cloudbilling.googleapis.com \
  --project=YOUR_PROJECT_ID
```
{{< /alert >}}

---

# Part 2 — Cloud2Gether Setup

## Step 5 — Connect in Cloud2Gether

1. Log in to <a href="https://app.cloud2gether.com" target="_blank" rel="noopener noreferrer">Cloud2Gether</a>
2. In the left sidebar, click **Cloud Accounts**
3. Click the **Add Account** button
4. Select **GCP** (Google Cloud Platform) as the cloud provider

You will see the connection form:

![Cloud2Gether GCP Connection Form](/images/gcp/add_cloud_account_google.png)

---

## Step 6 — Enter Account Information

### 1. Account Name

Enter a logical name to identify this GCP project inside Cloud2Gether.

Examples:
- `GCP Production`
- `GCP Dev/Staging`
- `Data Analytics Project`

### 2. Upload Service Account JSON

Upload the JSON key file you downloaded in Step 3:

- Click the **Upload File** button, or **drag and drop** the `.json` file into the upload area
- Cloud2Gether will read the project ID and credentials from the file automatically

{{< alert color="warning" title="File Validation" >}}
Ensure you upload the correct `.json` key file. Cloud2Gether validates the file format and will display an error if the file is invalid or incomplete.
{{< /alert >}}

### 3. Organization ID (Optional)

If your GCP project belongs to a Google Cloud Organization and you want Cloud2Gether to have visibility into the organization structure:

1. Enter your **Organization ID** (a numeric ID)

{{< alert color="info" title="Finding Your Organization ID" >}}
You can find your Organization ID in the <a href="https://console.cloud.google.com/cloud-resource-manager" target="_blank" rel="noopener noreferrer">Resource Manager</a> page, or by running:
```bash
gcloud organizations list
```
The Organization ID is the numeric value in the `ID` column.
{{< /alert >}}

### 4. Add Role Override (Optional)

If you need to override the default role behavior for specific use cases, you can add a custom role or action in this field. For most setups, this can be left empty.

---

## Step 7 — Add the Account

1. Click **Add Account**
2. Cloud2Gether will validate:
   - Service account key authenticity
   - IAM permissions on the project
   - API availability

If successful, the account will appear in your Cloud Accounts list.

{{< alert color="success" title="Done!" >}}
Your GCP project is now connected. Cloud2Gether will start scanning your resources and they will appear in your dashboard within a few minutes.
{{< /alert >}}

---

# Custom Role (Optional)

If your organization requires a more restrictive setup than the **Viewer** role, you can create a custom IAM role with only the permissions Cloud2Gether needs.

## Create a Custom Role

1. Navigate to **IAM & Admin** → **Roles**
2. Click **+ Create Role**
3. Enter a name, for example: `Cloud2Gether Read Only`
4. Add the following permissions at minimum:

```
compute.instances.list
compute.instances.get
compute.disks.list
compute.networks.list
compute.subnetworks.list
compute.firewalls.list
compute.regions.list
compute.zones.list
storage.buckets.list
resourcemanager.projects.get
monitoring.metricDescriptors.list
monitoring.timeSeries.list
cloudasset.assets.listResource
billing.accounts.list
billing.budgets.list
```

5. Click **Create**
6. Assign this custom role to your service account instead of the Viewer role

---

# Managing Multiple Projects

To connect multiple GCP projects to Cloud2Gether, you have two options:

### Option A — One Service Account Per Project

Create a separate service account in each project and upload each JSON key individually. This is the simplest approach and keeps permissions isolated.

### Option B — Cross-Project Service Account

Use a single service account from one project and grant it access to other projects:

1. Create the service account in your central/management project
2. In each target project, go to **IAM & Admin** → **IAM**
3. Click **+ Grant Access**
4. Enter the service account email (e.g., `cloud2gether-readonly@central-project.iam.gserviceaccount.com`)
5. Assign the **Viewer** and **Monitoring Viewer** roles
6. Click **Save**

Then add each project as a separate cloud account in Cloud2Gether using the same JSON key.

---

# Troubleshooting

## Invalid Service Account Key

- Verify you uploaded the correct `.json` file (not a `.p12` or other format)
- Ensure the JSON file has not been modified or corrupted
- Generate a new key if the current one is compromised or lost

## Permission Denied Errors

- Verify the service account has the **Viewer** and **Monitoring Viewer** roles on the project
- Check that the roles are assigned at the **project level**, not just on individual resources
- Ensure the service account belongs to (or has access to) the correct project

## API Not Enabled

- Navigate to **APIs & Services** → **Enabled APIs & services** and verify the required APIs are enabled
- Some APIs take a few minutes to become active after enabling

## Resources Not Appearing

- Allow a few minutes for the initial resource discovery to complete
- Verify the project has active resources (empty projects will show no results)
- Check that the Compute Engine API and Cloud Asset API are enabled

## Organization-Level Issues

- If you entered an Organization ID but see errors, ensure the service account has the **Organization Viewer** role (`roles/resourcemanager.organizationViewer`) at the organization level

---

# Security Best Practices

- Use the **minimum required roles** (Viewer + Monitoring Viewer) or a custom role
- **Rotate service account keys** periodically — Google recommends rotating keys every 90 days
- **Delete unused keys** — service accounts can have at most 10 keys; remove old ones
- Avoid using **default service accounts** (e.g., Compute Engine default service account) for integrations
- Store the JSON key file securely and never commit it to source control
- Consider using <a href="https://cloud.google.com/iam/docs/workload-identity-federation" target="_blank" rel="noopener noreferrer">Workload Identity Federation</a> as a keyless alternative for enhanced security
- Monitor service account activity in **Cloud Audit Logs**

---

# Next Steps

After successful integration, you can:

- Explore your resources in the [Resource Catalog](/solutions/resource-catalog/)
- Analyze infrastructure costs
- Run lock-in analysis across your multi-cloud environment
- Set up additional cloud accounts ([AWS](../aws/), [Azure](../azure/)) for a unified view
