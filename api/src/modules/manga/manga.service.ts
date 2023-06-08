import { ServiceObject } from '../../util/service-object';
import {
  getDynamodbConnection,
  getLocalDynamodbConnection,
  getRemotelDynamodbConnection,
} from '../../util/dynamodb';
import { Manga } from '@shared/types/Manga';

const dynamoDb = getDynamodbConnection();
const localDynamoDb = getLocalDynamodbConnection();
const remoteDynamoDb = getRemotelDynamodbConnection();

export const mangatService = new ServiceObject<Manga>({
  dynamoDb: dynamoDb,
  objectName: 'Manga',
  table: `${process.env.MANGA_TABLE}`,
  primaryKey: 'mangaId',
});

export const localMangatService = new ServiceObject<Manga>({
  dynamoDb: localDynamoDb,
  objectName: 'Manga',
  table: `${process.env.MANGA_TABLE}`,
  primaryKey: 'mangaId',
});

export const remoteMangatService = new ServiceObject<Manga>({
  dynamoDb: remoteDynamoDb,
  objectName: 'Manga',
  table: `${process.env.MANGA_TABLE}`,
  primaryKey: 'mangaId',
});

export function containsWords(inputString: string, words: string[]) {
  const pattern = new RegExp(`\\b(${words.join('|')})\\b`, 'i');
  return pattern.test(inputString);
}
