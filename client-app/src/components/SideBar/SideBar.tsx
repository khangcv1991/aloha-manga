import React, { useContext, useEffect, useState } from 'react';
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
import { PAGE_STAGE, PageContext } from '../../utils/PageContext';

interface SideBarProps {
  className?: string;
  isVertical?: boolean;
}

enum SIDE_BAR {
  HOME = 'home',
  FAVORIT = 'favorit',
  HISTORY = 'history',
  NOTIFICATION = 'notification',
  SING_GIN = 'login',
  SIGN_OUT = 'logout',
}

const ITEM_HEIGHT = 74;

export const SideBar = (props: SideBarProps) => {
  const { className, isVertical = true } = props;
  const [selItem, setSelItem] = useState<string>();
  const [position, setPosition] = useState(0);
  const navigation = useNavigate();
  const { setPageStage, pageStage } = useContext(PageContext);

  useEffect(() => {
    switch (pageStage) {
      case PAGE_STAGE.FAVORIT:
        setSelItem(SIDE_BAR.FAVORIT);
        setPageStage(PAGE_STAGE.FAVORIT);
        setPosition(1 * ITEM_HEIGHT);
        break;
      default:
        setSelItem(SIDE_BAR.HOME);
        setPageStage(PAGE_STAGE.HOME);
        setPosition(0);
    }
  }, []);
  return (
    <>
      <div
        className={
          isVertical
            ? `${styles.sideBarVerticalContainder} ${className}`
            : `${styles.sideBarHorizontalContainder} ${className}`
        }
      >
        {isVertical && <FontAwesomeIcon icon={faBars} size="xl" />}
        <div className={`${styles.itemListContainer} ${styles.hidden}`}>
          <div
            className={
              selItem === SIDE_BAR.HOME
                ? styles.selSideBarItemContainer
                : styles.sideBarItemContainer
            }
            onClick={() => {
              setSelItem(SIDE_BAR.HOME);
              setPosition(0);
              setPageStage(PAGE_STAGE.HOME);
              navigation('/');
            }}
          >
            <FontAwesomeIcon icon={faHome} className={styles.item} size="xl" />
          </div>

          <div
            className={
              selItem === SIDE_BAR.FAVORIT
                ? styles.selSideBarItemContainer
                : styles.sideBarItemContainer
            }
            onClick={() => {
              setSelItem(SIDE_BAR.FAVORIT);
              setPosition(1 * ITEM_HEIGHT);
              setPageStage(PAGE_STAGE.FAVORIT);
              navigation('/favorit');
            }}
          >
            <FontAwesomeIcon icon={faStar} className={styles.item} size="xl" />
          </div>
          <div
            className={
              selItem === SIDE_BAR.HISTORY
                ? styles.selSideBarItemContainer
                : styles.sideBarItemContainer
            }
            onClick={() => {
              setSelItem(SIDE_BAR.HISTORY);
              setPosition(2 * ITEM_HEIGHT);
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
              selItem === SIDE_BAR.NOTIFICATION
                ? styles.selSideBarItemContainer
                : styles.sideBarItemContainer
            }
            onClick={() => {
              setSelItem(SIDE_BAR.NOTIFICATION);
              setPosition(3 * ITEM_HEIGHT);
            }}
          >
            <FontAwesomeIcon icon={faBell} className={styles.item} size="xl" />
          </div>
          <div
            className={
              selItem === SIDE_BAR.SING_GIN
                ? styles.selSideBarItemContainer
                : styles.sideBarItemContainer
            }
            onClick={() => {
              setSelItem(SIDE_BAR.SING_GIN);
              setPosition(4 * ITEM_HEIGHT);
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
          <div className={styles.floatItem} style={{ top: position }}></div>
        </div>
      </div>
    </>
  );
};
