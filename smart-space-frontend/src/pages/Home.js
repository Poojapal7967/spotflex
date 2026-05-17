import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
    const [spaces, setSpaces] = useState([]);
    const [selectedSpace, setSelectedSpace] = useState(null);

    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    useEffect(() => {
        fetchSpaces();
    }, []);

    const fetchSpaces = async() => {
        try {
            const res = await axios.get("http://localhost:5000/api/spaces");
            setSpaces(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const openBooking = (space) => setSelectedSpace(space);
    const closeBooking = () => setSelectedSpace(null);

    const handleBooking = async() => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));

            if (!user) return alert("Please login first");
            if (!date || !startTime || !endTime) return alert("Fill all details");

            await axios.post("http://localhost:5000/api/bookings/create", {
                userId: user.id,
                userName: user.name,
                spaceId: selectedSpace._id,
                spaceTitle: selectedSpace.title,
                location: selectedSpace.location,
                price: selectedSpace.price,
                date,
                startTime,
                endTime,
            });

            alert("Booking Successful 🚀");
            closeBooking();

        } catch (error) {
            console.log(error);
            alert("Booking Failed");
        }
    };

    return ( <
        div style = { styles.container } >
        <
        h1 > Flexible Short - Term Space Booking Platform < /h1> <
        p > Rent spaces anytime, anywhere. < /p>

        <
        div style = { styles.grid } > {
            spaces.map((space) => ( <
                div key = { space._id }
                style = { styles.card } >
                <
                img src = { space.image || "https://via.placeholder.com/300" }
                alt = "space"
                style = { styles.image }
                />

                <
                h2 style = { styles.title } > { space.title || "Space" } < /h2> <
                p style = { styles.text } > 📍{ space.location || "Location" } < /p> <
                h3 style = { styles.price } > ₹{ space.price || 0 } < /h3>

                <
                button style = { styles.button }
                onClick = {
                    () => openBooking(space)
                } >
                Book Now <
                /button> < /
                div >
            ))
        } <
        /div>

        {
            selectedSpace && ( <
                div style = { styles.overlay } >
                <
                div style = { styles.modal } >
                <
                h2 style = { styles.modalTitle } > { selectedSpace.title } < /h2> <
                p style = { styles.modalText } > 📍{ selectedSpace.location } < /p> <
                h3 style = { styles.modalPrice } > ₹{ selectedSpace.price } < /h3>

                <
                input type = "date"
                value = { date }
                onChange = {
                    (e) => setDate(e.target.value)
                }
                style = { styles.input }
                /> <
                input type = "time"
                value = { startTime }
                onChange = {
                    (e) => setStartTime(e.target.value)
                }
                style = { styles.input }
                /> <
                input type = "time"
                value = { endTime }
                onChange = {
                    (e) => setEndTime(e.target.value)
                }
                style = { styles.input }
                />

                <
                button style = { styles.payBtn }
                onClick = { handleBooking } >
                Proceed To Payment <
                /button>

                <
                button style = { styles.closeBtn }
                onClick = { closeBooking } >
                Cancel <
                /button> < /
                div > <
                /div>
            )
        } <
        /div>
    );
}

const styles = {
    container: {
        padding: "30px",
        fontFamily: "Arial",
        background: "#f3f4f6",
        minHeight: "100vh"
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
        gap: "20px",
        marginTop: "30px",
    },

    card: {
        background: "#fff",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        textAlign: "left",
        cursor: "pointer",
    },
    cardHover: {
        transform: "scale(1.03)",
    },

    image: {
        width: "100%",
        height: "200px",
        objectFit: "cover",
        borderRadius: "10px",
    },

    title: { color: "#111" },
    text: { color: "#555" },
    price: { color: "#111" },

    button: {
        background: "#2563eb",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "10px",
    },

    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        animation: "fadeIn 0.3s ease",
    },

    modal: {
        background: "white",
        padding: "25px",
        borderRadius: "16px",
        width: "380px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        animation: "slideUp 0.3s ease",
    },

    modalTitle: { color: "#111" },
    modalText: { color: "#555" },
    modalPrice: { color: "#111" },

    input: {
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        background: "white",
        color: "black",
        fontSize: "16px",
    },

    payBtn: {
        background: "green",
        color: "white",
        border: "none",
        padding: "12px",
        borderRadius: "5px",
        cursor: "pointer",
    },

    closeBtn: {
        background: "red",
        color: "white",
        border: "none",
        padding: "12px",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default Home;