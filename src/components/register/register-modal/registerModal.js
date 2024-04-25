import React from 'react';
import styles from './registerModal.module.css';

const loginModal = () => {
  return (
    <div className={styles.wrapper}>
      <form action="{{ request.get_full_path }}" method="post">
        <h1>Регистрация</h1>
        <div className={styles.inputBox}>
          <input type="text" name="username" placeholder="Имя пользователя" maxlength="254" id="id_username" required/>
          <i className='bx bxs-user'></i>
        </div>
        <div className={styles.inputBox}>
          <input type="email" name="email" placeholder="Электронная почта" maxlength="254" id="id_email" required/>
          <i className='bx bx-envelope'></i>
        </div>
        <div className={styles.inputBox}>
          <input type="password" placeholder="Пароль" name="password1" autocomplete="new-password" id="id_password1" required/>
          <i className='bx bxs-lock-alt' ></i>
        </div>
        <div className={styles.inputBox}>
          <input type="password" placeholder="Повторите пароль" name="password2" autocomplete="new-password" id="id_password2" required/>
          <i className='bx bx-check-shield' ></i>
        </div>
        <button type="submit" className={styles.btn}>Регистрация</button>
        <div className={styles.registerLink}>
          <p>Уже есть аккаунт? <a href="#">Войти</a> </p>
        </div>
      </form>
    </div>
  );
}

export default loginModal;
