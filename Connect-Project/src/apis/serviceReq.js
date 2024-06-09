import { apiInstance } from "./axiosConfig"

export const ServiceRequest ={
 callAPI:async function(path,data){
    const response = await apiInstance.request({
        url:path,
        method:'POST',
        data
    })
   return response.data;

 }
}