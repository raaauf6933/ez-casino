import urlJoin from "url-join";
import { stringify as stringifyQs } from "qs";

export const accountDetailsSection = "/account-details";

export const accountDetailsPath = (id: string) =>
  urlJoin(accountDetailsSection, id);

export const accountDetailsUrl = (id: string, params?: any) =>
  accountDetailsPath(encodeURIComponent(id)) + "?" + stringifyQs(params);
