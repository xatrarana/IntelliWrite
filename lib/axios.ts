import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL as string,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
})


export default instance;