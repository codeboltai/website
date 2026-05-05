---
id: "agent-sdk"
title: "Agent SDK and Tools"
category: "features"
subcategory: "agent-management"
tags: ["sdk", "tools", "capabilities", "api", "nodes"]
audience: ["technical"]
difficulty: "intermediate"
last_updated: "2026-01-18"
version: "1.0.0"
related_concepts: ["agent-creation-code", "agent-creation-visual", "agent-configuration"]
content_type: "concept"
status: "published"
phase: 1
---

# Agent SDK and Tools

## Executive Summary

The Agent SDK provides a comprehensive toolkit of 80+ nodes and capabilities that agents can leverage to interact with files, Git, LLMs, memory systems, and external services. This extensive toolkit enables agents to perform complex development tasks autonomously, from reading code to deploying applications.

## Overview

Agents in CodeBolt are not limited to conversation—they have actual agency through a rich set of tools and capabilities. The Agent SDK exposes these tools through:

- **Visual Nodes**: Drag-and-drop nodes for the Flow Creator
- **API Functions**: Programmatic access for code-based workflows
- **Tool Categories**: Organized by functionality (FS, Git, LLM, etc.)
- **Extensibility**: Custom tool creation and integration

This SDK transforms agents from chatbots into capable development assistants that can read, write, test, and deploy code.

## Tool Categories

### 1. File System Tools

**Purpose**: Read, write, and manipulate files and directories

**Capabilities**:

**ReadFile**: Read file contents
```
Input: filePath, encoding
Output: file content
```

**WriteToFile**: Create or overwrite files
```
Input: filePath, content, encoding
Output: success confirmation
```

**UpdateFile**: Modify existing files
```
Input: filePath, changes
Output: updated content
```

**CreateFile**: Create new empty file
```
Input: filePath
Output: success confirmation
```

**DeleteFile**: Remove file
```
Input: filePath
Output: success confirmation
```

**ListDirectory**: Get directory contents
```
Input: directoryPath, recursive
Output: list of files and folders
```

**SearchFiles**: Find files by pattern
```
Input: directory, pattern
Output: matching file paths
```

**GrepSearch**: Search file contents
```
Input: directory, regexPattern
Output: matching lines with context
```

**ReadManyFiles**: Batch read multiple files
```
Input: filePaths[]
Output: contents[]
```

**EditFileWithDiff**: Apply diff-based edits
```
Input: filePath, diff
Output: updated content
```

**Use Cases**:
- Code refactoring across multiple files
- Batch file processing
- Search and replace operations
- Directory traversal and analysis

### 2. Git Tools

**Purpose**: Version control operations

**Capabilities**:

**GitStatus**: Check repository status
```
Output: modified, added, deleted files
```

**GitAdd**: Stage files for commit
```
Input: files[]
Output: success confirmation
```

**GitCommit**: Create commit
```
Input: message, files
Output: commit hash
```

**GitPush**: Push to remote
```
Input: remote, branch
Output: success confirmation
```

**GitPull**: Pull from remote
```
Input: remote, branch
Output: pull summary
```

**GitBranch**: Create or switch branches
```
Input: branchName, createNew
Output: current branch
```

**GitCheckout**: Switch branches or restore files
```
Input: branch or filePath
Output: success confirmation
```

**GitDiff**: View changes
```
Input: file, compareWith
Output: diff output
```

**GitLogs**: View commit history
```
Input: limit, branch
Output: commit list
```

**GitInit**: Initialize repository
```
Input: directory
Output: success confirmation
```

**Use Cases**:
- Automated commit workflows
- Branch management
- Code review automation
- Release automation

### 3. LLM Tools

**Purpose**: Language model interactions

**Capabilities**:

**Inference**: Execute LLM inference
```
Input: prompt, provider, model, parameters
Output: model response
```

**GetModelConfig**: Retrieve model configuration
```
Input: provider, model
Output: model settings and capabilities
```

**Use Cases**:
- Custom LLM workflows
- Model comparison
- Dynamic model selection
- Multi-model reasoning

### 4. Chat Tools

**Purpose**: User communication and messaging

**Capabilities**:

**SendMessage**: Send message to user
```
Input: message, type
Output: delivery confirmation
```

**AskQuestion**: Prompt user for input
```
Input: question, options
Output: user response
```

**GetChatHistory**: Retrieve conversation
```
Input: threadId, limit
Output: message history
```

**WaitForReply**: Wait for user response
```
Input: timeout
Output: user message
```

**ProcessStarted**: Notify process start
```
Input: processId, description
Output: notification confirmation
```

**ProcessFinished**: Notify process completion
```
Input: processId, result
Output: notification confirmation
```

**SendConfirmationRequest**: Request user confirmation
```
Input: message, options
Output: user choice
```

**SendNotificationEvent**: Send system notification
```
Input: event, data
Output: delivery confirmation
```

**StopProcess**: Terminate running process
```
Input: processId
Output: termination confirmation
```

**Use Cases**:
- Interactive workflows
- User approval gates
- Progress updates
- Multi-step confirmations

### 5. Memory Tools

**Purpose**: Persistent data storage across sessions

**Capabilities**:

**MemoryAdd**: Store data in memory
```
Input: key, value, type
Output: storage confirmation
```

**MemoryGet**: Retrieve from memory
```
Input: key
Output: stored value
```

**JSON Operations**:
- **MemoryJsonSave**: Save structured JSON data
- **MemoryJsonUpdate**: Update JSON fields
- **MemoryJsonDelete**: Delete JSON entries
- **MemoryJsonList**: List all JSON keys

**Markdown Operations**:
- **MemoryMarkdownSave**: Save markdown content
- **MemoryMarkdownUpdate**: Update markdown
- **MemoryMarkdownDelete**: Delete markdown
- **MemoryMarkdownList**: List markdown keys

**Todo Operations**:
- **MemoryTodoSave**: Save todo item
- **MemoryTodoUpdate**: Update todo status
- **MemoryTodoDelete**: Remove todo
- **MemoryTodoList**: List all todos

**Use Cases**:
- Cross-session context retention
- Knowledge base population
- Task tracking
- Project state management

### 6. Debug Tools

**Purpose**: Development and troubleshooting

**Capabilities**:

**DebugNode**: Output debug information
```
Input: message, data, level
Output: log entry
```

**OpenDebugBrowser**: Open browser for debugging
```
Input: url, devtools
Output: browser session
```

**Use Cases**:
- Workflow debugging
- Variable inspection
- Execution tracing
- Browser automation testing

### 7. Event Tools

**Purpose**: Trigger and event handling

**Capabilities**:

**OnMessage**: Trigger on message receipt
```
Output: message data
```

**Use Cases**:
- Event-driven workflows
- Message processing
- Asynchronous triggers

### 8. Crawler Tools

**Purpose**: Web automation and scraping

**Capabilities**:

**CrawlerStart**: Start browser automation
```
Input: url, options
Output: browser session
```

**CrawlerGoToPage**: Navigate to URL
```
Input: url
Output: page load confirmation
```

**CrawlerClick**: Click element
```
Input: selector
Output: click confirmation
```

**CrawlerScroll**: Scroll page
```
Input: direction, amount
Output: scroll confirmation
```

**CrawlerScreenshot**: Capture screenshot
```
Input: filePath, selector
Output: image path
```

**Use Cases**:
- Web testing
- UI automation
- Screenshot capture
- Form filling

### 9. MCP (Model Context Protocol) Tools

**Purpose**: External service integration

**Capabilities**:

**MCPConfigure**: Configure MCP server
```
Input: server, config
Output: configuration confirmation
```

**MCPExecuteTool**: Execute MCP tool
```
Input: server, tool, parameters
Output: tool result
```

**MCPListTools**: List available tools
```
Input: server
Output: tool definitions
```

**MCPGetTools**: Get tool details
```
Input: server, toolName
Output: tool specification
```

**MCPGetEnabled**: Get enabled servers
```
Output: server list
```

**MCPSearchServers**: Discover available servers
```
Input: query
Output: server list
```

**Use Cases**:
- Third-party integrations
- External API access
- Service discovery
- Tool federation

### 10. Agent Tools

**Purpose**: Agent lifecycle management

**Capabilities**:

**StartAgent**: Spawn sub-agent
```
Input: agentId, instruction, context
Output: agent result
```

**AgentDetail**: Get agent information
```
Input: agentId
Output: agent metadata
```

**FindAgent**: Search agents by capability
```
Input: query, filters
Output: matching agents
```

**ListAgents**: Enumerate available agents
```
Input: filters
Output: agent list
```

**Use Cases**:
- Multi-agent workflows
- Agent delegation
- Dynamic agent selection
- Agent orchestration

### 11. Code Utils Tools

**Purpose**: Code analysis utilities

**Capabilities**:

**GetAllFilesAsMarkdown**: Convert codebase to markdown
```
Input: directory, patterns
Output: markdown representation
```

**GetMatcherList**: Get available matchers
```
Output: matcher definitions
```

**MatchDetail**: Get matcher details
```
Input: matcherId
Output: matcher specification
```

**PerformMatch**: Execute pattern match
```
Input: code, matcherId
Output: match results
```

**Use Cases**:
- Code documentation generation
- Pattern matching
- Code analysis
- AST operations

### 12. Action Plan Tools

**Purpose**: Task planning and tracking

**Capabilities**:

**CreateActionPlan**: Create action plan
```
Input: name, description, tasks
Output: plan ID
```

**AddTaskToActionPlan**: Add task to plan
```
Input: planId, task, dependencies
Output: task ID
```

**GetActionPlanDetail**: Get plan details
```
Input: planId
Output: plan structure
```

**GetAllPlans**: List all plans
```
Output: plan list
```

**GetPlanDetail**: Get specific plan
```
Input: planId
Output: plan details
```

**StartTaskStep**: Start task execution
```
Input: planId, taskId
Output: execution context
```

**StartTaskStepWithListener**: Start with event monitoring
```
Input: planId, taskId, callbacks
Output: execution context
```

**UpdateActionPlan**: Modify plan
```
Input: planId, updates
Output: updated plan
```

**Use Cases**:
- Complex task planning
- Multi-step workflows
- Task dependencies
- Progress tracking

### 13. Output Parser Tools

**Purpose**: Parse and structure outputs

**Capabilities**:

**ParseCSV**: Parse CSV data
```
Input: csvData, delimiter
Output: structured data
```

**ParseJSON**: Parse JSON data
```
Input: jsonString
Output: parsed object
```

**ParseMarkdown**: Parse markdown content
```
Input: markdown
Output: structured content
```

**Use Cases**:
- Data parsing
- Format conversion
- Structured output extraction
- Data transformation

## Tool Usage Patterns

### Pattern 1: Sequential Processing

```
ReadFile → Process → WriteFile
```

**Example**:
1. Read TypeScript file
2. Parse with LLM
3. Write documentation

### Pattern 2: Parallel Processing

```
          → Process A ─┐
Search Files             ├→ Aggregate
          → Process B ─┘
```

**Example**:
1. Find all test files
2. Run tests in parallel
3. Collect results

### Pattern 3: Conditional Branching

```
Decision → Option A
         → Option B
```

**Example**:
1. Check file type
2. Route to appropriate processor
3. Merge results

### Pattern 4: Iterative Processing

```
List → For Each → Process → Aggregate
        ↑_________________┘
```

**Example**:
1. List source files
2. Process each file
3. Generate summary
4. Repeat for next file

## Tool Compositions

### Composition 1: Refactoring Workflow

```
ReadFile → LLM/Inference → EditFileWithDiff → GitAdd → GitCommit
```

**Steps**:
1. Read file to refactor
2. Generate refactored code with LLM
3. Apply changes with diff
4. Stage changes
5. Commit with message

### Composition 2: Testing Workflow

```
SearchFiles → ForEach → ReadFile → LLM/Inference → WriteFile → RunCommand
```

**Steps**:
1. Find test files
2. Iterate through files
3. Read test file
4. Generate additional tests with LLM
5. Write new tests
6. Run test suite

### Composition 3: Documentation Workflow

```
ListDirectory → ReadManyFiles → LLM/Inference → MemoryMarkdownSave
```

**Steps**:
1. List source files
2. Read all files
3. Generate documentation with LLM
4. Save to memory

### Composition 4: CI/CD Workflow

```
GitPull → RunCommand → AgentStep → GitCommit → GitPush
```

**Steps**:
1. Pull latest changes
2. Run build command
3. Run tests with agent
4. Commit results
5. Push to remote

## Tool Capabilities Matrix

| Capability | Read | Write | Execute | Monitor |
|------------|------|-------|---------|---------|
| **File System** | ✓ | ✓ | ✗ | ✗ |
| **Git** | ✓ | ✓ | ✓ | ✓ |
| **LLM** | ✗ | ✗ | ✓ | ✗ |
| **Chat** | ✓ | ✓ | ✗ | ✓ |
| **Memory** | ✓ | ✓ | ✗ | ✗ |
| **Debug** | ✗ | ✓ | ✓ | ✓ |
| **Events** | ✓ | ✗ | ✗ | ✓ |
| **Crawler** | ✓ | ✗ | ✓ | ✓ |
| **MCP** | ✓ | ✓ | ✓ | ✗ |
| **Agent** | ✓ | ✓ | ✓ | ✓ |

## Extending the SDK

### Custom Tool Creation

**Step 1**: Define tool interface
```typescript
interface CustomTool {
  name: string;
  description: string;
  inputs: Record<string, ToolInput>;
  outputs: Record<string, ToolOutput>;
  execute: (inputs) => Promise<outputs>;
}
```

**Step 2**: Implement tool logic
```typescript
const customTool: CustomTool = {
  name: 'CustomOperation',
  description: 'Performs custom operation',
  inputs: {
    data: { type: 'string', required: true }
  },
  outputs: {
    result: { type: 'object' }
  },
  execute: async (inputs) => {
    // Implementation
    return { result: processedData };
  }
};
```

**Step 3**: Register tool
```typescript
registerTool(customTool);
```

### Plugin Integration

**Plugin Structure**:
```
my-plugin/
├── package.json
├── dist/
│   └── ui.js
└── tools/
    ├── tool1.ts
    ├── tool2.ts
    └── index.ts
```

**Package.json**:
```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "codebolt": {
    "nodes": [
      {
        "type": "MyPlugin/CustomTool",
        "title": "Custom Tool",
        "description": "Does custom things"
      }
    ]
  }
}
```

## Best Practices

### Tool Selection

1. **Use Appropriate Tool**: Choose the right tool for the job
2. **Combine Tools**: Leverage multiple tools together
3. **Handle Errors**: Account for tool failures
4. **Validate Inputs**: Check inputs before execution
5. **Log Operations**: Track tool usage for debugging

### Performance

1. **Batch Operations**: Process multiple items together
2. **Cache Results**: Store frequently-used data
3. **Parallelize**: Run independent operations concurrently
4. **Optimize I/O**: Minimize file system operations
5. **Use Memory**: Store intermediate results

### Security

1. **Validate Paths**: Prevent directory traversal
2. **Sanitize Inputs**: Clean user-provided data
3. **Limit Permissions**: Restrict tool access
4. **Audit Logs**: Track tool usage
5. **Error Messages**: Don't expose sensitive info

## Use Cases

### 1. Code Refactoring Agent

**Tools Used**:
- ReadFile (read code)
- LLM/Inference (generate refactored code)
- EditFileWithDiff (apply changes)
- GitAdd (stage changes)
- GitCommit (commit refactoring)

### 2. Test Generation Agent

**Tools Used**:
- SearchFiles (find source files)
- ReadFile (read source code)
- LLM/Inference (generate tests)
- WriteToFile (save tests)
- RunCommand (run test suite)

### 3. Documentation Agent

**Tools Used**:
- ListDirectory (find files)
- ReadManyFiles (read code)
- LLM/Inference (generate docs)
- MemoryMarkdownSave (store docs)
- Chat/SendMessage (notify user)

### 4. Deployment Agent

**Tools Used**:
- Git/Pull (update code)
- RunCommand (build project)
- Agent/StartAgent (run tests)
- Git/Commit (commit artifacts)
- Git/Push (deploy)

## Related Concepts

- **[Agent Creation (Code)](/conceptbank/features/agent-management/agent-creation-code.md)**: Using tools in workflows
- **[Agent Creation (Visual)](/conceptbank/features/agent-management/agent-creation-visual.md)**: Drag-and-drop tool nodes
- **[Agent Configuration](/conceptbank/features/agent-management/agent-configuration.md)**: Declaring required tools
- **[Agent Hooks](/conceptbank/features/agent-management/agent-hooks.md)**: Triggering tools automatically
