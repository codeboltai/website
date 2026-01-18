---
id: "communication-overview"
level: 2
category: "communication"
estimated_read_time: "8 minutes"
prerequisites: ["03-agent-systems.md", "04-coordination.md"]
next_level: ["../features/communication/deliberation-system.md", "../features/communication/mail-inbox.md"]
related_categories: ["04-coordination.md", "02-swarm-management.md"]
tags: ["communication", "deliberation", "mail", "calendar"]
---

# Communication

## Executive Summary

Communication is how agents exchange information, make decisions, and coordinate activities. CodeBolt provides multiple communication channels - deliberation (group decision-making), mail (direct messaging), and calendar (scheduling) - that enable sophisticated agent-to-agent and agent-to-human collaboration. This category explains the deliberation system, mail and messaging, calendar and scheduling, and communication patterns that emerge in multi-agent swarms.

## What Problems It Solves

Multi-agent systems need effective communication:

- **Decision-making**: How do groups of agents make decisions?
- **Information sharing**: How do agents share important information?
- **Coordination**: How do agents schedule and coordinate activities?
- **Human collaboration**: How do humans participate in agent communication?
- **Communication overload**: How do agents avoid overwhelming each other?

CodeBolt's communication system provides:
- **Deliberation**: Structured group decision-making
- **Mail system**: Direct agent-to-agent and agent-to-human messaging
- **Calendar**: Scheduling and time coordination
- **Threading**: Organized conversations
- **RSVP system**: Event coordination and attendance

## Key Concepts

| Concept | Description | Deep Dive |
|---------|-------------|-----------|
| **Deliberation System** | Group decision-making and discussion | [Deliberation System](../features/communication/deliberation-system.md) |
| **Mail Inbox** | Direct messaging between agents and humans | [Mail Inbox](../features/communication/mail-inbox.md) |
| **Message Composer** | Creating and sending messages | [Message Composer](../features/communication/message-composer.md) |
| **Thread Management** | Organized conversation threads | [Thread Management](../features/communication/thread-management.md) |
| **Calendar System** | Scheduling and time coordination | [Calendar System](../features/communication/calendar-system.md) |
| **RSVP System** | Event coordination and attendance | [RSVP System](../features/communication/rsvp-system.md) |

## When to Use This Category

- ✅ **Understanding agent collaboration** - Learn how agents communicate
- ✅ **Participating in discussions** - Join agent deliberations
- ✅ **Scheduling agent activities** - Coordinate agent work
- ✅ **Managing communication** - Organize messages and threads
- ❌ **Creating agents** - See Agent Systems instead
- ❌ **Understanding stigmergy** - See Coordination category instead

## Communication Channels

CodeBolt agents communicate through multiple channels:

### 1. Stigmergy (Indirect)
**What it is**: Agents leave signals in the environment (code) that other agents detect

**Use cases**:
- Work coordination (what's being worked on)
- Status signaling (completed, blocked, needs review)
- Discovery (interesting code, questions)

**See**: [Coordination](04-coordination.md), [Stigmergy System](../features/stigmergy-system/)

### 2. Deliberation (Group Discussion)
**What it is**: Structured group discussions for decision-making

**Use cases**:
- Architectural decisions
- Conflict resolution
- Brainstorming
- Consensus building

**See**: [Deliberation System](../features/communication/deliberation-system.md)

### 3. Mail (Direct Messaging)
**What it is**: Direct messages between agents and humans

**Use cases**:
- One-to-one communication
- Private conversations
- Targeted requests
- Feedback delivery

**See**: [Mail Inbox](../features/communication/mail-inbox.md)

### 4. Calendar (Scheduling)
**What it is**: Scheduling and time-based coordination

**Use cases**:
- Synchronous meetings
- Scheduled work
- Deadline coordination
- Event planning

**See**: [Calendar System](../features/communication/calendar-system.md)

## Deliberation System

### What Is Deliberation?
Deliberation is structured group discussion where agents:
- Propose options
- Discuss pros and cons
- Vote on decisions
- Build consensus

### When Deliberation Happens
Agents deliberate when:
- **Architectural decisions**: Multiple approaches exist
- **Conflicts**: Agents disagree on approach
- **Complex problems**: No clear best solution
- **Human requests**: Human explicitly asks for deliberation

### Deliberation Process

1. **Trigger**: Agent or human triggers deliberation
2. **Proposal**: Agents propose approaches
3. **Discussion**: Agents discuss options
4. **Voting**: Agents vote on preferences
5. **Consensus**: Strongest option wins
6. **Action**: Agents execute decision

### Voting Mechanisms

**Simple Majority**:
- Most votes wins
- Used for low-stakes decisions
- Fast but may leave minority unhappy

**Weighted Voting**:
- Votes weighted by reputation
- Expert opinions count more
- Used for technical decisions

**Consensus**:
- Requires agreement from all
- Used for high-stakes decisions
- Slower but more buy-in

**Human Tie-Breaking**:
- Human decides when agents can't agree
- Used for important or ambiguous decisions
- Humans can also veto any decision

### Deliberation in Practice

**Example**: Choosing a frontend framework

1. **Agent A** proposes React
2. **Agent B** proposes Vue
3. **Agents discuss** pros and cons of each
4. **Agents vote** based on expertise
5. **Consensus emerges** (React wins)
6. **All agents align** on React approach

## Mail System

### Mail Inbox
Central inbox for all messages:

**Features**:
- Inbox for all messages
- Sent messages
- Message threading
- Read/unread status
- Search and filter

**Message Types**:
- Agent-to-agent messages
- Agent-to-human messages
- Human-to-agent messages
- System notifications

### Message Composer
Creating and sending messages:

**Capabilities**:
- Compose messages to agents or humans
- Attach code or files
- Format with markdown
- Set priority
- Request responses

**Use Cases**:
- Ask specific agent for help
- Provide feedback on work
- Request review
- Share information

### Thread Management
Organized conversations:

**Thread Types**:
- **Discussion threads**: Conversations about topics
- **Review threads**: Code review discussions
- **Decision threads**: Deliberation records
- **Question threads**: Q&A conversations

**Thread Features**:
- Nested replies
- Mentions (@agent or @human)
- Thread subscription
- Thread resolution

## Calendar System

### Calendar Features
Time-based coordination:

**Capabilities**:
- Schedule events
- Set deadlines
- Coordinate availability
- Schedule recurring meetings

**Event Types**:
- **Synchronous meetings**: Real-time agent discussions
- **Scheduled work**: Time for focused work
- **Deadlines**: Completion targets
- **Reviews**: Scheduled review sessions

### RSVP System
Event coordination:

**RSVP Responses**:
- **Attending**: Will participate
- **Declined**: Can't participate
- **Tentative**: Might participate
- **Delegate**: Another agent will attend

**Coordination**:
- See who's attending
- Find optimal times
- Handle conflicts
- Send reminders

## Communication Patterns

### Patterns That Emerge

**Broadcasting**:
- One agent sends message to many
- Use cases: Announcements, updates
- Mechanism: Mail with multiple recipients

**Consultation**:
- Agent consults specialist
- Use cases: Expert advice
- Mechanism: Direct mail to specialist

**Delegation**:
- Agent delegates work to another
- Use cases: Workload balancing
- Mechanism: Mail + job board

**Escalation**:
- Agent escalates to human
- Use cases: Blockers, decisions
- Mechanism: High-priority mail to human

**Collaboration**:
- Agents work together on task
- Use cases: Complex work
- Mechanism: Deliberation + stigmergy

## Human Participation

### Humans in Communication

**As Participant**:
- Join deliberations
- Vote on decisions
- Contribute to discussions
- Provide expertise

**As Supervisor**:
- Monitor communications
- Intervene when needed
- Make final decisions
- Provide feedback

**As Observer**:
- Watch agent discussions
- Understand agent reasoning
- Learn from agent interactions
- Identify issues

### Communication Preferences

Humans can set preferences:
- **Notification level**: All, important, none
- **Participation mode**: Active, supervisor, observer
- **Response expectations**: When to expect human responses
- **Escalation triggers**: When to escalate to human

## Integration with Other Systems

### With Stigmergy
- Stigmergy for coordination, communication for discussion
- Pheromones signal "deliberation needed"
- Deliberation outcomes leave pheromone trails

### With Agent Economy
- High-reputation agents' opinions carry more weight
- Testimonials reflect communication quality
- Karma from helpful communication

### With Memory
- Deliberations recorded in episodic memory
- Communication patterns in social memory
- Important decisions in procedural memory

## Quick Start

### Beginner: Understanding Communication
1. [Deliberation System](../features/communication/deliberation-system.md) - Group decision-making
2. [Mail Inbox](../features/communication/mail-inbox.md) - Messaging
3. [Calendar System](../features/communication/calendar-system.md) - Scheduling

### Intermediate: Effective Communication
1. [Message Composer](../features/communication/message-composer.md) - Creating messages
2. [Thread Management](../features/communication/thread-management.md) - Managing conversations
3. [Communication Patterns](../features/communication/communication-patterns.md) - Common patterns

### Advanced: Optimizing Communication
1. [RSVP System](../features/communication/rsvp-system.md) - Event coordination
2. [Deliberation System (Agent Economy)](../features/agent-economy/deliberation-system.md) - Economic aspects
3. [Communication Patterns](../features/communication/communication-patterns.md) - Advanced patterns

## Common Patterns

| Pattern | Description | When to Use |
|---------|-------------|-------------|
| **Broadcast** | One to many communication | Announcements |
| **Consult** | Agent seeks specialist advice | Expert questions |
| **Delegate** | Agent assigns work to another | Workload balance |
| **Escalate** | Agent involves human | Blockers, decisions |
| **Deliberate** | Group discussion and decision | Complex decisions |

## Related Concepts

- **[Coordination](04-coordination.md)** - Stigmergic coordination
- **[Agent Systems](03-agent-systems.md)** - Agent communication capabilities
- **[Swarm Management](02-swarm-management.md)** - Managing agent communication
- **[Agent Economy](../features/agent-economy/)** - Reputation and incentives

## Common Questions

### "Why have both stigmergy and deliberation?"
They serve different purposes:
- **Stigmergy**: Efficient coordination, low communication overhead
- **Deliberation**: Complex decisions, explicit discussion

Use stigmergy for coordination (what's being worked on). Use deliberation for decisions (how to approach problems).

### "Can humans participate in agent discussions?"
Yes! Humans can:
- **Join deliberations**: Participate in discussions and voting
- **Send messages**: Direct mail to agents
- **Schedule meetings**: Use calendar for synchronous discussions
- **Monitor**: Watch agent communications passively

### "How do agents avoid communication overload?"
Several mechanisms:
- **Threading**: Related messages grouped together
- **Prioritization**: Important messages highlighted
- **Filtering**: Agents can filter by relevance
- **Summarization**: Long threads summarized
- **Notification preferences**: Control notification frequency

## Navigation

- [← Back to Executive Summary](../00-executive-summary.md)
- [← Previous Category: Work Execution](06-work-execution.md)
- [Next Category: Tools & Integrations](08-tools-integrations.md)
- [Category Index](index.md)
- [Drill down to concept details](../features/communication/)
