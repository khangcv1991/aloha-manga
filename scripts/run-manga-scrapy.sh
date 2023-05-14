#!/usr/bin/env bash

scrapy runspider ./python-scripts/fetchMangaDetail.py -a file_name=./scrapy-data/mangaLinks.json
