import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const authApi = {
  login: (payload) => api.post("/auth/login", payload),
  register: (payload) => api.post("/auth/register", payload),
};

export const spacesApi = {
  list: () => api.get("/spaces"),
  add: (payload) => api.post("/spaces/add", payload),
  update: (id, payload) => api.put(`/spaces/${id}`, payload),
  remove: (id) => api.delete(`/spaces/${id}`),
};

export const bookingsApi = {
  listByUser: (userId) => api.get(`/bookings/user/${userId}`),
  create: (payload) => api.post("/bookings/create", payload),
  remove: (id) => api.delete(`/bookings/${id}`),
};

export default api;
