import api from "./api";

export interface RegisterRequest {
    fullName: string;
    email: string;
    password: string;
}

export const registerUser = async (data: RegisterRequest) => {
    const response = await api.post("/api/auth/register", data);
    return response.data;
};

import { jwtDecode } from "jwt-decode";
import axios from "axios";

// ... existing registerUser ...

export const getCurrentUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    try {
        // Try fetching from API first, bypassing the global interceptor
        // to avoid auto-redirect on 401/403
        const response = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/auth/me`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.warn("Failed to fetch user profile, falling back to token decode:", error);

        // Fallback: Decode token
        try {
            const decoded: any = jwtDecode(token);
            // Construct a partial user object from token claims
            // Adjust field names based on your actual JWT structure
            return {
                id: decoded.id || decoded.sub,
                name: decoded.name || decoded.fullName || decoded.email?.split('@')[0] || "User",
                email: decoded.email || decoded.sub || "No Email",
                role: decoded.role || decoded.roles?.[0] || "Employee",
                // specific fields might be missing
                department: decoded.department,
                designation: decoded.designation
            };
        } catch (decodeError) {
            console.error("Failed to decode token:", decodeError);
            throw new Error("Failed to load user profile");
        }
    }
};
