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

# Save the data seed to a JSON file
with open(file_path, 'w') as file:
    json.dump(data_seed, file, indent=2)
