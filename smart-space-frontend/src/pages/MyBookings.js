import React, { useEffect, useState } from "react";
import axios from "axios";

const toMinutes = (time) => {
    if (!time || !time.includes(":")) return NaN;
    const [hours, minutes] = time.split(":").map(Number);
    if (Number.isNaN(hours) || Number.isNaN(minutes)) return NaN;
    return hours * 60 + minutes;
};

function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [editingBooking, setEditingBooking] = useState(null);
    const [rescheduleDate, setRescheduleDate] = useState("");
    const [rescheduleStartTime, setRescheduleStartTime] = useState("");
    const [rescheduleEndTime, setRescheduleEndTime] = useState("");

    useEffect(() => {
        fetchBookings();
    }, []);

    const getStatus = (booking) => {
        if (booking.computedStatus) return booking.computedStatus;
        if (booking.status === "cancelled") return "cancelled";
        const endDateTime = new Date(`${booking.date}T${booking.endTime}`);
        if (Number.isNaN(endDateTime.getTime())) return "upcoming";
        return endDateTime < new Date() ? "completed" : "upcoming";
    };

    const getStatusStyle = (status) => {
        if (status === "completed") return styles.completedBadge;
        if (status === "cancelled") return styles.cancelledBadge;
        return styles.upcomingBadge;
    };

    const fetchBookings = async() => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) return;

            const res = await axios.get(`http://localhost:5000/api/bookings/user/${user.id}`);
            setBookings(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.log(error);
        }
    };

    const openReschedule = (booking) => {
        setEditingBooking(booking);
        setRescheduleDate(booking.date || "");
        setRescheduleStartTime(booking.startTime || "");
        setRescheduleEndTime(booking.endTime || "");
    };

    const closeReschedule = () => {
        setEditingBooking(null);
        setRescheduleDate("");
        setRescheduleStartTime("");
        setRescheduleEndTime("");
    };

    const validateReschedule = () => {
        if (!rescheduleDate || !rescheduleStartTime || !rescheduleEndTime) {
            return "Fill all date/time fields";
        }

        const startMinutes = toMinutes(rescheduleStartTime);
        const endMinutes = toMinutes(rescheduleEndTime);
        if (Number.isNaN(startMinutes) || Number.isNaN(endMinutes)) {
            return "Invalid time format";
        }
        if (endMinutes <= startMinutes) {
            return "End time must be after start time";
        }

        const startDateTime = new Date(`${rescheduleDate}T${rescheduleStartTime}`);
        if (Number.isNaN(startDateTime.getTime())) {
            return "Invalid date/time";
        }
        if (startDateTime < new Date()) {
            return "Past slot is not allowed";
        }

        return null;
    };

    const handleCancelBooking = async(bookingId) => {
        try {
            await axios.put(`http://localhost:5000/api/bookings/${bookingId}/cancel`);
            alert("Booking cancelled successfully");
            fetchBookings();
        } catch (error) {
            console.log(error);
            alert(error?.response?.data?.message || "Cancel failed");
        }
    };

    const handleReschedule = async() => {
        if (!editingBooking) return;
        const validationError = validateReschedule();
        if (validationError) return alert(validationError);

        try {
            await axios.put(`http://localhost:5000/api/bookings/${editingBooking._id}/reschedule`, {
                date: rescheduleDate,
                startTime: rescheduleStartTime,
                endTime: rescheduleEndTime
            });

            alert("Booking rescheduled successfully");
            closeReschedule();
            fetchBookings();
        } catch (error) {
            console.log(error);
            alert(error?.response?.data?.message || "Reschedule failed");
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>My Bookings</h1>

            <div style={styles.grid}>
                {bookings.length > 0 ? (
                    bookings.map((booking) => {
                        const status = getStatus(booking);
                        const canManage = status === "upcoming";

                        return (
                            <div key={booking._id} style={styles.card}>
                                <div style={styles.cardTop}>
                                    <h2 style={styles.cardTitle}>{booking.spaceTitle}</h2>
                                    <span style={{
                                        ...styles.badge,
                                        ...getStatusStyle(status)
                                    }}>
                                        {status.toUpperCase()}
                                    </span>
                                </div>

                                <p>📍 {booking.location}</p>
                                <h3>₹ {booking.price}</h3>
                                <p>📅 {booking.date}</p>
                                <p>⏰ {booking.startTime} - {booking.endTime}</p>

                                {canManage && (
                                    <div style={styles.actionWrap}>
                                        <button
                                            style={styles.rescheduleBtn}
                                            onClick={() => openReschedule(booking)}
                                        >
                                            Reschedule
                                        </button>
                                        <button
                                            style={styles.cancelBtn}
                                            onClick={() => handleCancelBooking(booking._id)}
                                        >
                                            Cancel Booking
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <h2 style={styles.emptyText}>No Bookings Found</h2>
                )}
            </div>

            {editingBooking && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <h2>Reschedule Booking</h2>
                        <input
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                            value={rescheduleDate}
                            onChange={(e) => setRescheduleDate(e.target.value)}
                            style={styles.input}
                        />
                        <input
                            type="time"
                            value={rescheduleStartTime}
                            onChange={(e) => setRescheduleStartTime(e.target.value)}
                            style={styles.input}
                        />
                        <input
                            type="time"
                            value={rescheduleEndTime}
                            onChange={(e) => setRescheduleEndTime(e.target.value)}
                            style={styles.input}
                        />

                        <button style={styles.saveBtn} onClick={handleReschedule}>
                            Save New Slot
                        </button>
                        <button style={styles.closeBtn} onClick={closeReschedule}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        minHeight: "100vh",
        padding: "40px",
        background: "#0f172a"
    },
    heading: {
        color: "white",
        marginBottom: "30px",
        fontSize: "40px"
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
        gap: "25px"
    },
    card: {
        background: "rgba(255,255,255,0.08)",
        borderRadius: "20px",
        padding: "20px",
        color: "white",
        backdropFilter: "blur(10px)"
    },
    cardTop: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "8px",
        marginBottom: "10px"
    },
    cardTitle: {
        margin: 0
    },
    badge: {
        borderRadius: "999px",
        padding: "4px 10px",
        fontSize: "11px",
        fontWeight: 800,
        letterSpacing: "0.4px"
    },
    upcomingBadge: {
        background: "rgba(34,197,94,0.2)",
        color: "#86efac",
        border: "1px solid rgba(34,197,94,0.4)"
    },
    completedBadge: {
        background: "rgba(59,130,246,0.2)",
        color: "#93c5fd",
        border: "1px solid rgba(59,130,246,0.4)"
    },
    cancelledBadge: {
        background: "rgba(239,68,68,0.2)",
        color: "#fca5a5",
        border: "1px solid rgba(239,68,68,0.4)"
    },
    actionWrap: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "10px",
        marginTop: "16px"
    },
    rescheduleBtn: {
        border: "none",
        borderRadius: "10px",
        padding: "10px 12px",
        background: "#2563eb",
        color: "white",
        fontWeight: 700,
        cursor: "pointer"
    },
    cancelBtn: {
        border: "none",
        borderRadius: "10px",
        padding: "10px 12px",
        background: "#dc2626",
        color: "white",
        fontWeight: 700,
        cursor: "pointer"
    },
    emptyText: {
        color: "white"
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
        alignItems: "center",
        padding: "20px"
    },
    modalContent: {
        background: "white",
        padding: "24px",
        borderRadius: "20px",
        width: "min(420px,100%)",
        display: "flex",
        flexDirection: "column",
        gap: "12px"
    },
    input: {
        padding: "12px",
        borderRadius: "10px",
        border: "1px solid #ddd"
    },
    saveBtn: {
        border: "none",
        borderRadius: "10px",
        padding: "12px",
        background: "#16a34a",
        color: "white",
        fontWeight: 700,
        cursor: "pointer"
    },
    closeBtn: {
        border: "none",
        borderRadius: "10px",
        padding: "12px",
        background: "#ef4444",
        color: "white",
        fontWeight: 700,
        cursor: "pointer"
    }
};

export default MyBookings;
