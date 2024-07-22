import api from "./api";

const divisiService = {
    getAllDiv(){
        return api.get('/super-admin/div/get-all-div');
    },
    createNewDiv(newDiv){
        return api.post('/super-admin/div/create', newDiv);
    },
    updateDiv(divData){
        return api.put(`/super-admin/div/update/${divData.idDivisi}`, divData);
    },
    deleteDiv(idDiv){
        return api.delete(`/super-admin/div/delete/${idDiv}`);
    }
}


export default divisiService