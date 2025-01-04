import api, { route } from '@forge/api';

const handleApiResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`API Request Failed: ${response.status}`);
  }
  return response.json();
};

const fetchDiffStat = async (workspace, repoSlug, pullRequestId) => {
  const url = route`/2.0/repositories/${workspace}/${repoSlug}/pullrequests/${pullRequestId}/diffstat`;
  const response = await api.asApp().requestBitbucket(url, { method: 'GET' });
  return handleApiResponse(response);
};

export const getChangedFilesInPR = async (workspace, repoSlug, pullRequestId) => {
  try {
    const diffStat = await fetchDiffStat(workspace, repoSlug, pullRequestId);

    return diffStat.values.map(file => file?.new?.path || file?.old?.path || '').filter(Boolean);
  } catch (error) {
    console.error('Error fetching changed files:', error);
    throw error;
  }
};


export const Data = ["Test.tsx", "Modal.tsx"];
