---
title: "Review Feedback System"
description: "Collecting, managing, and acting on code review feedback in CodeBolt"
tags: ["feedback", "code-review", "agent-learning", "quality-improvement"]
---

## Review Feedback System

### Executive Summary

The Review Feedback System is the communication layer that enables reviewers to provide structured feedback on code changes, track discussion threads, and ensure feedback is addressed before merging. It supports both human and automated reviewers, enables threaded discussions, and integrates with agent learning systems to continuously improve code quality.

### What is the Feedback System?

The Feedback System manages all communication around code review, including:

- **Structured Feedback**: Typed feedback (approve, request changes, comment)
- **Discussion Threads**: Nested conversations on specific changes
- **Feedback Resolution**: Tracking which feedback has been addressed
- **Agent Learning**: Using feedback patterns to train agents
- **Notification System**: Alerting relevant parties to new feedback
- **Historical Analysis**: Learning from feedback trends over time

**Key Benefits**

- **Clear Communication**: Structured feedback prevents misunderstandings
- **Actionable Insights**: Feedback directly links to specific code
- **Learning Opportunities**: Agents learn from reviewer feedback
- **Quality Improvement**: Patterns in feedback drive process improvements
- **Accountability**: Track who said what and when
- **Decision Rationale**: Preserve reasoning behind approval decisions

### Feedback Types

**Approve**

Positive feedback signaling approval:

- **Purpose**: Indicate changes are satisfactory
- **Effect**: Contributes to approval requirements
- **Optional Comment**: Explain why changes are good
- **Merge Impact**: May enable merge (depending on policy)
- **Agent Learning**: Positive reinforcement for good patterns

**Request Changes**

Negative feedback requiring action:

- **Purpose**: Identify issues that must be fixed
- **Effect**: Blocks merge until addressed
- **Required Comment**: Explain what needs to change
- **Status Change**: Updates request to "changes_requested"
- **Agent Learning**: Negative feedback for pattern avoidance

**Comment**

Neutral feedback without decision:

- **Purpose**: Provide information or suggestions
- **Effect**: Does not change approval status
- **Optional**: Can include questions, ideas, or observations
- **Thread Starter**: Often begins discussion threads
- **Agent Learning**: Nuanced feedback for behavior tuning

### Feedback Structure

**Core Feedback Data**

Each feedback entry contains:

```typescript
{
  id: string,                    // Unique feedback ID
  agentId: string,               // Reviewer's agent ID
  agentName: string,             // Reviewer's display name
  type: 'approve' | 'request_changes' | 'comment',
  comment: string,               // Feedback text
  createdAt: string,             // ISO timestamp
  resolved?: boolean,            // Whether feedback addressed
  resolvedAt?: string,           // When resolved
  resolvedBy?: string,           // Who resolved it
  parentId?: string,             // For threaded discussions
  replies?: FeedbackEntry[]      // Nested replies
}
```

**Enriched Metadata**

Additional context for feedback:

- **Hunk Reference**: Which hunk feedback applies to (for code reviews)
- **File Reference**: Which file feedback applies to
- **Line Reference**: Specific line numbers (for inline comments)
- **Issue Type**: Category of issue (bug, style, security, etc.)
- **Severity**: Impact level (critical, major, minor)
- **Suggestion**: Proposed solution or alternative
- **References**: Links to related docs, issues, or standards

### Threaded Discussions

**Conversation Threads**

Feedback can have nested replies:

```
Parent Comment
├─ Reply 1
│  └─ Reply 1.1
└─ Reply 2
   ├─ Reply 2.1
   └─ Reply 2.2
```

**Thread Benefits**

- **Context Preservation**: Keep related discussion together
- **Focused Conversation**: Reply to specific points
- **Multiple Topics**: Discuss different aspects separately
- **Historical Record**: Complete discussion preserved

**Thread Operations**

- **Reply to Comment**: Add nested response
- **Edit Comment**: Modify own comments (if not resolved)
- **Resolve Thread**: Mark entire thread as resolved
- **Reopen Thread**: Unresolve if new issues discovered
- **Collapse/Expand**: Manage UI for long threads

### Feedback Resolution

**Resolution States**

- **Unresolved**: Feedback awaiting action
- **Addressed**: Changes made to address feedback
- **Acknowledged**: Feedback noted but no action needed
- **Deferred**: Feedback to be addressed later
- **Rejected**: Feedback declined with rationale

**Resolution Workflow**

```
1. Reviewer Provides Feedback
   ↓
2. Feedback Marked "Unresolved"
   ↓
3. Agent or Author Addresses Feedback
   ↓
4. Changes Made or Response Provided
   ↓
5. Feedback Marked "Addressed"
   ↓
6. Reviewer Verifies Resolution
   ↓
7. Thread Resolved or Reopened
```

**Bulk Resolution**

- **Resolve All**: Mark all feedback as addressed
- **Resolve by Type**: Resolve all comments of certain type
- **Resolve by Reviewer**: Resolve all from specific reviewer
- **Conditional Resolve**: Resolve only if criteria met

### Agent Learning Integration

**Feedback Patterns**

System analyzes feedback to learn patterns:

- **Common Issues**: Frequently cited problems
- **Style Preferences**: Team coding style preferences
- **Review Hotspots**: Files or areas needing more review
- **Agent Weaknesses**: Specific agent recurring issues
- **Best Practices**: Examples of good changes

**Agent Training**

Feedback used to improve agents:

- **Positive Reinforcement**: Approvals reinforce good patterns
- **Negative Feedback**: Change requests guide behavior away
- **Pattern Recognition**: Learn what triggers certain feedback
- **Style Adaptation**: Adjust to team preferences
- **Error Avoidance**: Learn from commonly cited issues

**Learning Feedback Loop**

```
Agent Makes Changes
   ↓
Reviewers Provide Feedback
   ↓
System Analyzes Feedback Patterns
   ↓
Agent Models Updated
   ↓
Future Changes Improved
   ↓
Cycle Repeats
```

**Feedback Categorization**

System categorizes feedback for learning:

- **Correctness**: Bugs, logic errors, edge cases
- **Style**: Formatting, naming, conventions
- **Performance**: Efficiency, optimization
- **Security**: Vulnerabilities, best practices
- **Maintainability**: Readability, documentation
- **Testing**: Test coverage, test quality
- **Architecture**: Design patterns, structure

### Notification System

**Real-Time Notifications**

Immediate notifications for:

- **New Feedback**: Reviewer added feedback
- **Replies**: Someone replied to comment
- **Resolution**: Feedback marked resolved
- **Mentions**: Someone @mentioned in comment
- **Status Changes**: Request status changed

**Notification Channels**

- **WebSocket**: Real-time push to active UI
- **Email**: Digest for inactive users
- **Dashboard**: Aggregate view of notifications
- **Mobile**: Push notifications for urgent feedback

**Notification Preferences**

Users can configure:

- **Immediate vs Digest**: Real-time or batched notifications
- **Feedback Types**: Which types trigger notifications
- **Request Relevance**: Only notifications for relevant requests
- **Quiet Hours**: Mute notifications during specific times
- **Mention Priority**: Higher priority for @mentions

### Feedback Analytics

**Individual Metrics**

Track per-reviewer:

- **Reviews Given**: Total number of reviews
- **Approval Rate**: Percentage of approvals vs rejections
- **Feedback Detail**: Average comment length
- **Response Time**: Average time to provide feedback
- **Resolution Rate**: Percentage of their feedback resolved
- **Helpful Votes**: How often others found feedback helpful

**Team Metrics**

Track team-level patterns:

- **Feedback Volume**: Total feedback over time
- **Common Issues**: Most frequent feedback categories
- **Review Coverage**: Percentage of changes reviewed
- **Cycle Time**: Average time from request to approval
- **Rejection Rate**: Percentage of requests rejected
- **Discussion Depth**: Average thread depth

**Quality Metrics**

Assess feedback quality:

- **Actionability**: How often feedback leads to changes
- **Specificity**: How specific feedback comments are
- **Clarity**: How well feedback is understood
- **Helpfulness**: Ratings of feedback usefulness
- **Consistency**: Agreement between reviewers

### Feedback Templates

**Standardized Feedback**

Templates for common feedback:

```typescript
// Bug Report Template
{
  type: 'request_changes',
  category: 'bug',
  template: {
    summary: 'Bug identified',
    description: 'Describe the bug...',
    reproduction: 'Steps to reproduce...',
    expected: 'Expected behavior...',
    actual: 'Actual behavior...'
  }
}

// Style Issue Template
{
  type: 'request_changes',
  category: 'style',
  template: {
    guideline: 'Style guideline reference',
    violation: 'Specific violation...',
    correction: 'Suggested correction...'
  }
}
```

**Custom Templates**

Teams can create custom templates:

- **Language-Specific**: Templates for different languages
- **Framework-Specific**: Templates for specific frameworks
- **Domain-Specific**: Templates for specific domains
- **Role-Specific**: Templates for different reviewer roles

### Best Practices

**For Reviewers**

- **Be Specific**: Reference exact lines or code
- **Be Constructive**: Explain why and suggest how to fix
- **Be Timely**: Provide feedback promptly
- **Be Respectful**: Maintain professional tone
- **Be Thorough**: Review all aspects of change
- **Follow Up**: Re-review after changes made

**For Agents**

- **Acknowledge Feedback**: Show understanding of issues
- **Address All Points**: Respond to every piece of feedback
- **Ask Questions**: Clarify unclear feedback
- **Learn Patterns**: Use feedback to improve future work
- **Document Changes**: Explain how feedback addressed
- **Re-Request Review**: Promptly re-submit after changes

**For Team Leads**

- **Set Guidelines**: Establish feedback standards
- **Train Team**: Teach effective review techniques
- **Monitor Quality**: Track feedback quality metrics
- **Address Issues**: Coach team members on feedback
- **Celebrate Success**: Highlight good feedback examples
- **Iterate Process**: Continuously improve feedback process

### Feedback-Driven Development

**Iterative Improvement**

Use feedback to drive improvement:

1. **Collect Feedback**: Gather from all reviews
2. **Analyze Patterns**: Identify common themes
3. **Create Guidelines**: Document best practices
4. **Train Agents**: Update agent behavior
5. **Monitor Impact**: Track improvements
6. **Iterate**: Continuously refine

**Knowledge Base**

Build knowledge from feedback:

- **FAQ**: Common questions and answers
- **Style Guide**: Team coding standards
- **Anti-Patterns**: Examples to avoid
- **Best Practices**: Positive examples
- **Decision Log**: Rationale for past decisions

**Process Evolution**

Feedback shapes process:

- **Policy Updates**: Change approval policies based on feedback
- **Workflow Changes**: Adjust review process
- **Tool Improvements**: Enhance review tools
- **Training Materials**: Create targeted training
- **Team Structure**: Adjust team roles and responsibilities

### Integration Points

**With Code Review**

- Feedback linked to specific hunks
- Inline comments on lines of code
- Diff visualization with feedback overlay
- Feedback summary for entire review

**With Merge Requests**

- Feedback appears in request detail view
- Feedback count in request list
- Filter requests by feedback status
- Export feedback with request data

**With Agent System**

- Agents receive feedback as learning input
- Agents can provide automated feedback
- Agent performance tracked via feedback
- Feedback influences agent behavior

**With Issue Tracking**

- Create issues from feedback
- Link feedback to existing issues
- Track issue resolution
- Close feedback when issue resolved

### Configuration

**Feedback Settings**

```typescript
{
  // Enable/disable feedback types
  allowedFeedbackTypes: [
    'approve',
    'request_changes',
    'comment'
  ],

  // Feedback requirements
  requireCommentOnRequestChanges: true,
  requireCommentOnReject: true,
  allowEmptyApprovals: false,

  // Notification settings
  notifyOnNewFeedback: true,
  notifyOnReply: true,
  notifyOnResolution: true,

  // Resolution settings
  allowSelfResolution: false,
  requireReviewerVerification: true,
  autoResolveOnAddress: false,

  // Thread settings
  allowReplies: true,
  maxThreadDepth: 5,
  allowEditing: true,
  editTimeout: 300
}
```

### Troubleshooting

**Feedback Not Appearing**

- Check WebSocket connection
- Verify user has permission to view feedback
- Refresh the request page
- Check if feedback was deleted
- Verify feedback not filtered out

**Notifications Not Received**

- Check notification settings
- Verify email delivery
- Check spam folder
- Ensure WebSocket connection active
- Review notification preferences

**Feedback Not Resolving**

- Verify user has permission to resolve
- Check if feedback has unresolved replies
- Ensure address changes actually made
- Try refreshing the page
- Contact requester for clarification

**Agent Not Learning**

- Check feedback is properly categorized
- Verify learning system enabled
- Review agent configuration
- Check feedback patterns exist
- Ensure sufficient feedback data

### Use Cases

**Primary Use Cases**

1. **Quality Improvement**: Catch and fix issues before merge
2. **Knowledge Transfer**: Teach through review feedback
3. **Team Alignment**: Align on coding standards
4. **Agent Training**: Improve agent code generation
5. **Process Documentation**: Preserve decision rationale

**Secondary Use Cases**

1. **Performance Review**: Assess reviewer contributions
2. **Trend Analysis**: Identify systemic issues
3. **Guideline Creation**: Develop coding standards
4. **Training Material**: Create educational content
5. **Audit Trail**: Maintain compliance records

### Related Concepts

- **[Code Review System](./review-system.md)**: File-level review workflow
- **[Merge Requests](./merge-requests.md)**: Request lifecycle and management
- **[Approval Workflow](./approval-workflow.md)**: Approval process and policies
- **[Agent Learning](../agent-management/agent-learning.md)**: How agents learn from feedback
- **[Quality Metrics](../development-tools/quality-metrics.md)**: Measuring code quality
- **[Communication Patterns](../communication/communication-patterns.md)**: Team communication strategies

### Future Enhancements

**Planned Features**

- **AI-Powered Suggestions**: Suggest feedback based on code analysis
- **Sentiment Analysis**: Detect feedback tone and sentiment
- **Smart Routing**: Route feedback to most relevant reviewers
- **Auto-Categorization**: Automatically categorize feedback
- **Feedback Search**: Search historical feedback
- **Trend Detection**: Identify emerging patterns
- **Reviewer Matching**: Match reviewers to their expertise
- **Feedback Summarization**: AI-summarize long threads
- **Multi-Language Support**: Support feedback in multiple languages
- **Integration Hub**: Connect to external feedback systems
