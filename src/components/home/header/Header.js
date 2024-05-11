import React, { useState, useEffect } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Link } from "react-router-dom";

import styles from './Header.module.scss'

const Header = ({ name }) => {
  const [nav, setNav] = useState(false);

  const clickMenuItem = () => {
    setNav(false);
  };

  const logout = async (e) => {
    e.preventDefault();

    const res = await fetch('http://127.0.0.1:8000/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      credentials: 'include',
    });

    console.log('Выход');
    console.log(res);

  }

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
              <a href="#about-us">О Нас</a>
            </li>
            {name ? (
              <>
                <li className={styles.menuItem}>
                  <a id="user-name" href="#">{name}</a>
                </li>
                <form id="logout-form" className={styles.menuItem}>
                  <input type="hidden" />
                  <a onClick={logout}>Выйти</a>
                </form>
              </>
            ) : (
              <>
                <li className={styles.menuItem}>
                  <Link to="/login">Войти</Link>
                </li>
                <li className={styles.menuItem}>
                  <Link to="/register">Регистрация</Link>
                </li>
              </>
            )}
          </ul>
          <div onClick={() => setNav(!nav)} className={styles.mobile_btn}>
            {nav ? <AiOutlineClose style={{ color: 'white', width: '40px', height: '40px' }} /> : <AiOutlineMenu style={{ color: 'white', width: '40px', height: '40px' }} />}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
