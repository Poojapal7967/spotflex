import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { categories } from "../data/marketplaceData";

function AddSpace() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    location: "",
    type: categories[0],
    pricePerHour: "",
    pricePerDay: "",
    capacity: "",
    amenities: "",
    availabilityStart: "",
    availabilityEnd: "",
    contactName: "",
    contactPhone: "",
    image: ""
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dragging, setDragging] = useState(false);

  const previews = uploadedFiles.map((file) => ({ name: file.name }));

  const onInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onFiles = (files) => {
    const next = [...uploadedFiles, ...Array.from(files)].slice(0, 6);
    setUploadedFiles(next);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      location: formData.location || formData.address,
      price: Number(formData.pricePerHour || 0),
      image: formData.image || previews[0]?.url || "",
      owner: formData.contactName || "owner"
    };

    try {
      await axios.post("http://localhost:5000/api/spaces", payload);
      alert("Space added successfully");
      navigate("/owner-dashboard");
    } catch (error) {
      console.log(error);
      alert("Saved form locally. Backend endpoint unavailable.");
      localStorage.setItem("lastListingDraft", JSON.stringify({ ...formData, uploadedFiles: uploadedFiles.map((f) => f.name) }));
      navigate("/owner-dashboard");
    }
  };

  return (
    <div style={styles.page}>
      <h1>Space Listing Page</h1>
      <p style={styles.muted}>Owners can add complete listing details with image drag & drop and availability calendar.</p>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input name="title" value={formData.title} onChange={onInput} placeholder="Space title" style={styles.input} required />
        <textarea name="description" value={formData.description} onChange={onInput} placeholder="Description" rows={3} style={styles.input} required />
        <input name="address" value={formData.address} onChange={onInput} placeholder="Address" style={styles.input} required />
        <input name="location" value={formData.location} onChange={onInput} placeholder="Location" style={styles.input} required />
        <select name="type" value={formData.type} onChange={onInput} style={styles.input}>{categories.map((item) => <option key={item}>{item}</option>)}</select>
        <input name="pricePerHour" type="number" min="0" value={formData.pricePerHour} onChange={onInput} placeholder="Price per hour" style={styles.input} required />
        <input name="pricePerDay" type="number" min="0" value={formData.pricePerDay} onChange={onInput} placeholder="Price per day" style={styles.input} required />
        <input name="capacity" type="number" min="1" value={formData.capacity} onChange={onInput} placeholder="Capacity" style={styles.input} required />
        <input name="amenities" value={formData.amenities} onChange={onInput} placeholder="Amenities (comma separated)" style={styles.input} />
        <input name="availabilityStart" type="date" value={formData.availabilityStart} onChange={onInput} style={styles.input} required />
        <input name="availabilityEnd" type="date" value={formData.availabilityEnd} onChange={onInput} style={styles.input} required />
        <input name="contactName" value={formData.contactName} onChange={onInput} placeholder="Contact name" style={styles.input} required />
        <input name="contactPhone" value={formData.contactPhone} onChange={onInput} placeholder="Contact phone" style={styles.input} required />
        <input name="image" value={formData.image} onChange={onInput} placeholder="Primary image URL (optional)" style={styles.input} />

        <div
          style={{ ...styles.dropZone, ...(dragging ? styles.dropZoneActive : {}) }}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            if (e.dataTransfer.files?.length) onFiles(e.dataTransfer.files);
          }}
        >
          <p>Drag & drop image upload</p>
          <input type="file" accept="image/*" multiple onChange={(e) => onFiles(e.target.files || [])} />
          <div style={styles.previewGrid}>
            {previews.map((item) => (
              <div key={item.name} style={styles.previewTag}>
                {item.name}
              </div>
            ))}
          </div>
        </div>

        <button type="submit" style={styles.primaryButton}>Publish Listing</button>
      </form>
    </div>
  );
}

const styles = {
  page: { maxWidth: 1000, margin: "0 auto", padding: 24 },
  muted: { color: "#94a3b8", marginBottom: 10 },
  form: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, border: "1px solid rgba(148,163,184,0.2)", borderRadius: 14, padding: 14, background: "rgba(15,23,42,0.7)" },
  input: { width: "100%", padding: 10, borderRadius: 8, border: "1px solid rgba(148,163,184,0.35)", background: "#0b122e", color: "#e2e8f0", gridColumn: "span 1" },
  dropZone: { gridColumn: "1 / -1", border: "1px dashed rgba(148,163,184,0.4)", borderRadius: 10, padding: 12, color: "#cbd5e1" },
  dropZoneActive: { borderColor: "rgba(56,189,248,0.7)", background: "rgba(56,189,248,0.1)" },
  previewGrid: { marginTop: 8, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(90px,1fr))", gap: 8 },
  previewTag: {
    width: "100%",
    minHeight: 48,
    borderRadius: 8,
    padding: 8,
    border: "1px solid rgba(148,163,184,0.35)",
    color: "#cbd5e1",
    fontSize: 12,
    display: "flex",
    alignItems: "center"
  },
  primaryButton: { gridColumn: "1 / -1", border: "none", borderRadius: 8, background: "linear-gradient(90deg,#2563eb,#38bdf8)", color: "#fff", padding: "10px 14px", fontWeight: 700 }
};

export default AddSpace;
