export const categories = ["Office", "Meeting Room", "Event Hall", "Studio", "Co-working"];

export const spaces = [
  {
    id: "spc-1",
    title: "Skyline Co-Work Hub",
    description: "Modern co-working floor with private cabins and high-speed internet.",
    address: "MG Road, Bengaluru",
    location: "Bengaluru",
    type: "Co-working",
    pricePerHour: 699,
    pricePerDay: 4999,
    capacity: 24,
    rating: 4.8,
    reviewsCount: 132,
    amenities: ["WiFi", "AC", "Projector", "Coffee", "Parking"],
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
      "https://images.unsplash.com/photo-1497215842964-222b430dc094"
    ],
    availableSlots: ["09:00 - 11:00", "12:00 - 14:00", "15:00 - 18:00"],
    featured: true,
    trending: true,
    popularScore: 95,
    coordinates: { lat: 12.9716, lng: 77.5946 },
    ownerName: "Aarav Spaces"
  },
  {
    id: "spc-2",
    title: "Pulse Meeting Suite",
    description: "Premium boardroom for team meetings and investor pitches.",
    address: "Banjara Hills, Hyderabad",
    location: "Hyderabad",
    type: "Meeting Room",
    pricePerHour: 999,
    pricePerDay: 6999,
    capacity: 14,
    rating: 4.6,
    reviewsCount: 89,
    amenities: ["WiFi", "Screen", "Whiteboard", "Coffee"],
    images: [
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2"
    ],
    availableSlots: ["10:00 - 12:00", "13:00 - 16:00", "17:00 - 19:00"],
    featured: true,
    trending: false,
    popularScore: 87,
    coordinates: { lat: 17.4126, lng: 78.4482 },
    ownerName: "Pulse Hosts"
  },
  {
    id: "spc-3",
    title: "Aura Event Hall",
    description: "Flexible event hall for workshops, launches, and social events.",
    address: "Andheri West, Mumbai",
    location: "Mumbai",
    type: "Event Hall",
    pricePerHour: 2500,
    pricePerDay: 15999,
    capacity: 120,
    rating: 4.7,
    reviewsCount: 214,
    amenities: ["Stage", "Sound", "Parking", "Catering", "LED Wall"],
    images: [
      "https://images.unsplash.com/photo-1511578314322-379afb476865",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2"
    ],
    availableSlots: ["09:00 - 13:00", "14:00 - 18:00", "19:00 - 22:00"],
    featured: false,
    trending: true,
    popularScore: 99,
    coordinates: { lat: 19.1368, lng: 72.8296 },
    ownerName: "Aura Venues"
  },
  {
    id: "spc-4",
    title: "Creator Studio 360",
    description: "Content studio with lighting rigs, backdrop options and editing desk.",
    address: "Koramangala, Bengaluru",
    location: "Bengaluru",
    type: "Studio",
    pricePerHour: 1200,
    pricePerDay: 8499,
    capacity: 18,
    rating: 4.5,
    reviewsCount: 67,
    amenities: ["Lighting", "Camera Mounts", "Green Screen", "WiFi"],
    images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952"
    ],
    availableSlots: ["08:00 - 11:00", "12:00 - 15:00", "16:00 - 19:00"],
    featured: false,
    trending: true,
    popularScore: 82,
    coordinates: { lat: 12.9352, lng: 77.6245 },
    ownerName: "Creator Labs"
  },
  {
    id: "spc-5",
    title: "Central Office Pods",
    description: "Fully serviced private office pods near metro connectivity.",
    address: "Connaught Place, Delhi",
    location: "Delhi",
    type: "Office",
    pricePerHour: 850,
    pricePerDay: 5799,
    capacity: 10,
    rating: 4.4,
    reviewsCount: 58,
    amenities: ["Reception", "WiFi", "Printer", "Security"],
    images: [
      "https://images.unsplash.com/photo-1497366412874-3415097a27e7",
      "https://images.unsplash.com/photo-1497366216548-37526070297c"
    ],
    availableSlots: ["09:00 - 12:00", "13:00 - 16:00", "17:00 - 20:00"],
    featured: true,
    trending: false,
    popularScore: 78,
    coordinates: { lat: 28.6315, lng: 77.2167 },
    ownerName: "Metro Workspaces"
  }
];

export const seedReviews = [
  {
    id: "rev-1",
    user: "Neha",
    rating: 5,
    comment: "Smooth booking experience and very clean space.",
    spaceId: "spc-1",
    date: "2026-05-10"
  },
  {
    id: "rev-2",
    user: "Rahul",
    rating: 4,
    comment: "Great meeting room, projector quality was excellent.",
    spaceId: "spc-2",
    date: "2026-05-09"
  },
  {
    id: "rev-3",
    user: "Aditi",
    rating: 5,
    comment: "Perfect event hall for our community meetup.",
    spaceId: "spc-3",
    date: "2026-05-05"
  }
];

export const adminUsers = [
  { id: "u-1", name: "Priya Sharma", role: "user", status: "active" },
  { id: "u-2", name: "Rohan Mehta", role: "owner", status: "active" },
  { id: "u-3", name: "Sana Khan", role: "owner", status: "suspended" }
];

export const bookingRequests = [
  { id: "br-1", space: "Skyline Co-Work Hub", requester: "Ankit", date: "2026-05-25", amount: 1398, status: "Pending" },
  { id: "br-2", space: "Aura Event Hall", requester: "EventCo", date: "2026-05-26", amount: 15999, status: "Pending" }
];

export const reports = [
  { id: "rep-1", listing: "Fake Studio Listing", reason: "Spam images", severity: "High" },
  { id: "rep-2", listing: "Invalid Price Hall", reason: "Misleading pricing", severity: "Medium" }
];

export const coupons = {
  SAVE10: 0.1,
  FLEX15: 0.15
};
