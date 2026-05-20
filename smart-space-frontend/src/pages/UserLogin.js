import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../services/api";
import { persistAuth } from "../utils/auth";

function UserLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email.trim() || !password.trim()) return "Email and password are required.";
    if (!email.includes("@")) return "Please enter a valid email.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await authApi.login({ email: email.trim(), password });
      if (res.data.user.role !== "user") {
        setError("Please use owner login for owner account.");
        setLoading(false);
        return;
      }
      persistAuth(res.data.token, res.data.user);
      navigate("/home");
    } catch {
      setError("Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleLogin}>
        <h1 style={styles.title}>User Login</h1>

        {error && <p style={styles.error}>{error}</p>}

        <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
        <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />

        <button style={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={styles.text}>Don't have account?</p>

        <Link to="/user-register">
          <button type="button" style={styles.registerButton}>Register</button>
        </Link>
      </form>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(to right,#0f172a,#1e3a8a)", padding: "20px" },
  card: { width: "350px", padding: "34px", borderRadius: "20px", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(10px)", display: "flex", flexDirection: "column", gap: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" },
  title: { textAlign: "center", color: "white", margin: 0 },
  input: { padding: "12px", borderRadius: "10px", border: "none", outline: "none", fontSize: "16px" },
  button: { background: "linear-gradient(to right,#2563eb,#38bdf8)", color: "white", border: "none", padding: "12px", borderRadius: "10px", fontWeight: "bold", fontSize: "16px", cursor: "pointer" },
  registerButton: { width: "100%", background: "transparent", color: "white", border: "1px solid white", padding: "12px", borderRadius: "10px", fontWeight: "bold", cursor: "pointer" },
  text: { textAlign: "center", color: "white", margin: 0 },
  error: { margin: 0, color: "#fecaca", fontWeight: "bold", fontSize: "14px" },
};

export default UserLogin;
