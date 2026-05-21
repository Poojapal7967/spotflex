import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AddSpace from "./pages/AddSpace";
import AdminPanel from "./pages/AdminPanel";
import BookingPage from "./pages/BookingPage";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import MyBookings from "./pages/MyBookings";
import OwnerDashboard from "./pages/OwnerDashboard";
import OwnerLogin from "./pages/OwnerLogin";
import OwnerRegister from "./pages/OwnerRegister";
import PaymentPage from "./pages/PaymentPage";
import ReviewsPage from "./pages/ReviewsPage";
import SpaceDetail from "./pages/SpaceDetail";
import UserDashboard from "./pages/UserDashboard";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/spaces/:id" element={<SpaceDetail />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/payment/:id" element={<PaymentPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />

        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/owner-login" element={<OwnerLogin />} />
        <Route path="/owner-register" element={<OwnerRegister />} />

        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner-dashboard"
          element={
            <ProtectedRoute>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-space"
          element={
            <ProtectedRoute>
              <AddSpace />
            </ProtectedRoute>
          }
        />

        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
