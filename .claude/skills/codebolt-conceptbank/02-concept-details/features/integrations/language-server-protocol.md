---
title: Language Server Protocol (LSP) Integration
category: Integration and Extensibility
tags: [lsp, code-intelligence, editor, ide, languages]
---

## Executive Summary
Language Server Protocol (LSP) integration provides CodeBolt with professional-grade code intelligence capabilities including autocomplete, syntax highlighting, error checking, and code navigation. By connecting to language servers, CodeBolt offers IDE-like features across dozens of programming languages without reimplementing language-specific tooling.

## What is LSP?

Language Server Protocol is a standardized protocol for development tools to communicate with language-specific servers that provide intelligent programming features. It separates language intelligence from the editor, enabling any editor to support any language through a common interface.

### Why LSP Matters for CodeBolt

**Professional Code Intelligence**: Industry-standard code completion, diagnostics, and navigation that developers expect from modern IDEs.

**Language Agnostic**: Support for dozens of languages through a single protocol, with new languages added as language servers are developed.

**Vendor Neutral**: Language servers from multiple sources (Microsoft, Red Hat, community) all work through the same interface.

**Agent Enhancement**: Code intelligence helps agents write better code by providing context-aware suggestions and catching errors before execution.

## Key Capabilities

### Code Completion

Intelligent autocomplete as you type:
- Context-aware suggestions
- Function signatures
- Parameter hints
- Import/require suggestions
- Snippet expansion

### Diagnostics

Real-time error and warning detection:
- Syntax errors
- Type errors
- Linting violations
- Code smells
- Best practice violations

### Code Navigation

Powerful navigation features:
- Go to definition
- Find references
- Symbol search
- Document symbols outline
- Type hierarchy

### Code Actions

Automated code improvements:
- Quick fixes for errors
- Refactoring operations
- Code formatting
- Import organization
- Rename symbols

### Hover Information

Contextual documentation:
- Type information
- Documentation comments
- Parameter descriptions
- Return value types
- Usage examples

## Supported Language Servers

CodeBolt supports popular language servers:

### Web Development
- **TypeScript**: typescript-language-server
- **JavaScript**: javascript-typescript-stdio, typescript-language-server
- **HTML/HTML**: vscode-html-language-server
- **CSS/SCSS/Less**: vscode-css-language-server
- **JSON**: vscode-json-language-server

### Backend Languages
- **Python**: python-lsp-server, pyls
- **Go**: gopls
- **Rust**: rust-analyzer
- **Java**: jdtls
- **C/C++**: clangd

### Other Languages
- **PHP**: intelephense, php-language-server
- **Ruby**: solargraph
- **C#**: omnisharp-roslyn
- **Dart**: analysis-server

## How LSP Works in CodeBolt

### Architecture

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Editor     │────▶│   LSP Client │────▶│Language Server│
│  Component   │     │  (Protocol)  │     │   (Process)   │
└──────────────┘     └──────────────┘     └──────────────┘
                                                  │
                                                  ▼
                                          ┌──────────────┐
                                          │  Language    │
                                          │  Tools       │
                                          │(compiler,    │
                                          │ linter, etc) │
                                          └──────────────┘
```

### Communication Flow

1. **Initialization**: CodeBolt starts the language server process and establishes communication
2. **Document Sync**: File contents are synchronized with the language server
3. **Analysis**: The language server analyzes code using its tooling
4. **Capabilities**: CodeBolt queries available capabilities
5. **Feature Use**: CodeBolt requests features like completion, diagnostics, etc.
6. **Results**: Language server returns results that CodeBolt displays

### Connection Methods

**stdio Communication**
- Standard input/output for message passing
- Most common connection type
- Works well for local language servers

**WebSocket**
- Network-based communication
- Enables remote language servers
- Useful for cloud-based setups

## Language Server Installation

### Automatic Installation

CodeBolt can install language servers automatically:
- Detect available servers
- Install via npm/pip/gem as appropriate
- Configure automatically
- Ready to use immediately

### Manual Installation

Install language servers manually for control:
- Install via package manager
- Specify custom command
- Configure arguments
- Set environment variables

### Configuration

Language servers are configured per-language:
```yaml
langservers:
  python:
    runCommand: "pylsp"
    runCommandArgs: ["--stdio"]
    isInstalled: true
    installCommand: "pip install python-lsp-server"
  typescript:
    runCommand: "typescript-language-server"
    runCommandArgs: ["--stdio"]
    isInstalled: true
    installCommand: "npm install -g typescript-language-server"
```

## Language Server Preferences

Customize LSP behavior:

### Feature Toggles
- Enable/disable specific features per server
- Adjust completion trigger characters
- Configure diagnostic severity
- Control hover behavior

### Performance Settings
- Debounce timing for diagnostics
- Throttle high-frequency operations
- Memory limits for large projects
- Timeout configurations

### Editor Integration
- Format on save options
- Code action triggers
- Keyboard shortcuts
- UI customization

## Agent Usage of LSP

CodeBolt agents leverage LSP capabilities:

### Context Awareness
- Understand code structure for better suggestions
- Use type information for accurate completions
- Navigate code to understand relationships
- Find references to see usage patterns

### Code Quality
- Catch errors before suggesting code
- Follow language-specific best practices
- Use proper imports and dependencies
- Format code according to conventions

### Refactoring
- Rename symbols safely
- Extract functions correctly
- Move code between files
- Update references automatically

## Integration with Monaco Editor

CodeBolt's Monaco editor integration provides:
- Real-time diagnostics display
- Inlay hints for type information
- Code action lightbulbs
- Signature help for functions
- Parameter info in completions
- Symbol outline navigation
- Multi-file workspace support

## Use Cases

### Development
- Write code faster with intelligent autocomplete
- Catch errors early with real-time diagnostics
- Navigate large codebases efficiently
- Refactor code safely with automated operations

### Code Review
- Understand code context with hover information
- Find all references to a symbol
- See type information at a glance
- Identify potential issues with diagnostics

### Learning
- Learn APIs with signature help
- Understand code with hover documentation
- Explore codebases with navigation
- See best practices with quick fixes

### Agent Tasks
- Generate syntactically correct code
- Use appropriate libraries and imports
- Follow language conventions
- Fix errors before suggesting code

## Troubleshooting

### Common Issues

**Server Won't Start**
- Verify installation command
- Check system PATH
- Review server logs
- Test command in terminal

**Missing Features**
- Verify server capabilities
- Check feature enablement
- Update server version
- Review configuration

**Performance Issues**
- Large file handling
- Memory limits
- Throttle settings
- Disable heavy features

## Related Concepts

- **[MCP Support](./mcp-support.md)**: Model Context Protocol for external integrations
- **[Extension Ecosystem](./extension-ecosystem.md)**: Extending CodeBolt with plugins
- **[Editor Components](../development-tools/editor.md)**: CodeBolt's editor implementation
- **[Agent Capabilities](../agent-management/agent-capabilities.md)**: How agents use code intelligence
