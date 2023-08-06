from dataclasses import dataclass
import json
from typing import List

@dataclass
class Manga:
    mangaLink: str
    mangaId: str
    title: str
    author: str
    description: str
    categories: List[str]
    chapterLinks: List[str]
    imageLink: str
    createdAt: str

class MangaEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Manga):
            return obj.__dict__
        return super().default(obj)

def map_data_to_manga(data: dict) -> Manga:
    mangaLink = data.get('mangaLink', {}).get('S')
    mangaId = data.get('mangaId', {}).get('S')
    title = data.get('title', {}).get('S')
    author = data.get('author', {}).get('S')
    description = data.get('description', {}).get('S')
    
    categories = [category['S'] for category in data.get('categories', {}).get('L', [])]
    chapterLinks = [chapter['S'] for chapter in data.get('chapterLinks', {}).get('L', [])]
    imageLink = data.get('imageLink', {}).get('S')
    createdAt = data.get('createdAt', {}).get('S')
    
    return Manga(
        mangaLink=mangaLink,
        mangaId=mangaId,
        title=title,
        author=author,
        description=description,
        categories=categories,
        chapterLinks=chapterLinks,
        imageLink=imageLink,
        createdAt=createdAt
    )