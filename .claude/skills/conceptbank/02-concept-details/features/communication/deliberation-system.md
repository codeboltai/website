---
title: "Deliberation System"
description: "Multi-agent decision-making through voting, feedback, Q&A, and shared lists"
---

## Deliberation System

The Deliberation System enables structured decision-making and information gathering among multiple agents and users. It provides four distinct deliberation types to support different collaboration scenarios, from consensus building to knowledge collection.

### What It Is

The deliberation system is a framework for asynchronous collaboration that allows agents and users to participate in structured discussions. Each deliberation has a specific type (voting, feedback, Q&A, or shared-list) and tracks responses, votes, and summaries. The system prevents duplicate responses in shared-lists and automatically tallies votes for decision-making.

### Why It Matters

In multi-agent systems, decisions often require input from multiple perspectives. The deliberation system provides:
- **Structured collaboration** with clear rules and workflows
- **Asynchronous participation** allowing agents to contribute when available
- **Decision tracking** with vote counts and winner determination
- **Knowledge aggregation** through shared-list deduplication
- **Rich text formatting** using Tiptap editor for complex requests

### Key Capabilities

**Deliberation Types:**
- **Voting**: Collect responses and allow participants to vote; system automatically determines winner
- **Feedback**: Gather open-ended responses without voting; useful for brainstorming
- **Q&A**: Question and answer format for information gathering
- **Shared List**: Deduplicates identical responses, tracking contributors per item

**Status Lifecycle:**
- `draft`: Initial state, not yet open for responses
- `collecting-responses`: Accepting responses from participants
- `voting`: Response collection closed, now accepting votes
- `completed`: Deliberation finished with summary
- `closed`: Deliberation archived (soft delete)

**Response & Vote Management:**
- Track agent vs user response counts separately
- Vote counting per response with automatic winner calculation
- Contributor tracking for shared-list deduplication
- Rich text response bodies with full formatting support

### How It Works

1. **Creation**: User or agent creates deliberation with type, title, and rich text request
2. **Participant Selection**: Specify which agents/users should participate
3. **Response Phase**: Participants submit responses (shared-lists deduplicate automatically)
4. **Voting Phase** (voting type only): Participants vote on responses
5. **Completion**: System calculates winner, user adds summary
6. **Archival**: Deliberation marked as completed or closed

**Shared-List Deduplication:**
When using shared-list type, the system normalizes response text (lowercase, trimmed) and checks for existing matches. If found, it adds the new responder to the contributors array instead of creating a duplicate response.

### Use Cases

**Voting:**
- Select best approach from multiple alternatives
- Choose implementation strategy for features
- Make architecture decisions with team input

**Feedback:**
- Gather opinions on proposed changes
- Collect suggestions for improvements
- Brainstorm ideas without competitive voting

**Q&A:**
- Ask technical questions to multiple agents
- Gather information from different perspectives
- Create knowledge base through questioning

**Shared List:**
- Aggregate findings without duplicates
- Collect resource links from multiple agents
- Build checklists with contributor attribution

### Related Concepts

- **[Mail/Inbox System](./mail-inbox.md)**: Slack-like messaging for direct communication
- **[Thread Management](./thread-management.md)**: Structured conversations for task execution
- **[Calendar System](./calendar-system.md)**: Event scheduling and time-based coordination
- **[Message Composer](./message-composer.md)**: Creating messages across communication channels

### Technical Details

**Storage Location:** `<projectPath>/.codebolt/agentdeliberation/`
- `index.json`: Index of all deliberations
- `deliberations/{id}.json`: Full deliberation document with responses and votes

**Real-time Updates:** WebSocket events for:
- `agentdeliberation.created`
- `agentdeliberation.updated`
- `agentdeliberation.response.added`
- `agentdeliberation.vote.cast`
- `agentdeliberation.summary.added`
- `agentdeliberation.deleted`

**Agent Integration:**
- Agents can be spawned to respond to deliberations
- Separate voting agents can be spawned for voting phase
- CLI commands: `start-agents` and `start-voting-agents`
