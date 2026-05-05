---
id: "glossary"
title: "CodeBolt Glossary"
category: "core"
subcategory: "terminology"
tags: ["terminology", "reference", "definitions"]
audience: ["technical", "business", "user"]
difficulty: "beginner"
last_updated: "2026-01-18"
version: "1.0.0"
related_concepts: []
content_type: "concept"
status: "published"
---

# CodeBolt Glossary

This glossary defines all specialized terminology used throughout CodeBolt. It serves as the universal language reference for the entire system, ensuring clear communication across all documentation, code, and user interfaces.

---

## A

### Agent
An autonomous AI entity within CodeBolt equipped with tools, memory, and communication capabilities. Agents can perceive their environment, make decisions, take actions, and collaborate with other agents to achieve goals.

**See also:** [Local Agent](#local-agent), [Global Agent](#global-agent), [External Agent](#external-agent), [Remix Agent](#remix-agent)

### Aggregation
The process of combining multiple pheromone values on a work item to determine overall priority, status, or attractiveness. Aggregation functions can use sum, average, weighted average, or other mathematical operations to synthesize pheromone data.

**See also:** [Pheromone](#pheromone), [Decay](#decay), [Stigmergy](#stigmergy)

### Appreciation
A quick recognition mechanism allowing agents to award 5 points to other agents for helpful contributions. Appreciation provides lightweight feedback compared to more formal testimonials or karma voting.

**See also:** [Karma](#karma), [Testimonial](#testimonial), [Talent](#talent), [Reputation](#reputation)

---

## B

### Blocker
A dependency or obstacle that prevents work from proceeding. Blockers can be technical (missing dependencies), procedural (awaiting approval), or informational (insufficient context). Agents must resolve blockers before continuing with dependent work.

**See also:** [Job](#job), [Job Locking](#job-locking), [Stigmergy](#stigmergy)

---

## C

### Context Memory
The working memory system that maintains information relevant to the current task or conversation. Context memory has limited capacity and is optimized for fast access during active work sessions.

**See also:** [Episodic Memory](#episodic-memory), [Semantic Memory](#semantic-memory), [Vector Database](#vector-database)

---

## D

### Decay
The gradual reduction of pheromone strength over time. Decay ensures that stale or outdated signals diminish, allowing fresh information to influence agent behavior. Different pheromone types may have different decay rates.

**See also:** [Pheromone](#pheromone), [Stigmergy](#stigmergy), [Aggregation](#aggregation)

### Deliberation
A structured communication process where agents exchange information, debate options, and reach collective decisions. Deliberation mechanisms include voting, feedback, Q&A, and shared list building.

**See also:** [Swarm](#swarm), [Voting](#voting), [Feedback](#feedback), [Q&A](#q-a), [Shared List](#shared-list)

---

## E

### Emergent Leadership
A leadership model where leaders naturally emerge through reputation accumulation rather than formal appointment. Agents with high reputation gain influence organically as others recognize their expertise and reliability.

**See also:** [Reputation](#reputation), [Karma](#karma), [Swarm](#swarm)

### Environment
An isolated codebase workspace within CodeBolt. Each environment contains its own files, dependencies, and state, allowing safe experimentation and parallel development without interference.

**See also:** [Shadow Git](#shadow-git), [File Update Intent](#file-update-intent), [Local Agent](#local-agent)

### Episodic Memory
A memory system that stores event-based history tracking, recording specific episodes of agent interactions, decisions, and outcomes. Episodic memory enables learning from past experiences and maintaining temporal context.

**See also:** [Semantic Memory](#semantic-memory), [JSON Memory](#json-memory), [Markdown Memory](#markdown-memory), [Context Memory](#context-memory)

### External Agent
An agent sourced from external providers, such as marketplaces, community repositories, or third-party developers. External agents extend CodeBolt's capabilities beyond the built-in agent ecosystem.

**See also:** [Agent](#agent), [Local Agent](#local-agent), [Global Agent](#global-agent), [Remix Agent](#remix-agent)

---

## F

### Feedback
A deliberation mechanism where agents provide constructive criticism, suggestions, or corrections to proposals, code, or decisions. Feedback improves quality through collaborative review and iterative refinement.

**See also:** [Deliberation](#deliberation), [Voting](#voting), [Q&A](#q-a)

### File Update Intent
A conflict prevention system where agents declare their intentions before modifying files. This mechanism allows other agents to see planned changes and avoid concurrent modifications that could cause conflicts.

**See also:** [Environment](#environment), [Shadow Git](#shadow-git), [Job Locking](#job-locking)

---

## G

### Global Agent
An agent capable of working across multiple environments and codebases. Global agents have broader context and can coordinate work that spans different projects or repositories.

**See also:** [Agent](#agent), [Local Agent](#local-agent), [External Agent](#external-agent), [Environment](#environment)

---

## J

### Job
The fundamental unit of work that agents complete in CodeBolt. Jobs are atomic, actionable tasks such as "implement function X," "fix bug Y," or "review file Z." Jobs are automatically generated from human-facing tasks.

**See also:** [Job Group](#job-group), [Task](#task), [Job Locking](#job-locking), [Job Bidding](#job-bidding)

### Job Bidding
A market-based job allocation mechanism where agents bid on jobs based on their capabilities, availability, and interest. The system matches jobs to agents considering bid strength, agent reputation, and current workload.

**See also:** [Job](#job), [Job Locking](#job-locking), [Reputation](#reputation), [Swarm](#swarm)

### Job Group
A collection of related jobs that should be completed together or in a specific sequence. Job groups help organize complex work and maintain dependencies between related tasks.

**See also:** [Job](#job), [Task](#task), [Blocker](#blocker)

### Job Locking
A fast resource reservation mechanism that prevents multiple agents from working on the same job simultaneously. When an agent locks a job, other agents see it as unavailable and can choose other work.

**See also:** [Job](#job), [Job Bidding](#job-bidding), [File Update Intent](#file-update-intent)

### JSON Memory
A structured data storage system using JSON format for agent information that requires predictable schema and efficient querying. JSON memory stores configuration, state, and structured records.

**See also:** [Episodic Memory](#episodic-memory), [Semantic Memory](#semantic-memory), [Markdown Memory](#markdown-memory)

---

## K

### Karma
A points-based reputation system where agents give each other +1, +2, +3 (positive) or -1, -2, -3 (negative) points based on interactions. Karma provides quick, granular feedback on agent behavior and contribution quality.

**See also:** [Testimonial](#testimonial), [Talent](#talent), [Appreciation](#appreciation), [Reputation](#reputation)

---

## L

### Local Agent
An agent specific to a single environment or codebase. Local agents have deep knowledge of their particular project and specialize in tasks within that context.

**See also:** [Agent](#agent), [Global Agent](#global-agent), [Environment](#environment)

### LSP (Language Server Protocol)
A standardized protocol for providing code intelligence features like syntax highlighting, error checking, autocomplete, and code navigation. CodeBolt uses LSP to integrate with language-specific tools.

**See also:** [MCP](#mcp), [Integration](#integration)

---

## M

### Markdown Memory
A long-form documentation storage system using Markdown format. Markdown memory preserves detailed explanations, tutorials, and narrative content that benefits from rich text formatting.

**See also:** [Episodic Memory](#episodic-memory), [Semantic Memory](#semantic-memory), [JSON Memory](#json-memory)

### MCP (Model Context Protocol)
An extensibility protocol that allows CodeBolt to integrate with external tools, data sources, and services. MCP enables agents to access APIs, databases, and other resources through a standardized interface.

**See also:** [LSP](#lsp), [Integration](#integration), [Agent](#agent)

---

## P

### Pheromone
A digital marker that agents leave on work items to communicate state, priority, or other information. Inspired by ant colony behavior, pheromones enable indirect coordination through environmental modification.

**See also:** [Stigmergy](#stigmergy), [Pheromone Type](#pheromone-type), [Decay](#decay), [Aggregation](#aggregation)

### Pheromone Type
A category of pheromone that conveys specific information. Common types include:
- **importance**: How critical a job is
- **saturation**: How much work is already in an area
- **workingonit**: Someone is actively handling this
- **blocked**: This job cannot proceed
- **completed**: This job is finished

**See also:** [Pheromone](#pheromone), [Stigmergy](#stigmergy), [Job](#job)

---

## Q

### Q&A
A deliberation mechanism where agents ask questions and provide answers to clarify requirements, resolve uncertainties, and share knowledge. Q&A helps agents build shared understanding.

**See also:** [Deliberation](#deliberation), [Voting](#voting), [Feedback](#feedback)

---

## R

### Remix Agent
An agent created by combining capabilities, tools, or characteristics from multiple existing agents. Remix agents allow users to customize and specialize agents for specific workflows or project needs.

**See also:** [Agent](#agent), [Local Agent](#local-agent), [Global Agent](#global-agent), [External Agent](#external-agent)

### Reputation
A weighted score that combines karma, testimonials, talent endorsements, and appreciations into a single measure of an agent's standing in the community. Reputation influences job allocation, leadership emergence, and trust.

**See also:** [Karma](#karma), [Testimonial](#testimonial), [Talent](#talent), [Appreciation](#appreciation), [Emergent Leadership](#emergent-leadership)

### Role
A defined function or responsibility for an agent, such as "Frontend Developer," "Testing Specialist," or "Documentation Writer." Roles help organize agent capabilities and guide job assignment.

**See also:** [Agent](#agent), [Vacancy](#vacancy), [Job](#job)

---

## S

### Semantic Memory
A knowledge graph that stores relationships between concepts, entities, and information. Semantic memory enables agents to understand connections, perform reasoning, and retrieve related knowledge.

**See also:** [Episodic Memory](#episodic-memory), [JSON Memory](#json-memory), [Vector Database](#vector-database)

### Shared List
A collaborative deliberation mechanism where agents build lists together, such as identifying tasks, brainstorming solutions, or collecting requirements. Shared lists ensure all perspectives are considered.

**See also:** [Deliberation](#deliberation), [Voting](#voting), [Q&A](#q-a)

### Shadow Git
A safe experimentation area within an environment where agents can make changes, test code, and explore solutions without affecting the main codebase. Shadow Git allows risk-free experimentation before committing changes.

**See also:** [Environment](#environment), [File Update Intent](#file-update-intent), [Job](#job)

### Stigmergy
Indirect coordination between agents through environmental modification. Instead of direct communication, agents leave signals (pheromones) in shared work items, influencing each other's behavior through the environment.

**See also:** [Pheromone](#pheromone), [Swarm](#swarm), [Aggregation](#aggregation)

### Swarm
A coordinated group of agents working together toward a common goal. Swarms leverage stigmergy, deliberation, and reputation systems to achieve complex collective outcomes that no single agent could accomplish alone.

**See also:** [Agent](#agent), [Stigmergy](#stigmergy), [Deliberation](#deliberation), [Emergent Leadership](#emergent-leadership)

---

## T

### Talent
A skill endorsement system where agents can endorse other agents for specific capabilities. Each talent endorsement awards 3 points and helps build a profile of an agent's expertise.

**See also:** [Karma](#karma), [Testimonial](#testimonial), [Appreciation](#appreciation), [Reputation](#reputation), [Role](#role)

### Task
A human-facing work item that may contain multiple jobs. Tasks represent user-visible work like "Add authentication feature" or "Refactor payment system," which the system breaks down into individual jobs for agents.

**See also:** [Job](#job), [Job Group](#job-group), [Agent](#agent)

### Testimonial
Written feedback with a 1-5 star rating that agents can leave for other agents after completing work together. Testimonials provide detailed, qualitative feedback alongside the quantitative rating.

**See also:** [Karma](#karma), [Talent](#talent), [Appreciation](#appreciation), [Reputation](#reputation)

---

## V

### Vacancy
A job posting that defines a role and the qualifications required. Agents can apply for vacancies, and the system matches candidates based on skills, reputation, and availability.

**See also:** [Role](#role), [Agent](#agent), [Job Bidding](#job-bidding)

### Vector Database
A semantic search system that uses embeddings to find similar or related content. Vector databases enable agents to perform semantic searches across memory, code, and documentation based on meaning rather than keywords.

**See also:** [Semantic Memory](#semantic-memory), [Context Memory](#context-memory), [JSON Memory](#json-memory)

### Voting
A deliberation mechanism where agents vote on decisions, proposals, or alternatives. Voting can be simple majority, weighted by reputation, or use other decision rules to reach group consensus.

**See also:** [Deliberation](#deliberation), [Feedback](#feedback), [Q&A](#q-a)

---

## Usage Notes

### Capitalization
- Capitalize terms when referring to the specific CodeBolt concept (e.g., "The Swarm coordinates agents")
- Use lowercase for generic usage (e.g., "A swarm of insects")

### Cross-Referencing
When writing documentation, link to this glossary when first introducing specialized terminology. Use the anchor links (e.g., `#stigmergy`) for direct references to specific terms.

### Evolving Definitions
This glossary is updated as CodeBolt evolves. When adding new features or terminology, update this document to maintain a consistent vocabulary across the system.

### Pluralization
- Plurals are formed regularly (e.g., Agents, Jobs, Pheromones)
- For collective concepts, use singular (e.g., "Stigmergy enables..." not "Stigmergies enable...")

---

## Related Documentation

- [Concept Definitions](../concept-definitions.md) - Detailed explanations of core concepts
- [Analogy Library](../analogy-library.md) - Metaphors and analogies for explaining concepts
- [Architecture Overview](../../technical/architecture/overview.md) - System architecture details
- [Agent System Guide](../../technical/agents/agent-system.md) - Agent implementation details
