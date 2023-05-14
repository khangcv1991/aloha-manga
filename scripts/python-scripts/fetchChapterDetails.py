import os
import requests
import sqlite3


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
    folder_path = os.path.join('scrapy-data', folder_name)
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)


def update_image_record(conn, original_link, path, new_link):
    query = "INSERT INTO images (original_link, path, new_link) VALUES (?, ?, ?)"
    conn.execute(query, (original_link, path, new_link))
    conn.commit()


# Database connection
conn = sqlite3.connect('./scrapy-data/manga.db')
cursor = conn.cursor()

# Create images table if it does not exist
cursor.execute(
    "CREATE TABLE IF NOT EXISTS images (original_link TEXT, path TEXT, new_link TEXT)")

# Select records from chapters table
query = "SELECT chapter_link, image_links FROM chapters"
cursor.execute(query)
records = cursor.fetchall()

# Iterate over records and download images
index = 1
for record in records:
    if index == 2:
        break
    chapter_link = record[0]
    image_links = record[1]

    # Create folder
    folder_name = chapter_link.split('/')[-1].replace('-', '_')
    create_folder(folder_name)

    # Download and update image records
    for index, image_link in enumerate(image_links):
        file_name = f"{folder_name}/image{index+1}.jpg"
        if download_image(image_link, file_name):
            update_image_record(conn, image_link, file_name,
                                'new_link_placeholder')

# Close database connection
conn.close()
