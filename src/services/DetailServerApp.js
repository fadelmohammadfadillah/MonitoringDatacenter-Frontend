import api from "./api";

const detailServerApp = {
  getAllstatusServerApp() {
    return api.get("/detail-status/server/get-all-status-server-app");
  },
};

export default detailServerApp;
