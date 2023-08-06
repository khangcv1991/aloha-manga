from datetime import datetime
import os
import scrapy
import json

from ...types.manga import Manga
from ..manga.manga_service import insert_manga_system_service
from ..manga_link.manga_link_service import get_all_links_system_service


WEB_URL = "https://hentai18.net/read-hentai"


class Hentai18MangaSpider(scrapy.Spider):
    name = "Hentai18MangaSpider"
    download_delay = 0
    start_urls = []

    def __init__(self):
        self.mangaList = []
        links = get_all_links_system_service()
        self.start_urls = [item.link for item in links]
        print(f"Hentai18MangaSpider: {self.start_urls }")

    def parse(self, response):
        title = response.css('div.main-head h1::text').get()
        categories = response.css('div.categories a::text').getall()
        author = response.css('div.author a span::text').get()
        chapter_links = response.css('ul.chapter-list a::attr(href)').getall()
        description = response.css('div.summary-block p.about::text').get()
        image_link = response.css(
            'figure.cover img.image-novel::attr(src)').get()
        manga_link = response.url
        created_at = datetime.now().isoformat()

        manga = Manga(
            mangaLink=WEB_URL,
            mangaId=manga_link.replace(WEB_URL, "").strip("/"),
            title=title,
            author=author,
            imageLink=image_link,
            description=description,
            categories=categories,
            chapterLinks=chapter_links,
            createdAt=created_at
        )
        
        insert_manga_system_service(manga)



