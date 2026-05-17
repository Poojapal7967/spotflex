import React from "react";

import {
    Link
} from "react-router-dom";

function LandingPage() {

    return (

        <
        div style = { styles.container } >

        <
        div style = { styles.overlay } >

        <
        h1 style = { styles.title } >
        SpotFlex <
        /h1>

        <
        p style = { styles.subtitle } >
        Flexible Short - Term Space Booking Platform <
        /p>

        <
        div style = { styles.buttonContainer } >

        <
        div style = { styles.card } >

        <
        h2 > User < /h2>

        <
        p >
        Book spaces instantly <
        /p>

        <
        Link to = "/user-login" >
        <
        button style = { styles.button } >
        Login <
        /button> <
        /Link>

        <
        Link to = "/user-register" >
        <
        button style = { styles.registerButton } >
        Register <
        /button> <
        /Link>

        <
        /div>

        <
        div style = { styles.card } >

        <
        h2 > Owner < /h2>

        <
        p >
        Rent your spaces <
        /p>

        <
        Link to = "/owner-login" >
        <
        button style = { styles.button } >
        Login <
        /button> <
        /Link>

        <
        Link to = "/owner-register" >
        <
        button style = { styles.registerButton } >
        Register <
        /button> <
        /Link>

        <
        /div>

        <
        /div>

        <
        /div>

        <
        /div>
    );
}

const styles = {

    container: {

        height: "100vh",

        backgroundImage: "url('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267')",

        backgroundSize: "cover",

        backgroundPosition: "center",

        display: "flex",

        justifyContent: "center",

        alignItems: "center"
    },

    overlay: {

        width: "100%",

        height: "100%",

        background: "rgba(0,0,0,0.7)",

        display: "flex",

        flexDirection: "column",

        justifyContent: "center",

        alignItems: "center",

        padding: "20px"
    },

    title: {

        fontSize: "70px",

        color: "#38bdf8",

        marginBottom: "20px"
    },

    subtitle: {

        color: "white",

        fontSize: "24px",

        marginBottom: "50px",

        textAlign: "center"
    },

    buttonContainer: {

        display: "flex",

        gap: "40px",

        flexWrap: "wrap",

        justifyContent: "center"
    },

    card: {

        background: "rgba(255,255,255,0.08)",

        backdropFilter: "blur(10px)",

        padding: "40px",

        borderRadius: "20px",

        width: "300px",

        textAlign: "center",

        color: "white",

        boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
    },

    button: {

        width: "100%",

        marginTop: "20px",

        background: "linear-gradient(to right,#2563eb,#38bdf8)",

        color: "white",

        border: "none",

        padding: "12px",

        borderRadius: "10px",

        fontSize: "16px",

        fontWeight: "bold"
    },

    registerButton: {

        width: "100%",

        marginTop: "15px",

        background: "transparent",

        color: "white",

        border: "1px solid white",

        padding: "12px",

        borderRadius: "10px",

        fontSize: "16px",

        fontWeight: "bold"
    }

};

export default LandingPage;