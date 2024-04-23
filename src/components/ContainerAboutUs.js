import React from 'react';
import steps from "../assets/images/steps.png";

const AboutUsContainer = () => {
  return (
    <div className="about-us-container">
      <a className="caption" id="about-us">О Нас</a>
      <a className="describe-gispy">GuideIn Space — это социальная сеть для пространств и мест,
        позволяющая пользователям погрузиться в уникальные места со всего мира, с помощью виртуальных туров на основе технологии 360° фотосфер.
        <br />
        <p>От культурных объектов и природных чудес до городских пейзажей и музеев,
        GISPACE предоставляет возможность исследовать разнообразные места прямо из дома или офиса, используя только телефон или компьютер.</p>
      </a>
      <img className="img-steps" src={steps} alt="Steps" />
    </div>
  );
}

export default AboutUsContainer;
