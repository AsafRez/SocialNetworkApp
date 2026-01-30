import axios from "axios";
const serverURL = import.meta.env.VITE_API_URL || 'http://localhost:8989/';
import Cookies from 'js-cookie';

// פונקציה שמנקה סלאשים כפולים ומחברת נכון
const getFullURL = (path) => {
    const base = serverURL.endsWith('/') ? serverURL.slice(0, -1) : serverURL;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${base}${cleanPath}`;
};

const getAuthConfig = () => {
    const token = Cookies.get("token"); // שליפת הטוקן מהקוקי ששמרת בלוגין
    return {
        withCredentials: true,
        headers: {
            'Authorization': token ? token : '' // הוספת הטוקן ל-Header
        }
    };
};

export const executeGet = async (url) => {
    const res = await axios.get(getFullURL(url), getAuthConfig());
    return res.data;
};

export const executePost = async (url, data) => {
    // בבקשת POST, ה-Config (ה-Headers) מגיע כפרמטר השלישי
    const res = await axios.post(getFullURL(url), data, getAuthConfig());
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