import api from "./api";

const bankService = {
    getAllBank(){
        return api.get('/super-admin/bank/get-all-bank');
    },
    createNewBank(newBank){
        return api.post('/super-admin/bank/create', newBank);
    },
    updateBank(bankData){
        return api.put(`/super-admin/bank/update/${bankData.idBank}`, bankData);
    },
    deleteBank(idBank){
        return api.delete(`/super-admin/bank/delete/${idBank}`);
    }
}


export default bankService;