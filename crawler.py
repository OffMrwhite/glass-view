# crawler.py
import requests
from bs4 import BeautifulSoup

def crawl_project(url):
    r = requests.get(url)
    soup = BeautifulSoup(r.text, "html.parser")

    title = soup.title.text if soup.title else ""
    text = soup.get_text(" ", strip=True)

    return {
        "title": title,
        "content": text,
        "url": url,
        "tag": "scratch"
    }