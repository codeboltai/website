---
title: "CLI Command Types"
category: technical
subcategory: cli-system
tags:
  - cli
  - commands
  - operations
  - api
last_updated: 2025-01-18
---

## Executive Summary

CodeBolt's CLI System exposes 50+ command types across 12 major categories, providing comprehensive access to file operations, Git workflows, terminal execution, code analysis, and AI agent management through a unified WebSocket-based API.

## What are CLI Commands

CLI Commands are the fundamental operations available through CodeBolt's WebSocket interface. Each command consists of a message type, action, and optional parameters, following a consistent naming pattern that enables predictable interaction with the system.

## Why It Matters

The CLI command ecosystem matters because it:

- **Standardizes Operations**: Provides a consistent interface across all CodeBolt capabilities
- **Enables Automation**: Allows programmatic control of all CodeBolt features
- **Supports Agents**: Gives AI agents the tools they need to be productive
- **Extensible Design**: New commands can be added without breaking existing clients

## Key Concepts

### Command Structure

All CLI commands follow a common JSON structure:

- **Type**: High-level category (e.g., `fsEvent`, `gitEvent`, `agentEvent`)
- **Action**: Specific operation (e.g., `readFile`, `commit`, `startAgent`)
- **Message**: Parameters and context for the operation
- **Metadata**: Thread ID, agent ID, request ID for routing and tracking

### Command Categories

#### 1. File System Commands (`fsEvent`)

**Purpose**: File and directory operations

Core Actions:
- `createFile` - Create new files
- `readFile` - Read file contents
- `writeToFile` - Write content to files
- `updateFile` - Modify existing files
- `deleteFile` - Remove files
- `deleteFolder` - Remove directories
- `listFiles` - List directory contents
- `searchFiles` - Search files by pattern
- `grepSearch` - Search file contents
- `listCodeDefinitionNames` - Extract code definitions
- `readManyFiles` - Batch read multiple files
- `listDirectory` - Enhanced directory listing

#### 2. Git Commands (`gitEvent`)

**Purpose**: Version control operations

Core Actions:
- `git_init` - Initialize repository
- `git_clone` - Clone remote repository
- `git_add` - Stage files for commit
- `git_commit` - Create commit
- `git_push` - Push to remote
- `git_pull` - Pull from remote
- `git_status` - Get working tree status
- `git_diff` - View changes
- `git_logs` - View commit history
- `git_checkout` - Switch branches/commits
- `git_branch` - Create branches
- `git_get_tracked_files` - List tracked files
- `git_revert_changes` - Revert file changes

#### 3. Terminal Commands (`ExecuteCommand`)

**Purpose**: Shell command execution

Core Actions:
- `executeCommand` - Run shell command
- `executeCommandRunUntilInterrupt` - Run until interrupted
- `executeCommandRunUntilError` - Run until error occurs
- `executeCommandWithStream` - Stream command output
- `sendInterruptToTerminal` - Send interrupt signal

#### 4. Agent Commands (`agentEvent`)

**Purpose**: AI agent lifecycle management

Core Actions:
- `startAgent` - Start an agent instance
- `findAgent` - Find agents by task
- `listAgents` - List available agents
- `agentsDetail` - Get agent details
- `get_state` - Get agent state
- `get_project_state` - Get project state
- `update_project_state` - Update project state

#### 5. Browser Commands (`browserEvent`)

**Purpose**: Web browser automation

Core Actions:
- `newPage` - Open new browser page
- `goTo` - Navigate to URL
- `goBack` - Navigate back
- `goForward` - Navigate forward
- `refresh` - Refresh page
- `screenshot` - Capture screenshot
- `getHTML` - Get page HTML
- `extractText` - Extract page text
- `getMarkdown` - Get page as Markdown
- `getPdf` - Get page as PDF
- `click` - Click elements
- `type` - Type text
- `scroll` - Scroll page
- `close` - Close browser

#### 6. Code Analysis Commands (`codeEvent`)

**Purpose**: Code understanding and analysis

Core Actions:
- `getAllFilesMarkdown` - Get all files as Markdown
- `getCodeTree` - Get code structure tree
- `matchProblem` - Match code patterns
- `listCodeDefinitionNames` - List code definitions

#### 7. Task Management Commands (`taskEvent`)

**Purpose**: Task and project management

Core Actions:
- `addTask` - Create new task
- `getTasks` - List tasks
- `updateTask` - Update task
- `addSubTask` - Add sub-task
- `updateSubTask` - Update sub-task
- `deleteTask` - Delete task
- `getTasksByPhase` - Filter by phase
- `getTasksByStatus` - Filter by status
- `getTasksByPriority` - Filter by priority
- `createTasksFromMarkdown` - Import from Markdown
- `exportTasksToMarkdown` - Export to Markdown

#### 8. Memory Commands (`MemoryEvent`)

**Purpose**: Persistent data storage

Core Actions:
- `set` - Store value
- `get` - Retrieve value
- `saveMemory` - Save to memory
- `updateMemory` - Update memory
- `deleteMemory` - Delete memory
- `listMemory` - List memories

#### 9. Vector Database Commands (`vectordbEvent`)

**Purpose**: Vector similarity search

Core Actions:
- `addVectorItem` - Add vector embeddings
- `getVector` - Retrieve vectors
- `queryVectorItem` - Similarity search
- `queryVectorItems` - Batch similarity search

#### 10. Tool/MCP Commands (`codebolttools`)

**Purpose**: Tool management and execution

Core Actions:
- `getEnabledToolBoxes` - List enabled toolboxes
- `getAvailableToolBoxes` - List available toolboxes
- `getLocalToolBoxes` - List local toolboxes
- `searchAvailableToolBoxes` - Search toolboxes
- `listToolsFromToolBoxes` - List toolbox tools
- `configureToolBox` - Configure toolbox
- `getTools` - Get specific tools
- `executeTool` - Execute tool

#### 11. Notification Commands

**Purpose**: Event notifications and alerts

Types:
- `fsnotify` - File system events
- `gitnotify` - Git events
- `terminalnotify` - Terminal events
- `agentnotify` - Agent events
- `chatnotify` - Chat events
- `browsernotify` - Browser events
- `tasknotify` - Task events
- `mcpnotify` - MCP tool events
- `systemnotify` - System events

#### 12. Advanced Commands

**Thread Management** (`threadEvent`):
- Create, read, update, delete threads
- Thread metadata management

**Job Management** (`jobEvent`):
- Schedule and manage jobs
- Job execution tracking

**Action Plans** (`actionPlanEvent`):
- Create and manage action plans
- Add tasks to plans

**Swarm Commands** (`swarmEvent`):
- Multi-agent coordination
- Swarm management

**Auto Testing** (`autotesting.*`):
- Test case management
- Test suite operations
- Test execution and reporting

## Command Patterns

### Namespace Convention

Commands use dot-notation for namespacing:

```
{service}.{action}
```

Examples:
- `fs.readFile` - File system read
- `git.commit` - Git commit operation
- `agent.start` - Start agent

### Batch Operations

Many commands support batch operations:
- `readManyFiles` - Read multiple files
- `queryVectorItems` - Query multiple vectors
- `listToolsFromToolBoxes` - List from multiple toolboxes

### Confirmation Flow

Destructive operations follow confirmation pattern:
1. Send command with parameters
2. Request user confirmation via UI
3. Execute on approval
4. Return result or error

## Related Concepts

- [CLI Architecture](./cli-architecture.md) - How commands are routed and executed
- [CLI Services](./cli-services.md) - Service handlers that implement commands
- [WebSocket Messaging](./websocket-messaging.md) - Message format for commands
- [MCP Integration](../features/mcp-integration.md) - Tool system for command extension
