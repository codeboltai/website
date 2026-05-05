---
id: "agent-types"
title: "Agent Types and Sources"
category: "features"
subcategory: "agent-management"
tags: ["agents", "types", "local", "global", "external", "remix"]
audience: ["technical", "business"]
difficulty: "beginner"
last_updated: "2026-01-18"
version: "1.0.0"
related_concepts: ["agent-creation-code", "agent-creation-visual", "agent-configuration"]
content_type: "concept"
status: "published"
phase: 1
---

# Agent Types and Sources

## Executive Summary

CodeBolt supports four distinct agent types—local, global, external, and remix—each optimized for specific use cases ranging from project-specific workflows to shared marketplace agents. Understanding these types enables users to choose the right agent distribution model for their needs, balancing portability, collaboration, and customization.

## Overview

Agents in CodeBolt are not monolithic entities; they exist in different scopes and sources depending on how they're created, distributed, and used. The four agent types form a hierarchy of availability:

- **Local Agents**: Project-specific, stored in your project directory
- **Global Agents**: Available across all projects on your machine
- **External Agents**: Downloaded from the CodeBolt marketplace
- **Remix Agents**: Customized versions derived from existing agents

This multi-tiered system ensures flexibility while maintaining clear boundaries between personal, shared, and custom agent workflows.

## The Four Agent Types

### 1. Local Agents

**What They Are**: Project-specific agents stored in your project's `.codeboltAgents/agents/` directory.

**When to Use Them**:
- Project-specific workflows and conventions
- Team-specific agents that shouldn't be shared
- Experimental agents in development
- Domain-specific agents for a single codebase

**Key Characteristics**:
- **Scope**: Available only within the containing project
- **Storage**: `<project>/.codeboltAgents/agents/<agent-id>/`
- **Portability**: Included in version control (if `.codeboltAgents/` is committed)
- **Collaboration**: Automatically available to team members who clone the repo
- **Management**: Created and managed through AgentFlow Creator or code

**Example Use Case**: A development team creates a "React Component Builder" agent specifically for their project's component architecture. This agent understands their design system, folder structure, and coding standards—it's not meant for external use.

### 2. Global Agents

**What They Are**: Machine-wide agents stored in CodeBolt's user data directory, accessible to all projects.

**When to Use Them**:
- Personal workflow agents you use across projects
- Customized versions of marketplace agents
- Frequently-used utility agents
- Personal preference configurations

**Key Characteristics**:
- **Scope**: Available across all projects on your machine
- **Storage**: `~/[userData]/.codebolt/agents/<agent-id>/`
- **Portability**: Not shared across machines (unless manually synced)
- **Collaboration**: Private to your development environment
- **Management**: Install and configure via Agent Settings or API

**Example Use Case**: A developer creates a "TypeScript Migration Helper" agent that they use across multiple projects. This agent contains their personal preferences and patterns—useful to them, but not necessarily team-standard.

### 3. External Agents (Marketplace)

**What They Are**: Pre-built agents distributed through the CodeBolt marketplace, created by the CodeBolt team or community.

**When to Use Them**:
- Quick access to specialized capabilities
- Industry-standard workflows
- Community-tested and refined agents
- Learning from expert-designed agents

**Key Characteristics**:
- **Scope**: Available after installation from marketplace
- **Storage**: Downloaded to global agent directory
- **Portability**: Can be installed on any machine with marketplace access
- **Collaboration**: Shared across the CodeBolt community
- **Management**: Browse, install, and update via Marketplace panel

**Example Use Case**: Installing the "Security Vulnerability Scanner" agent from the marketplace to perform automated security audits. This agent is maintained by security experts and updated regularly with new vulnerability patterns.

### 4. Remix Agents

**What They Are**: Customized versions of existing agents (local, global, or external) with modified settings, instructions, or tooling.

**When to Use Them**:
- Adapting marketplace agents to your needs
- Creating specialized variants of general-purpose agents
- Experimenting with agent configurations
- Building on proven agent foundations

**Key Characteristics**:
- **Scope**: Stored as local agents (project-scoped)
- **Storage**: `<project>/.codeboltAgents/agents/<remix-id>/`
- **Lineage**: Tracks `remixedFromId` for attribution
- **Customization**: Can override provider, model, instructions, tools
- **Management**: Created via "Remix" action in Agent Settings

**Example Use Case**: A developer takes the standard "Code Reviewer" agent from the marketplace and creates a remix that:
- Uses GPT-4 instead of Claude
- Enforces their team's specific coding standards
- Adds custom tools for checking API documentation compliance
- Includes additional instructions about their architecture patterns

## Agent Discovery and Resolution

CodeBolt uses a hierarchical discovery system to determine which agent to use when multiple agents have similar capabilities:

### Resolution Order

1. **Local Agents** (highest priority)
   - Checked first when resolving agent references
   - Project-specific overrides take precedence

2. **Global Agents**
   - Used if no local agent matches
   - Personal defaults across projects

3. **External Agents**
   - Available after installation
   - Fallback when local/global agents don't exist

### Agent Selection Logic

```
User selects "Code Reviewer" agent

1. Check local agents → Found? Use it
   └─ Yes: Local project-specific version
   └─ No: Continue to step 2

2. Check global agents → Found? Use it
   └─ Yes: Personal customized version
   └─ No: Continue to step 3

3. Check external agents → Found? Use it
   └─ Yes: Marketplace version
   └─ No: Agent not found, prompt to install
```

This system allows project-specific agents to override global defaults, while global agents can override marketplace versions—providing maximum flexibility.

## Agent Metadata and Identification

Every agent carries metadata that identifies its type and origin:

### Core Metadata Fields

- **agentId**: Unique identifier (UUID or custom)
- **title**: Human-readable name
- **description**: Short explanation of purpose
- **longDescription**: Detailed documentation
- **version**: Agent version for updates
- **source**: "local" | "global" | "external"
- **agentPath**: Filesystem path to agent directory
- **zipFilePath**: Path to agent package (for external)

### Remix-Specific Metadata

- **remixedFromId**: Original agent's ID
- **remixedFromTitle**: Original agent's title
- **customSettings**: Customization overrides
  - **provider**: LLM provider override
  - **model**: Model selection override
  - **customInstructions**: Additional prompt instructions
  - **additionalTools**: Extra tools to include
  - **selectedTools**: Subset of original agent's tools

## Configuration Hierarchy

Agent settings flow down through the type hierarchy:

### Marketplace Agent (Base)
```
Provider: Anthropic
Model: Claude Sonnet
Tools: [file-ops, git, search]
Instructions: "Review code for bugs..."
```

### Global Remix (Personalized)
```
Remix of: Marketplace Agent
Provider: OpenAI (override)
Model: GPT-4 (override)
Instructions: + "Enforce team style guide"
```

### Local Remix (Project-Specific)
```
Remix of: Global Remix
Tools: + [api-doc-checker] (additional)
Instructions: + "Check API docs consistency"
```

Each level can override or extend the previous level's configuration, enabling granular customization without duplication.

## Migration and Promotion

Agents can move between types as they mature:

### Development Workflow

1. **Start as Local Agent**: Experiment in project context
2. **Promote to Global Agent**: Useful across projects? Move to global
3. **Share to Marketplace**: Valuable to community? Submit for distribution

### Promotion Path

```
Local Agent
    ↓ (proven useful)
Global Agent
    ↓ (refined and documented)
External Marketplace Agent
```

This workflow supports organic agent development from personal experiments to community resources.

## Agent Lifecycle by Type

### Local Agents
- **Creation**: AgentFlow Creator or code
- **Discovery**: Automatic (project-scoped)
- **Updates**: Manual edit in AgentFlow Creator
- **Deletion**: Remove from `.codeboltAgents/`
- **Sharing**: Commit to repo (if desired)

### Global Agents
- **Creation**: Agent Settings → "Create Agent"
- **Discovery**: Available in all projects
- **Updates**: Edit via Agent Settings
- **Deletion**: Uninstall via Agent Settings
- **Sharing**: Manual export/import

### External Agents
- **Creation**: Published to marketplace
- **Discovery**: Browse and install via Marketplace panel
- **Updates**: Check for updates in Marketplace
- **Deletion**: Uninstall via Marketplace
- **Sharing**: Public marketplace URL

### Remix Agents
- **Creation**: "Remix" action from any agent
- **Discovery**: Stored as local agents
- **Updates**: Edit remix or update base agent
- **Deletion**: Delete like local agents
- **Sharing**: Commit as local agents

## Use Case Examples

### Scenario 1: Startup Development Team

**Needs**: Team-specific agents, shared workflows

**Solution**:
- Use **local agents** for team standards (committed to repo)
- Create **remix agents** from marketplace for specialized needs
- Avoid global agents (causes inconsistency across team)

### Scenario 2: Solo Developer

**Needs**: Personalized workflow across projects

**Solution**:
- Use **global agents** for personal preferences
- Install **external agents** for specialized tasks
- Create **remix agents** to adapt marketplace agents

### Scenario 3: Open Source Project

**Needs**: Consistent tooling for contributors

**Solution**:
- Commit **local agents** to repository
- Document agent usage in CONTRIBUTING.md
- Use **remix agents** to customize popular marketplace agents

### Scenario 4: Enterprise Team

**Needs**: Standardized workflows + team flexibility

**Solution**:
- Curate **external agents** from marketplace (standards)
- Allow **local agents** for team-specific overrides
- Create **global agent templates** for new developers

## Best Practices

### When to Use Each Type

**Choose Local Agents When**:
- Agent is project-specific
- Team should share the agent
- Agent contains project-specific knowledge

**Choose Global Agents When**:
- Agent represents personal workflow preferences
- You work on multiple unrelated projects
- Agent is experimental or in development

**Choose External Agents When**:
- You need specialized capabilities quickly
- Agent requires community maintenance
- You want to benefit from collective improvements

**Choose Remix Agents When**:
- Existing agent is close but not perfect
- You want to extend an agent without forking
- You need to adapt marketplace agents to your context

### Naming Conventions

- **Local**: `<project>-<purpose>` (e.g., "ecommerce-api-builder")
- **Global**: `<purpose>-personal` (e.g., "code-reviewer-personal")
- **External**: `<purpose>` (e.g., "security-scanner")
- **Remix**: `<original>-remix-<variation>` (e.g., "code-reviewer-remix-strict")

### Version Management

- Local agents: Track in git
- Global agents: Manual version tracking
- External agents: Marketplace version management
- Remix agents: Track base agent version + custom version

## Related Concepts

- **[Agent Creation (Code)](/conceptbank/features/agent-management/agent-creation-code.md)**: Creating agents via .agentflow files
- **[Agent Creation (Visual)](/conceptbank/features/agent-management/agent-creation-visual.md)**: Creating agents via drag-drop interface
- **[Agent Configuration](/conceptbank/features/agent-management/agent-configuration.md)**: YAML-based agent settings
- **[Agent Hooks](/conceptbank/features/agent-management/agent-hooks.md)**: Event-driven agent behavior
- **[Agent Debugging](/conceptbank/features/agent-management/agent-debugging.md)**: Monitoring and troubleshooting agents
