---
title: "Swarm Configuration"
description: "Detailed guide to swarm configuration options and their impact on behavior"
---

# Swarm Configuration

## Executive Summary
Swarm configuration defines the rules, policies, and limits that govern how agents interact within a swarm. Configuration options control security, resource management, coordination, and agent behavior throughout the swarm lifecycle.

## What is Swarm Configuration?

Swarm configuration is a **collection of settings** that determine:
- Which agents can participate
- How teams and roles operate
- What approvals are required
- How resources are managed
- How agents coordinate and communicate

Configuration is set **during swarm creation** and can be **modified later** as needs evolve.

## Configuration Options

### Agent Limits

#### maxAgents

**Purpose**: Limit total number of agents in the swarm

**Default**: 100 agents

**Range**: 1 - 1000 agents

**Impact**:
- **Resource Management**: Prevents system overload from too many agents
- **Cost Control**: Limits agent-related expenses
- **Coordination**: Keeps swarms manageable in size

**When to Adjust**:
- **Increase**: Large-scale parallel processing needs, ample resources
- **Decrease**: Resource constraints, focused collaboration, cost limits

**Examples**:
- Small team project: `maxAgents: 10`
- Enterprise migration: `maxAgents: 500`
- Experimental exploration: `maxAgents: 50`

#### maxConcurrentAgents

**Purpose**: Limit agents running simultaneously during swarm execution

**Default**: 5 agents

**Range**: 1 - 100 agents

**Impact**:
- **Execution Control**: Prevents resource exhaustion during active work
- **Queue Management**: Excess agents queue until capacity available
- **Performance**: Balances parallelism with system capacity

**When to Adjust**:
- **Increase**: More CPU/memory available, need faster completion
- **Decrease**: Limited resources, I/O-bound work, cost management

**Examples**:
- Lightweight tasks: `maxConcurrentAgents: 20`
- Heavy computation: `maxConcurrentAgents: 3`
- Standard development: `maxConcurrentAgents: 5`

### Agent Policies

#### allowExternalAgents

**Purpose**: Control whether agents from outside CodeBolt can join

**Default**: `true` (external agents allowed)

**Options**:
- `true`: External agents can register and participate
- `false`: Only internal CodeBolt agents allowed

**Impact**:
- **Flexibility**: External agents enable specialized capabilities
- **Security**: External agents may pose security risks
- **Integration**: Enables third-party AI services or custom agents

**When to Enable**:
- Need specialized AI capabilities not in CodeBolt
- Integrating with external AI services
- Collaborative projects with external partners

**When to Disable**:
- Security-sensitive environments
- Regulatory or compliance requirements
- Fully self-contained workflows

#### autoOfflineTimeout

**Purpose**: Time before inactive agents are marked offline

**Default**: 300,000 milliseconds (5 minutes)

**Range**: 30,000 ms (30 seconds) - 3,600,000 ms (1 hour)

**Impact**:
- **Failure Detection**: Quickly identify disconnected/crashed agents
- **Resource Management**: Clean up stale agent registrations
- **Reliability**: Maintain accurate agent status

**When to Adjust**:
- **Decrease**: Faster failure detection, lower tolerance for latency
- **Increase**: Slower networks, agents with long think times

**Examples**:
- Fast-fail system: `autoOfflineTimeout: 60000` (1 minute)
- Normal operation: `autoOfflineTimeout: 300000` (5 minutes)
- Patient system: `autoOfflineTimeout: 900000` (15 minutes)

### Team & Role Policies

#### requireRoleForTeamJoin

**Purpose**: Enforce role requirements for team membership

**Default**: `false` (roles not required)

**Options**:
- `true`: Agents must have a role to join teams
- `false`: Agents can join teams without roles

**Impact**:
- **Quality Control**: Ensures team members have qualifications
- **Flexibility**: Allows learning and exploration
- **Coordination**: Role-based team composition

**When to Enable**:
- High-quality output critical
- Teamwork requires specialized skills
- Regulatory or compliance requirements

**When to Disable**:
- Learning and exploration encouraged
- Cross-functional collaboration desired
- On-the-job skill development acceptable

**Examples**:
- Production system: `requireRoleForTeamJoin: true`
- Research project: `requireRoleForTeamJoin: false`
- Training environment: `requireRoleForTeamJoin: false`

#### allowSelfRoleAssignment

**Purpose**: Control whether agents can assign themselves to roles

**Default**: `true` (self-assignment allowed)

**Options**:
- `true`: Agents can assign themselves to qualifying roles
- `false`: Role assignment requires external approval

**Impact**:
- **Autonomy**: Agents can self-organize and adapt
- **Oversight**: Maintains control over role assignments
- **Efficiency**: Faster role filling vs. more deliberate selection

**When to Enable**:
- Agents are trusted and capable
- Rapid response and adaptability needed
- Minimizing coordination overhead

**When to Disable**:
- Critical roles need careful selection
- Human oversight required
- Preventing role conflicts

**Examples**:
- Autonomous swarm: `allowSelfRoleAssignment: true`
- High-security environment: `allowSelfRoleAssignment: false`
- Mixed environment: `allowSelfRoleAssignment: true` for non-critical roles only

### Vacancy Policies

#### vacancyApprovalRequired

**Purpose**: Control approval workflow for vacancy applications

**Default**: `false` (auto-approve applications)

**Options**:
- `true`: Applications require manual approval
- `false`: Applications auto-approved if agent qualifies

**Impact**:
- **Control**: Review applicants before role assignment
- **Speed**: Immediate role assignment vs. review delay
- **Quality**: Select best applicant vs. first qualified applicant

**When to Enable**:
- Critical or sensitive roles
- Multiple qualified candidates competing
- Need to select best fit

**When to Disable**:
- Standard operational roles
- Sufficient qualified agents
- Prioritizing speed over selection

**Examples**:
- Leadership roles: `vacancyApprovalRequired: true`
- Standard development: `vacancyApprovalRequired: false`
- Security roles: `vacancyApprovalRequired: true`

### Execution Configuration

#### initialPrompt

**Purpose**: Define task description sent to all agents on startup

**Default**: Empty string (no initial prompt)

**Format**: Free-form text, any length

**Impact**:
- **Alignment**: All agents start with shared understanding
- **Context**: Provides swarm-level objective to all agents
- **Coordination**: Common starting point for distributed work

**When to Use**:
- Swarm has clear, unified objective
- Agents need shared context
- Establishing swarm mission

**Best Practices**:
- **Be specific**: Clear objectives and expectations
- **Include context**: Background on the work
- **Define success**: What does completion look like?
- **Keep concise**: Long prompts can overwhelm agents

**Examples**:
```
# Simple
"Refactor the checkout process to use microservices architecture."

# Detailed
"Migrate the e-commerce checkout flow from monolithic to microservices.
Split into: (1) Order Service, (2) Payment Service, (3) Inventory Service.
Use Redis for caching, RabbitMQ for messaging. Maintain backward compatibility.
Success: All checkout traffic uses new services with <200ms p95 latency."
```

#### agents

**Purpose**: Specify which agents run when swarm starts

**Default**: Empty array (no agents configured)

**Format**: Array of agent configurations

**Agent Configuration**:
- `agentId`: Which agent to run
- `agentName`: Display name
- `maxInstances`: How many instances of this agent
- `isEnabled`: Whether this agent is active

**Impact**:
- **Composition**: Which capabilities are available in swarm
- **Capacity**: How many agents total will run
- **Specialization**: Different agents for different tasks

**When to Configure**:
- Before starting swarm execution
- Adding new capabilities to swarm
- Adjusting team composition

**Examples**:
```typescript
agents: [
  {
    agentId: "frontend-dev-001",
    agentName: "Frontend Developer",
    maxInstances: 3,
    isEnabled: true
  },
  {
    agentId: "backend-dev-002",
    agentName: "Backend Developer",
    maxInstances: 2,
    isEnabled: true
  },
  {
    agentId: "qa-specialist-003",
    agentName: "QA Engineer",
    maxInstances: 1,
    isEnabled: false  // Disabled initially
  }
]
```

#### defaultJobGroupId

**Purpose**: Link swarm to specific job group for task management

**Default**: Auto-generated job group named `SWARM-{swarmName}`

**Format**: Job group ID (string)

**Impact**:
- **Task Organization**: Swarm tasks organized under specific job group
- **Tracking**: Monitor swarm work through job management system
- **Integration**: Connects swarm execution to task workflows

**When to Override**:
- Connecting to existing job group
- Consolidating multiple swarms under one group
- Integrating with established task hierarchy

## Configuration Profiles

### Development Profile

```typescript
{
  maxAgents: 50,
  allowExternalAgents: true,
  autoOfflineTimeout: 300000,
  requireRoleForTeamJoin: false,
  allowSelfRoleAssignment: true,
  vacancyApprovalRequired: false,
  maxConcurrentAgents: 10
}
```

**Characteristics**:
- Flexible and permissive
- Enables experimentation
- Fast iteration
- Moderate resource limits

### Production Profile

```typescript
{
  maxAgents: 100,
  allowExternalAgents: false,
  autoOfflineTimeout: 180000,
  requireRoleForTeamJoin: true,
  allowSelfRoleAssignment: false,
  vacancyApprovalRequired: true,
  maxConcurrentAgents: 20
}
```

**Characteristics**:
- Security-focused
- Strong oversight
- Quality enforcement
- Higher capacity

### Research Profile

```typescript
{
  maxAgents: 200,
  allowExternalAgents: true,
  autoOfflineTimeout: 600000,
  requireRoleForTeamJoin: false,
  allowSelfRoleAssignment: true,
  vacancyApprovalRequired: false,
  maxConcurrentAgents: 5
}
```

**Characteristics**:
- Maximum flexibility
- Exploration encouraged
- High agent count, low concurrency
- Patient timeouts

## Configuration Lifecycle

### Creation

Configuration **initialized during swarm creation**:
- User provides basic settings
- Defaults applied for unspecified options
- Configuration saved with swarm data

### Modification

Configuration can be **updated after creation**:
- Individual settings changed
- Swarm adapts to new configuration
- Changes take effect immediately (for most settings)

**Settings that require restart**:
- `maxConcurrentAgents`
- `initialPrompt`
- Agent composition

**Settings that apply immediately**:
- `allowExternalAgents`
- `requireRoleForTeamJoin`
- `allowSelfRoleAssignment`
- `vacancyApprovalRequired`

### Validation

Configuration changes are **validated before applying**:
- Type checking (numbers, booleans, strings)
- Range validation (min/max values)
- Logical consistency (e.g., maxConcurrentAgents ≤ maxAgents)

## Best Practices

### Start Conservative

**Begin with restrictive settings**, relax as needed:
- Lower agent limits initially
- Enable approvals and oversight
- Monitor and adjust based on actual needs

### Document Rationale

**Record why specific values chosen**:
- In swarm description or metadata
- Helps future understand decisions
- Guides configuration tuning

### Regular Review

**Periodically reassess configuration**:
- Are limits still appropriate?
- Has swarm purpose evolved?
- New security or compliance requirements?

### Environment-Specific

**Use different configs by environment**:
- Development: Permissive, flexible
- Staging: Moderate controls
- Production: Strict, secure

## Configuration Tradeoffs

### Security vs. Flexibility

**More Secure**:
- Disable external agents
- Require approvals
- Enforce role requirements

**More Flexible**:
- Allow external agents
- Enable self-assignment
- Relax role requirements

### Speed vs. Quality

**Faster**:
- Auto-approve vacancies
- Allow self-assignment
- Shorter timeouts

**Higher Quality**:
- Manual approvals
- Oversight on assignments
- Thorough validation

### Cost vs. Capacity

**Lower Cost**:
- Fewer concurrent agents
- Lower max agents
- Shorter timeouts

**Higher Capacity**:
- More concurrent agents
- Higher max agents
- Patient timeouts

## Related Concepts

- [Swarm Creation](./swarm-creation.md) - Creating swarms with configuration
- [Role System](./role-system.md) - Role assignment policies
- [Team Management](./team-management.md) - Team membership requirements
- [Spawn & Termination](./spawn-termination.md) - Concurrent agent limits
- [Swarm Use Cases](./swarm-use-cases.md) - Configuration examples in practice
