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
      <div className={styles.searchBarMobileContainer}>
        <div className={styles.searchButtonContainer}>
          {isSearchVisible && (
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
          )}
          <FontAwesomeIcon
            icon={faSearch}
            className={styles.item}
            size="xl"
            onClick={() => {
              if (isSearchVisible) {
                setMangaFilter({
                  ...mangaFilter,
                  searchName: '',
                });
              }
              setIsSearchVisible((prev) => !prev);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default SearchBar;
