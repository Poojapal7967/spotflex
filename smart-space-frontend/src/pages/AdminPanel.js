import React, { useState } from "react";
import { adminUsers, reports, spaces } from "../data/marketplaceData";

function AdminPanel() {
  const [spaceStatus, setSpaceStatus] = useState(() =>
    spaces.reduce((acc, space) => {
      acc[space.id] = "Pending";
      return acc;
    }, {})
  );

  const updateSpace = (spaceId, status) => {
    setSpaceStatus({ ...spaceStatus, [spaceId]: status });
  };

  return (
    <div style={styles.page}>
      <h1>Admin Panel</h1>

      <section style={styles.card}>
        <h2>Dashboard charts</h2>
        <div style={styles.chartRow}>
          <div style={styles.chartCard}><h3>Users</h3><p>1,248 total</p></div>
          <div style={styles.chartCard}><h3>Bookings</h3><p>785 monthly</p></div>
          <div style={styles.chartCard}><h3>Revenue</h3><p>₹18.2L</p></div>
        </div>
      </section>

      <section style={styles.card}>
        <h2>Manage users</h2>
        <ul>{adminUsers.map((user) => <li key={user.id}>{user.name} • {user.role} • {user.status}</li>)}</ul>
      </section>

      <section style={styles.card}>
        <h2>Approve spaces / remove fake listings</h2>
        {spaces.map((space) => (
          <div key={space.id} style={styles.row}>
            <span>{space.title}</span>
            <span style={styles.status}>{spaceStatus[space.id]}</span>
            <button type="button" style={styles.actionBtn} onClick={() => updateSpace(space.id, "Approved")}>Approve</button>
            <button type="button" style={styles.actionBtn} onClick={() => updateSpace(space.id, "Rejected")}>Reject</button>
            <button type="button" style={styles.actionBtn} onClick={() => updateSpace(space.id, "Removed")}>Remove Fake</button>
          </div>
        ))}
      </section>

      <section style={styles.card}>
        <h2>Reports</h2>
        <ul>{reports.map((report) => <li key={report.id}>{report.listing} • {report.reason} • {report.severity}</li>)}</ul>
      </section>
    </div>
  );
}

const styles = {
  page: { maxWidth: 1100, margin: "0 auto", padding: 24 },
  card: { border: "1px solid rgba(148,163,184,0.2)", borderRadius: 14, padding: 14, marginBottom: 14, background: "rgba(15,23,42,0.7)" },
  chartRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 10 },
  chartCard: { border: "1px solid rgba(148,163,184,0.2)", borderRadius: 10, padding: 12, background: "rgba(15,23,42,0.8)" },
  row: { display: "grid", gridTemplateColumns: "2fr 1fr auto auto auto", gap: 8, alignItems: "center", marginTop: 8 },
  status: { color: "#7dd3fc" },
  actionBtn: { border: "1px solid rgba(148,163,184,0.35)", borderRadius: 8, background: "transparent", color: "#e2e8f0", padding: "6px 10px" }
};

export default AdminPanel;
