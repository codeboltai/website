---
id: "agent-creation-code"
title: "Agent Creation via Code"
category: "features"
subcategory: "agent-management"
tags: ["agents", "code", "agentflow", "yaml", "configuration"]
audience: ["technical"]
difficulty: "intermediate"
last_updated: "2026-01-18"
version: "1.0.0"
related_concepts: ["agent-types", "agent-creation-visual", "agent-configuration", "agent-sdk"]
content_type: "concept"
status: "published"
phase: 1
---

# Agent Creation via Code

## Executive Summary

Code-based agent creation empowers developers to define agent workflows declaratively using `.agentflow` files—JSON-based LiteGraph configurations that specify nodes, connections, and execution logic. This approach enables version control, code review, and programmatic agent generation, providing ultimate control for developers who prefer text-based workflows.

## Overview

While CodeBolt offers a visual drag-and-drop flow creator, code-based agent creation remains the foundation for several reasons:

- **Precision**: Text-based configuration allows exact specification of node properties
- **Version Control**: `.agentflow` files are JSON, enabling git diff and merge
- **Automation**: Agents can be generated programmatically
- **Documentation**: Workflow logic is readable and reviewable
- **Reproducibility**: Exact configurations can be shared and replicated

Code-based agent creation uses the AgentFlow system—a visual programming backend built on LiteGraph, exposing its full power through declarative JSON files.

## The .agentflow File Format

### File Structure

`.agentflow` files are stored in JSON format with a specific structure:

```json
{
  "version": 1,
  "type": "litegraph",
  "last_node_id": 5,
  "last_link_id": 8,
  "nodes": [
    {
      "id": 1,
      "type": "Agent/AgentStep",
      "pos": [100, 100],
      "size": [200, 80],
      "properties": {
        "llmRole": "assistant",
        "enableLogging": true
      },
      "inputs": [],
      "outputs": [
        {"name": "output", "type": "string"}
      ]
    }
  ],
  "links": [
    {
      "id": 1,
      "origin_id": 1,
      "origin_slot": 0,
      "target_id": 2,
      "target_slot": 0
    }
  ],
  "groups": [],
  "config": {},
  "metadata": {
    "createdAt": "2026-01-18T10:00:00Z",
    "version": "1.0.0"
  }
}
```

### Core Components

**Nodes**: Individual processing units with specific types
- **id**: Unique identifier within the flow
- **type**: Node type (e.g., "Agent/AgentStep", "FS/ReadFile")
- **pos**: [x, y] position on the canvas (for visual display)
- **size**: [width, height] dimensions
- **properties**: Configuration specific to the node type

**Links**: Connections between nodes defining data flow
- **id**: Unique link identifier
- **origin_id**: Source node ID
- **origin_slot**: Output slot index on source node
- **target_id**: Destination node ID
- **target_slot**: Input slot index on destination node

**Groups**: Logical grouping of nodes (optional, for visual organization)

**Config**: Global configuration for the entire flow

**Metadata**: Information about the flow (creation date, version, etc.)

## Agent Flow File Organization

### Storage Locations

Agents are stored in different locations based on their type:

**Local Agents**:
```
<project>/
└── .codeboltAgents/
    └── agents/
        └── <agent-id>/
            ├── agent.agentflow      # Main flow definition
            ├── agent.yaml           # Agent metadata
            ├── package.json         # Dependencies
            └── dist/                # Compiled assets (if any)
```

**Project AgentFlows**:
```
<project>/
└── agentflows/
    ├── my-workflow.agentflow
    ├── data-pipeline.agentflow
    └── test-suite.agentflow
```

**Global Agents**:
```
~/.codebolt/agents/
└── <agent-id>/
    ├── agent.agentflow
    ├── agent.yaml
    └── ...
```

### File Naming Conventions

- **Agent Flows**: `agent.agentflow` (standard name for agents)
- **Workflow Flows**: `<purpose>.agentflow` (e.g., `data-pipeline.agentflow`)
- **Test Flows**: `test-<feature>.agentflow` (e.g., `test-authentication.agentflow`)

## Node Types and Categories

CodeBolt provides extensive node libraries organized by category:

### 1. Agent Nodes

Core agent execution nodes:

- **Agent/AgentStep**: Execute a single agent step with LLM
- **Agent/StartAgent**: Spawn a sub-agent
- **Agent/AgentDetail**: Get detailed agent information
- **Agent/FindAgent**: Search for agents by capability
- **Agent/ListAgents**: Enumerate available agents

**Example Agent Step Node**:
```json
{
  "id": 1,
  "type": "Agent/AgentStep",
  "properties": {
    "llmRole": "assistant",
    "enableLogging": true,
    "instruction": "Analyze the code for bugs"
  }
}
```

### 2. File System Nodes

File and directory operations:

- **FS/ReadFile**: Read file contents
- **FS/WriteToFile**: Write or append to file
- **FS/CreateFile**: Create new file
- **FS/DeleteFile**: Remove file
- **FS/ListDirectory**: List directory contents
- **FS/SearchFiles**: Search files by pattern
- **FS/GrepSearch**: Regex-based content search

**Example Read File Node**:
```json
{
  "id": 2,
  "type": "FS/ReadFile",
  "properties": {
    "filePath": "src/main.ts",
    "encoding": "utf-8"
  }
}
```

### 3. Git Nodes

Version control operations:

- **Git/GitStatus**: Get repository status
- **Git/GitCommit**: Create commit
- **Git/GitPush**: Push to remote
- **Git/GitPull**: Pull from remote
- **Git/GitBranch**: Create or switch branches
- **Git/GitDiff**: View changes

**Example Git Commit Node**:
```json
{
  "id": 3,
  "type": "Git/GitCommit",
  "properties": {
    "message": "Fix authentication bug",
    "addFiles": ["src/auth.ts"]
  }
}
```

### 4. LLM Nodes

Language model interactions:

- **LLM/Inference**: Execute LLM inference
- **LLM/GetModelConfig**: Retrieve model configuration

**Example Inference Node**:
```json
{
  "id": 4,
  "type": "LLM/Inference",
  "properties": {
    "prompt": "Summarize this code:",
    "provider": "anthropic",
    "model": "claude-sonnet"
  }
}
```

### 5. Chat Nodes

Communication and messaging:

- **Chat/SendMessage**: Send message to user
- **Chat/AskQuestion**: Prompt user for input
- **Chat/GetChatHistory**: Retrieve conversation history
- **Chat/WaitForReply**: Wait for user response
- **Chat/ProcessStarted**: Notify process start
- **Chat/ProcessFinished**: Notify process completion

### 6. Memory Nodes

Persistent storage operations:

- **Memory/MemoryAdd**: Add to memory
- **Memory/MemoryGet**: Retrieve from memory
- **Memory/MemoryJsonSave**: Save JSON to memory
- **Memory/MemoryMarkdownSave**: Save markdown to memory
- **Memory/MemoryTodoSave**: Save todo item

### 7. Debug Nodes

Development and troubleshooting:

- **Debug/DebugNode**: Output debug information
- **Debug/OpenDebugBrowser**: Open browser for debugging

### 8. Event Nodes

Trigger and event handling:

- **Events/OnMessage**: Trigger on message receipt

### 9. Crawler Nodes

Web automation:

- **Crawler/CrawlerStart**: Start browser automation
- **Crawler/CrawlerGoToPage**: Navigate to URL
- **Crawler/CrawlerClick**: Click element
- **Crawler/CrawlerScreenshot**: Capture screenshot

### 10. MCP Nodes

Model Context Protocol integration:

- **MCP/MCPConfigure**: Configure MCP server
- **MCP/MCPExecuteTool**: Execute MCP tool
- **MCP/MCPListTools**: List available tools

## Building Agent Workflows

### Workflow Pattern 1: Sequential Processing

Simple linear workflow with nodes executing in sequence:

```json
{
  "nodes": [
    {"id": 1, "type": "FS/ReadFile", "pos": [100, 100]},
    {"id": 2, "type": "LLM/Inference", "pos": [350, 100]},
    {"id": 3, "type": "FS/WriteToFile", "pos": [600, 100]}
  ],
  "links": [
    {"id": 1, "origin_id": 1, "origin_slot": 0, "target_id": 2, "target_slot": 0},
    {"id": 2, "origin_id": 2, "origin_slot": 0, "target_id": 3, "target_slot": 0}
  ]
}
```

**Flow**: Read file → Process with LLM → Write result

### Workflow Pattern 2: Parallel Processing

Multiple independent branches executing simultaneously:

```json
{
  "nodes": [
    {"id": 1, "type": "FS/ListDirectory", "pos": [100, 200]},
    {"id": 2, "type": "Agent/AgentStep", "pos": [350, 100]},
    {"id": 3, "type": "Agent/AgentStep", "pos": [350, 300]},
    {"id": 4, "type": "Chat/SendMessage", "pos": [600, 200]}
  ],
  "links": [
    {"id": 1, "origin_id": 1, "origin_slot": 0, "target_id": 2, "target_slot": 0},
    {"id": 2, "origin_id": 1, "origin_slot": 0, "target_id": 3, "target_slot": 0},
    {"id": 3, "origin_id": 2, "origin_slot": 0, "target_id": 4, "target_slot": 0},
    {"id": 4, "origin_id": 3, "origin_slot": 0, "target_id": 4, "target_slot": 1}
  ]
}
```

**Flow**: List files → Process in parallel → Aggregate results

### Workflow Pattern 3: Conditional Branching

Workflow that branches based on conditions:

```json
{
  "nodes": [
    {"id": 1, "type": "Events/OnMessage", "pos": [100, 200]},
    {"id": 2, "type": "LLM/Inference", "pos": [350, 200], "properties": {"prompt": "Classify user intent"}},
    {"id": 3, "type": "Agent/AgentStep", "pos": [600, 100], "properties": {"instruction": "Handle coding task"}},
    {"id": 4, "type": "Agent/AgentStep", "pos": [600, 300], "properties": {"instruction": "Handle question"}}
  ],
  "links": [
    {"id": 1, "origin_id": 1, "origin_slot": 0, "target_id": 2, "target_slot": 0},
    // Conditional links based on LLM output
    {"id": 2, "origin_id": 2, "origin_slot": 0, "target_id": 3, "target_slot": 0},
    {"id": 3, "origin_id": 2, "origin_slot": 1, "target_id": 4, "target_slot": 0}
  ]
}
```

**Flow**: Receive message → Classify intent → Route to appropriate handler

### Workflow Pattern 4: Loop and Iteration

Processing multiple items iteratively:

```json
{
  "nodes": [
    {"id": 1, "type": "FS/SearchFiles", "pos": [100, 200]},
    {"id": 2, "type": "FS/ReadFile", "pos": [350, 200]},
    {"id": 3, "type": "Agent/AgentStep", "pos": [600, 200]},
    {"id": 4, "type": "Memory/MemoryJsonSave", "pos": [850, 200]}
  ],
  "links": [
    {"id": 1, "origin_id": 1, "origin_slot": 0, "target_id": 2, "target_slot": 0},
    {"id": 2, "origin_id": 2, "origin_slot": 0, "target_id": 3, "target_slot": 0},
    {"id": 3, "origin_id": 3, "origin_slot": 0, "target_id": 4, "target_slot": 0}
    // Feedback loop from node 4 back to node 2
  ]
}
```

**Flow**: Find files → Process each → Store results → Repeat

## Agent Configuration with YAML

While `.agentflow` defines the workflow logic, `agent.yaml` provides agent metadata and configuration:

### agent.yaml Structure

```yaml
title: "Code Reviewer"
description: "Reviews code for bugs and style issues"
longDescription: |
  A comprehensive code review agent that checks for:
  - Bug patterns
  - Style violations
  - Security issues
  - Performance problems

version: "1.0.0"
author: "CodeBolt Team"

metadata:
  llm_role:
    - name: "reviewer"
      description: "Main code reviewer role"
      strict: false
      modelorder: ["claude-sonnet", "gpt-4"]

  defaultagentllm:
    strict: false
    modelorder: ["claude-sonnet"]

  agent_routing:
    worksonblankcode: false
    supportedframeworks: ["react", "vue", "angular"]
    supportedlanguages: ["typescript", "javascript"]
    worksonexistingcode: true

  sdlc_steps_managed:
    - name: "code-review"
      example_instructions:
        - "Review this code for bugs"
        - "Check style compliance"
        - "Verify security best practices"

requiredTools:
  - "file-ops"
  - "git"
  - "search"

actions:
  - name: "reviewFile"
    description: "Review a single file"
    detailDescription: "Performs detailed review of one file"
    actionPrompt: "Review {filepath} for issues"
```

### Configuration Fields

**Basic Metadata**:
- **title**: Short agent name
- **description**: One-line summary
- **longDescription**: Detailed explanation
- **version**: Semantic version
- **author**: Creator name or team

**LLM Configuration**:
- **llm_role**: Roles the agent can assume
- **defaultagentllm**: Default model preferences
- **modelorder**: Fallback model chain

**Routing Rules**:
- **worksonblankcode**: Can start from scratch
- **supportedframeworks**: Compatible frameworks
- **supportedlanguages**: Supported programming languages
- **worksonexistingcode**: Can modify existing code

**SDLC Integration**:
- **sdlc_steps_managed**: Development lifecycle steps
- **example_instructions**: Sample usage prompts

**Tools and Actions**:
- **requiredTools**: Required tool dependencies
- **actions**: Predefined agent capabilities

## Creating Agents Programmatically

### Node.js API

```javascript
import { createNewAgentFlow, updateAgentFlowData } from './agentFlowService';

// Create new agent flow
const agentFlowPath = await createNewAgentFlow();

// Define workflow
const workflow = {
  version: 1,
  type: 'litegraph',
  nodes: [
    {
      id: 1,
      type: 'Agent/AgentStep',
      pos: [100, 100],
      properties: {
        llmRole: 'assistant',
        instruction: 'Process this request'
      }
    }
  ],
  links: [],
  groups: [],
  config: {},
  metadata: {
    createdAt: new Date().toISOString()
  }
};

// Save workflow
await updateAgentFlowData(agentFlowPath, workflow);
```

### Template Generation

```javascript
function generateAgentTemplate(agentConfig) {
  return {
    version: 1,
    type: 'litegraph',
    nodes: [
      {
        id: 1,
        type: 'Events/OnMessage',
        pos: [100, 200]
      },
      {
        id: 2,
        type: 'Agent/AgentStep',
        pos: [350, 200],
        properties: {
          instruction: agentConfig.instruction
        }
      },
      {
        id: 3,
        type: 'Chat/SendMessage',
        pos: [600, 200]
      }
    ],
    links: [
      { id: 1, origin_id: 1, origin_slot: 0, target_id: 2, target_slot: 0 },
      { id: 2, origin_id: 2, origin_slot: 0, target_id: 3, target_slot: 0 }
    ],
    groups: [],
    config: {},
    metadata: {
      createdAt: new Date().toISOString(),
      template: true
    }
  };
}
```

## Best Practices

### Workflow Design

1. **Start Simple**: Begin with linear flows, add complexity as needed
2. **Modularize**: Create reusable sub-workflows
3. **Document**: Use node properties to explain logic
4. **Version Control**: Commit `.agentflow` files to git
5. **Test Incrementally**: Test each node connection before adding more

### File Organization

1. **Separate Concerns**: One agent per file
2. **Logical Grouping**: Group related workflows in directories
3. **Clear Naming**: Use descriptive file names
4. **Consistent Structure**: Follow standard agent directory layout

### Error Handling

1. **Validation**: Use nodes that validate inputs
2. **Fallbacks**: Provide alternative paths
3. **Logging**: Enable logging on critical nodes
4. **Monitoring**: Use debug nodes for troubleshooting

### Performance

1. **Parallelize**: Use parallel flows for independent operations
2. **Cache**: Store frequently-used data in memory nodes
3. **Batch**: Process multiple items together when possible
4. **Optimize**: Remove unnecessary intermediate nodes

## Use Cases

### 1. Automated Testing Agent

```yaml
# agent.yaml
title: "Test Generator"
description: "Generates unit tests from code"
```

```json
// agent.agentflow
{
  "nodes": [
    {"id": 1, "type": "FS/ReadFile"},
    {"id": 2, "type": "LLM/Inference", "properties": {"prompt": "Generate unit tests"}},
    {"id": 3, "type": "FS/WriteToFile", "properties": {"filePath": "test/{filename}.test.ts"}}
  ],
  "links": [
    {"id": 1, "origin_id": 1, "origin_slot": 0, "target_id": 2, "target_slot": 0},
    {"id": 2, "origin_id": 2, "origin_slot": 0, "target_id": 3, "target_slot": 0}
  ]
}
```

### 2. Documentation Generator

```yaml
# agent.yaml
title: "Doc Generator"
description: "Generates documentation from code"
```

```json
// agent.agentflow
{
  "nodes": [
    {"id": 1, "type": "FS/SearchFiles", "properties": {"pattern": "**/*.ts"}},
    {"id": 2, "type": "FS/ReadFile"},
    {"id": 3, "type": "LLM/Inference", "properties": {"prompt": "Generate JSDoc comments"}},
    {"id": 4, "type": "FS/UpdateFile"}
  ],
  "links": [
    {"id": 1, "origin_id": 1, "origin_slot": 0, "target_id": 2, "target_slot": 0},
    {"id": 2, "origin_id": 2, "origin_slot": 0, "target_id": 3, "target_slot": 0},
    {"id": 3, "origin_id": 3, "origin_slot": 0, "target_id": 4, "target_slot": 0}
  ]
}
```

### 3. Continuous Integration Agent

```yaml
# agent.yaml
title: "CI Pipeline"
description: "Automated CI/CD workflow"
```

```json
// agent.agentflow
{
  "nodes": [
    {"id": 1, "type": "Git/GitPull"},
    {"id": 2, "type": "FS/SearchFiles", "properties": {"pattern": "**/*.test.ts"}},
    {"id": 3, "type": "Agent/AgentStep", "properties": {"instruction": "Run tests"}},
    {"id": 4, "type": "Git/GitCommit", "properties": {"message": "Test results"}},
    {"id": 5, "type": "Git/GitPush"}
  ],
  "links": [
    {"id": 1, "origin_id": 1, "origin_slot": 0, "target_id": 2, "target_slot": 0},
    {"id": 2, "origin_id": 2, "origin_slot": 0, "target_id": 3, "target_slot": 0},
    {"id": 3, "origin_id": 3, "origin_slot": 0, "target_id": 4, "target_slot": 0},
    {"id": 4, "origin_id": 4, "origin_slot": 0, "target_id": 5, "target_slot": 0}
  ]
}
```

## Related Concepts

- **[Agent Types](/conceptbank/features/agent-management/agent-types.md)**: Understanding agent sources and scopes
- **[Agent Creation (Visual)](/conceptbank/features/agent-management/agent-creation-visual.md)**: Drag-and-drop flow creation
- **[Agent Configuration](/conceptbank/features/agent-management/agent-configuration.md)**: YAML-based settings
- **[Agent SDK](/conceptbank/features/agent-management/agent-sdk.md)**: Available tools and capabilities
- **[Agent Hooks](/conceptbank/features/agent-management/agent-hooks.md)**: Event-driven behavior
