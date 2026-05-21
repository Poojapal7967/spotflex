import React, {
    useState
} from "react";

import axios from "axios";

import {
    useNavigate,
    Link
} from "react-router-dom";

function UserLogin() {

    const navigate =
        useNavigate();

    const [email, setEmail] =
    useState("");

    const [password, setPassword] =
    useState("");

    const handleLogin = async(e) => {

        e.preventDefault();

        try {

            const res =
                await axios.post(

                    "http://localhost:5000/api/auth/login",

                    {
                        email,
                        password
                    }

                );

            localStorage.setItem(
                "token",
                res.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(
                    res.data.user
                )
            );

            alert("Login Successful 🚀");

            navigate("/home");

        } catch (error) {

            alert("Invalid Credentials");
        }
    };

    return (

        <
        div style = { styles.container } >

        <
        form style = { styles.card }
        onSubmit = { handleLogin } >

        <
        h1 style = { styles.title } >
        User Login <
        /h1>

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
        Login <
        /button>

        <
        p style = { styles.text } >
        Don 't have account? <
        /p>

        <
        Link to = "/user-register" >
        <
        button type = "button"
        style = { styles.registerButton } >
        Register <
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

        gap: "20px",

        boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
    },

    title: {

        textAlign: "center",

        color: "white"
    },

    input: {

        padding: "14px",

        borderRadius: "10px",

        border: "none",

        outline: "none",

        fontSize: "16px"
    },

    button: {

        background: "linear-gradient(to right,#2563eb,#38bdf8)",

        color: "white",

        border: "none",

        padding: "14px",

        borderRadius: "10px",

        fontWeight: "bold",

        fontSize: "16px"
    },

    registerButton: {

        width: "100%",

        background: "transparent",

        color: "white",

        border: "1px solid white",

        padding: "14px",

        borderRadius: "10px",

        fontWeight: "bold"
    },

    text: {

        textAlign: "center",

        color: "white"
    }
};

export default UserLogin;