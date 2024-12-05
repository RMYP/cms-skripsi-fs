import axios from "axios";

interface User {
    email: string;
    password: string;
}

export const login = async (data: User) => {
    try {
        const response = await axios.post("/api/v1/auth/login", data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const register = async (data: any) => {
    try {
        const response = await axios.post("/api/v1/auth/register", data);
        return response.data;
    } catch (error) {
        throw error;
    }
}