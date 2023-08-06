
from ...util.dynamodb import get_all, insert
from ...types.manga_link import MangaLink, map_data_to_manga_link
import os

table_name  = os.environ.get('MANGA_LINKS_TABLE', '')
def insert_link_system_service(link: MangaLink):
    try:
        print(f"insert_link_system_service {table_name}")
        print(link)
        insert({'TableName': table_name}, link)

    except  Exception as error:
        print(f"Failed to insert record: {error}")

def get_all_links_system_service():
    try:
        print(f"get_all_links_system_service {table_name} ")
        links = get_all({'TableName': table_name}, map_data_to_manga_link)
        print(f"get_all_links_system_service:  {links}")
        return links

    except  Exception as error:
        print(f"Failed to insert record: {error}")