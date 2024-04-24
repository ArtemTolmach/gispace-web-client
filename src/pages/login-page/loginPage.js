import React from 'react';

import LoginModal from '../../components/login-modal-login-page/loginModal';
import ImageContainer from '../../components/photosphere-module-login-page/ImageContainer';

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
