import os
import scrapy
import json


class LinkSpider(scrapy.Spider):
    name = "link_spider"
    # Set the URL of the web page you want to extract links from
    start_urls = [
        'https://hentai18.net/genres/manhwa?page={}'.format(page) for page in range(1, 20)]
    download_delay = 1

    def __init__(self):
        self.links = []

    def parse(self, response):
        # Extract all links from the web page using the "a" HTML tag
        links = response.css('div.list_wrap a::attr(href)').getall()
        # Remove duplicate links
        links = list(set(links))
        # Remove links containing the word "chapter"
        links = [link for link in links if "chapter" not in link.lower()]
        # Create a list of dictionaries to store each link and its associated data
        link_data = []
        for link in links:
            link_data.append({'link': link})

        self.links += link_data

    def closed(self, reason):
        file_name = './scrapy-data/mangaLinks.json'
        # Write the link data to a JSON file
        with open(file_name, 'w') as f:
            json.dump(self.links, f)
