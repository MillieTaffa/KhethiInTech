# Khethi in Tech

**Learning. Building. Teaching.**

Khethi in Tech (KIT) is a personal technology platform for documenting Khethi’s learning journey and helping visitors find practical ways to learn, build and discover opportunities.

The site is a lightweight static website built with HTML, CSS and JavaScript. It has no framework, backend, account system, payment flow or live opportunity feed.

## Run it locally

From the repository root, start Python’s built-in web server:

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000/>. Serve the site over HTTP so global search can load `data/search-index.json`; opening the HTML directly as a `file://` URL disables that fetch.

## Project map

```text
index.html                  Homepage and static-site entry point
assets/images/              Khethi’s portrait and KIT favicon
css/main.css                Shared themes, layout and components
js/main.js                  Theme, navigation, search and filters
data/courses.json           Curated course records
data/resources.json         Curated free resource records
data/opportunities.json     Shared Plug Hub and competition records
data/search-index.json       Searchable page summaries and destinations
scripts/build-catalogs.py   Render listing cards and rebuild global search
src/pages/                  Individual platform pages
docs/                       Product, design and architecture notes
```

The old `src/index.html` path redirects to the root homepage. Page files remain in `src/pages/`; the root `index.html` is the entry point for static hosting.

## Main sections

- **About and portfolio:** Khethi’s introduction and actual work. KIT is currently the only project listed.
- **Student Hub:** A ten-section dashboard for courses, resources, training, work, funding, competitions, student support and a private browser-based application tracker.
- **Courses and resources:** Searchable, filterable directories with free access, certificate, difficulty and topic details.
- **Flex Your Code:** Beginner guidance and dated, free-entry competition listings, with expired events moved to an archive.
- **Plug Hub:** A broader set of training, work, funding and student-support leads. Micro1’s current programme pages are listed separately for individuals and businesses; the supplied tracking URLs returned 404 and are not used as active application buttons until replaced.
- **Future services:** Digital products and one-on-one support are clearly marked unavailable until there is a real offer and working flow.

## Updating the site

### Add a portfolio project

Edit `src/pages/portfolio/index.html`. Add a project card with its real status, your contribution, tools used and working links. Do not add a demo or repository link until it exists. Add or update a matching entry in `data/search-index.json` so the global search can find it.

### Add a course, resource or opportunity

Edit the matching source file in `data/`: `courses.json`, `resources.json` or `opportunities.json`. Include a direct official URL, a stable unique ID and a `checkedAt` date. Record free access, certificates, eligibility, deadlines, location, participant pay, prizes and referrals separately. Use “not specified” or `null` where the provider does not publish a detail; never infer it.

After editing, run:

```bash
python3 scripts/build-catalogs.py
```

This generates the static cards and updates the global search index. Review the generated diff. The full manual review and expiry workflow is in [data/EDITORIAL-WORKFLOW.md](data/EDITORIAL-WORKFLOW.md).

### Add a page

Copy the shared page shell from an existing `src/pages/.../index.html` file, update its title and meta description, set the current navigation item, and add its destination to `data/search-index.json`. The shared assets are at the repository root, so nested pages use `../../../` to reach them.

## Quality checks

There is no package manager or test framework configured. The catalog generator can be run with Python 3. For browser checks, serve the site as above and review the homepage and each page at desktop and mobile widths. Check navigation, search, theme persistence, profile interaction, filters, the browser-only tracker and referral destinations. Inspect the browser console and verify internal links and image loading.

## Current limits

- No production hosting domain or Pages configuration is recorded, so canonical URLs and a fully qualified XML sitemap are not configured.
- There is no backend, CMS, user account, analytics, contact form, payments, booking system, scheduled review or automated opportunity verification. Listings are curated manually; open opportunities should be rechecked before applying.
- The application tracker uses browser local storage and does not sync to KIT or other devices.
- The competition list, 2027 intake status and NSFAS deadline are time-sensitive; official sources currently conflict on some dates. See the editorial workflow before publishing or applying.
- The supplied JPEG is preserved at `assets/images/khethi.jpg`; the site displays a 1200px WebP version at `assets/images/khethi.webp` to reduce image transfer size.
- The portfolio contains only the KIT website until additional real projects are supplied.
