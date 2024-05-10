import React from 'react';
import { Link } from "react-router-dom";

import LoginModal from '@Components/login/login-modal/loginModal';
import ImageContainer from '@Components/login/photosphere-module/ImageContainer';

import styles from './loginPage.module.css';

function LoginPage() {
  
  return (
    <div className={styles.mainContainer}>
        <ImageContainer />
        <Link className={styles.logo} to="/">Gispace</Link>
        <LoginModal />
    </div>
  );
}

export default LoginPage;
