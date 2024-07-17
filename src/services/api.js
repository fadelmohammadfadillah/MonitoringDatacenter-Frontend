import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(
    config => {
        // const token = localStorage.getItem('token')
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcyMTE3OTE1NywiZXhwIjoxNzIxMjE1MTU3fQ.1l1qY_gPCR4PziJpvvnMJQ5crQvpNL3v_tTLkH5ImX0'
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error);
    }
)

export default api