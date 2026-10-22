"""Fetch the latest Tistory posts into _data/blog.json for the ABOUT page.

Usage: python3 .github/scripts/fetch_blog.py [feed_url_or_file://path] [out_path]
Run by .github/workflows/blog.yml on a schedule; safe to run locally too.
"""
import html
import json
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime

FEED = sys.argv[1] if len(sys.argv) > 1 else "https://nobbs-it-study.tistory.com/rss"
OUT = sys.argv[2] if len(sys.argv) > 2 else "_data/blog.json"
COUNT = 5
SUMMARY_LEN = 90


def summarize(desc):
    # Drop scripts, styles and image captions, then tags; strip markdown heading marks left in the text.
    text = re.sub(r"<(script|style|figcaption)[^>]*>.*?</\1>", " ", desc, flags=re.S | re.I)
    text = html.unescape(re.sub(r"<[^>]+>", " ", text))
    text = re.sub(r"(^|\s)#{1,6}(?=\s)", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text if len(text) <= SUMMARY_LEN else text[:SUMMARY_LEN].rstrip() + "…"


def first_image(desc):
    m = re.search(r'<img[^>]+src="([^"]+)"', desc)
    if not m:
        return ""
    src = html.unescape(m.group(1))
    return "https:" + src if src.startswith("//") else src


def main():
    req = urllib.request.Request(FEED, headers={"User-Agent": "Mozilla/5.0 (portfolio blog sync)"})
    with urllib.request.urlopen(req, timeout=30) as r:
        root = ET.fromstring(r.read())
    posts = []
    for item in root.iter("item"):
        desc = item.findtext("description") or ""
        date = parsedate_to_datetime(item.findtext("pubDate"))
        posts.append({
            "title": html.unescape(item.findtext("title") or "").strip(),
            "url": (item.findtext("link") or "").strip(),
            "date": date.strftime("%Y-%m-%d"),
            "summary": summarize(desc),
            "thumb": first_image(desc),
            "_ts": date.timestamp(),
        })
    posts.sort(key=lambda p: p["_ts"], reverse=True)
    posts = [{k: v for k, v in p.items() if k != "_ts"} for p in posts[:COUNT]]
    if not posts:
        sys.exit("feed had no items; keeping the existing file")  # don't wipe the list on a bad fetch
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print(f"wrote {len(posts)} posts to {OUT}")


if __name__ == "__main__":
    main()
