import React, { useState } from 'react';
import styles from './category.module.scss';

interface CategoryFilterProps {
  categories: string[];
  isMutiSelect: boolean;
}

const CategoryFilter = (props: CategoryFilterProps) => {
  const { categories, isMutiSelect } = props;
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set<string>(['all']),
  );

  const onItemClick = (itemId: string) => {
    const newSelectedCategories = new Set(
      isMutiSelect ? selectedCategories : [],
    );

    if (isMutiSelect) {
      if (newSelectedCategories.has(itemId)) {
        newSelectedCategories.delete(itemId);
      } else {
        newSelectedCategories.add(itemId);
      }
      setSelectedCategories(newSelectedCategories);
    } else {
      newSelectedCategories.add(itemId);
      setSelectedCategories(newSelectedCategories);
    }
  };

  return (
    <>
      <ul className={styles.categoryFilter}>
        <li
          key="all"
          onClick={(): void => {
            onItemClick('all');
          }}
          className={
            selectedCategories?.has('all') ? styles.selectedItem : null
          }
        >
          All
        </li>
        {categories?.map((category) => (
          <li
            key={category}
            onClick={(): void => {
              onItemClick(category);
            }}
            className={
              selectedCategories?.has(category) ? styles.selectedItem : null
            }
          >
            {category}
          </li>
        ))}
      </ul>
    </>
  );
};
export default CategoryFilter;
