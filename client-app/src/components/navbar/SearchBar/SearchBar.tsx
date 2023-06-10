import React, { useContext, useState } from 'react';
import styles from './searchBar.module.scss';
import { PageContext } from '../../../utils/PageContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = (): JSX.Element => {
  const { mangaFilter, setMangaFilter } = useContext(PageContext);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
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
