import React, { useState } from 'react';
import "./LoginForm.css";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Здесь вы можете отправить данные логина и пароля на сервер для проверки
    // например, с использованием fetch или axios
    try {
      const response = await fetch('http://193.57.210.140:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        // Если вход успешен, вызываем функцию обратного вызова onLogin
        onLogin();
      } else {
        alert('Неправильный логин или пароль');
      }
    } catch (error) {
      console.error('Ошибка при входе:', error);
    }
  };

  return (
    <div className="content">
      <form onSubmit={handleSubmit} className="formAuth">
      <h2 className='daromadan'>Даромад</h2>
        <input
          className="inputAuth"
          type="text"
          placeholder="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="inputAuth"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="hh">
          Дохилшавӣ
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
