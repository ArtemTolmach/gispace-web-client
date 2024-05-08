import React, { useState, useEffect } from 'react';

import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Link } from "react-router-dom";

import styles from './Header.module.css'

const Header = ({ name ,project, location, photosphere }) => {
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
          <Link to="/" className={styles.logo}>Gispace</Link>
          <ul
            className={
              nav ? [styles.menu, styles.active].join(' ') : [styles.menu]
            }
            >
            <ul className={styles.menuHeader}>
              <li className={styles.menuItem}>
                <Link  className={styles.subBtn} id="sub-btn-projects" onClick={toogleDropdownLocation}>Локации<i className="fas fa-angle-down"></i> </Link>
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
                <Link  className={styles.subBtn} id="sub-btn-photospheres" onClick={toogleDropdownPhotopshere}>Фотосферы<i className="fas fa-angle-down"></i> </Link>
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
            {name ? (
              <ul className={styles.authContainer}>
                <li className={styles.menuItem}>
                  <a id="user-name">{name}</a>
                </li>
                <form id="logout-form" className={styles.menuItem} method="post" action="/logout">
                  <input type="hidden"/>
                  <a>Выйти</a>
                </form>
              </ul>
            ) : (
              <ul className={styles.authContainer}>
                <li className={styles.menuItem}>
                  <Link to="/register">Регистрация</Link>
                </li>
                <li className={styles.menuItem}>
                  <Link to="/login">Войти</Link>
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
