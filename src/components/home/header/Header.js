import React, { useState } from 'react';

import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

import styles from './Header.module.css'

const Header = ({ user, csrf_token }) => {
  const [nav, setNav] = useState(false);

  const clickMenuItem = () => {
    setNav(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.box}>
          <a href="/" className={styles.logo}>Gispace</a>
          <ul
            className={
              nav ? [styles.menu, styles.active].join(' ') : [styles.menu]
            }
          >
            <li className={styles.menuItem} onClick={clickMenuItem}>
              <a href="#about-us">О Нас</a>
            </li>
            {user.is_authenticated ? (
              <>
                <li className={styles.menuItem}>
                  <a id="user-name" href="#">{user.username}</a>
                </li>
                <form id="logout-form" className={styles.menuItem} method="post" action="/logout">
                  <input type="hidden" name="csrfmiddlewaretoken" value={csrf_token} />
                  <a /*onclick={document.getElementById('logout-form').submit()}*/>Выйти</a>
                </form>
              </>
            ) : (
              <>
                <li className={styles.menuItem}>
                  <a href="/login">Войти</a>
                </li>
                <li className={styles.menuItem}>
                  <a href="/register">Регистрация</a>
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
