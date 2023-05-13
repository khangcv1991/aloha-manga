#!/usr/bin/env bash

scrapy runspider ./python-scripts/fetchChapterDetails.py -a file_name=./scrapy-data/chapterLinks.json
