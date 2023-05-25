import { Response } from 'express';
import * as AWS from 'aws-sdk';
import createApp from '../../util/express-ap';
import createAuthenticatedHandler from '../../util/create-authenticated-handler';
import { RequestContext } from '../../util/request-context.type';
import { mangatService } from './chapter.service';

AWS.config.update({ region: process.env.API_REGION });
const app = createApp();

app.get('/client/chapter/list', [
  async (req: RequestContext, res: Response) => {
    try {
      const mangas = await mangatService.getAll();
      console.log(mangas.length);
      res.json(mangas);
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
      const manga = await mangatService.get(req.params.mangaId);
      res.json(manga);
    } catch (error) {
      console.error(`Failed to get manga: ${error}`);
      res.status(400).json({
        error: 'Failed to get manga',
      });
    }
  },
]);

export const handler = createAuthenticatedHandler(app);
