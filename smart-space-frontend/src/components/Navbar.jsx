function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2>SpotFlex</h2>

      <div style={styles.links}>
        <a href="/" style={styles.link}>
          Home
        </a>

        <a href="/" style={styles.link}>
          Spaces
        </a>

        <a href="/" style={styles.link}>
          Login
        </a>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    background: "#111827",
    color: "white"
  },

  links: {
    display: "flex",
    gap: "25px"
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "16px"
  }
};

export default Navbar;