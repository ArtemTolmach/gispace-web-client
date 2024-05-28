import React from 'react';

import styles from './containerAboutUs.module.scss'

import steps from '@Assets/images/steps.png'

const AboutUsContainer = () => {
  return (
    <div className={styles.aboutUsContainer}>
      <a className={styles.caption} id="about-us">О Нас</a>
      <div className={styles.describeGispy}>GuideIn Space — это социальная сеть для пространств и мест,
        позволяющая пользователям погрузиться в уникальные места со всего мира, с помощью виртуальных туров на основе технологии 360° фотосфер.
        <br />
        <p>От культурных объектов и природных чудес до городских пейзажей и музеев,
        GISPACE предоставляет возможность исследовать разнообразные места прямо из дома или офиса, используя только телефон или компьютер.</p>
      </div>
      <img draggable="false" className={styles.imgSteps} src={steps} alt="Steps" />
    </div>
  );
}

export default AboutUsContainer;
