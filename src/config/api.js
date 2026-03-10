import axios from "axios";

const API = axios.create({
  baseURL: "https://fin-five-server.vercel.app", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach the JWT Token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("fin5ive_token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Public Endpoints
export const createContact = (data) => API.post("/contacts", data);
export const submitApplication = (formData) => API.post("/applications", formData, {
  headers: { "Content-Type": "multipart/form-data" },
});

// Auth Endpoints
export const loginUser = (credentials) => API.post("/auth/login", credentials);
export const registerUser = (userData) => API.post("/auth/register", userData);

// User Endpoints (For profile data, edit profile, deactivate)
export const getUser = (id) => API.get(`/users/${id}`);
export const updateUser = (id, userData) => API.put(`/users/${id}`, userData);
export const deleteUser = (id) => API.delete(`/users/${id}`);

// Customer Endpoints (For financial data)
export const getCustomer = (id) => API.get(`/customers/${id}`);
export const getCustomerDocuments = (customerId) => API.get(`/documents/customer/${customerId}`);
export const downloadDocument = (id) => API.get(`/documents/${id}/download`, { 
  responseType: 'blob' 
});