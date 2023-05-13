import os
import requests
import sqlite3
import ast
import threading

MANGA_FOLDER = 'manga'  # Global variable
DB_NAME = 'manga.db'


def download_image(url, file_path):
    response = requests.get(url)
    if response.status_code == 200:
        with open(file_path, 'wb') as file:
            file.write(response.content)
        print(f"Downloaded: {file_path}")
        return True
    else:
        print(f"Failed to download: {file_path}")
        return False


def create_folder(folder_name):
    folder_path = os.path.join(MANGA_FOLDER, folder_name)
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)


def update_image_record(conn, original_link, path):
    query = "INSERT INTO images (original_link, path) VALUES (?, ?)"
    conn.execute(query, (original_link, path))
    conn.commit()


def download_chapter(chapter_link, image_links):
    # Create folder
    folder_name = chapter_link.split('/')[-1].replace('-', '_')
    create_folder(folder_name)

    # Download and update image records
    for index, image_link in enumerate(image_links):
        file_name = f"{folder_name}/image{index+1}.jpg"
        file_path = os.path.join('manga', file_name)
        if download_image(image_link, file_path):
            update_image_record(conn, image_link, file_path)
            conn.execute("UPDATE chapters SET status = ? WHERE chapter_link = ?",
                         ("downloaded", chapter_link))
            conn.commit()


# Database connection
conn = sqlite3.connect(DB_NAME)
cursor = conn.cursor()

# Check if status column exists in chapters table
cursor.execute("PRAGMA table_info(chapters)")
table_info = cursor.fetchall()

status_column_exists = False
for column in table_info:
    if column[1] == 'status':
        status_column_exists = True
        break

# Add status column to chapters table if it does not exist
if not status_column_exists:
    cursor.execute("ALTER TABLE chapters ADD COLUMN status TEXT")
    conn.commit()

# Create images table if it does not exist
cursor.execute(
    "CREATE TABLE IF NOT EXISTS images (original_link TEXT, path TEXT, new_link TEXT)")

# Select records from chapters table
query = "SELECT chapter_link, image_links, status FROM chapters"
cursor.execute(query)
records = cursor.fetchall()
records = [records[0], records[1], records[2]]
# Iterate over records and download images

# Download chapters concurrently
threads = []
for record in records:
    chapter_link = record[0]
    image_links = ast.literal_eval(record[1])
    status = record[2]
    # Skip download if status is already set to "downloaded"
    if status == "downloaded":
        continue

    download_chapter(chapter_link, image_links)
