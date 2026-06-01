from __future__ import annotations

import re
import sys
from fnmatch import fnmatch
from pathlib import Path
from urllib.parse import unquote, urlparse

import yaml


ROOT = Path(__file__).resolve().parents[1]
DOCS_DIR = ROOT / "docs"
MKDOCS_CONFIG = ROOT / "mkdocs.yml"
INDEX_PAGE = DOCS_DIR / "index_page.md"

IGNORED_DOC_PARTS = {"_assets", "_snippets", "_templates"}
TOP_LEVEL_INDEX_PAGES = {
    "index.md",
    "index_page.md",
}

LOCAL_LINK_PATTERN = re.compile(r"(?<!!)\[[^\]]*\]\(([^)]+)\)")


def to_posix(path: Path) -> str:
    return path.as_posix()


def not_in_nav_patterns(config: dict[str, object]) -> list[str]:
    raw_value = config.get("not_in_nav", "")
    if not isinstance(raw_value, str):
        return []

    return [
        line.strip()
        for line in raw_value.splitlines()
        if line.strip() and not line.strip().startswith("#")
    ]


def is_not_in_nav(path: str, patterns: list[str]) -> bool:
    return any(fnmatch(path, pattern) for pattern in patterns)


def public_markdown_files(patterns: list[str]) -> set[str]:
    files: set[str] = set()
    for path in DOCS_DIR.rglob("*.md"):
        relative = path.relative_to(DOCS_DIR)
        relative_posix = to_posix(relative)
        if any(part in IGNORED_DOC_PARTS for part in relative.parts):
            continue
        if relative_posix in TOP_LEVEL_INDEX_PAGES:
            continue
        if is_not_in_nav(relative_posix, patterns):
            continue
        files.add(relative_posix)
    return files


def nav_markdown_files(nav: object) -> set[str]:
    files: set[str] = set()

    def walk(node: object) -> None:
        if isinstance(node, str):
            if node.endswith(".md"):
                files.add(node)
            return

        if isinstance(node, list):
            for item in node:
                walk(item)
            return

        if isinstance(node, dict):
            for value in node.values():
                walk(value)

    walk(nav)
    return files


def index_page_links() -> set[str]:
    links = local_markdown_links(INDEX_PAGE)
    result: set[str] = set()

    for link in links:
        path = normalize_link_target(INDEX_PAGE, link)
        if path is not None and path.suffix == ".md":
            result.add(to_posix(path.relative_to(DOCS_DIR)))

    return result


def local_markdown_links(path: Path) -> list[str]:
    text = path.read_text(encoding="utf-8")
    return [match.group(1).strip() for match in LOCAL_LINK_PATTERN.finditer(text)]


def normalize_link_target(source: Path, raw_target: str) -> Path | None:
    target = raw_target.strip()
    if not target or target.startswith("#"):
        return None

    if target.startswith("<") and target.endswith(">"):
        target = target[1:-1]

    parsed = urlparse(target)
    if parsed.scheme or parsed.netloc:
        return None

    target_path = unquote(parsed.path)
    if not target_path:
        return None

    return (source.parent / target_path).resolve()


def validate_local_links() -> list[str]:
    errors: list[str] = []

    for source in DOCS_DIR.rglob("*.md"):
        for raw_target in local_markdown_links(source):
            target = normalize_link_target(source, raw_target)
            if target is None:
                continue

            try:
                target.relative_to(DOCS_DIR)
            except ValueError:
                errors.append(
                    f"{source.relative_to(ROOT)}: docs/ outside link is not allowed: {raw_target}"
                )
                continue

            if target.suffix:
                if not target.exists():
                    errors.append(
                        f"{source.relative_to(ROOT)}: missing local link target: {raw_target}"
                    )
            elif not target.exists() and not target.with_suffix(".md").exists():
                errors.append(
                    f"{source.relative_to(ROOT)}: missing local link target: {raw_target}"
                )

    return errors


def main() -> int:
    errors: list[str] = []

    config = yaml.safe_load(MKDOCS_CONFIG.read_text(encoding="utf-8"))
    patterns = not_in_nav_patterns(config)
    public_files = public_markdown_files(patterns)
    nav_files = nav_markdown_files(config.get("nav", []))

    missing_from_nav = sorted(public_files - nav_files)
    if missing_from_nav:
        errors.append("mkdocs.yml nav にない公開記事:\n  - " + "\n  - ".join(missing_from_nav))

    errors.extend(validate_local_links())

    if errors:
        print("Documentation validation failed.", file=sys.stderr)
        for error in errors:
            print(f"\n{error}", file=sys.stderr)
        return 1

    print("Documentation validation passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
