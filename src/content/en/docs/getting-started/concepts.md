---
title: "Core Concepts"
linkTitle: "Core Concepts"
weight: 3
description: >
  Understand the fundamental concepts behind Cloud2Gether's agentic DevOps platform.
---

## What is Agentic DevOps?

Traditional DevOps requires engineers to write scripts, configure tools, and manually orchestrate workflows. **Agentic DevOps** takes a different approach: AI agents that understand your intent and figure out how to achieve it.

Instead of writing:
```yaml
# Traditional: You write the how
- name: Deploy application
  hosts: production
  tasks:
    - docker_image: ...
    - docker_container: ...
```

You say:
```
Deploy my application to production with zero downtime
```

The agent handles the implementation details.

## Key Concepts

### Agents

**Agents** are AI-powered workers that manage your infrastructure. Each agent:

- Has specific capabilities (infrastructure, security, cost, etc.)
- Maintains context about your environment
- Can execute actions on your behalf
- Learns from your infrastructure patterns

Agents are not just chatbots — they're autonomous workers that can:
- Monitor your infrastructure continuously
- Take proactive actions based on policies
- Alert you to issues before they become problems
- Execute complex multi-step workflows

### Workspaces

A **Workspace** is an isolated environment containing:

- Connected cloud providers
- Deployed agents
- Configuration and policies
- Team members and permissions

Most organizations use one workspace per environment (dev, staging, production) or per team.

### Providers

**Providers** are the cloud platforms Cloud2Gether connects to:

- **AWS** — EC2, S3, Lambda, RDS, EKS, and 200+ services
- **Azure** — VMs, Storage, Functions, AKS, and more
- **GCP** — Compute Engine, Cloud Storage, Cloud Functions, GKE
- **Kubernetes** — Any cluster, managed or self-hosted
- **Custom** — Connect any API via provider plugins

### Actions

**Actions** are operations agents can perform:

| Action Type | Examples |
|------------|----------|
| **Query** | List resources, check status, analyze costs |
| **Modify** | Create, update, delete resources |
| **Monitor** | Watch for changes, alert on thresholds |
| **Automate** | Schedule tasks, create workflows |

Actions have built-in safety:
- Destructive operations require confirmation
- All actions are logged and auditable
- Policies can restrict what agents can do

### Policies

**Policies** define guardrails for agent behavior:

```yaml
# Example policy
name: production-safety
rules:
  - action: delete
    resources: ["*"]
    require: approval
  - action: modify
    resources: ["database/*"]
    require: approval
  - action: query
    resources: ["*"]
    allow: true
```

Policies ensure agents operate within boundaries you define.

## How Agents Work

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   You       │────▶│   Agent     │────▶│   Cloud     │
│   (Intent)  │     │   (AI)      │     │   Provider  │
└─────────────┘     └─────────────┘     └─────────────┘
      ▲                    │                    │
      │                    ▼                    ▼
      │             ┌─────────────┐     ┌─────────────┐
      └─────────────│   Response  │◀────│   Results   │
                    │   (Human)   │     │   (Data)    │
                    └─────────────┘     └─────────────┘
```

1. **You express intent** — Natural language describing what you want
2. **Agent interprets** — AI understands the goal and plans steps
3. **Agent executes** — API calls to your cloud providers
4. **Results returned** — Human-readable summary of what happened

## Agent Types

Cloud2Gether provides specialized agents for different tasks:

| Agent Type | Purpose |
|-----------|---------|
| **Infrastructure** | Manage compute, storage, networking |
| **Security** | Audit, compliance, vulnerability scanning |
| **Cost** | Optimization, budgeting, waste detection |
| **Deployment** | CI/CD, releases, rollbacks |
| **Monitoring** | Observability, alerting, incident response |

Learn more in the [AI Agents documentation](/docs/ai-agents/).

## Security Model

Cloud2Gether is designed with security first:

- **Least privilege** — Agents only access what they need
- **Audit logging** — Every action is recorded
- **Encryption** — All data encrypted in transit and at rest
- **No data storage** — We don't store your infrastructure data
- **SOC 2 compliant** — Enterprise-grade security practices

See [Security & Compliance](/docs/admin/security/) for details.

## Next Steps

Now that you understand the concepts:

- [Deploy more agents](/docs/ai-agents/)
- [Configure policies](/docs/admin/policies/)
- [Set up team access](/docs/admin/users/)
