---
title: Database Layer
category: Technical
subcategory: Backend
tags: [database, typeorm, sqlite, persistence, data-access]
---

## Executive Summary

CodeBolt's database layer provides persistent data storage using TypeORM with SQLite, featuring 23+ entities, automatic migrations, a repository pattern for data access, database seeding for initial data, and a helper abstraction layer that simplifies common database operations across the application.

## What is the Database Layer?

The database layer is CodeBolt's persistence infrastructure that manages all data storage operations using TypeORM as the ORM and SQLite as the database engine. It provides an object-oriented interface to database operations, handles schema migrations, manages entity relationships, and ensures data integrity through proper transaction handling and validation.

## Why It Matters

- **Data Persistence**: Reliable storage for all application data
- **Type Safety**: TypeScript entities provide compile-time type checking
- **Schema Management**: Migrations handle database schema evolution
- **Query Abstraction**: TypeORM abstracts raw SQL queries
- **Relationships**: Manages complex entity relationships
- **Portability**: SQLite provides embedded, zero-configuration database

## Key Concepts

### Technology Stack

#### TypeORM

TypeORM is the Object-Relational Mapping (ORM) framework:

- **Active Record Pattern**: Entities define both schema and behavior
- **Decorator-Based**: Uses TypeScript decorators for metadata
- **Repository Pattern**: Repository classes for data access
- **Migration System**: Automated schema migrations
- **Query Builder**: Type-safe query construction
- **Relationship Support**: One-to-one, one-to-many, many-to-many

#### SQLite

SQLite is the embedded database engine:

- **Zero Configuration**: No separate database server needed
- **Single File**: Database stored in a single file
- **Cross-Platform**: Works on all platforms
- **Lightweight**: Minimal resource footprint
- **Reliable**: ACID compliant transactions
- **Production Ready**: Suitable for desktop applications

### Database Architecture

#### Data Source Configuration

```typescript
export const AppDataSource = new DataSource({
  type: "sqlite",
  database: databasePath,  // Path varies by environment
  entities: [/* 23+ entities */],
  synchronize: false,  // Use migrations instead
  migrations: [/* migration files */],
  logging: false,
  migrationsRun: false
});
```

**Key Settings**:
- **Type**: SQLite
- **Database Path**: Production uses userData path, dev uses relative path
- **Entities**: All entity classes registered
- **Synchronize**: Disabled (use migrations for schema changes)
- **Migrations**: Automatic migration execution
- **Logging**: Disabled in production for performance

### Entity Organization

Entities are organized by domain:

#### Core Entities

- **CodeboltUser**: User accounts and authentication
- **UserProfileSetting**: User configuration profiles
- **Workspace**: User workspaces
- **Project**: Project metadata

#### Agent & AI Entities

- **LocalAgent**: Local AI agent configurations
- **MCP**: Model Context Protocol servers
- **MCPCategory**: MCP server categories
- **RemixAgent**: Agent remix configurations

#### Application Entities

- **Apps**: Installed applications
- **AppConfig**: Application configuration
- **Marketplace**: Marketplace items
- **Theme**: UI themes
- **ProblemMatcher**: Code problem matchers

#### Task & Thread Entities

- **Task**: Background tasks
- **TaskMessage**: Task messages
- **TaskActivity**: Task activity tracking
- **Thread**: Conversation threads
- **ThreadStep**: Thread execution steps
- **ThreadMessage**: Thread messages
- **ThreadMetaData**: Thread metadata
- **ThreadMemory**: Thread context memory

#### System Entities

- **DbVersion**: Database version tracking
- **LastSync**: Last synchronization timestamps
- **InboxMessageEntity**: Message inbox

### Entity Definition Pattern

Entities follow TypeORM decorator pattern:

```typescript
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('increment')
  projectId!: number;

  @Column()
  projectName!: string;

  @Column()
  projectPath!: string;

  @Column({ nullable: true })
  forkedFrom?: string;

  @Column()
  workspaceId!: number;

  @Column()
  createdAt!: Date;

  @Column({ nullable: true })
  lastAccessedAt?: Date;
}
```

**Key Decorators**:
- `@Entity()`: Marks class as database entity
- `@PrimaryGeneratedColumn()`: Auto-incrementing primary key
- `@Column()`: Regular column with type inference
- `@Column({ nullable: true })`: Optional column

### Migration System

#### Migration Files

Migrations manage schema evolution:

```typescript
// Example: 1748538169192-InitialSchema.ts
export class InitialSchema1748538169192 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'projects',
        columns: [
          // Column definitions
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('projects');
  }
}
```

**Features**:
- **Up Migration**: Apply schema changes
- **Down Migration**: Rollback schema changes
- **Timestamped Names**: Migration files include timestamps
- **Ordering**: Migrations run in timestamp order

#### Migration Execution

Migrations are executed during initialization:

1. **Data Source Initialize**: TypeORM connection established
2. **Run Migrations**: Pending migrations are executed
3. **Fallback Sync**: If migrations fail, synchronize in development
4. **Seed Data**: Initial data is populated

### Database Helper

The `DbHelper` class provides a simplified interface:

```typescript
class DbHelper {
  private dataSource: DataSource;
  private workspaceRepository: Repository<Workspace>;
  // ... other repositories

  // Workspace methods
  async insertWorkspace(name: string, folderPath: string): Promise<number>
  async updateWorkspace(id: number, name: string, folderPath: string): Promise<void>
  async deleteWorkspace(id: number): Promise<void>
  async getWorkspaceById(id: number): Promise<Workspace | null>
  async getAllWorkspaces(): Promise<Workspace[]>
}
```

**Benefits**:
- **Simplified API**: Higher-level methods
- **Type Safety**: Return types are explicit
- **Error Handling**: Centralized error handling
- **Convenience**: Common operations pre-built

### Repository Pattern

TypeORM repositories provide data access:

```typescript
// Get repository
const workspaceRepository = dataSource.getRepository(Workspace);

// Find operations
const workspace = await workspaceRepository.findOneBy({ id });
const workspaces = await workspaceRepository.find();
const workspaces = await workspaceRepository.findBy({ folderPath });

// Create/Update/Delete
const workspace = workspaceRepository.create({ name, path });
await workspaceRepository.save(workspace);
await workspaceRepository.update(id, { name });
await workspaceRepository.delete(id);
```

### Database Seeding

Seeders populate initial data:

```typescript
export class DatabaseSeederService {
  static async seedDatabase(): Promise<void> {
    await ThemeSeederService.initializeThemes();
    await ProblemMatcherSeederService.initializeProblemMatchers();
  }

  static async refreshSeeds(): Promise<void> {
    await ThemeSeederService.refreshThemes();
    await ProblemMatcherSeederService.refreshProblemMatchers();
  }
}
```

**Seed Data**:
- **Themes**: Default UI themes
- **Problem Matchers**: Code problem patterns
- **Configuration**: Default application settings

## How It Works

### 1. Database Initialization

On application startup:

1. **Data Source Created**: AppDataSource instance created
2. **Connection Established**: SQLite database file opened/created
3. **Migrations Run**: Pending migrations are executed
4. **Seed Data Populated**: Initial data is inserted
5. **Repositories Ready**: Repositories initialized for entities

### 2. Query Execution

For a typical database operation:

1. **Service Request**: Service calls database helper
2. **Repository Access**: Helper uses TypeORM repository
3. **Query Building**: TypeORM builds SQL query
4. **Execution**: SQLite executes the query
5. **Result Mapping**: Results mapped to entity instances
6. **Return**: Entities returned to service

### 3. Entity Relationships

TypeORM manages relationships:

```typescript
@Entity()
export class Project {
  @Column()
  workspaceId!: number;

  @ManyToOne(() => Workspace)
  @JoinColumn({ name: 'workspaceId' })
  workspace!: Workspace;
}
```

**Relationship Types**:
- **@OneToOne**: One-to-one relationship
- **@ManyToOne**: Many-to-one relationship
- **@OneToMany**: One-to-many relationship
- **@ManyToMany**: Many-to-many relationship

### 4. Transaction Management

TypeORM handles transactions:

```typescript
await dataSource.transaction(async (transactionalEntityManager) => {
  // Multiple operations in transaction
  await transactionalEntityManager.save(workspace);
  await transactionalEntityManager.save(project);
  // If any fails, all are rolled back
});
```

## Database Schema

### Table Structure

Each entity maps to a table:

```
projects
  - projectId (INTEGER PRIMARY KEY)
  - projectName (TEXT)
  - projectPath (TEXT)
  - forkedFrom (TEXT, nullable)
  - workspaceId (INTEGER)
  - createdAt (DATETIME)
  - lastAccessedAt (DATETIME, nullable)
```

### Indexes

Indexes optimize query performance:

- **Primary Keys**: Automatically indexed
- **Foreign Keys**: Automatically indexed
- **Custom Indexes**: Added via decorators for frequently queried columns

### Constraints

Data integrity is enforced:

- **Primary Key Constraints**: Unique identifier for each row
- **Foreign Key Constraints**: Referential integrity
- **Not Null Constraints**: Required fields
- **Unique Constraints**: Unique values (where applicable)

## Data Access Patterns

### Direct Repository Access

Services can use repositories directly:

```typescript
const repository = AppDataSource.getRepository(Project);
const project = await repository.findOneBy({ id });
```

### Database Helper

Most services use the helper:

```typescript
const project = await dbHelperInstance.getProjectById(id);
```

### Custom Queries

Complex queries use query builder:

```typescript
const projects = await projectRepository
  .createQueryBuilder('project')
  .where('project.workspaceId = :workspaceId', { workspaceId })
  .orderBy('project.createdAt', 'DESC')
  .getMany();
```

### Raw SQL

When needed, raw SQL can be executed:

```typescript
const results = await AppDataSource.query(
  'SELECT * FROM projects WHERE workspaceId = ?',
  [workspaceId]
);
```

## Database File Management

### File Location

Database file location varies by environment:

- **Development**: `./database.db` (relative path)
- **Production**: `~/Library/Application Support/CodeBolt/database.db`

### File Size

SQLite database is a single file:
- **Initial Size**: Small (~100KB with initial data)
- **Growth**: Grows with data
- **Limit**: SQLite supports up to 140TB

### Backup & Migration

Database can be:
- **Backed Up**: Copy database file
- **Migrated**: Copy file to new location
- **Reset**: Delete file and reinitialize

## Performance Considerations

### Connection Pooling

SQLite doesn't require connection pooling:
- Single connection per application
- Built-in connection management
- WAL mode for concurrent access

### Query Optimization

Performance optimization strategies:
- **Indexes**: On frequently queried columns
- **Eager Loading**: Load related entities efficiently
- **Pagination**: Limit result sets
- **Caching**: Cache frequently accessed data

### Transaction Usage

Transactions for data integrity:
- **Multiple Operations**: Group related operations
- **Atomicity**: All or nothing
- **Consistency**: Maintain data integrity

## Development Workflow

### Creating Entities

1. Define entity class with decorators
2. Add to entity list in data source
3. Create migration for schema change
4. Run migration
5. Use repository or helper for access

### Schema Changes

1. Create new migration file
2. Define up() and down() methods
3. Test migration locally
4. Run migration in development
5. Test application with new schema

### Debugging

Database debugging techniques:
- **Enable Logging**: Set `logging: true` in data source
- **Query Logging**: See generated SQL
- **Error Messages**: TypeORM provides detailed errors
- **Database Inspection**: Use SQLite browser tools

## Related Concepts

- [Service Architecture](./service-architecture.md) - How services use the database
- [Controller Pattern](./controller-pattern.md) - HTTP to data flow
- [Express Server](./express-server.md) - Server initialization
- [TypeORM Documentation](https://typeorm.io/) - TypeORM official docs
- [SQLite Documentation](https://www.sqlite.org/docs.html) - SQLite official docs
