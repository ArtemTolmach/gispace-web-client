import React, { useState } from 'react';
import styles from './loginModal.module.css';
import { Navigate } from 'react-router-dom';

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
          <input type="email" name="email" placeholder="Электронная почта" maxLength="254" id="id_email" required
              onChange={e => setEmail(e.target.value)}
          />
          <i className='bx bx-envelope'></i>
        </div>

        <div className={styles.inputBox}>
          <input type="password" placeholder="Пароль" name="password1" autoComplete="new-password" id="id_password1" required
              onChange={e => setPassword(e.target.value)}
          />
          <i className='bx bxs-lock-alt' ></i>
        </div>

        <div className={styles.rememberForgot}>
          <a href="{% url 'password_reset' %}">Забыли пароль?</a>
        </div>

        <button type="submit" className={styles.btn}>Вход</button>
        <div className={styles.registerLink}>
          <p>Нет аккаунта? <a href="{% url 'register' %}">Регистрация</a> </p>
        </div>
      </form>
    </div>
  );
}

export default loginModal;
