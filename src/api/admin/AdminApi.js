import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

// user management API functions
export const getUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/getUsers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export const addUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/addUser`, userData);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
}

export const verifyUser = async (userId) => {
  try {
    const response = await axios.patch(`${BASE_URL}/admin/verifyUser/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error verifying user:", error);
    throw error;
  }
}

export const editUser = async (userId, userData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/admin/updateUser/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error editing user:", error);
    throw error;
  }
}

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/admin/deleteUser/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}



// candidate management API functions
// retrieve all candidates
export const getCandidates = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/getCandidates`);
    return response.data;
  } catch (error) {
    console.error("Error fetching candidates:", error);
    throw error;
  }
}

// add candidate
export const addCandidate = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/addCandidate`, userData)
    return response.data
  } catch (error) {
    console.error("Error adding candidates:", error);
    throw error;
  }
}

// edit candidate
export const updateCandidate = async (candidateId, candidateData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/admin/updateCandidate/${candidateId}`, candidateData)
    return response.data
  } catch (error) {
    console.error("Error while updating candidate:", error);
    throw error;
  }
}

// remove candidate
export const deleteCandidate = async (candidateId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/admin/deleteCandidate/${candidateId}`)
    return response.data
  } catch (error) {
    console.error("Error while deleting candidate:", error);
    throw error;
  }
}

// dashboard data
export const dashboard = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/dashboard`)
    return response.data
  } catch (error) {
    console.error("Error while retrieve dashboard data:", error);
    throw error;
  }
}

// Admin login
export const adminLogin = async (adminData) => {
  try {

    const response = await axios.post(`${BASE_URL}/admin/adminLogin`, adminData)
    localStorage.setItem("adminToken", response?.data?.token)
    localStorage.setItem("adminData", JSON.stringify(response?.data?.admin))
    return response.data
  } catch (error) {
    console.error("Error while admin login:", error);
    throw error;
  }
}