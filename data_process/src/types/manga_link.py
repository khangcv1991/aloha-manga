from dataclasses import dataclass
import json
from typing import List

@dataclass
class MangaLink:
    link: str
    createdAt: str

class MangaLinkEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, MangaLink):
            return obj.__dict__
        return super().default(obj)
    

class MangaLinkEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, MangaLink):
            return obj.__dict__
        return super().default(obj)

def map_data_to_manga_link(data: dict) -> MangaLink:
    link = data.get('link', {}).get('S')
    createdAt = data.get('createdAt', {}).get('S')
    
    return MangaLink(
        link=link,
        createdAt=createdAt,
    )
