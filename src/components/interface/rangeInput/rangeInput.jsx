import React, { useEffect } from 'react';
import styles from './rangeInput.module.scss';

const RangeInput = ({ id, min, max, step, startValue, percent }) => {
  useEffect(() => {
    const rangeThumb = document.getElementById(`range-thumb-${id}`);
    const rangeNumber = document.getElementById(`range-number-${id}`);
    const rangeLine = document.getElementById(`range-line-${id}`);
    const rangeInput = document.getElementById(`range-input-${id}`);

    function rangeInputSlider() {
      rangeNumber.textContent = rangeInput.value;

      const thumbPosition = rangeInput.value / rangeInput.max;

      rangeThumb.style.left = `${thumbPosition * 90}%`;

      rangeLine.style.width = `${rangeInput.value * percent}%`;
    }

    rangeInputSlider();

    rangeInput.addEventListener('input', rangeInputSlider);

    return () => {
      rangeInput.removeEventListener('input', rangeInputSlider);
    };
  }, [id, min, max]);

  return (
    <div className={styles.range}>
      <div className={styles.rangeContent}>
        <div className={styles.rangeSlider}>
          <div className={styles.rangeSliderLine} id={`range-line-${id}`}></div>
        </div>

        <div className={styles.rangeThumb} id={`range-thumb-${id}`}>
          <div className={styles.rangeValue}>
            <span className={styles.rangeValueNumber} id={`range-number-${id}`}>
              {startValue}
            </span>
          </div>
        </div>

        <input
          type="range"
          className={styles.rangeInput}
          id={`range-input-${id}`}
          min={min}
          max={max}
          defaultValue={(max - min) / 2} // Set initial value to the middle of min and max
          step={step}
        />
      </div>
    </div>
  );
};

export default RangeInput;
