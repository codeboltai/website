export type AudiencePage = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  problem: {
    title: string;
    body: string;
    points: string[];
  };
  fit: {
    title: string;
    body: string;
    capabilities: Array<{ label: string; text: string }>;
  };
  workflow: Array<{ step: string; title: string; text: string }>;
  proof: string[];
  related: string[];
};

export const audiencePages: AudiencePage[] = [
  {
    slug: "developers",
    eyebrow: "For Developers",
    title: "Build faster without babysitting agents.",
    description:
      "Use Codebolt as the workspace around your coding agents: editor, terminal, browser, tools, context, and verification in one place.",
    metaTitle: "Codebolt for Developers",
    metaDescription:
      "Use Codebolt for individual software development with CLI, editor, runtime tools, verification loops, and less agent babysitting.",
    primaryCta: { label: "Start free", href: "/download/" },
    secondaryCta: { label: "See how it runs", href: "/#runtime-handles" },
    problem: {
      title: "You do not need another chat box.",
      body:
        "You need a place where agents can actually work on a repo, use tools, recover from failures, and show enough evidence that you can trust the result.",
      points: [
        "Agents lose context across real tasks.",
        "You still wire tools, browser, terminal, files, and checks yourself.",
        "Reviewing every generated change becomes the new bottleneck."
      ]
    },
    fit: {
      title: "One developer gets a complete agent operating loop.",
      body:
        "Use built-in or custom agents inside a workspace that owns context, tools, review loops, and execution boundaries outside the agent.",
      capabilities: [
        { label: "CLI and editor", text: "Start from your terminal or the full desktop workspace." },
        { label: "Runtime context", text: "Push the right files, docs, tools, and state into the agent at the right moment." },
        { label: "Verification", text: "Use tests, review gates, and second agents before accepting work." },
        { label: "Local first", text: "Work against real repos with scoped permissions and visible provenance." }
      ]
    },
    workflow: [
      { step: "01", title: "Open a repo", text: "Start in the editor or run the CLI from a working directory." },
      { step: "02", title: "Pick the work", text: "Use a built-in agent or a custom process-specific agent." },
      { step: "03", title: "Let the foundry run", text: "Tools, context, environment, and review loops run around the agent." },
      { step: "04", title: "Accept with evidence", text: "Review the result, provenance, checks, and changed files." }
    ],
    proof: [
      "Best for solo development, prototypes, maintenance work, and local automation.",
      "Keeps the agent small while the runtime handles the hard repeated pieces."
    ],
    related: ["teams", "plugin-builders", "embedded-products"]
  },
  {
    slug: "teams",
    eyebrow: "For Teams",
    title: "Standardize agent work across your team.",
    description:
      "Codebolt Team Version runs on Codebolt Cloud with shared agents, skills, prompts, guardrails, and team-level visibility.",
    metaTitle: "Codebolt for Teams",
    metaDescription:
      "Codebolt Team Version helps software teams manage agents, share skills and prompts, apply company guardrails, and collaborate through Codebolt Cloud.",
    primaryCta: { label: "Set up Team Version", href: "/download/" },
    secondaryCta: { label: "Read the docs", href: "https://docs.codebolt.ai" },
    problem: {
      title: "Agent adoption breaks when every developer invents their own stack.",
      body:
        "Once multiple people use agents, the hard part becomes management: which agents are approved, which prompts work, what skills are shared, and what guardrails apply.",
      points: [
        "Every developer ends up with different prompts, tools, and agent behavior.",
        "Useful skills and workflows stay trapped on individual machines.",
        "Teams need shared controls without giving up Codebolt Cloud convenience."
      ]
    },
    fit: {
      title: "Team Version keeps Codebolt Cloud and adds team controls.",
      body:
        "Use Codebolt Cloud as the shared runtime while managing agents, skills, prompts, and company-level guardrails from one team surface.",
      capabilities: [
        { label: "Agent management", text: "Standardize approved agents and workflows across the team." },
        { label: "Skill sharing", text: "Share reusable skills, prompts, and process templates." },
        { label: "Team guardrails", text: "Apply company rules around tools, environments, and workflow boundaries." },
        { label: "Cloud collaboration", text: "Use shared workspaces, managed sandboxes, and team visibility." }
      ]
    },
    workflow: [
      { step: "01", title: "Create the team", text: "Set up Codebolt Cloud for the people and repos that will use agents." },
      { step: "02", title: "Publish shared agents", text: "Make approved agents, prompts, and skills available to the team." },
      { step: "03", title: "Set guardrails", text: "Define company rules for tool use, review, and execution boundaries." },
      { step: "04", title: "Scale repeatable work", text: "Let teams reuse workflows instead of re-prompting from scratch." }
    ],
    proof: [
      "Best for engineering teams adopting agents across multiple developers.",
      "Keeps Codebolt Cloud as the substrate while adding team governance."
    ],
    related: ["developers", "enterprise", "product-builders"]
  },
  {
    slug: "enterprise",
    eyebrow: "For Enterprise",
    title: "Run Codebolt inside your private environment.",
    description:
      "Enterprise Codebolt is for organizations that need private deployment, enterprise guardrails, auditability, and integration with internal infrastructure.",
    metaTitle: "Codebolt for Enterprise",
    metaDescription:
      "Deploy Codebolt on prem or in private enterprise infrastructure with guardrails, auditability, internal integrations, and governed coding-agent workflows.",
    primaryCta: { label: "Plan private deployment", href: "https://docs.codebolt.ai" },
    secondaryCta: { label: "Compare team version", href: "/for/teams/" },
    problem: {
      title: "Enterprise agent adoption has to fit your boundaries.",
      body:
        "Large organizations need coding agents to run inside existing infrastructure, security controls, audit processes, and data boundaries.",
      points: [
        "Sensitive code and workflows may not be allowed to run through shared cloud services.",
        "Agent use needs governance, audit logs, and revocable permissions.",
        "Internal tools and environments need first-class integration."
      ]
    },
    fit: {
      title: "Enterprise Version moves the runtime into your infrastructure.",
      body:
        "The difference from Team Version is deployment control: Team Version uses Codebolt Cloud, while Enterprise can run in your own enterprise environment.",
      capabilities: [
        { label: "On-prem deployment", text: "Run Codebolt where your security and infrastructure teams need it." },
        { label: "Private integrations", text: "Connect internal systems, repos, sandboxes, and approval workflows." },
        { label: "Enterprise guardrails", text: "Apply organization-wide policy, permissions, and blast-radius controls." },
        { label: "Auditability", text: "Track agent activity, model context, file changes, and approvals." }
      ]
    },
    workflow: [
      { step: "01", title: "Map deployment boundaries", text: "Choose the private environment and systems Codebolt must operate within." },
      { step: "02", title: "Connect internal tools", text: "Wire repos, CI, ticketing, sandboxes, and company systems." },
      { step: "03", title: "Apply governance", text: "Set guardrails, permissions, approval paths, and audit requirements." },
      { step: "04", title: "Roll out safely", text: "Expand agent usage with visibility and policy from day one." }
    ],
    proof: [
      "Best for regulated teams, private codebases, and organizations with strict deployment requirements.",
      "Keeps the Codebolt runtime while changing the deployment boundary."
    ],
    related: ["teams", "embedded-products", "developers"]
  },
  {
    slug: "product-builders",
    eyebrow: "For Product Builders",
    title: "Launch agent-native products on the Codebolt engine.",
    description:
      "Build products on top of the Codebolt engine so tools, context, coordination, guardrails, and verification are already handled.",
    metaTitle: "Codebolt for Product Builders",
    metaDescription:
      "Use the Codebolt engine to build agent-native products without rebuilding tool orchestration, context, guardrails, verification, and environment coordination.",
    primaryCta: { label: "Choose your build path", href: "/for/plugin-builders/" },
    secondaryCta: { label: "Embed headless server", href: "/for/embedded-products/" },
    problem: {
      title: "Most agent products spend too much time rebuilding infrastructure.",
      body:
        "The valuable part of your product is the workflow and user experience. The expensive part is the engine underneath: tools, context, coordination, permissions, sandboxes, provenance, and review loops.",
      points: [
        "Agent products need the same hard infrastructure repeatedly.",
        "Building a separate app creates adoption friction when the workflow could live inside Codebolt.",
        "Embedding agents into another product requires a headless runtime, not another UI."
      ]
    },
    fit: {
      title: "Codebolt gives builders two ways to ship.",
      body:
        "Build a Codebolt-native plugin when your product can live inside Codebolt, or use a headless Codebolt server when your own application needs the engine behind the scenes.",
      capabilities: [
        { label: "Plugin path", text: "Ship a product inside Codebolt so users do not install another app." },
        { label: "Headless path", text: "Run Codebolt server behind your own product and connect through APIs/SDKs." },
        { label: "Runtime leverage", text: "Reuse coordination, tools, context, guardrails, and verification." },
        { label: "Product focus", text: "Spend effort on domain workflow instead of generic agent infrastructure." }
      ]
    },
    workflow: [
      { step: "01", title: "Pick the product boundary", text: "Decide whether your product should live inside Codebolt or inside your own app." },
      { step: "02", title: "Use the engine", text: "Let Codebolt own agent runtime, tools, context, and coordination." },
      { step: "03", title: "Build the workflow", text: "Design the domain-specific process, UI, and business logic." },
      { step: "04", title: "Ship with less substrate", text: "Launch without rebuilding the same agent infrastructure everyone needs." }
    ],
    proof: [
      "Best for founders and teams building agent-native developer tools or workflow products.",
      "Start with a plugin when distribution inside Codebolt is enough; use headless when you need your own application surface."
    ],
    related: ["plugin-builders", "embedded-products", "teams"]
  },
  {
    slug: "plugin-builders",
    eyebrow: "For Plugin Builders",
    title: "Sell a workflow inside the Codebolt workspace.",
    description:
      "Package your workflow as a Codebolt plugin so users can buy and use it inside the workspace where their agents already run.",
    metaTitle: "Codebolt for Plugin Builders",
    metaDescription:
      "Build and sell Codebolt plugins that run inside the Codebolt workspace with access to the engine, agents, tools, and runtime context.",
    primaryCta: { label: "Create a plugin", href: "https://docs.codebolt.ai" },
    secondaryCta: { label: "See product-builder paths", href: "/for/product-builders/" },
    problem: {
      title: "Some products should not ask users to install another app.",
      body:
        "If your product is a workflow that belongs next to code, agents, files, terminal, browser, and review loops, it may be better as a Codebolt plugin.",
      points: [
        "A separate app creates context switching and integration work.",
        "Users already need the Codebolt runtime for agent execution.",
        "The product can be distributed as a plugin instead of a standalone tool."
      ]
    },
    fit: {
      title: "Your plugin can be the product.",
      body:
        "Build a sellable Codebolt plugin that runs inside the workspace and inherits the engine underneath: agents, tools, context, permissions, and coordination.",
      capabilities: [
        { label: "Native placement", text: "Put the workflow where users already run coding agents." },
        { label: "Runtime access", text: "Use Codebolt tools, context, agents, and workflow state." },
        { label: "Lower adoption friction", text: "No separate desktop app or web app for users to adopt." },
        { label: "Productized workflow", text: "Package a domain workflow as a plugin users can install." }
      ]
    },
    workflow: [
      { step: "01", title: "Define the plugin job", text: "Pick the workflow your plugin owns inside the Codebolt workspace." },
      { step: "02", title: "Use Codebolt runtime APIs", text: "Call into the engine rather than rebuilding tool and agent orchestration." },
      { step: "03", title: "Add UI where needed", text: "Expose panels, commands, or workflow controls inside Codebolt." },
      { step: "04", title: "Package and sell", text: "Distribute the plugin as the product." }
    ],
    proof: [
      "Best when the user experience belongs inside Codebolt.",
      "Useful for domain workflows, integrations, review tools, and agent-native operations."
    ],
    related: ["product-builders", "embedded-products", "developers"]
  },
  {
    slug: "embedded-products",
    eyebrow: "For Embedded Products",
    title: "Put Codebolt's engine behind your own product.",
    description:
      "Use a headless Codebolt server when you want your own product surface but do not want to build the agent engine yourself.",
    metaTitle: "Codebolt for Embedded Products",
    metaDescription:
      "Use headless Codebolt server to embed Codebolt's agent engine inside your own application with APIs, SDKs, coordination, tools, and runtime controls.",
    primaryCta: { label: "Use the headless server", href: "https://docs.codebolt.ai" },
    secondaryCta: { label: "Compare plugin path", href: "/for/plugin-builders/" },
    problem: {
      title: "Your product needs its own UX, not its own agent substrate.",
      body:
        "Some products need to live as a separate app. The mistake is rebuilding the entire agent runtime behind that app when Codebolt can run headless.",
      points: [
        "You need your own brand, UI, and product workflow.",
        "You still need tools, context, permissions, coordination, and verification.",
        "Building the substrate delays the product users actually see."
      ]
    },
    fit: {
      title: "Headless Codebolt is the engine behind your product.",
      body:
        "Run Codebolt server behind your application and connect through APIs or SDKs. Your app owns the experience; Codebolt owns the heavy runtime layer.",
      capabilities: [
        { label: "Headless server", text: "Run the engine without forcing users into the Codebolt UI." },
        { label: "API connection", text: "Connect your application to Codebolt runtime capabilities." },
        { label: "Agent substrate", text: "Reuse tools, context, environments, guardrails, and coordination." },
        { label: "Own the UX", text: "Keep your product surface while avoiding engine rebuild." }
      ]
    },
    workflow: [
      { step: "01", title: "Run Codebolt server", text: "Deploy the headless engine where your product can reach it." },
      { step: "02", title: "Connect your app", text: "Use APIs or SDKs to invoke workflows, agents, and runtime capabilities." },
      { step: "03", title: "Keep your interface", text: "Your product owns screens, users, billing, and domain-specific workflows." },
      { step: "04", title: "Let Codebolt carry the engine", text: "The server handles the agent infrastructure underneath." }
    ],
    proof: [
      "Best when your product must be a separate app.",
      "Useful for agent-native SaaS, internal platforms, vertical tools, and developer products."
    ],
    related: ["product-builders", "plugin-builders", "enterprise"]
  }
];

export const audienceIndex = {
  title: "Find the right Codebolt path.",
  description:
    "Launch with the Codebolt offer built for your role: individual development, team rollout, private enterprise deployment, or products built on the Codebolt engine.",
  groups: [
    {
      label: "Use Codebolt",
      pages: ["developers", "teams", "enterprise"]
    },
    {
      label: "Build on Codebolt",
      pages: ["product-builders", "plugin-builders", "embedded-products"]
    }
  ]
};

export function getAudiencePage(slug: string) {
  return audiencePages.find((page) => page.slug === slug);
}
