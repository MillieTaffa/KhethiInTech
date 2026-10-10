# KIT listing editorial workflow

`courses.json`, `resources.json` and `opportunities.json` are the editable data sources for the course library, free resource library, Plug Hub and Flex Your Code. `scripts/build-catalogs.py` turns those records into static HTML cards and refreshes `data/search-index.json` so the pages can be hosted without a server-side application.

## Add or update a listing

1. Open the provider’s own course, programme, application or event page and its rules or terms where relevant.
2. Record the exact official destination, what is free, what may cost money, who can apply, the location, dates and any participant pay or prize terms. Keep participant compensation, stipend, prize and KIT referral commission in their separate fields.
3. Add a record to the matching JSON array. Use a stable lowercase `id`, a direct official `url` or `sourceUrl`, and a `checkedAt` date in `YYYY-MM-DD` format. Use `null` or a plain-language “not specified” note when the provider does not publish a fact; do not infer it.
4. For courses, preserve the distinction between `completely-free`, `limited-free` and `directory-free-option`. Record certificate terms, project access, account requirements and prerequisites. The library only includes entries with a free way to access the learning itself.
5. For resources, set `access` to `free` when the listed material is freely accessible and `limited-free` when use depends on free-tier limits, student eligibility or separately metered services. Set `level` to `beginner`, `intermediate`, `all-levels` or `student` as appropriate.
6. For opportunities, choose a specific `status`. Only use `open` when the official application page confirms that applications are currently open. A discovery portal is not an individual verified vacancy. For hackathons, verify free entry, rules, required tools, eligibility, deadlines and timezone before adding the record.
7. For referral links, use the destination supplied by the programme owner and retain its intended audience. Add a visible `referral.disclosure`; leave rate, qualifying action and payout unverified unless official terms confirm them. Do not promise a benefit or that it will not affect the visitor’s price without evidence.
8. Run `python3 scripts/build-catalogs.py`. It checks duplicate IDs and HTTPS destinations, generates the listing cards, and updates the global search index. Review the generated diff before publishing.

## Review and archive

This static site has no live provider API, CMS, scheduler or server-side verification. Its deadline labels are calculated in the visitor’s browser from the saved deadline, while `checkedAt` remains the manual review date. Expired competitions move to the archive; other dated listings remain visible with a closed status. Neither behavior rechecks a provider’s website.

Review open listings at least weekly and again before an approaching deadline. Reopen the official destination and terms, update `checkedAt`, status and evidence, then rebuild. Remove an obsolete record only after checking for saved search links or useful archive value. The “Report outdated link” button prepares/copies a note for the site owner; it is not a submission form.

## Current editorial notes

- The Good Stuff is not listed because the brief did not identify the intended platform or an official URL.
- WeThinkCode_ and iHub are legitimate leads, but current intake details are not confirmed, so neither is labelled open. WeThinkCode_ currently describes different durations on its application portal and Enrol page.
- NSFAS currently says 2027 applications are open, but its site and a government announcement give different closing dates. Check the live myNSFAS portal before applying.
- The CAPACITI and Umuzi pages describe programmes but do not confirm a current intake or project availability.
- The NYDA Opportunities Corner is a discovery directory; verify each vacancy with its named provider. The brief’s youth.gov.za URL did not resolve during checks and was not included.
- The Micro1 individual and business tracking URLs supplied for KIT returned HTTP 404 on 2026-10-10. The original tracked URLs have been removed from the public catalog. The cards point to current official programme-information pages until fresh tracked destinations are supplied; attribution for the old URLs is unconfirmed.
- Flex Your Code currently has two Devpost events checked on 2026-10-10. Recheck their rules and deadlines before publication or participation.
