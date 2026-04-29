---
id: "pheromone-types"
title: "Pheromone Types: The 9 Coordination Signals"
category: "features"
subcategory: "stigmergy-system"
tags: ["pheromones", "coordination-signals", "agent-communication", "swarm-intelligence"]
audience: ["technical", "business"]
difficulty: "intermediate"
last_updated: "2026-01-18"
version: "1.0.0"
related_concepts: ["stigmergy-explained", "pheromone-dynamics", "coordination-patterns", "biological-inspiration"]
content_type: "concept"
status: "published"
---

# Pheromone Types: The 9 Coordination Signals

## Executive Summary

CodeBolt's stigmergic coordination relies on nine specialized pheromone types, each encoding a different aspect of collective intelligence. These digital signals enable agents to communicate importance, competition, progress, readiness, and needs without direct messaging. From attracting agents to critical work to preventing duplicate effort, each pheromone type serves a specific coordination purpose that, when combined, produces sophisticated emergent behavior.

## Why Nine Pheromone Types?

Biological ant colonies use multiple pheromone types for different purposes:
- **Trail pheromones**: Guide foraging
- **Alarm pheromones**: Signal danger
- **Queen pheromones**: Indicate colony status
- **Recruitment pheromones**: Call for assistance

CodeBolt similarly requires multiple signal types to coordinate complex software development work. Nine types emerged from analyzing the essential coordination needs of multi-agent software development:

1. **Task Attraction**: Drawing agents to important work
2. **Task Avoidance**: Preventing overcrowding and duplication
3. **Progress Tracking**: Monitoring work advancement
4. **Quality Signaling**: Communicating work excellence
5. **Temporal Coordination**: Managing time sensitivity
6. **Dependency Management**: Handling prerequisites and blockers
7. **Collaboration Signaling**: Requesting and offering help
8. **Knowledge Sharing**: Propagating discoveries
9. **Task Transformation**: Triggering decomposition and restructuring

## The 9 Pheromone Types

### 1. Importance (importance)

**Signal**: "This matters"

**Purpose**: Indicates the significance, priority, or value of a task, file, or code element. Higher intensity attracts more capable agents to critical work.

**Use Cases**:
- User-designated priorities (critical bugs, feature requests)
- Architectural decisions affecting system design
- Security vulnerabilities requiring immediate attention
- Performance bottlenecks impacting user experience
- Technical debt accumulation

**Deposition Strategy**:
- Users manually deposit based on business priorities
- Agents deposit when identifying high-impact issues
- Multiple deposits accumulate to signal collective importance
- No decay (persistent signal until manually cleared)

**Agent Response**:
- Agents prioritize tasks with higher importance intensity
- When choosing between tasks, importance acts as primary attraction factor
- High importance can override other avoidance signals
- Agents compete more aggressively for important tasks

**Example**:
```
Critical login bug:
- User deposits importance: 10/10
- Multiple agents detect high importance
- Several agents deposit takeup_interest
- Agent with highest quality claim wins competition
```

**Decay Rate**: 0 (persistent)

**Color**: Amber (#F59E0B)

---

### 2. Saturation (saturation)

**Signal**: "This is crowded"

**Purpose**: Indicates how many agents are currently working on or interested in a task. Prevents over-allocation and duplicate effort by creating avoidance signals.

**Use Cases**:
- Load balancing across available work
- Preventing redundant parallel effort
- Identifying bottlenecks and hotspots
- Signaling when sufficient agent coverage exists
- Triggering agent redistribution

**Deposition Strategy**:
- Agents deposit when actively working on a task
- Intensity reflects number of agents (1 agent = 1.0 intensity)
- Automatically cleared when agents complete work
- Slow decay prevents rapid fluctuations

**Agent Response**:
- Agents avoid tasks with high saturation
- When seeking work, prefer low saturation tasks
- High saturation triggers exploration of alternative tasks
- Creates natural load balancing

**Example**:
```
Popular feature request:
- Initially: saturation = 0 (no one working)
- Agent A starts: saturation = 1
- Agent B starts: saturation = 2
- Agent C sees saturation = 2, chooses different task
- Result: Optimal agent allocation
```

**Decay Rate**: 0.05/hour (slow decay)

**Color**: Red (#EF4444)

---

### 3. WorkingOnIt (workingonit)

**Signal**: "I'm handling this"

**Purpose**: An agent's explicit claim to ownership of a task or file. Prevents multiple agents from duplicating work on the same item.

**Use Cases**:
- Task claiming and work distribution
- Exclusive access to shared resources
- Progress tracking and accountability
- Preventing merge conflicts
- Enabling collaborative handoffs

**Deposition Strategy**:
- Agent deposits when starting active work
- Must refresh periodically (fast decay)
- Cleared when work completes
- Multiple agents can deposit on same task (collaboration)

**Agent Response**:
- Other agents avoid tasks with strong workingonit signals
- Agents may deposit invitation to offer collaboration
- Expired workingonit signals task abandonment
- Agents may claim abandoned tasks

**Example**:
```
Database migration task:
- Agent A deposits workingonit (intensity 1.0)
- Agent B sees workingonit, chooses different task
- Agent A completes work, clears workingonit
- Task available for others to review or extend
```

**Decay Rate**: 0.2/hour (fast decay - requires refresh)

**Color**: Blue (#3B82F6)

---

### 4. Progress (progress)

**Signal**: "How much is done"

**Purpose**: Tracks completion status of tasks. Helps agents estimate remaining work, identify stuck items, and coordinate handoffs.

**Use Cases**:
- Completion percentage tracking
- Velocity measurement and forecasting
- Identifying stalled or blocked work
- Coordinating multi-stage workflows
- Triggering next-phase work

**Deposition Strategy**:
- Agents update as work advances (0-100%)
- Multiple agents may have different progress assessments
- Combined to estimate overall completion
- Moderate decay keeps progress current

**Agent Response**:
- Agents attracted to high-progress tasks (completion opportunity)
- Low progress signals need for assistance
- Stagnant progress triggers intervention
- Progress patterns inform task duration estimates

**Example**:
```
API integration task:
- Agent A: progress = 25% (endpoint discovery)
- Agent B: progress = 50% (authentication implementation)
- Combined progress: ~37.5%
- Agent C sees 37.5%, knows significant work remains
```

**Decay Rate**: 0.1/hour (moderate decay)

**Color**: Green (#22C55E)

---

### 5. Quality (quality)

**Signal**: "How good was this work"

**Purpose**: Rates the excellence of completed work. Guides agents to high-need areas and helps identify expertise patterns across the swarm.

**Use Cases**:
- Quality assurance and testing results
- Expertise identification and specialization
- Technical debt tracking
- Agent reputation building
- Learning and improvement feedback

**Deposition Strategy**:
- Deposited by reviewers or testing systems
- Higher intensity for better quality
- Accumulates to show consistent excellence
- Slow decay preserves quality history

**Agent Response**:
- Agents seek work where they have high quality history
- Low quality signals need for improvement
- Quality patterns guide agent specialization
- High-quality work attracts similar tasks

**Example**:
```
Agent A's test suite:
- First attempt: quality = 6/10 (passing but incomplete)
- Second attempt: quality = 9/10 (comprehensive coverage)
- Agent A builds testing reputation
- Future test tasks attract Agent A based on quality history
```

**Decay Rate**: 0.05/hour (slow decay)

**Color**: Purple (#8B5CF6)

---

### 6. Urgency (urgency)

**Signal**: "How time-sensitive"

**Purpose**: Indicates time pressure, deadlines, or SLA requirements. Helps agents prioritize work with temporal constraints.

**Use Cases**:
- Deadline-driven prioritization
- SLA compliance monitoring
- Hotfix and emergency coordination
- Time-critical feature releases
- Managing competing time pressures

**Deposition Strategy**:
- Deposited based on deadline proximity
- Intensity increases as deadline approaches
- Manual deposit for explicit deadlines
- Moderate decay keeps urgency current

**Agent Response**:
- Agents prioritize high urgency work
- Urgency can override lower importance
- Agents work faster on urgent tasks
- Urgency triggers agent reallocation

**Example**:
```
Security vulnerability:
- Initially: urgency = 5/10 (important but not urgent)
- Deadline announced: urgency = 8/10 (due in 3 days)
- Day before: urgency = 10/10 (critical)
- Agents drop other work to address urgent issue
```

**Decay Rate**: 0.15/hour (moderate-fast decay)

**Color**: Orange (#F97316)

---

### 7. Blocker (task_not_ready)

**Signal**: "What's stopping progress"

**Purpose**: Identifies dependencies, obstacles, or prerequisites that prevent work from proceeding. Helps agents address constraints systematically.

**Use Cases**:
- Dependency tracking and resolution
- Blocking issue identification
- Prerequisite management
- Workflow state control
- Preventing wasted effort on incomplete tasks

**Deposition Strategy**:
- Agents deposit when encountering blockers
- Must be manually resolved (no decay)
- Multiple blockers can accumulate
- Linked to specific blocking entities

**Agent Response**:
- Agents avoid tasks with blocker pheromones
- Agents may work on resolving blockers
- Tasks become attractive when blockers cleared
- Blocker patterns reveal systemic issues

**Example**:
```
Feature requiring API changes:
- Agent A discovers API doesn't support needed feature
- Deposits task_not_ready with link to API task
- Other agents avoid feature task
- Agent B completes API changes
- Agent A clears blocker, feature becomes available
```

**Decay Rate**: 0 (no decay - must be manually resolved)

**Color**: Dark Orange (#F97316)

---

### 8. Invitation (invitation)

**Signal**: "Help needed"

**Purpose**: Request for collaboration or specific skills. Enables targeted agent recruitment and spontaneous team formation.

**Use Cases**:
- Skill requests and expert recruitment
- Collaborative task coordination
- Complex problem solving
- Teaching and knowledge transfer
- Scaling up effort on large tasks

**Deposition Strategy**:
- Agents deposit when needing assistance
- Specify required capabilities in metadata
- Moderate decay keeps invitations fresh
- Multiple invitations indicate collaboration need

**Agent Response**:
- Agents with matching skills respond to invitations
- High progress + invitation = near-complete, needs finishing
- Agents deposit workingonit when accepting invitation
- Collaboration emerges without explicit team formation

**Example**:
```
Complex performance optimization:
- Agent A starts optimization, discovers need for database expertise
- Deposits invitation (skill: database-optimization)
- Agent B (database specialist) sees invitation
- Agent B deposits workingonit, joins collaboration
- Both agents complete optimization together
```

**Decay Rate**: 0.1/hour (moderate decay)

**Color**: Teal (#14B8A6)

---

### 9. Discovery (discovery)

**Signal**: "New finding"

**Purpose**: Shares new information, patterns, or insights discovered during work. Enables knowledge propagation across the swarm.

**Use Cases**:
- Pattern discovery and sharing
- Solution propagation
- Innovation diffusion
- Best practice communication
- Learning and improvement

**Deposition Strategy**:
- Agents deposit when making useful discoveries
- Linked to specific code or patterns
- Slow decay preserves valuable insights
- High intensity for significant discoveries

**Agent Response**:
- Agents investigate discoveries to learn
- Discoveries guide similar work
- Patterns emerge from aggregated discoveries
- Swarm learns and improves collectively

**Example**:
```
Agent A discovers elegant solution pattern:
- Solves tricky async problem using new approach
- Deposits discovery pheromone on code
- Agent B encounters similar problem
- Agent B sees discovery, applies same pattern
- Pattern spreads through swarm
```

**Decay Rate**: 0.05/hour (slow decay)

**Color**: Indigo (#6366F1)

---

## Additional Pheromone Types (Domain-Specific)

### Request Split (request_split)

**Signal**: "This should be decomposed"

**Purpose**: Indicates that a task is too complex and should be split into smaller sub-tasks.

**Use Cases**:
- Autonomous task decomposition
- Complexity management
- Hierarchy formation
- Parallel work enabling

**Decay Rate**: 0 (persistent until addressed)

**Color**: Purple (#8B5CF6)

---

### Files Blocked (files_blocked)

**Signal**: "Files reserved by another agent"

**Purpose**: Indicates that required files are reserved by another agent via File Update Intent, preventing conflicts.

**Use Cases**:
- File conflict prevention
- Concurrent modification control
- Resource reservation signaling

**Decay Rate**: 0 (removed when intent resolved)

**Color**: Dark Red (#DC2626)

---

### Review Added (reviewadded)

**Signal**: "Review available for deliberation"

**Purpose**: Triggers collective deliberation and review processes for code changes and proposals.

**Use Cases**:
- Code review coordination
- Deliberation triggering
- Multi-agent decision making

**Decay Rate**: 0 (persistent review signal)

**Color**: Indigo (#6366F1)

---

### Available (available)

**Signal**: "Blockers resolved"

**Purpose**: Counteracts `task_not_ready` to signal that blockers have been resolved and work can proceed.

**Use Cases**:
- Unblocker signaling
- State transition management
- Work re-enabling

**Decay Rate**: 0.05/hour (slow decay)

**Color**: Green (#22C55E)

---

## Pheromone Interactions

### Complementary Pairs

Some pheromones work in opposing pairs to create dynamics:

**Importance ↔ Saturation**
- Importance attracts agents
- Saturation repels agents
- Balance creates optimal allocation

**Task Not Ready ↔ Available**
- Task not ready blocks work
- Available unblocks work
- State transitions manage dependencies

**Invitation ↔ WorkingOnIt**
- Invitation requests collaboration
- WorkingOnIt claims work
- Interaction enables team formation

### Synergistic Combinations

Multiple pheromone types combine to create rich signals:

**High Priority, Low Saturation**
- Importance: 9, Saturation: 1
- Signal: "Critical work, needs attention"
- Response: Agents compete for task

**High Progress, High Quality**
- Progress: 80%, Quality: 9
- Signal: "Near completion, excellent work"
- Response: Other agents learn from success

**High Urgency, Available**
- Urgency: 10, Available: 8
- Signal: "Time-sensitive, ready to start"
- Response: Immediate agent attention

## Pheromone Profiles

Each entity maintains a **pheromone profile** - the complete collection of all pheromone deposits:

**Profile Structure**:

```
{
  entityId: "job-123",
  pheromones: [
    { type: "importance", totalIntensity: 15, deposits: [...] },
    { type: "saturation", totalIntensity: 2, deposits: [...] },
    { type: "workingonit", totalIntensity: 1, deposits: [...] },
    // ... other pheromone types
  ]
}
```

**Profile Analysis**:

Agents scan profiles to make decisions:
- **High attraction**: High importance, low saturation, available
- **Low attraction**: Low importance, high saturation, blocked
- **Collaboration opportunity**: High progress + invitation
- **Learning opportunity**: High quality + discovery

## Custom Pheromone Types

CodeBolt supports custom pheromone types beyond the default nine:

**Extension Mechanism**:

1. Define new pheromone type with:
   - Unique name
   - Display name
   - Description
   - Default decay rate
   - Color (for visualization)

2. Implement agent logic to:
   - Deposit custom pheromone
   - Respond to custom pheromone
   - Incorporate into decision algorithms

3. Update visualizations to:
   - Display custom pheromone
   - Enable user interaction
   - Support filtering and analysis

**Use Cases for Custom Types**:

- Domain-specific signals (e.g., security, compliance)
- Project-specific workflows (e.g., code freeze, release)
- Organizational needs (e.g., approval, review stages)
- Experimental coordination mechanisms

## Visualization

Pheromones are visually represented in CodeBolt's UI:

**Visual Encodings**:
- **Color**: Each type has distinct color
- **Intensity**: Brightness/saturation indicates strength
- **Quantity**: Number of deposits shown
- **Age**: Opacity fades with decay

**UI Components**:
- **Pheromone Panel**: Shows all pheromones on selected entity
- **Pheromone Heatmap**: Visualizes pheromone landscape across tasks
- **Pheromone Timeline**: Shows pheromone evolution over time
- **Pheromone Filters**: Enable focused analysis

## Related Concepts

- [Stigmergy Explained](/conceptbank/features/stigmergy-system/stigmergy-explained.md) - Deep dive into the stigmergy system
- [Pheromone Dynamics](/conceptbank/features/stigmergy-system/pheromone-dynamics.md) - Temporal behavior and decay mechanisms
- [Coordination Patterns](/conceptbank/features/stigmergy-system/coordination-patterns.md) - How pheromones combine to create patterns
- [Consensus Mechanisms](/conceptbank/features/stigmergy-system/consensus-mechanisms.md) - Decision making using pheromone signals
- [Biological Inspiration](/conceptbank/features/stigmergy-system/biological-inspiration.md) - Ant colony parallels

---

*Last Updated: 2026-01-18 | Version: 1.0.0 | Status: Published*
