---
id: "stigmergy-algorithms"
level: 4
category: "technical"
subcategory: "algorithms"
estimated_read_time: "20 minutes"
prerequisites: ["stigmergy-principles", "pheromone-types", "agent-economy"]
audience: ["technical", "advanced"]
tags: ["algorithms", "implementation", "stigmergy", "coordination"]
difficulty: "advanced"
---

# Stigmergy Algorithms

## Overview

This document provides a technical deep dive into the stigmergy algorithms that power agent coordination in CodeBolt. Stigmergy is a mechanism of indirect coordination through the environment, inspired by ant colonies and termite mounds. In CodeBolt, agents leave "pheromone trails" in the codebase that other agents detect and respond to, enabling sophisticated coordination without central orchestration.

## Algorithm Foundations

### Core Stigmergy Principle

**Mathematical Definition**:
```
S(a, t) = f(P(a, t), E(a, t), C(a))
```

Where:
- `S(a, t)` = Action selected by agent `a` at time `t`
- `P(a, t)` = Pheromone vector detected by agent at location
- `E(a, t)` = Environmental state at agent location
- `C(a)` = Agent's internal configuration and capabilities

**Key Insight**: Agents don't coordinate directly - they coordinate through modifications to shared environment (codebase).

### Pheromone Representation

**Pheromone Structure**:
```typescript
interface Pheromone {
  id: string;
  type: PheromoneType;  // 9 types
  location: {
    file: string;
    range?: [number, number];  // start, end line/char
  };
  strength: number;  // 0.0 to 1.0
  depositedAt: number;  // timestamp
  depositedBy: string;  // agent ID
  metadata: {
    context?: string;  // related context
    relatedPheromones?: string[];  // pheromone IDs
    expiresAt?: number;  // optional expiry
  };
}
```

**Pheromone Types**:
1. **Completed**: Work finished (strength: 0.9 → 0.0 over 24h)
2. **In Progress**: Work underway (strength: 0.8 → 0.0 over 4h)
3. **Blocked**: Work cannot proceed (strength: 0.7 → 0.0 over 8h)
4. **Needs Review**: Request review (strength: 0.6 → 0.0 over 12h)
5. **Approved**: Approval granted (strength: 0.5 → 0.0 over 48h)
6. **Concerned**: Concern or issue (strength: 0.6 → 0.0 over 6h)
7. **Interesting**: Noteworthy code (strength: 0.4 → 0.0 over 72h)
8. **Question**: Request information (strength: 0.5 → 0.0 over 24h)
9. **Idea**: Suggestion (strength: 0.3 → 0.0 over 168h)

## Pheromone Dynamics

### Deposition Algorithm

```python
def deposit_pheromone(agent, pheromone_type, location, metadata):
    """Agent deposits a pheromone at a location"""

    # Check if pheromone already exists
    existing = find_pheromone(location, pheromone_type, agent.id)

    if existing:
        # Reinforce existing pheromone
        existing.strength = min(1.0, existing.strength + 0.3)
        existing.depositedAt = current_time()
        existing.depositedBy = agent.id
        existing.metadata.update(metadata)
    else:
        # Create new pheromone
        new_pheromone = Pheromone(
            type=pheromone_type,
            location=location,
            strength=INITIAL_STRENGTH[pheromone_type],
            depositedAt=current_time(),
            depositedBy=agent.id,
            metadata=metadata
        )
        add_pheromone(new_pheromone)

    # Trigger decay process
    schedule_decay(new_pheromone)
```

### Decay Algorithm

```python
def decay_pheromone(pheromone):
    """Gradually reduce pheromone strength over time"""

    while pheromone.strength > 0:
        current_time = now()
        age = current_time - pheromone.depositedAt
        decay_rate = DECAY_RATE[pheromone.type]

        # Exponential decay
        pheromone.strength = INITIAL_STRENGTH[pheromone.type] * exp(-decay_rate * age)

        if pheromone.strength < EVAPORATION_THRESHOLD:
            remove_pheromone(pheromone)
            break

        sleep(DECAY_CHECK_INTERVAL)
```

### Reinforcement Algorithm

```python
def reinforce_pheromone(pheromone, agent):
    """Multiple agents reinforcing same pheromone increases strength"""

    # Check if reinforcing agent is different from depositor
    if pheromone.depositedBy != agent.id:
        # Increase strength
        pheromone.strength = min(1.0, pheromone.strength + REINFORCEMENT_AMOUNT)

        # Add to related pheromones (consensus building)
        if not pheromone.metadata.relatedPheromones:
            pheromone.metadata.relatedPheromones = []
        pheromone.metadata.relatedPheromones.append(agent.id)

        # Reset decay timer
        pheromone.depositedAt = current_time()
```

## Detection and Response

### Pheromone Detection Algorithm

```python
def detect_pheromones(agent, location, radius=DETECTION_RADIUS):
    """Agent detects pheromones in its vicinity"""

    nearby_pheromones = []

    # Search for pheromones within radius
    for pheromone in all_pheromones():
        if distance(location, pheromone.location) <= radius:
            # Check if agent can detect this pheromone type
            if pheromone.type in agent.config.detectable_pheromones:
                nearby_pheromones.append(pheromone)

    # Sort by strength (strongest first)
    nearby_pheromones.sort(key=lambda p: p.strength, reverse=True)

    return nearby_pheromones
```

### Response Selection Algorithm

```python
def select_response(agent, detected_pheromones):
    """Agent selects how to respond to detected pheromones"""

    if not detected_pheromones:
        return None  # No pheromones detected

    # Get strongest pheromone
    strongest = detected_pheromones[0]

    # Check if strength is above response threshold
    if strongest.strength < RESPONSE_THRESHOLD:
        return None

    # Select response based on pheromone type and agent state
    response = RESPONSE_STRATEGIES[strongest.type]

    # Check if agent is capable of this response
    if response.required_capability not in agent.capabilities:
        return None

    # Check if agent is not already responding to this pheromone
    if strongest.id in agent.active_responses:
        return None

    return {
        'pheromone': strongest,
        'action': response.action,
        'priority': strongest.strength * response.priority_weight
    }
```

## Coordination Patterns

### Pattern 1: Leader Emergence

```python
def leader_emergence_algorithm(agents, location):
    """High-reputation agents become de facto leaders"""

    # Get all agents at location
    local_agents = [a for a in agents if a.location == location]

    # Calculate reputation for each agent
    reputations = {}
    for agent in local_agents:
        reputations[agent.id] = calculate_reputation(agent)

    # Find highest reputation agent
    leader_id = max(reputations, key=reputations.get)

    # Other agents defer to leader's pheromones
    for agent in local_agents:
        if agent.id != leader_id:
            agent.config.defer_to.append(leader_id)

    return leader_id
```

### Pattern 2: Work Partitioning

```python
def work_partitioning_algorithm(job, agents):
    """Agents partition work based on pheromone signals"""

    partitions = []

    for agent in agents:
        # Detect pheromones in job area
        pheromones = detect_pheromones(agent, job.location)

        # Check for "in progress" or "completed" pheromones
        claimed = any(p.type in ['in_progress', 'completed']
                     for p in pheromones)

        if not claimed:
            # Claim unclaimed work
            deposit_pheromone(agent, 'in_progress', job.location, {})
            partitions.append({
                'agent': agent.id,
                'subtask': allocate_subtask(job, agent)
            })

    return partitions
```

### Pattern 3: Consensus Building

```python
def consensus_algorithm(agents, decision_point):
    """Agents build consensus through pheromone reinforcement"""

    # Each agent deposits opinion pheromone
    for agent in agents:
        opinion = agent.evaluate(decision_point)
        deposit_pheromone(
            agent,
            'idea',
            decision_point.location,
            {'opinion': opinion, 'option': opinion.selected_option}
        )

    # Wait for reinforcement period
    sleep(CONSENSUS_BUILDING_TIME)

    # Find strongest opinion cluster
    pheromone_clusters = cluster_pheromones(
        decision_point.location,
        metadata_key='option'
    )

    # Calculate cluster strength
    cluster_strengths = {
        option: sum(p.strength for p in pheromones)
        for option, pheromones in pheromone_clusters.items()
    }

    # Select strongest option
    consensus_option = max(cluster_strengths, key=cluster_strengths.get)

    return consensus_option
```

## Performance Characteristics

### Time Complexity

- **Deposition**: O(1) - Direct insertion to pheromone store
- **Detection**: O(n) where n = pheromones within detection radius
- **Decay**: O(m) where m = total pheromones (background process)
- **Response Selection**: O(n log n) for sorting detected pheromones

### Space Complexity

- **Pheromone Storage**: O(p) where p = total active pheromones
- **Detection Cache**: O(d) where d = detection radius × pheromone density
- **Decay Queue**: O(p) for tracking decay schedules

### Scalability

**Horizontal Scaling**:
- Pheromone detection is localized (agents only scan nearby areas)
- Decay process is parallelizable across pheromone clusters
- No central coordinator needed

**Vertical Scaling**:
- Pheromone store can be partitioned by location
- Detection radius can be adjusted based on agent capabilities
- Decay rates can be tuned based on system load

## Implementation Considerations

### Pheromone Persistence

**Storage Options**:
1. **In-Memory**: Fastest, but lost on restart
2. **File-Based**: Persistent, slower
3. **Database**: Best of both, but adds complexity

**Recommended**: Hybrid approach
- Hot pheromones (recent, high-strength) in memory
- Cold pheromones (old, low-strength) in database
- Periodic flush from memory to database

### Conflict Resolution

**When multiple agents want to deposit same pheromone**:
1. **First-writer-wins**: First agent to deposit wins
2. **Strongest-wins**: Agent with highest reputation wins
3. **Merge**: Combine metadata from both agents

**Recommended**: First-writer-wins with reinforcement
- First agent deposits pheromone
- Other agents reinforce if they agree
- Conflicting opinions create separate pheromones
- Strongest cluster wins through reinforcement

### Performance Optimization

**Caching Strategies**:
```python
# Cache recently detected pheromones per location
pheromone_cache = {}

def detect_pheromones_optimized(agent, location):
    cache_key = hash(location)

    if cache_key in pheromone_cache:
        cached_pheromones, cache_time = pheromone_cache[cache_key]
        if current_time() - cache_time < CACHE_TTL:
            return cached_pheromones

    # Cache miss or expired
    pheromones = detect_pheromones(agent, location)
    pheromone_cache[cache_key] = (pheromones, current_time())

    return pheromones
```

**Spatial Indexing**:
- Use R-tree or quadtree for spatial queries
- Index pheromones by location for faster detection
- Update index on pheromone deposition/removal

## Error Handling

### Pheromone Corruption

**Detection**:
```python
def validate_pheromone(pheromone):
    """Validate pheromone integrity"""

    # Check required fields
    if not pheromone.id or not pheromone.type:
        return False

    # Check strength range
    if pheromone.strength < 0 or pheromone.strength > 1:
        return False

    # Check timestamp
    if pheromone.depositedAt > current_time():
        return False

    # Check location exists
    if not file_exists(pheromone.location.file):
        return False

    return True
```

**Recovery**:
- Remove corrupted pheromones
- Log corruption for debugging
- Optionally reconstruct from related pheromones

### Agent Isolation

**When agent becomes isolated** (can't detect pheromones):
1. **Retry detection** with larger radius
2. **Fall back to direct communication** (mail, deliberation)
3. **Alert human** for intervention
4. **Pause agent** if isolation persists

## Monitoring and Debugging

### Pheromone Visualization

**Visualization Strategies**:
- **Heat maps**: Show pheromone density across codebase
- **Flow diagrams**: Show pheromone-based agent movement
- **Time-lapse**: Show pheromone evolution over time
- **Type filtering**: View specific pheromone types

### Metrics to Track

**Pheromone Metrics**:
- Active pheromone count
- Average pheromone strength
- Pheromone type distribution
- Pheromone age distribution
- Reinforcement rate

**Agent Metrics**:
- Pheromone detection rate
- Response success rate
- Response latency
- Coordination efficiency (work completed / total effort)

## References

### Academic Papers
- Grassé, P.P. (1959). "La reconstruction du nid et les coordinations inter-individuelles chez Bellicositermes natalensis"
- Dorigo, M. et al. (1999). "Ant algorithms for discrete optimization"
- Theraulaz, G. & Bonabeau, E. (1999). "A brief history of stigmergy"

### Related Concepts
- [Stigmergy Principles](../../core/philosophy/stigmergy-principles.md)
- [Pheromone Types](../../features/stigmergy-system/pheromone-types.md)
- [Coordination Patterns](../../features/stigmergy-system/coordination-patterns.md)
- [Agent Economy](../../features/agent-economy/)

---

**Next**: [Agent Runtime Internals](agent-runtime-internals.md) | [← Back to Level 2](../01-category-overviews/04-coordination.md)
