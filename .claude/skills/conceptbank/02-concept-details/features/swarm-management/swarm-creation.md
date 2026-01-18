---
title: "Swarm Creation"
description: "How to create, configure, and initialize swarms in CodeBolt"
---

# Swarm Creation

## Executive Summary
Swarm creation is the process of establishing a new multi-agent collaboration environment in CodeBolt. Users define the swarm's purpose, configure its behavior, and prepare it for agent participation through a straightforward creation workflow.

## What is Swarm Creation?

Swarm creation **instantiates a new swarm container** that will eventually host multiple AI agents working together. It's the foundational step that establishes:

- A **unique identity** for the swarm (ID, name, description)
- **Behavioral rules** that govern how agents interact
- **Resource boundaries** (max agents, external agent policy)
- **Integration points** (episodic memory, job groups, communication channels)

## Why Create Swarms?

Creating swarms enables users to:

- **Organize work around projects or initiatives**: Each swarm represents a distinct work effort
- **Establish context boundaries**: Swarms provide isolated environments for different objectives
- **Enable parallel collaboration**: Multiple swarms can run simultaneously without interference
- **Specialize agent behavior**: Different swarms can have different configurations and rules
- **Track progress independently**: Each swarm maintains its own state and metrics

## Creation Process

### 1. Define Basic Information

The user provides essential details about the swarm:

- **Name**: A descriptive identifier (e.g., "E-Commerce Redesign", "API Migration Team")
- **Description**: Optional context about the swarm's purpose and objectives
- **Maximum Agents**: Upper limit on concurrent agent participation (default: 100)

**Validation Rules**:
- Name must be 3-100 characters
- Name cannot contain special characters or spaces
- Description limited to 500 characters
- Max agents must be between 1 and 1000

### 2. Configure Swarm Behavior

Users specify how the swarm operates through configuration options:

**Agent Policies**:
- `allowExternalAgents`: Whether agents from outside CodeBolt can participate
- `maxAgents`: Hard limit on total agents in the swarm

**Team & Role Policies**:
- `requireRoleForTeamJoin`: Must agents have a role before joining teams?
- `allowSelfRoleAssignment`: Can agents assign themselves to roles?

**Vacancy Policies**:
- `vacancyApprovalRequired`: Do role vacancy applications need approval?

**Timeout Policies**:
- `autoOfflineTimeout`: Milliseconds before inactive agents are marked offline (default: 300000 / 5 minutes)

### 3. Automatic System Setup

When a swarm is created, CodeBolt automatically:

1. **Generates a unique swarm ID** using UUID v4
2. **Creates an episodic memory** for the swarm to store shared context
3. **Initializes data structures** for agents, teams, roles, and vacancies
4. **Creates a job group** with the format `SWARM-{name}` for task management
5. **Registers the swarm** in the swarm registry for discovery and listing

### 4. Configure Agents for Execution

After creation, users configure **which agents will run** when the swarm starts:

- **Agent Selection**: Choose from available CodeBolt agents
- **Instance Count**: Specify how many instances of each agent to spawn
- **Enable/Disable**: Control which agents are active without removing them
- **Initial Prompt**: Define the task description that all agents receive on startup

## Configuration Options Explained

### Maximum Agents

Controls the **total number of agents** allowed in the swarm, regardless of type.

- **Purpose**: Prevent resource exhaustion and manage costs
- **Default**: 100 agents
- **Range**: 1-1000 agents
- **When to adjust**: Increase for large-scale parallel work, decrease for resource-constrained environments

### Allow External Agents

Determines whether **agents not managed by CodeBolt** can participate in the swarm.

- **Purpose**: Enable integration with external AI services or custom agent implementations
- **Default**: `true` (allowed)
- **When to disable**: Security-sensitive environments or purely internal workflows

### Auto-Offline Timeout

Defines **inactivity period** before an agent is automatically marked as offline.

- **Purpose**: Detect and clean up disconnected or crashed agents
- **Default**: 300,000 milliseconds (5 minutes)
- **When to adjust**: Decrease for faster failure detection, increase for networks with latency

### Require Role for Team Join

Enforces **role-based team membership** rules.

- **Purpose**: Ensure only qualified agents can join teams
- **Default**: `false` (not required)
- **When to enable**: Strict qualification requirements for team participation

### Allow Self Role Assignment

Controls whether **agents can assign themselves** to roles without approval.

- **Purpose**: Balance between autonomy and oversight
- **Default**: `true` (allowed)
- **When to disable**: Require approval for all role assignments

### Vacancy Approval Required

Determines if **role vacancy applications** require manual approval.

- **Purpose**: Control over who gets assigned to critical roles
- **Default**: `false` (auto-approve)
- **When to enable**: High-stakes roles requiring human oversight

## Default Configuration

CodeBolt provides sensible defaults for new swarms:

```typescript
{
  maxAgents: 100,
  allowExternalAgents: true,
  autoOfflineTimeout: 300000,        // 5 minutes
  requireRoleForTeamJoin: false,
  allowSelfRoleAssignment: true,
  vacancyApprovalRequired: false
}
```

Users can override any default during creation or modify it later.

## Swarm Registry

All created swarms are **registered in a central registry** that tracks:

- **Swarm ID**: Unique identifier for the swarm
- **Name**: Human-readable name
- **Description**: Purpose and objectives
- **Agent Count**: Current number of registered agents
- **Creation Date**: When the swarm was created
- **Last Activity**: Timestamp of most recent agent activity
- **Episodic Memory ID**: Link to shared memory storage

The registry enables:
- Discovery and listing of available swarms
- Quick status checks without loading full swarm data
- Activity tracking and stale swarm detection

## Integration Points

### Episodic Memory

Each swarm automatically gets an **associated episodic memory** that stores:
- Agent interactions and conversations
- Decisions made and their rationale
- Outcomes and lessons learned
- Context that persists across agent lifecycles

This memory is shared among all agents in the swarm, enabling **collective learning** and context continuity.

### Job Groups

A **job group** named `SWARM-{name}` is created for each swarm to organize:
- Tasks assigned to the swarm
- Initial prompt delivery
- Work items generated during swarm execution
- Completion tracking and reporting

### Communication Channels

Swarms establish **WebSocket-based communication** for:
- Real-time event broadcasting to all agents
- Status updates and lifecycle notifications
- Agent registration and unregistration
- Spawn and termination coordination

## Lifecycle States

After creation, a swarm progresses through these states:

1. **Created**: Swarm exists but has no agents
2. **Configured**: Agents and roles have been defined
3. **Starting**: Agents are being spawned and initialized
4. **Running**: Agents are actively working on tasks
5. **Finished**: All agents have completed their work
6. **Error**: An unrecoverable error occurred

The creation process establishes the swarm in the **Created** state.

## Best Practices

### Naming Conventions

Use **descriptive, purpose-driven names**:
- ✅ "E-Checkout Optimization Team"
- ✅ "API v2 Migration Swarm"
- ✅ "Test Coverage Expansion"

Avoid:
- ❌ "Swarm 1"
- ❌ "My Swarm"
- ❌ Generic or unclear names

### Description Guidelines

Write descriptions that clarify:
- **Primary objective**: What is the swarm trying to achieve?
- **Scope**: What work is in-scope and out-of-scope?
- **Success criteria**: How will we know when the swarm succeeds?

Example:
> "Migrate the customer checkout flow from monolithic architecture to microservices. Includes backend API development, frontend component updates, and comprehensive testing. Success: 100% of checkout transactions use new microservice architecture with <200ms p95 latency."

### Configuration Tuning

**For rapid prototyping**:
- Increase `maxAgents` for parallel exploration
- Enable `allowExternalAgents` for maximum flexibility
- Set `autoOfflineTimeout` lower to quickly identify issues

**For production workloads**:
- Set `maxAgents` to match resource capacity
- Disable `allowExternalAgents` for security
- Require approvals for critical role assignments

**For experimentation**:
- Allow self-assignment for quick iteration
- Disable role requirements to encourage exploration
- Use generous timeouts for learning and discovery

## Common Patterns

### Single-Project Swarm

Create one swarm per major project:
- Clear boundary around project work
- Easy to track progress and outcomes
- Simple to archive when project completes

### Multi-Stage Pipeline

Create multiple swarms for sequential stages:
- "Design Swarm" → "Implementation Swarm" → "Testing Swarm"
- Each swarm hands off to the next
- Enables specialization at each stage

### Capability-Based Swarms

Organize swarms around technical capabilities:
- "Frontend Development Swarm"
- "Backend API Swarm"
- "DevOps Automation Swarm"

Agents participate in multiple swarms based on their capabilities.

## Related Concepts

- [Swarm Overview](./overview.md) - Understanding the swarm system
- [Swarm Configuration](./swarm-configuration.md) - Detailed configuration options
- [Team Management](./team-management.md) - Organizing agents within swarms
- [Role System](./role-system.md) - Defining agent responsibilities
- [Spawn & Termination](./spawn-termination.md) - Starting and stopping agents
- [Swarm Use Cases](./swarm-use-cases.md) - Real-world examples
