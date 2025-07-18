import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Election management Api functions
// list all elections
export const getElections = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/admin/getElections`)
        return response.data
    } catch (error) {
        console.error("Error fetching elections:", error);
        throw error;
    }
}

// create new election
export const createElection = async (electionData) => {
    try {
        const response = await axios.post(`${BASE_URL}/admin/createElection`, electionData)
        return response.data
    } catch (error) {
        console.error("Error while adding election:", error);
        throw error;
    }
}


// update election details
export const updateElection = async (electionId, electionData) => {
    try {
        const response = await axios.patch(`${BASE_URL}/admin/updateElection/${electionId}`, electionData)
        return response.data
    } catch (error) {
        console.error("Error while updaing election:", error);
        throw error;
    }
}

// preview election details by specific id 
export const previewElectionById = async (electionId) => {
    try {
        const response = await axios.get(`${BASE_URL}/admin/preview/${electionId}`)
        return response.data
    } catch (error) {
        console.error("Error while fetching election preview by id:", error);
        throw error;
    }
}

// remove specifin elections
export const deleteElectionById = async (electionId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/admin/deleteElection/${electionId}`)
        return response.data

    } catch (error) {
        console.error("Error while deleting election by id:", error);
        throw error;
    }
}

// end election
export const endElection = async (electionId) => {
    try {
        const response = await axios.patch(`${BASE_URL}/admin/endElection/${electionId}`)
        return response.data
    } catch (error) {
        console.error("Error while ending election by id:", error);
        throw error;
    }
}

// get results
export const getResults = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/admin/getResults`)
        return response.data
    } catch (error) {
        console.error("Error while fetching results:", error);
        throw error;
    }
}