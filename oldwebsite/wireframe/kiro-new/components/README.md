# Shared Components Documentation

This document describes the shared patterns and components used across all pages in the Codebolt marketing website wireframe.

## Overview

The wireframe uses consistent navigation and footer components across all 5 pages to ensure a unified user experience. These components are documented here as reference templates to be copied into each HTML file.

---

## Navigation Component

The navigation component appears at the top of every page and provides access to all main sections of the website.

### Structure

```html
<nav class="main-nav">
  <div class="logo">Codebolt</div>
  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="features.html">Features</a></li>
    <li><a href="use-cases.html">Use Cases</a></li>
    <li><a href="pricing.html">Pricing</a></li>
    <li><a href="about.html">About</a></li>
  </ul>
  <a href="#signup" class="cta-button">Get Early Access</a>
</nav>
```

### Requirements Addressed

- **Requirement 9.1**: Navigation includes links to all main pages (Home, Features, Use Cases, Pricing, About)
- **Requirement 9.2**: Navigation remains consistent and accessible on every page
- **Requirement 9.3**: Navigation includes a prominent CTA button for signup/early access

### Usage Notes

- The navigation must be **identical** across all pages to satisfy Property 5 (Page Consistency)
- Use semantic `<nav>` element for accessibility
- The CTA button should stand out as the primary action
- Active page can be indicated by adding an `aria-current="page"` attribute to the current page link

---

## Footer Component

The footer component appears at the bottom of every page and provides secondary navigation, company information, and contact details.

### Structure

```html
<footer>
  <div class="footer-nav">
    <div class="footer-section">
      <h4>Product</h4>
      <ul>
        <li><a href="features.html">Features</a></li>
        <li><a href="use-cases.html">Use Cases</a></li>
        <li><a href="pricing.html">Pricing</a></li>
      </ul>
    </div>
    <div class="footer-section">
      <h4>Company</h4>
      <ul>
        <li><a href="about.html">About</a></li>
        <li><a href="#careers">Careers</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
    <div class="footer-section">
      <h4>Resources</h4>
      <ul>
        <li><a href="#docs">Documentation</a></li>
        <li><a href="#blog">Blog</a></li>
        <li><a href="#community">Community</a></li>
      </ul>
    </div>
    <div class="footer-section">
      <h4>Connect</h4>
      <ul>
        <li><a href="#twitter">[Twitter/X]</a></li>
        <li><a href="#linkedin">[LinkedIn]</a></li>
        <li><a href="#github">[GitHub]</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2025 Codebolt. All rights reserved.</p>
    <p>Contact: <a href="mailto:hello@codebolt.ai">[hello@codebolt.ai]</a></p>
  </div>
</footer>
```

### Requirements Addressed

- **Requirement 9.4**: Page structure includes a consistent footer with secondary navigation and contact information
- **Requirement 13.4**: About page includes contact information and social links (footer provides this site-wide)

### Usage Notes

- The footer must be **identical** across all pages to satisfy Property 5 (Page Consistency)
- Use semantic `<footer>` element for accessibility
- Placeholder links (marked with `#`) will be updated when those pages/sections are created
- Social links are marked as placeholders with brackets `[...]`

---

## CTA (Call-to-Action) Component

CTA sections are used throughout the site to prompt user engagement. They appear after major content sections and as a final conversion point before the footer.

### Structure

```html
<section class="cta-section">
  <h2>[CTA Headline]</h2>
  <p>[Supporting text explaining the value of taking action]</p>
  <div class="cta-buttons">
    <a href="#signup" class="cta-primary">Get Early Access</a>
    <a href="#demo" class="cta-secondary">Watch Demo</a>
  </div>
</section>
```

### Requirements Addressed

- **Requirement 7.1**: Primary CTA in Hero Section
- **Requirement 7.2**: Contextual CTAs after major content sections
- **Requirement 7.3**: Final CTA section before footer
- **Requirement 7.4**: Action-oriented language in CTA elements
- **Requirement 7.5**: Both high-commitment (signup) and low-commitment (learn more) options

### Usage Notes

- Customize the headline and supporting text based on the preceding content section
- Always provide both primary (high-commitment) and secondary (low-commitment) options
- Use action-oriented language: "Get", "Start", "Try", "See", "Watch"

---

## Content Block Patterns

### Feature Block

Used on homepage (overview) and features page (detailed).

```html
<article class="feature-block">
  <div class="feature-icon">[Placeholder for icon/illustration]</div>
  <h3>[Feature Title]</h3>
  <p class="feature-description">[Feature description]</p>
  <p class="feature-benefit">[Benefit statement - what the user gains]</p>
  <a href="features.html#[feature-id]" class="learn-more">Learn more →</a>
</article>
```

### Persona Card

Used on homepage and use cases page.

```html
<article class="persona-card">
  <h3>[Persona Title]</h3>
  <p class="persona-role">[Role description]</p>
  <div class="persona-pain-points">
    <h4>Challenges</h4>
    <ul>
      <li>[Pain point 1]</li>
      <li>[Pain point 2]</li>
    </ul>
  </div>
  <div class="persona-benefits">
    <h4>With Codebolt</h4>
    <ul>
      <li>[Benefit 1]</li>
      <li>[Benefit 2]</li>
    </ul>
  </div>
  <a href="use-cases.html#[persona-id]" class="learn-more">See use cases →</a>
</article>
```

### Transformation Story

Used on homepage to show before/after scenarios.

```html
<article class="transformation-story">
  <h3>[Persona Name]</h3>
  <div class="before">
    <h4>Before Codebolt</h4>
    <blockquote>[Before quote describing pain]</blockquote>
  </div>
  <div class="after">
    <h4>After Codebolt</h4>
    <blockquote>[After quote describing transformation]</blockquote>
  </div>
  <div class="transformation-metrics">
    <span class="metric">[Quantifiable result]</span>
  </div>
</article>
```

### Pricing Tier

Used on pricing page.

```html
<article class="pricing-tier">
  <h3>[Tier Name]</h3>
  <p class="price">[Price placeholder]</p>
  <p class="tier-description">[Who this is for]</p>
  <ul class="tier-features">
    <li>[Feature 1]</li>
    <li>[Feature 2]</li>
    <li>[Feature 3]</li>
  </ul>
  <a href="#signup" class="cta-button">[CTA text]</a>
</article>
```

---

## Semantic HTML Guidelines

All pages must follow these semantic HTML practices:

1. **Heading Hierarchy**: Use proper heading levels (h1 > h2 > h3) without skipping levels
2. **Semantic Elements**: Use `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`, `<main>` appropriately
3. **Accessibility**: Include ARIA landmarks through semantic elements
4. **No Fixed Widths**: Avoid inline styles with fixed pixel widths to support responsive layouts
5. **Placeholder Marking**: Use brackets `[...]` to clearly indicate placeholder content

---

## Page Structure Template

Every page should follow this basic structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Page Title] - Codebolt</title>
    <meta name="description" content="[Page description for SEO]">
</head>
<body>
    <!-- Navigation Component -->
    <nav class="main-nav">...</nav>
    
    <main>
        <!-- Page-specific content sections -->
    </main>
    
    <!-- Footer Component -->
    <footer>...</footer>
</body>
</html>
```

---

## Files in This Wireframe

| File | Purpose |
|------|---------|
| `index.html` | Homepage - Hero, value props, features overview, social proof |
| `features.html` | Features deep dive - Detailed feature breakdown by category |
| `use-cases.html` | Use cases by persona - Scenario-based content |
| `pricing.html` | Pricing tiers - Plans, comparison, FAQ |
| `about.html` | About company - Mission, team, contact |
| `components/README.md` | This documentation file |
