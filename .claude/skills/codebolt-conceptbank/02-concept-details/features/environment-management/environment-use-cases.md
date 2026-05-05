---
title: Environment Management Use Cases
category: environment-management
tags: [workflows, patterns, examples]
---

# Environment Management Use Cases

Real-world scenarios and workflows demonstrating how CodeBolt's environment management features solve practical development challenges.

## Executive Summary

These use cases illustrate how teams and individual developers leverage CodeBolt's multi-environment management, file update intents, shadow git, and cross-environment operations to improve development workflows, reduce conflicts, and enable safe experimentation.

## Use Case Categories

### 1. Parallel Feature Development

**Challenge**: Multiple features need simultaneous development without conflicts.

**Solution**: Use multiple environments with file update intents.

```typescript
// Environment Setup
Environment A: Feature branch "authentication"
Environment B: Feature branch "payment-processing"
Environment C: Feature branch "user-profile"
Local: Main branch (stable)

// Agent Assignment
Agent 1 → Environment A (FrontendAgent)
Agent 2 → Environment B (BackendAgent)
Agent 3 → Environment C (UIAgent)

// File Update Intents
Environment A: [
  { path: '/src/auth/*', level: 2, priority: 7 },
  { path: '/src/api/auth.ts', level: 3, priority: 8 }
]

Environment B: [
  { path: '/src/payment/*', level: 2, priority: 7 },
  { path: '/src/api/payment.ts', level: 3, priority: 8 }
]

Environment C: [
  { path: '/src/profile/*', level: 2, priority: 6 },
  { path: '/src/components/*', level: 1, priority: 5 }
]
```

**Workflow**:
1. Create environments for each feature branch
2. Assign specialized agents to each environment
3. Register file update intents to prevent conflicts
4. Develop features in parallel
5. Review diffs before merging to main
6. Merge features individually when ready

**Benefits**:
- No waiting for other features
- Clear separation of concerns
- Early conflict detection
- Independent testing per feature

---

### 2. Safe Experimentation with Shadow Git

**Challenge**: Try radical refactoring without risk to main codebase.

**Solution**: Use Shadow Git checkpoints for safe experimentation.

```typescript
// Workflow
1. Create Shadow Git checkpoint
   await shadowGit.createCheckpoint(
     'Before: Monolithic architecture refactor'
   );

2. Make radical changes
   - Split large files
   - Reorganize directory structure
   - Change module boundaries
   - Update imports

3. Test thoroughly
   - Run all tests
   - Verify functionality
   - Check performance

4. Decision point
   If successful:
     - Review diffs with team
     - Commit to main git
     - Cleanup Shadow Git

   If unsuccessful:
     - Restore Shadow Git checkpoint
     - Learn what didn't work
     - Try alternative approach
```

**Benefits**:
- Zero risk to main codebase
- Easy rollback
- Full history of attempts
- Learn from failures

---

### 3. Multi-Agent Swarm Development

**Challenge**: Coordinate multiple AI agents working on same codebase.

**Solution**: File update intents with level-based coordination.

```typescript
// Scenario: 5 agents, complex feature

// Agent 1: Architecture (Priority 9)
Intent: [
  { path: '/src/core/*', level: 4, priority: 9 },
  { path: '/src/types/*', level: 4, priority: 9 }
]

// Agent 2: API Development (Priority 7)
Intent: [
  { path: '/src/api/*', level: 3, priority: 7 }
]

// Agent 3: Frontend Components (Priority 6)
Intent: [
  { path: '/src/components/*', level: 2, priority: 6 },
  { path: '/src/styles/*', level: 1, priority: 5 }
]

// Agent 4: Testing (Priority 5)
Intent: [
  { path: '/tests/*', level: 2, priority: 5 },
  { path: '/src/**/*test.ts', level: 1, priority: 4 }
]

// Agent 5: Documentation (Priority 3)
Intent: [
  { path: '/docs/*', level: 1, priority: 3 },
  { path: '/README.md', level: 1, priority: 3 }
]

// Coordination Flow
1. Agent 1 locks core files (level 4)
2. Agent 2 requests API files (level 3)
   - No conflict with Agent 1
   - Proceeds with API development
3. Agent 3 requests components (level 2)
   - Checks for conflicts
   - Proceeds with coordination
4. Agent 4 and 5 work with advisory intents
   - No blocking
   - Minimal coordination needed
```

**Benefits**:
- Parallel agent execution
- Automatic conflict resolution
- Priority-based coordination
- Minimal manual intervention

---

### 4. Remote Collaboration with E2B

**Challenge**: Pair programming with distributed team.

**Solution**: E2B environment for shared development.

```typescript
// Setup
Environment Type: E2B (remote)
Provider Configuration: {
  type: 'e2b',
  template: 'nodejs-typescript',
  apiKey: process.env.E2B_API_KEY
}

// Workflow
1. Create E2B environment
   const env = await createEnvironment({
     name: 'Team Collaboration',
     provider: e2bProvider
   });

2. Share environment link with team
   - Multiple developers access same environment
   - Real-time collaboration
   - Shared code state

3. Assign tasks to agents
   Agent 1: Implement feature X
   Agent 2: Review and test
   Agent 3: Documentation

4. Track changes with environment diffs
   - See all changes made
   - Review before committing
   - Learn from team approach

5. Merge to local when ready
   await mergeAsPatch(env.id);
```

**Benefits**:
- Real-time collaboration
- Shared development context
- No local setup required
- Easy code review

---

### 5. Testing Across Multiple Node Versions

**Challenge**: Verify code works across different Node.js versions.

**Solution**: Docker environments for each version.

```typescript
// Environment Setup
const environments = [
  {
    name: 'Node 16',
    provider: {
      type: 'docker',
      image: 'node:16-alpine'
    }
  },
  {
    name: 'Node 18',
    provider: {
      type: 'docker',
      image: 'node:18-alpine'
    }
  },
  {
    name: 'Node 20',
    provider: {
      type: 'docker',
      image: 'node:20-alpine'
    }
  }
];

// Workflow
1. Deploy code to all environments
   for (const env of environments) {
     await deployToEnvironment(env.id, codebase);
   }

2. Run tests in each environment
   const results = await Promise.all(
     environments.map(env => runTests(env.id))
   );

3. Compare results
   - Identify version-specific issues
   - Verify compatibility
   - Document any problems

4. Fix issues in local environment
   - Use Shadow Git for safety
   - Test fixes across all versions
   - Ensure backward compatibility
```

**Benefits**:
- Comprehensive testing
- Version compatibility verification
- Isolated test environments
- Parallel execution

---

### 6. Hotfix vs Feature Development

**Challenge**: Urgent fix needed while feature development ongoing.

**Solution**: Priority-based file update intents.

```typescript
// Scenario: Production bug + ongoing feature

// Feature Development (Priority 5)
Agent A: {
  environment: 'env-feature-123',
  intent: [
    { path: '/src/auth/*', level: 2, priority: 5 }
  ]
}

// Hotfix Required (Priority 9)
Agent B: {
  environment: 'env-hotfix-456',
  intent: [
    { path: '/src/auth/login.ts', level: 3, priority: 9 }
  ]
}

// Coordination
1. Agent B registers high-priority intent
2. System detects overlap with Agent A
3. Priority comparison: 9 > 5
4. Agent A receives notification:
   "Higher priority intent on /src/auth/login.ts"
   "Please coordinate or wait for hotfix completion"
5. Agent A can:
   - Wait for hotfix (recommended)
   - Work on different files
   - Coordinate with Agent B
6. Agent B proceeds with hotfix
7. After hotfix deployed, Agent A resumes
```

**Benefits**:
- Urgent fixes not blocked
- Clear priority hierarchy
- Automatic coordination
- Minimal disruption

---

### 7. Gradual Migration Strategy

**Challenge**: Migrate large codebase gradually without breaking changes.

**Solution**: Multiple environments tracking migration progress.

```typescript
// Migration Environments
Environment A: Original code (baseline)
Environment B: Partially migrated (module 1)
Environment C: Partially migrated (module 2)
Environment D: Fully migrated (all modules)

// Workflow
Phase 1: Establish baseline
  envA: Original code
  Create checkpoint

Phase 2: Migrate module 1
  envB: Migrate module 1 to new architecture
  Test thoroughly
  Compare with envA
  Verify functionality

Phase 3: Migrate module 2
  envC: Migrate module 2
  Test with envB integration
  Cross-environment testing

Phase 4: Complete migration
  envD: Migrate remaining modules
  Full integration testing
  Performance comparison

Phase 5: Deployment
  Compare all environments
  Choose best approach
  Deploy to production
```

**Benefits**:
- Incremental migration
- Risk minimization
- Easy rollback
- Progress tracking

---

### 8. A/B Testing Implementations

**Challenge**: Compare two different implementations of same feature.

**Solution**: Parallel environments with diff comparison.

```typescript
// Setup
Environment A: Implementation A (event-based)
Environment B: Implementation B (observable-based)

// Workflow
1. Implement in both environments
   - Same feature, different approaches
   - Separate file update intents

2. Test both implementations
   - Run same test suite
   - Measure performance
   - Check code quality

3. Compare implementations
   const comparison = await compareEnvironments(
     envA.id,
     envB.id
   );

   // Compare:
   - Code complexity
   - Performance metrics
   - Test coverage
   - Maintainability

4. Document findings
   - Pros/cons of each approach
   - Performance differences
   - Recommendations

5. Select winner
   - Merge chosen implementation
   - Document rationale
   - Archive other approach
```

**Benefits**:
- Objective comparison
- Risk-free exploration
- Data-driven decisions
- Documentation of alternatives

---

### 9. Documentation-Driven Development

**Challenge**: Keep documentation synchronized with code changes.

**Solution**: Advisory-level file update intents for documentation.

```typescript
// Agent Setup
Agent 1: Code development
Agent 2: Documentation (advisory intents)

// Workflow
1. Agent 1 creates code change intent
   {
     files: [
       { path: '/src/api/user.ts', level: 2 }
     ],
     description: 'Add user management API'
   }

2. Agent 2 monitors with advisory intent
   {
     files: [
       { path: '/docs/api.md', level: 1 },
       { path: '/README.md', level: 1 }
     ],
     description: 'Update documentation for API changes'
   }

3. After code changes complete
   - Agent 2 notified of changes
   - Updates documentation accordingly
   - No blocking, just notification

4. Continuous synchronization
   - Documentation stays current
   - No manual reminders needed
   - Automatic coordination
```

**Benefits**:
- Always up-to-date docs
- No blocking of development
- Automatic notifications
- Clear responsibility

---

### 10. Emergency Rollback Procedure

**Challenge**: Production issue requires immediate rollback.

**Solution**: Shadow Git + environment isolation.

```typescript
// Emergency Workflow
1. Production issue detected
   - System unstable
   - Critical bug in deployment

2. Immediate rollback
   // Find last known good checkpoint
   const checkpoints = await shadowGit.getCheckpoints();
   const lastGood = checkpoints.find(c =>
     c.message.includes('stable')
   );

   // Restore immediately
   await shadowGit.restoreCheckpoint(
     lastGood.hash
   );

3. Investigation environment
   // Create environment for debugging
   const debugEnv = await createEnvironment({
     name: 'Debug Production Issue',
     provider: localProvider
   });

   // Copy broken code to debug environment
   await copyToEnvironment(
     debugEnv.id,
     brokenCodeState
   );

4. Fix in isolation
   - Debug issue in isolated environment
   - Test fix thoroughly
   - Verify no regressions

5. Deploy fix
   - Apply fix to main codebase
   - Test again
   - Deploy to production

6. Post-incident review
   - Document what happened
   - Update procedures
   - Prevent recurrence
```

**Benefits**:
- Instant rollback capability
- Safe debugging in isolation
- No production downtime
- Full incident documentation

---

## Workflow Patterns

### Pattern 1: Branch per Environment
```
1. Create environment for feature branch
2. Assign dedicated agent
3. Register file update intents
4. Develop and test
5. Review diffs
6. Merge to main
7. Cleanup environment
```

### Pattern 2: Environment Promotion
```
Development → Staging → Production

1. Develop in dev environment
2. Promote to staging (sync changes)
3. Test in staging
4. Promote to production
5. Monitor and rollback if needed
```

### Pattern 3: Parallel Experimentation
```
1. Create multiple environments
2. Try different approaches
3. Compare results
4. Select best approach
5. Merge to main
6. Archive alternatives
```

### Pattern 4: Agent Specialization
```
1. Assign specialized agents to environments
2. Each agent owns specific files (level 2-3)
3. Coordinate through file update intents
4. Merge changes when ready
5. Continuous integration
```

## Best Practices Summary

### Environment Creation
- Create environments for specific purposes
- Use descriptive names
- Document environment purpose
- Clean up when done

### Intent Registration
- Always register before making changes
- Use appropriate intent levels
- Set reasonable priorities
- Complete intents when done

### Shadow Git
- Create checkpoints before risky changes
- Use descriptive messages
- Review history before cleanup
- Don't rely on for permanent storage

### Cross-Environment Operations
- Verify environment states before operations
- Check for conflicts before syncing
- Test in safe environment first
- Document operations

## Related Concepts

- **Multi-Environment Management**: Running multiple environments
- **File Update Intent**: Conflict prevention
- **Shadow Git**: Safe experimentation
- **Environment Diffs**: Change tracking
- **Cross-Environment Operations**: Coordination
- **Environment Types**: Different execution contexts
