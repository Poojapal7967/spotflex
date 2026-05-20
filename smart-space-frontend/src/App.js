import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddSpace from "./pages/AddSpace";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import MyBookings from "./pages/MyBookings";
import MySpaces from "./pages/MySpaces";
import OwnerDashboard from "./pages/OwnerDashboard";
import OwnerLogin from "./pages/OwnerLogin";
import OwnerRegister from "./pages/OwnerRegister";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />

        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/owner-login" element={<OwnerLogin />} />
        <Route path="/owner-register" element={<OwnerRegister />} />

        <Route
          path="/owner-dashboard"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-space"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <AddSpace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-spaces"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <MySpaces />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <MyBookings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
