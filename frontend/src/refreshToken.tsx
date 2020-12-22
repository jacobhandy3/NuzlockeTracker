import axios from 'axios';

const axiosRefresh = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/token/refresh/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

export default axiosRefresh;