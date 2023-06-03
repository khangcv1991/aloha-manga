import React from 'react';
import styles from './SkeletonLoader.module.scss';

interface Props {
  className?: string;
}

const SkeletonLoader = (props: Props): JSX.Element => {
  const { className } = props;

  return <div className={`${styles.loading} ${className ?? ''}`} />;
};

export default SkeletonLoader;
