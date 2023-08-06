from datetime import datetime
import os
import sqlite3
import scrapy
import json
import datetime

from ...types.manga_link import MangaLink

from ..manga_link.manga_link_service import insert_link_system_service

WEB_URL = "https://hentai18.net"


class Hentai18LinkSpider(scrapy.Spider):
    name = "link_spider"
    # Set the URL of the web page you want to extract links from
    start_urls = [
        'https://hentai18.net/genres/manhwa?page={}'.format(page) for page in range(1, 2)]
    download_delay = 1
    scraped_links = []
    
    def __init__(self):
        self.scraped_links = []  # Initialize an empty list to store the scraped links

    def parse(self, response):
        # Extract all links from the web page using the "a" HTML tag
        links = response.css('div.list_wrap a::attr(href)').getall()
        # Remove duplicate links
        links = list(set(links))
        # Remove links containing the word "chapter"
        links = [link for link in links if "chapter" not in link.lower()]
        # Create a list of dictionaries to store each link and its associated data
        for link in links:
            full_link = WEB_URL + link
            self.scraped_links.append(full_link)  # Add the link to the list
            
            created_at = datetime.datetime.now().isoformat()
            manga_link = MangaLink(full_link , created_at)
            # insert_link_system_service({'link':full_link, 'createdAt': created_at})
            insert_link_system_service(manga_link)


