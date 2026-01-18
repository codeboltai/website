---
title: "Spawn and Termination"
description: "Managing agent lifecycle through spawn requests, termination requests, and registry tracking"
---

# Spawn and Termination

## Executive Summary
The spawn and termination system controls the lifecycle of agents within a swarm, providing structured workflows for adding and removing agents with proper approval, tracking, and audit trails.

## What is Spawn & Termination?

**Spawn** is the process of **creating and starting a new agent** in a swarm.

**Termination** is the process of **stopping and removing an agent** from a swarm.

Both processes follow **request-approval workflows** that maintain control and accountability while enabling dynamic agent management.

## Why Lifecycle Management Matters

Uncontrolled agent spawning/termination causes:
- **Resource waste**: Too many agents running simultaneously
- **Cost overruns**: Uncontrolled agent consumption
- **Coordination chaos**: Agents appearing/disappearing unpredictably
- **No accountability**: Who started which agent and why?

Structured lifecycle management provides:
- **Oversight**: Review and approve before adding/removing agents
- **Resource control**: Limit concurrent agents to match capacity
- **Audit trail**: Complete record of all agent lifecycle events
- **Planning**: Coordinate agent additions with work needs

## Spawn System

### What is Spawning?

Spawning **instantiates a new agent** and adds it to the swarm:

- **Agent Creation**: Initialize new agent process/instance
- **Swarm Registration**: Add agent to swarm's agent list
- **Role Assignment**: Assign the agent to a specific role
- **Thread Creation**: Establish communication thread for the agent
- **Task Delivery**: Send initial prompt/objective to the agent

### Spawn Requests

A **spawn request** is a proposal to add a new agent:

**Request Attributes**:
- **ID**: Unique identifier for the request
- **Swarm ID**: Which swarm the agent will join
- **Requested Role**: What role the agent will fill
- **Requirements**: Capabilities and qualifications needed
- **Reason**: Justification for why this agent is needed
- **Requested By**: Who is making the request (agent or user)
- **Status**: pending, approved, or rejected
- **Created At**: When the request was submitted

### Spawn Workflow

#### Step 1: Create Request

Agent or user submits spawn request:
- Specifies what role is needed
- Provides justification for the request
- Sets requirements for the new agent

#### Step 2: Review and Approve

Swarm coordinator reviews request:
- **Approve**: Request moves forward, agent will be spawned
- **Reject**: Request denied, agent not spawned (with reason)
- **Pending**: Request waits for decision

Approval considerations:
- **Current capacity**: Is there room for more agents?
- **Role necessity**: Is this role actually needed?
- **Resource availability**: Can system handle another agent?
- **Priority**: Urgent requests processed first

#### Step 3: Spawn Agent

On approval:
1. System creates new agent instance
2. Agent assigned to requested role
3. Agent registered with swarm
4. Communication thread established
5. Initial task/prompt delivered
6. Agent begins working

#### Step 4: Record in Registry

Successful spawn recorded in **Spawn Registry**:
- Documents agent creation
- Links to spawn request
- Tracks who spawned it and why
- Provides audit trail

### Spawn Registry

The spawn registry **tracks all spawned agents**:

**Registry Entry Attributes**:
- **ID**: Unique registry entry identifier
- **Swarm ID**: Swarm the agent belongs to
- **Agent ID**: Unique identifier for the agent
- **Agent Name**: Human-readable name
- **Agent Instance ID**: Specific instance (if multiple instances)
- **Spawn Request ID**: Link to original request
- **Spawned By**: Who approved the spawn
- **Reason**: Justification from spawn request
- **Spawned At**: When the agent was created

**Registry Purposes**:
- **Audit**: Complete history of agent creation
- **Accountability**: Who authorized which agents
- **Analytics**: Spawn patterns and trends
- **Troubleshooting**: Trace agent origins and purposes

## Termination System

### What is Termination?

Termination **stops an agent and removes it** from the swarm:

- **Graceful Shutdown**: Agent completes current work
- **Swarm Unregistration**: Remove agent from swarm
- **Role Release**: Free up role for other agents
- **Resource Cleanup**: Release memory, connections, processes
- **Registry Recording**: Document termination in audit trail

### Termination Requests

A **termination request** is a proposal to remove an agent:

**Request Attributes**:
- **ID**: Unique identifier for the request
- **Swarm ID**: Swarm the agent belongs to
- **Agent ID**: Which agent to terminate
- **Agent Name**: Human-readable name
- **Agent Instance ID**: Specific instance (if applicable)
- **Reason**: Justification for termination
- **Requested By**: Who is making the request
- **Status**: pending, approved, or rejected
- **Created At**: When the request was submitted

### Termination Workflow

#### Step 1: Create Request

Agent or user submits termination request:
- Specifies which agent to terminate
- Provides reason for termination
- May suggest replacement or handoff plan

#### Step 2: Review and Approve

Swarm coordinator reviews request:
- **Approve**: Agent will be terminated
- **Reject**: Agent continues running (with reason)
- **Pending**: Request waits for decision

Approval considerations:
- **Agent state**: Is agent mid-critical task?
- **Work preservation**: Will work be lost?
- **Replacement needed**: Should another agent take over?
- **Impact**: How does termination affect swarm goals?

#### Step 3: Terminate Agent

On approval:
1. Agent notified of impending termination
2. Agent completes current work gracefully
3. Agent saves state/context if needed
4. Agent stopped and resources released
5. Agent unregistered from swarm
6. Roles released for reassignment

#### Step 4: Record in Registry

Successful termination recorded in **Termination Registry**:
- Documents agent removal
- Links to termination request
- Tracks who terminated it and why
- Provides audit trail

### Termination Registry

The termination registry **tracks all terminated agents**:

**Registry Entry Attributes**:
- **ID**: Unique registry entry identifier
- **Swarm ID**: Swarm the agent belonged to
- **Agent ID**: Identifier for the terminated agent
- **Agent Name**: Human-readable name
- **Agent Instance ID**: Specific instance (if applicable)
- **Termination Request ID**: Link to original request
- **Terminated By**: Who approved the termination
- **Reason**: Justification from termination request
- **Terminated At**: When the agent was terminated

**Registry Purposes**:
- **Audit**: Complete history of agent removal
- **Accountability**: Who terminated which agents and why
- **Analytics**: Termination patterns and reasons
- **Post-mortem**: Learn from termination decisions

## Request States

### Pending

Request **awaiting review**:
- Visible in request queue
- Awaiting decision from coordinator
- Can be approved or rejected

### Approved

Request **approved and executed**:
- Agent spawned or terminated
- Registry entry created
- Request marked complete

### Rejected

Request **denied, not executed**:
- Agent not spawned or terminated
- Rejection reason recorded
- Request marked complete

## Approval Authority

### Who Can Approve?

**Spawn Approval**:
- Swarm creator/owner
- Designated swarm coordinators
- Users with "spawn_agent" permission

**Termination Approval**:
- Swarm creator/owner
- Designated swarm coordinators
- Users with "terminate_agent" permission

### Approval Workflow

**Automatic Approval** (if configured):
- Requests auto-approved if capacity available
- No manual review needed
- Fast response time

**Manual Approval** (if configured):
- All requests reviewed by authority
- Decision based on swarm state and priorities
- More control, slower response

## Concurrent Agent Limits

Swarms can limit **how many agents run simultaneously**:

- **Max Concurrent Agents**: Configuration setting
- **Queueing**: Excess requests wait until capacity available
- **Priority**: Urgent spawn requests jump the queue
- **Termination Frees Capacity**: Terminated agents free slots for new spawns

**Example**:
- Swarm configured for max 5 concurrent agents
- 5 agents currently running
- New spawn request submitted → queued
- One agent terminates → queued spawn proceeds

## Graceful vs. Force Termination

### Graceful Termination (Preferred)

Agent **completes current work** first:
- Finishes in-progress task
- Saves state/context
- Hands off work if needed
- Clean shutdown

**Benefits**:
- No work lost
- Clean state transition
- Better for agent morale (metaphorically)

### Force Termination (Emergency)

Agent **stopped immediately**:
- No completion of current task
- Potential work loss
- Immediate resource release
- Used in emergencies only

**When to use**:
- Agent misbehaving or stuck
- Critical resource shortage
- Security incident
- Time-sensitive emergency

## Use Cases

### Spawn Scenarios

**Scale Up for Workload**:
- Large feature set needs parallel development
- Spawn multiple frontend developers
- Each works on different feature branch

**Specialized Expertise Needed**:
- Database optimization requires DBA
- Spawn "Database Administrator" agent
- Agent focuses on query optimization

**Replace Failed Agent**:
- Agent crashes or stops responding
- Spawn replacement with same role
- New agent takes over work

### Termination Scenarios

**Work Completed**:
- Agent finishes assigned tasks
- No more work for this role
- Terminate to free resources

**Agent Underperforming**:
- Agent not making progress
- Better agent available
- Terminate and spawn replacement

**Resource Constraints**:
- System at capacity
- Higher priority work needs resources
- Terminate lower-priority agents

**Cost Management**:
- Budget constraints
- Reduce agent count to control costs
- Terminate non-essential agents

## Best Practices

### Spawn Requests

**Provide clear justification**:
- Explain why this agent is needed
- Describe work the agent will do
- Estimate duration of need

**Set appropriate requirements**:
- Specify necessary capabilities
- Don't over-specify (limits qualified agents)
- Don't under-specify (unqualified agents apply)

**Consider alternatives**:
- Can existing agent handle this?
- Can agent take multiple roles?
- Is this really the best solution?

### Termination Requests

**Document reasons thoroughly**:
- Why is termination necessary?
- What work will be lost?
- Can work be saved or handed off?

**Plan for transition**:
- Who will take over the agent's work?
- What state needs to be preserved?
- Are downstream dependencies affected?

**Consider timing**:
- Don't terminate mid-critical-task
- Coordinate with other agents
- Choose natural pause points

### Registry Management

**Review registries regularly**:
- Look for spawn/termination patterns
- Identify frequently spawned/terminated roles
- Adjust swarm configuration based on insights

**Use for audits**:
- Track resource utilization over time
- Account for agent-related costs
- Verify appropriate approvals obtained

## Related Concepts

- [Swarm Overview](./overview.md) - Understanding swarms and agents
- [Role System](./role-system.md) - Roles for spawned agents
- [Swarm Configuration](./swarm-configuration.md) - Concurrent agent limits
- [Swarm Use Cases](./swarm-use-cases.md) - Lifecycle patterns in practice
