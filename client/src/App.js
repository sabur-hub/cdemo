import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import User from './components/getuser/User';
import Add from './components/adduser/Add';
import Edit from './components/updateuser/Edit';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Проверка состояния входа пользователя при загрузке приложения
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // Обработчик входа пользователя
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  // Обработчик выхода пользователя
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  const route = createBrowserRouter([
    {
      path: '/',
      element: isLoggedIn ? <User /> : <LoginForm onLogin={handleLogin} />,
    },
    {
      path: '/add',
      element: isLoggedIn ? <Add /> : <LoginForm onLogin={handleLogin} />,
    },
    {
      path: '/edit/:id',
      element: isLoggedIn ? <Edit /> : <LoginForm onLogin={handleLogin} />,
    },
  ]);

  return (
    <div className="App">
      {isLoggedIn ? (
        <button onClick={handleLogout} className='hh'>Выход</button>
      ) : null}
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
