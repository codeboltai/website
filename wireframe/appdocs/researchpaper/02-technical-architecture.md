# Technical Architecture: Stigmergy-Based Multi-Agent Coordination System

## System Overview

The system implements a sophisticated multi-agent coordination platform that leverages stigmergic principles for decentralized task management. The architecture consists of several interconnected components that work together to enable emergent swarm intelligence.

## Core Components

### 1. **Pheromone Coordination System**

#### Pheromone Types and Definitions
```typescript
interface PheromoneTypeDefinition {
    name: string;           // Unique identifier (e.g., 'request_split')
    displayName: string;    // Human-readable name (e.g., 'Request Split')
    description?: string;   // Optional description of pheromone's purpose
    color?: string;         // Optional color for UI display
    isDefault: boolean;     // Whether this is a system default type
    defaultDecayRate?: number; // Decay rate per hour (0 = no decay)
}
```

#### Default Pheromone Types
The system provides 9 built-in pheromone types, each serving a specific coordination purpose:

1. **Request Split** (`request_split`): Signals task decomposition needs
2. **Importance** (`importance`): Indicates task priority and urgency
3. **Saturation** (`saturation`): Shows agent concentration on tasks
4. **Takeup Interest** (`takeup_interest`): Expresses agent availability and interest
5. **Task Not Ready** (`task_not_ready`): Marks blocked tasks
6. **Available** (`available`): Signals resolved blockers
7. **Files Blocked** (`files_blocked`): Indicates file conflicts
8. **Working On It** (`workingonit`): Shows active work progress
9. **Review Added** (`reviewadded`): Triggers deliberation processes

#### Pheromone Deposit and Management
```typescript
interface Pheromone {
    type: string;           // The pheromone type name
    intensity: number;      // Intensity value (0-10, default 1)
    depositedBy: string;    // User ID or Agent ID who deposited
    depositedByName?: string; // Display name of depositor
    depositedAt: string;    // ISO timestamp when deposited
    expiresAt?: string;     // Optional expiration timestamp
    decayRate?: number;     // Override decay rate for this deposit
}
```

### 2. **Job Management System**

#### Job Structure with Pheromone Integration
```typescript
interface Job {
    id: string; // Format: {GroupShortName}-{number} e.g., "COD2-5"
    groupId: string; // Reference to JobGroup
    sequenceNumber: number; // Auto-incrementing within group
    name: string; // Job title/name
    description?: string; // Detailed description
    type: JobType; // 'bug' | 'feature' | 'task' | 'epic' | 'chore'
    status: JobStatus; // 'open' | 'working' | 'hold' | 'closed' | 'archived'
    priority?: JobPriority | null; // 1-4, with 4 being urgent
    assignees: string[]; // List of assignee names/IDs
    labels: string[]; // Tags/labels
    dependencies: JobDependency[];
    pheromones: Pheromone[]; // Pheromones for stigmergy-based coordination
    parentJobId?: string; // For sub-jobs (hierarchical)
    notes?: string; // Additional notes
    // ... other fields
    splitProposals?: JobSplitProposal[];
    splitStatus?: SplitStatus;   // Track if job is split
    discoveredFrom?: string;     // Job ID this was discovered/split from
    lock?: JobLock;              // Job locking state
    unlockRequests?: UnlockRequest[]; // Requests to unlock job
    bids?: JobBid[];             // Active bids on this job
    blockers?: JobBlocker[];     // Blockers preventing execution
}
```

### 3. **Swarm Management System**

#### Swarm Configuration and Agent Management
```typescript
interface SwarmData {
    id: string;
    name: string;
    description: string;
    configuration: SwarmConfiguration;
    createdAt: Date;
    lastActivity: Date;
    agentCount: number;
    teamCount: number;
    roleCount: number;
    vacancyCount: number;
    episodicMemoryId?: string; // ID of episodic memory associated with this swarm
}

interface SwarmConfiguration {
    maxAgents?: number;
    allowExternalAgents: boolean;
    autoOfflineTimeout: number; // milliseconds
    requireRoleForTeamJoin: boolean;
    allowSelfRoleAssignment: boolean;
    vacancyApprovalRequired: boolean;
}
```

#### Agent Information and Status
```typescript
interface AgentInfo {
    id: string;
    name: string;
    status: AgentStatus;
    capabilities: string[];
    teams: string[];
    roles: string[];
    lastSeen: Date;
    currentTask?: string;
    agentType: 'internal' | 'external';
    registeredAt: Date;
}
```

### 4. **Coordination Service**

The `CoordinationService` provides entity-agnostic coordination logic:

```typescript
class CoordinationService {
    // Pheromone operations
    depositPheromone(pheromones: Pheromone[], deposit: PheromoneDeposit): Pheromone[]
    removePheromone(pheromones: Pheromone[], type: string, depositedBy?: string): Pheromone[]
    aggregatePheromones(pheromones: Pheromone[]): PheromoneAggregation[]
    getEffectiveIntensity(pheromone: Pheromone, typeConfig?: PheromoneTypeDefinition): number
    
    // Lock operations
    acquireLock(currentLock: Lock | undefined | null, agentId: string, agentName?: string): Lock
    releaseLock(currentLock: Lock | undefined | null, agentId: string): null
    isLocked(lock: Lock | undefined | null): { locked: boolean; lock?: Lock }
    
    // Unlock request operations
    addUnlockRequest(requests: UnlockRequest[], currentLock: Lock | undefined | null, request: CreateUnlockRequest): UnlockRequest[]
    approveUnlockRequest(requests: UnlockRequest[], currentLock: Lock | undefined | null, requestId: string, respondedBy: string): { requests: UnlockRequest[]; releaseLock: boolean }
    rejectUnlockRequest(requests: UnlockRequest[], currentLock: Lock | undefined | null, requestId: string, respondedBy: string): UnlockRequest[]
}
```

## Data Flow and Interaction Patterns

### 1. **Pheromone Deposition Flow**
1. Agent evaluates task state and requirements
2. Agent determines appropriate pheromone type and intensity
3. Agent deposits pheromone through CoordinationService
4. System updates job state and broadcasts changes
5. Other agents detect pheromone changes and adjust behavior

### 2. **Task Decomposition Flow**
1. Agent detects complex task through `importance` and `request_split` pheromones
2. Agent proposes split with rationale and sub-task definitions
3. Other agents evaluate proposal through pheromone patterns
4. If accepted, system creates sub-tasks with `discoveredFrom` links
5. Parent task status changes to `archived` with `split_up` status

### 3. **Agent Coordination Flow**
1. Agents register with swarm and declare capabilities
2. Agents scan job pheromone patterns for suitable tasks
3. Agents deposit `takeup_interest` pheromones on desirable tasks
4. Conflict resolution through pheromone intensity comparison
5. Successful agent locks task and deposits `workingonit` pheromone

### 4. **Deliberation Integration Flow**
1. `reviewadded` pheromone triggers deliberation process
2. Agents participate in voting and discussion
3. Deliberation results influence pheromone deposition patterns
4. System updates task state based on collective decisions

## Scalability and Performance Considerations

### 1. **Decentralized Architecture**
- No single point of failure
- Linear scalability with agent count
- Local decision-making reduces communication overhead

### 2. **Pheromone Decay Mechanisms**
- Automatic cleanup of stale signals
- Configurable decay rates per pheromone type
- Temporal relevance filtering

### 3. **Event-Driven Communication**
- WebSocket-based real-time updates
- Asynchronous message processing
- Efficient broadcast mechanisms

### 4. **Data Persistence Strategy**
- JSON-based storage with atomic writes
- Separate coordination data from application data
- Optimized read patterns for pheromone aggregation

## Integration Points

### 1. **Job Service Integration**
```typescript
class JobService {
    async depositPheromone(jobId: string, deposit: PheromoneDeposit): Promise<Job | null>
    async removePheromone(jobId: string, type: string, depositedBy?: string): Promise<Job | null>
    async getPheromonesAggregated(jobId: string): Promise<PheromoneAggregation[]>
    async listJobsByPheromone(type: string, minIntensity?: number): Promise<Job[]>
}
```

### 2. **Swarm Service Integration**
- Agent lifecycle management
- Role-based access control
- Team formation and coordination

### 3. **Application Event Bus**
- Cross-component event propagation
- Real-time UI updates
- Audit trail maintenance

## Security and Reliability

### 1. **Access Control**
- Role-based permissions for pheromone operations
- Agent authentication and authorization
- Operation audit logging

### 2. **Data Consistency**
- Atomic file operations
- Conflict resolution mechanisms
- Data validation and integrity checks

### 3. **Error Handling**
- Comprehensive error types and codes
- Graceful degradation strategies
- Recovery mechanisms for agent failures

This architecture demonstrates a sophisticated implementation of stigmergic principles in software engineering, providing a robust foundation for large-scale multi-agent coordination.
