import axios from "axios";

//const usersUrl = "https://radiant-headland-05086.herokuapp.com/usuarios"; //prod
const usersUrl = "http://localhost:3002/usuarios";//dllo

export const createUser = async (user) => {
    return await axios.post(`${usersUrl}/`, user);
}