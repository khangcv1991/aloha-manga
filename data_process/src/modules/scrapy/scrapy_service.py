from .link_spider import Hentai18LinkSpider
from .manga_spider import Hentai18MangaSpider
from .chapter_spider import Hentai18ChapterSpider


import scrapy
from scrapy.crawler import CrawlerProcess
from twisted.internet import reactor, defer

def crawl_links():
    # Create a CrawlerProcess and add the spider to it
    process = CrawlerProcess()
    process.crawl(Hentai18LinkSpider)

    # Start the crawling process
    process.start()

    # Return the scraped links
    return

def crawl_mangas():
    # Create a CrawlerProcess and add the spider to it
    process = CrawlerProcess()
    process.crawl(Hentai18MangaSpider)

    # Start the crawling process
    process.start()

    # Return the scraped links
    return

def crawl_chapters():
    # Create a CrawlerProcess and add the spider to it
    process = CrawlerProcess()
    process.crawl(Hentai18ChapterSpider)

    # Start the crawling process
    process.start()

    # Return the scraped links
    return