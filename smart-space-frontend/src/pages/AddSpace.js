import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { spacesApi } from "../services/api";
import { getStoredUser } from "../utils/auth";

function AddSpace() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", location: "", price: "", image: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!formData.title.trim() || !formData.location.trim() || !formData.price.trim()) return "Title, location, and price are required.";
    if (Number(formData.price) <= 0) return "Price must be greater than 0.";
    if (formData.image && !/^https?:\/\//i.test(formData.image)) return "Image URL must start with http:// or https://";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const user = getStoredUser();
      await spacesApi.add({
        title: formData.title.trim(),
        location: formData.location.trim(),
        price: Number(formData.price),
        image: formData.image.trim(),
        owner: user?.id || "",
      });
      navigate("/owner-dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Add New Space</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        {error && <p style={styles.error}>{error}</p>}

        <input type="text" name="title" placeholder="Space Title" value={formData.title} onChange={handleChange} style={styles.input} />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} style={styles.input} />
        <input type="number" min="1" name="price" placeholder="Price" value={formData.price} onChange={handleChange} style={styles.input} />
        <input type="text" name="image" placeholder="Image URL (optional)" value={formData.image} onChange={handleChange} style={styles.input} />

        <button type="submit" style={styles.button} disabled={loading}>{loading ? "Adding..." : "Add Space"}</button>
      </form>
    </div>
  );
}

const styles = {
  container: { padding: "30px 20px", textAlign: "center" },
  form: { maxWidth: "420px", margin: "auto", display: "flex", flexDirection: "column", gap: "12px" },
  input: { padding: "12px", borderRadius: "8px", border: "1px solid #ccc" },
  button: { padding: "12px", background: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" },
  error: { margin: 0, color: "#dc2626", fontWeight: "bold", fontSize: "14px" },
};

export default AddSpace;
