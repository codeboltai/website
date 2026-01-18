---
id: "agent-hooks"
title: "Agent Hooks System"
category: "features"
subcategory: "agent-management"
tags: ["hooks", "events", "triggers", "automation", "workflow"]
audience: ["technical"]
difficulty: "intermediate"
last_updated: "2026-01-18"
version: "1.0.0"
related_concepts: ["agent-types", "agent-configuration", "agent-debugging"]
content_type: "concept"
status: "published"
phase: 1
---

# Agent Hooks System

## Executive Summary

Agent Hooks enable event-driven automation by triggering agents or actions in response to specific system events—file changes, Git operations, thread lifecycle, or agent execution. This declarative automation system eliminates manual workflows and ensures consistent responses to common development events.

## Overview

Hooks in CodeBolt follow a simple "when-then" pattern: **when** an event occurs, **then** execute a specified action. This event-driven architecture enables:

- **Automated Workflows**: Trigger agents without manual intervention
- **Consistent Processes**: Ensure every file change is processed
- **Event Reactions**: Respond to Git commits, agent completions, etc.
- **Custom Pipelines**: Build CI/CD workflows declaratively

Hooks are stored as YAML configuration files and managed through the Agent Hooks panel, providing both visual configuration and code-based definition.

## Hook Structure

### Basic Syntax

```yaml
name: "Hook Name"
description: "What this hook does"
enabled: true
version: "1.0.0"

when:
  type: <trigger_type>
  # Trigger-specific configuration

then:
  type: <action_type>
  # Action-specific configuration
```

### Complete Example

```yaml
name: "Auto-Format on Save"
description: "Run formatter when TypeScript files are modified"
enabled: true
version: "1.0.0"

when:
  type: fileUpdated
  patterns:
    - "**/*.ts"
    - "**/*.tsx"

then:
  type: runAgent
  agentId: "code-formatter"
  instruction: "Format this file according to project standards"
  runInSameThread: true
```

## Trigger Types

Triggers define **when** a hook executes. CodeBolt supports four trigger categories:

### 1. File Triggers

Respond to file system events.

#### fileCreated
**Fires**: When a new file is created

**Use Cases**:
- Add header templates to new files
- Initialize documentation
- Run linters on new code

**Configuration**:
```yaml
when:
  type: fileCreated
  patterns:
    - "**/*.ts"       # All TypeScript files
    - "src/**/*.js"   # JS files in src directory
    - "*.md"          # Markdown in root
```

#### fileUpdated
**Fires**: When an existing file is modified

**Use Cases**:
- Auto-format on save
- Trigger documentation updates
- Validate changes

**Configuration**:
```yaml
when:
  type: fileUpdated
  patterns:
    - "**/*.ts"
    - "**/*.tsx"
```

#### fileDeleted
**Fires**: When a file is deleted

**Use Cases**:
- Clean up related files
- Update documentation
- Remove from project tracking

### 2. Git Triggers

Respond to version control events.

#### gitCommit
**Fires**: When a commit is created

**Use Cases**:
- Run tests before commit
- Generate commit message
- Update changelog

**Configuration**:
```yaml
when:
  type: gitCommit
  branches:
    - main
    - develop
    - "feature/*"
```

#### gitPush
**Fires**: When changes are pushed to remote

**Use Cases**:
- Trigger CI/CD pipeline
- Notify team
- Deploy to staging

### 3. Thread Triggers

Respond to chat thread lifecycle events.

#### threadCreated
**Fires**: When a new chat thread starts

**Configuration**:
```yaml
when:
  type: threadCreated
  creatorFilter: user  # 'user' | 'agent' | 'any'
```

#### threadCompleted
**Fires**: When a chat thread finishes

**Configuration**:
```yaml
when:
  type: threadCompleted
  creatorFilter: any
```

### 4. Agent Triggers

Respond to agent execution events.

#### agentStarted
**Fires**: When an agent begins execution

**Configuration**:
```yaml
when:
  type: agentStarted
  agentTypeFilter: main  # 'main' | 'sub' | 'any'
```

#### agentCompleted
**Fires**: When an agent finishes execution

**Configuration**:
```yaml
when:
  type: agentCompleted
  agentTypeFilter: any
```

## Action Types

Actions define **what** happens when a hook triggers.

### 1. runAgent

Execute an agent with optional instructions.

**Configuration**:
```yaml
then:
  type: runAgent
  agentId: "code-reviewer"
  instruction: "Review this file for security issues"
  runInSameThread: true  # Continue in current thread
```

### 2. runActionBlock

Execute a predefined ActionBlock workflow.

**Configuration**:
```yaml
then:
  type: runActionBlock
  actionBlockId: "deploy-to-staging"
```

### 3. runCommand

Execute a terminal command.

**Configuration**:
```yaml
then:
  type: runCommand
  command: "npm run lint"
```

## Common Hook Patterns

### Pattern 1: Auto-Formatting

```yaml
name: "Auto-Format TypeScript"
description: "Run prettier on TypeScript files when saved"
enabled: true
version: "1.0.0"

when:
  type: fileUpdated
  patterns: ["**/*.ts"]

then:
  type: runCommand
  command: "npx prettier --write {{filepath}}"
```

### Pattern 2: Pre-Commit Validation

```yaml
name: "Pre-Commit Tests"
description: "Run tests before committing to main"
enabled: true
version: "1.0.0"

when:
  type: gitCommit
  branches: [main, develop]

then:
  type: runCommand
  command: "npm test"
```

### Pattern 3: Documentation Generation

```yaml
name: "Auto-Generate Docs"
description: "Update documentation when source files change"
enabled: true
version: "1.0.0"

when:
  type: fileUpdated
  patterns: ["src/**/*.ts"]

then:
  type: runAgent
  agentId: "doc-generator"
  instruction: "Generate documentation for {{filepath}}"
```

## Best Practices

1. **Single Purpose**: Each hook should do one thing well
2. **Fast Execution**: Keep hooks lightweight
3. **Be Specific**: Use precise patterns and filters
4. **Error Handling**: Account for failure cases
5. **Monitor**: Track hook execution metrics

## Related Concepts

- **[Agent Types](/conceptbank/features/agent-management/agent-types.md)**: Understanding agent sources
- **[Agent Configuration](/conceptbank/features/agent-management/agent-configuration.md)**: Agent metadata and settings
- **[Agent Debugging](/conceptbank/features/agent-management/agent-debugging.md)**: Monitoring hook execution
