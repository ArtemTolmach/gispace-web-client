import React from 'react';
import { Link } from "react-router-dom";

import styles from './loginPage.module.scss';

import ImageContainer from '@Components/login/photosphereContainer/photosphereContainer';
import LoginModal from '@Components/login/loginModal/loginModal';

function LoginPage() {

  document.body.style.overflow = "hidden";
  document.documentElement.style.height = "100vh";
  
  return (
    <div className={styles.mainContainer}>
        <ImageContainer />
        <Link className={styles.logo} to="/">Gispace</Link>
        <LoginModal />
    </div>
  );
}

export default LoginPage;
