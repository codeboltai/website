---
title: Multi-Environment Management
category: environment-management
tags: [environment, orchestration, isolation]
---

# Multi-Environment Management

CodeBolt enables simultaneous management of multiple isolated codebase environments, allowing developers and AI agents to work across different projects, branches, or experimental contexts without interference.

## Executive Summary

Multi-environment management provides the ability to run multiple isolated codebase contexts simultaneously, each with its own state, file changes, and agent assignments. This enables parallel development workflows, safe experimentation, and coordinated multi-agent operations across different environments.

## What It Is

Multi-environment management is CodeBolt's core orchestration capability that allows:
- Multiple environments to run concurrently without state conflicts
- Each environment to maintain independent file state and changes
- Agents to be assigned to specific environments for focused work
- Cross-environment operations like file copying and change synchronization
- Environment lifecycle management (start, stop, restart) independently

## Why It Matters

Traditional development workflows typically operate on a single codebase at a time, creating bottlenecks when:
- Multiple features need parallel development
- Experiments require isolation from main codebase
- Different teams or agents need separate working contexts
- Testing requires multiple environment configurations

Multi-environment management eliminates these constraints by providing true isolation and parallelization.

## Key Capabilities

### Environment Isolation
- **Independent State**: Each environment maintains its own file state, separate from others and the host project
- **Separate Git Tracking**: Environments can have their own git history or be isolated from git entirely
- **Resource Separation**: Memory, processes, and file handles are isolated per environment
- **Agent Assignment**: Agents operate within assigned environments with clear boundaries

### Parallel Execution
- **Concurrent Operations**: Multiple environments can run tasks simultaneously without interference
- **Independent Lifecycle**: Start, stop, and restart environments independently
- **Resource Management**: Individual resource allocation and cleanup per environment
- **Health Monitoring**: Separate health checks and error handling per environment

### Environment Types
- **Local Environment**: Default development environment on the host machine
- **Remote Environments**: Cloud-based or network-accessible environments (E2B, Docker, custom providers)
- **Custom Providers**: Extensible system for adding new environment types

### State Management
- **Environment Lifecycle States**: Created, Starting, Running, Stopping, Stopped, Error, Restarting
- **Real-time Status Tracking**: Monitor environment health and activity
- **Auto-recovery**: Automatic restart and error recovery mechanisms
- **Resource Cleanup**: Proper cleanup on environment shutdown

### Cross-Environment Operations
- **File Transfer**: Copy files between environments
- **Change Synchronization**: Merge changes from one environment to another
- **Diff Comparison**: Compare file states across environments
- **Task Coordination**: Coordinate tasks that span multiple environments

## How It Works Conceptually

### Environment Architecture

Each environment is represented as:
```
Environment {
  id: unique identifier
  name: human-readable name
  provider: environment type (local, remote, custom)
  state: current lifecycle state
  config: provider-specific configuration
  createdAt/updatedAt: timestamps
}
```

### Provider System

Environments are backed by **providers** that implement the actual execution context:
- **Local Provider**: Uses the host machine's filesystem and processes
- **Remote Providers**: Connect to external execution environments (E2B, Docker)
- **Custom Providers**: User-defined environments with custom logic

Providers handle:
- Environment initialization and cleanup
- File operations within the environment
- Process lifecycle management
- Communication with the CodeBolt main process

### Lifecycle Management

Environments progress through states:
1. **Created**: Environment definition exists but not initialized
2. **Starting**: Provider is initializing the environment
3. **Running**: Environment is ready for operations
4. **Stopping**: Graceful shutdown in progress
5. **Stopped**: Environment is shut down but can be restarted
6. **Error**: Environment encountered an error
7. **Restarting**: Environment is recovering from an error

The lifecycle manager ensures proper state transitions and handles errors.

### Multi-Environment Coordination

The **EnvironmentLifecycleManager** coordinates multiple environments:
- Tracks state of all active environments
- Manages health checks and monitoring
- Handles concurrent operations
- Prevents resource conflicts
- Enables cross-environment operations

### Store Management

The frontend **EnvironmentStore** (Zustand) manages:
- List of all environments
- Real-time status updates
- Environment selection and activation
- UI state for environment panels

## Use Cases

### Parallel Feature Development
```
Environment A: Feature branch X (agent: FrontendAgent)
Environment B: Feature branch Y (agent: BackendAgent)
Environment C: Main branch (agent: ReviewAgent)
```

### Safe Experimentation
```
Local: Production code (stable)
Remote Env 1: Experimental feature A (isolated)
Remote Env 2: Experimental feature B (isolated)
```

### Multi-Agent Collaboration
```
Environment 1: UI development (UIAgent)
Environment 2: API development (APIAgent)
Environment 3: Testing (TestAgent)
Synchronize changes when ready
```

### Cross-Environment Testing
```
Environment A: Development code
Environment B: Staging environment
Compare diffs and verify compatibility
```

### Branch Management
```
Environment per feature branch:
- env-feature-auth
- env-feature-payment
- env-feature-ui
Merge to main when complete
```

## Benefits

- **Isolation**: Work on multiple features without conflicts
- **Parallelization**: Increase throughput with concurrent environments
- **Safety**: Experiment without risking main codebase
- **Flexibility**: Mix local and remote environments as needed
- **Scalability**: Add more environments as workload grows
- **Organization**: Clear separation of concerns per environment

## Related Concepts

- **Environment Types**: Learn about different environment providers
- **File Update Intent**: Understand conflict prevention across environments
- **Shadow Git**: Safe experimentation with git operations
- **Environment Diffs**: Track and compare changes across environments
- **Cross-Environment Operations**: Coordinate work across multiple environments
