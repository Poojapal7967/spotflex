import React, { useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { spaces } from "../data/marketplaceData";

function PaymentPage() {
  const { id } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const total = Number(params.get("total") || 0);
  const date = params.get("date") || "Not selected";
  const slot = params.get("slot") || "Not selected";
  const space = spaces.find((item) => item.id === id) || spaces[0];

  const [mode, setMode] = useState("UPI");
  const [status, setStatus] = useState("");

  const summary = useMemo(() => ({ title: space.title, total, date, slot }), [date, slot, space.title, total]);

  const processPayment = () => {
    setStatus(Math.random() > 0.15 ? "success" : "failure");
  };

  return (
    <div style={styles.page}>
      <h1>Payment</h1>
      <div style={styles.grid}>
        <section style={styles.card}>
          <h2>UPI / Card payment</h2>
          <div style={styles.payModes}>
            {["UPI", "Card"].map((item) => (
              <button key={item} type="button" style={{ ...styles.modeBtn, ...(mode === item ? styles.modeBtnActive : {}) }} onClick={() => setMode(item)}>
                {item}
              </button>
            ))}
          </div>
          {mode === "UPI" ? (
            <input style={styles.input} placeholder="example@upi" />
          ) : (
            <>
              <input style={styles.input} placeholder="Card number" />
              <input style={styles.input} placeholder="MM/YY" />
              <input style={styles.input} placeholder="CVV" />
            </>
          )}
          <button type="button" style={styles.primaryButton} onClick={processPayment}>Pay ₹{summary.total || space.pricePerHour}</button>

          {status === "success" && <p style={styles.success}>Payment success ✅ Booking confirmed.</p>}
          {status === "failure" && <p style={styles.error}>Payment failed ❌ Please retry.</p>}
        </section>

        <section style={styles.card}>
          <h2>Booking summary</h2>
          <p>Space: {summary.title}</p>
          <p>Date: {summary.date}</p>
          <p>Slot: {summary.slot}</p>
          <h3>Total: ₹{summary.total || space.pricePerHour}</h3>
        </section>
      </div>
    </div>
  );
}

const styles = {
  page: { maxWidth: 1000, margin: "0 auto", padding: 24 },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
  card: { border: "1px solid rgba(148,163,184,0.2)", borderRadius: 14, padding: 14, background: "rgba(15,23,42,0.7)" },
  payModes: { display: "flex", gap: 8, marginBottom: 12 },
  modeBtn: { border: "1px solid rgba(148,163,184,0.35)", borderRadius: 8, background: "transparent", color: "#e2e8f0", padding: "8px 12px" },
  modeBtnActive: { background: "rgba(56,189,248,0.2)", borderColor: "rgba(56,189,248,0.5)" },
  input: { width: "100%", marginTop: 8, padding: 10, borderRadius: 8, border: "1px solid rgba(148,163,184,0.35)", background: "#0b122e", color: "#e2e8f0" },
  primaryButton: { marginTop: 12, border: "none", borderRadius: 8, background: "linear-gradient(90deg,#2563eb,#38bdf8)", color: "#fff", padding: "10px 14px", fontWeight: 700 },
  success: { marginTop: 10, color: "#86efac" },
  error: { marginTop: 10, color: "#fca5a5" }
};

export default PaymentPage;
