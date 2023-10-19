import axios from 'axios';

// 7-1. axios 설정
const instance = axios.create({
    baseURL : 'http://localhost:5000'
})

export default instance;