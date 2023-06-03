import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faHome,
  faStar,
  faUserClock,
  faSignIn,
  faSignOut,
  faMessage,
  faRing,
  faBell,
} from '@fortawesome/free-solid-svg-icons';
import styles from './sideBar.module.scss';
import { useNavigate } from 'react-router-dom';

interface SideBarProps {
  className?: string;
}

enum SLIDE_BAR {
  HOME = 'home',
  FAVORIT = 'favorit',
  HISTORY = 'history',
  NOTIFICATION = 'notification',
  SING_GIN = 'login',
  SIGN_OUT = 'logout',
}

const ITEM_HEIGHT = 74;

export const SideBar = (props: SideBarProps) => {
  const { className } = props;
  const [selItem, setSelItem] = useState(SLIDE_BAR.HOME);
  const [topPosition, setTopPosition] = useState(0);
  const navigation = useNavigate();

  return (
    <>
      <div className={`${styles.sideBarContainder} ${className}`}>
        <FontAwesomeIcon icon={faBars} size="xl" />
        <div className={styles.itemListContainer}>
          <div
            className={
              selItem === SLIDE_BAR.HOME
                ? styles.selSideBarItemContainer
                : styles.sideBarItemContainer
            }
            onClick={() => {
              setSelItem(SLIDE_BAR.HOME);
              setTopPosition(0);
              navigation('/');
            }}
          >
            <FontAwesomeIcon icon={faHome} className={styles.item} size="xl" />
          </div>
          <div
            className={
              selItem === SLIDE_BAR.FAVORIT
                ? styles.selSideBarItemContainer
                : styles.sideBarItemContainer
            }
            onClick={() => {
              setSelItem(SLIDE_BAR.FAVORIT);
              setTopPosition(1 * ITEM_HEIGHT);
            }}
          >
            <FontAwesomeIcon icon={faStar} className={styles.item} size="xl" />
          </div>
          <div
            className={
              selItem === SLIDE_BAR.HISTORY
                ? styles.selSideBarItemContainer
                : styles.sideBarItemContainer
            }
            onClick={() => {
              setSelItem(SLIDE_BAR.HISTORY);
              setTopPosition(2 * ITEM_HEIGHT);
            }}
          >
            <FontAwesomeIcon
              icon={faUserClock}
              className={styles.item}
              size="xl"
            />
          </div>
          <div
            className={
              selItem === SLIDE_BAR.NOTIFICATION
                ? styles.selSideBarItemContainer
                : styles.sideBarItemContainer
            }
            onClick={() => {
              setSelItem(SLIDE_BAR.NOTIFICATION);
              setTopPosition(3 * ITEM_HEIGHT);
            }}
          >
            <FontAwesomeIcon icon={faBell} className={styles.item} size="xl" />
          </div>
          <div
            className={
              selItem === SLIDE_BAR.SING_GIN
                ? styles.selSideBarItemContainer
                : styles.sideBarItemContainer
            }
            onClick={() => {
              setSelItem(SLIDE_BAR.SING_GIN);
              setTopPosition(4 * ITEM_HEIGHT);
            }}
          >
            <FontAwesomeIcon
              icon={faSignIn}
              className={styles.item}
              size="xl"
            />
          </div>
          {/* <div className={styles.sideBarItemContainer}>
            <FontAwesomeIcon
              icon={faSignOut}
              className={styles.item}
              size="xl"
            />
          </div> */}
          <div className={styles.floatItem} style={{ top: topPosition }}></div>
        </div>
      </div>
    </>
  );
};
