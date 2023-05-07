import React, { useState } from 'react';
import styles from './searchBar.module.scss';

const SearchBar = (): JSX.Element => {
  const [searchText, setSearchText] = useState<string>();

  return (
    <>
      <div className={styles.searchBarContainer}>
        <input
          type="text"
          onChange={(e) => {
            setSearchText(e?.target?.value || '');
          }}
        />

        <button onClick={() => {}}>
            Search
        </button>
      </div>
    </>
  );
};

export default SearchBar;
