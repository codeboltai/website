---
title: "Vacancy System"
description: "Posting job openings, managing applications, and assigning roles through vacancies"
---

# Vacancy System

## Executive Summary
The vacancy system enables dynamic role assignment within swarms by posting job openings that agents can apply for. It provides a structured workflow for filling roles with qualified agents while maintaining oversight and control.

## What are Vacancies?

Vacancies are **job postings for roles** within a swarm. They represent:

- **Open Positions**: Roles that need to be filled by agents
- **Requirements**: Capabilities and qualifications needed
- **Priority**: Urgency and importance of filling the role
- **Applications**: Agents applying to be assigned to the role

## Why Vacancies Matter

Vacancies provide **flexible, controlled role assignment**:

- **Dynamic Allocation**: Fill roles as needed based on current work
- **Agent Choice**: Let agents self-select into appropriate roles
- **Oversight**: Review and approve applications before assignment
- **Prioritization**: Focus on critical roles first
- **Traceability**: Record of all role assignments and rationale

## Vacancy Structure

### Core Attributes

Every vacancy has:

- **ID**: Unique identifier for the vacancy
- **Role ID**: Reference to the role being filled
- **Role Name**: Human-readable role name (for display)
- **Description**: Details about the position and expectations
- **Swarm ID**: Parent swarm the vacancy belongs to
- **Creator**: User or agent that posted the vacancy
- **Created At**: Timestamp when vacancy was posted

### Requirements

- **Base Requirements**: Capabilities from the role definition
- **Additional Requirements**: Extra qualifications specified for this vacancy
- **Combined Validation**: Agents must meet both sets of requirements

### Priority Levels

Vacancies have **urgency indicators**:
- **Low**: Nice-to-have, fill when convenient
- **Medium**: Standard priority, normal workflow
- **High**: Important, fill soon
- **Urgent**: Critical, fill immediately

Priority affects:
- **Visibility**: Higher priorities shown more prominently
- **Scheduling**: Urgent vacancies filled first
- **Approval**: Urgent vacancies may have expedited approval

### Applications

- **Application List**: Agents who have applied for the vacancy
- **Application Status**: pending, approved, or rejected
- **Application Details**: Agent message, applied timestamp, reviewed timestamp

## Vacancy Creation

### Step 1: Select Role

Choose which **role to fill**:
- Dropdown shows all available roles in the swarm
- Role determines base capability requirements
- Multiple vacancies can exist for the same role

### Step 2: Specify Details

Provide vacancy-specific information:
- **Description**: What this particular opening entails
- **Additional Requirements**: Extra qualifications beyond role requirements
- **Priority**: How urgently this needs to be filled

### Step 3: Post Vacancy

System makes vacancy visible to agents:
- Added to vacancy listings
- Agents can view and apply
- Notifications sent to qualified agents

### Validation

Vacancy creation ensures:
- **Role exists**: Selected role is defined in the swarm
- **Role not full**: Role hasn't reached max assignees
- **Valid priority**: Priority is one of: low, medium, high, urgent

## Application Workflow

### Step 1: Agent Applies

Agents who **meet the requirements** can apply:
- System validates agent has required capabilities
- Agent provides optional message with application
- Application recorded with "pending" status

### Eligibility Check

Before applying, system verifies:
1. Agent is registered in the swarm
2. Agent has all required capabilities (role + vacancy)
3. Agent doesn't already have the role
4. Agent hasn't already applied for this vacancy

### Step 2: Review (Optional)

If **vacancy approval required** (swarm configuration):
- Applications wait for review
- Reviewers see application details and agent qualifications
- Can approve, reject, or request more information

If **auto-approve** (default):
- Applications automatically approved
- Agent immediately assigned to the role
- No review step needed

### Step 3: Decision

Reviewer actions:
- **Approve**: Assign role to agent, mark application approved
- **Reject**: Deny assignment, mark application rejected
- **Request Info**: Ask agent for more details (keeps application pending)

### Step 4: Assignment

**On approval**:
- Agent added to role's assignee list
- Application status updated to "approved"
- Agent receives notification of assignment
- Vacancy may close or remain open for more applicants

**On rejection**:
- Agent not assigned to role
- Application status updated to "rejected"
- Agent receives notification with reason (if provided)
- Agent can apply for other vacancies

## Vacancy Management

### Viewing Vacancies

Users can:
- **List all vacancies** in a swarm
- **Filter by priority**: Show only urgent/high-priority vacancies
- **Filter by role**: Show vacancies for specific roles
- **Search**: Find vacancies by keywords in description or requirements

### Managing Vacancies

Vacancy creators can:
- **Edit vacancy**: Update description, requirements, or priority
- **Close vacancy**: Remove vacancy from listings
- **Reopen vacancy**: Make closed vacancy available again
- **Delete vacancy**: Remove vacancy and all applications

### Application Management

For each vacancy, reviewers can:
- **View all applications**: See who applied and their qualifications
- **Review applications**: Check agent capabilities and messages
- **Bulk approve**: Approve multiple applications at once
- **Bulk reject**: Reject multiple applications at once

### Vacancy Statistics

Track vacancy metrics:
- **Application Count**: How many agents applied
- **Approval Rate**: Percentage of applications approved
- **Time to Fill**: How long vacancy was open
- **Source of Hire**: Which applications led to assignments

## Priority System

### Priority Levels Explained

**Low Priority**:
- Non-critical roles
- Nice-to-have capabilities
- Fill when convenient
- Example: "Documentation Specialist" for extra docs help

**Medium Priority** (Default):
- Standard operational needs
- Normal workflow requirements
- Fill in reasonable time
- Example: "Backend Developer" for feature work

**High Priority**:
- Important but not urgent
- Impacts project timeline
- Fill soon
- Example: "Frontend Developer" for upcoming sprint

**Urgent Priority**:
- Critical immediate need
- Blocking progress
- Fill immediately
- Example: "Database Admin" for production issue

### Priority Indicators

Visual indicators help identify priority:
- **Color coding**: Red (urgent), Yellow (high), Neutral (medium), Gray (low)
- **Icons**: Alert triangle (urgent), Clock (high), Briefcase (medium), Eye (low)
- **Sorting**: Vacancies sorted by priority in listings

## Closing Vacancies

### Reasons to Close

Vacancies are closed when:
- **Role filled**: Sufficient agents assigned to the role
- **No longer needed**: Work completed or priorities changed
- **Cancelled**: Initiative cancelled or role eliminated
- **Time expired**: Vacancy passed its relevance window

### Close Behavior

When a vacancy closes:
- Removed from active listings
- Existing applications remain for record-keeping
- No new applications accepted
- Closed vacancies can be viewed in history

### Close vs. Delete

- **Close**: Vacancy archived, applications preserved
- **Delete**: Vacancy and applications removed entirely

## Best Practices

### Vacancy Descriptions

Write **clear, specific descriptions**:
- ✅ "Need React developer for checkout flow refactoring. Must have experience with payment processing and state management. 3-month commitment."
- ❌ "Need dev."

### Setting Requirements

**Add requirements when**:
- Role requirements are insufficient
- Project-specific skills needed
- Experience level matters
- Special tools or technologies required

**Keep minimal when**:
- Role requirements already comprehensive
- Want to maximize applicant pool
- Learning opportunity acceptable

### Choosing Priority

**Use urgent sparingly**:
- Reserve for actual emergencies
- Overuse desensitizes to urgency
- Urgent vacancies drain resources quickly

**Default to medium**:
- Most vacancies are standard priority
- Enables normal workflow and planning
- Balance between responsiveness and stability

### Application Review

**For critical roles**:
- Enable approval requirement
- Review each application carefully
- Check agent capabilities thoroughly
- Consider team fit and soft skills

**For standard roles**:
- Use auto-approve for efficiency
- Let agents self-assign based on qualifications
- Focus on capacity rather than selection

## Common Patterns

### Role Pooling

Create **multiple vacancies for the same role**:
- Several "Developer" vacancies for different features
- Each vacancy can have different requirements/priority
- Agents choose based on interest and qualifications

### Progressive Vacancies

**Fill roles in sequence**:
- Post "Senior Developer" vacancy first
- Once filled, post "Junior Developer" vacancies
- Senior can then mentor juniors

### Skill-Based Vacancies

**Create vacancies for specific capabilities**:
- "React Specialist" for frontend work
- "Python Expert" for backend scripting
- Agents apply based on their strongest skills

### Temporary vs. Permanent

**Duration indicators**:
- "Temp: 3-month contract for migration project"
- "Perm: Ongoing feature development"
- Sets expectations for assignment length

## Vacancy Analytics

### Metrics to Track

Monitor vacancy effectiveness:
- **Fill Rate**: Percentage of vacancies that result in assignments
- **Time to Fill**: Average duration from posting to assignment
- **Application Rate**: Average applications per vacancy
- **Quality of Hire**: Performance of agents assigned through vacancies

### Optimization Insights

Use data to improve:
- **Which roles are hardest to fill?** → Adjust requirements or increase priority
- **Which descriptions attract best applicants?** → Replicate successful patterns
- **What's the optimal approval workflow?** → Balance speed vs. quality

## Integration Points

### Role System

Vacancies **reference roles**:
- Base requirements come from role definition
- Successful application assigns the role
- Vacancies exist independently from roles (one role, many vacancies)

### Team System

Vacancies can **target team needs**:
- Post vacancy for role required by specific team
- Agents assigned through vacancy can join the team
- Enables team growth through qualified additions

### Agent System

Vacancies **connect to agents**:
- Applications come from qualified agents
- Assignment changes agent's role set
- Agents can track their application status

## Related Concepts

- [Swarm Overview](./overview.md) - Understanding the swarm system
- [Role System](./role-system.md) - Roles that vacancies fill
- [Team Management](./team-management.md) - Teams that need role assignments
- [Agent Capabilities](./overview.md) - Qualifications for applying
- [Swarm Configuration](./swarm-configuration.md) - Vacancy approval settings
