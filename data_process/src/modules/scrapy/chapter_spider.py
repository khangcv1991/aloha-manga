from datetime import datetime
import os
import scrapy
import json

from ...types.chapter import Chapter
from ..manga.manga_service import get_all_mangas_system_service
from ..chapter.chapter_service import insert_chapter_system_service


WEB_URL = "https://hentai18.net"


class Hentai18ChapterSpider(scrapy.Spider):
    name = "Hentai18ChapterSpider"
    start_urls = []

    def __init__(self):
        manga_info_list = get_all_mangas_system_service()
        all_chapter_links = [item.chapterLinks for item in manga_info_list]
        self.start_urls = [WEB_URL + item for chapter_links in all_chapter_links for item in chapter_links]
        print(f"Hentai18ChapterSpider: {len(self.start_urls)} chapters {self.start_urls[0]}")


    def parse(self, response):
        image_src_list = response.xpath('//div[@class="chapter-content"]//img/@src').getall()
        chapter_link = response.url

        chapter = Chapter(
            chapterLink=WEB_URL,
            chapterId=chapter_link.replace(WEB_URL, "").replace("read-hentai", "").strip("/"),
            originalImageLinks=image_src_list
        )   
        print(f"chapter detail: {chapter}")
        insert_chapter_system_service(chapter)



