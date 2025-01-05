import api, { route } from "@forge/api";
import { handleApiResponse } from "../utils/index";

export const getPRDetails = async (workspaceId: string, repositoryId: string, pullRequestId: number) => {
    try {
        const url = route`/2.0/repositories/${workspaceId}/${repositoryId}/pullrequests/${pullRequestId}`;
        const response = await api.asApp().requestBitbucket(url, { method: 'GET' });
        return handleApiResponse(response);
    } catch (error) {
        throw error;
    }
}
export const fetchDiffStat = async (workspaceId: string, repositoryId: string, pullRequestId: number) => {
    try {
        const url = route`/2.0/repositories/${workspaceId}/${repositoryId}/pullrequests/${pullRequestId}/diffstat`;
        const response = await api.asApp().requestBitbucket(url, { method: 'GET' });
        return handleApiResponse(response);
    } catch (error) {
        throw error;
    }
};