import React, { SetStateAction, useEffect, useState } from 'react';
import styles from './groupRadioButton.module.scss';

interface RadioButton {
  id: string;
  title: string;
}

interface GroupRadioButtonProps {
  radioButtons: RadioButton[];
  selectedButton: RadioButton;
  setSelectedButton: Function;
}

const DEFAULT_WIDTH = 150;
const CONTAINER_PADDING = 10;
const CONTAINER_MARGIN = 20;

const GroupRadioButton = (props: GroupRadioButtonProps): JSX.Element => {
  const { radioButtons, setSelectedButton, selectedButton } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedButton(radioButtons?.[0]);
  }, []);

  return (
    <div
      className={styles.container}
      style={{ margin: CONTAINER_MARGIN, padding: CONTAINER_PADDING }}
    >
      <div className={styles.tabContainer}>
        <ul className={styles.toggleRadio}>
          {radioButtons?.map((item, index) => (
            <li
              key={item.id}
              onClick={() => {
                setSelectedButton(item);
                setSelectedIndex(index);
              }}
              style={{ width: DEFAULT_WIDTH }}
            >
              <span> {item.title}</span>
            </li>
          ))}
          <li
            className={styles.optionSlider}
            style={{
              left: `${
                selectedIndex * DEFAULT_WIDTH +
                CONTAINER_MARGIN +
                CONTAINER_PADDING
              }px`,
              width: DEFAULT_WIDTH,
            }}
          ></li>
        </ul>
      </div>
    </div>
  );
};

export default GroupRadioButton;
