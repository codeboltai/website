---
title: Controller Pattern
category: Technical
subcategory: Backend
tags: [controllers, http, rest, routing, request-handling]
---

## Executive Summary

CodeBolt's controller pattern provides a clean separation between HTTP request handling and business logic, with 73 specialized controllers that validate incoming requests, coordinate service calls, handle errors, and return appropriate HTTP responses following REST conventions and Express middleware patterns.

## What is the Controller Pattern?

Controllers are the HTTP request handlers in CodeBolt's backend that sit between the Express router and the service layer. They receive HTTP requests, extract and validate parameters, call appropriate service methods, handle errors and exceptions, and format HTTP responses with proper status codes and JSON bodies.

## Why It Matters

- **Separation of Concerns**: Keeps HTTP logic separate from business logic
- **Request Validation**: Ensures incoming data is valid before processing
- **Error Handling**: Centralized error handling and response formatting
- **HTTP Semantics**: Proper use of status codes and response formats
- **Testing**: Easy to test HTTP layer independently of business logic
- **Documentation**: Clear API surface through controller functions

## Key Concepts

### Controller Responsibilities

Controllers handle HTTP-specific concerns:

- **Request Parsing**: Extract data from request body, params, query
- **Validation**: Validate request data structure and values
- **Authentication**: Check user authentication (if needed)
- **Authorization**: Verify user permissions (if needed)
- **Service Coordination**: Call appropriate service methods
- **Response Formatting**: Structure JSON responses
- **Error Handling**: Catch errors and return appropriate error responses
- **Status Codes**: Return correct HTTP status codes

### Controller Structure

#### Function-Based Controllers

Most controllers use function exports:

```typescript
export const getWorkspace = async (req: Request, res: Response) => {
  try {
    const { workspaceId } = req.params;
    const workspace = await workspaceService.handleGetWorkspaceById(Number(workspaceId));
    res.json(workspace);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving workspace', error });
  }
};
```

**Benefits**:
- Simple and straightforward
- Easy to test individually
- Clear function names for operations

#### Parameter Extraction

Controllers extract parameters from different sources:

```typescript
// URL parameters (e.g., /workspace/:id)
const { workspaceId } = req.params;

// Query parameters (e.g., /workspace?limit=10)
const { limit } = req.query;

// Request body
const { name, path } = req.body;

// Headers
const authHeader = req.headers.authorization;
```

#### Response Patterns

Controllers return different response types:

```typescript
// Success response
res.json({ success: true, data: result });

// Error response
res.status(500).json({ success: false, error: err.message });

// Created resource
res.status(201).json({ id: newId, ...resource });

// No content
res.status(204).send();
```

### Route Organization

Routes are organized by domain:

```typescript
// /routes/workspaceRoutes.ts
workspaceRouter.get('/', getWorkspaces);
workspaceRouter.post('/select', selectWorkspace);
workspaceRouter.get('/:workspaceId', getWorkspaceById);
workspaceRouter.put('/change/:workspaceId', changeWorkspace);
```

**Features**:
- Grouped by resource/domain
- RESTful endpoint design
- Consistent naming conventions
- Centralized route configuration

### Error Handling

Controllers implement consistent error handling:

```typescript
export const controllerFunction = async (req: Request, res: Response) => {
  try {
    // Controller logic
    const result = await serviceMethod(params);
    res.json(result);
  } catch (error) {
    // Log error
    logger.error(`Error in controllerFunction: ${error}`);
    // Return error response
    res.status(500).json({
      success: false,
      message: 'Error description',
      error: error.message
    });
  }
};
```

### Common Controller Patterns

#### Single Resource Operations

```typescript
// GET /resource/:id
export const getResource = async (req: Request, res: Response) => {
  const { id } = req.params;
  const resource = await service.getResourceById(id);
  res.json(resource);
};

// POST /resource
export const createResource = async (req: Request, res: Response) => {
  const data = req.body;
  const resource = await service.createResource(data);
  res.status(201).json(resource);
};

// PUT /resource/:id
export const updateResource = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  await service.updateResource(id, data);
  res.json({ success: true });
};

// DELETE /resource/:id
export const deleteResource = async (req: Request, res: Response) => {
  const { id } = req.params;
  await service.deleteResource(id);
  res.status(204).send();
};
```

#### Collection Operations

```typescript
// GET /resources
export const listResources = async (req: Request, res: Response) => {
  const { limit, offset } = req.query;
  const resources = await service.listResources(limit, offset);
  res.json(resources);
};

// POST /resources/batch
export const batchCreateResources = async (req: Request, res: Response) => {
  const { items } = req.body;
  const results = await service.batchCreate(items);
  res.status(201).json(results);
};
```

#### Action Operations

```typescript
// POST /resource/:id/action
export const performAction = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { action, params } = req.body;
  const result = await service.performAction(id, action, params);
  res.json(result);
};
```

### Controller Categories

#### 1. Resource Controllers

Manage CRUD operations for resources:

- **workspaceController**: Workspace management
- **projectController**: Project operations
- **userController**: User profile management
- **appsController**: Application management

#### 2. Feature Controllers

Handle specific feature operations:

- **chatController**: Chat message handling
- **gitController**: Git operations
- **editorController**: Editor operations
- **fileController**: File operations

#### 3. Agent Controllers

Manage AI agent operations:

- **agentController**: Agent execution
- **agentFlowController**: Agent flow management
- **agentDeliberationController**: Agent decision making
- **agentPortfolioController**: Agent portfolio management

#### 4. Planning Controllers

Handle planning and coordination:

- **actionPlanController**: Action plan operations
- **taskPlannerController**: Task planning
- **orchestratorController**: Workflow orchestration
- **coordinationController**: Multi-agent coordination

#### 5. Integration Controllers

Manage external integrations:

- **mcpController**: MCP server management
- **languageServerController**: Language server operations
- **browserController**: Browser automation
- **vectorController**: Vector database operations

### Controller Index

The main controller index exports all controllers:

```typescript
// /controllers/index.ts
export * from './workspaceController';
export * from './projectController';
export * from './chatController';
// ... all other controllers
```

**Benefits**:
- Single import point
- Consistent exports
- Easy to discover controllers

## How It Works

### 1. Request Routing

When an HTTP request arrives:

1. **Request Received**: Express server receives HTTP request
2. **URL Matching**: Router matches URL pattern
3. **Method Matching**: Router matches HTTP method (GET, POST, etc.)
4. **Controller Selection**: Router selects appropriate controller function
5. **Middleware Execution**: Any middleware runs before controller
6. **Controller Execution**: Controller function is called

### 2. Controller Execution

The controller executes:

1. **Parameter Extraction**: Extract data from request
2. **Validation**: Validate extracted data
3. **Service Call**: Call appropriate service method
4. **Wait for Result**: Await service response
5. **Response Formatting**: Format response data
6. **Send Response**: Send HTTP response to client

### 3. Error Scenarios

When errors occur:

1. **Service Throws Error**: Service method throws exception
2. **Catch Block**: Controller's try-catch catches error
3. **Error Logging**: Error is logged for debugging
4. **Error Response**: Appropriate error response sent
5. **Client Receives**: Client gets error with status code

## Controller Best Practices

### 1. Keep Controllers Thin

Controllers should be thin - just HTTP handling:

```typescript
// Good: Thin controller
export const getProject = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const project = await projectService.getProject(projectId);
  res.json(project);
};

// Bad: Fat controller with business logic
export const getProject = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  // Business logic should be in service
  const isActive = await checkIfActive(projectId);
  const hasAccess = await checkAccess(projectId);
  // ...
};
```

### 2. Use Consistent Response Formats

Maintain consistent response structure:

```typescript
// Success response
{
  "success": true,
  "data": { ... }
}

// Error response
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error"
}
```

### 3. Proper Status Codes

Use appropriate HTTP status codes:

- **200 OK**: Successful GET, PUT, PATCH
- **201 Created**: Successful POST
- **204 No Content**: Successful DELETE
- **400 Bad Request**: Invalid input
- **401 Unauthorized**: Not authenticated
- **403 Forbidden**: Not authorized
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

### 4. Validate Input

Always validate input before processing:

```typescript
export const createProject = async (req: Request, res: Response) => {
  const { name, path } = req.body;

  // Validate required fields
  if (!name || !path) {
    return res.status(400).json({
      success: false,
      message: 'Name and path are required'
    });
  }

  // Validate data types
  if (typeof name !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Name must be a string'
    });
  }

  // Process request
  const project = await projectService.createProject({ name, path });
  res.status(201).json(project);
};
```

### 5. Handle Errors Gracefully

Provide helpful error messages:

```typescript
try {
  const result = await service.operation();
  res.json(result);
} catch (error) {
  // Log for debugging
  logger.error(`Operation failed: ${error}`);

  // Return user-friendly message
  res.status(500).json({
    success: false,
    message: 'Failed to complete operation',
    error: process.env.NODE_ENV === 'development'
      ? error.message
      : 'Internal server error'
  });
}
```

## Controller Testing

Controllers can be tested independently:

```typescript
import { Request, Response } from 'express';
import { getWorkspace } from './workspaceController';

describe('Workspace Controller', () => {
  it('should return workspace', async () => {
    const mockReq = {
      params: { workspaceId: '1' }
    } as Request;

    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    } as unknown as Response;

    await getWorkspace(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalled();
  });
});
```

## Route Organization

Routes are organized hierarchically:

```
/routes
  /index.ts          # Main route aggregator
  /workspaceRoutes.ts    # Workspace routes
  /projectRoutes.ts      # Project routes
  /chatRoutes.ts         # Chat routes
  /agentRoutes.ts        # Agent routes
  ...                    # Other route modules
```

Each route module:
- Imports controller functions
- Creates Express router
- Defines route mappings
- Exports router instance

## Related Concepts

- [Express Server](./express-server.md) - HTTP server and routing
- [Service Architecture](./service-architecture.md) - Business logic layer
- [Database Layer](./database-layer.md) - Data persistence
- [REST API](https://restfulapi.net/) - REST API design principles
