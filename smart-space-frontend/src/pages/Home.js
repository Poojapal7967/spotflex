import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const toMinutes = (time) => {
  if (!time || !time.includes(":")) return NaN;
  const [hours, minutes] = time.split(":").map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return NaN;
  return hours * 60 + minutes;
};

function Home() {
  const [spaces, setSpaces] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState(null);

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [query, setQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    fetchSpaces();
  }, []);

  const fetchSpaces = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/spaces");
      setSpaces(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredSpaces = useMemo(() => {
    return spaces.filter((space) => {
      const title = (space.title || "").toLowerCase();
      const location = (space.location || "").toLowerCase();
      const searchText = query.trim().toLowerCase();
      const numericPrice = Number(space.price) || 0;

      const matchesSearch = !searchText || title.includes(searchText) || location.includes(searchText);
      const matchesPrice = !maxPrice || numericPrice <= Number(maxPrice);

      return matchesSearch && matchesPrice;
    });
  }, [spaces, query, maxPrice]);

  const openBooking = (space) => setSelectedSpace(space);

  const closeBooking = () => {
    setSelectedSpace(null);
    setDate("");
    setStartTime("");
    setEndTime("");
  };

  const handleBooking = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return alert("Please login first");
      if (!date || !startTime || !endTime) return alert("Fill all details");
      const startMinutes = toMinutes(startTime);
      const endMinutes = toMinutes(endTime);
      if (Number.isNaN(startMinutes) || Number.isNaN(endMinutes)) {
        return alert("Invalid time format");
      }
      if (endMinutes <= startMinutes) {
        return alert("End time must be after start time");
      }
      const selectedStartDateTime = new Date(`${date}T${startTime}`);
      if (Number.isNaN(selectedStartDateTime.getTime())) {
        return alert("Invalid date/time selected");
      }
      if (selectedStartDateTime < new Date()) {
        return alert("Past slot booking is not allowed");
      }

      await axios.post("http://localhost:5000/api/bookings/create", {
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

      alert("Booking successful 🚀");
      closeBooking();
    } catch (error) {
      console.log(error);
      const message = error?.response?.data?.message || "Booking failed";
      alert(message);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.heading}>Find your perfect short-term space</h1>
        <p style={styles.tagline}>Browse available places and reserve in just a few clicks.</p>
      </header>

      <section style={styles.filterBar}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title or location"
          style={styles.input}
        />
        <input
          type="number"
          min="0"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Max price"
          style={styles.input}
        />
        <button style={styles.clearBtn} onClick={() => { setQuery(""); setMaxPrice(""); }}>
          Clear
        </button>
      </section>

      <p style={styles.countText}>{filteredSpaces.length} space(s) found</p>

      <div style={styles.grid}>
        {filteredSpaces.map((space) => (
          <div key={space._id} style={styles.card}>
            <img src={space.image || "https://via.placeholder.com/500x280"} alt="space" style={styles.image} />
            <div style={styles.cardBody}>
              <h2 style={styles.title}>{space.title || "Space"}</h2>
              <p style={styles.text}>📍 {space.location || "Location"}</p>
              <h3 style={styles.price}>₹ {space.price || 0}</h3>
              <button style={styles.button} onClick={() => openBooking(space)}>
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {!filteredSpaces.length && (
        <div style={styles.emptyState}>
          <h3 style={styles.emptyTitle}>No spaces match your search</h3>
          <p style={styles.emptyText}>Try a different keyword or increase the max price.</p>
        </div>
      )}

      {selectedSpace && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2 style={styles.modalTitle}>{selectedSpace.title}</h2>
            <p style={styles.modalText}>📍 {selectedSpace.location}</p>
            <h3 style={styles.modalPrice}>₹ {selectedSpace.price}</h3>

            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={styles.modalInput}
            />
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              style={styles.modalInput}
            />
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} style={styles.modalInput} />

            <button style={styles.payBtn} onClick={handleBooking}>
              Proceed To Payment
            </button>
            <button style={styles.closeBtn} onClick={closeBooking}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "30px 24px 44px",
    minHeight: "100vh",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "18px",
  },
  heading: {
    color: "#f8fafc",
    fontSize: "clamp(28px,4vw,42px)",
    marginBottom: "8px",
  },
  tagline: {
    color: "#94a3b8",
  },
  filterBar: {
    marginTop: "16px",
    marginBottom: "14px",
    display: "grid",
    gridTemplateColumns: "2fr 1fr auto",
    gap: "10px",
  },
  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid rgba(148,163,184,0.35)",
    background: "rgba(15,23,42,0.65)",
    color: "#f8fafc",
  },
  clearBtn: {
    border: "1px solid rgba(148,163,184,0.35)",
    background: "transparent",
    color: "#e2e8f0",
    borderRadius: "10px",
    padding: "0 14px",
    fontWeight: 700,
  },
  countText: {
    color: "#cbd5e1",
    marginBottom: "12px",
    fontSize: "14px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "16px",
    marginTop: "8px",
  },
  card: {
    background: "rgba(15,23,42,0.62)",
    border: "1px solid rgba(148,163,184,0.2)",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 14px 30px rgba(2,6,23,0.28)",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },
  cardBody: {
    padding: "14px",
  },
  title: {
    color: "#f8fafc",
    marginBottom: "6px",
  },
  text: {
    color: "#94a3b8",
    marginBottom: "8px",
  },
  price: {
    color: "#7dd3fc",
    marginBottom: "10px",
  },
  button: {
    width: "100%",
    background: "linear-gradient(90deg,#2563eb,#38bdf8)",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: "10px",
    fontWeight: 700,
  },
  emptyState: {
    marginTop: "20px",
    textAlign: "center",
    border: "1px dashed rgba(148,163,184,0.35)",
    borderRadius: "14px",
    padding: "22px",
    background: "rgba(15,23,42,0.4)",
  },
  emptyTitle: {
    color: "#e2e8f0",
    marginBottom: "6px",
  },
  emptyText: {
    color: "#94a3b8",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(2,6,23,0.76)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    animation: "fadeIn 0.25s ease",
    padding: "20px",
    zIndex: 2000,
  },
  modal: {
    background: "#0f172a",
    border: "1px solid rgba(148,163,184,0.28)",
    padding: "22px",
    borderRadius: "16px",
    width: "min(420px, 100%)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    animation: "slideUp 0.25s ease",
  },
  modalTitle: {
    color: "#f8fafc",
  },
  modalText: {
    color: "#94a3b8",
  },
  modalPrice: {
    color: "#7dd3fc",
  },
  modalInput: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid rgba(148,163,184,0.35)",
    background: "#0b122e",
    color: "#f8fafc",
  },
  payBtn: {
    background: "#16a34a",
    color: "white",
    border: "none",
    padding: "11px",
    borderRadius: "8px",
    fontWeight: 700,
    marginTop: "4px",
  },
  closeBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "11px",
    borderRadius: "8px",
    fontWeight: 700,
  },
};

export default Home;
