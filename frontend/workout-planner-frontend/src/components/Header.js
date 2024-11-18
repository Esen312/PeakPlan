import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Проверка текущего пользователя
    const token = localStorage.getItem("access");
    if (token) {
      axios
        .get("http://127.0.0.1:8000/auth/users/me/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUser(response.data))
        .catch(() => setUser(null));
    }
  }, []);

  const handleLogout = () => {
    const token = localStorage.getItem("access");
    if (token) {
      axios
        .post(
          "http://127.0.0.1:8000/auth/token/logout/",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          setUser(null);
        })
        .catch((err) => console.error("Logout failed:", err));
    }
  };

  return (
    <header style={{ background: "#333", padding: "10px", color: "#fff" }}>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
            Workout Planner
          </Link>
        </h1>
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            margin: 0,
            padding: 0,
          }}
        >
          <li style={{ marginRight: "20px" }}>
            <Link to="/auth/token/login" style={{ color: "#fff", textDecoration: "none" }}>
              Login
            </Link>
          </li>
          <li style={{ marginRight: "20px" }}>
            <Link to="/auth/users" style={{ color: "#fff", textDecoration: "none" }}>
              Register
            </Link>
          </li>
          <li style={{ marginRight: "20px" }}>
            <Link to="/auth/users/me" style={{ color: "#fff", textDecoration: "none" }}>
              Profile
            </Link>
          </li>
          <li style={{ marginRight: "20px" }}>
            <Link to="/dashboard" style={{ color: "#fff", textDecoration: "none" }}>
              Dashboard
            </Link>
          </li>
          {user && (
            <li>
              <button
                onClick={handleLogout}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
        {user && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={user.avatar || "https://via.placeholder.com/40"} // Заглушка для аватара
              alt="Avatar"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            <span>{user.username}</span>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
