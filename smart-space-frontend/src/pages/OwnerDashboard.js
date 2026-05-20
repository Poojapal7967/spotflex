import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { spacesApi } from "../services/api";

const pageSize = 6;

function OwnerDashboard() {
  const navigate = useNavigate();
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingSpace, setEditingSpace] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const [page, setPage] = useState(1);

  const fetchSpaces = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await spacesApi.list();
      setSpaces(Array.isArray(res.data) ? res.data : []);
    } catch {
      setError("Failed to load spaces.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpaces();
  }, []);

  const totalPages = Math.max(1, Math.ceil(spaces.length / pageSize));
  const pagedSpaces = useMemo(() => {
    const start = (page - 1) * pageSize;
    return spaces.slice(start, start + pageSize);
  }, [page, spaces]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const deleteSpace = async (id) => {
    const confirmed = window.confirm("Delete this space?");
    if (!confirmed) return;

    try {
      await spacesApi.remove(id);
      await fetchSpaces();
    } catch {
      setError("Delete failed.");
    }
  };

  const openEdit = (space) => {
    setEditingSpace(space);
    setTitle(space.title || "");
    setLocation(space.location || "");
    setPrice(String(space.price || ""));
    setImage(space.image || "");
  };

  const updateSpace = async () => {
    if (!editingSpace?._id) return;
    if (!title.trim() || !location.trim() || Number(price) <= 0) {
      setError("Valid title, location, and price are required.");
      return;
    }

    try {
      await spacesApi.update(editingSpace._id, {
        title: title.trim(),
        location: location.trim(),
        price: Number(price),
        image: image.trim(),
      });
      setEditingSpace(null);
      await fetchSpaces();
    } catch {
      setError("Update failed.");
    }
  };

  const avgPrice = spaces.length ? Math.round(spaces.reduce((sum, space) => sum + Number(space.price || 0), 0) / spaces.length) : 0;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Owner Dashboard</h1>
      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.topCards}>
        <div style={styles.analyticsCard}><h2>Total Spaces</h2><h1>{spaces.length}</h1></div>
        <div style={styles.analyticsCard}><h2>Average Price</h2><h1>₹ {avgPrice}</h1></div>
        <div style={styles.analyticsCard}><h2>Visible on Page</h2><h1>{pagedSpaces.length}</h1></div>
      </div>

      <button style={styles.addButton} onClick={() => navigate("/add-space")}>+ Add New Space</button>

      {loading && <p style={styles.loadingText}>Loading spaces...</p>}
      {!loading && spaces.length === 0 && <p style={styles.loadingText}>No spaces available.</p>}

      {!loading && pagedSpaces.length > 0 && (
        <>
          <div style={styles.grid}>
            {pagedSpaces.map((space) => (
              <div key={space._id} style={styles.card}>
                <img src={space.image || "https://via.placeholder.com/300"} alt="space" style={styles.image} />
                <div style={styles.cardBody}>
                  <h2>{space.title}</h2>
                  <p>📍 {space.location}</p>
                  <h3>₹ {space.price}</h3>
                  <button style={styles.editButton} onClick={() => openEdit(space)}>Edit</button>
                  <button style={styles.deleteButton} onClick={() => deleteSpace(space._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.paginationRow}>
            <button style={styles.pageButton} disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>Prev</button>
            <span style={styles.pageText}>Page {page} / {totalPages}</span>
            <button style={styles.pageButton} disabled={page === totalPages} onClick={() => setPage((prev) => prev + 1)}>Next</button>
          </div>
        </>
      )}

      {editingSpace && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2>Edit Space</h2>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" style={styles.input} />
            <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" style={styles.input} />
            <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" type="number" min="1" style={styles.input} />
            <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" style={styles.input} />
            <button style={styles.saveButton} onClick={updateSpace}>Save Changes</button>
            <button style={styles.cancelButton} onClick={() => setEditingSpace(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: "30px", minHeight: "100vh", background: "#0f172a" },
  title: { color: "white", marginBottom: "18px", fontSize: "36px" },
  error: { color: "#fecaca", fontWeight: "bold" },
  topCards: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "16px", marginBottom: "24px" },
  analyticsCard: { background: "linear-gradient(to right,#2563eb,#38bdf8)", padding: "22px", borderRadius: "16px", color: "white" },
  addButton: { background: "linear-gradient(to right,#2563eb,#38bdf8)", color: "white", border: "none", padding: "12px 18px", borderRadius: "12px", fontSize: "16px", fontWeight: "bold", marginBottom: "20px", cursor: "pointer" },
  loadingText: { color: "white", background: "rgba(255,255,255,0.08)", borderRadius: "8px", padding: "10px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "20px" },
  card: { background: "rgba(255,255,255,0.08)", borderRadius: "20px", overflow: "hidden", backdropFilter: "blur(10px)", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" },
  image: { width: "100%", height: "220px", objectFit: "cover" },
  cardBody: { padding: "20px", color: "white" },
  editButton: { marginTop: "10px", width: "100%", background: "#2563eb", color: "white", border: "none", padding: "10px", borderRadius: "10px", fontWeight: "bold", cursor: "pointer" },
  deleteButton: { marginTop: "10px", width: "100%", background: "#dc2626", color: "white", border: "none", padding: "10px", borderRadius: "10px", fontWeight: "bold", cursor: "pointer" },
  modal: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.7)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1200 },
  modalContent: { background: "white", padding: "24px", borderRadius: "20px", width: "min(400px,92vw)", display: "flex", flexDirection: "column", gap: "12px" },
  input: { padding: "10px", borderRadius: "10px", border: "1px solid #ddd" },
  saveButton: { background: "#2563eb", color: "white", border: "none", padding: "10px", borderRadius: "10px", fontWeight: "bold", cursor: "pointer" },
  cancelButton: { background: "#dc2626", color: "white", border: "none", padding: "10px", borderRadius: "10px", fontWeight: "bold", cursor: "pointer" },
  paginationRow: { marginTop: "16px", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" },
  pageButton: { padding: "8px 12px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "bold" },
  pageText: { color: "white" },
};

export default OwnerDashboard;
