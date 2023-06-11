import React, { useContext, useRef, useState } from 'react';
import styles from './searchModal.module.scss';
import { PageContext } from '../../../utils/PageContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const SearchModal = (): JSX.Element => {
  const { mangaFilter, setMangaFilter } = useContext(PageContext);
  const [visible, setVisible] = useState(false);
  const inputRef = useRef(null);
  const toggle = () => {
    setVisible((pre) => !pre);
  };

  return (
    <>
      {visible && (
        <input
          className={styles.searchModalInput}
          ref={inputRef}
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

      <div className={styles.searchBarMobileContainer}>
        {visible ? (
          <div
            className={styles.searchModalContainer}
            onClick={() => {
              toggle();
            }}
          ></div>
        ) : (
          <div className={styles.searchButtonContainer}>
            <FontAwesomeIcon
              icon={faSearch}
              className={styles.item}
              size="xl"
              onClick={() => {
                if (visible) {
                  setMangaFilter({
                    ...mangaFilter,
                    searchName: '',
                  });
                }

                inputRef?.current?.focus();
                setVisible((prev) => {
                  return !prev;
                });
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};
