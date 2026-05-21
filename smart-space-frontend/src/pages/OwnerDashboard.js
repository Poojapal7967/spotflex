import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { bookingRequests, spaces } from "../data/marketplaceData";

function OwnerDashboard() {
  const totalRevenue = useMemo(() => bookingRequests.reduce((sum, item) => sum + item.amount, 0), []);

  return (
    <div style={styles.page}>
      <h1>Owner Dashboard</h1>

      <section style={styles.metricsGrid}>
        <article style={styles.metricCard}><h3>Total bookings</h3><p>{bookingRequests.length}</p></article>
        <article style={styles.metricCard}><h3>Revenue</h3><p>₹{totalRevenue}</p></article>
        <article style={styles.metricCard}><h3>Manage listings</h3><p>{spaces.length} active</p></article>
        <article style={styles.metricCard}><h3>Analytics</h3><p>+18% monthly growth</p></article>
      </section>

      <section style={styles.card}>
        <div style={styles.rowHeader}>
          <h2>Manage listings</h2>
          <Link to="/add-space" style={styles.primaryButton}>+ Add listing</Link>
        </div>
        <div style={styles.listingGrid}>
          {spaces.map((space) => (
            <article key={space.id} style={styles.listingCard}>
              <h3>{space.title}</h3>
              <p style={styles.muted}>{space.location} • {space.type}</p>
              <p style={styles.muted}>₹{space.pricePerHour}/hour • Capacity {space.capacity}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={styles.card}>
        <h2>Booking requests</h2>
        {bookingRequests.map((request) => (
          <div key={request.id} style={styles.requestRow}>
            <span>{request.requester} requested {request.space} for {request.date}</span>
            <span style={styles.muted}>₹{request.amount}</span>
            <button type="button" style={styles.secondaryButton}>Accept</button>
            <button type="button" style={styles.secondaryButton}>Decline</button>
          </div>
        ))}
      </section>
    </div>
  );
}

const styles = {
  page: { maxWidth: 1100, margin: "0 auto", padding: 24 },
  metricsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 10, marginBottom: 14 },
  metricCard: { border: "1px solid rgba(148,163,184,0.2)", borderRadius: 12, padding: 12, background: "rgba(15,23,42,0.72)" },
  card: { border: "1px solid rgba(148,163,184,0.2)", borderRadius: 14, padding: 14, marginBottom: 14, background: "rgba(15,23,42,0.72)" },
  rowHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  listingGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 10 },
  listingCard: { border: "1px solid rgba(148,163,184,0.2)", borderRadius: 10, padding: 10, background: "rgba(15,23,42,0.8)" },
  requestRow: { display: "grid", gridTemplateColumns: "2fr 1fr auto auto", gap: 8, alignItems: "center", marginTop: 8 },
  muted: { color: "#94a3b8" },
  primaryButton: { background: "linear-gradient(90deg,#2563eb,#38bdf8)", color: "#fff", borderRadius: 8, padding: "8px 12px", fontWeight: 700 },
  secondaryButton: { border: "1px solid rgba(148,163,184,0.35)", borderRadius: 8, background: "transparent", color: "#e2e8f0", padding: "6px 10px" }
};

export default OwnerDashboard;
