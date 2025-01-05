import api, { route } from '@forge/api';

const handleApiResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`API Request Failed: ${response.status}`);
  }
  return response.json();
};

const fetchDiffStat = async (workspaceId: string, repositoryId: string, pullRequestId: number) => {
  try {
    const url = route`/2.0/repositories/${workspaceId}/${repositoryId}/pullrequests/${pullRequestId}/diffstat`;
    const response = await api.asApp().requestBitbucket(url, { method: 'GET' });
    return handleApiResponse(response);
  } catch (error) {
    throw error;
  }
};

export const getChangedFilesInPR = async (workspaceId: string, repositoryId: string, pullRequestId: number) => {
  try {
    const diffStat = await fetchDiffStat(workspaceId, repositoryId, pullRequestId);
    return diffStat.values.map(file => file?.new?.path || file?.old?.path || '').filter(Boolean);
  } catch (error) {
    console.error('Error fetching changed files:', error);
    throw error;
  }
};
export const getPRDetails = async (workspaceId: string, repositoryId: string, pullRequestId: number) => {
  try {
    const url = route`/2.0/repositories/${workspaceId}/${repositoryId}/pullrequests/${pullRequestId}`;
    const response = await api.asApp().requestBitbucket(url, { method: 'GET' });
    return handleApiResponse(response);
  } catch (error) {
    throw error;
  }
}