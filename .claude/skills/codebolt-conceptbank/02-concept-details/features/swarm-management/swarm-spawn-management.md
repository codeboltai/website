---
title: Swarm Spawn Management
description: Request and approval workflow for agent instantiation in swarms
category: Swarm Management
tags: [swarm, agents, spawning, workflow, approval]
lastUpdated: 2026-01-18
---

# Swarm Spawn Management

## Executive Summary

Swarm Spawn Management provides a controlled workflow for requesting and approving the creation of new agent instances within a swarm. It maintains separate registries for spawn requests and successfully spawned agents, enabling full auditability and control over swarm composition and scaling.

## What It Is

Spawn Management is a two-phase workflow system that:

- **Separates request from execution**: Agents request to spawn, approvers authorize, then spawning occurs
- **Maintains request registry**: Tracks all spawn requests with their status (pending/approved/rejected)
- **Maintains spawn registry**: Records all successfully spawned agents for audit trail
- **Supports approval workflow**: Requires explicit approval before agent instantiation
- **Provides rich metadata**: Captures role requirements, reasoning, and approval chain

This system prevents uncontrolled swarm growth while enabling dynamic scaling based on workload demands.

## Key Capabilities

### Spawn Request Creation
- **Role-based requests**: Specify the role the new agent should fill
- **Requirements specification**: Detail capabilities and qualifications needed
- **Reasoning capture**: Explain why the spawn is necessary
- **Requester tracking**: Identify who (agent or user) initiated the request
- **Automatic status**: New requests start in "pending" state

### Approval Workflow
- **Approve action**: Authorize a pending spawn request
- **Reject action**: Deny a pending spawn request with optional reason
- **Approver tracking**: Record who approved each request
- **Status transitions**: Automatic updates from pending → approved/rejected
- **Rejection reasons**: Capture why requests were denied for future reference

### Spawn Registry
- **Automatic entry creation**: New entry added when agent successfully spawns
- **Full agent details**: Record agent ID, name, and instance ID
- **Request linking**: Associate spawn with original spawn request
- **Approver tracking**: Record who authorized the spawn
- **Timestamping**: Capture exact time of spawn event

### Request Management
- **List all requests**: View pending, approved, and rejected requests
- **Filter by status**: Focus on pending requests requiring action
- **View details**: Inspect role requirements, reasoning, and approval chain
- **Request history**: Maintain complete audit trail of all spawn activity

## How It Works Conceptually

### Spawn Request Lifecycle

```
1. REQUEST CREATION
   Agent/User creates spawn request
   → Request saved with "pending" status
   → Request appears in spawn requests panel

2. APPROVAL (if approved)
   Authorized approver reviews request
   → Approver approves request
   → Status changed to "approved"
   → Agent instantiation triggered

3. REJECTION (alternative)
   Authorized approver denies request
   → Rejection reason captured
   → Status changed to "rejected"
   → Request archived but not executed

4. SPAWN EXECUTION
   If approved: Agent spawned by swarm manager
   → New agent instance created
   → Entry added to spawn registry
   → Agent available for task assignment
```

### Data Flow

```
SwarmDetailPanel
    ↓
SpawnRequestsPanel (creates requests)
    ↓
SwarmDataService.saveSpawnRequest()
    ↓
Spawn request persisted to disk
    ↓
Approver reviews and approves
    ↓
SwarmManager broadcasts approval event
    ↓
Agent instantiation triggered
    ↓
SwarmDataService.createSpawnRegistryEntry()
    ↓
Spawn registry updated
```

### Request Data Structure

**Spawn Request:**
- **id**: Unique request identifier
- **swarmId**: Parent swarm
- **requestedRole**: Role the new agent should fill
- **requirements**: Capabilities needed
- **reason**: Why spawn is needed
- **requestedBy**: ActorIdentity (agent or user)
- **status**: pending/approved/rejected
- **approvedBy**: ActorIdentity (if approved)
- **rejectionReason**: Explanation (if rejected)
- **createdAt/updatedAt**: Timestamps

**Spawn Registry Entry:**
- **id**: Unique entry identifier
- **swarmId**: Parent swarm
- **agentId/agentName**: Identity of spawned agent
- **agentInstanceId**: Specific instance identifier
- **spawnRequestId**: Link to original request
- **spawnedBy**: ActorIdentity (agent or user)
- **reason**: Original spawn reason
- **spawnedAt**: Timestamp

## Use Cases

### Dynamic Scaling
- **Workload spikes**: Agents request additional help when overwhelmed
- **Specialized tasks**: Request agents with specific capabilities for niche tasks
- **Parallel processing**: Spawn multiple agents to divide large tasks
- **Geographic distribution**: Add agents in different regions

### Human-Approved Growth
- **Cost control**: Approve spawns to manage resource consumption
- **Quality assurance**: Review spawn requests before allowing new agents
- **Capacity planning**: Control swarm size within infrastructure limits
- **Security review**: Ensure new agents meet security requirements

### Audit and Compliance
- **Spawn tracking**: Maintain record of all agent instantiations
- **Approval chain**: Document who authorized each spawn
- **Policy enforcement**: Reject spawns that violate organizational policies
- **Historical analysis**: Review spawn patterns over time

### Role-Based Scaling
- **Fill vacancies**: Spawn agents to fill open role vacancies
- **Team reinforcement**: Add agents to teams needing more capacity
- **Capability gaps**: Request agents with missing capabilities
- **Load balancing**: Distribute work across more agents

## Related Concepts

- **[Swarm Termination Management](./swarm-termination-management.md)**: Complementary workflow for agent removal
- **[Role Management](./role-management.md)**: Defining roles that spawned agents fill
- **[Team Management](./team-management.md)**: Organizing spawned agents into teams
- **[Swarm Execution Control](./swarm-execution-control.md)**: Managing overall swarm lifecycle
- **[Agent Lifecycle](./agent-lifecycle.md)**: Complete agent life cycle from spawn to termination

## Technical Notes

### Storage Location

Spawn requests and registry stored per-swarm:
```
<project>/.codebolt/swarm/<swarmId>/
  ├── spawn-requests.json
  └── spawn-registry.json
```

### Approval Authorization

Currently, any agent or user can approve spawn requests. Future enhancements may include:
- Role-based approval permissions
- Multi-approval workflows
- Automatic approval based on policies
- Time-limited approvals

### Spawn Triggers

Spawns can be triggered by:
- **Agent requests**: Agents requesting help
- **User requests**: Manual spawning through UI
- **Policy-based**: Automatic spawns based on conditions
- **Schedule-based**: Pre-planned scaling events

### Error Handling

- Invalid spawn requests rejected with validation errors
- Spawn failures captured in registry with error details
- Automatic retry logic for transient failures
- Fallback notifications when spawns cannot complete

### Performance Considerations

- Spawn requests are lightweight (metadata only)
- Registry growth scales with total spawns
- File-based storage suitable for moderate spawn volumes
- For high-volume spawning, consider database backend
