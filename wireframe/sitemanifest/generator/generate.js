#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Helpers ---

// Directories/files to skip when copying the template
const SKIP_COPY = new Set(['node_modules', '.astro', 'dist', '.cache']);

function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (SKIP_COPY.has(entry.name)) continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function kebabToPascal(str) {
  return str.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

// Map section type names to component file names
const TYPE_TO_COMPONENT = {
  'hero': 'Hero',
  'page-header': 'PageHeader',
  'centered-text': 'CenteredText',
  'comparison-columns': 'ComparisonColumns',
  'card-grid': 'CardGrid',
  'feature-block': 'FeatureBlock',
  'diagram-section': 'DiagramSection',
  'blockquote': 'BlockquoteSection',
  'persona-grid': 'PersonaGrid',
  'pricing-grid': 'PricingGrid',
  'blog-grid': 'BlogGrid',
  'accordion': 'Accordion',
  'value-list': 'ValueList',
  'two-column-text': 'TwoColumnText',
  'role-list': 'RoleList',
  'timeline': 'Timeline',
  'cta-block': 'CtaBlock',
  'quote-block': 'QuoteBlock',
  'two-column-section': 'TwoColumnSection',
  'stat-grid': 'StatGrid',
  'icon-grid': 'IconGrid',
  'section-header': 'SectionHeader',
  'highlight-banner': 'HighlightBanner',
  'section-shell': 'SectionShell',
  'three-column-grid': 'ThreeColumnGrid',
  'kicker': 'Kicker',
  'status-badge': 'StatusBadge',
  'metric-bar': 'MetricBar',
  'metric-display': 'MetricDisplay',
  'metric-strip': 'MetricStrip',
  'layer-row': 'LayerRow',
  'diagram-panel': 'DiagramPanel',
  'cta-button': 'CTAButton',
  'protocol-card': 'ProtocolCard',
  'step-card': 'StepCard',
  'tier-card': 'TierCard',
  'topo-card': 'TopoCard',
  'feature-card': 'FeatureCard',
  'comparison-grid': 'ComparisonGrid',
  'comparison-table': 'ComparisonTable',
  'progression-strip': 'ProgressionStrip',
  'connectivity-grid': 'ConnectivityGrid',
  'bento-grid': 'BentoGrid',
  'showcase-strip': 'ShowcaseStrip',
  'feature-showcase': 'FeatureShowcase',
  'start-tabs': 'StartTabs',
  'engine-architecture-diagram': 'EngineArchitectureDiagram',
  'structure-diagram': 'StructureDiagram',
  'subsystem-diagram': 'SubsystemDiagram',
  'tool-registry': 'ToolRegistry',
};

function getComponentName(sectionType) {
  return TYPE_TO_COMPONENT[sectionType] || kebabToPascal(sectionType);
}

function serializeProp(key, value) {
  if (typeof value === 'string') {
    // If string contains quotes or HTML, use JSX expression with backticks
    if (value.includes('"') || value.includes('<') || value.includes('{')) {
      const escaped = value.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
      return `${key}={\`${escaped}\`}`;
    }
    return `${key}="${value}"`;
  }
  if (typeof value === 'boolean') {
    return value ? `${key}={true}` : `${key}={false}`;
  }
  if (typeof value === 'number') {
    return `${key}={${value}}`;
  }
  // Arrays and objects: serialize as JSON
  return `${key}={${JSON.stringify(value)}}`;
}

function generateSiteData(config) {
  const siteObj = {
    name: config.site.name,
    tagline: config.site.tagline,
    logo: config.site.logo,
  };

  return `// Auto-generated from site.yaml — do not edit directly
export const site = ${JSON.stringify(siteObj, null, 2)};

export const navigation = ${JSON.stringify(config.navigation, null, 2)};
`;
}

function generatePage(page, config) {
  const sections = page.sections || [];
  const usedComponents = new Set();

  for (const section of sections) {
    const comp = getComponentName(section.type);
    usedComponents.add(comp);
  }

  // Calculate relative import prefix based on slug depth
  const slug = page.slug === '' || page.slug === undefined ? 'index' : page.slug;
  const depth = slug.split('/').length; // "formats/cli" = 2, "index" = 1
  const prefix = '../'.repeat(depth);   // "../" for top-level, "../../" for nested

  // Build frontmatter
  let frontmatter = `// Auto-generated from site.yaml — edit site.yaml and regenerate
import BaseLayout from '${prefix}layouts/BaseLayout.astro';
import { site, navigation } from '${prefix}data/site-data.js';`;

  for (const comp of usedComponents) {
    frontmatter += `\nimport ${comp} from '${prefix}components/${comp}.astro';`;
  }

  // Build template body
  const navbarVariant = page.navbar_variant || 'solid';
  const title = page.title || config.site.name;

  let body = `<BaseLayout title="${title.replace(/"/g, '\\"')}" navbarVariant="${navbarVariant}" site={site} navigation={navigation}>`;

  for (const section of sections) {
    const comp = getComponentName(section.type);
    const props = { ...section };
    delete props.type;

    const propStrings = Object.entries(props)
      .map(([k, v]) => serializeProp(k, v))
      .join('\n    ');

    if (propStrings) {
      body += `\n  <${comp}\n    ${propStrings}\n  />`;
    } else {
      body += `\n  <${comp} />`;
    }
  }

  body += `\n</BaseLayout>`;

  return `---\n${frontmatter}\n---\n${body}\n`;
}

// --- Main ---

function main() {
  const version = process.argv[2] || `gen-${Date.now()}`;

  const yamlPath = path.join(__dirname, 'content', 'site.yaml');
  const templateDir = path.join(__dirname, 'template');
  const outputDir = path.join(__dirname, '..', 'output', version);

  // 1. Read YAML
  if (!fs.existsSync(yamlPath)) {
    console.error(`Error: ${yamlPath} not found`);
    process.exit(1);
  }

  const raw = fs.readFileSync(yamlPath, 'utf-8');
  const config = yaml.load(raw);

  // 2. Copy template → output (always copy to ensure template files are present)
  console.log(`Copying template → output/${version}/`);
  copyDirSync(templateDir, outputDir);

  // 3. Generate site-data.js
  const dataDir = path.join(outputDir, 'src', 'data');
  fs.mkdirSync(dataDir, { recursive: true });
  const siteDataContent = generateSiteData(config);
  fs.writeFileSync(path.join(dataDir, 'site-data.js'), siteDataContent);

  // 4. Generate pages
  const pagesDir = path.join(outputDir, 'src', 'pages');
  fs.mkdirSync(pagesDir, { recursive: true });

  const pages = config.pages || [];
  for (const page of pages) {
    const slug = page.slug === '' || page.slug === undefined ? 'index' : page.slug;
    const filename = `${slug}.astro`;
    const filePath = path.join(pagesDir, filename);
    // Ensure parent directory exists for nested slugs like "formats/cli"
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    const content = generatePage(page, config);
    fs.writeFileSync(filePath, content);
  }

  console.log(`Generated ${pages.length} pages in output/${version}/`);
  console.log(`Run: cd ../output/${version} && npm install && npm run dev`);
}

main();
