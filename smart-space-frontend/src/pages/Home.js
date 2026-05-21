import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { categories, seedReviews, spaces } from "../data/marketplaceData";

function Home() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [compareList, setCompareList] = useState([]);
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem("wishlist") || "[]"));
  const chatPrompt = "100 people ke liye hall chahiye under ₹5000";

  const filteredSpaces = useMemo(() => {
    return spaces.filter((space) => {
      const term = search.trim().toLowerCase();
      const locationTerm = location.trim().toLowerCase();
      const matchSearch =
        !term ||
        space.title.toLowerCase().includes(term) ||
        space.description.toLowerCase().includes(term) ||
        space.address.toLowerCase().includes(term);
      const matchLocation = !locationTerm || space.location.toLowerCase().includes(locationTerm);
      const matchCategory = selectedCategory === "All" || space.type === selectedCategory;
      return matchSearch && matchLocation && matchCategory;
    });
  }, [search, location, selectedCategory]);

  const featured = spaces.filter((space) => space.featured);
  const trending = [...spaces].sort((a, b) => b.popularScore - a.popularScore).slice(0, 3);

  const toggleWishlist = (spaceId) => {
    const next = wishlist.includes(spaceId)
      ? wishlist.filter((id) => id !== spaceId)
      : [...wishlist, spaceId];
    setWishlist(next);
    localStorage.setItem("wishlist", JSON.stringify(next));
  };

  const toggleCompare = (spaceId) => {
    if (compareList.includes(spaceId)) {
      setCompareList(compareList.filter((id) => id !== spaceId));
      return;
    }
    if (compareList.length >= 2) {
      alert("You can compare up to 2 spaces.");
      return;
    }
    setCompareList([...compareList, spaceId]);
  };

  const compareSpaces = spaces.filter((space) => compareList.includes(space.id));

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Find spaces near you</h1>
        <p style={styles.heroText}>Office, meeting rooms, studios, event halls and co-working spaces in one app.</p>

        <div style={styles.searchPanel}>
          <input
            style={styles.input}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Find spaces near you"
          />
          <input
            style={styles.input}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location filter"
          />
          <Link to="/explore" style={styles.primaryButton}>
            Explore Results
          </Link>
        </div>

        <div style={styles.categories}>
          <button
            type="button"
            onClick={() => setSelectedCategory("All")}
            style={{ ...styles.chip, ...(selectedCategory === "All" ? styles.activeChip : {}) }}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{ ...styles.chip, ...(selectedCategory === category ? styles.activeChip : {}) }}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Featured spaces</h2>
        <div style={styles.grid}>
          {featured.map((space) => (
            <SpaceTile
              key={space.id}
              space={space}
              isWishlisted={wishlist.includes(space.id)}
              inCompare={compareList.includes(space.id)}
              onWishlist={toggleWishlist}
              onCompare={toggleCompare}
            />
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Trending now</h2>
        <div style={styles.grid}>
          {trending.map((space) => (
            <SpaceTile
              key={space.id}
              space={space}
              isWishlisted={wishlist.includes(space.id)}
              inCompare={compareList.includes(space.id)}
              onWishlist={toggleWishlist}
              onCompare={toggleCompare}
            />
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Search results</h2>
        <div style={styles.grid}>
          {filteredSpaces.map((space) => (
            <SpaceTile
              key={space.id}
              space={space}
              isWishlisted={wishlist.includes(space.id)}
              inCompare={compareList.includes(space.id)}
              onWishlist={toggleWishlist}
              onCompare={toggleCompare}
            />
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Compare spaces</h2>
        <div style={styles.compareWrap}>
          {compareSpaces.length < 2 ? (
            <p style={styles.muted}>Select any two spaces to compare pricing, capacity and rating.</p>
          ) : (
            compareSpaces.map((space) => (
              <article key={space.id} style={styles.compareCard}>
                <h3>{space.title}</h3>
                <p>₹{space.pricePerHour}/hr</p>
                <p>Capacity: {space.capacity}</p>
                <p>Rating: {space.rating}</p>
              </article>
            ))
          )}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Reviews</h2>
        <div style={styles.reviewGrid}>
          {seedReviews.map((review) => (
            <article key={review.id} style={styles.reviewCard}>
              <h4>{review.user}</h4>
              <p style={styles.muted}>{"⭐".repeat(review.rating)}</p>
              <p>{review.comment}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Standout features</h2>
        <div style={styles.featureGrid}>
          <article style={styles.featureCard}><h3>AI price recommendation</h3><p style={styles.muted}>Recommended range: ₹{Math.round((filteredSpaces[0]?.pricePerHour || 900) * 0.9)} - ₹{Math.round((filteredSpaces[0]?.pricePerHour || 900) * 1.1)}/hr</p></article>
          <article style={styles.featureCard}><h3>Heatmap of nearby spaces</h3><p style={styles.muted}>Density preview enabled for Bengaluru, Mumbai, Delhi, Hyderabad.</p></article>
          <article style={styles.featureCard}><h3>Space recommendation system</h3><p style={styles.muted}>Top picks for you: {trending.map((item) => item.title).join(", ")}.</p></article>
          <article style={styles.featureCard}><h3>AI chatbot</h3><p style={styles.muted}>Try: “{chatPrompt}”</p></article>
        </div>
      </section>
    </div>
  );
}

function SpaceTile({ space, isWishlisted, inCompare, onWishlist, onCompare }) {
  return (
    <article style={styles.card}>
      <img src={`${space.images[0]}?auto=format&fit=crop&w=1200&q=60`} alt={space.title} style={styles.image} />
      <div style={styles.cardBody}>
        <h3>{space.title}</h3>
        <p style={styles.muted}>{space.location} • {space.type}</p>
        <p style={styles.muted}>⭐ {space.rating} ({space.reviewsCount})</p>
        <p style={styles.price}>₹{space.pricePerHour}/hour</p>
        <div style={styles.cardActions}>
          <Link to={`/spaces/${space.id}`} style={styles.primaryButton}>View</Link>
          <Link to={`/booking/${space.id}`} style={styles.secondaryButton}>Book</Link>
        </div>
        <div style={styles.cardActions}>
          <button type="button" style={styles.smallButton} onClick={() => onWishlist(space.id)}>
            {isWishlisted ? "♥ Wishlisted" : "♡ Wishlist"}
          </button>
          <button type="button" style={styles.smallButton} onClick={() => onCompare(space.id)}>
            {inCompare ? "✓ Comparing" : "⇄ Compare"}
          </button>
        </div>
      </div>
    </article>
  );
}

const styles = {
  page: { maxWidth: 1200, margin: "0 auto", padding: "24px" },
  hero: {
    border: "1px solid rgba(148,163,184,0.25)",
    borderRadius: 18,
    padding: 24,
    background: "linear-gradient(120deg,rgba(37,99,235,0.35),rgba(15,23,42,0.85))"
  },
  heroTitle: { fontSize: "clamp(30px,5vw,48px)", marginBottom: 8 },
  heroText: { color: "#cbd5e1", marginBottom: 16 },
  searchPanel: { display: "grid", gridTemplateColumns: "2fr 1fr auto", gap: 10 },
  input: { padding: 12, borderRadius: 10, border: "1px solid rgba(148,163,184,0.45)", background: "#0b122e", color: "#e2e8f0" },
  primaryButton: { background: "linear-gradient(90deg,#2563eb,#38bdf8)", color: "#fff", padding: "10px 14px", borderRadius: 10, fontWeight: 700, textAlign: "center", border: "none" },
  secondaryButton: { border: "1px solid rgba(148,163,184,0.45)", color: "#e2e8f0", padding: "10px 14px", borderRadius: 10, textAlign: "center" },
  categories: { marginTop: 14, display: "flex", flexWrap: "wrap", gap: 8 },
  chip: { border: "1px solid rgba(148,163,184,0.35)", borderRadius: 999, color: "#cbd5e1", background: "transparent", padding: "7px 12px" },
  activeChip: { background: "rgba(56,189,248,0.18)", color: "#e0f2fe", borderColor: "rgba(56,189,248,0.5)" },
  section: { marginTop: 28 },
  sectionTitle: { marginBottom: 12 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 14 },
  card: { border: "1px solid rgba(148,163,184,0.2)", background: "rgba(15,23,42,0.66)", borderRadius: 14, overflow: "hidden" },
  image: { width: "100%", height: 170, objectFit: "cover" },
  cardBody: { padding: 14 },
  muted: { color: "#94a3b8" },
  price: { fontWeight: 700, color: "#7dd3fc", margin: "8px 0" },
  cardActions: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 },
  smallButton: { border: "1px solid rgba(148,163,184,0.35)", borderRadius: 8, background: "transparent", color: "#cbd5e1", padding: "8px 10px" },
  compareWrap: { border: "1px dashed rgba(148,163,184,0.35)", borderRadius: 14, padding: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  compareCard: { background: "rgba(15,23,42,0.66)", border: "1px solid rgba(148,163,184,0.2)", borderRadius: 10, padding: 12 },
  reviewGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 12 },
  reviewCard: { border: "1px solid rgba(148,163,184,0.2)", borderRadius: 12, padding: 12, background: "rgba(15,23,42,0.66)" },
  featureGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 12 },
  featureCard: { border: "1px solid rgba(148,163,184,0.2)", borderRadius: 12, padding: 12, background: "rgba(15,23,42,0.66)" }
};

export default Home;
