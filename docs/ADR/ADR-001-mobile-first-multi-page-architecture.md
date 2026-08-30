# ADR-001: Mobile-First Multi-Page Architecture

## Status

Accepted

## Date

2026-08-30

---

## Context

Khethi in Tech is intended to become a public technology education and personal development platform containing multiple distinct content areas.

These areas include:

* Blog content.
* Technical cheatsheets.
* Free resources.
* Course recommendations.
* Portfolio projects.
* Educational advice.
* Digital products.
* One-on-one services.
* Personal and career content.

The platform is expected to serve users across mobile devices, tablets, and desktop computers.

The project also requires a strong foundation for accessibility, search engine optimisation, maintainability, performance, and future expansion.

---

## Decision

Khethi in Tech will initially use a **mobile-first, multi-page architecture**.

The interface will be designed for smaller screens first and progressively enhanced for larger screens.

Each major area of the platform will have a clearly defined page or content structure.

Shared elements such as navigation, footer, theme behaviour, buttons, cards, and other reusable interface patterns will be implemented consistently across the platform.

---

## Alternatives Considered

### Single-Page Application

A single-page application architecture was considered.

It was not selected for the initial version because the primary purpose of Khethi in Tech is content delivery, education, personal documentation, and portfolio presentation.

The initial requirements do not justify introducing additional application complexity solely for client-side navigation.

A more application-heavy architecture may be introduced in the future if requirements such as authentication, personalised learning, interactive tools, or complex user workflows justify it.

---

### Desktop-First Design

A desktop-first design approach was considered.

It was rejected because mobile users are an important audience for the platform.

Designing for smaller screens first forces the interface to prioritise essential content and interactions before progressively expanding the experience for larger displays.

---

### Monolithic Page Structure

A structure where pages independently duplicate shared elements was considered.

It was rejected because duplication would increase maintenance costs and create opportunities for inconsistent navigation, styling, and behaviour.

Reusable structures will therefore be preferred.

---

## Consequences

### Positive Consequences

* Strong mobile experience.
* Clear separation between major content areas.
* Better maintainability through reusable structures.
* Clear content hierarchy.
* Strong foundation for SEO.
* Straightforward initial architecture.
* Easier documentation.
* Reduced unnecessary complexity.

### Negative Consequences

* Shared components must be deliberately organised.
* Multiple pages may require additional coordination.
* More advanced interactive functionality may eventually require a more application-oriented architecture.
* The architecture may evolve as platform requirements increase.

---

## Review Conditions

This decision should be reconsidered if the platform introduces substantial functionality requiring:

* Authentication.
* User accounts.
* Personalised dashboards.
* Complex application state.
* Real-time functionality.
* Advanced interactive learning tools.
* Significant user-generated content.

The architecture should evolve when the requirements justify that complexity rather than introducing it prematurely.