---
title: MCP Tool Creation
category: Integration and Extensibility
tags: [mcp, tools, development, customization, server]
---

## Executive Summary
Creating custom MCP tools and servers allows developers to extend CodeBolt agent capabilities with domain-specific functionality. By implementing the Model Context Protocol, developers can create reusable tools that integrate with any external system, API, or data source, making those capabilities available to all CodeBolt agents.

## What is MCP Tool Creation?

MCP tool creation involves building servers that implement the Model Context Protocol specification. These servers expose tools, resources, and prompts that CodeBolt agents can discover and use at runtime.

### Why Create Custom MCP Tools?

**Domain-Specific Capabilities**: Extend agents with specialized tools for your industry, workflows, or systems that aren't available in the general ecosystem.

**Internal Systems Integration**: Connect CodeBolt agents to proprietary internal systems, databases, and APIs without exposing them publicly.

**Custom Workflows**: Automate complex, multi-step processes specific to your organization's needs.

**Data Privacy**: Keep sensitive data processing local by running MCP servers on your own infrastructure.

## Tool Types

### Tools
Executable functions that agents can call:
- Perform actions (create, update, delete)
- Query data sources
- Process information
- Trigger workflows

### Resources
Readable data sources that agents can access:
- Files and documents
- Database records
- API responses
- Configuration data
- Knowledge base articles

### Prompts
Reusable prompt templates for specific tasks:
- Specialized query formats
- Domain-specific instructions
- Optimized prompts for particular operations
- Multi-step prompt chains

## Creating an MCP Server

### Server Structure

An MCP server is a program that communicates via stdio and implements the MCP protocol:

```typescript
// Basic MCP server structure
- Initialize connection
- Advertise capabilities (tools, resources, prompts)
- Handle incoming requests
- Execute operations
- Return structured results
```

### Server Capabilities

Servers declare which capabilities they support:

**Tools**: Expose callable functions with structured schemas
- Input validation
- Output formatting
- Error handling
- Progress reporting

**Resources**: Provide access to data sources
- URI-based addressing
- Metadata and descriptions
- Change notifications
- Batch reading

**Prompts**: Offer pre-built prompt templates
- Parameterized templates
- Argument validation
- Context injection
- Response formatting

## Development Workflow

### 1. Define Server Capabilities

Decide what your server will expose:
- Which tools to implement
- What resources to provide
- Whether to include prompts

### 2. Implement Protocol Handlers

Create handlers for MCP protocol messages:
- Initialize: Set up connection and advertise capabilities
- List Tools/Resources/Prompts: Return available items
- Call Tool: Execute a specific tool
- Read Resource: Retrieve data from a resource
- Get Prompt: Generate a prompt template

### 3. Package as Executable

Create a command-line interface that:
- Accepts stdio input for protocol messages
- Outputs JSON-RPC formatted responses
- Handles errors gracefully
- Supports graceful shutdown

### 4. Configure in CodeBolt

Add the server to CodeBolt's configuration:
- Specify the command to run
- Define command arguments
- Set environment variables
- Enable the server

## Configuration Management

### Server Configuration

MCP servers are configured through the CodeBolt settings:

```yaml
mcpServers:
  my-custom-server:
    command: node
    args: ["path/to/server.js"]
    env:
      API_KEY: "your-api-key"
```

### Runtime Configuration

Servers can be configured at runtime:
- API keys and authentication
- Connection parameters
- Feature flags
- Environment-specific settings

## Tool Design Best Practices

### Tool Naming

Use clear, descriptive names:
- Prefix with domain: `github-create-issue`
- Use action verbs: `fetch`, `create`, `update`, `delete`
- Be specific: `search-users-by-email` not just `search`

### Parameter Design

Create intuitive parameters:
- Use descriptive names
- Provide clear descriptions
- Specify types and constraints
- Include validation rules
- Support sensible defaults

### Error Handling

Return structured errors:
- Clear error messages
- Error codes for categorization
- Recovery suggestions
- Context about what went wrong

### Result Formatting

Structure results for agent consumption:
- Use consistent schemas
- Include metadata
- Provide human-readable summaries
- Support pagination for large results

## Testing MCP Tools

### Local Testing

Test your server locally before deploying:
- Use stdio to send test messages
- Verify protocol compliance
- Test error conditions
- Validate output schemas

### Integration Testing

Test within CodeBolt:
- Install the server
- Verify tool discovery
- Test tool execution
- Check error handling
- Validate results

## Publishing MCP Servers

### Community Sharing

Share your servers with the community:
- Publish to GitHub
- Add to MCP registry
- Document capabilities
- Provide examples
- Maintain compatibility

### Documentation

Essential documentation:
- Installation instructions
- Configuration examples
- Tool descriptions
- Parameter schemas
- Usage examples
- Troubleshooting guide

## Use Cases

### Internal Tools

Connect internal company systems:
- Custom CRMs
- Proprietary databases
- Internal APIs
- Legacy systems
- Business logic engines

### Industry-Specific

Domain-specific capabilities:
- Legal research tools
- Medical data access
- Financial calculations
- Scientific instruments
- Manufacturing systems

### Workflow Automation

Complex multi-step processes:
- Deployment pipelines
- Data processing workflows
- Compliance checks
- Reporting systems
- Notification chains

## Security Considerations

### Authentication

Implement proper authentication:
- API keys and tokens
- OAuth flows
- Certificate-based auth
- Secure credential storage

### Authorization

Control access to resources:
- User permissions
- Resource-level access
- Rate limiting
- Audit logging

### Data Protection

Handle sensitive data carefully:
- Encrypt data in transit
- Sanitize error messages
- Log security events
- Follow data privacy regulations

## Related Concepts

- **[MCP Support](./mcp-support.md)**: Understanding the Model Context Protocol
- **[External Integrations](./external-integrations.md)**: Pre-built integrations available
- **[Agent Capabilities](../agent-management/agent-capabilities.md)**: How agents use tools
- **[Extension Ecosystem](./extension-ecosystem.md)**: Other ways to extend CodeBolt
