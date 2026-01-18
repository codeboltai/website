---
title: "Calendar System"
description: "Event scheduling, reminders, and time-based coordination for agents and users"
---

## Calendar System

The Calendar System provides comprehensive event scheduling and time-based coordination for multi-agent workflows. It supports one-time and recurring events, participant management with RSVP tracking, reminder notifications, and seamless integration with mail threads for meeting coordination.

### What It Is

A persistent calendar service that stores events with flexible scheduling options. Events can be instant (point in time) or have duration, recur based on cron expressions, and include multiple participants (agents and users) with individual RSVP tracking. The system triggers events at scheduled times and sends reminder notifications.

### Why It Matters

Time-based coordination is critical for:
- **Scheduled Tasks**: Recurring maintenance, monitoring, checks
- **Meetings**: Coordinating agent-user discussions
- **Reminders**: Ensuring time-sensitive actions aren't missed
- **Workflow Orchestration**: Triggering processes at specific times
- **Multi-Agent Coordination**: Synchronized agent activities

### Key Capabilities

**Event Types:**
- `generic`: General purpose events
- `note`: Time-stamped notes or reminders
- `meeting`: Collaborative sessions with participants
- `system-check`: Automated monitoring or validation

**Scheduling Features:**
- **Instant Events**: Point in time (startTime = endTime)
- **Duration Events**: Time range with start and end
- **All-Day Events**: Full-day indicators
- **Recurring Events**: Cron-based recurrence patterns
- **Recurrence End**: Optional end date for recurring events

**Recurrence Presets:**
- Every 5, 10, 15, 30 minutes
- Every 1, 2, 4, 6, 12 hours
- Daily at midnight

**Participant Management:**
- Agent and user participants
- Agent execution ID and thread ID tracking
- RSVP status: `pending`, `accepted`, `declined`
- Creator auto-accepted as participant

**Reminder System:**
- Configurable minutes-before reminder
- Enabled/disabled per event
- Notification sent flag tracking
- Sent timestamp for audit

**Completion Tracking:**
- `completed` flag for acknowledgment
- `completedAt` timestamp
- `triggeredAt` when start time passes
- Mark events as done (useful for system-checks)

**Organization:**
- Tag-based categorization
- Swarm ID association for group events
- Linked mail threads for meetings
- Custom metadata storage
- Agenda field for meeting specifics

**View Types:**
- Monthly: Traditional month grid
- Weekly: Week overview with time slots
- Daily: Single day detailed view
- Hourly: Hour-by-hour breakdown
- Schedule: Linear list of upcoming events

### How It Works

**Event Creation:**
1. User creates event with title, description, type
2. Start time specified; end time optional (defaults to start for instant)
3. Duration flag indicates if event has end time
4. Participants added with `pending` status
5. Recurrence configured if needed (cron expression)
6. Reminder settings applied
7. Event saved to `.codebolt/calendar/events/{eventId}.json`
8. Index updated with event summary
9. WebSocket event `calendar:event-created` emitted

**Event Triggering:**
1. Calendar scheduler checks for events needing trigger
2. When current time >= event startTime:
   - Set `triggeredAt` timestamp
   - If has reminder and not sent: send reminder
   - If linked to mail thread: notify participants
   - If system-check: execute check logic
3. Event appears in "triggered" queries

**Reminder System:**
1. Scheduler queries for events needing reminders
2. Criteria: reminder enabled, not sent, within reminder window
3. For each matching event:
   - Calculate reminder time (start - minutesBefore)
   - If current time >= reminder time:
     - Send notification to participants
     - Mark `reminder.notificationSent = true`
     - Set `reminder.sentAt` timestamp
4. WebSocket event `calendar:reminder` emitted

**RSVP Management:**
1. Participant updates status via calendar interface or mail
2. Service validates participant is in event
3. Updates participant.status to `accepted` or `declined`
4. Event `updatedAt` timestamp refreshed
5. WebSocket event `calendar:rsvp-updated` emitted
6. Other participants notified of status change

**Recurring Events:**
1. Parent event created with `isRecurring: true`
2. Cron expression defines recurrence pattern
3. Scheduler evaluates cron to generate instances
4. Each instance has `isRecurringInstance: true`
5. `parentEventId` references parent event
6. Updates can apply to: `this`, `all`, or `future` instances
7. When `recurrenceEndTime` passed, no more instances generated

**Meeting Integration:**
1. Event created with type `meeting`
2. `mailThreadId` field populated with linked thread
3. Participants invited via calendar
4. RSVP updates reflected in both systems
5. Meeting agenda stored in event
6. Thread used for pre/post-meeting discussion

### Use Cases

**Scheduled Automation:**
- Nightly build processes
- Regular data backups
- Periodic health checks
- Maintenance windows

**Meeting Coordination:**
- Agent standup meetings
- Code review sessions
- Planning discussions
- Retrospectives

**Reminders:**
- Follow-up on tasks
- Deadline notifications
- Action item reminders
- Time-sensitive alerts

**System Monitoring:**
- Merge request review checks
- Dependency update reviews
- Security scan scheduling
- Performance monitoring

**Multi-Agent Synchronization:**
- Coordinated agent spawning
- Batch processing initiation
- Resource allocation timing
- Swarm coordination events

### Related Concepts

- **[RSVP System](./rsvp-system.md)**: Event participation tracking
- **[Mail/Inbox System](./mail-inbox.md)**: Meeting discussion threads
- **[Deliberation System](./deliberation-system.md)**: Pre-meeting decision gathering
- **[Communication Patterns](./communication-patterns.md)**: Choosing channels for coordination

### Technical Details

**Storage Location:** `<projectPath>/.codebolt/calendar/`
- `calendar-index.json`: Event index with summaries
- `events/{eventId}.json`: Full event details

**Cron Expression Format:**
Standard 5-field cron:
```
* * * * *
│ │ │ │ │
│ │ │ │ └─── Day of week (0-6, Sunday = 0)
│ │ │ └───── Month (1-12)
│ │ └─────── Day of month (1-31)
│ └───────── Hour (0-23)
└─────────── Minute (0-59)
```

**WebSocket Events:**
- `calendar:event-created`: New event added
- `calendar:event-updated`: Event modified
- `calendar:event-deleted`: Event removed
- `calendar:event-triggered`: Event start time reached
- `calendar:reminder`: Reminder notification
- `calendar:rsvp-updated`: Participant status changed

**Scheduler Service:**
- Background process checking every minute
- Queries events needing trigger or reminders
- Executes event-specific logic
- Updates event state
- Emits appropriate WebSocket events

**Filter Options:**
- Date range: startDate, endDate
- Event types: generic, note, meeting, system-check
- Creator: filter by createdBy.id
- Participant: filter by participant participation
- Swarm: filter by swarmId
- Tags: filter by tag array
- Completion: include completed or filter by status
- Triggered: only events past start time
- Search: full-text in title and description

**Error Handling:**
- `INVALID_INPUT`: Malformed request data
- `MISSING_REQUIRED_FIELD`: Required fields absent
- `INVALID_CRON_EXPRESSION`: Cron parsing failed
- `INVALID_DATE_RANGE`: End before start
- `EVENT_NOT_FOUND`: Event ID doesn't exist
- `PARTICIPANT_NOT_FOUND`: Participant ID not in event
- `SYSTEM_ERROR`: Unexpected server error
- `FILE_SYSTEM_ERROR`: Storage access failed
