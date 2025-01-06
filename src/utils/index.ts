import { fetchDiffStat, getPRDetails } from "../bitbucket";
import { Data } from "../mockData";
import { CheckResponse } from "../types";

export const getChangedFilesInPR = async (workspaceId: string, repositoryId: string, pullRequestId: number) => {
    try {
        const diffStat = await fetchDiffStat(workspaceId, repositoryId, pullRequestId);
        return diffStat.values.map(file => file?.new?.path || file?.old?.path || '').filter(Boolean);
    } catch (error) {
        console.error('Error fetching changed files:', error);
        throw error;
    }
};

export const changedFilesHasInvalid = async (workspaceId: string, repositoryId: string, pullRequestId: number) => {
    const changedFiles = await getChangedFilesInPR(workspaceId, repositoryId, pullRequestId);

    const hasInvalidFile = changedFiles.some((file) => Data.includes(file));
    return hasInvalidFile;
}

export const handleApiResponse = async (response) => {
    if (!response.ok) {
        throw new Error(`API Request Failed: ${response.status}`);
    }
    return response.json();
};

export const getApprovalCount = async (workspaceId: string, repositoryId: string, pullRequestId: number) => {
    const prDetails = await getPRDetails(workspaceId, repositoryId, pullRequestId);

    const approvers = prDetails.participants?.filter((participant: any) => participant.approved) || [];
    const approvalCount = approvers.length;
    return approvalCount;
}

export const getMessage = (isSuccess: boolean, approvalCount: number) => {
    if(!isSuccess) {
        return {
            approvalCount: approvalCount,
            message:"Approval is required because changes have been made to a file used at many points."
        }
    }
    return {
        message:"THANKS."
    }
}
export const handleError = (error: unknown): CheckResponse => {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return {
      success: false,
      message: JSON.stringify({ error: errorMessage }),
    };
  };
  