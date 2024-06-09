import axios from "axios";

export const apiInstance = axios.create({
    baseURL:'http://localhost:4000/api',
    headers:{
        'Content-Type':'application/json',
    },
})

apiInstance.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${sessionStorage.getItem('connectToken')}`,
    config.headers.user = `Bearer ${sessionStorage.getItem('username')}`
    return config;
})

apiInstance.interceptors.response.use((response)=>{
    const newToken = response.headers.get['New-Token'];
    if(newToken) sessionStorage.setItem('connectToken',newToken);

    return response;
},(error)=>{
    if(error.response&&error.response.status===403){
        if(sessionStorage.getItem('connectToken')){
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('isUserLogin');
            sessionStorage.setItem('isSessionExpired',true);

        }
    }
    return Promise.reject(error)
})