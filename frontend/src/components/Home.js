import React from "react";
import { useNavigate } from "react-router-dom";
import "../utility/home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication data from local storage (if stored)
    localStorage.removeItem("authToken");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="home-container">
      <h1>Welcome to Home Page</h1>
      <button className="logout-Button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
