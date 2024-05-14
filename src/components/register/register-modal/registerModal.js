import React, { useState } from 'react';
import styles from './registerModal.module.scss';
import { Link } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

const loginModal = () => {
  const[name, setName ]= useState('');
  const[email, setEmail ]= useState('');
  const[password, setPassword ]= useState('');
  const [redirect, setRedirect]= useState(false);

  const submit = async (e) => {
    e.preventDefault();

    await fetch('http://127.0.0.1:8000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        name,
        email,
        password
      })
    });

    setRedirect(true);
  }
  {/*
  if (redirect) {
      return <Navigate to="/login"/>;
  }*/}

  return (
    <div className={styles.wrapper}>
      <form onSubmit={submit} >
        <h1>Регистрация</h1>

        <div className={styles.inputBox}>
          <input type="text" name="username" placeholder="Имя пользователя" maxLength="254" id="id_username" required
            onChange={e => setName(e.target.value)}
          />
          <FaUser className={styles.icon} />
        </div>

        <div className={styles.inputBox}>
          <input type="email" name="email" placeholder="Электронная почта" maxLength="254" id="id_email" required
            onChange={e => setEmail(e.target.value)}
          />
          <MdOutlineEmail className={styles.icon} />
        </div>

        <div className={styles.inputBox}>
          <input type="password" placeholder="Пароль" name="password1" autoComplete="new-password" id="id_password1" required
            onChange={e => setPassword(e.target.value)}
          />
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
