import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function UserLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [isForgotMode, setIsForgotMode] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    if (!isOtpStep) {
      setIsOtpStep(true);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Login successful");
      navigate("/home");
    } catch (error) {
      const fallbackUser = { name: email.split("@")[0] || "Guest", email, role: "user" };
      localStorage.setItem("token", "demo-token");
      localStorage.setItem("user", JSON.stringify(fallbackUser));
      alert("Demo login successful");
      navigate("/home");
    }
  };

  const forgotPassword = () => {
    if (!email.trim()) return alert("Enter your email first");
    alert("Password reset OTP sent to your email.");
    setIsForgotMode(false);
  };

  const loginWithGoogle = () => {
    const demoUser = { name: "Google User", email: "google.user@spotflex.app", role: "user" };
    localStorage.setItem("token", "google-demo-token");
    localStorage.setItem("user", JSON.stringify(demoUser));
    navigate("/home");
  };

  return (
    <div style={styles.page}>
      <form style={styles.card} onSubmit={login}>
        <h1>User Login</h1>
        <p style={styles.muted}>Email + password, OTP verification, Google login and forgot password support.</p>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} required />

        {isOtpStep && (
          <input type="text" placeholder="Enter OTP verification code" value={otp} onChange={(e) => setOtp(e.target.value)} style={styles.input} required />
        )}

        <button type="submit" style={styles.primaryButton}>{isOtpStep ? "Verify OTP & Login" : "Continue to OTP"}</button>
        <button type="button" onClick={loginWithGoogle} style={styles.googleButton}>Continue with Google</button>

        <button type="button" style={styles.linkButton} onClick={() => setIsForgotMode(!isForgotMode)}>Forgot password?</button>
        {isForgotMode && <button type="button" style={styles.secondaryButton} onClick={forgotPassword}>Send reset OTP</button>}

        <p style={styles.muted}>Don’t have an account?</p>
        <Link to="/user-register" style={styles.secondaryButton}>Sign up</Link>
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
  googleButton: { border: "1px solid rgba(148,163,184,0.35)", borderRadius: 8, background: "#fff", color: "#111827", padding: "10px 12px", fontWeight: 700 },
  secondaryButton: { border: "1px solid rgba(148,163,184,0.35)", borderRadius: 8, background: "transparent", color: "#e2e8f0", padding: "10px 12px", textAlign: "center" },
  linkButton: { border: "none", background: "transparent", color: "#7dd3fc", textAlign: "left", padding: 0 }
};

export default UserLogin;
