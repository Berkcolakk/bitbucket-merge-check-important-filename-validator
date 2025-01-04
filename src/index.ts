import { AppContext, route } from '@forge/api';
import { CheckResponse, PRCheckEvent } from './types';
import { getChangedFilesInPR, Data } from './utils';
import api from '@forge/api'; // Forge API kullanımı

export const run = async (event: PRCheckEvent, _context: AppContext): Promise<CheckResponse> => {
  const { uuid: workspaceId } = event.workspace;
  const { uuid: repositoryId } = event.repository;
  const { id: pullRequestId } = event.pullrequest;

  // PR'da değiştirilen dosyaları al
  const changedFiles = await getChangedFilesInPR(workspaceId, repositoryId, pullRequestId);

  // Hatalı dosya kontrolü
  const hasInvalidFile = changedFiles.some((file) => Data.includes(file));

  // PR detaylarını API'den çekerek onaylayanları al
  const url = route`/2.0/repositories/${workspaceId}/${repositoryId}/pullrequests/${pullRequestId}`;
  const prDetailsResponse = await api.asApp().requestBitbucket(url, { method: 'GET' });

  if (!prDetailsResponse.ok) {
    throw new Error(`Failed to fetch PR details: ${prDetailsResponse.status} ${prDetailsResponse.statusText}`);
  }

  const prDetails = await prDetailsResponse.json();
  const approvers = prDetails.participants?.filter((participant: any) => participant.approved) || [];
  const approvalCount = approvers.length;

  // Success durumu: Ya hatalı dosya yok ya da en az 2 kişi onayladı
  const isSuccess = !hasInvalidFile || approvalCount >= 1;

  return {
    success: isSuccess,
    message: JSON.stringify({
      changedFiles,
      invalidFiles: Data.filter((file) => changedFiles.includes(file)),
      approvalCount,
    }),
  };
};
