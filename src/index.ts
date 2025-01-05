import { AppContext, } from '@forge/api';
import { CheckResponse, PRCheckEvent } from './types';
import { getChangedFilesInPR, getPRDetails } from './utils';
import { Data } from './mockData';

export const run = async (event: PRCheckEvent, _context: AppContext): Promise<CheckResponse> => {
  try {
    const { uuid: workspaceId } = event.workspace;
    const { uuid: repositoryId } = event.repository;
    const { id: pullRequestId } = event.pullrequest;

    const changedFiles = await getChangedFilesInPR(workspaceId, repositoryId, pullRequestId);

    const hasInvalidFile = changedFiles.some((file) => Data.includes(file));

    const prDetails = await getPRDetails(workspaceId, repositoryId, pullRequestId);

    const approvers = prDetails.participants?.filter((participant: any) => participant.approved) || [];
    const approvalCount = approvers.length;

    const isSuccess = !hasInvalidFile || approvalCount >= 1;

    return {
      success: isSuccess,
      message: JSON.stringify({
        changedFiles,
        invalidFiles: Data.filter((file) => changedFiles.includes(file)),
        approvalCount,
      }),
    };
  } catch (error) {
    return {
      success: false,
      message: JSON.stringify(error)
    }
  }
};
