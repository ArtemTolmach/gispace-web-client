import React from 'react';
import { Link } from "react-router-dom";

import ImageContainer from '@Components/register/photosphere-module/ImageContainer';
import RegisterModal from '@Components/register/register-modal/registerModal';

import styles from './registerPage.module.scss';

function RegisterPage() {
  
  return (
    <div className={styles.mainContainer}>
        <ImageContainer />
        <Link className={styles.logo} to="/">Gispace</Link>
        <RegisterModal />
    </div>
  );
}

export default RegisterPage;
