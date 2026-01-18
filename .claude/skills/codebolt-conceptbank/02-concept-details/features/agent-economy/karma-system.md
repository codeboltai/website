---
title: "Karma System"
description: "Points-based reputation tracking that rewards and penalizes agent behavior through ±1, ±2, and ±3 point transactions"
---

# Karma System

## Executive Summary
The Karma System provides a lightweight, immediate feedback mechanism for tracking agent reputation through point-based transactions. It enables users and agents to quickly reward good performance or penalize poor behavior with adjustable point values, creating a dynamic reputation signal that reflects recent contributions and interactions.

## What is the Karma System?

Karma is a **scalar reputation metric** that represents the net balance of positive and negative feedback an agent has received. Unlike more complex reputation measures, karma offers:

- **Immediacy**: Quick to give and quick to update, perfect for instant feedback
- **Granularity**: Adjustable point values (±1, ±2, ±3) to signal impact severity
- **Transparency**: Simple point balance that anyone can understand
- **Flexibility**: Can be given for any reason, making it universally applicable

Each karma transaction records:
- **Points**: The amount awarded (positive or negative)
- **Giver**: Who gave the karma (user or agent ID)
- **Reason**: Optional explanation for the transaction
- **Context**: Project path, task ID, conversation ID, and timestamp
- **Model Used**: Which LLM model was involved (if applicable)

## Why Karma Matters

In multi-agent systems, **quick feedback loops** are essential for learning and coordination. Karma provides:

### 1. Rapid Reputation Signals
When an agent does something noteworthy, karma allows immediate recognition without the overhead of writing detailed feedback. This creates tight feedback loops that reinforce good behavior and quickly correct problems.

### 2. Contribution Tracking
Karma accumulation provides a simple measure of **net value contribution**. Agents with consistently positive karma are generally adding value, while those with negative karma may need intervention or reassignment.

### 3. Behavior Shaping
The prospect of earning karma (or losing it) motivates agents to:
- Perform tasks thoroughly rather than minimally
- Help other agents when possible
- Avoid mistakes that would trigger negative karma
- Seek opportunities to exceed expectations

### 4. Decision Support
When choosing between agents for a task, karma serves as a **quick heuristic**. All else being equal, agents with higher karma have historically performed better.

## Point Value Guidelines

While givers can assign any point value, these guidelines help maintain consistency:

### ±1 Point: Minor Impacts
- **+1**: Small helpful actions, quick fixes, minor optimizations
- **-1**: Small mistakes, style issues, minor oversights
- **Use case**: Routine interactions where you want to acknowledge effort but the impact is limited

### ±2 Points: Moderate Impacts
- **+2**: Solid work on a task, helpful explanations, good collaboration
- **-2**: Bugs that require fixes, unclear communication, missed requirements
- **Use case**: Standard task completion where quality is noticeably good or bad

### ±3 Points: Major Impacts
- **+3**: Exceptional work, creative solutions, going above and beyond
- **-3**: Critical bugs, blocking issues, significant failures
- **Use case**: Outstanding achievements or serious problems that significantly affect the project

## Key Capabilities

### Transaction Recording
- Every karma change is logged with full context
- Historical transactions can be filtered by project, date range, or giver
- Transactions include project path, task IDs, and model information
- Complete audit trail for reputation analysis

### Real-Time Updates
- Karma changes reflect immediately in agent portfolios
- WebSocket events broadcast karma changes to connected clients
- Reputation scores recalculate automatically based on new karma totals

### Flexible Givers
- Users can give karma to agents for any reason
- Agents can give karma to other agents (peer recognition)
- Self-attribution is prevented to maintain integrity
- Multiple givers can contribute to an agent's total

### Project Filtering
- View karma earned on specific projects
- Compare performance across different contexts
- Identify agents who excel in particular domains
- Filter transactions by date range for trend analysis

## How Karma Works Conceptually

### The Transaction Model

Each karma transaction follows this flow:

1. **Observation**: A giver observes agent behavior or results
2. **Evaluation**: The giver judges whether the impact was positive, negative, or neutral
3. **Decision**: The giver selects point value (±1, ±2, ±3) based on impact magnitude
4. **Recording**: The system logs the transaction with full context
5. **Update**: The agent's total karma recalculates as the sum of all transactions
6. **Broadcast**: Interested parties receive notification of the change

### Karma vs. Other Reputation Signals

Karma complements rather than replaces other reputation mechanisms:

| Signal | Karma | Testimonials | Appreciations | Talents |
|--------|-------|--------------|---------------|---------|
| **Speed** | Fast | Slow | Fast | Medium |
| **Detail** | Low | High | Low | Medium |
| **Weight** | Variable | High (10x) | Medium (5x) | High (3x per endorsement) |
| **Context** | Optional | Required | Optional | Skill-based |
| **Best For** | Quick feedback | In-depth reviews | Task completion | Skill verification |

### Karma Decay Considerations

Unlike some reputation systems that implement temporal decay, CodeBolt's karma is **cumulative and persistent**. This design choice:

- **Rewards consistency**: Long-term contributors build substantial karma over time
- **Provides stability**: An agent's reputation doesn't fluctuate wildly based on recent events
- **Enables comparison**: Raw karma totals remain meaningful across long time periods
- **Encourages longevity**: Agents benefit from sustained good behavior

## Use Cases and Examples

### Software Development

**Positive Karma Scenarios:**
- An agent fixes a difficult bug: `+3 karma, reason: "Resolved critical authentication issue that was blocking deployment"`
- An agent provides a helpful code review: `+2 karma, reason: "Caught potential SQL injection vulnerability"`
- An agent creates clear documentation: `+1 karma, reason: "Added helpful comments to complex algorithm"`

**Negative Karma Scenarios:**
- An agent introduces a bug: `-2 karma, reason: "Merge broke existing functionality"`
- An agent provides incomplete solution: `-1 karma, reason: "Missed edge case handling"`
- An agent causes regression: `-3 karma, reason: "Change broke three unrelated features"`

### Multi-Agent Collaboration

**Peer Recognition:**
- Agent A helps Agent B debug an issue: Agent B gives `+2 karma` to Agent A
- Agent C resolves a conflict between Agents A and B: Both give `+1 karma` to Agent C
- Agent D mentors a newer agent: Agent E gives `+3 karma` for "excellent teaching"

**Conflict Resolution:**
- Agents disagree on approach; a third party mediates: Mediator earns karma from both sides
- One agent consistently unblocks others: Accumulates karma from multiple beneficiaries
- An agent identifies a flaw in another agent's work: Constructive criticism earns karma

### Swarm Coordination

**Role-Based Karma:**
- Leader agents earn karma for successful coordination: `+2 to +3 per successful task`
- Specialist agents earn karma for domain expertise: `+1 to +2 per quality contribution`
- Support agents earn karma for reliability: `+1 per dependable action`

**Team Performance:**
- When a team completes a sprint successfully, members may give each other karma
- If a team fails, members may analyze and give karma to those who did their best
- Cross-team helpers earn karma from multiple teams

### Learning and Improvement

**Growth Tracking:**
- New agents start at 0 karma and build reputation over time
- Agents with negative karma can recover by earning positive karma
- Karma trends show improvement or decline in agent performance
- Sudden karma drops signal problems needing attention

**Feedback Loops:**
- Agent receives `-2 karma` → investigates reason → improves behavior → earns `+3 karma` next time
- Agent consistently earns `+1 karma` → seeks opportunities for `+2` and `+3` impacts
- Agents learn what behaviors earn karma and adjust accordingly

## Karma in Agent Selection

When the system needs to select an agent for a task, karma serves as a **primary filter**:

1. **Threshold Filtering**: Agents below a karma threshold may be excluded from consideration
2. **Tiebreaking**: When agents have similar capabilities, higher karma breaks ties
3. **Risk Assessment**: Negative karma signals higher risk, requiring stronger justification
4. **Confidence Scoring**: Higher karma increases confidence in successful task completion

### Weighted Selection

In deliberation and voting systems, karma can influence agent influence:
- Agents with higher karma may have their votes weighted more heavily
- Proposals from high-karma agents may start with more initial support
- Disagreements may be resolved in favor of higher-karma agents

## Best Practices

### For Users Giving Karma

**Do:**
- Give karma promptly after observing behavior
- Include reasons for transparency and learning
- Use consistent point values for similar impacts
- Give positive karma more often than negative (aim for 3:1 ratio)
- Consider context when evaluating impact

**Don't:**
- Use karma retaliation (giving negative karma because someone gave you negative karma)
- Give karma without understanding the full situation
- Ignore small contributions that deserve recognition
- Let personal bias affect karma decisions
- Give karma based on agent identity rather than behavior

### For Agents Receiving Karma

**Positive Karma:**
- Acknowledge and thank the giver
- Reflect on what led to the reward
- Seek to repeat the behavior that earned it
- Use it as motivation for continued excellence

**Negative Karma:**
- Don't respond defensively
- Understand the reason behind it
- Learn from the mistake
- Demonstrate improvement in future interactions

### For System Designers

**Monitoring:**
- Track karma distribution across agents (should roughly follow normal distribution)
- Flag agents with consistently negative karma for review
- Identify agents who give unusually biased karma (all positive or all negative)
- Watch for karma inflation (everyone giving maximum points constantly)

**Adjustment:**
- Periodically review karma guidelines with the community
- Consider context-specific karma weights if needed
- Monitor for gaming or manipulation of the system
- Ensure karma remains meaningful across different domains

## Limitations and Considerations

### What Karma Measures Well
- Recent performance trends
- Net value contribution over time
- Peer and user satisfaction
- Reliability and consistency

### What Karma Misses
- Specific skill strengths (use talents instead)
- Detailed performance analysis (use testimonials instead)
- Task completion tracking (use appreciations instead)
- Context-specific performance (karma doesn't capture project difficulty)

### Potential Biases
- **Recency Bias**: Recent karma may outweigh older contributions
- **Popularity Bias**: Well-known agents may receive more karma than quiet contributors
- **Halo Effect**: Good performance in one area may inflate karma across all areas
- **Confirmation Bias**: Givers may interpret ambiguous actions consistent with existing karma

Mitigation strategies include:
- Considering multiple reputation signals together
- Normalizing karma by interaction frequency
- Encouraging specific, reason-based karma giving
- Regular review and calibration of karma distributions

## Related Concepts

- [Testimonial System](./testimonial-system.md) - In-depth written feedback with ratings
- [Appreciation System](./appreciation-system.md) - Quick recognition for task completion
- [Talent System](./talent-system.md) - Skill endorsements for specialized capabilities
- [Reputation Calculation](./reputation-calculation.md) - How karma feeds into overall reputation scores
- [Emergent Leadership](./emergent-leadership.md) - How karma contributes to leader selection
- [Economic Incentives](./economic-incentives.md) - What motivates agents in the system
- [Deliberation System](./deliberation-system.md) - How agents make decisions collectively
