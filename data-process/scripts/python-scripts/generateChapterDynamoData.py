# import json
# import sqlite3
# import sys
# import ast

# DB_NAME = './scrapy-data/manga.db'
# WEB_URL = "https://hentai18.net"
# PARAM_URL = "/read-hentai/"
# file_path = sys.argv[1]
# # Initialize DynamoDB client


# def generate_dataseed_from_chapter_table():
#     # Replace 'your_database.db' with your actual database file
#     conn = sqlite3.connect(DB_NAME)
#     cursor = conn.cursor()
#     cursor.execute("SELECT * FROM chapters")
#     dataseed = []

#     for row in cursor.fetchall():
#         chapter_link, image_links, status = row

#         manga = {
#             "chapterId": chapter_link.replace(WEB_URL, '').replace(PARAM_URL, ''),
#             "chapterLink": WEB_URL + PARAM_URL,
#             "originalImageLinks": ast.literal_eval(image_links),
#         }

#         dataseed.append(manga)

#     conn.close()

#     return dataseed


# # Call the function to generate the data seed
# data_seed = generate_dataseed_from_chapter_table()


# # Create a list to store the formatted items
# items = []

# # Format each item in the data seed
# for item in data_seed:
#     formatted_item = {
#         'Item': {
#             'chapterId': {'S': item['chapterId']},
#             'chapterLink': {'S': item['chapterLink']},
#             'originalImageLinks': {'SS': item['originalImageLinks']}
#         }
#     }
#     items.append(formatted_item)

# with open(file_path, 'w') as file:
#     json.dump(items, file, indent=2)

import csv
import json
import sqlite3
import sys
import ast

DB_NAME = './scrapy-data/manga.db'
WEB_URL = "https://hentai18.net"
PARAM_URL = "/read-hentai/"
file_path = sys.argv[1]


def generate_dataseed_from_chapter_table():
    # Replace 'your_database.db' with your actual database file
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM chapters")
    dataseed = []

    for row in cursor.fetchall():
        chapter_link, image_links, status = row

        manga = {
            "chapterId": chapter_link.replace(WEB_URL, '').replace(PARAM_URL, ''),
            "chapterLink": WEB_URL + PARAM_URL,
            "originalImageLinks": ast.literal_eval(image_links),
        }

        dataseed.append(manga)

    conn.close()

    return dataseed


# Call the function to generate the data seed
data_seed = generate_dataseed_from_chapter_table()

# Create a list to store the formatted items
items = []

# Format each item in the data seed
for item in data_seed:
    formatted_item = {
        'chapterId': item['chapterId'],
        'chapterLink': item['chapterLink'],
        'originalImageLinks': json.dump(item['originalImageLinks'], ensure_ascii=False)
    }
    items.append(formatted_item)

# Save the data seed to a CSV file
with open(file_path, 'w', newline='') as file:
    writer = csv.DictWriter(
        file, fieldnames=['chapterId', 'chapterLink', 'originalImageLinks'])
    writer.writeheader()
    writer.writerows(items)
