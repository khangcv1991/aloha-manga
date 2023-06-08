import { ServiceObject } from '../../util/service-object';
import {
  getDynamodbConnection,
  getLocalDynamodbConnection,
  getRemotelDynamodbConnection,
} from '../../util/dynamodb';
import { Chapter } from '@shared/types/Chapter';

const dynamoDb = getDynamodbConnection();
const localDynamoDb = getLocalDynamodbConnection();
const remoteDynamoDb = getRemotelDynamodbConnection();

export const chapterService = new ServiceObject<Chapter>({
  dynamoDb: dynamoDb,
  objectName: 'Chapter',
  table: `${process.env.CHAPTER_TABLE}`,
  primaryKey: 'chapterId',
});

export const chapterLocalService = new ServiceObject<Chapter>({
  dynamoDb: localDynamoDb,
  objectName: 'Chapter',
  table: `${process.env.CHAPTER_TABLE}`,
  primaryKey: 'chapterId',
});

export const chapterRemoteService = new ServiceObject<Chapter>({
  dynamoDb: remoteDynamoDb,
  objectName: 'Chapter',
  table: `${process.env.CHAPTER_TABLE}`,
  primaryKey: 'chapterId',
});
