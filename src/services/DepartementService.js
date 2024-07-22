import api from "./api";

const departmentService = {
  getAllDept() {
    return api.get("/super-admin/dept/get-all-dept");
  },
  createNewDept(newDept) {
    return api.post("/super-admin/dept/create", newDept);
  },
  updateDept(deptData) {
    return api.put(`/super-admin/dept/update/${deptData.idDepartment}`, deptData);
  },
  deleteDept(idDepartment) {
    return api.delete(`/super-admin/dept/delete/${idDepartment}`);
  },
};

export default departmentService;
