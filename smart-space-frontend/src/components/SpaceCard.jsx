function SpaceCard({ title, location, price, image }) {
  return (
    <div style={styles.card}>
      <img
        src={image}
        alt="space"
        style={styles.image}
      />

      <h2>{title}</h2>

      <p>📍 {location}</p>

      <h3>₹{price}</h3>

      <button style={styles.button}>
        Book Now
      </button>
    </div>
  );
}

const styles = {
  card: {
    width: "320px",
    background: "white",
    borderRadius: "15px",
    padding: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center"
  },

  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "12px"
  },

  button: {
    marginTop: "10px",
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "white",
    fontSize: "16px",
    cursor: "pointer"
  }
};

export default SpaceCard;