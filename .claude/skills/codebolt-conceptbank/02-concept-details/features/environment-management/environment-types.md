---
title: Environment Types
category: environment-management
tags: [environment, providers, execution]
---

# Environment Types

CodeBolt supports multiple environment types through a flexible provider system, enabling execution in local, remote, and custom contexts depending on workflow needs.

## Executive Summary

Environment types define where and how code execution happens. CodeBolt supports local development environments, remote cloud environments (E2B, Docker), and custom providers, allowing developers to choose the right execution context for each task.

## What It Is

Environment types are implemented through a **provider system** where each provider offers:
- A specific execution context (local machine, cloud container, etc.)
- File system access and management
- Process lifecycle management
- Communication protocol with CodeBolt main process
- Configuration and initialization logic

## Why It Matters

Different workflows require different execution contexts:
- **Local Development**: Fast iteration on the host machine
- **Cloud Environments**: Isolated, scalable execution (E2B, Docker)
- **Custom Providers**: Specialized environments for specific needs
- **Multi-Provider Workflows**: Mix and match based on task requirements

## Key Capabilities

### Local Environment
The default development environment running on the host machine.

**Characteristics:**
- Direct access to host filesystem
- No network latency
- Uses host machine's dependencies
- Always available (no setup required)
- Integrated with local git and tools

**Best For:**
- Quick iterations and prototyping
- Development requiring local tools
- Tasks needing host machine resources
- Learning and experimentation

**Configuration:**
```typescript
{
  id: 'local-default',
  name: 'Local',
  provider: {
    type: 'local',
    isLocal: true
  }
}
```

### Remote Environments
Cloud-based or network-accessible execution environments.

#### E2B Provider
Browser-based sandboxed development environments.

**Characteristics:**
- Full browser IDE access
- Isolated from host machine
- Instant startup
- Collaborative sharing
- Managed by E2B service

**Best For:**
- Remote collaboration
- Browser-based development
- Temporary sandboxing
- Code sharing and review

**Configuration:**
```typescript
{
  type: 'e2b',
  apiKey: 'your-api-key',
  template: 'nodejs', // or python, go, etc.
  timeout: 3600
}
```

#### Docker Provider
Containerized execution environments.

**Characteristics:**
- Lightweight containers
- Reproducible environments
- Resource limits
- Fast startup/shutdown
- Docker-based tooling

**Best For:**
- Consistent build environments
- Testing across configurations
- Microservices development
- CI/CD simulation

**Configuration:**
```typescript
{
  type: 'docker',
  image: 'node:18-alpine',
  volumes: ['./src:/app/src'],
  ports: ['3000:3000'],
  resources: {
    memory: '512m',
    cpus: '0.5'
  }
}
```

### Custom Providers
User-defined environments with specialized behavior.

**Characteristics:**
- Fully customizable initialization
- Custom file operations
- Specialized tooling
- Domain-specific configuration
- Extensible protocol

**Best For:**
- Specialized hardware integration
- Proprietary execution environments
- Unique workflow requirements
- Research and experimentation

**Configuration:**
```typescript
{
  type: 'custom',
  providerPath: '/path/to/provider',
  config: {
    // Custom configuration
  },
  initialization: {
    script: 'init.sh',
    timeout: 300
  }
}
```

## Provider Architecture

### Provider Interface

All providers implement the following capabilities:

**Lifecycle Operations:**
- `initialize()`: Set up the environment
- `start()`: Begin execution
- `stop()`: Halt execution
- `restart()`: Recover from errors
- `cleanup()`: Remove resources

**File Operations:**
- `readFile(path)`: Read file contents
- `writeFile(path, content)`: Write file contents
- `listFiles()`: List all files
- `getDiff()`: Get file changes

**Communication:**
- WebSocket connection for real-time updates
- HTTP endpoints for operations
- Event streaming for status updates

### Provider Data Structure

```typescript
interface ProviderData {
  id: number;                    // Numeric ID
  unique_id: string;             // Unique identifier
  name: string;                  // Provider name
  author: string;                // Provider author
  description: string;           // Provider description
  tags: string[];                // Categorization tags
  version: string;               // Provider version
  createdByUser: string;         // Creator

  // Provider configuration
  providerPath?: string;         // Path to provider code
  isLocal?: boolean;             // Local vs remote

  // Agent configuration
  supportsSingleAgentOnly?: boolean;
  runsAnyAgent?: boolean;
  supportedAgentToRun?: string[];
}
```

### Provider Discovery

Providers are discovered from multiple sources:
1. **Local Providers**: Loaded from project's `.codebolt/providers/`
2. **Installed Providers**: User-installed via UI
3. **API Providers**: Fetched from CodeBolt provider marketplace
4. **Built-in Providers**: Local, E2B, Docker included by default

## Environment Creation

### Creating an Environment

```typescript
// Define environment
const environment = {
  name: 'My Remote Env',
  description: 'For testing',
  provider: selectedProvider,
  config: {
    // Provider-specific config
  }
};

// Create via API
await createEnvironment(environment);
```

### Provider Selection

Users select providers based on:
- **Task Requirements**: Local vs remote, specific tools needed
- **Resource Constraints**: Memory, CPU, storage needs
- **Collaboration Needs**: Sharing, access control
- **Cost Considerations**: Free vs paid providers

## Provider Marketplace

CodeBolt includes a provider marketplace for discovering and installing community providers:

**Features:**
- Browse available providers
- Search by tags/capabilities
- View provider documentation
- One-click installation
- Version management
- Updates and notifications

**Access via API:**
```typescript
const providers = await fetch('https://api.codebolt.ai/api/providers/all');
```

## Agent Integration

Environments support agent-specific configuration:

**Single-Agent Environments:**
```typescript
{
  supportsSingleAgentOnly: true,
  supportedAgentToRun: ['UIAgent']
}
```

**Multi-Agent Environments:**
```typescript
{
  runsAnyAgent: true
}
```

**Agent-Specific Environments:**
```typescript
{
  supportedAgentToRun: ['TestAgent', 'ReviewAgent']
}
```

## Use Cases

### Local Development
```
Environment: Local
Provider: Local (built-in)
Purpose: Quick iteration, debugging
```

### Remote Collaboration
```
Environment: Team Workspace
Provider: E2B
Purpose: Shared development environment
```

### Testing Matrix
```
Environment A: Node 16 (Docker)
Environment B: Node 18 (Docker)
Environment C: Python 3.10 (Docker)
Purpose: Cross-version testing
```

### Specialized Hardware
```
Environment: GPU Cluster
Provider: Custom (CUDA-enabled)
Purpose: Machine learning model training
```

### Staging Simulation
```
Environment: Staging Replica
Provider: Custom (production-like)
Purpose: Pre-deployment validation
```

## Best Practices

### Choosing Providers
- Use **Local** for development and iteration
- Use **E2B** for collaboration and sharing
- Use **Docker** for reproducible testing
- Use **Custom** for specialized needs

### Configuration
- Keep provider configuration in version control
- Use environment variables for sensitive data
- Document provider-specific requirements
- Test provider initialization in isolation

### Resource Management
- Set appropriate resource limits
- Monitor provider health
- Clean up unused environments
- Use auto-expire for temporary environments

## Related Concepts

- **Multi-Environment Management**: Running multiple environments simultaneously
- **File Update Intent**: Prevent conflicts across environments
- **Environment Diffs**: Track changes in each environment
- **Shadow Git**: Safe git operations within environments
- **Cross-Environment Operations**: Coordinate across providers
