---
title: Environment Management - Overview
category: environment-management
tags: [overview, architecture, concepts]
---

# Environment Management System

CodeBolt's Environment Management system provides comprehensive multi-environment orchestration, enabling developers and AI agents to work across multiple isolated codebase contexts simultaneously with built-in conflict prevention, safe experimentation, and seamless coordination.

## System Overview

The Environment Management system consists of six interconnected concepts that work together to enable sophisticated multi-environment workflows:

1. **Multi-Environment Management** - Core orchestration for running multiple environments
2. **Environment Types** - Different execution contexts (local, remote, custom)
3. **File Update Intent** - Conflict prevention through declarative coordination
4. **Shadow Git** - Safe experimentation with isolated git history
5. **Environment Diffs** - Comprehensive change tracking and visualization
6. **Cross-Environment Operations** - Coordination across environment boundaries

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Environment Manager                    │
│  (Lifecycle, State Management, Health Monitoring)        │
└─────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼────────┐  ┌──────▼─────────┐  ┌──────▼────────┐
│   Provider 1   │  │   Provider 2   │  │   Provider N  │
│  (Local/E2B/   │  │  (Docker/      │  │  (Custom/     │
│   Docker/etc)  │  │   Custom)      │  │   Remote)     │
└────────────────┘  └────────────────┘  └───────────────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
        ┌───────────────────┴───────────────────┐
        │                                       │
┌───────▼────────┐                    ┌────────▼─────┐
│   File Update  │                    │  Shadow Git  │
│     Intent     │                    │  Checkpoints │
└────────────────┘                    └──────────────┘
        │                                       │
        └───────────────────┬───────────────────┘
                            │
                    ┌───────▼────────┐
                    │  Environment   │
                    │     Diffs      │
                    └────────────────┘
```

## Key Concepts

### 1. Multi-Environment Management

**Core capability** for running multiple isolated codebase environments simultaneously.

- **Independent State**: Each environment maintains separate file state
- **Parallel Execution**: Multiple environments run concurrently
- **Lifecycle Management**: Start, stop, restart environments independently
- **Health Monitoring**: Real-time status and error tracking

**When to use**: Any workflow requiring multiple isolated contexts.

### 2. Environment Types

**Flexible provider system** supporting different execution contexts.

- **Local**: Default development on host machine
- **E2B**: Browser-based cloud environments
- **Docker**: Containerized execution
- **Custom**: User-defined specialized environments

**When to use**: Choose based on task requirements (speed, isolation, collaboration).

### 3. File Update Intent

**Declarative conflict prevention** through intent registration.

- **Four Intent Levels**: Advisory, Soft Reservation, Priority-Based, Hard Lock
- **Overlap Detection**: Automatic conflict detection before changes
- **Priority Coordination**: Higher priority intents win
- **Auto-Expiration**: Stale intents expire automatically

**When to use**: Multi-agent workflows, parallel development, critical resource protection.

### 4. Shadow Git

**Safe experimentation** with isolated git history.

- **Checkpoints**: Named snapshots of project state
- **Easy Rollback**: Restore any checkpoint instantly
- **Clean History**: No pollution of main git repository
- **Diff Viewing**: Compare checkpoints

**When to use**: Experimental features, refactoring, A/B testing, learning.

### 5. Environment Diffs

**Comprehensive change tracking** and visualization.

- **File Status**: Added, modified, deleted, renamed
- **Change Statistics**: Lines added/removed per file
- **Monaco Diff View**: Interactive side-by-side comparison
- **Summary Metrics**: Quick overview of changes

**When to use**: Code review, debugging, change documentation, cross-environment comparison.

### 6. Cross-Environment Operations

**Coordination layer** for multi-environment workflows.

- **File Transfer**: Copy files between environments
- **Change Synchronization**: Propagate changes across environments
- **Task Coordination**: Distribute work across environments
- **State Comparison**: Compare environment states

**When to use**: Sharing reference implementations, propagating changes, parallel development.

## Workflow Integration

### Typical Development Workflow

```typescript
// 1. Create environment for feature
const env = await createEnvironment({
  name: 'feature-authentication',
  provider: localProvider
});

// 2. Create Shadow Git checkpoint
await shadowGit.createCheckpoint(
  'Before authentication feature'
);

// 3. Register file update intent
const intent = await createIntent({
  environmentId: env.id,
  files: [
    { path: '/src/auth/*', level: 2, priority: 7 }
  ],
  description: 'Implement authentication'
});

// 4. Make changes (with agent or manually)
// ... development work ...

// 5. Review environment diffs
const diffs = await getDiffFiles(env.id);

// 6. If issues, restore checkpoint
await shadowGit.restoreCheckpoint(checkpointHash);

// 7. If good, complete intent
await completeIntent(intent.id);

// 8. Merge to main project
await mergeAsPatch(env.id);

// 9. Cleanup
await deleteEnvironment(env.id);
await shadowGit.cleanup();
```

### Multi-Agent Workflow

```typescript
// Setup multiple environments
const envs = await Promise.all([
  createEnvironment({ name: 'UI', provider: localProvider }),
  createEnvironment({ name: 'API', provider: dockerProvider }),
  createEnvironment({ name: 'Tests', provider: e2bProvider })
]);

// Assign agents with file update intents
const agents = [
  {
    id: 'ui-agent',
    environment: envs[0],
    intent: [
      { path: '/src/components/*', level: 2, priority: 6 }
    ]
  },
  {
    id: 'api-agent',
    environment: envs[1],
    intent: [
      { path: '/src/api/*', level: 3, priority: 7 }
    ]
  },
  {
    id: 'test-agent',
    environment: envs[2],
    intent: [
      { path: '/tests/*', level: 1, priority: 5 }
    ]
  }
];

// Agents work in parallel
// System prevents conflicts automatically
// Changes coordinated via file update intents
```

## Feature Interactions

### File Update Intent + Environment Types

Different environment types may use different intent levels:

```typescript
// Local environment: Soft reservations (level 2)
// Critical production environment: Hard locks (level 4)
// Experimental environment: Advisory (level 1)
```

### Shadow Git + Environment Diffs

Shadow Git provides baselines for diff generation:

```typescript
// Compare current environment to Shadow Git checkpoint
const diffs = await compareToCheckpoint(
  environmentId,
  checkpointHash
);
```

### Cross-Environment Ops + File Update Intent

Respects intents when transferring files:

```typescript
// Before copying file to environment B
// Check for active intents on target file
const overlap = await checkOverlap(
  environmentB,
  [targetFile]
);

if (overlap.blocked) {
  // Coordinate with intent holder first
}
```

## Best Practices

### Environment Setup
- Create environments with specific purposes
- Use descriptive names
- Document environment configuration
- Clean up when no longer needed

### Intent Registration
- Always register before making changes
- Use appropriate intent levels
- Set reasonable priorities
- Complete intents when done

### Shadow Git Usage
- Create checkpoints before risky changes
- Use descriptive messages
- Review history before cleanup
- Don't rely on for permanent storage

### Cross-Environment Operations
- Verify environment states before operations
- Check for conflicts before syncing
- Test in safe environment first
- Document all operations

## Use Case Highlights

1. **Parallel Feature Development**: Multiple features developed simultaneously without conflicts
2. **Safe Experimentation**: Try radical changes with easy rollback
3. **Multi-Agent Coordination**: Multiple agents work together with automatic conflict prevention
4. **Remote Collaboration**: Shared development environments via E2B
5. **Testing Matrix**: Test across multiple configurations in parallel
6. **Hotfix Priority**: Urgent fixes take precedence over ongoing features
7. **Gradual Migration**: Migrate large codebases incrementally
8. **A/B Testing**: Compare different implementations objectively
9. **Documentation Sync**: Keep docs updated with code changes
10. **Emergency Rollback**: Instant recovery from production issues

## Technical Details

### Environment Lifecycle

```
Created → Starting → Running → Stopping → Stopped
                  ↓         ↑
                  └─ Restarting
                  ↓
                Error
```

### Provider Communication

WebSocket-based bidirectional communication:
- Environment providers connect to CodeBolt main process
- Real-time status updates
- Command execution and responses
- Event streaming for state changes

### Storage Locations

```
.codebolt/
  ├── environments/           # Environment configurations
  ├── fileupdateintent/       # Intent storage
  │   └── intents.json
  └── shadow-git/            # Shadow git repositories
      └── <project-hash>/
          └── .git/
```

## Related Documentation

- **Multi-Environment Management**: Detailed orchestration concepts
- **Environment Types**: Provider configuration and usage
- **File Update Intent**: Conflict prevention system
- **Shadow Git**: Safe experimentation with git
- **Environment Diffs**: Change tracking and visualization
- **Cross-Environment Operations**: Multi-environment coordination
- **Environment Use Cases**: Real-world workflow examples

## Conclusion

CodeBolt's Environment Management system provides a comprehensive solution for managing multiple codebase environments safely and efficiently. By combining isolated execution contexts, declarative conflict prevention, safe experimentation tools, and seamless coordination, it enables sophisticated multi-agent and multi-environment workflows that were previously difficult or impossible.

The system is designed to scale from single-developer projects to large team collaborations, from simple local development to complex distributed workflows, all while maintaining safety, isolation, and coordination.
