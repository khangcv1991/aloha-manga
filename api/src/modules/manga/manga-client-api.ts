import { Response } from 'express';
import * as AWS from 'aws-sdk';
import createApp from '../../util/express-ap';
import createAuthenticatedHandler from '../../util/create-authenticated-handler';
import { RequestContext } from '../../util/request-context.type';
import { containsWords, mangatService } from './manga.service';
import { convertFilterStringToObject } from './manga.util';
import { Manga } from '@shared/types/Manga';
import { keyBy } from 'lodash-es';

AWS.config.update({ region: process.env.API_REGION });
const app = createApp();

app.get('/client/manga/list', [
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

app.get('/client/manga/filter/:filter', [
  async (req: RequestContext, res: Response) => {
    try {
      console.log(`get mangas by category ${req.params.filter}`);
      const filter = convertFilterStringToObject(req.params.filter);
      if (!filter) {
        res.json([]);
      }
      console.log(`Filter: ${JSON.stringify(filter)}`);

      const mangas = await mangatService.getAll();
      const mangaByMangaId = keyBy(mangas, 'mangaId');
      const mangaIdsByCategory: Record<string, string[]> = mangas.reduce(
        (currAcc, currVal: Manga) => {
          let tmpAcc = { ...currAcc };
          for (let category of currVal.categories) {
            const tmpList = tmpAcc[category] || [];
            tmpList.push(currVal.mangaId);
            tmpAcc[category] = tmpList;
          }
          return tmpAcc;
        },
        {},
      );

      let filtedMangas: Manga[] = [];
      if (filter?.searchName) {
        filtedMangas = mangas?.filter((manga) =>
          containsWords(manga.title, (filter?.searchName || '').split(' ')),
        );
      } else if (filter?.categories && filter.categories.length > 0) {
        const mangaIdList = [];

        for (let category of filter.categories) {
          mangaIdList.push(mangaIdsByCategory?.[category]);
        }

        const mangaSet = new Set<string>(mangaIdList.flat());
        filtedMangas = Array.from(mangaSet).map(
          (id: string) => mangaByMangaId[id],
        );
      }
      console.log(`found mangas: ${filtedMangas.length}`);
      res.json(filtedMangas || []);
    } catch (error) {
      console.error(`Failed to get manga: ${error}`);
      res.status(400).json({
        error: `Fail to get manga ${error}`,
      });
    }
  },
]);

export const handler = createAuthenticatedHandler(app);
