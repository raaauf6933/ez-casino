import { stringify as stringifyQs } from "qs";
import { Dialog } from "types";
// import urlJoin from "url-join";

export const dashboardSection = "/";

export const dashboardPath = dashboardSection;
export type dashboardDialog = "onRequestCash";
export type DashboardDialogUrlQueryParams = Dialog<dashboardDialog> & {
  id?: string;
};
export const DashboardUrl = (params?: DashboardDialogUrlQueryParams) =>
  dashboardPath + "?" + stringifyQs(params);
