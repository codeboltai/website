---
id: "pheromone-dynamics"
title: "Pheromone Dynamics: Temporal Behavior and Evolution"
category: "features"
subcategory: "stigmergy-system"
tags: ["pheromones", "temporal-dynamics", "decay", "aggregation", "evaporation"]
audience: ["technical"]
difficulty: "advanced"
last_updated: "2026-01-18"
version: "1.0.0"
related_concepts: ["pheromone-types", "stigmergy-explained", "coordination-patterns", "biological-inspiration"]
content_type: "concept"
status: "published"
---

# Pheromone Dynamics: Temporal Behavior and Evolution

## Executive Summary

Pheromone dynamics govern how digital signals evolve over time through decay, aggregation, and evaporation mechanisms. These temporal properties ensure that stigmergic coordination remains responsive to current conditions while preserving valuable historical information. By carefully balancing signal persistence with temporal relevance, CodeBolt's pheromone system enables agents to distinguish between fresh opportunities and outdated signals, adapt to changing conditions, and build collective intelligence incrementally.

## Why Temporal Dynamics Matter

In biological systems, pheromone evaporation is essential:
- Prevents ants from following obsolete trails to depleted food sources
- Enables colonies to abandon failed strategies and adapt to new conditions
- Creates dynamic exploration-exploitation balance
- Ensures signals reflect current environment, not historical artifacts

CodeBolt's digital pheromones require similar temporal intelligence:

**Without Decay**:
- Pheromones accumulate indefinitely
- Old signals compete with new information
- System becomes insensitive to change
- Coordination based on outdated information

**With Proper Decay**:
- Fresh signals dominate coordination
- System adapts to changing conditions
- Historical patterns influence but don't control behavior
- Optimal balance of stability and responsiveness

## The Three Core Dynamics

### 1. Temporal Decay

Pheromones naturally fade over time, ensuring temporal relevance.

**Decay Formula**:

```
I_effective(t) = I_initial × e^(-λ × t)

Where:
- I_effective = current intensity after decay
- I_initial = deposited intensity
- λ = decay rate (per hour)
- t = elapsed time (hours)
```

**Decay Rate Categories**:

**No Decay (λ = 0)**
- Persistent signals that don't fade
- Used for: importance, blockers, reviews
- Must be manually cleared or resolved
- Represents stable, long-term information

**Slow Decay (λ = 0.05/hour)**
- Half-life: ~14 hours
- Used for: saturation, quality, discoveries
- Preserves patterns for days
- Enables learning from history

**Moderate Decay (λ = 0.1/hour)**
- Half-life: ~7 hours
- Used for: invitations, progress
- Relevant within workday
- Balances freshness with persistence

**Fast Decay (λ = 0.2/hour)**
- Half-life: ~3.5 hours
- Used for: workingonit
- Requires frequent refresh
- Indicates active engagement

**Very Fast Decay (λ = 0.15+/hour)**
- Half-life: <5 hours
- Used for: urgency
- Highly time-sensitive
- Rapidly becomes outdated

**Decay Visualization**:

```
Intensity over time (λ = 0.1):

Initial: 10.0
Hour 1:  9.05 (90%)
Hour 2:  8.19 (82%)
Hour 4:  6.70 (67%)
Hour 7:  4.97 (50% - half-life)
Hour 12: 3.01 (30%)
Hour 24: 1.35 (14%)
```

### 2. Aggregation

Multiple agents can deposit the same pheromone type, creating cumulative effects.

**Aggregation Types**:

**Simple Summation**
- Total intensity = sum of all deposits
- Used for: importance, saturation, invitations
- Formula: `I_total = Σ I_deposit`

**Maximum Selection**
- Effective intensity = maximum deposit
- Used for: quality (best assessment)
- Formula: `I_effective = max(I_deposits)`

**Weighted Average**
- Combines deposits with weights
- Used for: progress (multiple estimators)
- Formula: `I_effective = Σ(w_i × I_i) / Σw_i`

**Exponential Decay Combination**
- Each deposit decays independently
- Sum of decayed intensities
- Formula: `I_total = Σ(I_i × e^(-λ × t_i))`

**Aggregation Example**:

```
Task with multiple importance deposits:

Agent 1: importance = 8, deposited 2 hours ago
Agent 2: importance = 7, deposited 5 hours ago
Agent 3: importance = 9, deposited 1 hour ago

Decay rate: λ = 0 (no decay)
Total intensity: 8 + 7 + 9 = 24

Effective intensity with λ = 0.05:
Agent 1: 8 × e^(-0.05 × 2) = 7.23
Agent 2: 7 × e^(-0.05 × 5) = 5.46
Agent 3: 9 × e^(-0.05 × 1) = 8.56
Total: 21.25
```

### 3. Evaporation

Evaporation removes pheromones entirely when intensity falls below threshold or conditions change.

**Evaporation Triggers**:

**Intensity Threshold**
- Remove when `I_effective < threshold`
- Prevents noise from near-zero signals
- Typical threshold: 0.1-0.5

**Time-Based Expiration**
- Remove after fixed duration
- Used for: workingonit (expires if not refreshed)
- Ensures active signals remain current

**Event-Based Removal**
- Remove when specific event occurs
- Used for: blockers (cleared when resolved)
- task_not_ready removed when available deposited

**Manual Clearing**
- User or agent explicitly removes pheromone
- Used for: importance (user changes priority)
- Provides direct control

**Evaporation Example**:

```
WorkingOnIt evaporation:

1. Agent deposits workingonit (intensity 1.0)
2. Decay rate: 0.2/hour
3. After 5 hours:
   Intensity = 1.0 × e^(-0.2 × 5) = 0.368
4. Threshold: 0.4
5. 0.368 < 0.4 → pheromone evaporates
6. Task becomes available for other agents
```

## Pheromone Lifecycle

### Complete Lifecycle

```
1. DEPOSITION
   ├─ Agent deposits pheromone
   ├─ Initial intensity set (0-10)
   ├─ Timestamp recorded
   └─ Metadata captured (depositor, context)

2. ACTIVE PHASE
   ├─ Pheromone observable to all agents
   ├─ Intensity decays over time
   ├─ Agents respond to signal
   └─ Influences coordination decisions

3. DECAY PHASE
   ├─ Intensity decreases exponentially
   ├─ Signal strength diminishes
   ├─ Less influential over time
   └─ May be refreshed by new deposits

4. EVAPORATION PHASE
   ├─ Falls below threshold
   ├─ Removed from entity
   ├─ No longer visible to agents
   └─ Historical record may persist
```

### Lifecycle Variations

**Persistent Pheromones** (λ = 0)
```
Deposition → Active → Manual Removal
(No decay phase)
```

**Self-Refreshing Pheromones** (workingonit)
```
Deposition → Active → Refresh → Active → ...
(Repeated until completion)
```

**Event-Driven Pheromones** (blockers)
```
Deposition → Active → Resolution Event → Evaporation
(No time-based decay)
```

## Temporal Coordination Patterns

### Freshness Preference

Agents prioritize fresh signals:

**Pattern**:
```
Score = I_fresh × w_fresh + I_stale × w_stale

Where:
- I_fresh = intensity of recent deposits (< 1 hour)
- I_stale = intensity of old deposits (> 4 hours)
- w_fresh > w_stale (typically 2-3x)
```

**Result**:
- Recent activity highly weighted
- Old signals less influential
- System responds to current conditions

### Adaptive Refresh

Agents refresh active signals:

**WorkingOnIt Refresh**:
```
Every 30 minutes:
- Re-deposit workingonit
- Resets decay timer
- Demonstrates continued activity
- Prevents expiration
```

**Result**:
- Active work maintains signal
- Abandoned work expires
- Automatic detection of stalled tasks

### Temporal Gating

Some actions require temporal conditions:

**Readiness Gating**:
```
Task ready if:
- available pheromone deposited recently (< 2 hours)
- No task_not_ready pheromone present
- No blockers from last 24 hours
```

**Result**:
- Ensures readiness is current
- Prevents acting on stale information
- Temporal validation of conditions

## Mathematical Framework

### Pheromone Field Equation

The complete pheromone field at time t:

```
Φ(t) = { φ_e(t) | e ∈ E }

Where:
- Φ(t) = pheromone field at time t
- φ_e(t) = pheromone profile for entity e
- E = set of all entities (tasks, files, etc.)

φ_e(t) = { p_i(t) | i ∈ P }

Where:
- p_i(t) = aggregated intensity for pheromone type i
- P = set of pheromone types

p_i(t) = Σ I_ij × e^(-λ_i × (t - t_ij))

Where:
- I_ij = intensity of deposit j
- λ_i = decay rate for type i
- t_ij = timestamp of deposit j
```

### Convergence Properties

**Stable Equilibrium**:
- When deposition rate = evaporation rate
- Pheromone field reaches steady state
- Coordination patterns stabilize

**Oscillation**:
- When deposition and evaporation rates oscillate
- Creates dynamic coordination patterns
- Common in competitive scenarios

**Divergence**:
- When deposition rate > evaporation rate
- Pheromone intensity grows unbounded
- Requires manual intervention or decay adjustment

## Practical Implications

### Agent Decision-Making

Agents consider temporal factors:

**Freshness Scoring**:
```python
def temporal_score(pheromone, current_time):
    age_hours = (current_time - pheromone.deposited_at) / 3600
    freshness = math.exp(-age_hours / 4)  # 4-hour freshness window
    return pheromone.intensity * freshness
```

**Recency Weighting**:
```python
def weighted_aggregation(pheromones, current_time):
    total = 0
    weight_sum = 0
    for p in pheromones:
        age_hours = (current_time - p.deposited_at) / 3600
        weight = math.exp(-age_hours / 2)  # 2-hour weighting
        total += p.intensity * weight
        weight_sum += weight
    return total / weight_sum if weight_sum > 0 else 0
```

### Performance Optimization

**Efficient Decay Calculation**:
- Cache decay calculations
- Update only when queried
- Batch process expired pheromones

**Storage Optimization**:
- Remove evaporated pheromones from active storage
- Archive historical pheromone data
- Compress old pheromone records

## Configuration and Tuning

### Decay Rate Selection

**Choosing λ**:

```
Short-lived signals (λ = 0.15-0.2):
- Urgent, time-sensitive information
- Requires frequent refresh
- Example: workingonit, urgent alerts

Medium-lived signals (λ = 0.05-0.1):
- Relevant within workday or few days
- Balances freshness and persistence
- Example: invitations, progress, saturation

Long-lived signals (λ = 0-0.05):
- Persistent patterns and history
- Manually managed
- Example: importance, quality, discoveries
```

### Threshold Configuration

**Evaporation Thresholds**:

```
Aggressive (threshold = 0.5):
- Removes weak signals quickly
- Cleaner pheromone profiles
- May lose subtle cues

Moderate (threshold = 0.3):
- Balances clarity and nuance
- Recommended default
- Most practical scenarios

Conservative (threshold = 0.1):
- Preserves weak signals
- Richer informational landscape
- More computational overhead
```

## Monitoring and Analysis

### Temporal Metrics

**Freshness Metrics**:
- Average pheromone age
- Distribution of deposit timestamps
- Freshness ratio (recent vs. total)

**Decay Metrics**:
- Half-life by pheromone type
- Evaporation rate
- Signal persistence duration

**Aggregation Metrics**:
- Deposit frequency by type
- Accumulation rate
- Multi-deposit patterns

### Visualization

**Temporal Heatmaps**:
- X-axis: Time
- Y-axis: Pheromone intensity
- Color: Pheromone type
- Shows evolution over time

**Decay Curves**:
- Line charts of intensity vs. time
- Compare actual vs. theoretical decay
- Identify anomalies

**Lifecycle Diagrams**:
- Sankey diagrams of pheromone flow
- Deposition → Active → Evaporation
- Volume by stage

## Advanced Topics

### Adaptive Decay Rates

Future systems may adjust decay based on:

**Context-Aware Decay**:
```
λ_effective = λ_base × context_factor

Context factors:
- Project phase (development vs. maintenance)
- Team size (small vs. large)
- Task complexity (simple vs. complex)
- Time pressure (relaxed vs. urgent)
```

**Learning-Based Decay**:
- System learns optimal decay rates
- Adjusts based on coordination quality
- Personalized by project/team

### Cross-Pheromone Interactions

Advanced systems may model pheromone interactions:

**Accelerated Decay**:
- Presence of opposing pheromone accelerates decay
- Example: available accelerates task_not_ready decay
- Faster adaptation to changing conditions

**Protected Decay**:
- Certain combinations prevent evaporation
- Example: workingonit + invitation protects from expiration
- Maintains important signals

### Predictive Dynamics

Machine learning models can predict:

**Pheromone Evolution**:
- Forecast future pheromone states
- Anticipate coordination changes
- Enable proactive agent behavior

**Optimal Deposition Timing**:
- When to deposit for maximum impact
- Balancing freshness and persistence
- Optimizing agent response rates

## Related Concepts

- [Pheromone Types](/conceptbank/features/stigmergy-system/pheromone-types.md) - All 9 pheromone types with decay rates
- [Stigmergy Explained](/conceptbank/features/stigmergy-system/stigmergy-explained.md) - Core stigmergy system
- [Coordination Patterns](/conceptbank/features/stigmergy-system/coordination-patterns.md) - Patterns emerging from dynamics
- [Biological Inspiration](/conceptbank/features/stigmergy-system/biological-inspiration.md) - Natural parallels

---

*Last Updated: 2026-01-18 | Version: 1.0.0 | Status: Published*
