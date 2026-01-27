import axios from "axios";
const serverURL = 'http://localhost:8989/';
export const executeGet = async (url) => {
    const res = await axios.get(serverURL + url,{withCredentials: true});
    return res.data;
};
export const executePost = async (url,data) => {
    const res = await axios.post(serverURL + url,data,{withCredentials: true});
    return res.data;
};