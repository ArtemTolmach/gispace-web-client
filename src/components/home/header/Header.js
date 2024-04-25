import React, { useEffect } from 'react';

import styles from './Header.module.css'

const Header = ({ user, csrf_token }) => {
  useEffect(() => {
    const menuHamburger = document.querySelector(".menuHamburger");
    const menuBar = document.querySelector(".menuBar");
    const html = document.querySelector("html");
    const menuItem = document.querySelector(".menuItem");
    console.log(menuHamburger);
    if (menuHamburger) {
      menuHamburger.addEventListener('click', () => {
        menuHamburger.classList.toggle('active');
        menuBar.classList.toggle('active');
        html.classList.toggle('no-scroll');
      });
    }

    if (menuItem) {
      menuItem.addEventListener('click', () => {
        menuHamburger.classList.remove('active');
        menuBar.classList.remove('active');
        html.classList.remove('no-scroll');
      });
    }
  }, []);

  return (
    <header>
      <a href="/" className={styles.logo}>Gispace</a>
      <div className={styles.menuHamburger} id="burger-icon">
        <span></span>
      </div>
      <div className={styles.menuBar}>
        <ul className={styles.navigation}>
          <li className={styles.menuItem}>
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
      </div>
    </header>
  );
}

export default Header;
