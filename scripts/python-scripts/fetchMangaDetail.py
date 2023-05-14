import os
import scrapy
import json


class Manga:
    def __init__(self, title, author, image_link, description, categories, chapter_links):
        self.title = title
        self.author = author
        self.image_link = image_link
        self.description = description
        self.categories = categories
        self.chapter_links = chapter_links


class LinkSpider(scrapy.Spider):
    name = "link_spider"
    # Set the URL of the web page you want to extract links from

    start_urls = []
    download_delay = 1

    def __init__(self, file_name):
        self.mangaList = []
        self.chapterLinks = []
        self.web_url = "https://hentai18.net"
        # Open the JSON file and extract the links
        with open(file_name, 'r') as f:
            links = json.load(f)
            self.start_urls = [self.web_url + link['link'] for link in links]

    def parse(self, response):
        # Extract manga information from the web page
        title = response.css('div.main-head h1::text').get()
        categories = response.css('div.categories a::text').getall()
        author = response.css('div.author a span::text').get()
        chapter_links = response.css('ul.chapter-list a::attr(href)').getall()
        description = response.css('div.summary-block p.about::text').get()
        image_link = response.css(
            'figure.cover img.image-novel::attr(src)').get()

        # Create a Manga object to store the data
        manga = Manga(
            title=title,
            author=author,
            image_link=image_link,
            description=description,
            categories=categories,
            chapter_links=chapter_links
        )

        link_data = []
        for link in chapter_links:
            link_data.append({'link': link})

        self.chapterLinks += link_data
        self.mangaList.append(manga)

    def closed(self, reason):
        file_name = 'mangaDetailLinks.json'
        manga_json = json.dumps([manga.__dict__ for manga in self.mangaList])
        # Write the link data to a JSON file
        with open(file_name, 'w') as f:
            json.dump(manga_json, f)

        file_name = 'chapterLinks.json'
        # Write the link data to a JSON file
        with open(file_name, 'w') as f:
            json.dump(self.chapterLinks, f)
