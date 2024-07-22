import api from "./api";

const moduleService = {
  getAllModule() {
    return api.get("/super-admin/module/get-all-module");
  },
  createNewModule(newModule) {
    return api.post("/super-admin/module/create", newModule);
  },
  updateModule(moduleData) {
    return api.put(
      `/super-admin/module/update/${moduleData.idModule}`,
      moduleData
    );
  },
  deleteModule(idModule) {
    return api.delete(`/super-admin/module/delete/${idModule}`);
  },
};

export default moduleService;
