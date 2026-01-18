---
title: "Message Composer"
description: "Creating and routing messages across communication channels"
---

## Message Composer

The Message Composer is the unified interface for creating messages across CodeBolt's communication systems. It handles message routing, formatting, attachment handling, and delivery to the appropriate channel based on context and recipient.

### What It Is

A message creation component that abstracts the complexity of sending messages to different systems (mail threads, deliberations, calendar events, etc.). The composer validates input, formats content, attaches files, routes to the correct backend service, and handles delivery confirmation.

### Why It Matters

Consistent message creation is essential because:
- **Multiple Channels**: Messages go to mail, threads, deliberations, calendar
- **Rich Content**: Support for file attachments, formatting, mentions
- **Delivery Guarantees**: Acknowledgments and error handling
- **User Experience**: Consistent interface across all communication types
- **Agent Integration**: Agents need to send messages programmatically

### Key Capabilities

**Message Types:**
- **Mail Messages**: Sent to mail threads with subject-based organization
- **Thread Messages**: Attached to execution threads for task context
- **Deliberation Responses**: Structured input for decision-making
- **Calendar Responses**: RSVP and event communication

**Content Formatting:**
- Plain text with automatic encoding
- Rich text support (Tiptap editor integration)
- Markdown parsing for structured content
- Mention parsing (@agent, @user, @file)
- Link extraction and preview

**Attachment Handling:**
- File references with path, name, type
- Folder attachments for multi-file operations
- Image uploads with preview generation
- Multi-file selections
- File path resolution (relative vs absolute)

**Recipient Management:**
- Single and multiple recipients
- Agent ID resolution from names
- User vs agent routing
- Contact policy validation (open vs contacts_only)
- Participant list management for threads

**Delivery Options:**
- Importance levels: `low`, `normal`, `high`, `urgent`
- Acknowledgment requirement flag
- Read receipt tracking
- Delivery confirmation callbacks
- Retry logic for failed sends

### How It Works

**Mail Message Composition:**
1. User selects thread or creates new one
2. Composer validates thread exists and user is participant
3. Message body formatted and attachments processed
4. Recipients extracted from thread participants (minus sender)
5. Message sent to `mailService.sendMessage()`
6. Thread's `lastMessageId` and `lastMessagePreview` updated
7. WebSocket event `mail.message.received` emitted
8. Unread count incremented for recipients

**Thread Message Composition:**
1. Thread ID and optional step ID provided
2. Message type selected (info, error, warning, success, steering, instruction, feedback)
3. Priority assigned (low, medium, high)
4. Associated agent or user ID attached
5. Message sent to `threadMessageService.createMessage()`
6. ApplicationEventBus emits `conversation:message:added`
7. Thread timeline updated with message event

**Deliberation Response Composition:**
1. Deliberation ID and type validated
2. Response body formatted (rich text for Q&A, plain for shared-list)
3. For shared-list: check for duplicates by normalized text
4. For voting: response added to deliberation
5. Vote casting handled separately (user clicks vote button)
6. Response count updated (agent vs user tracked separately)
7. WebSocket event `agentdeliberation.response.added` emitted

**Routing Logic:**
```
If context has deliberationId → Deliberation Response
If context has threadId → Thread Message
If context has mailThreadId → Mail Message
If context has calendar eventId → Calendar RSVP
If no context but recipients specified → Create new mail thread
```

**Error Handling:**
- Thread not found → Show error, suggest creating new thread
- Not authorized to post → Check contact policy
- File not found → Validate attachments before sending
- Network failure → Queue for retry, show notification
- Validation failure → Show inline errors with correction hints

### Use Cases

**User-Initiated Messages:**
- Reply to existing conversation
- Start new thread with subject
- Respond to deliberation request
- RSVP to calendar event

**Agent-Initiated Messages:**
- Report progress on assigned task
- Ask for clarification or guidance
- Share findings with team
- Alert to errors or issues

**System Messages:**
- Error notifications in threads
- Success confirmations
- Warning about potential issues
- Informational updates

**File Coordination:**
- Reference files in message context
- Share file analysis results
- Request file operations
- Coordinate multi-file edits

### Related Concepts

- **[Mail/Inbox System](./mail-inbox.md)**: Thread-based messaging destination
- **[Thread Management](./thread-management.md)**: Execution context for messages
- **[Deliberation System](./deliberation-system.md)**: Structured response destination
- **[Calendar System](./calendar-system.md)**: Event-based messaging
- **[Communication Patterns](./communication-patterns.md)**: Choosing the right channel

### Technical Details

**Message Priority Mapping:**
```
Mail: low | normal | high | urgent
Thread: low | medium | high
Thread Types: info | error | warning | success | steering | instruction | feedback
```

**File Reference Structure:**
```typescript
{
  path: string;           // Full or relative path
  name: string;           // Display name
  type: 'file' | 'folder';
  preview?: string;       // Optional preview text
}
```

**Message Metadata (in threads):**
- Mentioned files, folders, multi-file selections
- Referenced MCP tools
- Mentioned agents (by ID)
- Linked documents from knowledge base
- External URLs
- Control files for workflows
- Remote task flags
- Environment configuration
- LLM provider selection

**WebSocket Confirmation Events:**
- Mail: `mail.message.received`, `mail.message.sent`
- Thread: `thread.message.created`
- Deliberation: `agentdeliberation.response.added`
- Calendar: `calendar:rsvp-updated`

**Delivery Pipeline:**
1. Validate input (recipients, body, attachments)
2. Resolve recipient IDs from names
3. Check authorization (contact policy, thread participation)
4. Format message body and process attachments
5. Route to appropriate service
6. Update thread/deliberation state
7. Emit WebSocket event for real-time updates
8. Handle success/failure callbacks
