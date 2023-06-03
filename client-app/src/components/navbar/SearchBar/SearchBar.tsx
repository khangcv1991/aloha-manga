import React, { useContext, useState } from 'react';
import styles from './searchBar.module.scss';
import { PageContext } from '../../../utils/PageContext';

const SearchBar = (): JSX.Element => {
  const { mangaFilter, setMangaFilter } = useContext(PageContext);
  return (
    <>
      <div className={styles.searchBarContainer}>
        <input
          type="text"
          value={mangaFilter.searchName}
          onChange={(e) => {
            setMangaFilter({
              ...mangaFilter,
              searchName: e?.target?.value || '',
            });
          }}
        />

        <button onClick={() => {}}>Search</button>
      </div>
    </>
  );
};

export default SearchBar;
