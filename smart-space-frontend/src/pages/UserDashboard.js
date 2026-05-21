import React, { useMemo, useState } from "react";
import { spaces } from "../data/marketplaceData";

const tabs = ["Profile", "My bookings", "Saved/Favorites", "Booking history", "Notifications"];

function UserDashboard() {
  const user = useMemo(() => JSON.parse(localStorage.getItem("user") || "{}"), []);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const favorites = JSON.parse(localStorage.getItem("wishlist") || "[]");

  const favoriteSpaces = spaces.filter((space) => favorites.includes(space.id));

  return (
    <div style={styles.page}>
      <h1>User Dashboard</h1>
      <div style={styles.tabRow}>
        {tabs.map((tab) => (
          <button key={tab} type="button" onClick={() => setActiveTab(tab)} style={{ ...styles.tabButton, ...(activeTab === tab ? styles.tabActive : {}) }}>
            {tab}
          </button>
        ))}
      </div>

      <section style={styles.card}>
        {activeTab === "Profile" && (
          <div>
            <h2>Profile details</h2>
            <p>Name: {user?.name || "Guest user"}</p>
            <p>Email: {user?.email || "guest@spotflex.app"}</p>
            <p>Phone: +91 99999 00000</p>
          </div>
        )}

        {activeTab === "My bookings" && (
          <div>
            <h2>My bookings</h2>
            <ul>
              <li>Skyline Co-Work Hub • 25 May • 12:00 - 14:00</li>
              <li>Pulse Meeting Suite • 28 May • 10:00 - 12:00</li>
            </ul>
          </div>
        )}

        {activeTab === "Saved/Favorites" && (
          <div>
            <h2>Saved / Favorites</h2>
            {favoriteSpaces.length ? (
              <ul>{favoriteSpaces.map((space) => <li key={space.id}>{space.title} • ₹{space.pricePerHour}/hour</li>)}</ul>
            ) : (
              <p>No favorites yet. Add from Home/Explore.</p>
            )}
          </div>
        )}

        {activeTab === "Booking history" && (
          <div>
            <h2>Booking history</h2>
            <ul>
              <li>Aura Event Hall • Completed • ₹15999</li>
              <li>Central Office Pods • Completed • ₹5799</li>
            </ul>
          </div>
        )}

        {activeTab === "Notifications" && (
          <div>
            <h2>Notifications</h2>
            <ul>
              <li>Your booking request is approved.</li>
              <li>Coupon FLEX15 expires in 2 days.</li>
              <li>New nearby studio listing matches your preferences.</li>
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}

const styles = {
  page: { maxWidth: 1000, margin: "0 auto", padding: 24 },
  tabRow: { display: "flex", gap: 8, flexWrap: "wrap", margin: "12px 0" },
  tabButton: { border: "1px solid rgba(148,163,184,0.35)", borderRadius: 999, background: "transparent", color: "#cbd5e1", padding: "8px 12px" },
  tabActive: { background: "rgba(56,189,248,0.2)", color: "#e0f2fe", borderColor: "rgba(56,189,248,0.6)" },
  card: { border: "1px solid rgba(148,163,184,0.2)", borderRadius: 14, padding: 16, background: "rgba(15,23,42,0.7)" }
};

export default UserDashboard;
