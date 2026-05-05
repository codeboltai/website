---
title: Agent Runtime Environment
category: Technical
subcategory: AI Integration
tags: [agent, runtime, execution, litegraph, workflow]
---

## Executive Summary

The Agent Runtime is CodeBolt's execution environment for AI agents, providing a sandboxed, plugin-extensible system for running automated workflows built with LiteGraph, with support for dynamic plugin discovery and seamless AI integration.

## What is the Agent Runtime?

The Agent Runtime is a specialized execution environment that runs AI agents - automated workflows that combine LLM calls with tools, memory, and logic. It provides the infrastructure for agent execution, state management, tool availability, and plugin extensibility while maintaining security and resource isolation.

## Why It Matters

- **Automation**: Execute complex multi-step AI workflows
- **Extensibility**: Plugin system for custom agent nodes
- **Isolation**: Sandboxed execution for safety
- **State Management**: Track agent execution state and history
- **Integration**: Seamless access to LLMs, tools, and services
- **Reproducibility**: Versioned runtime for consistent behavior

## Key Concepts

### Agent Flow
- **LiteGraph Format**: Visual workflow representation
- **Node-Based**: Agents composed of interconnected nodes
- **JSON Storage**: Human-readable, version-controllable format
- **Dynamic Execution**: Nodes executed in dependency order

### Runtime Architecture
```
┌─────────────────────────────────────────┐
│   Agent Flow Editor (UI)                │
│   - Visual workflow designer            │
│   - Node palette with plugins           │
│   - Real-time validation                │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│   Agent Flow Service                    │
│   - Create/update/delete flows          │
│   - Validate flow structure             │
│   - Manage flow metadata                │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│   Agent Runtime                        │
│   - Bundled runtime (ZIP)               │
│   - Extracted to userData               │
│   - Version-managed                     │
│   - Node modules (plugins)              │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│   Execution Environment                │
│   - Plugin discovery                    │
│   - Node execution                      │
│   - State management                    │
│   - Tool access                         │
└─────────────────────────────────────────┘
```

### Plugin System
- **Dynamic Discovery**: Auto-discover plugins from project directories
- **Node Extensions**: Custom nodes for specific capabilities
- **UI Bundles**: Each plugin provides its own UI components
- **Package.json Manifest**: Declarative plugin metadata

## Runtime Lifecycle

### 1. Runtime Installation

The agent runtime is bundled with the application:
```typescript
// Runtime location
development:  project-root/assets/agentFlow-v-1.zip
production:   resources/assets/agentFlow-v-1.zip

// Installation target
userData/.codebolt/agentflow-runtime/
```

Installation process:
1. Check if runtime is already installed
2. Compare version with bundled version
3. Extract if needed or outdated
4. Install npm dependencies
5. Validate installation

### 2. Runtime Initialization

On application startup:
1. Runtime version is checked
2. Dependencies are loaded
3. Plugins are discovered
4. Runtime is validated
5. Ready for agent execution

### 3. Plugin Discovery

Plugins are discovered from:
```
<project>/.codeboltAgents/AgentNodes/
└── <plugin-name>/
    ├── package.json          # Plugin manifest
    ├── dist/
    │   └── ui.js            # UI bundle
    └── nodes/               # Node definitions
```

Discovery process:
1. Scan `.codeboltAgents/AgentNodes/` directories
2. Read `package.json` from each plugin
3. Register plugin nodes
4. Load UI bundles
5. Make available in node palette

### 4. Agent Execution

When an agent flow is executed:
1. Parse LiteGraph JSON structure
2. Validate node connections and dependencies
3. Topological sort for execution order
4. Execute each node with its inputs
5. Pass outputs to connected nodes
6. Handle errors and edge cases
7. Return final results

## Configuration

### Runtime Structure
```
agentflow-runtime/
├── package.json           # Runtime metadata
├── dist/
│   └── index.cjs         # Entry point
├── node_modules/          # Dependencies
└── .version              # Version marker
```

### Plugin Manifest
```json
{
  "name": "my-agent-plugin",
  "version": "1.0.0",
  "description": "Custom agent nodes",
  "nodes": [
    {
      "type": "my-custom-node",
      "name": "My Custom Node",
      "category": "custom"
    }
  ],
  "ui": "dist/ui.js"
}
```

### Agent Flow Schema
```json
{
  "version": 1,
  "type": "litegraph",
  "last_node_id": 5,
  "last_link_id": 4,
  "nodes": [
    {
      "id": 1,
      "type": "llm-call",
      "pos": [100, 100],
      "properties": {
        "provider": "openai",
        "model": "gpt-4"
      }
    }
  ],
  "links": [
    [1, 0, 2, 0]  // [sourceNodeId, sourceOutput, targetNodeId, targetInput]
  ],
  "groups": [],
  "config": {},
  "metadata": {
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Agent Flow API

### Flow Management
```typescript
// Create new flow
POST /agentflow/create
→ Returns: { filePath, flowId }

// Get flow data
GET /agentflow/get?filePath=<path>
→ Returns: { success, data, filePath }

// Update flow
PUT /agentflow/update
Body: { filePath, graphData }
→ Returns: { filePath }

// List plugins
GET /agentflow/plugins
→ Returns: [{ name, version, nodes }]

// Get plugin UI
GET /agentflow/plugins/:plugin/ui
→ Returns: UI bundle JavaScript
```

### Flow Operations
- **Create**: Generate new flow with default LiteGraph structure
- **Read**: Load existing flow from disk
- **Update**: Persist modified flow to disk
- **Delete**: Remove flow file
- **Validate**: Check flow structure and dependencies

## Plugin Development

### Creating a Plugin

1. **Create Plugin Directory**:
```
mkdir -p .codeboltAgents/AgentNodes/my-plugin
```

2. **Add package.json**:
```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "nodes": [
    {
      "type": "my-node",
      "name": "My Custom Node"
    }
  ]
}
```

3. **Implement Node**:
```typescript
// Node implementation in runtime
class MyCustomNode {
  constructor() {
    this.properties = {};
    this.addInput("input", "string");
    this.addOutput("output", "string");
  }

  async execute(input) {
    // Process input
    const result = await this.process(input);
    this.setOutput(0, result);
  }
}
```

4. **Build UI Bundle**:
```typescript
// UI components for node configuration
export const MyNodeUI = () => {
  return (
    <div>
      <label>Parameter</label>
      <input type="text" />
    </div>
  );
};
```

5. **Register Plugin**:
```typescript
// Runtime discovers plugin automatically
// Nodes appear in palette
```

## Integration with AI System

### LLM Access
Agent nodes can access LLM services:
```typescript
// Within agent node
const llmService = require('../services/llmService');
const response = await llmService.handleAskLLM({
  message: { prompt: messages },
  llmrole: "agent"
});
```

### Tool Access
Agent nodes can use CodeBolt tools:
```typescript
// File operations
const fileContent = await fileSystem.readFile(path);

// Search operations
const results = await globSearch(pattern);

// Vector search
const similar = await vectorDatabase.search(query);
```

### Memory Access
Agent nodes can access memory systems:
```typescript
// Semantic memory
const memories = await memorySystem.search(query);

// Working memory
const context = await memorySystem.getContext(sessionId);

// Long-term memory
await memorySystem.store(key, value);
```

## State Management

### Execution State
- **Session ID**: Unique identifier for execution
- **Node States**: Track each node's execution status
- **Intermediate Results**: Store outputs between nodes
- **Error Handling**: Catch and handle node failures

### Persistence
- **Flow Versions**: Track flow changes over time
- **Execution History**: Log of agent executions
- **Results Storage**: Save execution outputs
- **Debug Info**: Detailed logs for troubleshooting

## Security and Isolation

### Sandboxing
- **Limited Access**: Restricted file system access
- **Resource Limits**: CPU, memory, and time constraints
- **Permission Checks**: Validate tool access
- **Input Validation**: Sanitize all inputs

### Plugin Security
- **Code Review**: Review plugin code before loading
- **Manifest Validation**: Validate plugin metadata
- **UI Isolation**: Separate context for plugin UIs
- **Error Boundaries**: Isolate plugin failures

## Performance Considerations

### Execution Optimization
- **Parallel Execution**: Run independent nodes concurrently
- **Caching**: Cache node outputs when possible
- **Lazy Evaluation**: Only compute what's needed
- **Resource Management**: Clean up after execution

### Scalability
- **Large Flows**: Handle complex workflows
- **Many Agents**: Run multiple agents simultaneously
- **Resource Pooling**: Reuse resources across executions
- **Load Balancing**: Distribute work across resources

## Monitoring and Debugging

### Execution Metrics
- **Timing**: Track node execution times
- **Resource Usage**: Monitor CPU and memory
- **Success Rates**: Track agent success/failure
- **Error Analysis**: Categorize and analyze errors

### Debug Features
- **Step Execution**: Execute flow node-by-node
- **Inspection**: View node inputs and outputs
- **Logging**: Detailed execution logs
- **Breakpoints**: Pause at specific nodes

## Future Enhancements

### Capabilities
- **Streaming Nodes**: Real-time data processing
- **Conditional Execution**: Branching based on conditions
- **Loop Nodes**: Iterate over collections
- **Sub-Flows**: Reusable flow components

### Features
- **Visual Debugger**: GUI for debugging flows
- **Performance Profiling**: Identify bottlenecks
- **Flow Templates**: Pre-built flow patterns
- **Version Control**: Track and revert flow changes

### Integration
- **More Plugins**: Expand plugin ecosystem
- **External Tools**: Integrate external services
- **Multi-Modal**: Support image, audio, video
- **Distributed**: Execute across multiple machines

## Related Concepts

- [LLM Integration](./llm-integration.md) - LLM access for agents
- [Agent Management](../../features/agent-management/) - Agent configuration and deployment
- [Memory Systems](../../features/memory-systems/) - Agent memory and context
- [Tools](../development-tools/) - Available tools for agents
