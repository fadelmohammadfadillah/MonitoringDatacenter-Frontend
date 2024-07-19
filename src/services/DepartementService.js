import api from "./api";

const divisiService = {
  getAllDep() {
    return api.get("/user-div/get-all-div");
  },
  createNewDiv(newDiv) {
    return api.post("/user-div/create", newDiv);
  },
  updateDiv(divData) {
    return api.put(`/user-div/update/${divData.idDivisi}`, divData);
  },
  deleteDiv(idDiv) {
    return api.delete(`/user-div/delete/${idDiv}`);
  },
};

export default divisiService;
