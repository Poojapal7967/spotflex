import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearAuth, getStoredUser } from "../utils/auth";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getStoredUser();

  const isAuthPage = ["/user-login", "/user-register", "/owner-login", "/owner-register"].includes(location.pathname);

  const handleLogout = () => {
    clearAuth();
    navigate("/");
  };

  const commonLinks = [
    { to: "/", label: "Landing" },
    { to: "/home", label: "Home" },
  ];

  return (
    <div style={styles.navbar}>
      <h1 style={styles.logo}>SpotFlex</h1>

      <div style={styles.links}>
        {commonLinks.map((link) => (
          <Link key={link.to} to={link.to} style={styles.link}>
            {link.label}
          </Link>
        ))}

        {user?.role === "user" && (
          <Link to="/my-bookings" style={styles.link}>
            My Bookings
          </Link>
        )}

        {user?.role === "owner" && (
          <>
            <Link to="/owner-dashboard" style={styles.link}>
              Owner Dashboard
            </Link>
            <Link to="/add-space" style={styles.link}>
              Add Space
            </Link>
          </>
        )}

        {!user && !isAuthPage && (
          <>
            <Link to="/user-login" style={styles.link}>User Login</Link>
            <Link to="/owner-login" style={styles.link}>Owner Login</Link>
          </>
        )}

        {user && (
          <button onClick={handleLogout} style={styles.button}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    background: "rgba(15,23,42,0.9)",
    backdropFilter: "blur(10px)",
    padding: "16px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    flexWrap: "wrap",
    gap: "10px",
  },
  logo: {
    color: "#38bdf8",
    fontSize: "28px",
    margin: 0,
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
  },
  link: {
    color: "white",
    fontWeight: "bold",
    textDecoration: "none",
  },
  button: {
    background: "linear-gradient(to right,#2563eb,#38bdf8)",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Navbar;
