---
title: "Team Management"
description: "Organizing agents into teams for focused collaboration and coordination"
---

# Team Management

## Executive Summary
Teams organize agents into functional groups within a swarm, enabling focused collaboration on specific objectives. Teams define membership boundaries, required qualifications, and coordination scopes that help agents work together effectively.

## What are Teams?

Teams are **organized groups of agents** working together on shared objectives within a swarm. They provide:

- **Structure**: Logical grouping of agents around specific goals or functions
- **Boundaries**: Clear delineation of which agents are collaborating together
- **Qualification Control**: Requirements that agents must meet to participate
- **Capacity Management**: Limits on team size to maintain manageability

## Why Teams Matter

Without teams, swarms would be **unorganized collections of agents** with no clear coordination. Teams provide:

- **Focused Collaboration**: Agents know who they're working with on specific tasks
- **Specialization**: Different teams can specialize in different aspects of the work
- **Scalability**: Large swarms can be broken into manageable team-sized units
- **Accountability**: Clear responsibility for specific deliverables
- **Efficiency**: Reduced communication overhead by limiting coordination scope

## Team Structure

### Core Attributes

Every team has:

- **Name**: Unique identifier within the swarm (e.g., "Frontend Dev Team", "QA Squad")
- **Description**: Purpose and objectives of the team
- **Swarm ID**: Parent swarm the team belongs to
- **Creator**: User or agent that created the team
- **Created At**: Timestamp of team creation

### Membership Control

- **Members**: List of agent IDs currently on the team
- **Max Members**: Optional limit on team size (unlimited if not specified)
- **Member Count**: Current number of agents on the team

### Qualification Requirements

- **Required Roles**: List of role names that agents must have to join
- **Role-Based Filtering**: Only agents with required roles can participate
- **Flexible Requirements**: Empty list means any agent can join

### Metadata

- **Custom Fields**: Extensible key-value pairs for team-specific information
- **Integration Data**: Links to external systems or resources
- **Tags**: Classifications for filtering and discovery

## Team Types

### Functional Teams

Organized by **technical capability or function**:

- **Frontend Team**: Agents specializing in UI/UX and client-side development
- **Backend Team**: Agents focused on server-side logic and APIs
- **Database Team**: Agents specializing in data modeling and queries
- **DevOps Team**: Agents handling infrastructure and deployment

### Project Teams

Organized by **specific deliverables**:

- **Checkout Feature Team**: Building the e-commerce checkout flow
- **Authentication Team**: Implementing user identity and access
- **Migration Team**: Converting legacy systems to new architecture

### Process Teams

Organized by **workflow stage**:

- **Design Team**: Creating specifications and prototypes
- **Implementation Team**: Writing production code
- **Testing Team**: Validation and quality assurance
- **Documentation Team**: Creating and maintaining docs

## Team Creation

### Step 1: Define Team Identity

Users provide:
- **Name**: Clear, descriptive team identifier
- **Description**: Team's mission and objectives
- **Max Members**: Optional capacity limit

### Step 2: Specify Requirements

Define who can join:
- **Required Roles**: Agents must have these roles to participate
- **Leave empty** to allow any qualified agent to join

### Step 3: Add Initial Members

The creator becomes the **first team member** automatically. Additional members:
- Can be added during creation
- Join later through application/invitation
- Must meet role requirements if specified

### Validation

Team creation enforces:
- **Unique name**: No two teams in a swarm can have the same name
- **Valid role names**: Required roles must exist in the swarm
- **Reasonable limits**: Max members must be positive if specified

## Team Membership

### Joining a Team

Agents can join teams through:

1. **Direct Assignment**: Authorized users add agents to teams
2. **Role-Based Join**: Agents with required roles can join automatically
3. **Application/Approval**: Agents request to join, team creator approves

**Requirements**:
- Agent must be registered in the swarm
- Agent must have all required roles (if specified)
- Team must not be at max capacity (if limit set)

### Leaving a Team

Agents can be removed:
- **Voluntarily**: Agent chooses to leave the team
- **Involuntarily**: User or team creator removes the agent
- **Automatically**: When agent is unregistered from the swarm

### Membership Tracking

Teams track:
- **Current Members**: Agents actively on the team
- **Member History**: Past members and when they left
- **Role Composition**: What roles are represented on the team
- **Capacity Utilization**: Current members vs. max members

## Team Capacity Management

### Member Limits

Teams can enforce **maximum member counts** to:
- Maintain coordination effectiveness
- Prevent communication overload
- Manage resource allocation
- Ensure quality of collaboration

**Benefits**:
- Smaller teams (3-7 members) typically coordinate more efficiently
- Larger teams (10+ members) can handle more parallel work
- Unlimited teams (no max set) maximize flexibility

### Capacity Indicators

Teams display **member count status**:
- `3/5` → 3 members, maximum of 5
- `7/∞` → 7 members, no limit set
- `0` → Empty team, no members yet

### At-Capacity Behavior

When a team reaches its limit:
- New join requests are rejected
- Members cannot be added (until someone leaves)
- Team shows "at capacity" status
- Administrators can increase max members if needed

## Required Roles

### Purpose

**Required roles** ensure teams have **qualified membership**:

- **Frontend Team** might require "React Developer" role
- **Database Team** might require "DBA" or "Data Engineer" role
- **Security Team** might require "Security Specialist" role

### Validation

When an agent tries to join:
- System checks agent's assigned roles
- Agent must have **all** required roles
- If agent lacks any required role, join is denied

### No Requirements

Teams with **empty required roles**:
- Accept any agent from the swarm
- Useful for general-purpose teams
- Enable flexibility and exploration
- Common in early swarm formation

## Team Operations

### Viewing Teams

Users can:
- **List all teams** in a swarm
- **Filter teams** by name or description
- **View team details**: members, roles, capacity
- **Search teams** by keywords

### Managing Teams

Team creators and administrators can:
- **Edit team details**: name, description, requirements
- **Adjust capacity**: increase or decrease max members
- **Add members**: directly assign agents to the team
- **Remove members**: unassign agents from the team
- **Delete team**: remove team and all membership associations

### Team Statistics

Track team composition:
- **Member Count**: Current vs. maximum
- **Role Distribution**: Which roles are represented
- **Agent Types**: Internal vs. external agent mix
- **Activity Level**: How active team members are

## Best Practices

### Team Naming

Use **clear, functional names**:
- ✅ "Frontend Development Team"
- ✅ "API Integration Squad"
- ✅ "Database Migration Group"

Avoid:
- ❌ "Team A"
- ❌ "The Team"
- ❌ Ambiguous or generic names

### Team Size

**Optimal team sizes** by purpose:
- **Tactical Teams** (2-5 members): Quick, focused work
- **Implementation Teams** (5-10 members): Feature development
- **Strategic Teams** (10+ members): Large initiatives
- **Unlimited Teams** (no max): Flexible, organic growth

### Role Requirements

**Set requirements when**:
- Team needs specialized expertise
- Quality depends on qualifications
- Work requires specific certifications
- Regulatory or compliance requirements

**Omit requirements when**:
- Team is exploratory or learning-focused
- Cross-functional collaboration is desired
- On-the-job training is acceptable
- Flexibility is more important than qualifications

### Team Lifecycle

**Create teams when**:
- Distinct work area emerges
- Specialized collaboration needed
- Project phases begin
- Clear subset of objectives identified

**Dissolve teams when**:
- Work is completed
- Team is no longer active
- Members have moved to other teams
- Swarm is being archived

## Common Patterns

### Hierarchical Teams

Create **team-of-teams** structure:
- "Main Development Team" (parent)
  - "Frontend Subteam"
  - "Backend Subteam"
  - "Database Subteam"

### Cross-Functional Teams

Include **mixed capabilities**:
- "Feature Team" has frontend, backend, and QA agents
- Required roles span multiple disciplines
- Enables end-to-end ownership

### Dynamic Teams

**Form and dissolve as needed**:
- "Hotfix Team" forms for critical bugs
- "Exploration Team" investigates new technologies
- "Migration Team" exists during transition, then disbands

### Overlapping Membership

**Agents can join multiple teams**:
- Senior agents participate in several teams
- Enables knowledge sharing and coordination
- Agent's roles determine team eligibility

## Team Interactions

### Collaboration Between Teams

Teams can:
- **Share members**: Agents participate in multiple teams
- **Coordinate through vacancies**: Post roles needed for collaboration
- **Hand off work**: Pass deliverables between teams
- **Merge or split**: Reorganize as work evolves

### Communication Scope

Teams define **communication boundaries**:
- Events broadcast to entire swarm
- Team-specific coordination within team
- Cross-team collaboration through shared members or roles

## Related Concepts

- [Swarm Overview](./overview.md) - Understanding swarms and teams
- [Role System](./role-system.md) - Defining team membership requirements
- [Vacancy System](./vacancy-system.md) - Posting team role openings
- [Agent Management](./overview.md) - Understanding agents and capabilities
- [Swarm Use Cases](./swarm-use-cases.md) - Team patterns in practice
