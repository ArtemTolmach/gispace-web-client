import React, { useContext } from 'react';
import styles from './registerModal.module.scss';
import { Link } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import AuthContext from '../../../context/AuthContext';

const loginModal = () => {
  let {registerUser} = useContext(AuthContext)

  return (
    <div className={styles.wrapper}>
      <form onSubmit={registerUser} >
        <h1>Регистрация</h1>

        <div className={styles.inputBox}>
          <input type="text" name="username" placeholder="Имя пользователя" maxLength="254" id="id_username" required/>
          <FaUser className={styles.icon} />
        </div>

        <div className={styles.inputBox}>
          <input type="email" name="email" placeholder="Электронная почта" maxLength="254" id="id_email" required/>
          <MdOutlineEmail className={styles.icon} />
        </div>

        <div className={styles.inputBox}>
          <input type="password" placeholder="Пароль" name="password" autoComplete="new-password" id="id_password1" required/>
          <FaLock className={styles.icon} />
        </div>

        <button type="submit" className={styles.btn}>Регистрация</button>
        <div className={styles.registerLink}>
          <p>Уже есть аккаунт? <Link to="/login">Войти</Link> </p>
        </div>
      </form>
    </div>
  );
}

export default loginModal;
