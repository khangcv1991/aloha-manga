
from ...util.dynamodb import get_all, insert
from ...types.manga import Manga, map_data_to_manga
import os

table_name  = os.environ.get('MANGA_TABLE', '')
def insert_manga_system_service(manga: Manga):
    try:
        print(f"insert_manga_system_service {table_name}: {manga}")
        insert({'TableName': table_name}, manga)
    except  Exception as error:
        print(f"Failed to insert record: {error}")

def get_all_mangas_system_service()-> list:
    try:
        print(f"get_all_mangas_system_service {table_name} ")
        mangas = get_all({'TableName': table_name}, map_data_to_manga)
        return mangas
    except  Exception as error:
        print(f"Failed to insert record: {error}")