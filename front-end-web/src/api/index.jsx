import axios from 'axios'

var api = axios.create({
    baseURL:'http://localhost:8080'
})

export const getAPI = (url)=>{
    return api.get(url)
}
export const postAPI = (url, data)=>{
    return api.post(url, data)
}
export const deleteAPI = (url)=>{
    return api.delete(url)
}