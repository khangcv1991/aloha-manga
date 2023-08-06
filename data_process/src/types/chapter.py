from dataclasses import dataclass
import json
from typing import List, Optional

@dataclass
class Chapter:
    chapterLink: str
    chapterId: str
    originalImageLinks: List[str]
    imageLinks: Optional[List[str]]= None  # Optional list of strings (can be List[str] or None)
    isDownload: Optional[bool]  = None # Optional boolean (can be bool or None)

class ChapterEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Chapter):
            return obj.__dict__
        return super().default(obj)

def map_data_to_chapter(data: dict) -> Chapter:
    chapterLink = data.get('chapterLink', {}).get('S')
    chapterId = data.get('chapterId', {}).get('S')
    originalImageLinks = [link['S'] for link in data.get('originalImageLinks', {}).get('L', [])]
    imageLinks = [link['S'] for link in data.get('imageLinks', {}).get('L', [])]
    isDownload = data.get('isDownload', {}).get('BOOL', False)
    
    return Chapter(
        chapterLink=chapterLink,
        chapterId=chapterId,
        originalImageLinks=originalImageLinks,
        imageLinks=imageLinks,
        isDownload=isDownload
    )