from datetime import datetime
import os
import scrapy
from scrapy import Request
import json
import sqlite3

DB_NAME = './scrapy-data/manga.db'
WEB_URL = "https://hentai18.net"


def create_manga_table(conn):
    cursor = conn.cursor()

    # Create manga table if it does not exist
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS manga (
            mangaLink TEXT PRIMARY KEY,
            title TEXT,
            author TEXT,
            imageLink TEXT,
            description TEXT,
            categories TEXT,
            chapterLinks TEXT,
            createdAt TEXT
        )
    """)
    conn.commit()
    print("Manga table created successfully.")


def fetch_links_from_database():
    print("open DB")
    conn = sqlite3.connect(DB_NAME)
    print("successfully DB")
    cursor = conn.cursor()
    create_manga_table(conn)
    cursor.execute("SELECT link FROM links")
    links = cursor.fetchall()
    start_urls = [WEB_URL + link[0] for link in links]
    conn.close()
    print(start_urls)
    return start_urls


class Manga:
    def __init__(self, mangaLink, title, author, imageLink, description, categories, chapterLinks, createdAt):
        self.mangaLink = mangaLink
        self.title = title
        self.author = author
        self.imageLink = imageLink
        self.description = description
        self.categories = categories
        self.chapterLinks = chapterLinks
        self.createdAt = createdAt


class LinkSpider(scrapy.Spider):
    name = "link_spider"
    download_delay = 0
    start_urls = []

    def __init__(self):
        self.mangaList = []
        self.start_urls = fetch_links_from_database()

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
            mangaLink=manga_link,
            title=title,
            author=author,
            imageLink=image_link,
            description=description,
            categories=categories,
            chapterLinks=chapter_links,
            createdAt=created_at
        )
        self.mangaList.append(manga)

        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()

        cursor.execute(
            "SELECT mangaLink FROM manga WHERE mangaLink = ?", (manga_link,))
        existing_manga_link = cursor.fetchone()

        if not existing_manga_link:
            cursor.execute("""
                INSERT INTO manga (
                    mangaLink, title, author, imageLink, description,
                    categories, chapterLinks, createdAt
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                manga_link, title, author, image_link, description,
                ','.join(categories), ','.join(chapter_links), created_at
            ))
            conn.commit()

        conn.close()
