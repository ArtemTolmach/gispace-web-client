import React, { useState, useEffect } from 'react';

import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

import styles from './Header.module.css'

const Header = ({ user, csrf_token }) => {
  const [nav, setNav] = useState(false);
  const [name, setName] = useState('');

  const clickMenuItem = () => {
    setNav(false);
  };

  useEffect(() => {
    (
      async () => {
        const response = await fetch('http://127.0.0.1:8000/user', {
          headers:{ 'Content-Type': 'application/json'},
          credentials: 'include'
        });

        const content = await response.json();

        console.log(content);

        setName(content.name);
      }
    )();
  });

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
            {name ? (
              <>
                <li className={styles.menuItem}>
                  <a id="user-name" href="#">{name}</a>
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
