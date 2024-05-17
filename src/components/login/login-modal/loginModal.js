import React, { useState, useContext } from 'react';
import styles from './loginModal.module.scss';
import { Navigate, Link } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import AuthContext from '../../../context/AuthContext';

const loginModal = () => {
  let {loginUser} = useContext(AuthContext)
  
  return (
    <div className={styles.wrapper}>
      <form onSubmit={loginUser}>
        <h1>Вход</h1>

        <div className={styles.inputBox}>
          <input type="text" name="username" placeholder="Имя пользователя" maxLength="254" id="id_username" required/>
          <FaUser className={styles.icon} />
        </div>

        <div className={styles.inputBox}>
          <input type="password" placeholder="Пароль" name="password" autoComplete="new-password" id="id_password1" required/>
          <FaLock className={styles.icon} />
        </div>

        <div className={styles.rememberForgot}>
          <Link to="/password_reset">Забыли пароль?</Link>
        </div>

        <button type="submit" className={styles.btn}>Вход</button>
        <div className={styles.registerLink}>
          <p>Нет аккаунта? <Link to="/register">Регистрация</Link> </p>
        </div>
      </form>
    </div>
  );
}

export default loginModal;
