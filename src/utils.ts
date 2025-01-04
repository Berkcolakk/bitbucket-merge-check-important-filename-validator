import api, { route } from '@forge/api';

// Utility function for handling API responses
const handleApiResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`API Request Failed: ${response.status}`);
  }
  return response.json();
};

// Extracted API call logic
const fetchDiffStat = async (workspace, repoSlug, pullRequestId) => {
  const url = route`/2.0/repositories/${workspace}/${repoSlug}/pullrequests/${pullRequestId}/diffstat`;
  const response = await api.asApp().requestBitbucket(url, { method: 'GET' });
  return handleApiResponse(response);
};

// Main function to get changed file names in a pull request
export const getChangedFilesInPR = async (workspace, repoSlug, pullRequestId) => {
  try {
    const diffStat = await fetchDiffStat(workspace, repoSlug, pullRequestId);

    // Extract file paths with fallback for missing data
    return diffStat.values.map(file => file?.new?.path || file?.old?.path || '').filter(Boolean);
  } catch (error) {
    console.error('Error fetching changed files:', error);
    throw error;
  }
};


export const Data = ["Test.tsx", "Modal.tsx"];
