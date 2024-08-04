import api from "./api";

const eventMonitoringService = {
    getAllEventMonitoring(){
       return api.get('/supervisor/em/get-all-em');
    },
    getAllModuleMonByIdMon(idMonitoring){
        return api.get(`/supervisor/em/${idMonitoring}/module-monitoring`);
    },
    getAllServerAppMonByIdMon(idMonitoring){
        return api.get(`/supervisor/em/${idMonitoring}/path-app-use-monitoring`)
    },
    getAllBackupMonByIdMon(idMonitoring){
        return api.get(`/supervisor/em/${idMonitoring}/backup-monitoring`);
    },
    getAllServerMonByIdMon(idMonitoring){
        return api.get(`/supervisor/em/${idMonitoring}/server-monitoring`);
    }
}

export default eventMonitoringService;