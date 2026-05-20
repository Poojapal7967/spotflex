import React from "react";
import { Link } from "react-router-dom";

const highlights = [
  {
    title: "Instant Discovery",
    text: "Find parking, workspaces, and event spots in seconds with flexible durations.",
    icon: "⚡",
  },
  {
    title: "Secure Experience",
    text: "Reliable bookings with transparent pricing and clear availability.",
    icon: "🔒",
  },
  {
    title: "Built for Owners",
    text: "Turn unused areas into revenue through fast listing and management.",
    icon: "📈",
  },
];

function LandingPage() {
  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.overlay}>
          <p style={styles.badge}>Smart Space Marketplace</p>
          <h1 style={styles.title}>SpotFlex</h1>
          <p style={styles.subtitle}>
            Discover and book short-term spaces across the city — fast, secure, and on your
            schedule.
          </p>

          <div style={styles.actionRow}>
            <Link to="/home" style={styles.primaryBtn}>
              Explore Spaces
            </Link>
            <Link to="/user-register" style={styles.ghostBtn}>
              Create Account
            </Link>
          </div>

          <div style={styles.authCards}>
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>For Users</h2>
              <p style={styles.cardText}>Book nearby spaces for work, parking, and meetings.</p>
              <div style={styles.cardActions}>
                <Link to="/user-login" style={styles.smallPrimaryBtn}>
                  Login
                </Link>
                <Link to="/user-register" style={styles.smallGhostBtn}>
                  Register
                </Link>
              </div>
            </div>

            <div style={styles.card}>
              <h2 style={styles.cardTitle}>For Owners</h2>
              <p style={styles.cardText}>List your space and manage bookings from one dashboard.</p>
              <div style={styles.cardActions}>
                <Link to="/owner-login" style={styles.smallPrimaryBtn}>
                  Login
                </Link>
                <Link to="/owner-register" style={styles.smallGhostBtn}>
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.statsWrap}>
        <div style={styles.statCard}>
          <h3 style={styles.statNum}>24/7</h3>
          <p style={styles.statLabel}>Booking Access</p>
        </div>
        <div style={styles.statCard}>
          <h3 style={styles.statNum}>Flexible</h3>
          <p style={styles.statLabel}>Hourly / Daily Rentals</p>
        </div>
        <div style={styles.statCard}>
          <h3 style={styles.statNum}>Fast</h3>
          <p style={styles.statLabel}>One-Click Confirmation</p>
        </div>
      </section>

      <section style={styles.featureSection}>
        <h2 style={styles.sectionTitle}>Why people choose SpotFlex</h2>
        <div style={styles.featureGrid}>
          {highlights.map((item) => (
            <article key={item.title} style={styles.featureCard}>
              <span style={styles.featureIcon}>{item.icon}</span>
              <h3 style={styles.featureTitle}>{item.title}</h3>
              <p style={styles.featureText}>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    paddingBottom: "48px",
  },
  hero: {
    minHeight: "78vh",
    backgroundImage:
      "linear-gradient(120deg, rgba(2,6,23,0.88), rgba(15,23,42,0.72)), url('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderBottom: "1px solid rgba(148,163,184,0.22)",
  },
  overlay: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "64px 24px 56px",
  },
  badge: {
    display: "inline-block",
    padding: "8px 12px",
    borderRadius: "999px",
    background: "rgba(56,189,248,0.2)",
    color: "#bae6fd",
    fontWeight: 700,
    marginBottom: "16px",
  },
  title: {
    fontSize: "clamp(44px, 7vw, 74px)",
    lineHeight: 1,
    color: "#f8fafc",
    marginBottom: "14px",
  },
  subtitle: {
    maxWidth: "680px",
    color: "#cbd5e1",
    fontSize: "18px",
    lineHeight: 1.6,
  },
  actionRow: {
    display: "flex",
    gap: "12px",
    marginTop: "26px",
    flexWrap: "wrap",
  },
  primaryBtn: {
    background: "linear-gradient(90deg,#2563eb,#38bdf8)",
    color: "#fff",
    borderRadius: "12px",
    padding: "12px 18px",
    fontWeight: 700,
  },
  ghostBtn: {
    border: "1px solid rgba(226,232,240,0.45)",
    color: "#f8fafc",
    borderRadius: "12px",
    padding: "12px 18px",
    fontWeight: 700,
  },
  authCards: {
    marginTop: "32px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "18px",
  },
  card: {
    background: "rgba(15, 23, 42, 0.62)",
    border: "1px solid rgba(148,163,184,0.28)",
    borderRadius: "16px",
    padding: "20px",
    backdropFilter: "blur(10px)",
  },
  cardTitle: {
    color: "#e2e8f0",
    marginBottom: "10px",
  },
  cardText: {
    color: "#94a3b8",
    marginBottom: "14px",
    lineHeight: 1.5,
  },
  cardActions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  smallPrimaryBtn: {
    background: "linear-gradient(90deg,#2563eb,#38bdf8)",
    color: "#fff",
    borderRadius: "10px",
    padding: "10px 14px",
    fontWeight: 700,
  },
  smallGhostBtn: {
    border: "1px solid rgba(226,232,240,0.45)",
    color: "#f8fafc",
    borderRadius: "10px",
    padding: "10px 14px",
    fontWeight: 700,
  },
  statsWrap: {
    maxWidth: "1100px",
    margin: "22px auto 0",
    padding: "0 24px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
    gap: "14px",
  },
  statCard: {
    background: "rgba(15,23,42,0.58)",
    border: "1px solid rgba(148,163,184,0.2)",
    borderRadius: "14px",
    padding: "18px",
  },
  statNum: {
    color: "#7dd3fc",
    fontSize: "28px",
    marginBottom: "6px",
  },
  statLabel: {
    color: "#cbd5e1",
  },
  featureSection: {
    maxWidth: "1100px",
    margin: "36px auto 0",
    padding: "0 24px",
  },
  sectionTitle: {
    color: "#f8fafc",
    marginBottom: "16px",
    fontSize: "28px",
  },
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
    gap: "14px",
  },
  featureCard: {
    background: "rgba(15,23,42,0.58)",
    border: "1px solid rgba(148,163,184,0.2)",
    borderRadius: "14px",
    padding: "18px",
  },
  featureIcon: {
    fontSize: "20px",
    display: "inline-block",
    marginBottom: "10px",
  },
  featureTitle: {
    color: "#e2e8f0",
    marginBottom: "8px",
  },
  featureText: {
    color: "#94a3b8",
    lineHeight: 1.5,
  },
};

export default LandingPage;
