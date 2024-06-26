import React, { useState, useContext } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Link } from "react-router-dom";

import styles from './header.module.scss'

import AuthContext from '@Context/authContext/authContext';

const Header = () => {
  const [nav, setNav] = useState(false);
  let {user, logoutUser} = useContext(AuthContext)

  const clickMenuItem = () => {
    setNav(false);
  };

  const scrollToAboutUs = () => {
    const aboutUsElement = document.getElementById('about-us');
    if (aboutUsElement) {
      aboutUsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.box}>
          <Link to="/" className={styles.logo}>Gispace</Link>
          <ul
            className={
              nav ? [styles.menu, styles.active].join(' ') : [styles.menu]
            }
          >
            <li className={styles.menuItem} onClick={clickMenuItem}>
              <Link onClick={scrollToAboutUs} id='aboutUs'>О Нас</Link>
            </li>
            {user ? (
              <>
                <li className={styles.menuItem}>
                  <a id="user-name">{user.username}</a>
                </li>
                <li id="logout-form" className={styles.menuItem}>
                  <a onClick={logoutUser} id='logoutButton'>Выйти</a>
                </li>
              </>
            ) : (
              <>
                <li className={styles.menuItem}>
                  <Link id='login' to="/login">Войти</Link>
                </li>
                <li className={styles.menuItem}>
                  <Link id='register' to="/register">Регистрация</Link>
                </li>
              </>
            )}
          </ul>
          <div onClick={() => setNav(!nav)} className={styles.mobileBtn}>
            {nav ? <AiOutlineClose style={{ color: 'white', width: '40px', height: '40px' }} /> : <AiOutlineMenu style={{ color: 'white', width: '40px', height: '40px' }} />}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
