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
data/search-index.json      Searchable page summaries and destinations
src/pages/                  Individual platform pages
docs/                       Product, design and architecture notes
```

The old `src/index.html` path redirects to the root homepage. Page files remain in `src/pages/`; the root `index.html` is the entry point for static hosting.

## Main sections

- **About and portfolio:** Khethi’s introduction and actual work. KIT is currently the only project listed.
- **Learn and resources:** Four learning pathways, a small set of free primary-source references, course-selection notes and quick cheatsheets.
- **Plug Hub:** Separate Micro1 referral routes for businesses and individuals. The page discloses the referral relationship and avoids promising compensation or acceptance.
- **Read and grow:** A build note and a student opportunity checklist. Funding dates and eligibility are linked to official providers rather than copied into KIT.
- **Future services:** Digital products and one-on-one support are clearly marked unavailable until there is a real offer and working flow.

## Updating the site

### Add a portfolio project

Edit `src/pages/portfolio/index.html`. Add a project card with its real status, your contribution, tools used and working links. Do not add a demo or repository link until it exists. Add or update a matching entry in `data/search-index.json` so the global search can find it.

### Add a learning resource

Add a resource card in `src/pages/resources/index.html`. Use a direct publisher or official documentation link, include a short description, and set `data-category` to one of the existing filters (`web`, `tools`, `security` or `data`). Update `data/search-index.json` if the resource deserves a global result.

### Add or update an opportunity

Edit the Plug Hub cards in `src/pages/plug-hub/plug-hub.html`. Link to the provider’s official destination, describe the intended audience, and state eligibility, location, compensation and deadlines only when you can verify them. Record a last-checked date; remove or mark a listing when it is no longer available. Update the Plug Hub entries in `data/search-index.json` when the audience or destination changes.

### Add a referral programme

Use the exact referral destination and tracking parameters supplied by the programme owner. Keep the destination paired with its intended audience, use `target="_blank"` with `rel="noopener noreferrer"` for new tabs, and add a clear disclosure next to the link. Never publish private credentials or imply that a referral guarantees acceptance, work or payment. Update the page and search index together.

### Add a page

Copy the shared page shell from an existing `src/pages/.../index.html` file, update its title and meta description, set the current navigation item, and add its destination to `data/search-index.json`. The shared assets are at the repository root, so nested pages use `../../../` to reach them.

## Quality checks

There is no package manager or test framework configured. For a manual check, serve the site as above and review the homepage and each page at desktop and mobile widths. Check navigation, search, theme persistence, the profile card with keyboard and touch, local filters and both referral destinations. Also inspect the browser console and verify internal links and image loading.

## Current limits

- No production hosting domain or Pages configuration is recorded, so canonical URLs and a fully qualified XML sitemap are not configured.
- There is no backend, CMS, user account, analytics, contact form, payments, booking system or automated opportunity verification.
- KIT has not recorded a last-checked date for Micro1 programme details; the provider controls terms and availability.
- The supplied JPEG is preserved at `assets/images/khethi.jpg`; the site displays a 1200px WebP version at `assets/images/khethi.webp` to reduce image transfer size.
- The portfolio contains only the KIT website until additional real projects are supplied.
