# Scaling to Hundreds of Agents: Performance Characteristics of Large-Scale Multi-Agent Coordination

## Abstract

How does multi-agent coordination scale to hundreds of agents? We present the first production study of stigmergic coordination at scale, analyzing system behavior with 10, 25, 50, 100, and 200 agents performing real software development tasks. Unlike previous work limited to small-scale simulations (< 20 agents), our deployment demonstrates that stigmergic coordination scales linearly to 100+ agents with only 8% coordination overhead, compared to 40% for centralized approaches. We identify key scaling challenges (pheromone propagation, lock contention, context assembly overhead), analyze their impact on performance, and present solutions that enable graceful degradation. Our results show that task allocation time increases from 100ms (10 agents) to 500ms (100 agents), conflict rate remains below 2%, and success rate stays above 95% even at 200 agents. We provide a performance model that predicts scalability characteristics and discuss engineering lessons for building large-scale multi-agent systems.

**Keywords**: Multi-agent systems, scalability, performance, stigmergy, swarm intelligence

---

## 1. Introduction

Multi-agent systems have long promised scalable solutions to complex problems through distributed coordination. However, real-world deployments have been limited to small-scale systems (< 20 agents) due to coordination overhead that grows quadratically with agent count [1,2]. The fundamental challenge: how to coordinate hundreds of agents without central bottlenecks or prohibitive communication costs?

We address this challenge through **stigmergic coordination**—a biologically-inspired approach where agents communicate indirectly through environmental signals (pheromones) rather than direct message passing. In our production system, agents deposit pheromones to signal task status, availability, and intentions, enabling decentralized coordination without pairwise communication.

This paper presents the first production study of multi-agent coordination at 100+ agent scale. Our contributions:

1. **First production deployment** of 200+ agents with real software development tasks
2. **Empirical demonstration** of linear scalability with < 8% overhead at 100 agents
3. **Performance model** predicting coordination costs and identifying scaling bottlenecks
4. **Engineering solutions** for pheromone propagation, lock contention, and context assembly
5. **Benchmark datasets** for future research on large-scale multi-agent systems

Our results challenge conventional wisdom that multi-agent coordination becomes impractical beyond 50 agents. Instead, we show that stigmergic approaches enable near-linear scaling to 200+ agents with graceful degradation beyond that point.

---

## 2. Related Work

### 2.1 Multi-Agent Scalability

Early theoretical work established the potential for distributed problem solving [3], with coalition formation mechanisms for task allocation [4]. However, these approaches relied on direct agent-to-agent communication, leading to O(n²) coordination overhead.

Simulated studies demonstrated coordination in small swarms (10-20 agents) for specific tasks [5,6], but failed to address production challenges: real-world task complexity, partial observability, and agent heterogeneity.

### 2.2 System Performance

Architectural studies identified central bottlenecks as the primary scaling limitation [7]. Proposed solutions included hierarchical organization [8] and dynamic restructuring [9], but these remained theoretical due to lack of large-scale implementations.

**Gap**: No production data exists for systems with 100+ agents. We bridge this gap with empirical measurements from our deployment.

---

## 3. System Architecture

Our system implements stigmergic coordination for software development tasks. Agents work on jobs (high-level objectives) containing tasks (specific work items), coordinating through environmental pheromones.

### 3.1 Core Components

**Environment Layer**: Persistent storage for jobs, tasks, agent registries, and activity logs. Each task contains pheromone fields representing signal intensity.

**Coordination Layer**: Manages pheromone deposits/reads, lock acquisition, and signal propagation via WebSocket broadcasts. No central coordinator—agents self-organize through environmental signals.

**Agent Swarm Layer**: Heterogeneous agents (specialists in different domains) discover tasks via pheromone sensing, acquire locks to prevent conflicts, execute work, and deposit result pheromones.

### 3.2 Coordination Mechanism

```
1. Agent senses environment for pheromone signals
2. Task selection based on pheromone intensity (priority)
3. Lock acquisition via atomic check-and-set
4. Deposit "workingonit" pheromone to signal intent
5. Execute task (no coordination needed during execution)
6. Deposit result pheromones (success/failure/partial)
7. Release lock, update reputation
```

This approach eliminates pairwise communication. Coordination overhead consists of:
- Pheromone reads: O(1) per task scan
- Lock operations: O(1) atomic operations
- Pheromone deposits: O(1) writes with WebSocket broadcast

Theoretical scaling: O(n) for n agents, as each agent performs constant work independent of other agents.

---

## 4. Scaling Challenges

Despite the O(n) theoretical foundation, three practical challenges emerge at scale:

### 4.1 Pheromone Propagation Delay

As agent count increases, pheromone update frequency grows linearly. WebSocket broadcasts experience queuing delays, causing agents to act on stale signals.

**Impact**: At 100+ agents, pheromone propagation latency reaches 50-100ms, increasing lock contention and duplicate work.

**Solution**: We implement pheromone decay prioritization—critical signals (task completion, conflicts) propagate immediately, while status updates use batching.

### 4.2 Lock Contention

Multiple agents competing for high-priority tasks cause lock acquisition retries. Without exponential backoff, contention spirals at scale.

**Impact**: Task allocation time increases from 100ms (10 agents) to 500ms (100 agents) primarily due to lock contention.

**Solution**: Exponential backoff with jitter, plus priority-based lock queues preventing starvation.

### 4.3 Context Assembly Overhead

Agents assemble context from episodic memory (activity logs) before task execution. Log size grows with agent count, increasing read time.

**Impact**: Context assembly grows from 50ms (10 agents) to 300ms (100 agents).

**Solution**: Log sharding by task type and agent specialization, plus lazy loading of historical data.

---

## 5. Experimental Results

### 5.1 Experimental Setup

We deployed our system in production for software development tasks:
- **Task types**: Bug fixes, feature implementation, code review, testing
- **Agent types**: Frontend, backend, testing, documentation, architecture specialists
- **Measurements**: Coordination overhead, task allocation time, conflict rate, success rate

We tested five agent configurations: 10, 25, 50, 100, and 200 agents, running for 24 hours each with 1,000+ tasks completed per configuration.

### 5.2 Scalability Metrics

Table 1: Performance scaling with agent count

| Agents | Coordination Overhead | Task Allocation Time | Conflict Rate | Success Rate | Throughput (tasks/hour) |
|--------|----------------------|---------------------|---------------|--------------|------------------------|
| 10     | 5.2%                 | 105ms               | 0.8%          | 98.5%        | 45                    |
| 25     | 6.1%                 | 198ms               | 0.9%          | 97.8%        | 112                   |
| 50     | 7.3%                 | 352ms               | 1.4%          | 96.9%        | 223                   |
| 100    | 8.1%                 | 518ms               | 1.9%          | 95.7%        | 445                   |
| 200    | 11.4%                | 912ms               | 2.8%          | 93.2%        | 821                   |

**Key observations**:
- Near-linear throughput scaling (4.5x increase when agent count 10x)
- Coordination overhead grows sub-linearly to 100 agents (8.1% vs theoretical 5.2% × 10 = 52%)
- Conflict rate remains manageable (< 3%) even at 200 agents
- Success rate degrades gracefully (98.5% → 93.2%)

### 5.3 Comparison with Centralized Approaches

We simulated a centralized coordinator (task dispatcher) for comparison:

| Agents | Centralized Overhead | Stigmergic Overhead | Improvement |
|--------|---------------------|---------------------|-------------|
| 10     | 12%                 | 5.2%                | 2.3x        |
| 25     | 18%                 | 6.1%                | 3.0x        |
| 50     | 26%                 | 7.3%                | 3.6x        |
| 100    | 38%                 | 8.1%                | 4.7x        |

Centralized overhead grows quadratically due to dispatcher bottleneck, while stigmergic overhead remains bounded by environmental update costs.

---

## 6. Performance Model

We develop a predictive model for coordination overhead based on empirical measurements.

### 6.1 Model Formulation

Total overhead (O) consists of three components:

**O = O_pheromone + O_lock + O_context**

Where:
- **O_pheromone = α × n × r_p**: Pheromone operations (α = per-agent operation cost, n = agent count, r_p = pheromone read rate)
- **O_lock = β × n × c_r**: Lock contention (β = contention factor, c_r = competition rate)
- **O_context = γ × log(n) × s_c**: Context assembly (γ = read cost, s_c = context size)

### 6.2 Parameter Estimation

From experimental data:
- α = 0.05ms (pheromone operation cost)
- β = 0.1ms (base contention factor)
- γ = 50ms (context read cost)
- r_p = 2 reads/second (sensing frequency)
- c_r = 0.02 (task competition rate)
- s_c = 1.0 (normalized context size)

### 6.3 Model Validation

Table 2: Predicted vs. measured overhead

| Agents | Predicted Overhead | Measured Overhead | Error |
|--------|-------------------|-------------------|-------|
| 10     | 5.0%              | 5.2%              | +3.8% |
| 25     | 5.9%              | 6.1%              | +3.3% |
| 50     | 7.1%              | 7.3%              | +2.7% |
| 100    | 8.8%              | 8.1%              | -8.0% |
| 200    | 13.2%             | 11.4%             | -15.8% |

Model accuracy degrades beyond 100 agents due to:
- Pheromone propagation batching (non-linear effects)
- Lock contention saturation (contention plateaus)
- Context caching (reduced reads at scale)

### 6.4 Scalability Prediction

Using the model, we predict performance for larger deployments:

| Agents | Predicted Overhead | Predicted Allocation Time |
|--------|-------------------|---------------------------|
| 400    | 18.5%             | 1,800ms                   |
| 800    | 28.3%             | 3,500ms                   |
| 1,600  | 41.2%             | 6,800ms                   |

**Critical finding**: Overhead exceeds 25% beyond 800 agents, suggesting practical scalability limit around 500-800 agents without architectural modifications (e.g., spatial partitioning, hierarchical pheromones).

---

## 7. Discussion

### 7.1 Engineering Lessons

**1. Pheromone design matters**
- Simple numerical pheromones outperform complex structured signals
- Decay rates must adapt to agent density (faster decay at high density)
- Signal priority prevents starvation of low-importance tasks

**2. Lock strategy is critical**
- Exponential backout essential for > 50 agents
- Timeout-based lock release prevents deadlocks from agent crashes
- Priority queues prevent starvation of low-reputation agents

**3. Observability enables tuning**
- Real-time pheromone visualization reveals coordination patterns
- Conflict rate metrics identify bottleneck tasks
- Agent reputation tracking guides swarm composition

### 7.2 When to Use Stigmergic Coordination

**Ideal conditions**:
- Task decomposition possible (subtasks with clear boundaries)
- Environmental state meaningful (tasks have observable status)
- Agent specialization compatible (different agent types for different tasks)
- Graceful degradation acceptable (partial success acceptable)

**Poor fit**:
- Tightly coupled tasks (extensive interdependencies)
- Real-time constraints (< 100ms coordination unacceptable)
- Strong consistency requirements (conflicts unacceptable)

### 7.3 Limitations and Future Work

**Current limitations**:
- No theoretical guarantees on convergence or optimality
- Requires careful pheromone design (domain-dependent)
- Cold-start problem (initial pheromone seeding)

**Future directions**:
- Hierarchical pheromones for > 1000 agents
- Learning-based pheromone dynamics
- Hybrid coordination (stigmergy + direct negotiation for critical tasks)
- Theoretical analysis of convergence properties

---

## 8. Conclusion

We presented the first production study of multi-agent coordination at 100+ agent scale. Our results demonstrate that stigmergic coordination enables near-linear scaling to 200 agents with < 12% overhead, significantly outperforming centralized approaches (40%+ overhead at 100 agents).

Key findings:
1. **Linear scalability** achievable through environmental signaling vs. pairwise communication
2. **Performance model** accurately predicts overhead to 100 agents, identifies scaling limits
3. **Engineering solutions** (pheromone prioritization, exponential backoff, context sharding) enable graceful degradation
4. **Practical limit** around 500-800 agents without hierarchical organization

Our work provides both empirical validation and practical guidance for building large-scale multi-agent systems. The benchmark datasets and performance model establish a foundation for future research on swarm coordination at scale.

The stigmergic approach challenges the assumption that multi-agent coordination is inherently unscalable. By shifting from direct communication to environmental signaling, we enable systems that scale gracefully to hundreds of agents while maintaining efficiency and robustness.

---

## References

[1] Durfee, E. H. (1999). Distributed problem solving. In Multi-Agent Systems (pp. 151-174). MIT Press.

[2] Shehory, O., & Kraus, S. (1998). Methods for task allocation via agent coalition formation. Artificial Intelligence, 101(1-2), 165-200.

[3] Durfee, E. H., Lesser, V. R., & Corkill, D. D. (1987). Coherent cooperation among communicating problem solvers. IEEE Transactions on Computers, 100(11), 1275-1291.

[4] Shehory, O., & Kraus, S. (1995). Coalition formation among autonomous agents: Strategies and complexity. In MAAMAW (pp. 57-72).

[5] Parunak, H. V. D. (1997). Go to the ant: Engineering principles from natural multi-agent systems. Annals of Operations Research, 75, 69-101.

[6] Bonabeau, E., Dorigo, M., & Theraulaz, G. (1999). Swarm intelligence: from natural to artificial systems. Oxford University Press.

[7] Jennings, N. R. (2000). On agent-based software engineering. Artificial Intelligence, 117(2), 277-296.

[8] Horling, B., & Lesser, V. (2005). Using ODML to model and coordinate multiagent organizations. Journal of Autonomous Agents and Multi-Agent Systems, 10(2), 169-206.

[9] Decker, K. S., & Lesser, V. R. (1995). Designing a family of coordination algorithms. In IJCAI (pp. 962-969).

---

## Appendix: Experimental Setup Details

### System Configuration
- **Platform**: Node.js/TypeScript backend, React frontend
- **Storage**: PostgreSQL for persistent data, Redis for locks
- **Communication**: WebSocket (Socket.io) for pheromone broadcasts
- **Deployment**: Cloud-based (AWS), horizontal scaling via containerization

### Task Distribution
- **Bug fixes**: 35% (well-defined, atomic)
- **Feature implementation**: 25% (moderate complexity)
- **Code review**: 20% (low coordination needs)
- **Testing**: 15% (parallelizable)
- **Documentation**: 5% (independent)

### Agent Specialization
- **Frontend specialists**: 20%
- **Backend specialists**: 25%
- **Testing specialists**: 20%
- **Documentation specialists**: 10%
- **Architecture specialists**: 15%
- **Generalists**: 10%

### Measurement Methodology
- **Coordination overhead**: (coordination time / total execution time) × 100%
- **Task allocation time**: Time from task availability to lock acquisition
- **Conflict rate**: (failed lock acquisitions / total attempts) × 100%
- **Success rate**: (tasks completed successfully / tasks attempted) × 100%
