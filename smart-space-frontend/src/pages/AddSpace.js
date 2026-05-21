import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function AddSpace() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        location: "",
        price: "",
        image: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async(e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:5000/api/spaces",
                formData
            );

            alert("Space Added Successfully 🚀");

            navigate("/");

        } catch (error) {

            console.log(error);

            alert("Something went wrong");

        }
    };

    return (

        <
        div style = { styles.container } >

        <
        h1 > Add New Space < /h1>

        <
        form onSubmit = { handleSubmit }
        style = { styles.form } >

        <
        input type = "text"
        name = "title"
        placeholder = "Space Title"
        value = { formData.title }
        onChange = { handleChange }
        style = { styles.input }
        required /
        >

        <
        input type = "text"
        name = "location"
        placeholder = "Location"
        value = { formData.location }
        onChange = { handleChange }
        style = { styles.input }
        required /
        >

        <
        input type = "text"
        name = "price"
        placeholder = "Price"
        value = { formData.price }
        onChange = { handleChange }
        style = { styles.input }
        required /
        >

        <
        input type = "text"
        name = "image"
        placeholder = "Image URL"
        value = { formData.image }
        onChange = { handleChange }
        style = { styles.input }
        required /
        >

        <
        button type = "submit"
        style = { styles.button } >
        Add Space <
        /button>

        <
        /form>

        <
        /div>
    );
}

const styles = {

    container: {
        padding: "40px",
        textAlign: "center"
    },

    form: {
        maxWidth: "400px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "15px"
    },

    input: {
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ccc"
    },

    button: {
        padding: "12px",
        background: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer"
    }
};

export default AddSpace;