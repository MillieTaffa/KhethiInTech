# Technical Debt

## Khethi in Tech

This document tracks known technical shortcuts, temporary implementations, architectural compromises, and areas that should be improved as the project matures.

Technical debt should be documented when it is intentionally accepted rather than silently forgotten.

---

# 1. Current Technical Debt

## TD-001: Initial Deployment Configuration

**Status:** Open

**Priority:** Medium

**Description:**

The project does not yet have a finalized production deployment architecture.

**Current approach:**

Deployment documentation describes the intended process without being tied to a specific production provider.

**Future improvement:**

Document and automate the final production deployment process once the hosting provider has been selected.

---

## TD-002: Automated Testing

**Status:** Open

**Priority:** High

**Description:**

The project structure includes a `tests/` directory, but automated tests have not yet been implemented.

**Future improvement:**

Introduce automated testing for important functionality and reusable components.

Potential areas include:

* Navigation.
* Theme switching.
* Forms.
* Content rendering.
* Interactive components.
* Utility functions.

---

## TD-003: CI/CD

**Status:** Open

**Priority:** Medium

**Description:**

The project contains GitHub workflow configuration but does not yet have a complete continuous integration and deployment pipeline.

**Future improvement:**

Introduce automated checks for:

* Builds.
* Tests.
* Linting.
* Formatting.
* Deployment readiness.

---

## TD-004: Performance Optimisation

**Status:** Open

**Priority:** Medium

**Description:**

Performance optimisation will be performed after the initial implementation rather than prematurely optimising individual components.

**Future improvement:**

Measure real performance and optimise based on evidence.

Potential areas include:

* Image optimisation.
* Lazy loading.
* JavaScript bundle size.
* CSS size.
* Font loading.
* Caching.
* Core Web Vitals.

---

## TD-005: Content Architecture

**Status:** Open

**Priority:** Medium

**Description:**

The final architecture for storing and managing blog posts, resources, cheatsheets, and digital products has not yet been finalised.

**Future improvement:**

Evaluate whether content should remain static, use structured data files, or eventually move to a CMS or backend.

---

## TD-006: SEO Automation

**Status:** Open

**Priority:** Medium

**Description:**

SEO requirements have been identified, but automated metadata generation, structured data, and content optimisation have not yet been implemented.

**Future improvement:**

Introduce reusable SEO functionality for pages and content.

---

# 2. Future Technical Debt

The following areas may become technical debt as the platform grows:

* Content management.
* Search functionality.
* Analytics.
* Authentication.
* Payment processing.
* Digital product delivery.
* Email automation.
* Database architecture.
* API integrations.
* Accessibility testing automation.
* Security scanning.
* Dependency management.
* Image processing.
* Caching.
* Internationalisation.

These should only be implemented when the project's requirements justify their complexity.

---

# 3. Debt Management Rules

Technical debt should be:

1. Identified.
2. Documented.
3. Assigned a priority.
4. Added to the backlog where appropriate.
5. Revisited periodically.
6. Resolved when the cost of leaving it exceeds the cost of fixing it.

---

# 4. Priority Levels

## Critical

Creates a significant security, data integrity, or production reliability problem.

Should be addressed immediately.

## High

Significantly affects maintainability, functionality, accessibility, or performance.

Should be addressed soon.

## Medium

Creates noticeable technical limitations but does not currently block development.

Should be addressed during planned improvements.

## Low

Minor improvements that can be addressed when convenient.

---

# 5. Technical Debt Principle

Technical debt should be treated as a conscious engineering decision rather than an excuse for permanently poor implementation.

The goal is not to eliminate all technical debt.

The goal is to understand it, manage it, and prevent it from becoming invisible.