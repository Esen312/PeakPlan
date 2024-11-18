import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);

  const refreshToken = async () => {
  const refresh = localStorage.getItem("refresh");
  if (refresh) {
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/token/refresh/", {
        refresh,
      });
      localStorage.setItem("access", response.data.access); // Обновляем access токен
      return response.data.access;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return null;
    }
  }
  return null;
};


  useEffect(() => {
    const fetchUserData = async () => {
      let token = localStorage.getItem("access");
      if (!token) {
        console.error("No access token available");
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/auth/users/me/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Если токен истёк, обновляем его
          const newAccessToken = await refreshToken();
          if (newAccessToken) {
            try {
              const response = await axios.get("http://127.0.0.1:8000/auth/users/me/", {
                headers: { Authorization: `Bearer ${newAccessToken}` },
              });
              setUser(response.data);
            } catch (error) {
              console.error("Failed to fetch user data after refreshing token:", error);
            }
          }
        } else {
          console.error("Failed to fetch user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {user.avatar && (
        <img
          src={user.avatar}
          alt="User Avatar"
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
      )}
    </div>
  );
}

export default Profile;
