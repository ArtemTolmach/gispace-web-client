import React, { useState, useEffect, useRef, useContext } from 'react';

import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import { BACKEND_HOST } from '@Utils/exportDataFromEnv/exportDataFromEnv';

import styles from './header.module.scss'

import AuthContext from '@Context/authContext/authContext';

const Header = ({ project, location, photosphere }) => {
  let {user, logoutUser} = useContext(AuthContext)

  const [nav, setNav] = useState(false);
  const [locations, setLocations] = useState([]);
  const [photoSpheres, setPhotoSpheres] = useState([]);
  const [isOpenLocation, setIsOpenLocation] = useState(false);
  const [isOpenPhotosphere, setIsOpenPhotosphere] = useState(false);
  const validIds = ['sub-btn-location', 'sub-btn-photospheres', 'svg', 'svg1'];

  const subMenuRef = useRef(null);
  
  const toogleDropdownLocation = () => {
    setIsOpenLocation(!isOpenLocation);
    setIsOpenPhotosphere(false);
  }

  const toogleDropdownPhotopshere = () => {
    setIsOpenPhotosphere(!isOpenPhotosphere);
    setIsOpenLocation(false);
  }

  const handleClickOutside = (event) => {
    if (subMenuRef.current && !subMenuRef.current.contains(event.target) && !validIds.includes(event.target.id)) {
      setIsOpenLocation(false);
      setIsOpenPhotosphere(false);
    }
  };

  useEffect(() => {
    fetch(`${BACKEND_HOST}/api/locations/` + project + '/')
      .then(response => response.json())
      .then(data => setLocations(data));
    
    fetch(`${BACKEND_HOST}/api/photospheres/` + location + '/')
      .then(response => response.json())
      .then(data => setPhotoSpheres(data));

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [project, location]);

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
              {locations.length > 1 ? (
                <li className={styles.menuItem}>
                  <Link  className={styles.subBtn} id="sub-btn-location" onClick={toogleDropdownLocation}>Локации <FontAwesomeIcon id='svg' icon={faAngleDown}/></Link>
                  {isOpenLocation && (
                    <ul ref={subMenuRef} className={styles.subMenu} id="sub-menu-locations">
                      {locations.map(locationMap => (
                        locationMap.id != location ? (
                          <li key={locationMap.id} className={styles.subItem}>
                            <a href={`/interface/${project}/${locationMap.id}/${locationMap.main_sphere}/`}>
                              {locationMap.name}
                            </a>
                          </li>
                        ) : null
                      ))}
                    </ul>
                  )}
                </li>
              ) : null}
              {photoSpheres.length > 1 ? (
                <li className={styles.menuItem}>
                  <Link  className={styles.subBtn} id="sub-btn-photospheres" onClick={toogleDropdownPhotopshere}>Фотосферы <FontAwesomeIcon id='svg1' icon={faAngleDown}/></Link>
                  {isOpenPhotosphere && (
                    <ul ref={subMenuRef} className={styles.subMenu} id="sub-menu-photospheres">
                      {photoSpheres.map(photoSphere => (
                        photoSphere.id != photosphere ? (
                          <li key={photoSphere.id} className={styles.subItem}>
                            <a href={`/interface/${project}/${location}/${photoSphere.id}/`}>
                              {photoSphere.name}
                            </a>
                          </li>
                        ) : null
                      ))}
                  </ul>
                  )}
                </li>
              ) : null }
            </ul>
            {user ? (
              <ul className={styles.authContainer}>
                <li className={styles.menuItem}>
                  <a id="user-name">{user.username}</a>
                </li>
                <form id="logout-form" className={styles.menuItem} method="post" action="/logout">
                  <input type="hidden"/>
                  <a onClick={logoutUser}>Выйти</a>
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
          <div onClick={() => setNav(!nav)} className={styles.mobileBtn}>
            {nav ? <AiOutlineClose style={{ color: 'white', width: '53px', height: '53px' }} /> : <AiOutlineMenu style={{ color: 'white', width: '53px', height: '53px' }} />}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
