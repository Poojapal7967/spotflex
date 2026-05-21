import React, {
    useState
} from "react";

import axios from "axios";

import {
    useNavigate,
    Link
} from "react-router-dom";

function UserRegister() {

    const navigate =
        useNavigate();

    const [name, setName] =
    useState("");

    const [email, setEmail] =
    useState("");

    const [password, setPassword] =
    useState("");

    const handleRegister = async(e) => {

        e.preventDefault();

        try {

            await axios.post(

                "http://localhost:5000/api/auth/register",

                {
                    name,
                    email,
                    password,
                    role: "user"
                }

            );

            alert("Registration Successful 🚀");

            navigate("/user-login");

        } catch (error) {

            alert("Registration Failed");
        }
    };

    return (

        <
        div style = { styles.container } >

        <
        form style = { styles.card }
        onSubmit = { handleRegister } >

        <
        h1 style = { styles.title } >
        User Register <
        /h1>

        <
        input type = "text"
        placeholder = "Enter Name"
        value = { name }
        onChange = {
            (e) =>
            setName(e.target.value)
        }
        style = { styles.input }
        />

        <
        input type = "email"
        placeholder = "Enter Email"
        value = { email }
        onChange = {
            (e) =>
            setEmail(e.target.value)
        }
        style = { styles.input }
        />

        <
        input type = "password"
        placeholder = "Enter Password"
        value = { password }
        onChange = {
            (e) =>
            setPassword(e.target.value)
        }
        style = { styles.input }
        />

        <
        button style = { styles.button } >
        Register <
        /button>

        <
        Link to = "/user-login" >
        <
        button type = "button"
        style = { styles.registerButton } >
        Back to Login <
        /button> <
        /Link>

        <
        /form>

        <
        /div>
    );
}

const styles = {

    container: {

        height: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        background: "linear-gradient(to right,#0f172a,#1e3a8a)"
    },

    card: {

        width: "350px",

        padding: "40px",

        borderRadius: "20px",

        background: "rgba(255,255,255,0.08)",

        backdropFilter: "blur(10px)",

        display: "flex",

        flexDirection: "column",

        gap: "20px"
    },

    title: {

        textAlign: "center",

        color: "white"
    },

    input: {

        padding: "14px",

        borderRadius: "10px",

        border: "none",

        outline: "none"
    },

    button: {

        background: "linear-gradient(to right,#2563eb,#38bdf8)",

        color: "white",

        border: "none",

        padding: "14px",

        borderRadius: "10px",

        fontWeight: "bold"
    },

    registerButton: {

        width: "100%",

        background: "transparent",

        color: "white",

        border: "1px solid white",

        padding: "14px",

        borderRadius: "10px",

        fontWeight: "bold"
    }
};

export default UserRegister;