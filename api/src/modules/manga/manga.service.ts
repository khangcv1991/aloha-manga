import { ServiceObject } from '../../util/service-object';
import { getDynamodbConnection } from '../../util/dynamodb';
import { Manga } from '@shared/types/Manga';

const dynamoDb = getDynamodbConnection();

export const mangatService = new ServiceObject<Manga>({
  dynamoDb: dynamoDb,
  objectName: 'Manga',
  table: `${process.env.MANGA_TABLE}`,
  primaryKey: 'mangaLink',
});

export function containsWords(inputString: string, words: string[]) {
  const pattern = new RegExp(`\\b(${words.join('|')})\\b`, 'i');
  return pattern.test(inputString);
}
