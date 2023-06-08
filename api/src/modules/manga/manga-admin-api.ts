import { Response } from 'express';
import * as AWS from 'aws-sdk';
import createApp from '../../util/express-ap';
import createAuthenticatedHandler from '../../util/create-authenticated-handler';
import { RequestContext } from '../../util/request-context.type';
import {
  containsWords,
  localMangatService,
  remoteMangatService,
} from './manga.service';
import { convertFilterStringToObject } from './manga.util';
import { Manga } from '@shared/types/Manga';
import { keyBy } from 'lodash-es';

AWS.config.update({ region: process.env.API_REGION });
const app = createApp();

app.get('/admin/manga/sync', [
  async (req: RequestContext, res: Response) => {
    let updatedCount = 0;
    let createdCount = 0;
    let errorCount = 0;

    try {
      const localMangaList = await localMangatService.getAll();

      localMangaList.forEach(async (localManga) => {
        try {
          console.log(`mangaId: ${localManga.mangaId}`);
          const exstingRemoteManga = await remoteMangatService.get(
            localManga.mangaLink,
          );

          const manga: Partial<Manga> = {
            mangaLink: localManga.mangaLink,
            mangaId: localManga.mangaId,
            title: localManga.title,
            author: localManga.author,
            description: localManga.description,
            categories: localManga.categories,
            chapterLinks: localManga.chapterLinks,
            imageLink: localManga.imageLink,
          };

          if (exstingRemoteManga) {
            await remoteMangatService.create(manga);
            console.log(`creating: ${localManga.title}`);
            createdCount++;
          } else {
            await remoteMangatService.update(manga);
            console.log(`updating: ${localManga.title}`);
            updatedCount++;
          }
        } catch (error) {
          errorCount++;
        }
      });

      res.json({
        updated: updatedCount,
        created: createdCount,
        error: errorCount,
      });
    } catch (error) {
      console.error(`Failed to sync mangas: ${error}`);
      res.status(400).json({
        error: 'Failed to sync mangas',
      });
    }
  },
]);

export const handler = createAuthenticatedHandler(app);
