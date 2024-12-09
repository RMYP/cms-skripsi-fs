import axios from "axios";

interface loginForm {
    email: string;
    password: string;
}

interface registerForm {
    email: string,
    password: string,
    name: string
}

export const login = async (data: loginForm) => {
    try {
        const response = await axios.post("/api/v1/auth/login", data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const register = async (data: registerForm) => {
    try {
        console.log("hit register")
        const response = await axios.post("/api/v1/auth/register", data);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
}