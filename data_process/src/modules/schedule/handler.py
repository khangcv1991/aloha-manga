import json
import os
import boto3

from ...types.manga_link import MangaLinkEncoder
from ..manga_link.manga_link_service import get_all_links_system_service
from ..manga.manga_service import get_all_mangas_system_service
from ..chapter.chapter_service import get_all_chapters_system_service


from ..scrapy.scrapy_service import crawl_links, crawl_mangas,crawl_chapters

from ...types.manga import map_data_to_manga
from ...types.manga import MangaEncoder
from ...types.chapter import ChapterEncoder
from ...util.dynamodb import get_all

# from ../util.service_object import ServiceObject

# remote_dynamodb = get_remote_dynamodb_connection()
table_name = 'manga-aloha-manga-dev'
# manga_service_object = ServiceObject(table=table_name, objectName='Manga',dynamodb=remote_dynamodb)

def handler(event, context):
        
    # dynamodb = boto3.client('dynamodb')
    print(table_name)

    # manga_list = get_all({'TableName': table_name}, map_data_to_manga)
    # crawl_links()
    # links = get_all_links_system_service()
    # json_data = json.dumps(links, cls=MangaLinkEncoder, indent=4)

    # crawl_mangas()
    # mangas = get_all_mangas_system_service()
    # json_data = json.dumps(mangas, cls=MangaEncoder, indent=4)

    crawl_chapters()
    chapters = get_all_chapters_system_service()
    json_data = json.dumps(chapters, cls=ChapterEncoder, indent=4)

    response = {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': json_data 
    }

    return response