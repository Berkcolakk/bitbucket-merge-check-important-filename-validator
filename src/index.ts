import { AppContext } from '@forge/api';
import { CheckResponse, PRCheckEvent } from './types';
import { MIN_APPROVAL } from './common';
import { changedFilesHasInvalid, getApprovalCount, getMessage, handleError } from './utils';

export const run = async (event: PRCheckEvent, _context: AppContext): Promise<CheckResponse> => {
  const { workspace, repository, pullrequest } = event;
  const { uuid: workspaceId } = workspace;
  const { uuid: repositoryId } = repository;
  const { id: pullRequestId } = pullrequest;

  try {
    const [hasInvalidFile, approvalCount] = await Promise.all([
      changedFilesHasInvalid(workspaceId, repositoryId, pullRequestId),
      getApprovalCount(workspaceId, repositoryId, pullRequestId),
    ]);

    const isSuccess = !hasInvalidFile || approvalCount >= MIN_APPROVAL;
    const message = getMessage(isSuccess, approvalCount);

    return {
      success: isSuccess,
      message: JSON.stringify({ message }),
    };
  } catch (error) {
    return handleError(error);
  }
};
