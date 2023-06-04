import React, { useState, useEffect } from 'react';
import styles from './imageLoader.module.scss'; // Import CSS file for styling
import SkeletonLoader from '../SkeletonLoader/SkeletonLoader';
interface ImageLoaderProps {
  src: string;
  alt?: string;
  className?: string;
}

const ImageLoader = (props: ImageLoaderProps) => {
  const { src, alt, className } = props;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      setIsLoading(false);
    };

    return () => {
      image.onload = null; // Cleanup function
    };
  }, [src]);

  return (
    <div className={styles.imageLoaderContainer}>
      {isLoading ? (
        <SkeletonLoader className={styles.imageLoader} />
      ) : (
        <img src={src} alt={alt} />
      )}
    </div>
  );
};

export default ImageLoader;
