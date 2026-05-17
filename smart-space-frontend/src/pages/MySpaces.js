import React, { useEffect, useState } from "react";

import axios from "axios";

import SpaceCard from "../components/SpaceCard";

function MySpaces() {

    const [spaces, setSpaces] = useState([]);

    useEffect(() => {

        axios
            .get("http://localhost:5000/api/spaces")
            .then((res) => {

                setSpaces(res.data);

            })
            .catch((err) => {

                console.log(err);

            });

    }, []);

    return (

        <
        div style = { styles.container } >

        <
        h1 style = { styles.heading } >
        My Added Spaces <
        /h1>

        <
        div style = { styles.cardContainer } >

        {
            spaces.map((space) => (

                <
                SpaceCard key = { space._id }
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
        padding: "20px"
    },

    heading: {
        textAlign: "center",
        marginBottom: "30px"
    },

    cardContainer: {
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center"
    }
};

export default MySpaces;