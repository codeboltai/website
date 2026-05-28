# Agent Instructions

## Portal Requests

When the incoming request includes either of these fields:

- `fromportal`
- `source: "portal"`

treat the task as a portal-originated workflow.

## Website Change Rules

This website is generated from source inputs.

- Make durable website content changes in `content/site.yaml`.
- Make reusable layout, styling, or section capability changes in `template/`.
- Do not hand-edit `site/` for durable changes; it is generated output and can be overwritten.
- `oldwebsite/` is archived context and should not be treated as the active website.

For non-portal local work, the normal website validation flow is:

```bash
npm run validate
npm run dev
```

`npm run dev` already runs the generation step first, so a separate `npm run generate` is not required before local development. Use `npm run build` only when a production static build is specifically needed.

For portal-originated workflows, do **not** manually run these website commands:

```bash
npm run validate
npm run generate
npm run build
npm run dev
```

When the request comes from the portal, complete the file changes only. The website tester ActionBlock will handle install, validation/build/start, and browser verification manually through the portal workflow.

## Required Workflow

For portal-originated workflows:

1. Complete the requested code or content change.
2. Call `test-web-site` to verify the change.
3. Summarize the completed work and test results.
4. As the final tool/action step, call `create-pr`.

Do not call `create-pr` before implementation and `test-web-site` validation are complete.

### How to call the test ActionBlock

After completing all code changes, first use the `actionBlock_start` tool to run `test-web-site` with the current worktree path passed as `params.cwd`.

Use the absolute path of the worktree where the changes were made. Do not use the base project path from `codebolt.project.getProjectPath()`.

```json
{
  "actionBlockName": "test-web-site",
  "params": {
    "cwd": "/absolute/path/to/current/worktree"
  },
  "explanation": "Running calculator app verification before PR creation."
}
```

If `test-web-site` fails, fix the issue and rerun it before calling `create-pr`.

### How to call the PR ActionBlock

After `test-web-site` has executed successfully, use the `actionBlock_start` tool with the current worktree path passed as `params.cwd`.

```json
{
  "actionBlockName": "create-pr",
  "params": {
    "cwd": "/absolute/path/to/current/worktree"
  },
  "explanation": ""
}
```

Do **not** attempt to call `attempt_completion` until both ActionBlocks have been executed in order and returned their results successfully.

## Failure Handling

If the requested work cannot be completed, or checks fail and cannot be fixed in the current run:

- Report the blocker clearly.
- Do not claim the work is complete.
- If the request came from the portal, run `test-web-site` first when possible, then call `create-pr` as the final step, including the blocker or check failure details.
