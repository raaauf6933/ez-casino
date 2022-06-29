import urlJoin from "url-join";
import { stringify as stringifyQs } from "qs";

export const clubSection = "/clubs";

export const clubCreatePath = clubSection + "/create";

export const clubPath = (id: string) => urlJoin(clubSection, id);

export const clubUrl = (id: string, params?: any) =>
  clubPath(encodeURIComponent(id)) + "?" + stringifyQs(params);
