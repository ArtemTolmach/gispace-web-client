import React from 'react';
import { Link } from "react-router-dom";

import styles from './personalDataPage.module.scss';

import PersonalData from '@Components/personalData/personalDataPolicy/personalDataPolicyText';

function personalDataPage() {

    document.body.style.overflow = "auto";

    return (
        <div className={styles.mainContainer}>
            <Link className={styles.logo} to="/">Gispace</Link>
            <h1 id={styles.caption}>Политика обработки персональных данных</h1>
            <PersonalData/>
        </div>
    );
}

export default personalDataPage;
