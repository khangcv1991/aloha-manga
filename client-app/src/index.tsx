import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';
import { PageProvider } from './utils/PageContext';
import { MangaPage } from './pages/Manga';
import { ChapterPage } from './pages/Chapter';

ReactDOM.render(
  <React.StrictMode>
    <PageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manga/:mangaId" element={<MangaPage />} />
          <Route path="/chapter/:chapterId" element={<ChapterPage />} />
          <Route path="*" element={<Error errorCode={404} />} />
        </Routes>
      </BrowserRouter>
    </PageProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
