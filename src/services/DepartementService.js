import api from "./api";

const divisiService = {
  getAllDept() {
    return api.get("/super-admin/dept/get-all-dept");
  },
  createNewDept(newDept) {
    return api.post("/super-admin/dept/create", newDept);
  },
  updateDept(deptData) {
    return api.put(`/super-admin/dept/update/${deptData.idDepartment}`, deptData);
  },
  deleteDept(idDept) {
    return api.delete(`/super-admin/dept/delete/${idDept}`);
  },
};

export default divisiService;
