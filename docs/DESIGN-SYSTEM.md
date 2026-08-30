# Khethi in Tech: Design System

## 1. Overview

Khethi in Tech is a personal technology platform focused on:

> **Learning. Building. Teaching.**

The design system establishes the visual and interaction rules used throughout the platform.

The system is designed to create an experience that feels:

* Technical
* Modern
* Energetic
* Personal
* Approachable
* Educational
* Confident
* Playful
* Professional

The visual identity combines a minimal black-and-white foundation with a distinctive pink, magenta, purple, and red gradient system.

---

# 2. Brand Identity

## 2.1 Brand Name

**Khethi in Tech**

The name represents the creator's journey, experience, learning, projects, teaching, and growth within technology.

## 2.2 Tagline

> **Learning. Building. Teaching.**

The tagline communicates the three primary pillars of the platform.

### Learning

Documenting the process of becoming better at technology.

### Building

Creating software, projects, experiments, and products.

### Teaching

Turning lessons learned into useful resources for other people.

---

# 3. Brand Personality

Khethi in Tech should feel:

### Curious

The platform encourages exploration and continuous learning.

### Intelligent

Technical content should demonstrate knowledge without unnecessarily complicated language.

### Human

The platform documents the person behind the technology.

### Ambitious

The brand communicates growth, experimentation, and building toward bigger goals.

### Approachable

Beginners should feel welcome rather than intimidated.

### Playful

Technology can be serious without being visually sterile.

### Bold

The platform should have a recognisable visual identity rather than looking like a generic developer portfolio.

### Honest

The learning journey may include failures, mistakes, experiments, lessons, and improvements.

---

# 4. Visual Direction

The primary visual principle is:

> **Minimal foundation + expressive colour.**

Black and white form the structural foundation.

Pink, magenta, purple, and red provide energy and visual identity.

The colour system should be used intentionally.

The interface should not become saturated with gradients.

Gradients should guide attention toward important elements.

---

# 5. Logo and Wordmark

## Primary Wordmark

**Khethi in Tech**

The full wordmark should be used in:

* Website header.
* Homepage.
* Social profiles.
* Marketing materials.
* Major branding areas.

## Compact Mark

**KIT**

The compact mark may be used where space is limited, including:

* Favicons.
* Small navigation areas.
* Social profile images.
* Application icons.

## Logo Principles

The logo should remain readable in:

* Light mode.
* Dark mode.
* Monochrome.
* Small sizes.

The logo should not depend entirely on the gradient for recognition.

---

# 6. Colour System

## 6.1 Design Philosophy

The colour system consists of:

```text
Neutral foundation
        +
Pink
        +
Magenta
        +
Purple
        +
Small amount of red/orange
```

The gradient should feel inspired by modern social platforms while remaining distinct enough to represent Khethi in Tech.

---

# 7. Light Theme

## Base Colours

```text
Background
#FFFFFF

Surface
#F8F7FA

Surface Elevated
#FFFFFF

Primary Text
#111111

Secondary Text
#52525B

Muted Text
#71717A

Border
#E4E4E7

Subtle Border
#F0F0F2
```

## Accent Colours

```text
Pink
#FF2D95

Magenta
#E1306C

Purple
#833AB4

Deep Purple
#5B21B6

Red
#F43F5E

Orange Accent
#F97316
```

---

# 8. Dark Theme

## Base Colours

```text
Background
#09090B

Surface
#111114

Surface Elevated
#18181B

Primary Text
#FFFFFF

Secondary Text
#D4D4D8

Muted Text
#A1A1AA

Border
#27272A

Subtle Border
#1F1F23
```

## Accent Colours

The same accent colours should be used in dark mode.

The surrounding glow may be adjusted for contrast and visual balance.

---

# 9. Signature Gradient

The Khethi in Tech signature gradient should primarily transition through:

```text
Pink
   ↓
Magenta
   ↓
Purple
```

A small amount of red/orange may appear near the warmer end of the gradient.

### Gradient Direction

The gradient may generally flow diagonally.

Example conceptual direction:

```text
Pink
  ↘
    Magenta
        ↘
          Purple
```

The exact CSS implementation may vary by component.

---

# 10. Rainbow Glow

The rainbow glow is a decorative accent rather than a primary UI colour.

It may be used for:

* Hero elements.
* Primary calls to action.
* Interactive highlights.
* Cards.
* Borders.
* Decorative backgrounds.
* Active navigation.
* Hover states.
* Important links.

## Glow Intensity

### Subtle

Used for:

* Background decoration.
* Cards.
* Static elements.

### Medium

Used for:

* Hover states.
* Important interface elements.
* Selected elements.

### Strong

Used sparingly for:

* Hero content.
* Major calls to action.
* Special promotional sections.

If everything glows, nothing feels special.

---

# 11. Semantic Colours

Accent colours must not replace semantic status colours.

## Success

```text
#16A34A
```

## Warning

```text
#D97706
```

## Error

```text
#DC2626
```

## Information

```text
#2563EB
```

Semantic states should communicate meaning through more than colour alone.

For example:

```text
Icon + Text + Colour
```

rather than:

```text
Colour alone
```

---

# 12. Typography

## 12.1 Font System

### Heading Font

**Space Grotesk**

Used for:

* H1.
* H2.
* H3.
* H4.
* Major promotional text.
* Important headings.

### Body Font

**Inter**

Used for:

* Paragraphs.
* Navigation.
* Forms.
* Buttons.
* Supporting content.
* General interface text.

### Code Font

**JetBrains Mono**

Used for:

* Code.
* Terminal commands.
* Technical snippets.
* Keyboard shortcuts.
* Developer-specific interface elements.

---

# 13. Typography Hierarchy

The hierarchy should be visually clear.

```text
H1
Primary page heading

H2
Major section heading

H3
Subsection heading

H4
Minor section heading

Body
Primary reading text

Small
Supporting information

Caption
Metadata and secondary information

Code
Technical content
```

Typography should prioritise readability over decorative styling.

---

# 14. Typography Principles

Headings should be:

* Strong.
* Clear.
* Concise.
* Visually distinctive.

Body text should be:

* Comfortable to read.
* Appropriately spaced.
* Easy to scan.

Long paragraphs should be avoided where lists, headings, or shorter paragraphs would improve readability.

---

# 15. Spacing System

The spacing system uses a **4px base unit**.

```text
XS
4px

SM
8px

MD
16px

LG
24px

XL
32px

2XL
48px

3XL
64px

4XL
96px

5XL
128px
```

Spacing should be selected from the defined scale wherever practical.

Arbitrary spacing values should be avoided unless there is a clear design reason.

---

# 16. Border Radius

The interface should use moderately rounded shapes.

```text
Small
6px

Medium
10px

Large
16px

Extra Large
24px

Pill
9999px
```

Suggested usage:

```text
6px
Small controls

10px
Buttons, inputs, small cards

16px
Cards and panels

24px
Large feature sections

9999px
Pills and tags
```

---

# 17. Shadows

Shadows should remain subtle.

The design should rely primarily on:

* Contrast.
* Borders.
* Surface differences.
* Glow.

rather than heavy shadows.

Dark mode should use shadows sparingly because surface contrast is generally more effective.

---

# 18. Layout System

The website uses a mobile-first layout system.

The main content should be contained within a readable maximum width.

Large screens should use additional whitespace rather than allowing text to stretch indefinitely.

---

# 19. Responsive Breakpoints

The project uses progressive enhancement.

```text
Mobile
< 640px

Tablet
640px+

Desktop
1024px+

Large Desktop
1280px+

Wide Desktop
1536px+
```

These values are guidelines rather than rigid requirements.

Components should respond to available space rather than assuming a specific device.

---

# 20. Mobile-First Principles

The mobile experience should prioritise:

* Readability.
* Simple navigation.
* Large touch targets.
* Clear hierarchy.
* Minimal clutter.
* Fast loading.
* Easy scanning.

Desktop enhancements should build upon the mobile foundation.

---

# 21. Navigation

The navigation should provide access to the major sections of the platform.

Potential primary navigation:

```text
Home
Learn
Build
Earn
About
```

Secondary navigation may contain:

```text
Blog
Cheatsheets
Resources
Courses
Portfolio
Digital Products
One-on-One
Meet Millie
```

The exact navigation structure may evolve as the content grows.

---

# 22. Buttons

Buttons should have clear hierarchy.

## Primary

Used for the most important action on a page.

Examples:

```text
Read the Blog
View My Work
Get the Resource
Buy Now
Book a Session
```

Primary buttons may use the signature gradient.

## Secondary

Used for supporting actions.

Secondary buttons should have lower visual weight than primary buttons.

## Ghost

Used for low-priority actions.

## Danger

Used only for destructive actions.

---

# 23. Button States

All interactive buttons should define:

```text
Default
Hover
Focus
Active
Disabled
Loading
```

Focus states must remain clearly visible.

---

# 24. Links

Links should be visually distinguishable from ordinary text.

Links may use:

* Accent colour.
* Underlines.
* Hover transitions.
* Gradient effects for special branding contexts.

Important links should not rely only on hover behaviour because touch devices do not have hover.

---

# 25. Cards

Cards should be used to group related information.

Examples:

```text
Blog Card
Project Card
Course Card
Resource Card
Product Card
```

Cards should generally include:

* Clear hierarchy.
* Consistent spacing.
* Optional image.
* Title.
* Supporting description.
* Relevant metadata.
* Clear action.

---

# 26. Card States

Cards containing interactive elements should support:

```text
Default
Hover
Focus
Active
```

Hover effects should be subtle.

The card should remain usable without animation.

---

# 27. Forms

Forms should prioritise clarity and accessibility.

Form elements should include:

* Labels.
* Helpful descriptions where necessary.
* Clear input states.
* Error messages.
* Success messages.
* Visible focus states.

Inputs should support:

```text
Default
Focus
Filled
Error
Disabled
```

---

# 28. Theme Toggle

The website supports:

```text
Light
Dark
System
```

### Default behaviour

The website should respect the user's system preference when no manual preference has been selected.

### Manual selection

Users may manually select light or dark mode.

### Persistence

The user's manual preference should persist between visits where practical.

---

# 29. Accessibility

Accessibility is a core design requirement.

The interface should support:

* Semantic HTML.
* Keyboard navigation.
* Visible focus states.
* Accessible forms.
* Descriptive link text.
* Alternative text for meaningful images.
* Sufficient colour contrast.
* Reduced motion preferences.
* Logical heading hierarchy.
* Accessible touch targets.

---

# 30. Motion and Animation

Animations should support the experience rather than distract from content.

Preferred animation characteristics:

* Short.
* Smooth.
* Purposeful.
* Subtle.

Animation may be used for:

* Page transitions.
* Hover effects.
* Navigation.
* Cards.
* Gradient movement.
* Theme transitions.

Users who prefer reduced motion should receive a reduced-motion experience.

---

# 31. Imagery

Images should support the content.

Preferred imagery includes:

* Real photographs.
* Project screenshots.
* Code screenshots.
* Development environments.
* Technical diagrams.
* Original illustrations.
* Educational graphics.

The platform should avoid excessive use of generic stock photography.

---

# 32. Photography Direction

Photography should feel:

* Authentic.
* Bright.
* Personal.
* Modern.
* Confident.

Where photographs of the creator are used, they should reinforce the personal nature of the platform.

---

# 33. Iconography

Icons should be:

* Simple.
* Consistent.
* Recognisable.
* Accessible.

Icons should supplement text rather than replace essential information.

Icons should maintain a consistent visual weight throughout the interface.

---

# 34. Code Presentation

Code should use:

**JetBrains Mono**

Code blocks should visually separate technical content from normal text.

Code presentation should support:

* Horizontal scrolling where required.
* Readable spacing.
* Clear syntax highlighting.
* Copy functionality where appropriate.

---

# 35. Cheatsheet Design

Cheatsheets are designed for quick scanning.

They should prioritise:

```text
Concept
    ↓
Command / Shortcut
    ↓
Explanation
    ↓
Example
```

Information should be grouped into clear categories.

Keyboard shortcuts should use visually distinct key indicators where appropriate.

---

# 36. Blog Design

Blog pages should prioritise reading.

Each article should provide:

* Title.
* Description.
* Publication date.
* Category.
* Reading time where appropriate.
* Featured image where appropriate.
* Clear content hierarchy.
* Related content.

The reading width should remain comfortable on large screens.

---

# 37. Portfolio Design

Portfolio projects should communicate:

```text
Problem
    ↓
Solution
    ↓
Technology
    ↓
Implementation
    ↓
Result
    ↓
Lessons Learned
```

Each project should clearly communicate what was built and why.

---

# 38. Digital Product Design

Digital product pages should clearly communicate:

* Product name.
* Problem solved.
* Who it is for.
* What is included.
* Benefits.
* Preview.
* Price.
* Purchase action.

The purchasing experience should remain simple.

---

# 39. Content Hierarchy

Pages should generally follow:

```text
Page Title
     ↓
Introduction
     ↓
Primary Content
     ↓
Supporting Content
     ↓
Call to Action
```

Users should always have a clear understanding of:

1. Where they are.
2. What they are looking at.
3. Why it matters.
4. What they can do next.

---

# 40. Interaction Principles

Interactions should be:

* Predictable.
* Fast.
* Accessible.
* Consistent.
* Purposeful.

Avoid interactions that exist purely because an animation is technically possible.

---

# 41. Hover Effects

Hover effects may include:

* Slight elevation.
* Border glow.
* Gradient glow.
* Subtle translation.
* Colour changes.

Hover effects should never be necessary to understand or use the interface.

---

# 42. Focus States

Keyboard focus must always be visible.

Focus indicators should provide sufficient contrast against the surrounding interface.

The signature accent may be incorporated into focus styling where accessibility requirements are still satisfied.

---

# 43. Content Tone

The platform's content should generally be:

* Conversational.
* Clear.
* Encouraging.
* Honest.
* Educational.
* Practical.

Technical concepts should be explained in accessible language whenever the intended audience includes beginners.

---

# 44. Developer Identity

The platform should visibly communicate that it is built by a software engineer.

Developer identity may be expressed through:

* Code snippets.
* Terminal-inspired elements.
* Cheatsheets.
* Git references.
* Technical diagrams.
* Project architecture.
* Documentation.
* Development logs.

These elements should complement the design rather than dominate it.

---

# 45. Design Consistency

Before creating a new visual pattern, developers should first determine whether an existing component can be reused.

If a new recurring pattern is introduced, it should be considered for inclusion in this design system.

---

# 46. Design System Evolution

This document is a living document.

Design decisions may change as:

* User feedback is collected.
* Accessibility testing is performed.
* The platform grows.
* New content types are introduced.
* New functionality is developed.

Significant design changes should be documented through Git commits and, where appropriate, Architecture Decision Records.

---

# 47. Design Principle

The central design principle of Khethi in Tech is:

> **Technology should feel powerful without feeling intimidating.**

The interface should balance technical credibility with personality.

The black-and-white foundation communicates clarity and professionalism.

The pink, magenta, purple, and red glow communicates energy, creativity, and individuality.

Together, they create the visual identity of Khethi in Tech.
