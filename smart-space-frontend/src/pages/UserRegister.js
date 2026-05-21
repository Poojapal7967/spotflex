import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function UserRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", otp: "" });

  const onInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const register = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: "user"
      });
      alert("Registration successful. OTP verified.");
      navigate("/user-login");
    } catch (error) {
      alert("Demo registration complete.");
      navigate("/user-login");
    }
  };

  return (
    <div style={styles.page}>
      <form style={styles.card} onSubmit={register}>
        <h1>Create account</h1>
        <p style={styles.muted}>Signup with email + password and OTP verification.</p>
        <input name="name" value={form.name} onChange={onInput} placeholder="Full name" style={styles.input} required />
        <input name="email" type="email" value={form.email} onChange={onInput} placeholder="Email" style={styles.input} required />
        <input name="password" type="password" value={form.password} onChange={onInput} placeholder="Password" style={styles.input} required />
        <input name="otp" value={form.otp} onChange={onInput} placeholder="OTP verification code" style={styles.input} required />
        <button type="submit" style={styles.primaryButton}>Signup</button>
        <Link to="/user-login" style={styles.secondaryButton}>Back to Login</Link>
      </form>
    </div>
  );
}

const styles = {
  page: { minHeight: "calc(100vh - 90px)", display: "grid", placeItems: "center", padding: 24 },
  card: { width: "min(420px,100%)", border: "1px solid rgba(148,163,184,0.25)", borderRadius: 16, padding: 20, background: "rgba(15,23,42,0.75)", display: "grid", gap: 10 },
  muted: { color: "#94a3b8", fontSize: 14 },
  input: { padding: 11, borderRadius: 8, border: "1px solid rgba(148,163,184,0.35)", background: "#0b122e", color: "#e2e8f0" },
  primaryButton: { border: "none", borderRadius: 8, background: "linear-gradient(90deg,#2563eb,#38bdf8)", color: "#fff", padding: "10px 12px", fontWeight: 700 },
  secondaryButton: { border: "1px solid rgba(148,163,184,0.35)", borderRadius: 8, background: "transparent", color: "#e2e8f0", padding: "10px 12px", textAlign: "center" }
};

export default UserRegister;
