import api from "./api";

const serverService = {
    getAllServer(){
       return api.get("/super-admin/server/get-all-server");
    },
    createNewServer(newServer){
        return api.post('/super-admin/server/create', newServer);
    },
    updateServer(serverData){
        return api.put(
            `/super-admin/server/update/${serverData.idServer}`,
            serverData
        );
    },
    deleteServer(idServer){
        return api.delete(`/super-admin/server/delete/${idServer}`);
    },
    getAllServerConfig(){
        return api.get("/super-admin/server-config/get-all-server-config");
    },
    createNewServerConfig(newServerConfig){
        return api.post('/super-admin/server-config/create', newServerConfig);
    },
    updateServerConfig(serverConfigData){
        return api.put(
            `/super-admin/server-config/update/${serverConfigData.idServerConfig}`,
            serverConfigData
        );
    },
    deleteServerConfig(idServerConfig){
        return api.delete(`/super-admin/server-config/delete/${idServerConfig}`);
    }
}

export default serverService;