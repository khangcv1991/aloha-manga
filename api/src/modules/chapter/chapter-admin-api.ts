import { Response } from 'express';
import * as AWS from 'aws-sdk';
import createApp from '../../util/express-ap';
import createAuthenticatedHandler from '../../util/create-authenticated-handler';
import { RequestContext } from '../../util/request-context.type';
import { chapterLocalService, chapterRemoteService } from './chapter.service';
import { Chapter } from '@shared/types/Chapter';
import { keyBy } from 'lodash-es';

AWS.config.update({ region: process.env.API_REGION });
const app = createApp();

app.get('/admin/chapter/sync', [
  async (req: RequestContext, res: Response) => {
    let updatedCount = 0;
    let createdCount = 0;
    let errorCount = 0;
    try {
      const localChapterList = await chapterLocalService.getAll();
      const remoteChapterList = await chapterRemoteService.getAll();
      const remoteChapterById = keyBy(remoteChapterList, 'chapterId');
      const filtedChapterList = localChapterList.filter(
        (item) => !remoteChapterById?.[item.chapterId],
      );

      console.log(`total chaptes: ${filtedChapterList.length}`);
      await Promise.all(
        filtedChapterList.map(async (localChapter) => {
          try {
            const chapter: Partial<Chapter> = {
              chapterLink: localChapter.chapterLink,
              chapterId: localChapter.chapterId,
              originalImageLinks: localChapter.originalImageLinks,
              imageLinks: localChapter.imageLinks,
              isDownload: localChapter.isDownload,
            };

            console.log(`creating: ${chapter.chapterLink}`);
            createdCount++;
            return chapterRemoteService.create(chapter);
          } catch (error) {
            errorCount++;
          }
        }),
      );

      res.json({
        created: createdCount,
        error: errorCount,
      });
    } catch (error) {
      console.error(`Failed to get chapter: ${error}`);
      res.status(400).json({
        error: 'Failed to get chapter',
      });
    }
  },
]);

export const handler = createAuthenticatedHandler(app);
