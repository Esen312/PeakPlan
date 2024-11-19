import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState(""); // Поддерживаем email или username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/auth/token/", {
        username: usernameOrEmail,
        password,
      })
      .then((response) => {
        // Сохраняем access и refresh токены
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
        navigate("/dashboard"); // Перенаправляем на дашборд
      })
      .catch(() => setError("Неверное имя пользователя/email или пароль"));
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>С возвращением! 👋Вход</h2>
        {error && <p className="login-error">{error}</p>}
        <div>
          <label>Имя пользователя или Email:</label>
          <input
            type="text"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default Login;
