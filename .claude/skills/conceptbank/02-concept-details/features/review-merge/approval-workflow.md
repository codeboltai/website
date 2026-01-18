---
title: "Approval Workflow"
description: "Multi-stage approval process for code changes in CodeBolt"
tags: ["approval", "workflow", "code-review", "policies", "agent-coordination"]
---

## Approval Workflow

### Executive Summary

The Approval Workflow system provides a flexible, multi-stage process for reviewing and approving code changes in CodeBolt. It supports both human and automated reviewers, configurable approval policies, and integrates seamlessly with the Merge Request system to ensure changes meet quality standards before being merged.

### What is the Approval Workflow?

The Approval Workflow is the governance layer that sits between code review and merge. It defines how changes get approved, who can approve them, and what conditions must be met before merging. Unlike simple review systems, the Approval Workflow supports complex approval scenarios with multiple reviewers, voting mechanisms, and policy-based enforcement.

**Key Benefits**

- **Quality Control**: Ensure changes meet standards before merging
- **Flexible Policies**: Configure approval requirements per project or team
- **Multi-Reviewer Support**: Gather approvals from multiple stakeholders
- **Automated Checks**: Integrate automated tests and checks into workflow
- **Audit Trail**: Complete record of who approved what and when
- **Agent Coordination**: Enable agents to participate in approval process

### Approval States

**Request Lifecycle**

Merge Requests progress through approval-related states:

- **Pending Review**: Created but not yet reviewed
- **In Review**: Being actively reviewed
- **Changes Requested**: Reviewer requested modifications
- **Approved**: Satisfies approval requirements
- **Review Completed**: All reviews finished, ready for merge decision
- **Rejected**: Failed approval requirements
- **Merged**: Approved and successfully merged
- **Closed**: Closed without merging

**Feedback Types**

Reviewers can provide three types of feedback that affect approval:

1. **Approve**
   - Positive signal for the change
   - Contributes to approval requirements
   - May enable merge (depending on policy)
   - Includes optional comment

2. **Request Changes**
   - Negative signal requiring action
   - Resets approval progress
   - Blocks merge until addressed
   - Requires agent to modify changes

3. **Comment**
   - Neutral feedback without decision
   - Does not affect approval status
   - Informational or suggestive
   - Preserves current approval state

### Approval Models

**Single Approver**

Simple model where one approval is sufficient:

- Any single approval enables merge
- Fastest approval workflow
- Suitable for low-risk changes
- Common in small teams

**Multiple Approvers**

Requires multiple approvals before merge:

- Configurable number of required approvals
- All approvals must be from different reviewers
- Self-approvals typically excluded
- Suitable for important changes

**Code Owner Approval**

Requires approval from code owners:

- Code owners defined by file path or directory
- Changes to specific areas require owner approval
- Supports multiple owners per area
- Ensures domain experts review relevant changes

**Role-Based Approval**

Approvals required based on roles:

- **Security Review**: Required for security-sensitive changes
- **Performance Review**: Required for performance-related changes
- **API Review**: Required for public API changes
- **Design Review**: Required for UI/UX changes

**Voting-Based Approval**

Collects votes from multiple reviewers:

- Approvals and rejections as votes
- Configurable voting rules (majority, unanimous, etc.)
- Tie-breaking mechanisms
- Useful for consensus-based teams

### Approval Policies

**Policy Configuration**

Approval policies define:

- **Required Approvers**: Number and type of approvals needed
- **File Path Rules**: Different rules for different areas
- **Change Size Rules**: Stricter rules for larger changes
- **Risk-Based Rules**: Stricter rules for higher-risk changes
- **Exemptions**: Specific scenarios that bypass normal rules

**Example Policy Structure**

```typescript
{
  defaultPolicy: {
    requiredApprovals: 1,
    allowSelfApproval: false
  },
  pathSpecific: [
    {
      path: "src/security/**",
      requiredApprovals: 2,
      requiredRoles: ["security-reviewer"]
    },
    {
      path: "src/api/**",
      requiredApprovals: 1,
      requiredRoles: ["api-reviewer"]
    }
  ],
  sizeBased: [
    {
      maxFiles: 5,
      requiredApprovals: 1
    },
    {
      minFiles: 6,
      maxFiles: 20,
      requiredApprovals: 2
    },
    {
      minFiles: 21,
      requiredApprovals: 3
    }
  ]
}
```

**Policy Enforcement**

- Policies applied when request created
- Requirements displayed to reviewers
- Merge blocked until requirements met
- Audit trail of policy checks

### Automated Approvals

**Automated Checks**

Systems can provide automated approvals:

- **Test Passes**: CI/CD tests passing
- **Lint Clean**: Code linting with no errors
- **Security Scan**: Security vulnerabilities check
- **Coverage**: Code coverage thresholds met
- **Performance**: Performance benchmarks satisfied

**Automated Approval Process**

```
1. Request Created/Updated
   ↓
2. Automated Checks Triggered
   ↓
3. Each Check Runs Independently
   ↓
4. Checks Report Pass/Fail
   ↓
5. Automated Approval/Rejection Added
   ↓
6. Approval Status Updated
   ↓
7. Merge Enabled/Blocked Based on Results
```

**Check Configuration**

```typescript
{
  automatedChecks: [
    {
      name: "CI Tests",
      type: "test",
      required: true,
      timeout: 1800
    },
    {
      name: "Security Scan",
      type: "security",
      required: true,
      timeout: 600
    },
    {
      name: "Code Coverage",
      type: "coverage",
      required: false,
      threshold: 80
    }
  ]
}
```

### Reviewer Assignment

**Manual Assignment**

- Request creator suggests reviewers
- Team lead assigns reviewers
- Reviewers self-assign to requests
- Code owners auto-assigned based on paths

**Automatic Assignment**

- Round-robin assignment to team members
- Load balancing based on current workload
- Expertise matching to change content
- Availability and time zone considerations

**Notification System**

- Email notifications when assigned
- WebSocket notifications for real-time updates
- Dashboard showing assigned reviews
- Reminder notifications for stale reviews

### Approval Process Flow

**Standard Flow**

```
1. Agent Creates Request
   ↓
2. Policy Applied, Requirements Calculated
   ↓
3. Reviewers Assigned
   ↓
4. Automated Checks Triggered
   ↓
5. Reviewers Review and Provide Feedback
   ├─ Approve: Counts toward requirements
   ├─ Request Changes: Resets progress
   └─ Comment: No status change
   ↓
6. When Requirements Met, Status = "Approved"
   ↓
7. Merge Enabled
   ↓
8. Request Merged
```

**Changes Requested Flow**

```
1. Reviewer Requests Changes
   ↓
2. Status Changes to "Changes Requested"
   ↓
3. Agent Notified of Required Changes
   ↓
4. Agent Makes Modifications
   ↓
5. Agent Updates Request
   ↓
6. Previous Reviews May Be Preserved or Cleared
   ↓
7. Review Cycle Restarts
   ↓
8. Process Repeats Until Approved or Rejected
```

**Rejection Flow**

```
1. Reviewer Provides Strong Negative Feedback
   ↓
2. Status Changes to "Rejected"
   ↓
3. Merge Blocked
   ↓
4. Agent May Address Issues and Re-submit
   ↓
5. New Request Created or Existing Reopened
   ↓
6. Approval Process Restarts
```

### Agent Participation

**Agent Reviewers**

Agents can participate in approval workflow:

- **Code Review Agents**: Automated code review
- **Test Agents**: Verify test coverage and quality
- **Security Agents**: Check for security issues
- **Performance Agents**: Assess performance impact

**Agent Approval Logic**

- Agents analyze changes using specialized knowledge
- Agents provide structured feedback
- Agent approvals count toward requirements
- Agent rejections include specific reasons

**Human-Agent Collaboration**

- Agents handle routine checks
- Humans focus on complex decisions
- Agents surface issues for human review
- Humans make final approval decisions

### Metrics and Tracking

**Approval Metrics**

Track approval workflow efficiency:

- **Average Approval Time**: Time from creation to approval
- **Review Cycle Time**: Time per review cycle
- **Changes Requested Rate**: Percentage requiring changes
- **Rejection Rate**: Percentage rejected
- **Reviewer Load**: Reviews per reviewer
- **Automated Check Pass Rate**: Percentage passing automated checks

**Quality Metrics**

Measure quality of approved changes:

- **Post-Merge Defects**: Issues found after merge
- **Rollback Rate**: Percentage of merges rolled back
- **Review Thoroughness**: Lines reviewed per approval
- **Comment Density**: Comments per review

**Process Metrics**

Assess workflow health:

- **Stale Reviews**: Reviews aging without action
- **Bottleneck Identification**: Slowest approval stages
- **Policy Violations**: Requests bypassing policy
- **Reviewer Availability**: Active reviewers over time

### Configuration

**Service Setup**

```typescript
// Initialize approval service
await approvalService.initialize(projectPath);

// Configure policies
await approvalService.updatePolicy({
  requiredApprovals: 2,
  allowSelfApproval: false,
  pathSpecificRules: [...]
});

// Configure automated checks
await approvalService.configureChecks([
  { name: "CI Tests", type: "test", required: true },
  { name: "Security Scan", type: "security", required: true }
]);
```

**Policy Management**

```typescript
// Add path-specific rule
await approvalService.addPathRule({
  path: "src/api/**",
  requiredApprovals: 2,
  requiredRoles: ["api-reviewer"]
});

// Add reviewer
await approvalService.addReviewer({
  agentId: "agent-123",
  roles: ["api-reviewer", "security-reviewer"]
});
```

### Best Practices

**Policy Design**

- **Start Simple**: Begin with basic policies, add complexity as needed
- **Clear Requirements**: Make approval criteria explicit and visible
- **Regular Review**: Periodically review and update policies
- **Team Input**: Involve team in policy creation
- **Flexibility**: Allow policy exemptions for special cases

**Review Guidelines**

- **Timely Reviews**: Review requests promptly
- **Constructive Feedback**: Provide actionable, specific feedback
- **Context Awareness**: Understand the purpose of changes
- **Thoroughness**: Review all changes, not just code
- **Follow-Up**: Address re-reviews quickly

**Agent Integration**

- **Clear Role**: Define agent responsibilities clearly
- **Human Override**: Always allow human to override agent
- **Transparency**: Make agent reasoning visible
- **Learning**: Use approval outcomes to train agents
- **Fallback**: Have human backup for agent failures

### Troubleshooting

**Approval Not Granted**

- Verify approval requirements are met
- Check for policy violations
- Ensure reviewers are authorized
- Review automated check results
- Confirm no blocks on merge

**Stale Reviews**

- Send reminder notifications
- Reassign to different reviewers
- Escalate to team lead
- Consider policy adjustment
- Review reviewer workload

**Automated Check Failures**

- Review check logs
- Verify check configuration
- Check for environment issues
- Retry failed checks
- Update check thresholds if needed

**Policy Conflicts**

- Resolve conflicting rules
- Establish rule precedence
- Document policy decisions
- Test policy changes
- Communicate changes to team

### Use Cases

**Primary Use Cases**

1. **Quality Assurance**: Ensure code quality before merging
2. **Compliance**: Meet regulatory or organizational requirements
3. **Knowledge Sharing**: Spread knowledge through reviews
4. **Mentorship**: Train junior developers through review
5. **Risk Management**: Mitigate risks of bad changes

**Secondary Use Cases**

1. **Documentation**: Reviews document change rationale
2. **Team Coordination**: Coordinate team activities
3. **Performance Tracking**: Track individual and team metrics
4. **Process Improvement**: Identify and fix process issues
5. **Audit Trail**: Maintain compliance records

### Related Concepts

- **[Merge Requests](./merge-requests.md)**: Request lifecycle and management
- **[Code Review System](./review-system.md)**: File-level review workflow
- **[Feedback System](./feedback-system.md)**: Collecting and using feedback
- **[Coordination Signals](./coordination-signals.md)**: Pheromones for reviewer coordination
- **[Agent Roles](../agent-management/agent-roles.md)**: Defining agent responsibilities
- **[Policy Engine](../development-tools/policy-engine.md)**: Configurable policy system

### Future Enhancements

**Planned Features**

- **Dynamic Policies**: Policies that adapt based on outcomes
- **Machine Learning**: Learn approval patterns and suggest reviewers
- **Integration Hub**: Connect to external approval systems
- **Mobile Support**: Mobile app for reviewing on-the-go
- **Review Templates**: Standardized review checklists
- **Smart Notifications**: Intelligent notification routing
- **Approval Analytics**: Advanced dashboards and insights
- **Cross-Project Policies**: Policies spanning multiple projects
- **Time-Based Rules**: Different policies for different times
- **Escalation Workflows**: Automatic escalation for stalled reviews
