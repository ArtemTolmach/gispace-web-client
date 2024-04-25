import React from 'react';
import styles from './loginModal.module.css';

const loginModal = () => {
  return (
    <div className={styles.wrapper}>
      <form action={window.location.pathname} method="post">
        <input type="hidden" name="csrfmiddlewaretoken" value="{% csrf_token %}" />
        <h1>Вход</h1>
        <div className={styles.inputBox}>
          <input type="text" name="username" placeholder="Имя пользователя" maxLength="150" id="id_username" required />
          <i className={`${styles.bx} ${styles["bxs-user"]}`}></i>
        </div>
        <div className={styles.inputBox}>
          <input type="password" name="password" placeholder="Пароль" id="id_password" required />
          <i className={`${styles.bx} ${styles["bxs-lock-alt"]}`}></i>
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
