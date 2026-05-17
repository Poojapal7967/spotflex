import React from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    const handleLogout = () => {

        localStorage.removeItem("user");

        localStorage.removeItem("token");

        navigate("/");
    };

    return (

        <
        div style = { styles.navbar } >

        <
        h1 style = { styles.logo } >
        SpotFlex <
        /h1>

        <
        div style = { styles.links } >

        <
        Link to = "/"
        style = { styles.link } >
        Landing <
        /Link>

        <
        Link to = "/home"
        style = { styles.link } >
        Home <
        /Link>

        <
        Link to = "/my-bookings"
        style = { styles.link } >
        My Bookings <
        /Link>

        {
            user &&
                user.role === "owner" && (

                    <
                    Link to = "/owner-dashboard"
                    style = { styles.link } >
                    Owner Dashboard <
                    /Link>

                )
        }

        <
        button onClick = { handleLogout }
        style = { styles.button } >
        Logout <
        /button>

        <
        /div>

        <
        /div>

    );
}

const styles = {

    navbar: {

        background: "rgba(15,23,42,0.9)",

        backdropFilter: "blur(10px)",

        padding: "20px 40px",

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        borderBottom: "1px solid rgba(255,255,255,0.1)",

        position: "sticky",

        top: 0,

        zIndex: 1000
    },

    logo: {

        color: "#38bdf8",

        fontSize: "32px",

        fontWeight: "bold"
    },

    links: {

        display: "flex",

        alignItems: "center",

        gap: "25px"
    },

    link: {

        color: "white",

        fontWeight: "bold",

        transition: "0.3s"
    },

    button: {

        background: "linear-gradient(to right,#2563eb,#38bdf8)",

        color: "white",

        border: "none",

        padding: "10px 20px",

        borderRadius: "10px",

        fontWeight: "bold"
    }

};

export default Navbar;