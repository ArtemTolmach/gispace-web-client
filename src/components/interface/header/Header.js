import React, { useState, useEffect } from 'react';

import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

import styles from './Header.module.css'

const Header = ({ user, csrf_token, project, location, photosphere }) => {
  const [nav, setNav] = useState(false);
  const [locations, setLocations] = useState([]);
  const [photoSpheres, setPhotoSpheres] = useState([]);
  const [isOpenLocation, setIsOpenLocation] = useState(false);
  const [isOpenPhotosphere, setIsOpenPhotosphere] = useState(false);

  const clickMenuItem = () => {
    setNav(false);
  };
  
  const toogleDropdownLocation = () => {
    setIsOpenLocation(!isOpenLocation);
    setIsOpenPhotosphere(false);
  }

  const toogleDropdownPhotopshere = () => {
    setIsOpenPhotosphere(!isOpenPhotosphere);
    setIsOpenLocation(false);
  }

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/locations/' + project + '/')
      .then(response => response.json())
      .then(data => setLocations(data));
    
    fetch('http://127.0.0.1:8000/api/photospheres/' + location + '/')
      .then(response => response.json())
      .then(data => setPhotoSpheres(data));
  }, []);

  return (
    <header className={styles.headerInterface}>
      <div className={styles.container}>
        <div className={styles.box}>
          <a href="/" className={styles.logo}>Gispace</a>
          <ul
            className={
              nav ? [styles.menu, styles.active].join(' ') : [styles.menu]
            }
            >
            <ul className={styles.menuHeader}>
              <li className={styles.menuItem}>
                <a  className={styles.subBtn} href="#" id="sub-btn-projects" onClick={toogleDropdownLocation}>Локации<i className="fas fa-angle-down"></i> </a>
                {isOpenLocation && (
                  <ul className={styles.subMenu} id="sub-menu-locations">
                    {locations.map(location => (
                      <li key={location.id} className={styles.subItem}>
                        <a href={`/interface/${project}/${location.id}/${location.main_sphere}/`}>
                          {location.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li className={styles.menuItem}>
                <a  className={styles.subBtn} href="#" id="sub-btn-photospheres" onClick={toogleDropdownPhotopshere}>Фотосферы<i className="fas fa-angle-down"></i> </a>
                {isOpenPhotosphere && (
                  <ul className={styles.subMenu} id="sub-menu-photospheres">
                    {photoSpheres.map(photoSphere => (
                      <li key={photoSphere.id} className={styles.subItem}>
                        <a href={`/interface/${project}/${location}/${photoSphere.id}/`}>
                          {photoSphere.name}
                        </a>
                      </li>
                    ))}
                </ul>
                )}
              </li>
            </ul>
            {user.is_authenticated ? (
              <ul className={styles.authContainer}>
                <li className={styles.menuItem}>
                  <a id="user-name" href="#">{user.username}</a>
                </li>
                <form id="logout-form" className={styles.menuItem} method="post" action="/logout">
                  <input type="hidden" name="csrfmiddlewaretoken" value={csrf_token} />
                  <a /*onclick={document.getElementById('logout-form').submit()}*/>Выйти</a>
                </form>
              </ul>
            ) : (
              <ul className={styles.authContainer}>
                <li className={styles.menuItem}>
                  <a href="/register">Регистрация</a>
                </li>
                <li className={styles.menuItem}>
                  <a href="/login">Войти</a>
                </li>
              </ul>
            )}
          </ul>
          <div onClick={() => setNav(!nav)} className={styles.mobile_btn}>
            {nav ? <AiOutlineClose style={{ color: 'white', width: '53px', height: '53px' }} /> : <AiOutlineMenu style={{ color: 'white', width: '53px', height: '53px' }} />}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
