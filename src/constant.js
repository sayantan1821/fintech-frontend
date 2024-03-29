export const baseUrl = process.env.REACT_APP_CLIENT_URL;
export const mlBaseUrl = "http://localhost:5000";

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
    updatePredict: "/web_project_eclipse/api/updatePredict",
    mlPredict: "/get_prediction",
}