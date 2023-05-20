import { Response } from 'express';
import * as AWS from 'aws-sdk';
import createApp from '../../util/express-ap';
import createAuthenticatedHandler from '../../util/create-authenticated-handler';
import { RequestContext } from '../../util/request-context.type';

AWS.config.update({ region: process.env.API_REGION });
const app = createApp();

app.get('/client/manga/list', [
  async (req: RequestContext, res: Response) => {
    try {
      res.json({});
    } catch (error) {
      console.error(`Failed to get posts: ${error}`);
      res.status(400).json({
        error: 'Failed to get mangas',
      });
    }
  },
]);

app.get('/client/manga/:mangaId', [
  async (req: RequestContext, res: Response) => {
    try {
      res.json({});
    } catch (error) {
      console.error(`Failed to get post: ${error}`);
      res.status(400).json({
        error: 'Failed to get post',
      });
    }
  },
]);

// app.get('/client/manga/slug/:slug', [
//   isClient,
//   async (req: RequestContext, res: Response) => {
//     try {
//       res.json(postMapper({}));
//     } catch (error) {
//       console.error(`Failed to get post by slug: ${error}`);
//       res.status(400).json({
//         error: 'Failed to get post by slug',
//       });
//     }
//   },
// ]);

// app.get('/client/manga/:postId/tags', [
//   isClient,
//   async (req: RequestContext, res: Response) => {
//     try {
//       const post = await postService.get(req.params.postId);
//       if (post) {
//         const links = await getLinksByPrimary(`POST|${post.postId}`);
//         const tagIds = links.map((link) => link.objectSecondary.split('|')[1]);
//         const tags = await tagService.batchGet(tagIds);
//         const formattedTags = tags.map(tagMapper);
//         res.json(formattedTags);
//       } else {
//         res.status(404).json({ error: 'Post not found' });
//       }
//     } catch (error) {
//       const message = getErrorMessage(error);
//       console.error(`Failed to get tags: ${message}`);
//       res.status(400).json({
//         error: 'Failed to get tags',
//       });
//     }
//   },
// ]);

export const handler = createAuthenticatedHandler(app);
