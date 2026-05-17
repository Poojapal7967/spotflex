import React from "react";

import SpaceCard from "../components/SpaceCard";

function Home() {

    const demoSpaces = [

        {
            title: "City Parking",
            location: "Near Railway Station",
            price: "20/hr",
            image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a"
        },

        {
            title: "Workspace Cabin",
            location: "Downtown",
            price: "50/hr",
            image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72"
        },

        {
            title: "Space for Rent",
            location: "Mall Road",
            price: "5000/month",
            image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg"
        }

    ];

    return (

        <
        div style = { styles.container } >

        <
        h1 style = { styles.heading } >
        Flexible Short - Term Space Booking Platform <
        /h1>

        <
        p style = { styles.tagline } >
        Rent spaces anytime, anywhere. <
        /p>

        <
        div style = { styles.cardContainer } >

        {
            demoSpaces.map((space, index) => (

                <
                SpaceCard key = { index }
                title = { space.title }
                location = { space.location }
                price = { space.price }
                image = { space.image }
                />

            ))
        }

        <
        /div>

        <
        /div>
    );
}

const styles = {

    container: {
        background: "#f3f4f6",
        minHeight: "100vh",
        padding: "20px"
    },

    heading: {
        textAlign: "center",
        marginTop: "20px"
    },

    tagline: {
        textAlign: "center",
        color: "#6b7280",
        marginBottom: "40px"
    },

    cardContainer: {
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        flexWrap: "wrap"
    }
};

export default Home;