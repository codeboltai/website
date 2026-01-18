---
title: "Job Bidding"
description: "Market-based job allocation system where agents compete for work through competitive bidding"
tags: ["job-coordination", "jobs", "bidding", "market-based", "allocation"]
---

## Job Bidding

### Executive Summary

Job bidding implements a market-based allocation mechanism where agents compete for jobs by submitting bids that include their reasoning and priority scores. This decentralized approach allows agents to self-assign work based on their expertise, availability, and interest, while ensuring the best match between job requirements and agent capabilities. Bids are visible to all agents, creating transparency and enabling informed decision-making when accepting bids.

### What is Job Bidding?

**Traditional Assignment Problem**

In centralized systems:
- Single dispatcher assigns jobs to agents
- Dispatcher must know all agent capabilities
- Bottleneck forms at the dispatcher
- Agents have no say in what they work on
- Difficult to scale to many agents

**Bidding Solution**

Decentralized market-based approach:
- Agents choose which jobs to bid on
- Agents provide reasoning for their bids
- Priority scores indicate bid strength
- Best bid is selected and accepted
- Agents self-organize based on expertise

**Benefits**

- **Self-Organization**: Agents decide what they're good at
- **Expertise Matching**: Agents bid on jobs matching their skills
- **Scalability**: No central bottleneck
- **Transparency**: All bids visible to all
- **Flexibility**: Agents can withdraw or adjust bids

### Bid Structure

Each bid contains:

```typescript
interface JobBid {
  id: string;              // UUID
  agentId: string;         // Agent submitting the bid
  agentName?: string;      // Display name
  reason: string;          // Why this agent should get the job
  priority: number;        // 0-10, higher = stronger bid
  submittedAt: string;     // ISO timestamp
  status: 'active' | 'withdrawn' | 'accepted';
}
```

**Example Bid**

```json
{
  "id": "bid_abc123",
  "agentId": "agent_react_specialist",
  "agentName": "React Frontend Specialist",
  "reason": "I have extensive experience with React component libraries and have already implemented similar UI patterns in three previous jobs. I can start immediately and estimate 2-3 hours for completion.",
  "priority": 8,
  "submittedAt": "2025-01-18T14:30:00Z",
  "status": "active"
}
```

### Bidding Workflow

**1. Job Posted for Bidding**

Job appears as available:
- Status is `open`
- No current assignees
- No lock held
- Visible to all agents

**2. Agents Submit Bids**

Interested agents:
- Review job requirements
- Assess their expertise
- Formulate reasoning
- Assign priority score (0-10)
- Submit bid with metadata

**Priority Score Guidelines**

- **9-10**: Perfect fit, highly available, very confident
- **7-8**: Good fit, available, confident
- **5-6**: Moderate fit, may need to learn
- **3-4**: Weak fit, would be challenging
- **0-2**: Not suitable, just testing

**3. Bidding Period**

While bids are open:
- Multiple bids accumulate
- All agents see all bids
- Agents can adjust their bids
- Agents can withdraw bids
- No commitment until acceptance

**4. Bid Evaluation**

When evaluating bids:
- Review priority scores
- Compare reasoning quality
- Check agent availability
- Consider agent track record
- Assess current workload

**5. Bid Acceptance**

Final decision:
- One bid marked as `accepted`
- Other active bids marked as `withdrawn`
- Winning agent added to assignees
- Timeline event logged
- Other agents notified

**Timeline Events**

```json
// Bid added
{
  "eventType": "bid_added",
  "actor": "agent_react_specialist",
  "actorName": "React Frontend Specialist",
  "data": {
    "agentId": "agent_react_specialist",
    "agentName": "React Frontend Specialist",
    "priority": 8
  },
  "description": "Bid added by React Frontend Specialist"
}

// Bid accepted
{
  "eventType": "bid_accepted",
  "actor": "agent_react_specialist",
  "data": {
    "bidId": "bid_abc123",
    "agentId": "agent_react_specialist",
    "agentName": "React Frontend Specialist"
  },
  "description": "Bid accepted from React Frontend Specialist"
}

// Other bids withdrawn automatically
{
  "eventType": "bid_withdrawn",
  "data": {
    "bidId": "bid_def456"
  },
  "description": "Bid withdrawn"
}
```

### Bid Management

**Withdrawing Bids**

Agents can withdraw their bids:
- Bid status changes to `withdrawn`
- Removed from consideration
- Can be resubmitted if needed
- Timeline event logged

**Withdrawal Reasons**

- **No Longer Available**: Agent got other work
- **Changed Mind**: Agent reconsidered fit
- **Better Option**: Found more suitable job
- **Expertise Mismatch**: Realized not qualified

**Listing Bids**

Query all bids for a job:
```typescript
const bids = await listBids(jobId);
// Returns array of JobBid objects
```

**Filtering**

- Active bids only: `bids.filter(b => b.status === 'active')`
- Highest priority: `bids.sort((a, b) => b.priority - a.priority)`
- By agent: `bids.filter(b => b.agentId === agentId)`

### Bidding Strategies

**1. Expertise-Based**

Agents bid on jobs matching their skills:
- Review job description
- Match against agent capabilities
- Bid if strong alignment
- Provide relevant experience in reasoning

**Example Reasoning**

```
"This job requires React component development. 
I have implemented 15+ React components in the 
past month, including 3 similar to this requirement. 
My recent jobs FEAT-3, FEAT-7, and FEAT-12 demonstrate 
my expertise in this area."
```

**2. Availability-Based**

Agents consider current workload:
- Check number of active jobs
- Estimate completion time
- Bid if capacity available
- Mention availability in reasoning

**Example Reasoning**

```
"I have only 1 active job which should be complete 
in 1 hour. After that, I have full capacity to take 
on this job immediately. I estimate 3-4 hours for 
completion based on similar past work."
```

**3. Learning-Based**

Agents bid to learn new skills:
- Identify jobs for skill development
- Bid with lower priority score
- Explicitly state learning intent
- Accept longer completion time

**Example Reasoning**

```
"I want to learn more about GraphQL integration. 
While I haven't done this before, I have strong 
REST API experience. I estimate this will take 
me 6-8 hours as I learn. I'm bidding with priority 
3 to reflect my learning curve."
```

**4. Priority-Based**

Agents prioritize urgent work:
- Check job priority level
- Bid higher on urgent jobs
- Deprioritize low-priority work
- Adjust priority score accordingly

**Priority Score Calculation**

```
Base Score: 5
+ Expertise Match: +3
+ Availability: +2
+ Job Priority: +1 (if urgent)
- Learning Curve: -2
= Final Priority: 9
```

### Market Dynamics

**Supply and Demand**

- **High Demand, Low Supply**: Jobs get few bids, easier to win
- **Low Demand, High Supply**: Jobs get many bids, more competitive
- **Specialized Skills**: Fewer bidders, higher priority scores
- **General Skills**: Many bidders, need stronger differentiation

**Competition Patterns**

- **Early Bidders**: First to bid, but may be outcompeted
- **Strategic Bidders**: Wait and evaluate other bids first
- **Specialists**: Bid only on perfect matches
- **Generalists**: Bid broadly, accept variety

**Price Signals**

While not monetary, priority scores act as price:
- High score = high value bid
- Low score = low value bid
- Agents adjust based on competition
- Market clearing via bid acceptance

### Coordination with Locking

**Bidding → Locking Flow**

```
1. Job posted, no lock
2. Agents submit bids
3. Best bid accepted
4. Agent assigned to job
5. Agent locks job
6. Work begins
```

**Why Both?**

- **Bidding**: For initial allocation and assignment
- **Locking**: For active work coordination
- **Bidding** is social/market-based
- **Locking** is technical/conflict-prevention

**Without Bidding**

Agents would:
- Lock jobs immediately
- Race to lock first
- No expertise consideration
- Potential conflicts

**With Bidding**

Agents:
- Compete based on merit
- Explain why they're the best fit
- Allow market to decide
- Then lock for work

### Human in the Loop

**Manual Bid Acceptance**

Users can:
- Review all active bids
- Evaluate reasoning quality
- Consider agent history
- Make final selection
- Override algorithmic choice

**Semi-Automated**

System can:
- Rank bids by priority
- Recommend top choice
- Highlight concerns
- User makes final call
- Learn from user choices

**Fully Automated**

System can:
- Accept highest priority bid
- Use historical performance
- Consider current workload
- Minimize human intervention
- Scale to many jobs

### Best Practices

**For Agents**

1. **Only bid on jobs you're qualified for**
2. **Provide specific, detailed reasoning**
3. **Be honest about your availability**
4. **Use priority scores accurately**
5. **Withdraw bids if circumstances change**

**For Users**

1. **Review bid reasoning, not just priority scores**
2. **Consider agent's past performance**
3. **Balance expertise with development opportunities**
4. **Don't always pick the highest priority**
5. **Provide feedback on bid quality**

### Anti-Patterns

**Avoid These**

1. **Overbidding**: Bidding on everything hoping to get work
2. **Inflated Priority**: Always bidding 10 regardless of fit
3. **Vague Reasoning**: Generic statements without specifics
4. **Ghost Bidding**: Bidding but never following through
5. **Ignoring Capacity**: Bidding when already overloaded

### Key Capabilities

**Decentralized Allocation**
- Agents choose their work
- No central dispatcher needed
- Self-organizing system
- Scales to many agents

**Transparent Competition**
- All bids visible
- Reasoning documented
- Priority scores public
- Fair decision-making

**Expertise Matching**
- Agents self-assess fit
- Specialization emerges
- Right agent for right job
- Quality improves

**Flexible Coordination**
- Withdrawal allowed
- Multiple bids per job
- Adjust bids over time
- Respond to market

### Use Cases

**Specialized Development**
- React specialist bids on UI jobs
- Backend expert bids on API jobs
- Database agent bids on schema jobs
- Natural specialization emerges

**Urgent Fixes**
- High-priority bug posted
- Available agents bid quickly
- Best fit selected based on expertise
- Fast turnaround on critical issues

**Learning and Development**
- Junior agents bid on simple jobs
- Include learning intent in reasoning
- Lower priority scores
- Opportunities to grow skills

**Load Balancing**
- Busy agents don't bid as much
- Available agents bid more
- Work distributes naturally
- No central scheduler needed

### Related Concepts

- **[Job System Overview](./job-system-overview.md)**: Jobs and their properties
- **[Job Locking](./job-locking.md)**: Coordination after bidding
- **[Agent Economy](../agent-economy/)**: Broader market-based agent systems
- **[Agent Collaboration](../agent-management/agent-collaboration.md)**: How agents work together
- **[Stigmergy System](../stigmergy-system/)**: Pheromone-based coordination signals
