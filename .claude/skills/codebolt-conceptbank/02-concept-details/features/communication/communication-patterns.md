---
title: "Communication Patterns"
description: "How agents and users choose the right communication channel"
---

## Communication Patterns

CodeBolt provides multiple communication channels, each optimized for specific use cases. Understanding when to use each channel ensures effective collaboration and appropriate information routing.

### Channel Overview

| Channel | Best For | Persistence | Real-time | Voting | File Attachments |
|---------|----------|-------------|-----------|---------|------------------|
| **Deliberation** | Decision making | Yes | Yes | Yes | No |
| **Mail** | Conversations | Yes | Yes | No | Yes |
| **Threads** | Task execution | Yes | Yes | No | Yes |
| **Calendar** | Time coordination | Yes | Yes | No | No |

### Deliberation System

**Use When:**
- Multiple perspectives needed on a decision
- Comparing alternatives and voting on best option
- Gathering structured feedback
- Creating shared lists without duplicates
- Building consensus among agents

**Examples:**
- Choose between React vs Vue for new feature
- Vote on architecture proposals
- Collect feedback on UI design
- Aggregate error reports from multiple agents
- Gather resource recommendations (shared-list)

**Why Not Others:**
- Mail: No voting mechanism, harder to tally responses
- Threads: Too focused on execution, not discussion
- Calendar: Not time-based, no decision tracking

**Decision Questions:**
- ❓ Do you need to vote on responses? → **Deliberation (voting)**
- ❓ Do you need to collect unique items without duplicates? → **Deliberation (shared-list)**
- ❓ Do you need structured feedback from multiple participants? → **Deliberation (feedback)**

### Mail / Inbox System

**Use When:**
- Free-form conversation about a topic
- Sharing information and updates
- Asking questions without formal structure
- Coordinating activities with file references
- Quick back-and-forth discussion

**Examples:**
- Agent reporting progress on task
- User asking agent for clarification
- Sharing code snippets for review
- Coordinating file access with reservations
- General team communication

**Why Not Others:**
- Deliberation: Overkill for casual conversation
- Threads: Too execution-focused, just need to talk
- Calendar: Not time-sensitive

**Decision Questions:**
- ❓ Is this a casual conversation or update? → **Mail**
- ❓ Do you need to share files or references? → **Mail**
- ❓ Is the subject clear but discussion open-ended? → **Mail**

### Thread Management

**Use When:**
- Executing a specific task or workflow
- Tracking progress through steps
- Coordinating multi-step processes
- Monitoring task status and completion
- Hierarchical task breakdown

**Examples:**
- Feature development workflow
- Debugging session with steps
- Code review process
- Deployment pipeline
- Scheduled maintenance task

**Why Not Others:**
- Deliberation: Not decision-focused, execution-focused
- Mail: Lacks progress tracking and step management
- Calendar: Not necessarily time-based

**Decision Questions:**
- ❓ Does this involve step-by-step execution? → **Thread**
- ❓ Do you need to track progress percentage? → **Thread**
- ❓ Is this a task with defined lifecycle? → **Thread**
- ❓ Do other tasks depend on this one? → **Thread**

### Calendar System

**Use When:**
- Scheduling events at specific times
- Coordinating time-based activities
- Setting reminders for deadlines
- Recurring automated tasks
- Meeting coordination with RSVP

**Examples:**
- Schedule code review for Friday 2pm
- Daily health check at midnight
- Weekly team standup
- Reminder to follow up on task
- Swarm coordination event

**Why Not Others:**
- Deliberation: Not decision-making, time-based
- Mail: No scheduling or RSVP tracking
- Threads: Not execution-focused, just timing

**Decision Questions:**
- ❓ Does this need to happen at a specific time? → **Calendar**
- ❓ Do participants need to RSVP? → **Calendar**
- ❓ Is this a recurring event? → **Calendar**
- ❓ Do you need reminder notifications? → **Calendar**

### Choosing the Right Channel

**Decision Tree:**

```
Start
  │
  ├─ Is this about time/scheduling?
  │   └─ YES → Calendar
  │
  ├─ Is this about executing a task?
  │   └─ YES → Thread
  │
  ├─ Do you need voting or decision-making?
  │   └─ YES → Deliberation
  │
  └─ Is this a conversation or update?
      └─ YES → Mail
```

**By Urgency:**
- **Urgent/Immediate**: Mail (direct message) or Thread (if task-related)
- **Time-sensitive**: Calendar (schedule it) or Mail (reminder)
- **Async discussion**: Deliberation (needs input) or Mail (update)
- **No rush**: Any channel based on purpose

**By Audience:**
- **Single agent**: Mail (direct) or Thread (assign task)
- **Multiple agents**: Deliberation (gather input) or Mail (announce)
- **Mixed agents/users**: Calendar (meeting) or Deliberation (decision)
- **Public broadcast**: Mail (all) or Calendar (event)

**By Complexity:**
- **Simple update**: Mail
- **Structured input**: Deliberation
- **Multi-step process**: Thread
- **Coordination**: Calendar

### Cross-Channel Integration

**Deliberation → Calendar:**
- Decision reached in deliberation
- Schedule meeting to implement
- Link deliberation summary to event

**Mail → Thread:**
- Discussion in mail thread identifies task
- Create thread to execute the work
- Link mail thread for context

**Calendar → Mail:**
- Meeting scheduled on calendar
- Mail thread created for discussion
- Participants use thread for prep

**Thread → Deliberation:**
- Thread execution encounters decision point
- Create deliberation for input
- Resume thread with decision

**Multiple Channels:**
- Calendar event for meeting time
- Deliberation for pre-meeting input
- Mail thread for logistics
- Thread for execution of decisions

### Anti-Patterns

**Using Mail for Decisions:**
- ❌ Hard to tally responses
- ❌ No formal voting
- ✅ Use Deliberation instead

**Using Thread for Discussion:**
- ❌ Clutters execution context
- ❌ Messages mixed with step updates
- ✅ Use Mail for discussion, Thread for execution

**Using Calendar for Conversations:**
- ❌ Events aren't for chat
- ❌ No conversation threading
- ✅ Use Mail or Deliberation, Calendar for scheduling

**Using Deliberation for Updates:**
- ❌ Overhead of voting/feedback
- ❌ Unnecessary structure
- ✅ Use Mail for simple updates

### Best Practices

1. **Start with the question**: What am I trying to accomplish?
2. **Consider the audience**: Who needs to see this and how should they respond?
3. **Think about longevity**: Is this transient communication or persistent record?
4. **Match the tool**: Use each channel for its intended purpose
5. **Link related items**: Reference cross-channel connections
6. **Avoid duplication**: Don't post same content in multiple places
7. **Respect participant preferences**: Some agents prefer certain channels

### Related Concepts

- **[Deliberation System](./deliberation-system.md)**: When to use voting and feedback
- **[Mail/Inbox System](./mail-inbox.md)**: When to use conversation threads
- **[Thread Management](./thread-management.md)**: When to use task execution
- **[Calendar System](./calendar-system.md)**: When to use time-based coordination
- **[RSVP System](./rsvp-system.md)**: Managing event participation
