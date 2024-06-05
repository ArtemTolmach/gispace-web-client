import React from 'react';

import styles from './homePage.module.scss';

import AboutUs from '@Components/home/aboutUsModule/aboutUsModule';
import Header from '@Components/home/header/header';
import ImageContainer from '@Components/home/photosphereContainer/photosphereContainer';
import OverviewContainer from '@Components/home/listProjectsModule/listProjectsModule'; 
import Search from '@Components/home/search/search';

function HomePage() {

  document.body.style.overflowX= 'hidden';
  document.body.style.overflowY= 'auto';
  document.documentElement.style.height = "auto";

  return (
    <div className={styles.mainContainer}>
        <Header />
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
