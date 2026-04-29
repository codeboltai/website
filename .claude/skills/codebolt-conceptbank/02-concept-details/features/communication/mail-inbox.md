---
title: "Mail / Inbox System"
description: "Slack-like messaging system for agent-to-agent and agent-to-user communication"
---

## Mail / Inbox System

The Mail System provides a Slack-like messaging interface for asynchronous communication between agents and users. It organizes messages into threads with subject-based conversation tracking, supporting both direct messages and group conversations.

### What It Is

A persistent messaging system that stores communication as thread-based conversations with message history. Similar to email or Slack, messages are organized into threads by subject, with each message containing sender information, recipients, body content, importance level, and optional file references.

### Why It Matters

In multi-agent systems, communication needs to be:
- **Persistent**: Messages survive system restarts and agent termination
- **Organized**: Thread-based structure keeps conversations contextual
- **Asynchronous**: Agents and users can respond when available
- **Discoverable**: Search and filtering through conversation history
- **Acknowledgable**: Support for read receipts and acknowledgments

### Key Capabilities

**Thread Management:**
- Subject-based thread organization with auto-creation
- Thread types: `agent-to-agent`, `agent-to-user`, `group`
- Status tracking: `open`, `closed`, `archived`
- Participant management with automatic addition
- Unread count tracking per thread
- Thread metadata for custom attributes

**Message Features:**
- Rich text message bodies
- Importance levels: `low`, `normal`, `high`, `urgent`
- Optional acknowledgment requirement
- Read receipt tracking
- File references with path, name, type, and preview
- Sender and recipient information

**File Reservations:**
- Agents can reserve files to prevent concurrent modification
- Exclusive and shared reservation modes
- TTL-based expiration (default 1 hour)
- Conflict detection and forced override with tracking
- Multi-file reservation support

**Search & Discovery:**
- Full-text search across message bodies
- Filter by participant, thread, date range
- Thread inbox with unread-only filtering
- Message summarization (configurable message count)

### How It Works

1. **Thread Creation**: When sending a message, system checks for existing thread by subject (case-sensitive). If not found, creates new thread with participants.
2. **Message Sending**: Messages written to year/month directory structure for efficient retrieval
3. **Real-time Updates**: WebSocket events notify connected clients of new messages
4. **File Reservations**: Agents check for conflicts before modifying files, can force override if needed
5. **Index Management**: Central index tracks threads, messages, and reservations for fast lookups

**Atomic Thread Operations:**
Uses mutex lock for `findOrCreateThread` to prevent race conditions where multiple agents create duplicate threads simultaneously. Only one thread can exist per unique subject.

**Message Storage:**
```
.codebolt/mail/
├── index.json
├── threads/
│   └── {threadId}.json
├── messages/
│   ├── {year}/
│   │   └── {month}/
│   │       └── {messageId}.json
├── agents/
│   └── {agentId}.json
└── reservations/
    └── {reservationId}.json
```

### Use Cases

**Agent-to-Agent Communication:**
- Agents coordinating on complex tasks
- Sharing discoveries or findings
- Requesting assistance from specialized agents

**Agent-to-User Communication:**
- Agents reporting progress or issues
- Asking for clarification or guidance
- Presenting options for user decision

**Group Conversations:**
- Team discussions with multiple agents
- Collaborative problem-solving
- Shared notifications or announcements

**File Coordination:**
- Preventing concurrent file modification conflicts
- Coordinating access to shared resources
- Tracking which agent is working on what

### Related Concepts

- **[Deliberation System](./deliberation-system.md)**: Structured decision-making with voting
- **[Thread Management](./thread-management.md)**: Task execution conversations
- **[Message Composer](./message-composer.md)**: Creating and sending messages
- **[Communication Patterns](./communication-patterns.md)**: Choosing the right channel

### Technical Details

**Storage Location:** `<projectPath>/.codebolt/mail/`

**Thread Types:**
- `agent-to-agent`: Communication between autonomous agents
- `agent-to-user`: Direct communication from agents to human users
- `group`: Multi-participant conversations

**Message Importance:**
- `low`: Informational, can be ignored
- `normal`: Standard communication (default)
- `high`: Important, should be reviewed soon
- `urgent`: Requires immediate attention

**WebSocket Events:**
- `mail.agent.online`: New agent registered
- `mail.thread.created`: New conversation thread created
- `mail.thread.updated`: Thread metadata changed
- `mail.thread.archived`: Thread marked as archived
- `mail.message.received`: New message delivered
- `mail.message.read`: Message marked as read
- `mail.message.ack`: Message acknowledged
- `mail.file_reservation.created`: File reservation created
- `mail.file_reservation.released`: File reservation released
- `mail.file_reservation.conflict`: Forced override occurred

**Agent Contact Policy:**
- `open`: Any agent can initiate communication
- `contacts_only`: Only approved contacts can send messages
