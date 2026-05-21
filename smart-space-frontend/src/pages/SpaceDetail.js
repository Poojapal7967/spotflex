import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { seedReviews, spaces } from "../data/marketplaceData";

function SpaceDetail() {
  const { id } = useParams();
  const space = spaces.find((item) => item.id === id) || spaces[0];
  const [imageIndex, setImageIndex] = useState(0);
  const [reviews, setReviews] = useState(seedReviews.filter((review) => review.spaceId === space.id));
  const [draft, setDraft] = useState({ user: "", rating: 5, comment: "" });
  const [editingId, setEditingId] = useState(null);

  const averageRating = useMemo(() => {
    if (!reviews.length) return space.rating;
    const total = reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews, space.rating]);

  const saveReview = () => {
    if (!draft.user.trim() || !draft.comment.trim()) return;
    if (editingId) {
      setReviews(reviews.map((review) => (review.id === editingId ? { ...review, ...draft } : review)));
      setEditingId(null);
    } else {
      setReviews([
        {
          id: `rev-${Date.now()}`,
          date: new Date().toISOString().slice(0, 10),
          spaceId: space.id,
          ...draft
        },
        ...reviews
      ]);
    }
    setDraft({ user: "", rating: 5, comment: "" });
  };

  const editReview = (review) => {
    setEditingId(review.id);
    setDraft({ user: review.user, rating: review.rating, comment: review.comment });
  };

  const deleteReview = (reviewId) => {
    setReviews(reviews.filter((review) => review.id !== reviewId));
    if (editingId === reviewId) {
      setEditingId(null);
      setDraft({ user: "", rating: 5, comment: "" });
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.mainGrid}>
        <section style={styles.mediaSection}>
          <img src={`${space.images[imageIndex]}?auto=format&fit=crop&w=1400&q=60`} alt={space.title} style={styles.heroImage} />
          <div style={styles.thumbRow}>
            {space.images.map((image, index) => (
              <button key={image} type="button" style={{ ...styles.thumbBtn, ...(imageIndex === index ? styles.thumbActive : {}) }} onClick={() => setImageIndex(index)}>
                <img src={`${image}?auto=format&fit=crop&w=300&q=60`} alt={`${space.title}-${index}`} style={styles.thumbImage} />
              </button>
            ))}
          </div>
          <div style={styles.virtualTour}>Virtual 360° tour preview enabled for this space.</div>
        </section>

        <section style={styles.infoSection}>
          <h1>{space.title}</h1>
          <p style={styles.muted}>{space.address}</p>
          <p style={styles.muted}>⭐ {averageRating} ({reviews.length || space.reviewsCount} reviews)</p>
          <h2 style={styles.price}>₹{space.pricePerHour}/hr • ₹{space.pricePerDay}/day</h2>
          <p>{space.description}</p>

          <h3>Amenities</h3>
          <div style={styles.pillWrap}>{space.amenities.map((item) => <span key={item} style={styles.pill}>{item}</span>)}</div>

          <h3>Available slots</h3>
          <div style={styles.slotWrap}>{space.availableSlots.map((slot) => <span key={slot} style={styles.slot}>{slot}</span>)}</div>

          <h3>Map integration</h3>
          <div style={styles.mapCard}>Lat: {space.coordinates.lat} • Lng: {space.coordinates.lng} • Heatmap intensity: High</div>

          <div style={styles.actionGrid}>
            <Link to={`/booking/${space.id}`} style={styles.primaryButton}>Book now</Link>
            <button type="button" style={styles.ghostButton}>Live chat owner ↔ user</button>
            <button type="button" style={styles.ghostButton}>Generate QR check-in</button>
            <button type="button" style={styles.ghostButton}>Availability calendar synced</button>
          </div>
        </section>
      </div>

      <section style={styles.reviewsSection}>
        <h2>Reviews & ratings</h2>
        <div style={styles.reviewEditor}>
          <input value={draft.user} onChange={(e) => setDraft({ ...draft, user: e.target.value })} placeholder="Your name" style={styles.input} />
          <select value={draft.rating} onChange={(e) => setDraft({ ...draft, rating: Number(e.target.value) })} style={styles.input}>
            {[5, 4, 3, 2, 1].map((star) => <option key={star} value={star}>{star} star</option>)}
          </select>
          <textarea value={draft.comment} onChange={(e) => setDraft({ ...draft, comment: e.target.value })} placeholder="Comment" rows={3} style={styles.textarea} />
          <button type="button" onClick={saveReview} style={styles.primaryButton}>{editingId ? "Update review" : "Add review"}</button>
        </div>

        <div style={styles.reviewList}>
          {reviews.map((review) => (
            <article key={review.id} style={styles.reviewCard}>
              <h4>{review.user}</h4>
              <p style={styles.muted}>{"⭐".repeat(review.rating)} • {review.date}</p>
              <p>{review.comment}</p>
              <div style={styles.smallActions}>
                <button type="button" style={styles.smallButton} onClick={() => editReview(review)}>Edit</button>
                <button type="button" style={styles.smallButton} onClick={() => deleteReview(review.id)}>Delete</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: { maxWidth: 1200, margin: "0 auto", padding: 24 },
  mainGrid: { display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16 },
  mediaSection: { border: "1px solid rgba(148,163,184,0.2)", borderRadius: 14, padding: 12, background: "rgba(15,23,42,0.65)" },
  heroImage: { width: "100%", height: 320, objectFit: "cover", borderRadius: 10 },
  thumbRow: { marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" },
  thumbBtn: { border: "1px solid rgba(148,163,184,0.3)", borderRadius: 8, overflow: "hidden", padding: 0, background: "transparent" },
  thumbActive: { borderColor: "#38bdf8" },
  thumbImage: { width: 92, height: 62, objectFit: "cover", display: "block" },
  virtualTour: { marginTop: 10, border: "1px dashed rgba(148,163,184,0.35)", borderRadius: 8, padding: 10, color: "#cbd5e1" },
  infoSection: { border: "1px solid rgba(148,163,184,0.2)", borderRadius: 14, padding: 14, background: "rgba(15,23,42,0.65)" },
  muted: { color: "#94a3b8" },
  price: { color: "#7dd3fc", margin: "8px 0" },
  pillWrap: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 },
  pill: { border: "1px solid rgba(148,163,184,0.35)", borderRadius: 999, padding: "6px 10px", color: "#e2e8f0" },
  slotWrap: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 },
  slot: { borderRadius: 8, padding: "6px 10px", background: "rgba(37,99,235,0.2)", color: "#bfdbfe", border: "1px solid rgba(37,99,235,0.5)" },
  mapCard: { border: "1px solid rgba(148,163,184,0.25)", borderRadius: 8, padding: 10, marginTop: 6, color: "#cbd5e1" },
  actionGrid: { marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 },
  primaryButton: { background: "linear-gradient(90deg,#2563eb,#38bdf8)", color: "#fff", border: "none", borderRadius: 8, padding: "10px 12px", fontWeight: 700, textAlign: "center" },
  ghostButton: { border: "1px solid rgba(148,163,184,0.35)", borderRadius: 8, background: "transparent", color: "#e2e8f0", padding: "10px 12px" },
  reviewsSection: { marginTop: 22, border: "1px solid rgba(148,163,184,0.2)", borderRadius: 14, padding: 14, background: "rgba(15,23,42,0.45)" },
  reviewEditor: { display: "grid", gridTemplateColumns: "1fr 180px", gap: 10 },
  input: { padding: 10, borderRadius: 8, border: "1px solid rgba(148,163,184,0.35)", background: "#0b122e", color: "#e2e8f0" },
  textarea: { gridColumn: "1 / -1", padding: 10, borderRadius: 8, border: "1px solid rgba(148,163,184,0.35)", background: "#0b122e", color: "#e2e8f0" },
  reviewList: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 10, marginTop: 14 },
  reviewCard: { border: "1px solid rgba(148,163,184,0.2)", borderRadius: 10, padding: 10, background: "rgba(15,23,42,0.75)" },
  smallActions: { marginTop: 8, display: "flex", gap: 8 },
  smallButton: { border: "1px solid rgba(148,163,184,0.35)", borderRadius: 8, background: "transparent", color: "#e2e8f0", padding: "6px 10px" }
};

export default SpaceDetail;
