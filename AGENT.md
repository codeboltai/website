# Agent Instructions

## Portal Requests

When the incoming request includes either of these fields:

- `fromportal`
- `source: "portal"`

treat the task as a portal-originated workflow.

## Website Change Rules

The active website is the static `newsite/` project.

- Make durable homepage changes in `newsite/index.html`.
- Make durable download page changes in `newsite/download/index.html`.
- Make SEO/GEO crawler changes in `newsite/robots.txt`, `newsite/sitemap.xml`, `newsite/llms.txt`, and `newsite/ai.txt`.
- Do not hand-edit `site/` for durable changes; it is deprecated generated output.
- `content/`, `template/`, and `site/` are legacy Sitegen/Astro reference material unless the user explicitly asks for that flow.
- `oldwebsite/` is archived context and should not be treated as the active website.

For non-portal local work, the normal website validation flow is:

```bash
npm run build
npm test
```

Use `npm run dev` when local browser verification is needed.

For portal-originated workflows, do **not** manually run these website commands:

```bash
npm run validate
npm run generate
npm run build
npm run dev
npm test
```

When the request comes from the portal, complete the file changes only. The website tester ActionBlock will handle install, validation/build/start, and browser verification manually through the portal workflow.

## Required Workflow

For portal-originated workflows:

1. Complete the requested code or content change.
2. Call `test-web-site` to verify the change.
3. Summarize the completed work and test results.
4. Only if `test-web-site` succeeds, call `create-pr` as the final tool/action step.

Do not call `create-pr` before implementation and `test-web-site` validation are complete.
Do not call `create-pr` if `test-web-site` fails, returns an inconclusive result, or reports a verification blocker that cannot be fixed and rerun successfully in the current turn.

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

If `test-web-site` fails, fix the issue and rerun it before calling `create-pr`. If the failure cannot be fixed in the current run, stop after reporting the blocker; do not call the PR ActionBlock.

### How to call the PR ActionBlock

After `test-web-site` has executed successfully, use the `actionBlock_start` tool with the current worktree path passed as `params.cwd`. Never run this PR ActionBlock after a failed or inconclusive `test-web-site` result.

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
- If the request came from the portal, run `test-web-site` first when possible. If it does not succeed, do not call `create-pr`; report the blocker and stop.
