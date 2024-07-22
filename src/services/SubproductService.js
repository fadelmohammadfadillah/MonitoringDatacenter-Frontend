import api from "./api";

const subproductService = {
  getAllSubproduct() {
    return api.get("/super-admin/subproduct/get-all-subproduct");
  },
  createNewSubproduct(newSubproduct) {
    return api.post("/super-admin/subproduct/create", newSubproduct);
  },
  updateSubproduct(subproductData) {
    return api.put(
      `/super-admin/subproduct/update/${subproductData.idSubproduct}`,
      subproductData
    );
  },
  deleteSubproduct(idSubproduct) {
    return api.delete(`/super-admin/subproduct/delete/${idSubproduct}`);
  },
};

export default subproductService;
