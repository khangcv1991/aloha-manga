import React, { useState } from 'react';
import styles from './category.module.scss';

export interface Category {
  id: string;
  title: string;
}

interface CategoryFilterProps {
  categories: Category[];
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
        {categories?.map((item) => (
          <li
            key={item.id}
            onClick={(): void => {
              onItemClick(item.id);
            }}
            className={
              selectedCategories?.has(item.id) ? styles.selectedItem : null
            }
          >
            {item.title}
          </li>
        ))}
      </ul>
    </>
  );
};
export default CategoryFilter;
