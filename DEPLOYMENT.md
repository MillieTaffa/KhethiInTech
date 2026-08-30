# Deployment Guide

## Khethi in Tech

This document describes how Khethi in Tech is prepared, tested, and deployed to a production environment.

The deployment process is designed to keep development and production environments separate and to make future deployments repeatable.

---

# 1. Deployment Strategy

Khethi in Tech will initially be deployed as a web application using a static hosting platform.

The project will be built locally and the production build will be generated before deployment.

```text
Local Development
       ↓
Git
       ↓
Build
       ↓
Test
       ↓
Production Build
       ↓
Deployment Platform
       ↓
Live Website
```

The deployment platform may change as the project develops.

---

# 2. Environments

The project should distinguish between development and production.

## Development

Used while building and testing the application.

```text
Purpose:
Development
Testing
Debugging
Experimentation
```

Development changes should not directly affect the live website.

## Production

The public version of Khethi in Tech.

```text
Purpose:
Public website
Visitors
Content
Products
Portfolio
Analytics
```

---

# 3. Prerequisites

Before deploying, ensure that:

* The project dependencies are installed.
* The application runs successfully locally.
* The production build completes successfully.
* No sensitive credentials are committed to Git.
* `.gitignore` is configured correctly.
* Required environment variables are available.
* Major functionality has been tested.
* The repository contains the latest intended changes.

---

# 4. Local Development

The application should first be tested in the local development environment.

Verify:

* Navigation.
* Responsive layouts.
* Theme switching.
* Buttons.
* Links.
* Forms.
* Blog pages.
* Resource pages.
* Portfolio pages.
* Product pages.
* Images.
* Typography.
* Accessibility.
* Mobile behaviour.

Development issues should be resolved before production deployment.

---

# 5. Production Build

Before deployment, create a production build using the project's configured build process.

The production build should:

* Compile the application.
* Process assets.
* Optimise production files.
* Generate deployable output.
* Report build errors.

A successful build does not automatically guarantee that the application works correctly.

The generated production build should therefore be tested before publishing.

---

# 6. Environment Variables

Sensitive configuration must not be committed to the repository.

Examples include:

* API keys.
* Authentication credentials.
* Database credentials.
* Private tokens.
* Payment credentials.
* Third-party service secrets.

Environment variables should be configured separately for development and production.

Example concept:

```text
Development
.env.local

Production
Hosting platform environment variables
```

Actual environment variable names and services should be documented when they are introduced.

---

# 7. Git Workflow

Development should occur through Git.

The recommended workflow is:

```text
Create/change feature
       ↓
Test locally
       ↓
Commit changes
       ↓
Push to repository
       ↓
Review
       ↓
Merge
       ↓
Deploy
```

Commit messages should follow the project's commit convention.

Examples:

```text
feat: add blog listing
fix: correct mobile navigation
docs: update deployment guide
style: improve hero section
refactor: simplify card component
```

---

# 8. Pre-Deployment Checklist

Before deploying, verify:

### Code

* [ ] Application builds successfully.
* [ ] No known critical errors exist.
* [ ] No debug code remains.
* [ ] No secrets are committed.
* [ ] Dependencies are functioning correctly.

### UI

* [ ] Mobile layout tested.
* [ ] Tablet layout tested.
* [ ] Desktop layout tested.
* [ ] Light theme tested.
* [ ] Dark theme tested.
* [ ] Navigation works.
* [ ] Links work.
* [ ] Forms work.
* [ ] Images load correctly.

### Accessibility

* [ ] Keyboard navigation works.
* [ ] Focus states are visible.
* [ ] Images have appropriate alternative text.
* [ ] Heading hierarchy is logical.
* [ ] Colour contrast is acceptable.
* [ ] Reduced-motion behaviour is considered.

### SEO

* [ ] Page titles exist.
* [ ] Meta descriptions exist where appropriate.
* [ ] Canonical URLs are configured where required.
* [ ] `robots.txt` is configured.
* [ ] `sitemap.xml` is generated and accessible.
* [ ] Important pages are discoverable.

### Production

* [ ] HTTPS is enabled.
* [ ] Custom domain is configured when applicable.
* [ ] Production environment variables are configured.
* [ ] Analytics are configured when applicable.
* [ ] The live website has been tested.

---

# 9. Deployment

The exact deployment procedure will depend on the hosting provider selected for production.

The deployment platform should support:

* HTTPS.
* Custom domains.
* Automatic or manual deployments.
* Environment variables.
* Production builds.
* Rollbacks or previous deployments where available.

The final provider and exact configuration will be documented once selected.

---

# 10. Custom Domain

When a custom domain is connected, DNS records must be configured according to the hosting provider's requirements.

The domain configuration should be documented once the production domain is selected.

The production domain should use HTTPS.

---

# 11. Post-Deployment Verification

After deployment, the live website should be tested.

Verify:

```text
Homepage
Navigation
Pages
Images
Links
Forms
Theme toggle
Responsive layout
SEO
Analytics
Performance
```

Test the website on multiple screen sizes and, where practical, multiple browsers.

---

# 12. Deployment Failures

If deployment fails:

1. Check the deployment logs.
2. Identify the failing build step.
3. Reproduce the issue locally where possible.
4. Fix the issue.
5. Test the fix.
6. Commit the change.
7. Deploy again.

Do not repeatedly deploy without understanding the cause of the failure.

---

# 13. Rollback Strategy

If a production deployment introduces a serious problem, the previous stable version should be restored where the hosting platform supports rollback functionality.

The incident should then be investigated before another production deployment.

---

# 14. Continuous Deployment

Automatic deployment may be introduced later.

A potential future workflow is:

```text
Git Push
   ↓
CI checks
   ↓
Build
   ↓
Tests
   ↓
Deployment
   ↓
Live Website
```

Continuous deployment should only be enabled once the project's build and testing process is reliable.

---

# 15. Deployment Documentation

Whenever the deployment architecture changes, this document should be updated.

Changes that may require documentation include:

* Hosting provider changes.
* Domain changes.
* Build configuration changes.
* Environment variable changes.
* CI/CD implementation.
* Database integration.
* Authentication.
* Payment integration.
* Third-party services.

---

# 16. Current Status

**Status:** Pre-production

The project is currently under development.

The production hosting provider, custom domain configuration, and final deployment pipeline will be documented once implemented.

---

# 17. Future Deployment Architecture

The expected long-term deployment architecture may evolve toward:

```text
Developer
    ↓
Git Repository
    ↓
Continuous Integration
    ↓
Automated Tests
    ↓
Production Build
    ↓
Hosting Platform
    ↓
Khethi in Tech
    ↓
Users
```

The architecture should remain as simple as possible until additional infrastructure is justified.