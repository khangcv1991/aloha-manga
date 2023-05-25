import { ServiceObject } from '../../util/service-object';
import { getDynamodbConnection } from '../../util/dynamodb';
import { Manga } from '@shared/types/Manga';

const dynamoDb = getDynamodbConnection();

export const mangatService = new ServiceObject<Chapter>({
  dynamoDb: dynamoDb,
  objectName: 'Manga',
  table: `${process.env.MANGA_TABLE}`,
  primaryKey: 'mangaId',
});
