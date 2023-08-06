from datetime import datetime
import os
import sqlite3
import scrapy
import json

DB_NAME = './scrapy-data/manga.db'
WEB_URL = "https://hentai18.net"


class Link:
    def __init__(self, link):
        self.link = link


def insert_link_if_not_exists(link, conn):
    cursor = conn.cursor()

    # Create links table if it does not exist
    cursor.execute(
        "CREATE TABLE IF NOT EXISTS links (link TEXT, createdAt TEXT)")

    # Check if the link already exists in the table
    cursor.execute("SELECT link FROM links WHERE link = ?", (link,))
    existing_link = cursor.fetchone()

    if not existing_link:
        # Insert the link into the table
        created_at = datetime.now().isoformat()
        cursor.execute(
            "INSERT INTO links (link, createdAt) VALUES (?, ?)", (link, created_at))
        conn.commit()
        print("Link inserted successfully. {link}")
    else:
        print("Link already exists.")


class LinkSpider(scrapy.Spider):
    name = "link_spider"
    # Set the URL of the web page you want to extract links from
    start_urls = [
        'https://hentai18.net/genres/manhwa?page={}'.format(page) for page in range(1, 20)]
    download_delay = 1

    def __init__(self):
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        cursor.execute(
            "CREATE TABLE IF NOT EXISTS links (link TEXT, createdAt TEXT)")
        conn.close()

    def parse(self, response):
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        # Extract all links from the web page using the "a" HTML tag
        links = response.css('div.list_wrap a::attr(href)').getall()
        # Remove duplicate links
        links = list(set(links))
        # Remove links containing the word "chapter"
        links = [link for link in links if "chapter" not in link.lower()]
        # Create a list of dictionaries to store each link and its associated data
        for link in links:
            insert_link_if_not_exists(WEB_URL + link, conn)

        conn.close()
