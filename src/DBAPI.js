import axios from "axios";
const serverURL = import.meta.env.VITE_API_URL || 'http://localhost:8989/';
export const executeGet = async (url) => {
    const res = await axios.get(serverURL + url,{withCredentials: true});
    return res.data;
};

export const executePost = async (url,data) => {
    const res = await axios.post(serverURL + url,data,{withCredentials: true});
    return res.data;
};
const handleFileUpload = async (event) => {
    const file = event.target.files[0]; // בחירת הקובץ הראשון
    const formData = new FormData();
    formData.append('image', file); // 'image' הוא המפתח שהשרת יחפש

    try {
        const response = await fetch('http://your-api/upload', {
            method: 'POST',
            body: formData, // שליחת ה-FormData (הדפדפן יגדיר אוטומטית את ה-Headers)
        });
        const data = await response.json();
        console.log('Success:', data);
    } catch (error) {
        console.error('Error:', error);
    }
};
const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
}