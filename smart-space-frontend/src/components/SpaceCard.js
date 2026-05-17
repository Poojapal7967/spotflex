import React from "react";

function SpaceCard({ title, location, price, image }) {
    return ( <
        div style = { styles.card } >
        <
        img src = { image }
        alt = "space"
        style = { styles.image }
        />

        <
        h3 > { title } < /h3>

        <
        p > 📍{ location } < /p>

        <
        h4 > ₹{ price } < /h4>

        <
        button style = { styles.button } >
        Book Now <
        /button> <
        /div>
    );
}

const styles = {
    card: {
        width: "300px",
        background: "white",
        padding: "15px",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    },

    image: {
        width: "100%",
        height: "200px",
        objectFit: "cover",
        borderRadius: "10px"
    },

    button: {
        marginTop: "10px",
        width: "100%",
        padding: "10px",
        border: "none",
        background: "#2563eb",
        color: "white",
        borderRadius: "8px",
        cursor: "pointer"
    }
};

export default SpaceCard;