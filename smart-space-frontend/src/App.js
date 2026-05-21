import React from "react";

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Home from "./pages/Home";
import AddSpace from "./pages/AddSpace";
import MySpaces from "./pages/MySpaces";
import LandingPage from "./pages/LandingPage";

import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";

import OwnerLogin from "./pages/OwnerLogin";
import OwnerRegister from "./pages/OwnerRegister";

import OwnerDashboard from "./pages/OwnerDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import MyBookings from "./pages/MyBookings";
import Navbar from "./components/Navbar";

function App() {

    return (

        <
        BrowserRouter >

        <
        Navbar / >

        <
        Routes >

        { /* Landing Page */ } <
        Route path = "/"
        element = { < LandingPage / > }
        />

        { /* Home Page */ } <
        Route path = "/home"
        element = { < Home / > }
        />

        { /* User Auth */ } <
        Route path = "/user-login"
        element = { < UserLogin / > }
        />

        <
        Route path = "/user-register"
        element = { < UserRegister / > }
        />

        { /* Owner Auth */ } <
        Route path = "/owner-login"
        element = { < OwnerLogin / > }
        />

        <
        Route path = "/owner-register"
        element = { < OwnerRegister / > }
        />

        { /* Owner Dashboard */ } <
        Route path = "/owner-dashboard"
        element = { <
            ProtectedRoute >
            <
            OwnerDashboard / >
            <
            /ProtectedRoute>
        }
        />

        { /* Add Space */ } <
        Route path = "/add-space"
        element = { <
            ProtectedRoute >
            <
            AddSpace / >
            <
            /ProtectedRoute>
        }
        />

        { /* My Spaces */ } <
        Route path = "/my-spaces"
        element = { <
            ProtectedRoute >
            <
            MySpaces / >
            <
            /ProtectedRoute>
        }
        /> <
        Route path = "/my-bookings"
        element = { <
            ProtectedRoute >
            <
            MyBookings / >
            <
            /ProtectedRoute>
        }
        />

        <
        /Routes>

        <
        /BrowserRouter>

    );
}

export default App;