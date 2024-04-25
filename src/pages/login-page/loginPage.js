import React from 'react';

import LoginModal from '@Components/login/login-modal/loginModal';
import ImageContainer from '@Components/login/photosphere-module/ImageContainer';

import styles from './loginPage.module.css';

function LoginPage() {
  
  return (
    <div className={styles.mainContainer}>
        <ImageContainer />
        <a className={styles.logo} href="#">Gispace</a>
        <LoginModal />
    </div>
  );
}

export default LoginPage;
