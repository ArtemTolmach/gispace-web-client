import React, { useState } from 'react';
import styles from './loginModal.module.scss';
import { Navigate, Link } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";

const loginModal = () => {
  const[email, setEmail ]= useState('');
  const[password, setPassword ]= useState('');
  const [redirect, setRedirect]= useState(false);

  const submit = async (e) => {
    e.preventDefault();

    await fetch('http://127.0.0.1:8000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        email,
        password
      })
    });

    setRedirect(true);
  }
  
  if (redirect) {
      return <Navigate to="/"/>;
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={submit}>
        <input type="hidden" name="csrfmiddlewaretoken" value="{% csrf_token %}" />
        <h1>Вход</h1>

        <div className={styles.inputBox}>
          <input type="text" name="username" placeholder="Имя пользователя" maxLength="254" id="id_username" required
            onChange={e => setName(e.target.value)}
          />
          <FaUser className={styles.icon} />
        </div>

        <div className={styles.inputBox}>
          <input type="password" placeholder="Пароль" name="password1" autoComplete="new-password" id="id_password1" required
              onChange={e => setPassword(e.target.value)}
          />
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
