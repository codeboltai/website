---
title: Markdown Memory
category: Memory Systems
status: Active
tags: [markdown, documentation, long-form, notes]
---

# Markdown Memory

## Executive Summary
Markdown Memory provides long-form text storage optimized for documentation, notes, and narrative content. It enables agents to maintain persistent documentation that's human-readable and easily exportable.

## What It Is and Why It Matters

Markdown Memory is where prose and documentation live in CodeBolt. Unlike JSON memory's structured data or episodic memory's event logs, markdown memory focuses on:
- Human-readable documentation
- Long-form content organization
- Rich text formatting
- Easy export and sharing

**Why this matters:**
- **Documentation Persistence**: Maintain docs alongside code
- **Knowledge Capture**: Store explanations and narratives
- **Human-AI Collaboration**: Bridge human and AI understanding
- **Export Flexibility**: Standard markdown format
- **Content Organization**: Thread-based document management

## Key Capabilities

### Thread-Based Documents
- **Individual Threads**: Each document is a separate thread
- **Rich Content**: Full markdown syntax support
- **File-Based Storage**: Simple `.json` files with content
- **Document Metadata**: Titles, creation dates, tags

### Markdown Support
- **Standard Syntax**: Headers, lists, code blocks, links
- **Code Highlighting**: Language-specific syntax highlighting
- **Tables**: Structured data representation
- **Links and References**: Cross-document linking
- **Images and Media**: Embed visual content

### Operations
- **CRUD**: Create, read, update, delete documents
- **Search**: Full-text search across documents
- **Organization**: Group related documents
- **Export**: Download as `.md` files
- **Versioning**: Track document changes

### Integration
- **Preview**: Rendered markdown view
- **Edit**: Raw markdown editor
- **Diff**: Compare document versions
- **Collaboration**: Multi-agent editing
- **API Access**: RESTful endpoints

## How It Works Conceptually

### Storage Model

Each markdown memory thread contains a single document:

```typescript
MarkdownMemoryThread {
  id: "thread_doc123"
  type: "markdown"
  title: "API Documentation"
  archived: false
  content: `
# API Documentation

## Overview
This document describes the public API endpoints.

## Authentication
All endpoints require Bearer token authentication.

\`\`\`typescript
const response = await fetch('/api/users', {
  headers: {
    'Authorization': \`Bearer \${token}\`
  }
});
\`\`\`

## Endpoints

### GET /api/users
Retrieve all users.

**Response:**
\`\`\`json
{
  "users": [...],
  "total": 42
}
\`\`\`
`
}
```

### File Organization

```
.codebolt/memory/markdown/
├── thread_doc123.json
├── thread_doc456.json
└── thread_doc789.json
```

### Document Lifecycle

```
1. Create document
   ↓
2. Write content (markdown)
   ↓
3. Save to file
   ↓
4. Edit and update
   ↓
5. Version history (optional)
   ↓
6. Export or share
```

## Use Cases

### Project Documentation
Comprehensive project documentation:

```markdown
# Project: E-Commerce Platform

## Architecture
This project uses a microservices architecture...

## Setup Instructions
1. Clone the repository
2. Install dependencies: \`npm install\`
3. Configure environment variables
4. Run: \`npm start\`

## Development
- Backend: Node.js + Express
- Frontend: React + TypeScript
- Database: PostgreSQL
```

### API Documentation
Detailed API reference documentation:

```markdown
# User Service API

## Authentication
All requests require JWT tokens.

## Endpoints

### Create User
\`\`\`
POST /api/users
\`\`\`

**Request Body:**
\`\`\`json
{
  "name": "John Doe",
  "email": "john@example.com"
}
\`\`\`

**Response:** 201 Created
```

### Meeting Notes
Collaborative meeting documentation:

```markdown
# Sprint Planning - 2024-01-15

## Attendees
- Alice (Product)
- Bob (Engineering)
- Charlie (Design)

## Decisions
1. **Feature Priority**: Focus on user authentication
2. **Timeline**: 2-week sprint
3. **Resources**: 2 engineers assigned

## Action Items
- [ ] Bob: Set up auth framework
- [ ] Alice: Write requirements doc
- [ ] Charlie: Design login flow
```

### Design Documentation
Architecture and design documentation:

```markdown
# System Design: Notification Service

## Requirements
- Real-time notifications
- Multiple channels (email, SMS, push)
- User preferences
- Rate limiting

## Architecture
\`\`\`
[Diagram: Service Architecture]
\`\`\`

## Data Model
\`\`\`typescript
interface Notification {
  id: string;
  userId: string;
  channel: 'email' | 'sms' | 'push';
  content: string;
  scheduledAt: Date;
}
\`\`\`
```

### Knowledge Base
Organized knowledge repositories:

```markdown
# Troubleshooting Guide

## Common Issues

### Database Connection Failed
**Symptoms:** App shows "Cannot connect to database"

**Solutions:**
1. Check if PostgreSQL is running
2. Verify connection string in `.env`
3. Ensure database exists

### Build Errors
**Symptoms:** TypeScript compilation fails

**Solutions:**
1. Clear node_modules: \`rm -rf node_modules\`
2. Reinstall: \`npm install\`
3. Check for type errors
```

### Learning Materials
Educational content and tutorials:

```markdown
# Tutorial: Building a REST API

## Prerequisites
- Node.js installed
- Basic JavaScript knowledge

## Step 1: Project Setup
\`\`\`bash
npm init -y
npm install express
\`\`\`

## Step 2: Create Server
\`\`\`typescript
import express from 'express';

const app = express();
app.listen(3000);
\`\`\`
```

## Best Practices

### Document Structure
- Use clear, descriptive titles
- Include table of contents for long docs
- Use consistent heading hierarchy
- Add metadata sections when relevant

### Content Quality
- Write for your audience (developers, users, etc.)
- Include code examples with syntax highlighting
- Provide context for code snippets
- Keep content up to date

### Organization
- Use descriptive thread titles
- Group related documents
- Archive outdated content rather than deleting
- Use tags or categories for discovery

### Collaboration
- Document your changes in commit messages
- Use clear section headers for updates
- Call out sections needing review
- Attribute contributions to authors

## Markdown Features

### Text Formatting
```markdown
*Italic*, **bold**, `code`, ~~strikethrough~~
```

### Lists
```markdown
- Unordered list item
- Another item

1. Ordered list
2. Second item
```

### Code Blocks
````markdown
\`\`\`typescript
const greeting: string = "Hello";
\`\`\`

\`\`\`python
print("Hello")
\`\`\`
````

### Tables
```markdown
| Feature | Status | Priority |
|---------|--------|----------|
| Auth    | Done   | High     |
| Profile | In Progress | Medium |
```

### Links and Images
```markdown
[Link text](https://example.com)
![Alt text](image.png)
```

## Integration Patterns

### With JSON Memory
- Use JSON for structured data, markdown for explanation
- Reference JSON schemas in markdown docs
- Embed JSON examples in code blocks

### With Vector Database
- Index markdown content for semantic search
- Find related documents by similarity
- Build documentation recommendation systems

### With Context Memory
- Generate documentation from conversations
- Reference context in documentation
- Maintain rationale and decisions

## Common Patterns

### README Template
```markdown
# Project Name

## Overview
Brief project description

## Installation
Setup instructions

## Usage
How to use the project

## Contributing
Guidelines for contributors
```

### API Documentation Template
```markdown
# API Name

## Base URL
\`\`\`
https://api.example.com/v1
\`\`\`

## Authentication
Authentication details

## Endpoints
- List endpoints with examples
```

### Decision Record Template
```markdown
# Decision Record: [Title]

## Context
Background and problem statement

## Decision
What was decided

## Consequences
Impact and trade-offs
```

## Related Concepts

- **[JSON Memory](./json-memory.md)**: Structured data storage
- **[Context Memory](./context-memory.md)**: Conversation context
- **[Episodic Memory](./episodic-memory.md)**: Event documentation
- **[Vector Database](./vector-database.md)**: Document search
- **[Memory Integration](./memory-integration.md)**: Combining memory types

## Technical Details

**Storage:** `.codebolt/memory/markdown/{threadId}.json`
**Service:** `markdownMemoryService.ts`
**Types:** `src/types/chatTypes.ts` (MarkdownMemoryThread)
**UI:** `MarkdownThreadDetail.tsx`

**Key Operations:**
- `readThread()`: Get document content
- `writeThread()`: Save/update document
- `listThreadIds()`: List all documents
- `deleteThread()`: Remove document
