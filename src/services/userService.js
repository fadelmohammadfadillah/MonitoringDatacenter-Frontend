import api from "./api";

const userService = {
    getAllUsers(){
        return api.get('/super-admin/user/get-all-user');
    },
    createNewUser(newUser){
        console.log(newUser);
        return api.post('/super-admin/register', newUser);
    },
    updateUser(userData){
        return api.put(`/super-admin/user/update/${userData.idUser}`, userData);
    },
    deleteUserProductOwner(idUser){
        return api.delete(`/super-admin/user/po/delete/${idUser}`);
    },
    deleteUserSupervisor(idUser){
        return api.delete(`/super-admin/user/spv/delete/${idUser}`);
    },
    deleteUserOperator(idUser){
        return api.delete(`/super-admin/user/op/delete/${idUser}`);
    },
}

export default userService;