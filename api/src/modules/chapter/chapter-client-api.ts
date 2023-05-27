import { Response } from 'express';
import * as AWS from 'aws-sdk';
import createApp from '../../util/express-ap';
import createAuthenticatedHandler from '../../util/create-authenticated-handler';
import { RequestContext } from '../../util/request-context.type';
import { chapterService } from './chapter.service';

AWS.config.update({ region: process.env.API_REGION });
const app = createApp();

app.get('/client/chapter/:chapterLink', [
  async (req: RequestContext, res: Response) => {
    try {
      console.log(req.params.chapterLink);
      const chapter = await chapterService.get(req.params.chapterLink);
      res.json(chapter);
    } catch (error) {
      console.error(`Failed to get chapter: ${error}`);
      res.status(400).json({
        error: 'Failed to get chapter',
      });
    }
  },
]);

export const handler = createAuthenticatedHandler(app);
