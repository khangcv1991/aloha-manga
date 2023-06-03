import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from 'react';
import styles from './category.module.scss';
import { PageContext } from '../../../utils/PageContext';
import SkeletonLoader from '../../SkeletonLoader/SkeletonLoader';

interface CategoryFilterProps {
  categories: string[];
  isMutiSelect: boolean;
}

const CategoryFilter = (props: CategoryFilterProps) => {
  const { categories, isMutiSelect } = props;
  const containerRef = useRef(null);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set<string>(['all']),
  );
  const { mangaFilter, setMangaFilter, isMangaListLoading } =
    useContext(PageContext);
  const [leftPostion, setLeftPosition] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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
      setMangaFilter({
        ...mangaFilter,
        ['categories']: Array.from(newSelectedCategories),
      });
    } else {
      newSelectedCategories.add(itemId);
      setSelectedCategories(newSelectedCategories);
      setMangaFilter({
        ...mangaFilter,
        ['categories']: Array.from(newSelectedCategories),
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    console.log(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsDragging(false);
    console.log(false);
  };

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartX(event.clientX);
    setScrollLeft(containerRef.current.scrollLeft);

    // Prevent text selection during dragging
    event.preventDefault();
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;

    const x = event.clientX;
    const scrollOffset = x - startX;
    // containerRef.current.scrollLeft = scrollLeft - scrollOffset;
    // setLeftPosition((prev) => (prev > 0 ? 0 : prev + scrollOffset));
    if (isDragging && isHovered) {
      console.log(
        `leftPosition - scrollOffset: ${leftPostion} ${scrollOffset}`,
      );

      setLeftPosition((prev) => {
        if (prev + scrollLeft > 0) {
          // setLeftPosition(leftPostion + scrollLeft / 20);
          return 0;
        } else if (prev + scrollLeft < -1 * containerRef.current.offsetWidth) {
          return -1 * containerRef.current.offsetWidth;
        } else {
          return prev + scrollLeft / 20;
        }
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    const deltaX = event.deltaX;
    const deltaY = event.deltaY;
    containerRef.current.scrollLeft + deltaX + deltaY;
    // if (isHovered) {
    //   setLeftPosition((prev) => (prev > 0 ? 0 : prev + deltaX + deltaY));
    // }
  };

  return (
    <>
      <div
        className={styles.container}
        ref={containerRef}
        onWheel={handleMouseScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* <div className={styles.leftArrow}> {'<'} </div> */}
        <ul
          style={{ left: leftPostion }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isMangaListLoading ? (
            Array(10)
              .fill({})
              .map((item) => <SkeletonLoader className={styles.itemLoader} />)
          ) : (
            <>
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
                    selectedCategories?.has(category)
                      ? styles.selectedItem
                      : null
                  }
                >
                  {category}
                </li>
              ))}
            </>
          )}
        </ul>

        {/* <div className={styles.rightArrow}> {'>'} </div> */}
      </div>
    </>
  );
};
export default CategoryFilter;
