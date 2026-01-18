---
title: Swarm Termination Management
description: Controlled workflow for removing agents from swarms
category: Swarm Management
tags: [swarm, agents, termination, workflow, shutdown]
lastUpdated: 2026-01-18
---

# Swarm Termination Management

## Executive Summary

Swarm Termination Management provides a controlled, auditable workflow for removing agents from swarms. It enables agents or users to request agent termination, requires approval before execution, and maintains a complete registry of terminated agents for operational visibility and compliance.

## What It Is

Termination Management is a request-and-approve system that:

- **Separates request from execution**: Termination requests must be approved before agents are removed
- **Maintains request registry**: Tracks all termination requests with their status
- **Maintains termination registry**: Records all successfully terminated agents
- **Supports approval workflow**: Requires explicit authorization before agent removal
- **Preserves termination context**: Captures reasons, approvers, and timestamps

This system prevents accidental or unauthorized agent removal while enabling controlled swarm scaling and cleanup.

## Key Capabilities

### Termination Request Creation
- **Agent-targeted requests**: Specify which agent should be terminated
- **Reason capture**: Document why termination is necessary
- **Requester tracking**: Identify who initiated the termination request
- **Instance targeting**: Target specific agent instances if multiple exist
- **Automatic routing**: Requests routed to appropriate approvers

### Approval Workflow
- **Approve action**: Authorize a pending termination request
- **Reject action**: Deny a termination request with reason
- **Approver tracking**: Record who approved each termination
- **Status tracking**: Monitor request status (pending/approved/rejected)
- **Rejection documentation**: Capture why terminations were denied

### Termination Registry
- **Automatic entry creation**: New entry added when agent terminates
- **Full agent details**: Record agent ID, name, and instance ID
- **Request linking**: Associate termination with original request
- **Terminator tracking**: Record who authorized the termination
- **Reason preservation**: Maintain original termination rationale

### Request Management
- **List all requests**: View pending, approved, and rejected terminations
- **Filter by status**: Focus on pending requests requiring action
- **View details**: Inspect target agent, reasoning, and approval chain
- **Audit trail**: Complete history of all termination activity

## How It Works Conceptually

### Termination Request Lifecycle

```
1. REQUEST CREATION
   Agent/User creates termination request
   → Target agent identified
   → Reason for termination documented
   → Request saved with "pending" status
   → Request appears in termination requests panel

2. APPROVAL (if approved)
   Authorized approver reviews request
   → Approver approves termination
   → Status changed to "approved"
   → Termination execution triggered

3. REJECTION (alternative)
   Authorized approver denies request
   → Rejection reason captured
   → Status changed to "rejected"
   → Agent continues running

4. TERMINATION EXECUTION
   If approved: Agent termination initiated
   → Agent unregistered from swarm
   → Agent processes stopped
   → Agent removed from teams and roles
   → Entry added to termination registry
```

### Data Flow

```
SwarmDetailPanel
    ↓
TerminationRequestsPanel (creates requests)
    ↓
SwarmDataService.createTerminationRequest()
    ↓
Request persisted to disk
    ↓
Approver reviews and approves
    ↓
SwarmManager broadcasts termination event
    ↓
Agent unregistration and cleanup
    ↓
SwarmDataService.createTerminationRegistryEntry()
    ↓
Termination registry updated
```

### Impact Cascade

When an agent is terminated:

```
Agent termination
    ↓
Removed from swarm agent list
    ↓
Removed from all team memberships
    ↓
Removed from all role assignments
    ↓
Vacancies created for unfilled roles
    ↓
Agent status changed to "terminated"
    ↓
Termination registry entry created
    ↓
Swarm statistics updated
```

### Request Data Structure

**Termination Request:**
- **id**: Unique request identifier
- **swarmId**: Parent swarm
- **agentId/agentName**: Target agent identity
- **agentInstanceId**: Specific instance to terminate
- **reason**: Why termination is needed
- **requestedBy**: ActorIdentity (agent or user)
- **status**: pending/approved/rejected
- **approvedBy**: ActorIdentity (if approved)
- **rejectionReason**: Explanation (if rejected)
- **createdAt/updatedAt**: Timestamps

**Termination Registry Entry:**
- **id**: Unique entry identifier
- **swarmId**: Parent swarm
- **agentId/agentName**: Identity of terminated agent
- **agentInstanceId**: Specific instance that was terminated
- **terminationRequestId**: Link to original request
- **terminatedBy**: ActorIdentity (agent or user)
- **reason**: Original termination reason
- **terminatedAt**: Timestamp

## Use Cases

### Controlled Scale-Down
- **Reduced workload**: Terminate agents when work decreases
- **Cost optimization**: Remove idle agents to reduce resource consumption
- **Team rebalancing**: Adjust team composition by removing agents
- **Role realignment**: Remove agents when roles are deprioritized

### Problem Resolution
- **Malfunctioning agents**: Remove agents exhibiting errors or misbehavior
- **Performance issues**: Terminate agents causing bottlenecks
- **Stuck agents**: Clean up agents that are unresponsive
- **Policy violations**: Remove agents that violated operational policies

### Operational Maintenance
- **Swarm reorganization**: Restructure swarm by removing specific agents
- **Capacity planning**: Maintain optimal agent count
- **Testing and development**: Remove test agents after experiments
- **Version upgrades**: Terminate old agents during upgrades

### Audit and Compliance
- **Termination tracking**: Maintain record of all agent removals
- **Approval chain**: Document who authorized each termination
- **Reason documentation**: Preserve rationale for terminations
- **Historical analysis**: Review termination patterns and causes

## Related Concepts

- **[Swarm Spawn Management](./swarm-spawn-management.md)**: Complementary workflow for agent addition
- **[Agent Lifecycle](./agent-lifecycle.md)**: Complete agent life cycle including termination
- **[Team Management](./team-management.md)**: Impact of termination on team composition
- **[Role Management](./role-management.md)**: Role vacancies created by termination
- **[Swarm Execution Control](./swarm-execution-control.md)**: Managing overall swarm lifecycle

## Technical Notes

### Storage Location

Termination requests and registry stored per-swarm:
```
<project>/.codebolt/swarm/<swarmId>/
  ├── termination-requests.json
  └── termination-registry.json
```

### Termination Triggers

Terminations can be triggered by:
- **Agent requests**: Agents requesting to shut down
- **User requests**: Manual termination through UI
- **Policy-based**: Automatic termination for policy violations
- **Health monitoring**: Automatic termination of unhealthy agents
- **Schedule-based**: Pre-planned termination events

### Cleanup Process

When an agent is terminated, the system:
1. Unregisters agent from swarm (SwarmManager)
2. Removes agent from all teams (TeamManager)
3. Unassigns all roles (RoleManager)
4. Creates vacancies for unfilled roles
5. Broadcasts termination event to swarm
6. Updates swarm statistics
7. Creates termination registry entry
8. Emits lifecycle event to ApplicationEventBus

### Approval Authorization

Currently, any agent or user can approve termination requests. Future enhancements may include:
- Role-based approval permissions
- Multi-approval workflows for critical agents
- Automatic approval for self-termination requests
- Escalation workflows for rejected requests

### Error Handling

- Invalid termination requests rejected with validation errors
- Termination failures captured in registry with error details
- Automatic rollback for partial termination failures
- Fallback notifications when terminations cannot complete

### Performance Considerations

- Termination requests are lightweight (metadata only)
- Registry growth scales with total terminations
- File-based storage suitable for moderate termination volumes
- For high-volume terminations, consider database backend

### Idempotency

- Duplicate termination requests for same agent idempotent
- Already-terminated agents handled gracefully
- Registry prevents duplicate termination entries
- Failed terminations can be retried safely
