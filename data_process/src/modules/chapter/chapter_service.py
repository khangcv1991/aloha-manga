
from ...util.dynamodb import get_all, insert
from ...types.chapter import Chapter, map_data_to_chapter
import os

table_name  = os.environ.get('CHAPTER_TABLE', '')

def insert_chapter_system_service(chapter: Chapter):
    try:
        print(f"insert_chapter_system_service {table_name}: {chapter}")
        insert({'TableName': table_name}, chapter)
    except  Exception as error:
        print(f"Failed to insert record: {error}")

def get_all_chapters_system_service():
    try:
        print(f"get_all_chapters_system_service {table_name} ")
        chapters = get_all({'TableName': table_name}, map_data_to_chapter)
        return chapters

    except  Exception as error:
        print(f"Failed to insert record: {error}")