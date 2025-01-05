import { AppContext, } from '@forge/api';
import { CheckResponse, PRCheckEvent } from './types';
import { Data } from './mockData';
import { MIN_APPROVAL } from './common';
import { changedFilesHasInvalid, getApprovalCount, getMessage } from './utils';
import { getPRDetails } from './bitbucket';

export const run = async (event: PRCheckEvent, _context: AppContext): Promise<CheckResponse> => {
  try {
    const { uuid: workspaceId } = event.workspace;
    const { uuid: repositoryId } = event.repository;
    const { id: pullRequestId } = event.pullrequest;


    const hasInvalidFile = await changedFilesHasInvalid(workspaceId, repositoryId, pullRequestId);

    const approvalCount = await getApprovalCount(workspaceId, repositoryId, pullRequestId);

    const isSuccess = !hasInvalidFile || approvalCount >= MIN_APPROVAL;

    const message = getMessage(isSuccess, approvalCount);

    return {
      success: isSuccess,
      message: JSON.stringify({
        message
      }),
    };
  } catch (error) {
    return {
      success: false,
      message: JSON.stringify(error)
    }
  }
};
