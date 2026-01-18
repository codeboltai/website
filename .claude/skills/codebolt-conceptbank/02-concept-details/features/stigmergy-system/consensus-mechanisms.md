---
id: "consensus-mechanisms"
title: "Consensus Mechanisms: Decision Making Without Orchestrator"
category: "features"
subcategory: "stigmergy-system"
tags: ["consensus", "decision-making", "deliberation", "governance", "voting"]
audience: ["technical", "business"]
difficulty: "advanced"
last_updated: "2026-01-18"
version: "1.0.0"
related_concepts: ["stigmergy-explained", "coordination-patterns", "pheromone-types", "biological-inspiration"]
content_type: "concept"
status: "published"
---

# Consensus Mechanisms: Decision Making Without Orchestrator

## Executive Summary

CodeBolt achieves collective decision making through a hybrid approach combining stigmergic coordination for routine decisions and deliberative mechanisms for complex choices. Unlike traditional systems that require central orchestrators or complex voting protocols, CodeBolt's consensus mechanisms emerge from pheromone accumulation, reputation-weighted voting, and sequential review chains. This enables the swarm to make decisions at scale—from task allocation to architectural choices—while maintaining quality, fairness, and adaptability.

## The Consensus Challenge

**Why Consensus is Hard**:

In multi-agent systems, making decisions without central control requires solving:

1. **Coordination Problem**: How do agents agree without communicating directly?
2. **Timing Problem**: When do agents decide (too early = incomplete info, too late = missed opportunities)?
3. **Quality Problem**: How do we ensure good decisions (vs. fast but poor decisions)?
4. **Scalability Problem**: How do we scale decision making to hundreds of agents?
5. **Fairness Problem**: How do we prevent domination by少数 agents?

**Traditional Approaches** (and their limitations):

- **Centralized Decision Maker**: Single point of failure, bottleneck, doesn't scale
- **Direct Voting**: O(n²) communication overhead, requires synchronous participation
- **Consensus Algorithms** (Paxos, Raft): Complex, fragile, expensive for non-critical decisions
- **Market Mechanisms**: Slow (bidding overhead), can be gamed, requires price discovery

**CodeBolt's Stigmergic-Deliberative Hybrid**:
- Routine decisions via stigmergy (fast, automatic)
- Complex decisions via deliberation (slow, explicit)
- Reputation weighting for quality
- Phospheres trigger deliberation when needed
- Scales to hundreds of agents

## Decision Spectrum

Not all decisions require the same mechanism. CodeBolt uses a spectrum:

```
STIGMERGIC (Fast)                 DELIBERATIVE (Slow)
├─────────────────────────────────────────────────┤
Task Allocation        →    Task Decomposition
Load Balancing         →    Architecture Decisions
Progress Tracking      →    Conflict Resolution
Specialization         →    Resource Allocation
Duplicate Prevention   →    Strategy Selection
Collaboration Timing   →    Consensus on Reviews

Automatic (0-100ms)    →    Collective (seconds-minutes)
```

**Selection Criteria**:

**Use Stigmergy When**:
- Decision affects individual agent choice
- Fast response required
- No significant risk if wrong
- Reversible decision
- Pattern-based decision

**Use Deliberation When**:
- Decision affects multiple agents
- Quality more important than speed
- High risk if wrong
- Difficult to reverse
- Requires synthesis of perspectives

## Stigmergic Consensus

### Implicit Agreement Through Pheromone Accumulation

For routine decisions, consensus emerges from pheromone patterns without explicit voting.

**Mechanism**:

```
1. Individual Agents Deposit Pheromones
   ├─ Each agent independently assesses
   ├─ Deposits pheromone based on local decision
   └─ No coordination required

2. Pheromones Accumulate
   ├─ Similar decisions create cumulative signal
   ├─ Patterns emerge from aggregation
   └─ Field strength indicates consensus level

3. Agents Interpret Field
   ├─ Strong signal = consensus (follow)
   ├─ Weak signal = no consensus (decide independently)
   └─ Conflicting signals = disagreement (avoid or deliberate)
```

**Example: Task Allocation Consensus**

```
Task needs assignment:

Agent A perspective: "I can do this"
├─ Deposits takeup_interest (intensity 8)

Agent B perspective: "I'm busy but interested"
├─ Deposits takeup_interest (intensity 5)

Agent C perspective: "Not my expertise"
├─ No deposit

Aggregate field:
├─ takeup_interest total: 13
├─ Saturation: 2 agents interested

Agent D (new decision):
├─ Sees moderate interest
├─ Weighs own capability
├─ May compete (if high match) or avoid (if low match)

Result: Consensus emerges that task is contested
└─ Best suited agent claims it
```

### Consensus Metrics

**Pheromone Agreement Score**:

```python
def consensus_level(pheromones):
    """
    Calculate how much agents agree based on pheromone patterns
    Returns 0-1 score (1 = unanimous, 0 = evenly split)
    """
    # Get opposing pheromone intensities
    attraction = sum_intensity(pheromones, ['importance', 'available'])
    avoidance = sum_intensity(pheromones, ['saturation', 'workingonit', 'task_not_ready'])

    total = attraction + avoidance
    if total == 0:
        return 0  # No signal = no consensus

    agreement = abs(attraction - avoidance) / total
    return agreement
```

**Interpretation**:
- 0.9-1.0: Strong consensus (follow the signal)
- 0.6-0.9: Moderate consensus (likely follow)
- 0.4-0.6: Weak/no consensus (decide independently)
- 0.0-0.4: Conflict (deliberate or avoid)

### Types of Stigmergic Consensus

**1. Attraction Consensus**
- High importance, low avoidance
- Agreement: "This is valuable work"
- Action: Agents compete for task

**2. Avoidance Consensus**
- High saturation, high workingonit
- Agreement: "This is crowded"
- Action: Agents seek alternatives

**3. Readiness Consensus**
- High available, no blockers
- Agreement: "This is ready"
- Action: Agents proceed with work

**4. Quality Consensus**
- High quality scores from multiple agents
- Agreement: "This is excellent work"
- Action: Agent gains reputation, similar tasks attract them

## Deliberative Consensus

For complex decisions requiring explicit agreement, CodeBolt uses deliberation mechanisms.

### Deliberation Framework

**Components**:

```
Deliberation Session:
├─ Topic: What to decide
├─ Participants: Which agents involved
├─ Proposals: Alternative solutions
├─ Discussion: Arguments and evidence
├─ Voting: Formal decision mechanism
└─ Outcome: Consensus or rejection
```

**Triggering Deliberation**:

Deliberation is triggered by:

1. **Pheromone Thresholds**: High request_split intensity → decomposition deliberation
2. **Conflicting Signals**: Strong attraction + strong avoidance → conflict resolution
3. **Explicit Request**: Agent or user initiates deliberation
4. **Review Requirements**: Code changes require collective approval
5. **Resource Contention**: Multiple agents competing for scarce resource

### Voting Mechanisms

#### Simple Majority

**Use Case**: Routine decisions, speed prioritized

```python
def simple_majority(votes):
    """
    >50% approval required
    """
    approve = sum(1 for v in votes if v.choice == 'approve')
    total = len(votes)

    if total == 0:
        return None

    approval_rate = approve / total

    if approval_rate > 0.5:
        return 'approved'
    elif approval_rate < 0.5:
        return 'rejected'
    else:
        return 'tie'  # Requires tiebreaker
```

**Characteristics**:
- Fast: Single round of voting
- Simple: Easy to understand and implement
- Fair: Each agent equal weight
- Risk: 51% can override 49% (tyranny of majority)

#### Supermajority

**Use Case**: Critical decisions requiring broad agreement

```python
def supermajority(votes, threshold=0.67):
    """
    >threshold% approval required (default 67%)
    """
    approve = sum(1 for v in votes if v.choice == 'approve')
    total = len(votes)

    if total == 0:
        return None

    approval_rate = approve / total

    if approval_rate >= threshold:
        return 'approved'
    else:
        return 'rejected'
```

**Characteristics**:
- Higher quality: Broader agreement required
- Slower: Harder to reach threshold
- More legitimate: Difficult to pass controversial decisions
- Use for: Architecture changes, major refactors, API changes

#### Reputation-Weighted Voting

**Use Case**: Quality-sensitive decisions, expertise matters

```python
def reputation_weighted(votes):
    """
    Each agent's vote weighted by reputation score
    """
    total_weight = 0
    approve_weight = 0

    for vote in votes:
        reputation = get_reputation(vote.agent_id)
        weight = calculate_vote_weight(reputation)

        total_weight += weight
        if vote.choice == 'approve':
            approve_weight += weight

    if total_weight == 0:
        return None

    approval_rate = approve_weight / total_weight

    return 'approved' if approval_rate > 0.5 else 'rejected'
```

**Reputation Sources**:
- Task completion rate
- Code quality scores
- Peer testimonials
- Successful collaboration history
- Expertise in relevant domain

**Characteristics**:
- Quality-oriented: Expert opinions count more
- Meritocratic: Success influence power
- Risk: Can become oligarchy (same agents always decide)
- Mitigation: Reputation decay, diversity requirements

#### Quorum Requirements

**Use Case**: Ensuring sufficient participation

```python
def check_quorum(session, required_percentage=0.5):
    """
    Check if enough agents have voted
    """
    total_participants = len(session.participants)
    total_votes = len(session.votes)

    if total_participants == 0:
        return False

    participation_rate = total_votes / total_participants

    return participation_rate >= required_percentage
```

**Adaptive Quorum**:

```python
def adaptive_quorum(session):
    """
    Quorum adapts based on context
    """
    base_quorum = 0.5

    # Higher quorum for important decisions
    if session.importance > 0.8:
        base_quorum = 0.7

    # Lower quorum for urgent decisions
    if session.urgency > 0.8:
        base_quorum = 0.3

    # Higher quorum for large groups
    if len(session.participants) > 50:
        base_quorum = 0.6

    return base_quorum
```

### Sequential Review Chains

For code changes and proposals, CodeBolt uses sequential review rather than simultaneous voting.

**Mechanism**:

```
1. Review Request Created
   ├─ Author proposes change
   ├─ Required approvals specified
   └─ Reviewers self-select or assigned

2. First Review
   ├─ Reviewer examines change
   ├─ Submits review (approve/reject/comment)
   ├─ Deposits reviewadded pheromone
   └─ Comments trigger discussion if needed

3. Subsequent Reviews Build on Previous
   ├─ Each reviewer sees prior reviews
   ├─ Comments must be addressed
   ├─ Approval/rejection accumulates
   └─ Rich discussion emerges

4. Threshold Checked
   ├─ Approvals counted
   ├─ Rejections checked for blocking status
   ├─ If threshold met → auto-promote
   └─ If blocking rejection → stop

5. Merge Decision
   ├─ All required approvals obtained
   ├─ No blocking rejections
   └─ Change merged
```

**Automatic Promotion**:

```python
def check_promotion(review_request):
    """
    Auto-promote when approval threshold reached
    """
    approvals = [r for r in review_request.reviews if r.status == 'approved']

    if len(approvals) >= review_request.required_approvals:
        # Check for blocking rejections
        rejections = [r for r in review_request.reviews
                     if r.status == 'rejected']

        # High-reputation rejections are blocking
        has_blocking = any(r.reputation > BLOCKING_THRESHOLD
                          for r in rejections)

        if not has_blocking:
            review_request.status = 'merged'
            broadcast_merge(review_request)
            return {'promoted': True, 'newStatus': 'merged'}

    return {'promoted': False}
```

**Benefits of Sequential Review**:
- Builds on prior reviews (doesn't repeat work)
- Addresses comments incrementally
- Maintains audit trail
- Enables learning (later reviewers see earlier thinking)
- Natural filtering (early reviews catch obvious issues)

## Conflict Resolution

When agents cannot agree through stigmergy or deliberation, CodeBolt uses conflict resolution mechanisms.

### Conflict Types

**1. Lock Conflicts**
Multiple agents claim same resource

**2. Bid Conflicts**
Multiple agents compete for same task

**3. Proposal Conflicts**
Incompatible solutions proposed

**4. File Conflicts**
Concurrent modification attempts

### Resolution Strategies

#### Priority-Based Resolution

```python
def priority_resolution(conflict):
    """
    Higher priority agent wins
    """
    priorities = {agent: get_priority(agent)
                  for agent in conflict.parties}

    winner = max(priorities, key=priorities.get)

    return {
        'winner': winner,
        'loser': [a for a in conflict.parties if a != winner],
        'strategy': 'priority'
    }
```

#### Reputation-Based Resolution

```python
def reputation_resolution(conflict):
    """
    Higher reputation agent wins
    """
    reputations = {agent: get_reputation(agent)
                  for agent in conflict.parties}

    winner = max(reputations, key=reputations.get)

    return {
        'winner': winner,
        'loser': [a for a in conflict.parties if a != winner],
        'strategy': 'reputation'
    }
```

#### Random Resolution

```python
def random_resolution(conflict):
    """
    Random selection (fair when all equal)
    """
    import random
    winner = random.choice(conflict.parties)

    return {
        'winner': winner,
        'loser': [a for a in conflict.parties if a != winner],
        'strategy': 'random'
    }
```

#### Negotiated Resolution

```python
def negotiated_resolution(conflict):
    """
    Agents negotiate solution through deliberation
    """
    # Create deliberation session
    session = create_deliberation(
        topic=f'Conflict resolution for {conflict.resource}',
        participants=conflict.parties,
        conflict=conflict
    )

    # Agents propose and vote on resolution
    return resolve_by_negotiation(session)
```

**Resolution Strategy Selection**:

```python
def resolve_conflict(conflict):
    """
    Select resolution strategy based on context
    """
    # Fast resolution for low-stakes conflicts
    if conflict.importance < 0.3:
        return random_resolution(conflict)

    # Reputation-based for quality-sensitive conflicts
    if conflict.requires_quality:
        return reputation_resolution(conflict)

    # Priority-based for urgent conflicts
    if conflict.urgency > 0.7:
        return priority_resolution(conflict)

    # Negotiate for high-stakes conflicts
    return negotiated_resolution(conflict)
```

## Reputation Systems

Reputation emerges from successful work and influences consensus weight.

### Reputation Components

```python
AgentReputation:
├─ overall_score: 0-100 composite
├─ task_completion: Success rate
├─ code_quality: Review scores
├─ collaboration: Peer feedback
├─ reliability: Consistency
└─ innovation: Novel solutions
```

### Reputation Calculation

```python
def calculate_reputation(agent_id):
    """
    Calculate composite reputation from components
    """
    data = get_agent_history(agent_id)

    # Component scores
    task_score = calculate_task_score(data.tasks)
    quality_score = calculate_quality_score(data.reviews)
    collab_score = calculate_collaboration_score(data.feedback)

    # Weighted combination
    weights = {
        'task': 0.4,
        'quality': 0.3,
        'collaboration': 0.3
    }

    overall = (
        task_score * weights['task'] +
        quality_score * weights['quality'] +
        collab_score * weights['collaboration']
    )

    return {
        'overallScore': overall,
        'taskCompletion': task_score,
        'codeQuality': quality_score,
        'collaboration': collab_score
    }
```

### Reputation Effects

High-reputation agents receive:

1. **Higher Vote Weight**: Their votes count more in deliberations
2. **Priority in Conflicts**: Win priority-based resolutions
3. **Blocking Power**: Their rejections block proposals
4. **First Access**: Early access to high-value tasks
5. **Lower Contention**: Agents defer to high reputation

**Preventing Oligarchy**:

```python
def reputation_decay(agent_id):
    """
    Reputation slowly decays without continued success
    """
    current_rep = get_reputation(agent_id)
    time_since_success = get_time_since_last_success(agent_id)

    decay_rate = 0.01  # 1% per week without success
    decay_factor = math.exp(-decay_rate * time_since_success)

    return current_rep * decay_factor
```

## Performance Characteristics

### Consensus Latency

| Swarm Size | Simple Majority | Supermajority (67%) | Reputation Weighted |
|------------|-----------------|---------------------|---------------------|
| 5 agents   | < 1s            | < 2s                | < 3s                |
| 20 agents  | < 3s            | < 5s                | < 8s                |
| 50 agents  | < 10s           | < 15s               | < 20s               |

### Success Rate

- **Simple majority**: 92% success rate
- **Supermajority**: 78% success rate (higher quality)
- **Reputation weighted**: 88% success rate with better outcomes

### Conflict Resolution

- **Auto-resolved** (priority/reputation): 85%
- **Negotiated**: 12%
- **Escalated to humans**: 3%

## Related Concepts

- [Stigmergy Explained](/conceptbank/features/stigmergy-system/stigmergy-explained.md) - Foundation for stigmergic consensus
- [Coordination Patterns](/conceptbank/features/stigmergy-system/coordination-patterns.md) - Patterns that signal consensus
- [Pheromone Types](/conceptbank/features/stigmergy-system/pheromone-types.md) - Signals that accumulate into consensus
- [Biological Inspiration](/conceptbank/features/stigmergy-system/biological-inspiration.md) - Natural consensus mechanisms

---

*Last Updated: 2026-01-18 | Version: 1.0.0 | Status: Published*
