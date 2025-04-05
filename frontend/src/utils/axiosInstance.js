import axios from 'axios'
import { BASE_URL } from './apiPaths'

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
    },
});

//request intercepter brrr

axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken = localStorage.getItem("token")
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);

// response interceptor brr

axiosInstance.interceptors.response.use(
    (response)=>{
        return response
    },
    (error)=>{
        // commonly coming errors handling here:
        if(error.response){
            if(error.response.status===401){
                window.location.href="/login"
            }else if(error.response.status===500){
                console.error("Request timeout, please try again lol")
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
