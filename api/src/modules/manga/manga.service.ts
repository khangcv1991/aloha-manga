import { ServiceObject } from '../../util/service-object';
import { getDynamodbConnection } from '../../util/dynamodb';

const dynamoDb = getDynamodbConnection();

export const postService = new ServiceObject<Manga>({
  dynamoDb: dynamoDb,
  objectName: 'Manga',
  table: `${process.env.POST_TABLE}`,
  primaryKey: 'mangaId',
});

// export const getPostBySlug = async (slug: string) => {
//   console.log(`Get ${postService.objectName} by slug [${slug}]`);
//   try {
//     const posts = await queryByKey<Post>({
//       dynamoDb: postService.dynamoDb,
//       table: postService.table,
//       keyName: 'slug',
//       keyValue: slug,
//       indexName: 'slug-index',
//     });

//     return posts[0];
//   } catch (error) {
//     const message = getErrorMessage(error);
//     console.error(
//       `Failed to get ${postService.objectName} by Slug: ${message}`,
//     );
//     throw new Error(message);
//   }
// };
