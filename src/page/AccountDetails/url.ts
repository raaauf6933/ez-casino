import urlJoin from "url-join";
import { stringify as stringifyQs } from "qs";
import { Dialog } from "types";

export const accountDetailsSection = "/account-details";

export const accountDetailsPath = (id: string) =>
  urlJoin(accountDetailsSection, id);

export const accountDetailsUrl = (id: string, params?: any) =>
  accountDetailsPath(encodeURIComponent(id)) + "?" + stringifyQs(params);

export type AccountUrlDialog = "changePassword";

export type AccountDetaillsUrlQueryParams = Dialog<AccountUrlDialog> & {
  id?: string;
};

export const AccountDetailstUrl = (params?: AccountDetaillsUrlQueryParams) =>
  accountDetailsSection + "?" + stringifyQs(params);
