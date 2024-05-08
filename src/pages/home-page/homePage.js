import React, { useState, useEffect } from 'react';

import Header from '@Components/home/header/Header';
import Search from '@Components/home/search/Search';
import ImageContainer from '@Components/home/photosphere-module/ImageContainer';
import AboutUs from '@Components/home/about-us-module/ContainerAboutUs';
import OverviewContainer from '@Components/home/list-projects-module/OverViewContainer'; 

import styles from './homePage.module.css';

function HomePage() {
  const [name, setName] = useState('');

  useEffect(() => {
    (
      async () => {
        const response = await fetch('http://127.0.0.1:8000/user', {
          headers:{ 'Content-Type': 'application/json'},
          credentials: 'include'
        });

        const content = await response.json();

        console.log(content);

        setName(content.name);
      }
    )();
  });

  return (
    <div className={styles.mainContainer}>
        <Header name={name}/>
        <Search />
        <ImageContainer />
        <div className={styles.otherContainer}>
            <OverviewContainer />
            <AboutUs />
        </div>
    </div>
  );
}

export default HomePage;
