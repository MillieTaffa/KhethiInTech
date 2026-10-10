#!/usr/bin/env python3
"""Render KIT's curated JSON directories into static, searchable HTML and index data."""

from __future__ import annotations

import html
import json
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]


def read_json(name: str):
    return json.loads((ROOT / "data" / name).read_text(encoding="utf-8"))


def esc(value) -> str:
    return html.escape(str(value if value is not None else ""), quote=True)


def checked_https(url: str) -> str:
    if urlparse(url).scheme != "https":
        raise ValueError(f"Expected an HTTPS URL in curated data: {url}")
    return url


def certificate_filter(value: str) -> str:
    lowered = value.lower()
    if lowered.startswith("free"):
        return "free"
    if "not-offered" in lowered:
        return "not-offered"
    if "paid" in lowered:
        return "paid"
    return "varies"


def unique_ids(rows, label):
    ids = [row["id"] for row in rows]
    if len(ids) != len(set(ids)):
        raise ValueError(f"Duplicate {label} ID")


def validate_catalogs(courses, resources, opportunities):
    for row in courses:
        for key in ("id", "title", "provider", "description", "subjects", "level", "durationHours", "access", "certificate", "labs", "account", "prerequisites", "url", "checkedAt", "evidence"):
            if key not in row:
                raise ValueError(f"Course {row.get('id', '<unknown>')} is missing {key}")
        if row["access"] not in {"completely-free", "limited-free", "directory-free-option"}:
            raise ValueError(f"Course {row['id']} has an unsupported access label")
        checked_https(row["url"])
    for row in resources:
        for key in ("id", "title", "provider", "category", "description", "tags", "level", "access", "url", "checkedAt"):
            if key not in row:
                raise ValueError(f"Resource {row.get('id', '<unknown>')} is missing {key}")
        if row["access"] not in {"free", "limited-free"}:
            raise ValueError(f"Resource {row['id']} must have a verified free access option")
        checked_https(row["url"])
    for row in opportunities:
        for key in ("id", "kind", "title", "provider", "categories", "description", "sourceUrl", "applicationUrl", "status", "checkedAt", "verificationStatus", "evidence", "participationFee", "referral"):
            if key not in row:
                raise ValueError(f"Opportunity {row.get('id', '<unknown>')} is missing {key}")
        checked_https(row["sourceUrl"])
        checked_https(row["applicationUrl"])
        for url in row["evidence"]:
            checked_https(url)
        terms_url = row["referral"].get("termsUrl")
        if terms_url:
            checked_https(terms_url)
        if row["kind"] == "hackathon" and row["participationFee"].get("type") != "free":
            raise ValueError(f"Flex Your Code event {row['id']} must have verified free entry")
        if row["referral"].get("isReferralLink") and not row["referral"].get("disclosure"):
            raise ValueError(f"Referral listing {row['id']} needs a visible disclosure")


def replace_block(path: Path, name: str, body: str) -> None:
    source = path.read_text(encoding="utf-8")
    start = f"<!-- BEGIN {name} -->"
    end = f"<!-- END {name} -->"
    if start not in source or end not in source:
        raise ValueError(f"Missing generated block {name} in {path.relative_to(ROOT)}")
    before, rest = source.split(start, 1)
    _, after = rest.split(end, 1)
    path.write_text(before + start + "\n" + body.rstrip() + "\n" + end + after, encoding="utf-8")


def course_card(row):
    tags = ",".join(row["subjects"])
    hours = row.get("durationHours")
    duration = f"{hours} hours" if hours is not None else "Not published"
    label = "Free learning" if row["access"] == "completely-free" else "Limited free option"
    if row["access"] == "directory-free-option":
        label = "Course finder · terms vary"
    certificate = row["certificate"].replace("-", " ")
    return f'''<article class="card catalog-card course-card" id="{esc(row['id'])}" data-directory-card data-category="{esc(row['subjects'][0])}" data-topics="{esc(tags)}" data-level="{esc(row['level'])}" data-duration-hours="{esc(hours if hours is not None else 'unknown')}" data-certificate="{certificate_filter(row['certificate'])}" data-access="{esc(row['access'])}" data-free="{'true' if row['access'] == 'completely-free' else 'false'}" data-title="{esc(row['title'].lower())}">
  <div class="catalog-card-head"><span class="card-label">{esc(label)}</span><span class="meta">Checked {esc(row['checkedAt'])}</span></div>
  <h2>{esc(row['title'])}</h2><p class="provider">{esc(row['provider'])}</p><p>{esc(row['description'])}</p>
  <div class="tag-list">{''.join(f'<span class="tag">{esc(tag.replace("-", " "))}</span>' for tag in row['subjects'][:5])}</div>
  <dl class="fact-list"><div><dt>Learning access</dt><dd>{esc(row['access'].replace('-', ' '))}</dd></div><div><dt>Certificate</dt><dd>{esc(certificate)}</dd></div><div><dt>Estimated duration</dt><dd>{esc(duration)}</dd></div></dl>
  <details class="catalog-details"><summary>Access, projects and prerequisites</summary><dl class="fact-list"><div><dt>Practice</dt><dd>{esc(row['labs'])}</dd></div><div><dt>Account</dt><dd>{esc(row['account'])}</dd></div><div><dt>Prerequisites</dt><dd>{esc(row['prerequisites'])}</dd></div><div><dt>Why this is listed</dt><dd>{esc(row['evidence'])}</dd></div></dl></details>
  <a class="button button-secondary card-link" href="{esc(checked_https(row['url']))}" target="_blank" rel="noopener noreferrer">Open {esc(row['provider'])} ↗</a>
</article>'''


def resource_card(row):
    access_label = "Free core material" if row["access"] == "free" else "Free option · service limits"
    return f'''<article class="card catalog-card resource-card" id="{esc(row['id'])}" data-directory-card data-category="{esc(row['category'])}" data-level="{esc(row['level'])}" data-access="{esc(row['access'])}" data-topics="{esc(','.join(row['tags']))}" data-title="{esc(row['title'].lower())}">
  <div class="catalog-card-head"><span class="card-label">{esc(row['category'].replace('-', ' '))}</span><span class="meta">Checked {esc(row['checkedAt'])}</span></div>
  <h2>{esc(row['title'])}</h2><p class="provider">{esc(row['provider'])}</p><p>{esc(row['description'])}</p>
  <div class="tag-list"><span class="tag">{esc(row['level'].replace('-', ' '))}</span><span class="tag">{esc(access_label)}</span></div>
  <div class="tag-list">{''.join(f'<span class="tag">{esc(tag.replace("-", " "))}</span>' for tag in row['tags'][:5])}</div>
  <a class="text-link card-link" href="{esc(checked_https(row['url']))}" target="_blank" rel="noopener noreferrer">Open {esc(row['provider'])} ↗</a>
</article>'''


CATEGORY_LABELS = {
    "free-coding-academies": "Free coding academies",
    "free-digital-skills": "Free digital skills",
    "jobs-entry-level": "Jobs and entry-level roles",
    "remote-work": "Remote work",
    "freelance-gigs": "Freelance gigs",
    "internships": "Internships",
    "apprenticeships": "Apprenticeships",
    "learnerships": "Learnerships",
    "paid-training-programmes": "Paid training programmes",
    "student-ambassador-programmes": "Student ambassador programmes",
    "referral-affiliate-programmes": "Referral and affiliate programmes",
    "paid-ai-data-projects": "Paid AI and data projects",
    "hackathons-and-paid-challenges": "Hackathons and challenges",
    "bursaries-scholarships": "Bursaries and scholarships",
    "business-partnerships": "Business partnerships",
    "research-opportunities": "Research opportunities",
    "open-source-programmes": "Open-source programmes",
    "stipends-sponsored-programmes": "Stipends and sponsored programmes",
    "graduate-programmes": "Graduate programmes",
    "career-development": "Career development and mentorship",
    "student-support": "Student support",
    "student-essentials": "Student essentials",
}


def status_label(row):
    if row.get("kind") == "hackathon":
        return "Open · verify event page before joining" if row.get("status") == "open" else row.get("status", "Check status")
    labels = {
        "open": "Open now · verified",
        "details-to-confirm": "Current intake details need confirmation",
        "availability-to-confirm": "Confirm current availability",
        "referral-link-needs-confirmation": "Referral link needs confirmation",
        "intake-not-listed": "No current intake date listed",
        "programme-directory": "Programme directory · terms vary",
        "directory": "Official discovery portal",
        "directory-needs-review": "Discovery lead · page needs review",
        "seasonal-guidance": "Seasonal guidance · check current dates",
        "ongoing-programme": "Ongoing programme · eligibility applies",
    }
    return labels.get(row.get("status"), row.get("status", "Check provider"))


def money(row):
    fee = row.get("participationFee", {})
    value = fee.get("notes") or fee.get("type", "Not specified")
    return value


def opportunity_card(row):
    is_event = row.get("kind") == "hackathon"
    categories = row.get("categories", [])
    tags = row.get("skills", [])
    if row.get("prize"):
        tags += [row["prize"].get("type", "prize")]
    event_details = ""
    if is_event:
        prize = row.get("prize") or {}
        event_details = f'''<div class="fact-grid"><div><strong>Entry fee</strong><span>Free to enter · {esc(row.get('freeEntryEvidence') or 'see event rules')}</span></div><div><strong>Event dates</strong><span>{esc(row.get('eventDates') or 'Not stated')}</span></div><div><strong>Submission deadline</strong><span>{esc(row.get('deadlineDisplay') or row.get('deadline') or 'Not stated')}</span></div><div><strong>Format and countries</strong><span>{esc(row.get('format') or 'Not specified')}; {esc(row.get('country') or 'See event rules')}</span></div><div><strong>Eligibility</strong><span>{esc(row.get('studentRestrictions') or 'See event rules')}; {esc(row.get('ageRestrictions') or 'age not specified')}</span></div><div><strong>Team format</strong><span>{esc(row.get('participationMode') or 'See event rules')}</span></div><div><strong>Required tools</strong><span>{esc(row.get('requiredTools') or 'See event rules')}</span></div><div><strong>Prizes</strong><span>{esc(prize.get('details') or 'Not stated; see event page')}</span></div></div><p class="meta">Timezone: {esc(row.get('timezone') or 'Not stated')}</p>'''
    else:
        location = ", ".join(row.get("regions", [])) or row.get("country", "Not specified")
        funding = row.get("fundingType") or "Not specified"
        compensation = row.get("participantCompensation") or "Not specified"
        stipend = row.get("stipend") or "Not specified"
        deadline = row.get("deadline") or "No current deadline published"
        start_date = row.get("startDate") or "Not stated"
        event_details = f'''<div class="fact-grid"><div><strong>Location / eligibility</strong><span>{esc(location)}</span></div><div><strong>Format</strong><span>{esc(row.get('format') or 'Not specified')}</span></div><div><strong>Funding</strong><span>{esc(funding)}</span></div><div><strong>Participant pay</strong><span>{esc(compensation)}</span></div><div><strong>Stipend</strong><span>{esc(stipend)}</span></div><div><strong>Start date</strong><span>{esc(start_date)}</span></div><div><strong>Deadline</strong><span>{esc(deadline)}</span></div><div><strong>Experience</strong><span>{esc(row.get('experienceLevel') or 'Not specified')}</span></div></div>'''
    disclosure = row.get("referral", {}).get("disclosure")
    disclosure_html = f'<p class="notice referral-disclosure">Referral disclosure: {esc(disclosure)}</p>' if disclosure else ""
    referral_status_note = row.get("referral", {}).get("trackingStatus")
    referral_status_html = f'<div><dt>Supplied tracking link</dt><dd>{esc(referral_status_note)}</dd></div>' if referral_status_note else ""
    deadline_attr = esc(row.get("deadline") or "")
    href = checked_https(row.get("applicationUrl") or row["sourceUrl"])
    evidence = " · ".join(row.get("evidence", []))
    prize_type = (row.get("prize") or {}).get("type", "")
    referral = row.get("referral") or {}
    referral_status = "Referral route; commission terms verified" if referral.get("commissionVerified") else ("Referral route; commission terms not verified" if referral.get("isReferralLink") else "Not a referral link")
    referral_type = referral.get("commissionType") or "Not specified"
    referral_qualification = referral.get("qualification") or "Not specified"
    referral_payout = referral.get("payout") or "Not specified"
    referral_terms = referral.get("termsUrl") or "Not specified"
    country = row.get("country", "")
    global_eligible = any(term in country.lower() for term in ("worldwide", "global"))
    sa_eligible = country.lower() == "south africa" or global_eligible
    regions = ",".join(row.get("regions", []))
    student_restrictions = (row.get("studentRestrictions") or "").lower()
    student_eligible = "true" if "student" in student_restrictions and "varies" not in student_restrictions else "unknown"
    funding = row.get("fundingType", "unknown") + " " + str(row.get("stipend") or "")
    return f'''<article class="card catalog-card opportunity-card" id="{esc(row['id'])}" data-directory-card data-kind="{esc(row['kind'])}" data-category="{esc(categories[0] if categories else 'other')}" data-categories="{esc(','.join(categories))}" data-topics="{esc(','.join(tags))}" data-status="{esc(row.get('status', 'unknown'))}" data-level="{esc(row.get('experienceLevel', 'unknown').lower().replace(' ', '-'))}" data-format="{esc((row.get('format') or 'unknown').lower())}" data-country="{esc(country.lower())}" data-locations="{esc(regions.lower())}" data-funding="{esc(funding.lower())}" data-prize-type="{esc(prize_type)}" data-global-eligible="{'true' if global_eligible else 'false'}" data-sa-eligible="{'true' if sa_eligible else 'false'}" data-student-eligible="{student_eligible}" data-deadline="{deadline_attr}" data-hide-expired="{'true' if is_event else 'false'}">
  <div class="catalog-card-head"><span class="card-label" data-status-label>{esc(status_label(row))}</span><span class="meta">Checked {esc(row['checkedAt'])}</span></div>
  <h2>{esc(row['title'])}</h2><p class="provider">{esc(row['provider'])}</p><p>{esc(row['description'])}</p>
  <div class="tag-list">{''.join(f'<span class="tag">{esc(CATEGORY_LABELS.get(category, category).replace("-", " "))}</span>' for category in categories[:4])}{''.join(f'<span class="tag">{esc(tag)}</span>' for tag in tags[:3])}</div>
  {event_details}
  <details class="catalog-details"><summary>Requirements, evidence and notes</summary><dl class="fact-list"><div><dt>Participation fee</dt><dd>{esc(money(row))}</dd></div><div><dt>Education / age / student requirements</dt><dd>{esc(row.get('educationRequirements') or 'Not specified')}; {esc(row.get('ageRestrictions') or 'Not specified')}; {esc(row.get('studentRestrictions') or 'Not specified')}</dd></div><div><dt>Certificate</dt><dd>{esc(row.get('certificate') or 'Not specified')}</dd></div><div><dt>KIT referral</dt><dd>{esc(referral_status)}; commission: {esc(referral_type)}; qualifying action: {esc(referral_qualification)}; payout: {esc(referral_payout)}; terms: {esc(referral_terms)}</dd></div>{referral_status_html}<div><dt>Verification</dt><dd>{esc(row.get('verificationStatus') or 'Needs review')}</dd></div><div><dt>Source evidence</dt><dd>{esc(evidence)}</dd></div><div><dt>Notes</dt><dd>{esc(row.get('notes') or 'Check provider terms before applying')}</dd></div></dl></details>
{disclosure_html}
  <div class="card-actions"><a class="button button-secondary" href="{esc(href)}" target="_blank" rel="noopener noreferrer">{('View official event' if is_event else ('View current official programme' if referral.get('isReferralLink') else 'Check official details'))} ↗</a><button class="filter-button save-opportunity" type="button" data-save-opportunity="{esc(row['id'])}" aria-pressed="false">Save to tracker</button><button class="text-button" type="button" data-report-link="{esc(row['id'])}">Report outdated link</button><span class="meta report-status" data-report-status aria-live="polite"></span></div>
</article>'''


def search_item(title, category, description, url, tags, catalog_type):
    return {"title": title, "category": category, "description": description, "url": url, "tags": tags, "catalogType": catalog_type}


def main():
    courses = read_json("courses.json")
    resources = read_json("resources.json")
    opportunities = read_json("opportunities.json")
    unique_ids(courses, "course")
    unique_ids(resources, "resource")
    unique_ids(opportunities, "opportunity")
    validate_catalogs(courses, resources, opportunities)

    replace_block(ROOT / "src/pages/courses/index.html", "course-cards", "\n".join(course_card(row) for row in courses))
    replace_block(ROOT / "src/pages/resources/index.html", "resource-cards", "\n".join(resource_card(row) for row in resources))

    regular = [row for row in opportunities if row.get("kind") == "opportunity"]
    events = [row for row in opportunities if row.get("kind") == "hackathon"]
    replace_block(ROOT / "src/pages/plug-hub/plug-hub.html", "opportunity-cards", "\n".join(opportunity_card(row) for row in regular))
    replace_block(ROOT / "src/pages/flex-your-code/index.html", "competition-cards", "\n".join(opportunity_card(row) for row in events))

    index_path = ROOT / "data/search-index.json"
    static = [row for row in json.loads(index_path.read_text(encoding="utf-8")) if not row.get("catalogType")]
    dynamic = []
    dynamic += [search_item(row["title"], "Free courses", row["description"] + " Provider: " + row["provider"], "src/pages/courses/index.html#" + row["id"], row["subjects"], "course") for row in courses]
    dynamic += [search_item(row["title"], "Free resources", row["description"] + " Provider: " + row["provider"], "src/pages/resources/index.html#" + row["id"], row["tags"], "resource") for row in resources]
    dynamic += [search_item(row["title"], "Flex Your Code" if row.get("kind") == "hackathon" else "Plug Hub", row["description"] + " Provider: " + row["provider"] + " Categories: " + ", ".join(row["categories"]), ("src/pages/flex-your-code/index.html#" if row.get("kind") == "hackathon" else "src/pages/plug-hub/plug-hub.html#") + row["id"], row["categories"] + row.get("skills", []), "opportunity") for row in opportunities]
    dynamic += [
        search_item("Student Hub", "Learn and grow", "A practical dashboard for free learning, academies, jobs, funding, projects, student support and your private saved-opportunity tracker.", "src/pages/make-money/index.html", ["student", "hub", "funding", "jobs", "tracker"], "page"),
        search_item("Flex Your Code", "Competitions", "Beginner-friendly coding competition listings, free-entry checks, hackathon guides and submission templates.", "src/pages/flex-your-code/index.html", ["hackathon", "competition", "coding", "prizes"], "page"),
    ]
    merged = []
    seen = set()
    for row in static + dynamic:
        key = (row["url"], row["title"])
        if key not in seen:
            seen.add(key)
            merged.append(row)
    index_path.write_text(json.dumps(merged, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Rendered {len(courses)} courses, {len(resources)} resources, {len(regular)} Plug Hub records, {len(events)} competitions and {len(merged)} search items.")


if __name__ == "__main__":
    main()
