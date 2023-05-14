import ast
import os
import requests
import sqlite3
import sys
import time

FOLDER_NAME = 'manga'
DB_NAME = 'manga.db'

start_index = sys.argv[1]
batch_size = sys.argv[2]


def download_image(url, file_path):
    max_retries = 10
    retries = 0

    while retries < max_retries:
        response = requests.get(url)
        if response.status_code == 200:
            with open(file_path, 'wb') as file:
                file.write(response.content)
            print(f"Downloaded: {file_path}")
            return True
        else:
            retries += 1
            print(
                f"Failed to download: {file_path}. Retrying ({retries}/{max_retries})...")
            time.sleep(1)  # Add a delay between retries (optional)

    print(f"Failed to download after {max_retries} attempts: {file_path}")
    return False


def create_folder(folder_name):
    folder_path = os.path.join(FOLDER_NAME, folder_name)
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)


def update_image_record(conn, original_link, path):
    query = "INSERT INTO images (original_link, path) VALUES (?, ?)"
    conn.execute(query, (original_link, path))
    conn.commit()


def update_chapter_record(conn, chapter_link, status):
    conn.execute("UPDATE chapters SET status = ? WHERE chapter_link = ?",
                 (status, chapter_link))
    conn.commit()


def process_record(record):
    total_file_size = 0
    chapter_link = record[0]
    image_links = ast.literal_eval(record[1])
    status = record[2]
    # Skip download if status is already set to "downloaded"
    if status == "downloaded":
        return
    # Create folder
    folder_name = chapter_link.split('/')[-1].replace('-', '_')
    create_folder(folder_name)
    # Download and update image records
    for index, image_link in enumerate(image_links):
        file_name = f"{folder_name}/image{index+1}.jpg"
        file_path = os.path.join(FOLDER_NAME, file_name)
        if download_image(image_link, file_path):
            file_size = os.path.getsize(file_path)
            total_file_size += file_size
            update_image_record(conn, image_link, file_path)
        else:
            update_chapter_record(conn, chapter_link, 'fail')
            return total_file_size

    update_chapter_record(conn, chapter_link, 'downloaded')

    return total_file_size


# Database connection
conn = sqlite3.connect(DB_NAME)
cursor = conn.cursor()

# Create images table if it does not exist
cursor.execute(
    "CREATE TABLE IF NOT EXISTS images (original_link TEXT, path TEXT, new_link TEXT)")

# Select records from chapters table
# Modify the limit as needed
query = "SELECT chapter_link, image_links, status FROM chapters LIMIT ? OFFSET ?"
cursor.execute(query, (batch_size, start_index))
records = cursor.fetchall()
# Process records concurrently
total_file_size = 0

for record in records:
    print(f"Downloading: {record[0]}")
    record_size = process_record(record)
    total_file_size += record_size if record_size is not None else 0
    print(f"total_file_size: {total_file_size}")

    if total_file_size >= 150 * 1024 * 1024 * 1024:
        print('hit the 150GB storage')
        conn.close()
        exit()

# Close database connection
conn.close()
