---
id: "agent-configuration"
title: "Agent Configuration System"
category: "features"
subcategory: "agent-management"
tags: ["configuration", "yaml", "metadata", "settings", "llm"]
audience: ["technical"]
difficulty: "intermediate"
last_updated: "2026-01-18"
version: "1.0.0"
related_concepts: ["agent-types", "agent-creation-code", "agent-sdk"]
content_type: "concept"
status: "published"
phase: 1
---

# Agent Configuration System

## Executive Summary

Agent configuration defines agent behavior, capabilities, and routing rules through YAML-based metadata files. This declarative configuration system enables precise control over which tasks an agent handles, which LLM models it uses, and how it integrates with the development lifecycle—all without modifying agent code.

## Overview

Every agent in CodeBolt has a corresponding `agent.yaml` configuration file that specifies:

- **Identity**: Name, description, version
- **Capabilities**: Supported frameworks, languages, and SDL C phases
- **LLM Configuration**: Model preferences and fallback chains
- **Routing Rules**: When to select this agent for a task
- **Tool Requirements**: Necessary tools and dependencies
- **Actions**: Predefined agent capabilities

This configuration-driven approach enables:
- **Flexible Routing**: Smart agent selection based on task context
- **Model Optimization**: Choose the right LLM for each agent role
- **Lifecycle Integration**: Agents participate in specific development phases
- **Rapid Customization**: Adjust behavior without code changes

## Configuration File Structure

### agent.yaml Location

Agents store their configuration alongside their code:

```
<agent-id>/
├── agent.agentflow     # Workflow definition (JSON)
├── agent.yaml          # Configuration (YAML)
├── package.json        # Dependencies
└── dist/               # Compiled assets
```

### Complete Configuration Example

```yaml
# Basic Metadata
title: "Code Reviewer"
description: "Reviews code for bugs, style issues, and security vulnerabilities"
longDescription: |
  A comprehensive code review agent that analyzes code for:
  - Common bug patterns
  - Style guide violations
  - Security vulnerabilities
  - Performance issues
  - Best practice adherence

version: "1.2.0"
author: "CodeBolt Team"

# LLM Configuration
metadata:
  # Roles this agent can assume
  llm_role:
    - name: "reviewer"
      description: "Main code reviewer role"
      strict: false
      modelorder:
        - "claude-sonnet"
        - "gpt-4"

    - name: "security-expert"
      description: "Security-focused reviewer"
      strict: true
      modelorder:
        - "claude-opus"
        - "gpt-4-turbo"

  # Default LLM settings
  defaultagentllm:
    strict: false
    modelorder:
      - "claude-sonnet"
      - "claude-haiku"

  # Agent routing rules
  agent_routing:
    worksonblankcode: false
    supportedframeworks:
      - "react"
      - "vue"
      - "angular"
      - "nextjs"
      - "svelte"
    supportedlanguages:
      - "typescript"
      - "javascript"
      - "jsx"
      - "tsx"
    worksonexistingcode: true

  # SDLC phases managed
  sdlc_steps_managed:
    - name: "code-review"
      example_instructions:
        - "Review this code for bugs"
        - "Check style compliance"
        - "Verify security best practices"
        - "Analyze performance implications"

    - name: "security-review"
      example_instructions:
        - "Find security vulnerabilities"
        - "Check for SQL injection risks"
        - "Verify authentication patterns"
        - "Analyze data handling"

# Tool dependencies
requiredTools:
  - "file-ops"
  - "git"
  - "search"
  - "llm-inference"

# Predefined actions
actions:
  - name: "reviewFile"
    description: "Review a single file"
    detailDescription: "Performs detailed review of one file including style, bugs, and security"
    actionPrompt: "Review {filepath} for bugs, style issues, and security vulnerabilities"

  - name: "reviewCommit"
    description: "Review a Git commit"
    detailDescription: "Analyzes all changes in a commit for potential issues"
    actionPrompt: "Review commit {commitHash} for issues"
```

## Configuration Sections

### 1. Basic Metadata

**Purpose**: Identify and describe the agent

**Fields**:
- **title**: Short, human-readable name
- **description**: One-line summary
- **longDescription**: Detailed explanation (supports markdown)
- **version**: Semantic version (1.2.0)
- **author**: Creator name or team

**Example**:
```yaml
title: "TypeScript Migrator"
description: "Converts JavaScript to TypeScript"
longDescription: |
  Automatically migrates JavaScript codebases to TypeScript by:
  - Adding type annotations
  - Creating interface definitions
  - Fixing type errors
  - Generating type declarations
version: "2.0.1"
author: "DevTools Team"
```

### 2. LLM Configuration

**Purpose**: Define language model preferences and behavior

#### llm_role

Defines the different roles an agent can assume, each with specific model preferences.

**Structure**:
```yaml
llm_role:
  - name: "role-name"           # Role identifier
    description: "What this role does"
    strict: boolean              # Whether to use strict model adherence
    modelorder:                  # Model preference chain
      - "primary-model"
      - "fallback-model"
```

**Strict Mode**:
- **true**: Agent must use specified model, fails if unavailable
- **false**: Agent can use alternative models if preferred unavailable

**Model Fallback Chain**:
1. Try first model in list
2. If unavailable, try next model
3. Continue until model found or list exhausted

**Example**:
```yaml
llm_role:
  - name: "architect"
    description: "High-level system design"
    strict: true
    modelorder:
      - "claude-opus"      # Best for architecture
      - "gpt-4-turbo"      # Fallback

  - name: "implementer"
    description: "Code implementation"
    strict: false
    modelorder:
      - "claude-sonnet"    # Good balance
      - "gpt-4"           # Fallback
      - "claude-haiku"    # Last resort
```

#### defaultagentllm

Specifies the default LLM configuration when no specific role is active.

**Structure**:
```yaml
defaultagentllm:
  strict: boolean
  modelorder:
    - "model1"
    - "model2"
```

**Example**:
```yaml
defaultagentllm:
  strict: false
  modelorder:
    - "claude-sonnet"
    - "gpt-4"
```

### 3. Agent Routing Rules

**Purpose**: Define when this agent should be selected for a task

#### agent_routing

Controls agent selection based on task context.

**Fields**:

**worksonblankcode**: Boolean
- `true`: Can work on empty projects
- `false`: Requires existing codebase

**supportedframeworks**: String array
- Frameworks this agent understands
- Used for intelligent routing

**supportedlanguages**: String array
- Programming languages this agent handles
- Influences agent selection

**worksonexistingcode**: Boolean
- `true`: Can modify existing code
- `false`: Only creates new code

**Example**:
```yaml
agent_routing:
  worksonblankcode: false        # Needs existing code
  supportedframeworks:
    - "react"
    - "nextjs"
    - "typescript"
  supportedlanguages:
    - "typescript"
    - "javascript"
    - "tsx"
    - "jsx"
  worksonexistingcode: true     # Can modify code
```

**Routing Logic**:

When a task arrives, CodeBolt evaluates agents based on:

1. **Framework Match**: Does agent support the project's framework?
2. **Language Match**: Does agent support the programming language?
3. **Code State**: Is there existing code (vs. blank project)?
4. **Capability Match**: Does agent handle the requested SDLC phase?

**Scoring Example**:
```
Task: "Review React component for bugs"

Agent A (React Code Reviewer):
  - Framework: react ✓
  - Language: typescript ✓
  - Existing code: true ✓
  - SDLC: code-review ✓
  Score: 4/4

Agent B (Python Tester):
  - Framework: python ✗
  Score: 0/4 (not selected)

Agent C (General Purpose):
  - Framework: any (wildcard) ✓
  - Language: any (wildcard) ✓
  - Existing code: true ✓
  - SDLC: code-review ✓
  Score: 4/4 (tie-breaker needed)
```

### 4. SDLC Integration

**Purpose**: Define which development phases this agent participates in

#### sdlc_steps_managed

Lists the Software Development Life Cycle phases this agent handles.

**Structure**:
```yaml
sdlc_steps_managed:
  - name: "phase-name"
    example_instructions:
      - "Example instruction 1"
      - "Example instruction 2"
```

**Common SDLC Phases**:
- **planning**: Requirements analysis, architecture design
- **design**: System design, API design
- **implementation**: Coding, feature development
- **code-review**: Reviewing code for issues
- **testing**: Writing and running tests
- **documentation**: Generating docs
- **deployment**: Deploying to production
- **maintenance**: Bug fixes, updates

**Example**:
```yaml
sdlc_steps_managed:
  - name: "implementation"
    example_instructions:
      - "Implement user authentication"
      - "Create REST API endpoints"
      - "Build React components"

  - name: "code-review"
    example_instructions:
      - "Review this pull request"
      - "Check for bugs in this function"
      - "Verify style compliance"

  - name: "testing"
    example_instructions:
      - "Write unit tests for this module"
      - "Create integration tests"
      - "Generate test cases"
```

**How It Works**:

1. User requests task in specific phase
2. System filters agents by `sdlc_steps_managed`
3. Selects best-matching agent
4. Uses `example_instructions` for prompt engineering

### 5. Tool Dependencies

**Purpose**: Declare required tools and capabilities

#### requiredTools

Lists the tools from the Agent SDK that this agent needs.

**Common Tools**:
- **file-ops**: File system operations
- **git**: Version control
- **search**: Code search
- **llm-inference**: Language model access
- **memory**: Persistent storage
- **chat**: User communication
- **crawler**: Web automation
- **mcp**: External services

**Example**:
```yaml
requiredTools:
  - "file-ops"        # Read/write files
  - "git"            # Version control
  - "search"         # Search code
  - "llm-inference"  # AI reasoning
```

**Tool Availability**:

Before agent execution, CodeBolt verifies:
1. All required tools are available
2. Tools are properly configured
3. Agent has permissions to use tools

If tools are missing, agent execution fails with clear error message.

### 6. Predefined Actions

**Purpose**: Expose common agent operations as reusable actions

#### actions

List of capabilities this agent provides.

**Structure**:
```yaml
actions:
  - name: "action-name"
    description: "Short description"
    detailDescription: "Detailed explanation"
    actionPrompt: "Template for executing this action"
```

**Example**:
```yaml
actions:
  - name: "reviewFile"
    description: "Review a single file"
    detailDescription: "Performs comprehensive code review including bugs, style, and security"
    actionPrompt: "Review {filepath} for potential issues"

  - name: "refactorCode"
    description: "Refactor code snippet"
    detailDescription: "Improves code structure while maintaining functionality"
    actionPrompt: "Refactor this code for better readability and maintainability: {code}"

  - name: "generateTests"
    description: "Generate unit tests"
    detailDescription: "Creates comprehensive unit tests for given code"
    actionPrompt: "Generate unit tests for {filepath} with high coverage"
```

**Using Actions**:

Actions can be invoked in several ways:

1. **Direct Invocation**: User selects action from UI
2. **Hook Trigger**: Action executed by hook
3. **Agent Call**: Another agent invokes this action
4. **API Call**: Programmatic invocation

**Action Templates**:

The `actionPrompt` field supports variables:
- `{filepath}`: File being processed
- `{code}`: Code snippet
- `{commitHash}`: Git commit
- `{branch}`: Git branch
- Custom variables based on context

## Configuration Validation

### Automatic Validation

CodeBolt validates `agent.yaml` on load:

**Required Fields**:
- `title`: Must be present
- `description`: Must be present
- `version`: Must be valid semver
- `metadata.agent_routing`: Must be present

**Type Validation**:
- `llm_role`: Array of role objects
- `supportedframeworks`: Array of strings
- `supportedlanguages`: Array of strings
- `requiredTools`: Array of strings

**Value Validation**:
- `version`: Must match `^d+.d+.d+$`
- `strict`: Must be boolean
- `modelorder`: Must be non-empty array

**Cross-Field Validation**:
- All models in `modelorder` must be configured
- All tools in `requiredTools` must be available
- SDLC phases must be recognized

### Error Messages

**Missing Required Field**:
```
Error: agent.yaml missing required field 'title'
```

**Invalid Version**:
```
Error: Invalid version '1.2' (must be X.Y.Z format)
```

**Unknown Model**:
```
Error: Model 'claude-ultra' not configured in llm_role.modelorder
```

**Missing Tool**:
```
Error: Required tool 'mcp' not available
```

## Configuration Override

### Runtime Overrides

Agent configuration can be overridden at runtime:

**Model Override**:
```yaml
# Original configuration
modelorder: ["claude-sonnet", "gpt-4"]

# Runtime override
model: "gpt-4-turbo"  # Use this model instead
```

**Tool Override**:
```yaml
# Original configuration
requiredTools: ["file-ops", "git"]

# Runtime override
additionalTools: ["search", "llm-inference"]
```

**Instruction Override**:
```yaml
# Original configuration
actionPrompt: "Review {filepath}"

# Runtime override
customInstructions: "Focus on security vulnerabilities in {filepath}"
```

### Remix Configuration

Remix agents inherit base configuration with overrides:

```yaml
# Base agent
title: "Code Reviewer"
llm_role:
  - name: "reviewer"
    modelorder: ["claude-sonnet"]

# Remix agent
remixedFromId: "code-reviewer"
customSettings:
  provider: "openai"
  model: "gpt-4-turbo"
  customInstructions: "Focus on performance issues"
  additionalTools: ["profiler"]
```

## Configuration Best Practices

### 1. Version Management

**Semantic Versioning**:
- **Major (X.0.0)**: Breaking changes, incompatible updates
- **Minor (0.X.0)**: New features, backward compatible
- **Patch (0.0.X)**: Bug fixes, backward compatible

**Example**:
```yaml
# Initial release
version: "1.0.0"

# Add new SDL C phase
version: "1.1.0"

# Fix bug in routing
version: "1.1.1"

# Change supportedframeworks (breaking)
version: "2.0.0"
```

### 2. Model Selection

**General Guidelines**:
- Use **strict: true** for critical operations requiring specific model
- Use **strict: false** for flexibility and cost optimization
- Order models by capability (best first, fallbacks after)
- Consider cost vs. performance in model ordering

**Example**:
```yaml
# Critical: Security review (best model required)
llm_role:
  - name: "security-audit"
    strict: true
    modelorder: ["claude-opus"]

# Flexible: General coding (cost-effective acceptable)
llm_role:
  - name: "general-coding"
    strict: false
    modelorder: ["claude-haiku", "claude-sonnet", "gpt-4"]
```

### 3. Routing Specificity

**Be Specific**:
- Define exact frameworks and languages
- Avoid wildcards unless intentional
- Match agent capabilities to routing rules

**Example**:
```yaml
# Good: Specific
agent_routing:
  supportedframeworks: ["react", "nextjs"]
  supportedlanguages: ["typescript", "tsx"]

# Avoid: Too broad
agent_routing:
  supportedframeworks: ["*"]
  supportedlanguages: ["*"]
```

### 4. Tool Requirements

**Minimize Dependencies**:
- Only declare tools you actually use
- Consider optional vs. required tools
- Document why each tool is needed

**Example**:
```yaml
# Minimal: Only necessary tools
requiredTools:
  - "file-ops"
  - "llm-inference"

# Avoid: Unused tools
requiredTools:
  - "file-ops"
  - "git"
  - "search"
  - "memory"
  - "chat"
  - "crawler"
  - "mcp"
  # (agent only uses file-ops and llm-inference)
```

### 5. Action Design

**Action Naming**:
- Use verb-noun pattern (reviewFile, generateTests)
- Be descriptive but concise
- Follow consistent conventions

**Action Prompts**:
- Use clear templates with variables
- Provide context in prompt
- Include success criteria

**Example**:
```yaml
# Good: Clear action with template
actions:
  - name: "reviewCommit"
    description: "Review Git commit"
    actionPrompt: "Review commit {commitHash} on branch {branch} for bugs, style, and security issues"

# Poor: Vague action
actions:
  - name: "doReview"
    description: "Review something"
    actionPrompt: "Review this"
```

## Configuration Examples

### Example 1: Frontend Developer Agent

```yaml
title: "React Developer"
description: "Specializes in React and TypeScript development"
longDescription: |
  Expert React agent for building modern web applications with TypeScript,
  Next.js, and related ecosystem tools.

version: "1.0.0"

metadata:
  llm_role:
    - name: "component-builder"
      description: "Builds React components"
      strict: false
      modelorder: ["claude-sonnet", "gpt-4"]

  agent_routing:
    worksonblankcode: true
    supportedframeworks: ["react", "nextjs", "typescript"]
    supportedlanguages: ["typescript", "tsx", "jsx"]
    worksonexistingcode: true

  sdlc_steps_managed:
    - name: "implementation"
      example_instructions:
        - "Create React component for user profile"
        - "Implement TypeScript interfaces"
        - "Add error handling to form"

requiredTools:
  - "file-ops"
  - "llm-inference"

actions:
  - name: "createComponent"
    description: "Create React component"
    actionPrompt: "Create React component '{componentName}' with TypeScript"
```

### Example 2: Backend Developer Agent

```yaml
title: "API Developer"
description: "Builds REST APIs and services"
longDescription: |
  Specialized in Node.js, Express, TypeScript backend development,
  database integration, and API design.

version: "2.1.0"

metadata:
  llm_role:
    - name: "api-designer"
      description: "Designs REST APIs"
      strict: true
      modelorder: ["claude-opus"]

    - name: "database-architect"
      description: "Designs database schemas"
      strict: true
      modelorder: ["gpt-4-turbo"]

  agent_routing:
    worksonblankcode: false
    supportedframeworks: ["express", "fastify", "nestjs"]
    supportedlanguages: ["typescript", "javascript"]
    worksonexistingcode: true

  sdlc_steps_managed:
    - name: "design"
      example_instructions:
        - "Design REST API for user management"
        - "Create database schema for orders"

    - name: "implementation"
      example_instructions:
        - "Implement authentication endpoint"
        - "Add database middleware"

requiredTools:
  - "file-ops"
  - "git"
  - "llm-inference"
  - "search"

actions:
  - name: "designAPI"
    description: "Design REST API"
    actionPrompt: "Design REST API for {feature} with endpoints and data models"

  - name: "createEndpoint"
    description: "Create API endpoint"
    actionPrompt: "Create Express endpoint for {operation} with proper error handling"
```

### Example 3: QA Engineer Agent

```yaml
title: "Test Generator"
description: "Generates comprehensive test suites"
longDescription: |
  Automated test generation agent that creates unit tests, integration tests,
  and end-to-end tests for JavaScript and TypeScript projects.

version: "1.5.0"

metadata:
  llm_role:
    - name: "test-writer"
      description: "Writes test code"
      strict: false
      modelorder: ["claude-sonnet", "gpt-4"]

  agent_routing:
    worksonblankcode: false
    supportedframeworks: ["jest", "vitest", "mocha", "cypress"]
    supportedlanguages: ["typescript", "javascript"]
    worksonexistingcode: true

  sdlc_steps_managed:
    - name: "testing"
      example_instructions:
        - "Write unit tests for this function"
        - "Create integration tests for API"
        - "Generate E2E tests for user flow"

requiredTools:
  - "file-ops"
  - "search"
  - "llm-inference"

actions:
  - name: "generateUnitTests"
    description: "Generate unit tests"
    actionPrompt: "Generate unit tests for {filepath} with Jest and high coverage"

  - name: "generateIntegrationTests"
    description: "Generate integration tests"
    actionPrompt: "Create integration tests for {feature} mocking external dependencies"
```

## Related Concepts

- **[Agent Types](/conceptbank/features/agent-management/agent-types.md)**: Different agent sources and how they're stored
- **[Agent Creation (Code)](/conceptbank/features/agent-management/agent-creation-code.md)**: Creating agent workflows
- **[Agent SDK](/conceptbank/features/agent-management/agent-sdk.md)**: Tools and capabilities referenced in configuration
- **[Agent Hooks](/conceptbank/features/agent-management/agent-hooks.md)**: Triggering agents automatically
