import axios from "axios";
import { User } from "lucide-react";
const BASE_URL = import.meta.env.VITE_BASE_URL;

// user signup 
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/signup`, userData)
        return response.data
    } catch (error) {
        console.error("Error occurred while register user:", error);
        throw error;
    }
}

// user login
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, userData)
        console.log('res', response);

        localStorage.setItem("authToken", response?.data?.token)
        localStorage.setItem("userData", JSON.stringify(response?.data?.user))
        return response.data
    } catch (error) {
        console.error("Error occurred while login user:", error);
        throw error;
    }
}

// list all elections
export const getElections = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/getElections`)
        return response.data
    } catch (error) {
        console.error("Error fetching elections:", error);
        throw error;
    }
}

// poll votes
export const pollVote = async (electionId, candidateId) => {
    try {
        const token = localStorage.getItem("authToken")
        const response = await axios.post(`${BASE_URL}/pollVote/${electionId}`, { candidateId: candidateId },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            },
        )
        return response.data
    } catch (error) {
        console.error("Error polling a vote in elections:", error);
        throw error;
    }
}

// get results
export const getResults = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/getResults`)
        return response.data
    } catch (error) {
        console.error("Error while fetching results in user side:", error);
        throw error;
    }
}


// get specific election details
export const getELectionDetails = async (electionId) => {
    try {
        const response = await axios.get(`${BASE_URL}/electionDetails/${electionId}`)
        return response.data
    } catch (error) {
        console.error("Error while fetching election details:", error);
        throw error;
    }
}

// user profile
export const userProfile = async (userId) => {
    try {
        const token = localStorage.getItem("authToken")
        const response = await axios.get(`${BASE_URL}/profile/${userId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            },
        )

        return response.data

    } catch (error) {
        console.error("Error while fetching user profile data:", error);
        throw error;
    }
}

// forgot password
export const forgotPassword = async (email) => {
    try {
        const response = await axios.post(`${BASE_URL}/forgotPassword`, {email:email} )
        return response.data
    } catch (error) {
        console.error("Error while invoke forgot password:", error);
        throw error;
    }
}

// reset password 
export const resetPassword = async (newPassword) => {
    try {
        const token = localStorage.getItem("authToken")
        const response = await axios.post(`${BASE_URL}/resetPassword/${token}`, { newPassword })
        return response.data
    } catch (error) {
        console.error("Error while reset password:", error);
        throw error;
    }
}