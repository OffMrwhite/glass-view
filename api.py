# api.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from whoosh.index import open_dir
from whoosh.qparser import QueryParser

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ix = open_dir("index")

@app.get("/search")
def search(q: str):
    with ix.searcher() as searcher:
        parser = QueryParser("content", ix.schema)
        query = parser.parse(q)
        results = searcher.search(query, limit=10)

        return [
            {
                "title": r["title"],
                "url": r["url"],
                "tag": r["tag"]
            }
            for r in results
        ]