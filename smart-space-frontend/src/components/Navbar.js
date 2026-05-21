import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.brandWrap}>
        <div style={styles.logoDot}>S</div>
        <h1 style={styles.logo}>SpotFlex</h1>
      </Link>

      <div style={styles.links}>
        <Link to="/home" style={styles.link}>Home</Link>
        <Link to="/explore" style={styles.link}>Explore</Link>
        <Link to="/reviews" style={styles.link}>Reviews</Link>
        <Link to="/user-dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/owner-dashboard" style={styles.link}>Owner</Link>
        <Link to="/admin" style={styles.link}>Admin</Link>

        {user ? (
          <>
            <span style={styles.userText}>Hi, {user.name || "User"}</span>
            <button type="button" onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/user-login" style={styles.secondaryBtn}>Login</Link>
            <Link to="/user-register" style={styles.buttonLink}>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    background: "rgba(8, 13, 33, 0.8)",
    backdropFilter: "blur(14px)",
    padding: "14px 26px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid rgba(148,163,184,0.2)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    flexWrap: "wrap",
    gap: "14px"
  },
  brandWrap: { display: "flex", alignItems: "center", gap: "10px" },
  logoDot: { width: "34px", height: "34px", borderRadius: "10px", background: "linear-gradient(135deg,#38bdf8,#6366f1)", color: "#fff", display: "grid", placeItems: "center", fontWeight: 800 },
  logo: { color: "#f8fafc", fontSize: "24px", fontWeight: 800, letterSpacing: "0.5px" },
  links: { display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" },
  link: { color: "#cbd5e1", fontWeight: 600, fontSize: "14px" },
  userText: { color: "#94a3b8", fontSize: "14px", marginLeft: "8px" },
  button: { background: "linear-gradient(90deg,#2563eb,#38bdf8)", color: "white", border: "none", padding: "8px 14px", borderRadius: "10px", fontWeight: 700 },
  buttonLink: { background: "linear-gradient(90deg,#2563eb,#38bdf8)", color: "white", padding: "8px 14px", borderRadius: "10px", fontWeight: 700 },
  secondaryBtn: { border: "1px solid rgba(148,163,184,0.35)", color: "#e2e8f0", padding: "7px 14px", borderRadius: "10px", fontWeight: 700 }
};

export default Navbar;
