import React, {
    useEffect,
    useState
} from "react";

import axios from "axios";

import {
    useNavigate
} from "react-router-dom";

function OwnerDashboard() {

    const navigate =
        useNavigate();

    const [spaces, setSpaces] =
    useState([]);

    const [editingSpace, setEditingSpace] =
    useState(null);

    const [title, setTitle] =
    useState("");

    const [location, setLocation] =
    useState("");

    const [price, setPrice] =
    useState("");

    const [image, setImage] =
    useState("");

    useEffect(() => {

        fetchSpaces();

    }, []);

    const fetchSpaces = async() => {

        try {

            const res =
                await axios.get(
                    "http://localhost:5000/api/spaces"
                );

            setSpaces(res.data);

        } catch (error) {

            console.log(error);
        }
    };

    const deleteSpace = async(id) => {

        try {

            await axios.delete(

                `http://localhost:5000/api/spaces/${id}`

            );

            alert("Space Deleted 🚀");

            fetchSpaces();

        } catch (error) {

            console.log(error);

            alert("Delete Failed");
        }
    };

    const openEdit = (space) => {

        setEditingSpace(space);

        setTitle(space.title);

        setLocation(space.location);

        setPrice(space.price);

        setImage(space.image);
    };

    const updateSpace = async() => {

        try {

            await axios.put(

                `http://localhost:5000/api/spaces/${editingSpace._id}`,

                {
                    title,
                    location,
                    price,
                    image
                }

            );

            alert("Space Updated 🚀");

            setEditingSpace(null);

            fetchSpaces();

        } catch (error) {

            console.log(error);

            alert("Update Failed");
        }
    };

    return (

        <
        div style = { styles.container } >

        <
        h1 style = { styles.title } >
        Owner Dashboard <
        /h1>

        <
        div style = { styles.topCards } >

        <
        div style = { styles.analyticsCard } >

        <
        h2 >
        Total Spaces <
        /h2>

        <
        h1 > { spaces.length } <
        /h1>

        <
        /div>

        <
        div style = { styles.analyticsCard } >

        <
        h2 >
        Total Bookings <
        /h2>

        <
        h1 >
        0 <
        /h1>

        <
        /div>

        <
        /div>

        <
        button style = { styles.addButton }
        onClick = {
            () =>
            navigate("/add-space")
        } >
        +Add New Space <
        /button>

        <
        div style = { styles.grid } >

        {
            spaces.map((space) => (

                <
                div key = { space._id }
                style = { styles.card } >

                <
                img src = {
                    space.image ?
                    space.image :
                        "https://via.placeholder.com/300"
                }
                alt = "space"
                style = { styles.image }
                />

                <
                div style = { styles.cardBody } >

                <
                h2 > { space.title } <
                /h2>

                <
                p > 📍{ space.location } <
                /p>

                <
                h3 > ₹{ space.price } <
                /h3>

                <
                button style = { styles.editButton }
                onClick = {
                    () =>
                    openEdit(space)
                } >
                Edit <
                /button>

                <
                button style = { styles.deleteButton }
                onClick = {
                    () =>
                    deleteSpace(space._id)
                } >
                Delete <
                /button>

                <
                /div>

                <
                /div>

            ))
        }

        <
        /div>

        {
            editingSpace && (

                <
                div style = { styles.modal } >

                <
                div style = { styles.modalContent } >

                <
                h2 >
                Edit Space <
                /h2>

                <
                input value = { title }
                onChange = {
                    (e) =>
                    setTitle(e.target.value)
                }
                placeholder = "Title"
                style = { styles.input }
                />

                <
                input value = { location }
                onChange = {
                    (e) =>
                    setLocation(e.target.value)
                }
                placeholder = "Location"
                style = { styles.input }
                />

                <
                input value = { price }
                onChange = {
                    (e) =>
                    setPrice(e.target.value)
                }
                placeholder = "Price"
                style = { styles.input }
                />

                <
                input value = { image }
                onChange = {
                    (e) =>
                    setImage(e.target.value)
                }
                placeholder = "Image URL"
                style = { styles.input }
                />

                <
                button style = { styles.saveButton }
                onClick = { updateSpace } >
                Save Changes <
                /button>

                <
                button style = { styles.cancelButton }
                onClick = {
                    () =>
                    setEditingSpace(null)
                } >
                Cancel <
                /button>

                <
                /div>

                <
                /div>
            )
        }

        <
        /div>
    );
}

const styles = {

    container: {

        padding: "40px",

        minHeight: "100vh",

        background: "#0f172a"
    },

    title: {

        color: "white",

        marginBottom: "30px",

        fontSize: "40px"
    },

    topCards: {

        display: "flex",

        gap: "20px",

        flexWrap: "wrap",

        marginBottom: "30px"
    },

    analyticsCard: {

        flex: 1,

        minWidth: "250px",

        background: "linear-gradient(to right,#2563eb,#38bdf8)",

        padding: "30px",

        borderRadius: "20px",

        color: "white"
    },

    addButton: {

        background: "linear-gradient(to right,#2563eb,#38bdf8)",

        color: "white",

        border: "none",

        padding: "15px 25px",

        borderRadius: "12px",

        fontSize: "16px",

        fontWeight: "bold",

        marginBottom: "30px",

        cursor: "pointer"
    },

    grid: {

        display: "grid",

        gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",

        gap: "30px"
    },

    card: {

        background: "rgba(255,255,255,0.08)",

        borderRadius: "20px",

        overflow: "hidden",

        backdropFilter: "blur(10px)",

        boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
    },

    image: {

        width: "100%",

        height: "220px",

        objectFit: "cover"
    },

    cardBody: {

        padding: "20px",

        color: "white"
    },

    editButton: {

        marginTop: "15px",

        width: "100%",

        background: "#2563eb",

        color: "white",

        border: "none",

        padding: "12px",

        borderRadius: "10px",

        fontWeight: "bold",

        cursor: "pointer"
    },

    deleteButton: {

        marginTop: "15px",

        width: "100%",

        background: "red",

        color: "white",

        border: "none",

        padding: "12px",

        borderRadius: "10px",

        fontWeight: "bold",

        cursor: "pointer"
    },

    modal: {

        position: "fixed",

        top: 0,

        left: 0,

        width: "100%",

        height: "100%",

        background: "rgba(0,0,0,0.7)",

        display: "flex",

        justifyContent: "center",

        alignItems: "center"
    },

    modalContent: {

        background: "white",

        padding: "30px",

        borderRadius: "20px",

        width: "400px",

        display: "flex",

        flexDirection: "column",

        gap: "15px"
    },

    input: {

        padding: "12px",

        borderRadius: "10px",

        border: "1px solid #ddd"
    },

    saveButton: {

        background: "#2563eb",

        color: "white",

        border: "none",

        padding: "12px",

        borderRadius: "10px",

        fontWeight: "bold",

        cursor: "pointer"
    },

    cancelButton: {

        background: "red",

        color: "white",

        border: "none",

        padding: "12px",

        borderRadius: "10px",

        fontWeight: "bold",

        cursor: "pointer"
    }
};

export default OwnerDashboard;