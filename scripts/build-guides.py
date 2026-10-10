#!/usr/bin/env python3
"""Print the accessible guide HTML sources to downloadable PDFs with Chrome."""

from pathlib import Path
import shutil
import subprocess

ROOT = Path(__file__).resolve().parents[1]
OUTPUTS = {
    "student-tech-starter.html": "student-tech-starter.pdf",
    "adult-tech-career-starter.html": "adult-tech-career-starter.pdf",
}


def main():
    chrome = shutil.which("google-chrome") or shutil.which("chromium") or shutil.which("chromium-browser")
    if not chrome:
        raise SystemExit("Chrome or Chromium is required to print the guide PDFs.")
    folder = ROOT / "assets" / "downloads"
    for source_name, pdf_name in OUTPUTS.items():
        source = (folder / source_name).resolve()
        output = (folder / pdf_name).resolve()
        subprocess.run([
            chrome,
            "--headless",
            "--disable-gpu",
            "--no-pdf-header-footer",
            f"--print-to-pdf={output}",
            source.as_uri(),
        ], check=True)
        if not output.exists() or output.stat().st_size < 1000:
            raise SystemExit(f"Chrome did not create a usable PDF: {output}")
        print(f"Created {output.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
