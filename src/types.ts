export type Dialog<TDialog extends string> = Partial<{
  action: TDialog;
  drawerAction: TDialog;
}>;

export interface ColumnType {
  label: string;
  path: string;
  key: string | number;
  colSpan?: number;
  content?: any;
  hide?: boolean;
}

export enum AppStateActionType {
  START_LOADING = "START_LOADING",
  FINISH_LOADING = "FINISH_LOADING",
  SET_ERROR = "SET_ERROR"
}

export enum UserTypeEnum {
  AGENT = "AGENT",
  CLUB_ADMIN = "CLUB_ADMIN",
  SUPER_USER = "SUPER_USER"
}

export enum StatusType {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  FOR_APPROVAL = "FOR_APPROVAL",
  REJECT = "REJECT"
}

export enum BatchPayoutStatusType {
  COMPLETED = "COMPLETED",
  ONGOING = "ONGOING"
}

export enum AgentPayoutStatus {
  PAID = "PAID",
  PENDING = "PENDING"
}
