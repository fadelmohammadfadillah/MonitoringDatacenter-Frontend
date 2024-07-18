import api from "./api";

const authService = {
    async login(credential){
        try {
            console.log(credential);
            const response = await api.post('/auth/authenticate', credential);
            const token = response.data.jwtToken;
            console.log(token);
            localStorage.setItem('token', token);
            return true;
        } catch (error) {
            return false;
        }
    }
}

export default authService;
