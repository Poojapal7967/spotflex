import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../services/api";

function UserRegister() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!name.trim() || !email.trim() || !password.trim()) return "All fields are required.";
    if (name.trim().length < 2) return "Name must be at least 2 characters.";
    if (!email.includes("@")) return "Please enter a valid email.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      await authApi.register({ name: name.trim(), email: email.trim(), password, role: "user" });
      navigate("/user-login");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleRegister}>
        <h1 style={styles.title}>User Register</h1>
        {error && <p style={styles.error}>{error}</p>}

        <input type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} />
        <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
        <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />

        <button style={styles.button} disabled={loading}>{loading ? "Registering..." : "Register"}</button>

        <Link to="/user-login">
          <button type="button" style={styles.registerButton}>Back to Login</button>
        </Link>
      </form>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(to right,#0f172a,#1e3a8a)", padding: "20px" },
  card: { width: "350px", padding: "34px", borderRadius: "20px", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(10px)", display: "flex", flexDirection: "column", gap: "16px" },
  title: { textAlign: "center", color: "white", margin: 0 },
  input: { padding: "12px", borderRadius: "10px", border: "none", outline: "none" },
  button: { background: "linear-gradient(to right,#2563eb,#38bdf8)", color: "white", border: "none", padding: "12px", borderRadius: "10px", fontWeight: "bold", cursor: "pointer" },
  registerButton: { width: "100%", background: "transparent", color: "white", border: "1px solid white", padding: "12px", borderRadius: "10px", fontWeight: "bold", cursor: "pointer" },
  error: { margin: 0, color: "#fecaca", fontWeight: "bold", fontSize: "14px" },
};

export default UserRegister;
