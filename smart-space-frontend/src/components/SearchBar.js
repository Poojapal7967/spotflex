import React from "react";

function SearchBar() {
    return ( <
        div style = { styles.container } >
        <
        input type = "text"
        placeholder = "Search location..."
        style = { styles.input }
        />

        <
        button style = { styles.button } >
        Search <
        /button> <
        /div>
    );
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        marginBottom: "40px"
    },

    input: {
        width: "300px",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ccc"
    },

    button: {
        padding: "12px 20px",
        border: "none",
        background: "#111827",
        color: "white",
        borderRadius: "8px",
        cursor: "pointer"
    }
};

export default SearchBar;