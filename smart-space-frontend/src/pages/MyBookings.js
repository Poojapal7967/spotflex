import React, { useEffect, useState } from "react";
import { bookingsApi } from "../services/api";
import { getStoredUser } from "../utils/auth";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError("");

      try {
        const user = getStoredUser();
        if (!user?.id) {
          setBookings([]);
          setLoading(false);
          return;
        }
        const res = await bookingsApi.listByUser(user.id);
        setBookings(Array.isArray(res.data) ? res.data : []);
      } catch {
        setError("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const cancelBooking = async (bookingId) => {
    const confirmed = window.confirm("Cancel this booking?");
    if (!confirmed) return;

    try {
      await bookingsApi.remove(bookingId);
      setBookings((prev) => prev.filter((booking) => booking._id !== bookingId));
    } catch {
      setError("Cancel booking is not available right now.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>My Bookings</h1>

      {loading && <p style={styles.message}>Loading bookings...</p>}
      {!loading && error && <p style={{ ...styles.message, color: "#fecaca" }}>{error}</p>}
      {!loading && !error && bookings.length === 0 && <p style={styles.message}>No bookings found.</p>}

      {!loading && !error && bookings.length > 0 && (
        <div style={styles.grid}>
          {bookings.map((booking) => (
            <div key={booking._id} style={styles.card}>
              <h2>{booking.spaceTitle}</h2>
              <p>📍 {booking.location}</p>
              <h3>₹ {booking.price}</h3>
              <p>📅 {booking.date}</p>
              <p>⏰ {booking.startTime} - {booking.endTime}</p>
              <button style={styles.cancelButton} onClick={() => cancelBooking(booking._id)}>Cancel Booking</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", padding: "30px", background: "#0f172a" },
  heading: { color: "white", marginBottom: "24px", fontSize: "36px" },
  message: { color: "white", background: "rgba(255,255,255,0.08)", padding: "12px", borderRadius: "8px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "25px" },
  card: { background: "rgba(255,255,255,0.08)", borderRadius: "20px", padding: "20px", color: "white", backdropFilter: "blur(10px)" },
  cancelButton: { marginTop: "10px", width: "100%", background: "#dc2626", color: "white", border: "none", padding: "10px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" },
};

export default MyBookings;
