# indexer.py
from whoosh.index import create_in
from whoosh.fields import Schema, TEXT, ID
import os
from crawler import crawl_project

schema = Schema(
    title=TEXT(stored=True),
    content=TEXT,
    url=ID(stored=True),
    tag=TEXT(stored=True)
)

if not os.path.exists("index"):
    os.mkdir("index")

ix = create_in("index", schema)
writer = ix.writer()

# Sample Scratch projects and tutorials
scratch_urls = [
    "https://scratch.mit.edu/projects/10128407/",  # Example project
    "https://scratch.mit.edu/projects/104/",  # Another
    "https://en.scratch-wiki.info/wiki/Scratch_Wiki",  # Wiki
]

for url in scratch_urls:
    try:
        data = crawl_project(url)
        writer.add_document(
            title=data["title"],
            content=data["content"],
            url=data["url"],
            tag="scratch"
        )
    except:
        pass  # Skip if error

# Manual entries for Game Dev
writer.add_document(
    title="Unity Game Development Basics",
    content="Learn Unity engine basics collision detection physics scripting C#",
    url="https://learn.unity.com/",
    tag="game_dev"
)

writer.add_document(
    title="Godot Engine Tutorial",
    content="Godot open source game engine GDScript 2D 3D physics collision",
    url="https://docs.godotengine.org/",
    tag="game_dev"
)

writer.add_document(
    title="General Web Search Fallback",
    content="web search general information",
    url="https://www.google.com",
    tag="general"
)

writer.commit()