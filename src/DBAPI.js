import axios from "axios";
const serverURL = 'http://localhost:8989/';
export const execute = async (url) => {
    const res = await axios.get(serverURL + url);
    return res.data;
};