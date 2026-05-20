import React, { useEffect, useMemo, useState } from "react";
import { bookingsApi, spacesApi } from "../services/api";
import { getStoredUser } from "../utils/auth";

const toMinutes = (time) => {
  if (!time || !time.includes(":")) return null;
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

function Home() {
  const [spaces, setSpaces] = useState([]);
  const [loadingSpaces, setLoadingSpaces] = useState(true);
  const [spacesError, setSpacesError] = useState("");

  const [searchLocation, setSearchLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("priceLowToHigh");

  const [selectedSpace, setSelectedSpace] = useState(null);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [myBookings, setMyBookings] = useState([]);

  useEffect(() => {
    const fetchSpaces = async () => {
      setLoadingSpaces(true);
      setSpacesError("");
      try {
        const res = await spacesApi.list();
        setSpaces(Array.isArray(res.data) ? res.data : []);
      } catch {
        setSpacesError("Failed to load spaces.");
      } finally {
        setLoadingSpaces(false);
      }
    };

    fetchSpaces();
  }, []);

  const openBooking = async (space) => {
    setSelectedSpace(space);
    setDate("");
    setStartTime("");
    setEndTime("");
    setBookingError("");
    setBookingSuccess("");

    const user = getStoredUser();
    if (!user?.id) return;

    try {
      const res = await bookingsApi.listByUser(user.id);
      setMyBookings(Array.isArray(res.data) ? res.data : []);
    } catch {
      setMyBookings([]);
    }
  };

  const closeBooking = () => setSelectedSpace(null);

  const filteredSpaces = useMemo(() => {
    let result = [...spaces];

    if (searchLocation.trim()) {
      const query = searchLocation.toLowerCase().trim();
      result = result.filter((space) => String(space.location || "").toLowerCase().includes(query));
    }

    if (minPrice !== "") {
      result = result.filter((space) => Number(space.price || 0) >= Number(minPrice));
    }

    if (maxPrice !== "") {
      result = result.filter((space) => Number(space.price || 0) <= Number(maxPrice));
    }

    if (sortBy === "priceLowToHigh") {
      result.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    } else if (sortBy === "priceHighToLow") {
      result.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
    } else if (sortBy === "rating") {
      result.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
    }

    return result;
  }, [spaces, searchLocation, minPrice, maxPrice, sortBy]);

  const handleBooking = async () => {
    setBookingError("");
    setBookingSuccess("");

    const user = getStoredUser();
    if (!user?.id) {
      setBookingError("Please login first.");
      return;
    }

    if (!selectedSpace?._id) {
      setBookingError("Please select a space.");
      return;
    }

    if (!date || !startTime || !endTime) {
      setBookingError("Date, start time, and end time are required.");
      return;
    }

    const start = toMinutes(startTime);
    const end = toMinutes(endTime);
    if (start == null || end == null || start >= end) {
      setBookingError("End time must be after start time.");
      return;
    }

    const hasConflict = myBookings.some((booking) => {
      if (booking.spaceId !== selectedSpace._id || booking.date !== date) return false;
      const existingStart = toMinutes(booking.startTime);
      const existingEnd = toMinutes(booking.endTime);
      if (existingStart == null || existingEnd == null) return false;
      return start < existingEnd && end > existingStart;
    });

    if (hasConflict) {
      setBookingError("This time slot conflicts with your existing booking.");
      return;
    }

    setBookingLoading(true);

    try {
      await bookingsApi.create({
        userId: user.id,
        userName: user.name,
        spaceId: selectedSpace._id,
        spaceTitle: selectedSpace.title,
        location: selectedSpace.location,
        price: selectedSpace.price,
        date,
        startTime,
        endTime,
      });

      setBookingSuccess("Booking successful.");
    } catch {
      setBookingError("Booking failed.");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Flexible Short-Term Space Booking Platform</h1>
      <p>Rent spaces anytime, anywhere.</p>

      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Search by location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          min="0"
          placeholder="Min price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          min="0"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={styles.input}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={styles.input}>
          <option value="priceLowToHigh">Sort: Price Low → High</option>
          <option value="priceHighToLow">Sort: Price High → Low</option>
          <option value="rating">Sort: Rating</option>
        </select>
      </div>

      {loadingSpaces && <p>Loading spaces...</p>}
      {!loadingSpaces && spacesError && <p style={styles.error}>{spacesError}</p>}
      {!loadingSpaces && !spacesError && filteredSpaces.length === 0 && <p style={styles.empty}>No spaces found for selected filters.</p>}

      {!loadingSpaces && !spacesError && filteredSpaces.length > 0 && (
        <div style={styles.grid}>
          {filteredSpaces.map((space) => (
            <div key={space._id} style={styles.card}>
              <img src={space.image || "https://via.placeholder.com/300"} alt="space" style={styles.image} />
              <h2 style={styles.title}>{space.title || "Space"}</h2>
              <p style={styles.text}>📍 {space.location || "Location"}</p>
              <h3 style={styles.price}>₹ {space.price || 0}</h3>
              <button style={styles.button} onClick={() => openBooking(space)}>Book Now</button>
            </div>
          ))}
        </div>
      )}

      {selectedSpace && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2 style={styles.modalTitle}>{selectedSpace.title}</h2>
            <p style={styles.modalText}>📍 {selectedSpace.location}</p>
            <h3 style={styles.modalPrice}>₹ {selectedSpace.price}</h3>

            <div style={styles.summaryCard}>
              <strong>Booking Summary</strong>
              <p style={styles.summaryLine}>Space: {selectedSpace.title}</p>
              <p style={styles.summaryLine}>Location: {selectedSpace.location}</p>
              <p style={styles.summaryLine}>Price: ₹ {selectedSpace.price}</p>
            </div>

            {bookingError && <p style={styles.error}>{bookingError}</p>}
            {bookingSuccess && <p style={styles.success}>{bookingSuccess}</p>}

            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={styles.input} />
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} style={styles.input} />
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} style={styles.input} />

            <button style={styles.payBtn} onClick={handleBooking} disabled={bookingLoading}>
              {bookingLoading ? "Processing..." : "Proceed To Payment"}
            </button>
            <button style={styles.closeBtn} onClick={closeBooking}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: "30px", fontFamily: "Arial", background: "#f3f4f6", minHeight: "100vh" },
  filters: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "10px", marginTop: "15px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "20px", marginTop: "24px" },
  card: { background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.08)", textAlign: "left" },
  image: { width: "100%", height: "200px", objectFit: "cover" },
  title: { color: "#111", margin: "10px" },
  text: { color: "#555", margin: "0 10px 8px" },
  price: { color: "#111", margin: "0 10px 8px" },
  button: { background: "#2563eb", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer", margin: "0 10px 12px" },
  overlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1100 },
  modal: { background: "white", padding: "20px", borderRadius: "16px", width: "min(420px,90vw)", display: "flex", flexDirection: "column", gap: "10px" },
  modalTitle: { color: "#111", margin: 0 },
  modalText: { color: "#555", margin: 0 },
  modalPrice: { color: "#111", margin: 0 },
  input: { padding: "10px", borderRadius: "5px", border: "1px solid #ccc", background: "white", color: "black", fontSize: "16px" },
  payBtn: { background: "green", color: "white", border: "none", padding: "12px", borderRadius: "5px", cursor: "pointer" },
  closeBtn: { background: "#dc2626", color: "white", border: "none", padding: "12px", borderRadius: "5px", cursor: "pointer" },
  error: { margin: 0, color: "#dc2626", fontWeight: "bold", fontSize: "14px" },
  success: { margin: 0, color: "#059669", fontWeight: "bold", fontSize: "14px" },
  empty: { background: "white", padding: "14px", borderRadius: "8px", marginTop: "18px" },
  summaryCard: { background: "#f8fafc", border: "1px solid #dbeafe", borderRadius: "8px", padding: "10px" },
  summaryLine: { margin: "4px 0", fontSize: "14px" },
};

export default Home;
