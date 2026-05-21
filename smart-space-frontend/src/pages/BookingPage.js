import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { coupons, spaces } from "../data/marketplaceData";

function BookingPage() {
  const { id } = useParams();
  const space = spaces.find((item) => item.id === id) || spaces[0];
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState(space.availableSlots[0]);
  const [hours, setHours] = useState(2);
  const [coupon, setCoupon] = useState("");

  const totals = useMemo(() => {
    const base = Number(hours || 0) * space.pricePerHour;
    const discountRate = coupons[coupon.trim().toUpperCase()] || 0;
    const discount = Math.round(base * discountRate);
    const taxes = Math.round((base - discount) * 0.18);
    return {
      base,
      discount,
      taxes,
      final: base - discount + taxes
    };
  }, [coupon, hours, space.pricePerHour]);

  return (
    <div style={styles.page}>
      <h1>Booking</h1>
      <div style={styles.grid}>
        <section style={styles.card}>
          <h2>{space.title}</h2>
          <p style={styles.muted}>{space.address}</p>

          <label style={styles.label}>Date selection</label>
          <input type="date" value={date} min={new Date().toISOString().slice(0, 10)} onChange={(e) => setDate(e.target.value)} style={styles.input} />

          <label style={styles.label}>Time slot selection</label>
          <select value={slot} onChange={(e) => setSlot(e.target.value)} style={styles.input}>
            {space.availableSlots.map((item) => <option key={item}>{item}</option>)}
          </select>

          <label style={styles.label}>Hours</label>
          <input type="number" min="1" max="12" value={hours} onChange={(e) => setHours(Number(e.target.value))} style={styles.input} />

          <label style={styles.label}>Coupon code</label>
          <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="SAVE10 or FLEX15" style={styles.input} />

          <p style={styles.muted}>Cost calculation updates in real-time.</p>
        </section>

        <section style={styles.card}>
          <h2>Payment summary</h2>
          <p>Base: ₹{totals.base}</p>
          <p>Discount: -₹{totals.discount}</p>
          <p>Taxes: ₹{totals.taxes}</p>
          <h3>Total payable: ₹{totals.final}</h3>
          <Link to={`/payment/${space.id}?total=${totals.final}&date=${date}&slot=${encodeURIComponent(slot)}`} style={styles.primaryButton}>
            Continue to Payment
          </Link>
        </section>
      </div>
    </div>
  );
}

const styles = {
  page: { maxWidth: 1000, margin: "0 auto", padding: 24 },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
  card: { border: "1px solid rgba(148,163,184,0.2)", borderRadius: 14, padding: 14, background: "rgba(15,23,42,0.7)" },
  label: { marginTop: 8, color: "#94a3b8", display: "block" },
  input: { marginTop: 4, width: "100%", padding: 10, borderRadius: 8, border: "1px solid rgba(148,163,184,0.35)", background: "#0b122e", color: "#e2e8f0" },
  muted: { color: "#94a3b8", marginTop: 8 },
  primaryButton: { marginTop: 12, display: "inline-block", background: "linear-gradient(90deg,#2563eb,#38bdf8)", color: "#fff", borderRadius: 8, padding: "10px 14px", fontWeight: 700 }
};

export default BookingPage;
