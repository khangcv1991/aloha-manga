import json
import sqlite3
import sys

DB_NAME = './scrapy-data/manga.db'
WEB_URL = "https://hentai18.net"
PARAM_URL = "/read-hentai/"
file_path = sys.argv[1]


def generate_dataseed_from_manga_table():
    # Replace 'your_database.db' with your actual database file
    conn = sqlite3.connect(DB_NAME)

    cursor = conn.cursor()
    cursor.execute("SELECT * FROM manga")

    dataseed = []

    for row in cursor.fetchall():
        mangaLink, title, author, imageLink, description, categories, chapterLinks, createdAt = row

        manga = {
            "mangaId": mangaLink.replace(WEB_URL, '').replace(PARAM_URL, ''),
            "mangaLink": WEB_URL + PARAM_URL,
            "title": title,
            "author": author,
            "description": description,
            "categories": [category.strip() for category in categories.split(",") if category.strip()],
            "imageLink": imageLink,
            "chapterLinks": [chapterLink.replace(WEB_URL, '').replace(PARAM_URL, '') for chapterLink in chapterLinks.split(",")],
            "createdAt": createdAt
        }

        dataseed.append(manga)

    conn.close()

    return dataseed


# Call the function to generate the data seed
data_seed = generate_dataseed_from_manga_table()

# Save the data seed to a JSON file
with open(file_path, 'w') as file:
    json.dump(data_seed, file, indent=2)
