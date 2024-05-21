import React from 'react';

import styles from './homePage.module.scss';

import AboutUs from '@Components/home/aboutUsModule/containerAboutUs';
import Header from '@Components/home/header/header';
import ImageContainer from '@Components/home/photosphereContainer/photosphereContainer';
import OverviewContainer from '@Components/home/listProjectsModule/overViewContainer'; 
import Search from '@Components/home/search/search';

function HomePage() {

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
