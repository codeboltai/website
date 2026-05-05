---
title: "Code Review System"
description: "Understanding CodeBolt's interactive code review workflow for AI-generated changes"
tags: ["review", "code-review", "agent-workflow", "human-in-the-loop"]
---

## Code Review System

### Executive Summary

CodeBolt's Code Review System provides an interactive, human-in-the-loop workflow for reviewing AI-generated code changes before they are applied to the codebase. The system presents changes as structured "hunks" that can be individually accepted, rejected, or reviewed in detail, giving developers granular control over what gets merged while maintaining context of the original and modified code.

### What is the Code Review System?

The Code Review System is a safety layer between AI agents and your codebase. When an agent proposes file changes, instead of writing them directly, the system enters "Review Mode" where changes are staged and presented for human approval. This prevents unintended modifications, allows for quality control, and maintains developer oversight over autonomous agent activities.

**Key Benefits**

- **Granular Control**: Accept or reject specific changes rather than all-or-nothing decisions
- **Visual Comparison**: Side-by-side view of original and modified content
- **Structured Workflow**: Clear, predictable review process with defined states
- **Agent Integration**: Seamlessly integrates with both human-initiated and agent-initiated changes
- **Bulk Operations**: Handle multiple file changes efficiently with bulk accept/reject
- **Review History**: Persistent record of all reviews and their outcomes

### Key Capabilities

**Hunk-Based Review**

- Changes are automatically grouped into logical "hunks" representing contiguous modifications
- Each hunk can be independently accepted or rejected
- Hunks are classified as additions, deletions, or modifications
- Smart grouping reduces UI clutter by combining nearby changes
- Configurable grouping parameters (gap size, maximum hunk size)

**Review States**

Each review progresses through well-defined states:

- **Active**: Review is pending user decisions
- **Completed**: Review finished with decisions applied
- **Cancelled**: Review was cancelled and changes rejected

**Hunk States**

Individual hunks within a review have their own lifecycle:

- **Pending**: Awaiting user decision
- **Accepted**: Change approved for application
- **Rejected**: Change to be discarded

**Multi-File Support**

- Track multiple simultaneous review sessions
- Bulk operations across multiple files
- Unified view of all pending reviews
- File-level and hunk-level statistics

**Agent Attribution**

- Track which agent initiated each change
- Parent-child relationships for nested agent calls
- Thread and swarm context for reviews
- Historical linking to agent execution

### How Review Mode Works

**Initiation**

Review mode can be initiated by:

1. **Agent File Operations**: When an agent creates or modifies a file through the file service
2. **Direct Agent Calls**: Agents explicitly calling `ReviewModeHelper.proposeFileChanges()`
3. **Manual Trigger**: Users can initiate review mode through the UI

**Process Flow**

```
1. Agent Generates Changes
   ↓
2. Review Mode Service Captures Original Content
   ↓
3. Diff Algorithm Generates Hunks
   ↓
4. Review Session Created with Unique Message ID
   ↓
5. UI Notification Sent to User
   ↓
6. Monaco Editor Opens in Review Mode
   ↓
7. User Reviews and Makes Decisions
   ↓
8. Decisions Applied to File System
   ↓
9. Review Session Archived
```

**Hunk Generation Algorithm**

The system uses a line-by-line diff algorithm to identify changes:

1. Split original and modified content into lines
2. Compare lines to detect additions, deletions, and modifications
3. Group consecutive changes within a configurable gap distance (default: 3 lines)
4. Limit hunk size to prevent overly large hunks (default: 20 lines)
5. Assign hunk type based on predominant change pattern
6. Generate unique hunk IDs for tracking

**Special Cases**

- **New Files**: When original content is empty, entire file is one hunk
- **Empty Files**: Both original and modified empty generates no hunks
- **Large Changes**: Automatically split into multiple hunks for readability

**User Actions**

Users have three primary actions:

1. **Accept All**: Approve all pending hunks and apply changes
2. **Reject All**: Discard all pending hunks and preserve original
3. **Review Changes**: Enter detailed review mode for granular control

**Decision Application**

Based on user decisions, the system:

- **All Accepted**: Writes modified content to file
- **All Rejected**: Restores original content to file
- **Partial Acceptance**: Applies selective changes (currently uses majority rule)
- **File Already Written**: May restore original if all rejected

### Review Mode Data Structure

**Review Entry**

Each review session contains:

- **Review ID**: Unique identifier for the review session
- **Message ID**: Links review to chat message
- **Thread ID**: Conversation context
- **File Path**: Relative path to file being reviewed
- **Original Content**: File content before changes
- **Modified Content**: Proposed new content
- **Language**: Programming language for syntax highlighting
- **Hunks Array**: Array of change hunks
- **Status**: Current review state
- **Created At**: Timestamp when review was initiated
- **Agent Properties**: Agent instance ID, agent ID, parent references
- **File Already Written**: Whether file was already written to disk

**Hunk Structure**

Each hunk contains:

- **Hunk ID**: Unique identifier (e.g., "hunk-1", "hunk-2")
- **Type**: addition, deletion, or modification
- **Start Line**: Line number where hunk begins
- **End Line**: Line number where hunk ends
- **Content**: The new or modified content
- **Original Content**: Original content (for deletions/modifications)
- **Status**: pending, accepted, or rejected

**Statistics Tracking**

The system tracks:

- **Additions**: Number of lines added
- **Deletions**: Number of lines removed
- **Modifications**: Number of lines changed
- **Pending Count**: Hunks awaiting decision
- **Accepted Count**: Hunks approved
- **Rejected Count**: Hunks rejected

### Communication and Real-Time Updates

**WebSocket Events**

Review mode pushes real-time updates:

- **activeReviewsUpdate**: Broadcasts list of all active reviews
- **notification**: Review state change notifications
- **readFileForReviewMode**: Opens file in Monaco review mode

**State Transitions**

The system sends state updates for:

- **ASK_FOR_CONFIRMATION**: Initial presentation of changes
- **ALL_ACCEPTED**: All hunks accepted
- **ALL_REJECTED**: All hunks rejected
- **REVIEW_ACTIVE**: Detailed review mode entered
- **HUNK_ACCEPTED**: Individual hunk accepted
- **HUNK_REJECTED**: Individual hunk rejected
- **REVIEW_COMPLETED**: Review finished successfully
- **REVIEW_CANCELLED**: Review was cancelled

**Broadcasting**

Active reviews are broadcast to all connected clients:

```json
{
  "type": "activeReviewsUpdate",
  "timestamp": "2025-01-18T10:30:00Z",
  "payload": {
    "reviews": [...],
    "totalCount": 3
  }
}
```

### Persistence and History

**Review File Storage**

Review history is persisted to:

```
.codebolt/
└── review_fileChanges.json
```

**Storage Format**

```json
{
  "lastUpdated": "2025-01-18T10:30:00Z",
  "reviews": [
    {
      "filePath": "src/example.ts",
      "messageId": "msg-123",
      "threadId": "thread-456",
      "status": "completed",
      "approved": true,
      "createdAt": "2025-01-18T10:00:00Z",
      "completedAt": "2025-01-18T10:05:00Z",
      "additions": 15,
      "deletions": 8,
      "hunks": [...],
      "agentInstanceId": "agent-789"
    }
  ],
  "totalCount": 42
}
```

**History Management**

- Completed reviews are preserved for historical reference
- Active reviews are updated in real-time
- Merged view of active and completed reviews
- Statistics (additions/deletions) calculated per review

### Agent Integration

**Review Mode Helper**

Agents use `ReviewModeHelper` to initiate reviews:

```typescript
// Simple usage
await ReviewModeHelper.proposeFileChanges(
  filePath,
  newContent,
  description,
  threadId
);

// With auto-detected language
await ReviewModeHelper.startFileReviewWithAutoDetect(
  filePath,
  modifiedContent,
  threadId
);
```

**Agent Context**

Reviews include full agent context:

- **Agent Instance ID**: Specific execution instance
- **Agent ID**: Template or agent definition
- **Parent Agent Instance ID**: If spawned by another agent
- **Parent ID**: Parent's message ID
- **Thread ID**: Conversation context
- **Swarm ID**: Coordinated group context

**Bulk Operations**

Agents can handle multiple files:

```typescript
await reviewModeService.handleBulkReviewResponse([
  {
    messageId: "msg-1",
    threadId: "thread-1",
    filePath: "src/file1.ts",
    action: "accept"
  },
  {
    messageId: "msg-2",
    threadId: "thread-1",
    filePath: "src/file2.ts",
    action: "accept"
  }
]);
```

### Use Cases

**Primary Use Cases**

1. **Agent Code Generation**: Review code generated by AI agents before merging
2. **Refactoring Safety**: Verify automated refactoring changes
3. **Multi-Agent Coordination**: Prevent conflicts when multiple agents work on same files
4. **Learning and Training**: Understand what changes agents are proposing
5. **Quality Control**: Ensure changes meet coding standards and requirements

**Secondary Use Cases**

1. **Manual Code Review**: Use review mode for human-initiated changes
2. **Change Documentation**: Maintain record of what was changed and why
3. **Audit Trail**: Track all changes applied to codebase
4. **Rollback Support**: Easy identification of changes to revert
5. **Code Review Training**: Train new developers on code review process

**Integration Scenarios**

- **Swarm Development**: Multiple agents proposing changes to different files
- **Background Agents**: Long-running agents periodically proposing changes
- **Interactive Development**: Real-time review during agent-assisted coding
- **CI/CD Integration**: Automated review checks before deployment
- **Code Review Policies**: Enforce review requirements for certain files

### Best Practices

**For Developers**

- **Review Promptly**: Address reviews quickly to avoid context switching
- **Understand Context**: Read agent's task description before reviewing
- **Check Tests**: Run tests after accepting changes
- **Partial Acceptance**: Use granular review for large, complex changes
- **Provide Feedback**: Document why changes were rejected for agent learning

**For Agent Designers**

- **Clear Descriptions**: Always provide clear change descriptions
- **Logical Grouping**: Design changes that form logical hunks
- **Minimal Changes**: Make focused, minimal changes per review
- **Context Awareness**: Include relevant context in change proposals
- **Error Handling**: Handle rejected changes gracefully

**For Team Leads**

- **Review Policies**: Establish which files require review
- **Approval Workflows**: Define who can approve which changes
- **Review SLAs**: Set expectations for review turnaround times
- **Quality Metrics**: Track review acceptance rates and patterns
- **Agent Training**: Use rejection patterns to improve agent behavior

### Configuration Options

**Hunk Grouping Parameters**

- **Max Gap Size**: Lines between changes to group together (default: 3)
- **Max Hunk Size**: Maximum lines per hunk (default: 20)
- **Adjust Sensitivity**: Tune for your codebase and review style

**Review Cleanup**

- **Active Review Timeout**: How long to keep completed reviews in memory (default: 5 seconds)
- **History Retention**: How long to keep review history in storage
- **Auto-Cleanup**: Automatic cleanup of old review records

**File Handling**

- **Write Strategy**: Whether to write files before or after review
- **Conflict Resolution**: How to handle conflicts with external changes
- **Backup Creation**: Whether to create backups before applying changes

### Troubleshooting

**Review Not Appearing**

- Check WebSocket connection is active
- Verify review mode service is initialized
- Look for errors in agent execution logs
- Confirm file path is correct and accessible
- Check Monaco editor is listening for review events

**Changes Not Applied**

- Verify review completed successfully
- Check file permissions on target file
- Look for file system errors in logs
- Confirm file wasn't modified externally during review
- Check if partial acceptance logic applied correct changes

**Hunks Not Grouping Correctly**

- Adjust max gap size parameter
- Tune max hunk size for your codebase
- Check if diff algorithm is detecting changes correctly
- Verify line ending consistency (LF vs CRLF)
- Consider language-specific formatting rules

**Performance Issues**

- Reduce number of simultaneous active reviews
- Use bulk operations for multiple files
- Optimize hunk grouping parameters
- Check for memory leaks in review tracking
- Profile diff generation for large files

### Related Concepts

- **[Merge Requests](./merge-requests.md)**: Broader review and merge workflow for larger changesets
- **[Approval Workflow](./approval-workflow.md)**: Multi-stage approval process for changes
- **[Feedback System](./feedback-system.md)**: Collecting and acting on review feedback
- **[Agent Coordination](./coordination-signals.md)**: Pheromones and locks for multi-agent review
- **[File Update Intents](../development-tools/file-update-intents.md)**: File reservation system for preventing conflicts
- **[Agent Lifecycle](../agent-management/agent-lifecycle.md)**: How agents initiate and complete reviews

### Future Enhancements

**Planned Features**

- **True Partial Application**: Apply only accepted hunks while preserving others
- **Inline Editing**: Edit proposed changes before accepting
- **Review Comments**: Add comments to specific hunks for discussion
- **Review Templates**: Standardized review checklists for different file types
- **Automatic Test Runs**: Trigger tests automatically on review completion
- **Review Assignment**: Assign reviews to specific team members
- **Review Analytics**: Dashboards showing review patterns and metrics
- **Diff Visualization**: Enhanced diff visualization with syntax highlighting
- **Three-Way Merge**: Support for three-way merges in review mode
- **Review Bots**: Automated review bots for common patterns
