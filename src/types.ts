export type Report = {
    title: string;
    report_type: string;
    result: string;
  };
  
  export type Commit = {
    hash: string;
  };
  
  export type Source = {
    commit: Commit;
  };
  
  export type PullRequest = {
    source: Source;
  };
  
  export type UuidType = {
    uuid: string;
  };
  
  export type PrIdType = {
    id: number;
  };
  
  export type TriggerType = {
    type: string;
  };
  
  export type PRCheckEvent = {
    workspace: UuidType;
    repository: UuidType;
    pullrequest: PrIdType;
    trigger: TriggerType;
  };
  
  export type AppContext = {
    workspaceId: string;
    installContext: string;
  };
  
  export type CheckResponse = {
    success: boolean;
    message?: string;
  };
  