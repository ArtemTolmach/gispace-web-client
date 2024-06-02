import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaUser, FaLock } from "react-icons/fa";

import styles from './loginModal.module.scss';

import AuthContext from '@Context/authContext/authContext';

const LoginModal = () => {
  const { 
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur"
  });

  let { loginUser } = useContext(AuthContext);
  
  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(loginUser)}>
        <h1>Вход</h1>

        <div className={styles.inputBox}>
          <input 
            {...register('username', { 
              required: 'Имя пользователя обязательно',              
              minLength: {
                value: 5,
                message: 'Минимум 5 символов',
              },
              maxLength: {
                value: 28,
                message: 'Максимум 28 символов',
              }
            })} 
            type="text" 
            name="username" 
            placeholder="Имя пользователя" 
            maxLength="254" 
            id="id_username" 
          />
          <FaUser className={styles.icon} />
        </div>
        {errors.username && <p className={styles.error}>{errors.username.message}</p>}
        <div className={styles.inputBox}>
          <input 
            {...register('password', { 
              required: 'Пароль обязателен',
              minLength: {
                value: 8,
                message: 'Минимум 8 символов',
              },
              pattern: { value: /^[A-Za-z0-9!@#$%^&*()_+{}|:"<>?[\]\\;'./]+$/, message: 'Недопустимые символы в пароле' }
            })} 
            type="password" 
            placeholder="Пароль" 
            name="password" 
            autoComplete="new-password" 
            id="id_password1" 
          />
          <FaLock className={styles.icon} />
        </div>
        {errors.password && <p className={styles.error}>{errors.password.message}</p>}

        <button id='loginButton' type="submit" className={styles.btn}>Вход</button>
        <div className={styles.registerLink}>
          <p>Нет аккаунта? <Link to="/register">Регистрация</Link> </p>
        </div>
      </form>
    </div>
  );
}

export default LoginModal;
