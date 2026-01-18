---
title: Knowledge Panel
category: Knowledge Management
status: Active
tags: [knowledge-base, documents, collections, chunking, ui-panel]
---

# Knowledge Panel

## Executive Summary
Knowledge Panel provides the primary interface for managing knowledge bases, enabling users to organize documents into collections, configure intelligent chunking strategies, and prepare content for semantic search and agent consumption.

## What It Is and Why It Matters

Knowledge Panel is CodeBolt's document management and knowledge organization system. It transforms unstructured documents into structured, searchable knowledge:

- **Collection Organization**: Group related documents by domain, project, or purpose
- **Intelligent Chunking**: Split documents using strategies optimized for content type
- **Multi-Format Support**: Handle text, markdown, JSON, HTML, and more
- **Document Processing**: Automatic chunking with progress tracking
- **Knowledge Preparation**: Ready documents for vector embedding and retrieval

**Why this matters:**
- **Structured Knowledge**: Turn raw files into organized, retrievable units
- **Agent Context**: Provide agents with curated knowledge sources
- **Efficient Retrieval**: Optimized chunking improves search relevance
- **Scalable Management**: Handle thousands of documents across collections
- **Content Enrichment**: Add metadata and structure to unstructured content

## Key Capabilities

### Collection Management
- **Create Collections**: Organize documents by topic, project, or domain
- **Collection Settings**: Configure chunking strategies per collection
- **Document Tracking**: Monitor document and chunk counts
- **Bulk Operations**: Import multiple documents at once

### Document Processing
- **File Import**: Load from local filesystem or URLs
- **Content Extraction**: Parse text from various file formats
- **Automatic Chunking**: Split documents using configured strategies
- **Progress Tracking**: Real-time updates on processing status
- **Error Handling**: Detailed error messages for failed processing

### Chunking Strategies
- **Fixed Size**: Split by character count with overlap
- **Recursive**: Hierarchical splitting using separators
- **Semantic**: Group by meaning (using embeddings)
- **Sentence**: Split at sentence boundaries
- **Paragraph**: Split at paragraph boundaries
- **Markdown**: Preserve structure (headers, code blocks, lists)

### File Type Support
- **Text Files**: `.txt`, `.md`, `.markdown`
- **Structured Data**: `.json`, `.xml`, `.csv`
- **Web Content**: `.html` (with URL fetching)
- **Documents**: `.pdf`, `.doc`, `.docx` (text extraction)

### Document Management
- **View Documents**: Browse documents within collections
- **Edit Chunks**: Modify chunk content after processing
- **Delete Documents**: Remove documents and associated chunks
- **Re-chunking**: Re-process documents after settings changes

## How It Works Conceptually

### Collection Organization

```
Knowledge Base
├── Collection: API Documentation
│   ├── Document: REST API Guide
│   ├── Document: GraphQL Reference
│   └── Document: Authentication Docs
├── Collection: Project Specifications
│   ├── Document: Requirements
│   └── Document: Architecture Decisions
└── Collection: Code Snippets
    ├── Document: Utility Functions
    └── Document: React Components
```

### Document Processing Pipeline

```
1. Import Document
   ↓
2. Extract Content
   - Parse file format
   - Extract text
   - Preserve structure
   ↓
3. Apply Chunking Strategy
   - Split into chunks
   - Add overlap
   - Preserve boundaries
   ↓
4. Create Chunks
   - Index chunks
   - Add metadata
   - Store references
   ↓
5. Ready for Embedding
   - Chunks available for vector DB
   - Prepared for semantic search
```

### Chunking Strategies

#### Fixed Size Chunking
```
Document: "This is a long document that needs to be split into fixed-size chunks..."

Chunk 1: "This is a long document that needs to be" (500 chars)
Chunk 2: "document that needs to be split into fixed" (500 chars, 50 overlap)
Chunk 3: "split into fixed-size chunks..." (remaining)
```

#### Recursive Chunking
```
Separators: ["\n\n", "\n", ". ", " "]

1. Try splitting by paragraphs (\n\n)
2. If chunks too large, split by lines (\n)
3. If still too large, split by sentences (. )
4. Final fallback: split by spaces
```

#### Markdown Chunking
```
# Header 1
Content...

## Header 2
Code block preserved
- List item 1
- List item 2

→ Chunks preserve:
  - Heading hierarchy
  - Code blocks intact
  - List structures
  - Section boundaries
```

### Storage Organization

```
.codebolt/knowledge/
├── collection_{id}/
│   ├── collection.json          # Collection metadata
│   ├── chunkingsettings.json    # Chunking configuration
│   └── documents/
│       ├── document_{id}/
│       │   ├── document.json    # Document metadata
│       │   ├── original.txt     # Original content
│       │   └── chunks.json      # Chunk data
```

## Use Cases

### Technical Documentation Management
Organize API docs, guides, and references:

```typescript
Collection: "API Documentation"
Documents:
  - REST Endpoints (markdown, recursive chunking)
  - Authentication Guide (markdown, markdown chunking)
  - Error Codes (JSON, fixed-size chunking)
  - Rate Limiting (markdown, paragraph chunking)
```

### Project Knowledge Base
Maintain project-specific knowledge:

```typescript
Collection: "E-Commerce Project"
Documents:
  - Requirements.md (requirements)
  - Architecture Decisions.md (decisions)
  - API Contracts.json (specifications)
  - Meeting Notes.txt (discussions)
```

### Code Repository Knowledge
Index code documentation:

```typescript
Collection: "Codebase Docs"
Documents:
  - CONTRIBUTING.md (guidelines)
  - README.md (overview)
  - docs/api/*.md (API docs)
  - docs/guides/*.md (tutorials)
```

### Research and Reference
Organize research materials:

```typescript
Collection: "ML Research"
Documents:
  - Paper Summaries.md (papers)
  - Experiment Results.json (data)
  - Best Practices.md (guidelines)
  - Related Work.html (web articles)
```

### Customer Support Knowledge
Build support knowledge base:

```typescript
Collection: "Support Docs"
Documents:
  - FAQ.md (common questions)
  - Troubleshooting Guide.md (solutions)
  - API Errors.json (error reference)
  - Onboarding Guide.md (user guide)
```

## Chunking Strategy Selection

### When to Use Fixed Size
- **Uniform content**: Log files, data dumps
- **Simple splitting**: When structure doesn't matter
- **Token management**: Precise control over chunk size
- **Example**: Server logs, CSV data

### When to Use Recursive
- **General purpose**: Good default for most text
- **Natural boundaries**: Preserves paragraphs and sentences
- **Flexibility**: Adapts to content structure
- **Example**: Articles, documentation, reports

### When to Use Semantic
- **Thematic coherence**: Group related concepts
- **Meaning preservation**: Keep related thoughts together
- **Topic transitions**: Detect topic shifts
- **Example**: Research papers, essays, narratives

### When to Use Sentence
- **Natural language**: Conversational content
- **Quote extraction**: Preserve complete sentences
- **Overlap needed**: Maintain context between chunks
- **Example**: Transcripts, interviews, dialogue

### When to Use Paragraph
- **Structured prose**: Essays, articles
- **Thematic units**: Paragraphs as complete thoughts
- **Minimal splitting**: Fewer, larger chunks
- **Example**: Blog posts, documentation sections

### When to Use Markdown
- **Technical docs**: Preserve code blocks and syntax
- **Structured content**: Headers, lists, tables
- **Code examples**: Keep examples intact
- **Example**: API docs, tutorials, guides

## Configuration Options

### Chunking Settings

```typescript
{
  defaultStrategy: "recursive",
  defaultOptions: {
    chunkSize: 500,        // characters
    overlap: 50,           // overlap characters
    separators: ["\n\n", "\n", ". ", " "]
  },
  fileTypeOverrides: {
    ".md": {
      strategy: "markdown",
      options: {
        maxChunkSize: 1000,
        preserveCodeBlocks: true,
        preserveLists: true
      }
    },
    ".json": {
      strategy: "fixed_size",
      options: {
        chunkSize: 1000,
        overlap: 100
      }
    }
  }
}
```

### Chunk Size Guidelines

| Content Type | Recommended Size | Overlap |
|--------------|------------------|---------|
| Short articles | 500-800 | 50-100 |
| Long documents | 800-1200 | 100-150 |
| Code snippets | 300-500 | 20-50 |
| Reference docs | 400-600 | 50-75 |
| Narrative text | 600-1000 | 75-100 |

## Integration with Other Systems

### With Vector Database
- Chunks become searchable units
- Automatic embedding generation
- Semantic search capability
- Hybrid search support

### With Knowledge Graph
- Extract entities from documents
- Build relationships between concepts
- Link documents to graph nodes
- Enhance graph queries with document context

### With Agent Memory
- Provide curated knowledge sources
- Context building for agents
- Knowledge retrieval during tasks
- Learning from documentation

### With Episodic Memory
- Track document access events
- Log document modifications
- Record chunk usage by agents
- Audit trail for knowledge changes

## Best Practices

### Collection Design
- **Purpose-Driven**: Create collections for specific domains
- **Size Management**: Keep collections focused and manageable
- **Clear Naming**: Use descriptive, searchable names
- **Documentation**: Add descriptions for context

### Document Preparation
- **Clean Content**: Remove unnecessary formatting
- **Standardize**: Use consistent file formats
- **Structure**: Use headers and sections for markdown
- **Metadata**: Include relevant context in content

### Chunking Optimization
- **Test Strategies**: Experiment with different strategies
- **Review Chunks**: Ensure chunk quality after processing
- **Adjust Settings**: Fine-tune based on content type
- **Monitor Performance**: Track search relevance

### Maintenance
- **Regular Updates**: Add new documents regularly
- **Remove Outdated**: Delete obsolete content
- **Re-chunk When Needed**: Update strategies if content changes
- **Monitor Statistics**: Track collection growth

## Advanced Features

### URL Content Fetching
Automatically fetch and process web content:

```typescript
Add Document from URL:
- Fetch HTML content
- Extract text (remove scripts, styles)
- Preserve headings and structure
- Auto-generate document title
```

### Custom Chunking Strategies
Create domain-specific chunking rules:

```typescript
// Example: Legal documents
{
  strategy: "custom",
  options: {
    splitBy: ["ARTICLE", "SECTION", "§"],
    preserveReferences: true,
    includeSectionNumbers: true
  }
}
```

### Metadata Enrichment
Add custom metadata to chunks:

```typescript
{
  content: "chunk text...",
  metadata: {
    headings: ["Introduction", "Background"],
    codeLanguage: "typescript",
    listType: "ordered",
    sourceDocument: "api-guide.md",
    section: "Authentication"
  }
}
```

### Batch Processing
Process multiple documents efficiently:

```typescript
Bulk Import:
1. Select multiple files
2. Assign to collection
3. Process in parallel
4. Track overall progress
5. Handle errors gracefully
```

## Troubleshooting

### Common Issues

**Documents Not Chunking**
- Check file format is supported
- Verify content extraction succeeded
- Review chunking settings
- Check for processing errors

**Poor Search Results**
- Adjust chunk size (may be too small/large)
- Increase overlap for context
- Try different chunking strategy
- Review chunk boundaries

**Large File Processing**
- Use fixed-size for predictability
- Increase timeout settings
- Consider splitting manually first
- Monitor memory usage

**Memory Usage**
- Limit collection size
- Archive old documents
- Clean up unused collections
- Optimize chunk settings

## Related Concepts

- **[Vector Database](../memory-systems/vector-database.md)**: Semantic search for chunks
- **[Knowledge Graph](./knowledge-graph.md)**: Entity and relationship extraction
- **[Knowledge Retrieval](./knowledge-retrieval.md)**: Search and access patterns
- **[Memory Integration](../memory-systems/memory-integration.md)**: Multi-memory coordination
- **[Markdown Memory](../memory-systems/markdown-memory.md)**: Long-form documentation

## Technical Details

**Service:** `src/main/server/services/knowledgeService.ts`
**Data Service:** `src/main/server/services/knowledgeDataService.ts`
**Chunking Service:** `src/main/server/services/knowledgeChunkingService.ts`
**UI Panel:** `src/renderer/Pages/Panels/KnowledgePanel/`
**Types:** `src/main/server/types/knowledge.ts`
**Storage:** `.codebolt/knowledge/{collectionId}/`

**Key Operations:**
- `createCollection()`: Create new knowledge collection
- `addDocument()`: Import and process documents
- `processDocument()`: Chunk document with configured strategy
- `getChunks()`: Retrieve document chunks
- `updateChunk()`: Modify chunk content
