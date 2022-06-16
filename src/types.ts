export interface ColumnType {
  label: string;
  path: string;
  key: string | number;
  colSpan?: number;
  content?: any;
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
  INACTIVE = "INACTIVE"
}
