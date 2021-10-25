import axios from "axios";
import { authHeaders } from "./AuthService";

const usersUrl = "https://radiant-headland-05086.herokuapp.com/usuarios"; //prod
//const usersUrl = "http://localhost:3002/usuarios";//dllo

export const createUser = async (user) => {
    return await axios.post(`${usersUrl}/`, user);
}



export const getUsers = async () => {
    return await axios.get(`${usersUrl}/`);
}

export const getUser = async (id) => {
    return await axios.get(`${usersUrl}/${id}`, { headers: authHeaders });
}


export const addUser = async (user) => {
    return await axios.post(`${usersUrl}/`, user, { headers: authHeaders });
}

export const deleteUser = async (id) => {
    return await axios.delete(`${usersUrl}/${id}`, { headers: authHeaders });
}

export const editUser = async (user) => {
    return await axios.put(`${usersUrl}/${user._id}`, user, { headers: authHeaders });
}