import React, { useEffect } from 'react';
import './Header.css'

const Header = ({ user, csrf_token }) => {
  useEffect(() => {
    const menuHamburger = document.querySelector(".menu-hamburger");
    const menuBar = document.querySelector(".menu-bar");
    const html = document.querySelector("html");
    const menuItem = document.querySelector(".menu-item");

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
      <a href="/" className="logo">Gispace</a>
      <div className="menu-hamburger" id="burger-icon">
        <span></span>
      </div>
      <div className="menu-bar">
        <ul className="navigation">
          <li className="menu-item">
            <a href="#about-us">О Нас</a>
          </li>
          {user.is_authenticated ? (
            <>
              <li className="menu-item">
                <a id="user-name" href="#">{user.username}</a>
              </li>
              <form id="logout-form" className="menu-item" method="post" action="/logout">
                <input type="hidden" name="csrfmiddlewaretoken" value={csrf_token} />
                <a onclick="document.getElementById('logout-form').submit()">Выйти</a>
              </form>
            </>
          ) : (
            <>
              <li className="menu-item">
                <a href="/login">Войти</a>
              </li>
              <li className="menu-item">
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
