export const backendBaseUrl = process.env.JAVA_BACKEND_URL;
export const mlBaseUrl = process.env.ML_SERVER_URL;

export const apiPath = {
    getRecordById: "/web_project_eclipse/api/recordById",
    getRecordsByCustNumber: "/web_project_eclipse/api/recordById",
    advanceSearch: "/web_project_eclipse/api/advanceSearch",
    deleteRecord: "/web_project_eclipse/api/deleteById",
    removeFromView: "/web_project_eclipse/api/removeFromView",
    recordsByPagination: "/web_project_eclipse/api/records",
    addRecord: "/web_project_eclipse/api/addRecord",
    updateRecord: "/web_project_eclipse/api/updateRecord",
    countRecord: "/web_project_eclipse/api/count",
    analytics: "/web_project_eclipse/api/analyticsData",
    mlPredict: "/get_prediction",
}