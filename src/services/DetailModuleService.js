import api from "./api";

const detailModuleService = {
  getAllstatusModule() {
    return api.get("/detail-status/module/get-all-status-modules");
  },
};

export default detailModuleService;
