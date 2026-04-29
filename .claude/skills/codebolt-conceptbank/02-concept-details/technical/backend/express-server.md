---
title: Express REST API Server
category: Technical
subcategory: Backend
tags: [express, rest, api, server, http]
---

## Executive Summary

CodeBolt's backend is built on Express.js, providing a RESTful API server that handles HTTP requests, serves as the gateway to all backend services, manages WebSocket upgrades for real-time communication, and coordinates initialization of database, agents, and MCP servers on startup.

## What is the Express Server?

The Express server is the central HTTP server that powers CodeBolt's backend architecture. It acts as the entry point for all client requests, routing them to appropriate controllers, managing middleware, handling WebSocket connections for real-time features, and orchestrating the initialization sequence for all backend subsystems including the database, AI agents, and language servers.

## Why It Matters

- **Unified Entry Point**: Single server handling all HTTP and WebSocket communication
- **Service Orchestration**: Coordinates initialization of 124+ services, database, and external systems
- **Request Routing**: Directs incoming requests to appropriate controllers and services
- **Real-Time Communication**: Manages WebSocket upgrades for live features
- **Port Management**: Dynamically finds available ports to avoid conflicts
- **Graceful Shutdown**: Properly cleans up resources and connections on exit

## Key Concepts

### Server Architecture

- **Express Application**: Core Express app with middleware and route configuration
- **HTTP Server**: Native Node.js HTTP server wrapping Express for WebSocket support
- **Port Discovery**: Automatic port scanning to find available ports (12345-13000 range)
- **CORS Enabled**: Cross-origin resource sharing for renderer process communication

### Middleware Stack

- **CORS**: Allows frontend to communicate with backend
- **JSON Parser**: Parses incoming JSON request bodies
- **Request Logging**: Logs all incoming requests for debugging
- **Route Handlers**: Delegates to specific route modules
- **WebSocket Upgrade**: Intercepts upgrade requests for WebSocket connections

### Initialization Sequence

The server follows a careful startup sequence:
1. Database initialization with migrations
2. TaskManager initialization
3. Agent index loading
4. MCP (Model Context Protocol) server index loading
5. LLM service initialization
6. Settings service initialization
7. Provider registry initialization
8. Language server configuration loading
9. MCP tool configuration initialization
10. AgentFlow runtime setup
11. HTTP server startup on available port
12. Environment WebSocket integration

### Route Organization

- **Modular Routes**: Each domain has its own route module (workspace, project, chat, etc.)
- **RESTful Design**: Follows REST conventions for resource operations
- **Route Prefixing**: Groups related endpoints under common prefixes
- **Separate Review Mode Routes**: Dedicated routes for code review functionality

### WebSocket Integration

- **Upgrade Handling**: HTTP server upgrades connections to WebSocket protocol
- **Socket Routing**: Routes WebSocket connections to specific handlers based on URL
- **Multiple Channels**: 30+ WebSocket channels for different features (chat, shell, tasks, etc.)
- **Real-Time Events**: Enables push notifications and live updates

## How It Works

### 1. Server Startup

When CodeBolt launches:

1. **Database Initialization**
   - TypeORM data source is initialized
   - Migrations are run to update schema
   - Seed data is populated if needed

2. **Service Initialization**
   - Core services are initialized (LLM, settings, providers)
   - Agent and MCP indexes are loaded
   - TaskManager starts background task processing

3. **Configuration Loading**
   - Language server configurations are loaded
   - MCP tool configurations are initialized
   - AgentFlow runtime is extracted and prepared

4. **Express Setup**
   - Express app is created with middleware
   - Routes are registered for all API endpoints
   - Review mode routes are mounted separately

5. **Server Binding**
   - Port scanner checks if default port (12345) is available
   - If occupied, finds next available port in range
   - HTTP server is created and bound to the port

6. **WebSocket Integration**
   - Upgrade handler is attached to HTTP server
   - WebSocket router is configured to route connections

### 2. Request Handling

For incoming HTTP requests:

1. **Request Reception**: HTTP server receives request on configured port
2. **CORS Check**: CORS middleware validates origin
3. **Body Parsing**: Request body is parsed if JSON
4. **Request Logging**: Method and URL are logged
5. **Route Matching**: Router matches URL to appropriate route module
6. **Controller Execution**: Controller function is executed with request/response
7. **Service Layer**: Controller calls appropriate service methods
8. **Response**: Response is sent back to client with status and data

### 3. WebSocket Upgrade

For WebSocket connections:

1. **Upgrade Request**: Client sends WebSocket upgrade request
2. **Route Detection**: Socket router determines which handler to use
3. **Handler Lookup**: Socket map is queried for handler function
4. **Connection Upgrade**: Connection is upgraded to WebSocket protocol
5. **Handler Execution**: Specific socket handler takes over the connection
6. **Event Handling**: Handler manages message events and disconnections

### 4. Graceful Shutdown

On application exit:

1. **Signal Handlers**: SIGINT and SIGTERM signals are caught
2. **Terminal Cleanup**: AI terminal and shell PTY processes are closed
3. **Server Shutdown**: HTTP server stops accepting new connections
4. **Connection Cleanup**: Existing connections are gracefully closed
5. **Process Exit**: Application exits cleanly

## Server Configuration

### Port Management

- **Default Port**: 12345
- **Fallback Range**: 12346-13000
- **Port Scanning**: Uses `portscanner` library to find available ports
- **Global Storage**: Active port stored in `global.serverPort`

### Environment-Specific Behavior

- **Development**: Uses relative paths, verbose logging
- **Production**: Uses Electron userData paths, optimized logging
- **Database Path**: Respects environment for database file location
- **Migration Paths**: Different paths for dev vs production compiled code

### Error Handling

- **Uncaught Exceptions**: Logged but don't crash process
- **Unhandled Rejections**: Logged for debugging
- **Broken Pipes**: Special handling for EPIPE errors
- **Startup Errors**: Rejected in startup promise

## Integration Points

### Database Integration

- TypeORM data source initialized before server starts
- Migrations run automatically on startup
- Seed data populated as needed

### Service Layer

- All 124+ services available to controllers
- Services initialized in dependency order
- Lazy loading for some services

### WebSocket System

- 30+ WebSocket channels managed
- Each feature has dedicated socket handler
- Real-time communication for chat, tasks, terminals

### External Systems

- Language servers for code intelligence
- MCP servers for external tool integration
- Local agents for AI capabilities

## Development Considerations

### Adding New Routes

1. Create controller in `/controllers` directory
2. Create route module in `/routes` directory
3. Import and register in main routes index
4. Follow REST conventions for endpoint design

### Adding WebSocket Channels

1. Create socket handler in `/sockets` directory
2. Add to socket map with route key
3. Implement handleUpgrade and event handlers
4. Update route detection logic if needed

### Middleware Addition

- Add before route mounting in server setup
- Follow Express middleware conventions
- Consider order of middleware execution

## Related Concepts

- [Controller Pattern](./controller-pattern.md) - HTTP request handling
- [Service Architecture](./service-architecture.md) - Backend service organization
- [Database Layer](./database-layer.md) - TypeORM and SQLite integration
- [Real-Time Systems](../real-time-systems/) - WebSocket-based features
- [REST API](https://en.wikipedia.org/wiki/Representational_state_transfer) - REST architecture
