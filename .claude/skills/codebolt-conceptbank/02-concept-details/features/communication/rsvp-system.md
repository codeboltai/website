---
title: "RSVP System"
description: "Event participation tracking and management for calendar events"
---

## RSVP System

The RSVP (Répondez s'il vous plaît) System manages event participation by tracking attendee responses to calendar invitations. It provides real-time status updates, participant lists, and coordination between calendar events and related communication channels.

### What It Is

A participation tracking layer integrated with the calendar system that allows agents and users to indicate their availability for events. Each event participant has an RSVP status that evolves from `pending` to `accepted` or `declined`, with all changes broadcast in real-time to other participants.

### Why It Matters

Event coordination requires knowing who will attend:
- **Meeting Planning**: Adequate attendance for decisions
- **Resource Allocation**: Right number of participants for tasks
- **Agent Scheduling**: Ensure agent availability for critical events
- **Coordination**: Participants see who else is attending
- **Follow-up**: Know who to notify of changes

### Key Capabilities

**Participant Types:**
- **Agent Participants**: Autonomous agents with agent ID
- **User Participants**: Human users identified as 'user'
- **Creator**: Event creator automatically `accepted`

**RSVP Status Values:**
- `pending`: Invitation sent, response pending
- `accepted`: Participant will attend
- `declined`: Participant cannot attend

**Status Tracking:**
- Per-participant status in event object
- Timestamp tracking via `event.updatedAt`
- Real-time broadcasting of status changes
- Participant count in event summaries

**Participant Information:**
- `id`: Unique identifier (agent ID or 'user')
- `name`: Display name for UI
- `type`: 'agent' or 'user'
- `agentExecutionId`: For agent-specific tracking
- `threadId`: Link to conversation thread
- `status`: Current RSVP status

### How It Works

**Initial Invitation:**
1. Event created with participants array
2. Each participant gets `status: 'pending'`
3. Creator automatically set to `status: 'accepted'`
4. WebSocket event `calendar:event-created` includes participant list
5. Notification sent to all pending participants

**RSVP Update Flow:**
1. Participant (user or agent) calls RSVP update endpoint
2. System validates participant exists in event
3. Updates participant.status to new value
4. Sets `event.updatedAt` to current time
5. Saves event to storage
6. Emits `calendar:rsvp-updated` WebSocket event
7. Other participants notified of change

**User RSVP:**
- User clicks Accept/Decline in calendar UI
- Frontend calls `PATCH /calendar/{eventId}/rsvp`
- Payload: `{ participantId: 'user', status: 'accepted' }`
- Event updated and broadcast

**Agent RSVP:**
- Agent evaluates availability and conflicts
- Agent calls RSVP endpoint programmatically
- May include reasoning in linked thread
- Status broadcast to other participants

**Participant List Management:**
1. Event creator adds initial participants
2. Additional participants can be added via event update
3. New participants start with `pending` status
4. Removed participants deleted from array
5. Changes broadcast via `calendar:event-updated`

**Status Queries:**
- Filter events by participant ID
- Get all `accepted` events for a user
- Get all `pending` invitations
- Count accepted vs declined for meeting viability

### Use Cases

**Meeting Coordination:**
- Invite multiple agents to planning meeting
- Track who accepted vs declined
- Cancel if insufficient acceptance
- Send reminders only to `accepted` participants

**Agent Task Scheduling:**
- Schedule agent for specific time slot
- Agent accepts if available, declines if busy
- System avoids scheduling conflicts
- Backup agents invited if primary declines

**Multi-Agent Events:**
- Swarm coordination events
- All agents must accept for quorum
- Track which agents haven't responded
- Follow up with pending agents

**User Availability:**
- Invite user to code review
- User indicates availability
- Meeting confirmed when user accepts
- Agent participants adjust accordingly

**Resource Planning:**
- Schedule resource-intensive task
- Only proceed if enough participants accept
- Declined participants free for other work
- Acceptance triggers resource allocation

### Related Concepts

- **[Calendar System](./calendar-system.md)**: Event scheduling with RSVP tracking
- **[Mail/Inbox System](./mail-inbox.md)**: Meeting discussion and coordination
- **[Deliberation System](./deliberation-system.md)**: Pre-meeting consensus gathering
- **[Communication Patterns](./communication-patterns.md)**: Choosing event vs other channels

### Technical Details

**RSVP Request Structure:**
```typescript
{
  eventId: string;
  participantId: string;      // 'user' or agent ID
  status: 'accepted' | 'declined';
}
```

**Participant in Event:**
```typescript
{
  id: string;
  name: string;
  type: 'agent' | 'user';
  agentExecutionId?: string;
  threadId?: string;
  status: 'pending' | 'accepted' | 'declined';
}
```

**API Endpoints:**
- `PATCH /calendar/:eventId/rsvp`: Update participant status
- `GET /calendar?participantId=:id`: Get events for participant
- `GET /calendar/:eventId`: Get event with participant list

**WebSocket Events:**
- `calendar:rsvp-updated`: Status changed
  - `eventId`: Event identifier
  - `participantId`: Who changed status
  - `status`: New status value
  - Broadcast to all connected clients

**Status Validation:**
- Participant must exist in event
- Status must be valid enum value
- Cannot update if event completed/cancelled
- Creator cannot decline own event

**Mail Integration:**
- Events with `mailThreadId` link to discussion
- RSVP changes posted to linked thread
- Participants can discuss in thread before RSVP
- Thread used for meeting logistics

**Agent RSVP Logic:**
```typescript
async function agentDecideRsvp(event, agent) {
  // Check existing commitments
  const conflicts = await checkSchedule(agent.id, event.startTime);

  if (conflicts.length > 0) {
    return 'declined';  // Agent busy
  }

  // Check if event matches agent capabilities
  if (event.agenda && !canHandle(agent, event.agenda)) {
    return 'declined';  // Not qualified
  }

  // Check availability (resources, etc.)
  const available = await checkAvailability(agent.id);

  return available ? 'accepted' : 'declined';
}
```

**Common Workflows:**

1. **Create and Invite:**
   - Create event with participant list
   - All start as `pending`
   - Notifications sent

2. **Responses Roll In:**
   - Participants update RSVP
   - Each change broadcast
   - Dashboard shows live count

3. **Meeting Confirmation:**
   - Check if `accepted` meets minimum
   - If yes, confirm meeting
   - If no, cancel or reschedule

4. **Post-Event:**
   - Mark event as completed
   - Attendance tracked via RSVP
   - No-shows identified (`accepted` but didn't attend)

5. **Rescheduling:**
   - Update event time
   - RSVP statuses reset to `pending`
   - Participants respond again
