import React from 'react';

import ImageContainer from '@Components/register/photosphere-module/ImageContainer';
import RegisterModal from '@Components/register/register-modal/registerModal';

import styles from './registerPage.module.css';

function RegisterPage() {
  
  return (
    <div className={styles.mainContainer}>
        <ImageContainer />
        <a className={styles.logo} href="#">Gispace</a>
        <RegisterModal />
    </div>
  );
}

export default RegisterPage;
