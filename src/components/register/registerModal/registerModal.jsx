import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import { useForm } from 'react-hook-form';

import styles from './registerModal.module.scss';

import AuthContext from '@Context/authContext/authContext';

const RegisterModal = () => {
  const { 
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur"
  });

  let {registerUser} = useContext(AuthContext)

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(registerUser)} >
        <h1>Регистрация</h1>

        <div className={styles.inputBox}>
          <input 
            {...register('username', { 
              required: 'Имя пользователя обязательно',              
              minLength: {
                value: 5,
                message: 'Минимум 5 символов',
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
            {...register('email', { 
              required: 'Электронная почта обязательна',
            })} 
            type="email" 
            placeholder="Электронная почта" 
            name="email" 
            autoComplete="new-email" 
            id="id_email" 
          />
          <FaLock className={styles.icon} />
        </div>
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}

        <div className={styles.inputBox}>
          <input 
            {...register('password', { 
              required: 'Пароль обязателен',
              minLength: {
                value: 8,
                message: 'Минимум 8 символов',
              },
              pattern: { value: /^[A-Za-z0-9!@#$%^&*()_+{}|:"<>?[\]\\;'./]+$/, message: 'Пароль должен содержать буквы, цифры и символы' }
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

        <button id='registerButton' type="submit" className={styles.btn}>Регистрация</button>
        <div className={styles.registerLink}>
          <p>Уже есть аккаунт? <Link to="/login">Войти</Link> </p>
        </div>
      </form>
    </div>
  );
}

export default RegisterModal;
