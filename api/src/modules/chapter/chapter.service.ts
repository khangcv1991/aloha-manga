import { ServiceObject } from '../../util/service-object';
import { getDynamodbConnection } from '../../util/dynamodb';
import { Chapter } from '@shared/types/Chapter';

const dynamoDb = getDynamodbConnection();

export const mangatService = new ServiceObject<Chapter>({
  dynamoDb: dynamoDb,
  objectName: 'Chapter',
  table: `${process.env.CHAPTER_TABLE}`,
  primaryKey: 'chapterLink',
});
