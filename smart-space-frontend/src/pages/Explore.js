import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { categories, spaces } from "../data/marketplaceData";

function Explore() {
  const [query, setQuery] = useState("");
  const [priceRange, setPriceRange] = useState(3000);
  const [location, setLocation] = useState("All");
  const [rating, setRating] = useState(0);
  const [spaceType, setSpaceType] = useState("All");
  const [capacity, setCapacity] = useState(0);
  const [sort, setSort] = useState("Popular");

  const locations = ["All", ...new Set(spaces.map((space) => space.location))];

  const results = useMemo(() => {
    const filtered = spaces.filter((space) => {
      const term = query.toLowerCase().trim();
      const searchMatch = !term || `${space.title} ${space.description}`.toLowerCase().includes(term);
      const priceMatch = space.pricePerHour <= priceRange;
      const locationMatch = location === "All" || space.location === location;
      const ratingMatch = !rating || space.rating >= rating;
      const typeMatch = spaceType === "All" || space.type === spaceType;
      const capacityMatch = !capacity || space.capacity >= Number(capacity);
      return searchMatch && priceMatch && locationMatch && ratingMatch && typeMatch && capacityMatch;
    });

    if (sort === "Low → High") return [...filtered].sort((a, b) => a.pricePerHour - b.pricePerHour);
    if (sort === "High → Low") return [...filtered].sort((a, b) => b.pricePerHour - a.pricePerHour);
    return [...filtered].sort((a, b) => b.popularScore - a.popularScore);
  }, [capacity, location, priceRange, query, rating, sort, spaceType]);

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Explore spaces</h1>
      <div style={styles.layout}>
        <aside style={styles.filterPanel}>
          <h3>Filters</h3>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" style={styles.input} />
          <label style={styles.label}>Price range (up to ₹{priceRange}/hr)</label>
          <input type="range" min="300" max="3000" step="100" value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))} />
          <label style={styles.label}>Location</label>
          <select value={location} onChange={(e) => setLocation(e.target.value)} style={styles.input}>
            {locations.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <label style={styles.label}>Rating</label>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))} style={styles.input}>
            <option value={0}>Any</option>
            <option value={4}>4+</option>
            <option value={4.5}>4.5+</option>
          </select>
          <label style={styles.label}>Space type</label>
          <select value={spaceType} onChange={(e) => setSpaceType(e.target.value)} style={styles.input}>
            <option>All</option>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
          <label style={styles.label}>Capacity</label>
          <input type="number" min="0" value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="Minimum" style={styles.input} />

          <label style={styles.label}>Sort</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)} style={styles.input}>
            <option>Low → High</option>
            <option>High → Low</option>
            <option>Popular</option>
          </select>
        </aside>

        <section style={styles.resultsPanel}>
          <h3>{results.length} spaces found</h3>
          <div style={styles.grid}>
            {results.map((space) => (
              <article key={space.id} style={styles.card}>
                <img src={`${space.images[0]}?auto=format&fit=crop&w=1200&q=60`} alt={space.title} style={styles.image} />
                <div style={styles.body}>
                  <h4>{space.title}</h4>
                  <p style={styles.muted}>{space.location} • {space.type}</p>
                  <p style={styles.muted}>⭐ {space.rating} • Capacity {space.capacity}</p>
                  <p style={styles.price}>₹{space.pricePerHour}/hour</p>
                  <div style={styles.actions}>
                    <Link to={`/spaces/${space.id}`} style={styles.buttonPrimary}>Details</Link>
                    <Link to={`/booking/${space.id}`} style={styles.buttonGhost}>Book</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const styles = {
  page: { maxWidth: 1200, margin: "0 auto", padding: 24 },
  heading: { marginBottom: 14 },
  layout: { display: "grid", gridTemplateColumns: "300px 1fr", gap: 16 },
  filterPanel: { border: "1px solid rgba(148,163,184,0.25)", borderRadius: 14, padding: 14, background: "rgba(15,23,42,0.66)", display: "flex", flexDirection: "column", gap: 10 },
  label: { color: "#94a3b8", fontSize: 13 },
  input: { padding: 10, borderRadius: 8, border: "1px solid rgba(148,163,184,0.35)", background: "#0b122e", color: "#e2e8f0" },
  resultsPanel: { border: "1px solid rgba(148,163,184,0.2)", borderRadius: 14, padding: 14, background: "rgba(15,23,42,0.42)" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 12, marginTop: 12 },
  card: { border: "1px solid rgba(148,163,184,0.2)", borderRadius: 12, overflow: "hidden", background: "rgba(15,23,42,0.7)" },
  image: { width: "100%", height: 150, objectFit: "cover" },
  body: { padding: 12 },
  muted: { color: "#94a3b8" },
  price: { color: "#7dd3fc", fontWeight: 700, margin: "8px 0" },
  actions: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 },
  buttonPrimary: { background: "linear-gradient(90deg,#2563eb,#38bdf8)", color: "#fff", borderRadius: 8, textAlign: "center", padding: "8px 10px", fontWeight: 700 },
  buttonGhost: { border: "1px solid rgba(148,163,184,0.35)", borderRadius: 8, textAlign: "center", color: "#e2e8f0", padding: "8px 10px" }
};

export default Explore;
