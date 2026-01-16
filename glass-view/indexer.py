# indexer.py
from whoosh.index import create_in
from whoosh.fields import Schema, TEXT, ID
import os

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

# example entry
writer.add_document(
    title="Scratch Platformer Collision",
    content="collision detection platformer scratch blocks",
    url="https://scratch.mit.edu/projects/123",
    tag="scratch"
)

writer.commit()