---
title: "Role System"
description: "Defining agent responsibilities, capabilities, and permissions through roles"
---

# Role System

## Executive Summary
Roles define what agents can do, what they're qualified to do, and what permissions they have within a swarm. The role system enables specialization, access control, and clear responsibility boundaries for multi-agent collaboration.

## What are Roles?

Roles are **collections of capabilities and permissions** that define an agent's function and authority within a swarm. Each role specifies:

- **Required Capabilities**: Skills and knowledge agents must possess
- **Permissions**: Actions agents with the role are allowed to perform
- **Assignment Limits**: Maximum number of agents that can hold the role
- **Assignees**: Current agents assigned to the role

## Why Roles Matter

Roles provide the **organizational structure** that makes swarms effective:

- **Specialization**: Different agents excel at different tasks
- **Quality Control**: Ensure qualified agents handle specialized work
- **Access Control**: Permissions limit what agents can do
- **Responsibility Clarity**: Clear assignment of accountability
- **Capacity Management**: Control how many agents can fill each role

## Role Structure

### Core Attributes

Every role has:

- **Name**: Unique identifier within the swarm (e.g., "Frontend Developer", "DBA")
- **Description**: Purpose and responsibilities of the role
- **Swarm ID**: Parent swarm the role belongs to
- **Creator**: User or agent that created the role
- **Created At**: Timestamp of role creation

### Capability Requirements

- **Required Capabilities**: List of capabilities agents must have
- **Validation**: Agents must possess all required capabilities to be assigned
- **Capability Matching**: System verifies agent capabilities against role requirements

### Assignment Control

- **Max Assignees**: Optional limit on how many agents can hold the role
- **Current Assignees**: Agents currently assigned to the role
- **Assignment Tracking**: History of who held the role and when

### Permissions

- **Permission List**: Actions agents with the role can perform
- **Authorization**: Permissions checked before allowing operations
- **Granular Control**: Fine-grained permissions for different actions

### Metadata

- **Custom Fields**: Extensible data for role-specific information
- **Documentation**: Links to guidelines or SOPs
- **Tags**: Classification for filtering and discovery

## Capabilities

### What are Capabilities?

**Capabilities** represent skills, knowledge, or qualifications that agents possess:

- **Technical Skills**: "React", "Python", "SQL", "Docker"
- **Domain Knowledge**: "E-commerce", "Healthcare", "Finance"
- **Certifications**: "AWS Certified", "CISSP", "Scrum Master"
- **Experience Levels**: "Senior Developer", "Junior Developer"

### Capability Requirements

Roles specify **which capabilities are required**:

```typescript
role: {
  name: "Senior Backend Developer",
  requiredCapabilities: [
    "Node.js",
    "TypeScript",
    "API Design",
    "Database Design",
    "Testing",
    "5+ years experience"
  ]
}
```

### Validation Logic

When assigning a role to an agent:
1. System retrieves agent's capabilities
2. System retrieves role's required capabilities
3. System verifies agent has **all** required capabilities
4. Assignment succeeds only if validation passes

**Example**:
- Role requires: ["React", "TypeScript", "Testing"]
- Agent has: ["React", "TypeScript", "Testing", "Git"]
- ✅ **Assignment allowed** - agent has all required capabilities

- Role requires: ["Python", "Django", "PostgreSQL"]
- Agent has: ["Python", "Flask", "MySQL"]
- ❌ **Assignment denied** - agent lacks Django and PostgreSQL

## Permissions

### What are Permissions?

**Permissions** authorize agents to perform specific actions:

- **System Actions**: "spawn_agent", "terminate_agent", "create_team"
- **Data Access**: "read_codebase", "write_database", "access_secrets"
- **Communication**: "send_messages", "broadcast_events"
- **Configuration**: "modify_swarm_config", "assign_roles"

### Permission Examples

```typescript
role: {
  name: "Team Lead",
  permissions: [
    "assign_roles",
    "remove_team_members",
    "approve_vacancies",
    "modify_team_config"
  ]
}

role: {
  name: "Developer",
  permissions: [
    "read_codebase",
    "write_code",
    "create_pull_requests",
    "view_team_members"
  ]
}

role: {
  name: "Viewer",
  permissions: [
    "read_codebase",
    "view_team_members",
    "view_swarm_status"
  ]
}
```

### Permission Checking

Before an agent performs an action:
1. System retrieves agent's assigned roles
2. System collects all permissions from those roles
3. System checks if required permission is in the set
4. Action proceeds only if permission is found

**Permission accumulation**: Agents get **union of all permissions** from their roles.

## Role Assignment

### Assigning Roles

Users can assign roles to agents:
- **Direct Assignment**: Administrators assign roles directly
- **Vacancy-Based**: Agents apply for roles through vacancies
- **Self-Assignment**: Agents assign themselves (if allowed by swarm config)

### Assignment Limits

Roles can have **maximum assignee limits**:
- **Unlimited**: No limit set (default)
- **Limited**: Maximum number of agents specified
- **Indicators**: Display "3/5" (3 assigned, max 5)

**When limit is reached**:
- New assignments are blocked
- Role shows "at capacity" status
- Administrators can increase limit if needed

### Assignment Tracking

Roles track:
- **Current Assignees**: Agents currently holding the role
- **Assignment History**: Past assignees and when they were unassigned
- **Utilization**: Current assignees vs. max assignees

## Role Types

### Technical Roles

Based on **technical expertise**:
- "Frontend Developer": React, Vue, Angular, CSS
- "Backend Developer": Node.js, Python, Go, API design
- "Database Administrator": SQL, database optimization, backups
- "DevOps Engineer": Docker, Kubernetes, CI/CD

### Functional Roles

Based on **job function**:
- "Developer": Writes and modifies code
- "Tester": Creates and runs tests
- "Designer": Creates UI/UX designs
- "Documentation": Writes and maintains docs

### Hierarchical Roles

Based on **authority level**:
- "Junior Developer": Limited permissions, learning-focused
- "Senior Developer": Full permissions, mentoring allowed
- "Team Lead": Additional permissions for team management
- "Architect": Strategic permissions for design decisions

### Process Roles

Based on **workflow stage**:
- "Code Reviewer": Reviews and approves pull requests
- "Release Manager": Handles deployments and releases
- "Security Auditor": Reviews code for security issues

## Role Creation

### Step 1: Define Role Identity

Users provide:
- **Name**: Unique, descriptive role identifier
- **Description**: Role's purpose and responsibilities

### Step 2: Specify Requirements

Define qualifications:
- **Required Capabilities**: List of necessary capabilities
- **Leave empty** to create a role with no requirements

### Step 3: Set Permissions

Define what agents can do:
- **Permission List**: Actions this role authorizes
- **Leave empty** for a role with no special permissions

### Step 4: Configure Limits

Optionally set:
- **Max Assignees**: How many agents can hold this role
- **Leave unset** for unlimited assignees

### Validation

Role creation enforces:
- **Unique name**: No two roles in a swarm can have the same name
- **Valid capabilities**: Required capabilities must exist in the system
- **Valid permissions**: Permissions must be recognized actions

## Role Operations

### Viewing Roles

Users can:
- **List all roles** in a swarm
- **Filter roles** by name or capability requirements
- **View role details**: permissions, assignees, limits
- **Search roles** by keywords

### Managing Roles

Role creators can:
- **Edit role details**: name, description, requirements
- **Adjust limits**: increase or decrease max assignees
- **Add permissions**: grant additional permissions
- **Remove permissions**: revoke specific permissions
- **Delete role**: remove role and all assignments

### Role Statistics

Track role utilization:
- **Assignee Count**: Current vs. maximum
- **Capability Coverage**: Which capabilities are most required
- **Agent Eligibility**: How many agents qualify for the role
- **Assignment History**: Turnover and assignment patterns

## Best Practices

### Role Naming

Use **clear, standard names**:
- ✅ "Senior React Developer"
- ✅ "Database Administrator"
- ✅ "QA Engineer"

Avoid:
- ❌ "Dev1"
- ❌ "The Good Role"
- ❌ Ambiguous or non-standard names

### Capability Requirements

**Set requirements when**:
- Role needs specialized expertise
- Quality depends on specific skills
- Safety or security requires proven qualifications
- Regulatory compliance mandates capabilities

**Omit requirements when**:
- Role is for learning or training
- On-the-job skill development is expected
- General-purpose assistance is needed

### Permission Granularity

**Principle of least privilege**:
- Grant only permissions needed for the role
- Start with minimal permissions, add as needed
- Remove permissions when no longer required
- Regularly audit and adjust permissions

### Role Granularity

**Balance between specificity and flexibility**:
- **Too specific**: "React Developer for Checkout Page" (overly narrow)
- **Too general**: "Developer" (lacks clarity)
- **Just right**: "Frontend Developer" (clear and useful)

## Common Patterns

### Progressive Roles

**Hierarchy of increasing responsibility**:
- "Junior Developer" → "Developer" → "Senior Developer" → "Tech Lead"
Each level adds capabilities and permissions.

### Cross-Functional Roles

**Mixed capability requirements**:
- "Full Stack Developer" requires: ["React", "Node.js", "Database"]
Enables agents to work across multiple domains.

### T-Shaped Roles

**Deep expertise in one area, broad in others**:
- "Backend Specialist" requires: ["Python", "Django", "API Design", "Basic React"]
Primary specialization plus secondary skills.

### Dynamic Roles

**Created for specific initiatives**:
- "Migration Specialist" for database migration project
- "Security Auditor" for security review phase
Roles dissolve when project completes.

## Role Interactions

### Multiple Role Assignment

**Agents can hold multiple roles**:
- Agent assigned to both "Developer" and "Code Reviewer" roles
- Accumulates permissions from all roles
- Must meet requirements for each role independently

### Role-Based Team Membership

**Teams can require specific roles**:
- "Frontend Team" requires "Frontend Developer" role
- Only agents with that role can join
- Enables qualification-based team formation

### Vacancy Integration

**Roles connect to vacancy system**:
- Create vacancy for a specific role
- Agents apply if they meet role requirements
- Successful application assigns the role to the agent

## Related Concepts

- [Swarm Overview](./overview.md) - Understanding swarms and roles
- [Team Management](./team-management.md) - Using roles for team qualification
- [Vacancy System](./vacancy-system.md) - Posting role vacancies
- [Agent Capabilities](./overview.md) - Understanding agent qualifications
- [Swarm Configuration](./swarm-configuration.md) - Role assignment policies
