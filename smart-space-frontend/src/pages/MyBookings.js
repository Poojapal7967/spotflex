import React, {
    useEffect,
    useState
} from "react";

import axios from "axios";

function MyBookings() {

    const [bookings, setBookings] =
    useState([]);

    useEffect(() => {

        fetchBookings();

    }, []);

    const fetchBookings = async() => {

        try {

            const user =
                JSON.parse(
                    localStorage.getItem("user")
                );

            if (!user) return;

            const res =
                await axios.get(

                    `http://localhost:5000/api/bookings/user/${user.id}`

                );

            setBookings(res.data);

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <
        div style = { styles.container } >

        <
        h1 style = { styles.heading } >
        My Bookings <
        /h1>

        <
        div style = { styles.grid } >

        {
            bookings.length > 0 ? (

                bookings.map((booking) => (

                    <
                    div key = { booking._id }
                    style = { styles.card } >

                    <
                    h2 > { booking.spaceTitle } <
                    /h2>

                    <
                    p > 📍{ booking.location } <
                    /p>

                    <
                    h3 > ₹{ booking.price } <
                    /h3>

                    <
                    p > 📅{ booking.date } <
                    /p>

                    <
                    p > ⏰{ booking.startTime } { " - " } { booking.endTime } <
                    /p>

                    <
                    /div>

                ))

            ) : (

                <
                h2 style = {
                    { color: "white" } } >
                No Bookings Found <
                /h2>
            )
        }

        <
        /div>

        <
        /div>
    );
}

const styles = {

    container: {

        minHeight: "100vh",

        padding: "40px",

        background: "#0f172a"
    },

    heading: {

        color: "white",

        marginBottom: "30px",

        fontSize: "40px"
    },

    grid: {

        display: "grid",

        gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",

        gap: "25px"
    },

    card: {

        background: "rgba(255,255,255,0.08)",

        borderRadius: "20px",

        padding: "20px",

        color: "white",

        backdropFilter: "blur(10px)"
    }
};

export default MyBookings;