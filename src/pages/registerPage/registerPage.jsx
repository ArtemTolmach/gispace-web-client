import React from 'react';
import { Link } from "react-router-dom";

import styles from './registerPage.module.scss';

import ImageContainer from '@Components/register/photosphereContainer/photosphereContainer';
import RegisterModal from '@Components/register/registerModal/registerModal';

function RegisterPage() {

  document.body.style.overflow = "hidden";
  document.documentElement.style.height = "100vh";

  return (
    <div className={styles.mainContainer}>
        <ImageContainer />
        <Link className={styles.logo} to="/">Gispace</Link>
        <RegisterModal />
    </div>
  );
}

export default RegisterPage;
