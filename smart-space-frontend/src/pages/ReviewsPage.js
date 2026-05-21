import React, { useState } from "react";
import { seedReviews } from "../data/marketplaceData";

function ReviewsPage() {
  const [reviews, setReviews] = useState(seedReviews);
  const [draft, setDraft] = useState({ user: "", rating: 5, comment: "" });
  const [editingId, setEditingId] = useState("");

  const save = () => {
    if (!draft.user.trim() || !draft.comment.trim()) return;

    if (editingId) {
      setReviews(reviews.map((review) => (review.id === editingId ? { ...review, ...draft } : review)));
      setEditingId("");
    } else {
      setReviews([{ id: `rev-${Date.now()}`, date: new Date().toISOString().slice(0, 10), ...draft }, ...reviews]);
    }

    setDraft({ user: "", rating: 5, comment: "" });
  };

  return (
    <div style={styles.page}>
      <h1>Reviews & Ratings</h1>
      <section style={styles.card}>
        <input style={styles.input} value={draft.user} onChange={(e) => setDraft({ ...draft, user: e.target.value })} placeholder="Name" />
        <select style={styles.input} value={draft.rating} onChange={(e) => setDraft({ ...draft, rating: Number(e.target.value) })}>
          {[5, 4, 3, 2, 1].map((star) => <option key={star}>{star}</option>)}
        </select>
        <textarea style={styles.input} value={draft.comment} onChange={(e) => setDraft({ ...draft, comment: e.target.value })} placeholder="Comment" rows={3} />
        <button type="button" style={styles.primaryButton} onClick={save}>{editingId ? "Update" : "Submit"}</button>
      </section>

      <section style={styles.grid}>
        {reviews.map((review) => (
          <article key={review.id} style={styles.reviewCard}>
            <h3>{review.user}</h3>
            <p style={styles.muted}>{"⭐".repeat(review.rating)} • {review.date}</p>
            <p>{review.comment}</p>
            <div style={styles.actions}>
              <button type="button" style={styles.actionButton} onClick={() => {
                setEditingId(review.id);
                setDraft({ user: review.user, rating: review.rating, comment: review.comment });
              }}>Edit</button>
              <button type="button" style={styles.actionButton} onClick={() => setReviews(reviews.filter((item) => item.id !== review.id))}>Delete</button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

const styles = {
  page: { maxWidth: 1000, margin: "0 auto", padding: 24 },
  card: { border: "1px solid rgba(148,163,184,0.2)", borderRadius: 14, padding: 14, background: "rgba(15,23,42,0.7)", display: "grid", gap: 8 },
  input: { padding: 10, borderRadius: 8, border: "1px solid rgba(148,163,184,0.35)", background: "#0b122e", color: "#e2e8f0" },
  primaryButton: { width: "fit-content", border: "none", borderRadius: 8, background: "linear-gradient(90deg,#2563eb,#38bdf8)", color: "#fff", padding: "10px 14px", fontWeight: 700 },
  grid: { marginTop: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 10 },
  reviewCard: { border: "1px solid rgba(148,163,184,0.2)", borderRadius: 12, padding: 12, background: "rgba(15,23,42,0.7)" },
  muted: { color: "#94a3b8" },
  actions: { display: "flex", gap: 8, marginTop: 8 },
  actionButton: { border: "1px solid rgba(148,163,184,0.35)", borderRadius: 8, background: "transparent", color: "#e2e8f0", padding: "6px 10px" }
};

export default ReviewsPage;
