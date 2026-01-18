---
title: Project Structure
category: Additional Features
related:
  - development-tools/code-editor.md
  - knowledge-management/codemap.md
  - integrations/mcp.md
---

# Project Structure

## Executive Summary
Project Structure is an AI-powered codebase intelligence system that automatically discovers, organizes, and maintains comprehensive knowledge about your project's architecture, dependencies, and configuration. It transforms complex codebases into navigable, understandable visual representations.

## What It Is and Why It Matters

Project Structure provides:

- **Automatic Discovery**: AI-driven analysis of your codebase to identify packages, services, and dependencies
- **Living Documentation**: Real-time updates as your project evolves through WebSocket connections
- **Visual Organization**: Structured presentation of API routes, UI routes, database tables, and more
- **Collaborative Knowledge**: Update request system for suggesting and reviewing structural improvements

This feature is essential for:
- **Onboarding**: Quickly understanding new codebases without manual exploration
- **Architecture Planning**: Visualizing current structure before making changes
- **Dependency Management**: Tracking relationships between services and components
- **Team Coordination**: Shared understanding of project organization across team members

## Key Capabilities

### Automatic Codebase Analysis

#### Monorepo Detection
- Identifies monorepo structures and workspace configurations
- Discovers individual packages and their relationships
- Maps service boundaries and dependencies

#### Package Metadata Extraction
- **Language Detection**: Identifies programming languages per package
- **Framework Detection**: Discovers frontend frameworks (React, Vue, Angular, etc.)
- **Runtime Identification**: Detects Node.js, Python, Java, and other runtimes
- **Styling Systems**: Identifies CSS frameworks and component libraries

### Structural Information Organization

#### API Routes
- HTTP method classification (GET, POST, PUT, DELETE)
- Endpoint path mapping and organization
- Controller and handler associations

#### UI Routes
- Frontend route definitions
- Component-to-route mappings
- Navigation structure visualization

#### Database Schema
- Table discovery and naming
- Relationship identification
- Schema metadata tracking

#### Dependency Management
- Package dependency extraction
- Version tracking
- License and security metadata

#### Run Commands
- Script discovery (npm scripts, makefiles, etc.)
- Development vs production command categorization
- Build and test command identification

### Real-Time Updates

#### WebSocket Integration
- Live updates when files change
- Automatic refresh on structural modifications
- Connection status monitoring

#### Update Request System
- Suggest structural improvements
- Review and approve proposed changes
- Track update history and rationale

## How It Works Conceptually

### Data Flow Architecture

```
┌─────────────────────────────────────────┐
│         File System Watcher             │
│  (Monitors codebase changes)            │
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│         Analysis Engine                 │
│  • Pattern Matching                     │
│  • AST Parsing                          │
│  • Configuration Parsing                │
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│      Knowledge Graph Builder            │
│  • Package Relationships                │
│  • Dependency Mapping                   │
│  • Service Boundaries                   │
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│         Frontend Display                │
│  • Hierarchical Tree View               │
│  • Collapsible Sections                 │
│  • Searchable Interface                 │
└─────────────────────────────────────────┘
```

### Knowledge Discovery Process

1. **Initial Scan**
   - Traverse directory structure
   - Identify configuration files
   - Detect package managers and workspaces

2. **Pattern Recognition**
   - Match known framework patterns
   - Identify routing conventions
   - Extract database schemas

3. **Relationship Mapping**
   - Build dependency graphs
   - Map import/export relationships
   - Identify service boundaries

4. **Metadata Enrichment**
   - Extract version information
   - Identify licenses and security data
   - Categorize by type and purpose

### Update Mechanisms

#### Automatic Updates
- File system watchers detect changes
- WebSocket pushes real-time notifications
- Incremental updates minimize performance impact

#### Manual Updates
- User-submitted update requests
- Review and approval workflow
- Change tracking and history

## Use Cases

### 1. Rapid Onboarding
**Scenario**: New developer joining a project

**Benefits**:
- Immediate understanding of project layout
- Identification of key services and their purposes
- Quick location of relevant code for tasks
- Understanding of dependencies and integration points

### 2. Architecture Planning
**Scenario**: Planning a major refactoring

**Benefits**:
- Visual representation of current structure
- Identification of coupling and dependencies
- Impact analysis for proposed changes
- Communication tool for architectural decisions

### 3. Dependency Management
**Scenario**: Upgrading a shared library

**Benefits**:
- Immediate visibility of affected packages
- Understanding of transitive dependencies
- Risk assessment for upgrade scenarios
- Coordinated upgrade planning

### 4. Service Decomposition
**Scenario**: Breaking monolith into microservices

**Benefits**:
- Identification of natural service boundaries
- Analysis of current coupling
- Dependency mapping for extraction
- Migration planning support

## Information Categories

### Package-Level Information
- **Basic Metadata**: Name, path, type, language
- **Framework Information**: Frontend frameworks, styling libraries
- **Runtime Details**: Node version, Python version, etc.
- **Dependencies**: Package dependencies with versions

### Structural Elements
- **API Routes**: HTTP endpoints with methods and paths
- **UI Routes**: Frontend routes and component mappings
- **Database Tables**: Schema and relationships
- **Data Stores**: State management solutions

### Operational Details
- **Run Commands**: Development, build, test scripts
- **Deployment Configs**: Platform and deployment settings
- **Build Tools**: Webpack, Vite, TypeScript configurations

## Integration Points

### With Code Editor
- Navigate from structure directly to files
- Understand context when editing code
- Identify related files and components

### With Codemap
- Structural data informs codeflow visualizations
- Architectural context for code execution paths
- Dependency-aware trace generation

### With MCP Servers
- Enrich structural data with external information
- Integrate with documentation systems
- Connect to external code intelligence tools

## Best Practices

### For Effective Usage
- **Regular Review**: Periodically review and validate discovered information
- **Update Requests**: Submit improvements when structure is unclear
- **Collaboration**: Use shared understanding for team discussions
- **Documentation**: Complement with team-specific documentation

### For Large Codebases
- **Leverage Filtering**: Use search and filtering to focus on relevant areas
- **Bookmark Services**: Save frequently accessed service structures
- **Monitor Changes**: Watch update requests for structural evolution
- **Export Data**: Export structural information for external tools

## Related Concepts

- **[Codemap](knowledge-management/codemap.md)**: Visual code execution flows within the structure
- **[Code Editor](development-tools/code-editor.md)**: Direct code navigation and editing
- **[MCP Integration](integrations/mcp.md)**: Extensible knowledge sources
- **[Context Assembly](context-assembly/context-assembly.md)**: Leveraging structure for AI context
