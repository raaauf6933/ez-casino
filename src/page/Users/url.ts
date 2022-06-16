import urlJoin from "url-join";
import { stringify as stringifyQs } from "qs";

export const usersSection = "/users";

export const userCreatePath = usersSection + "/create";

export const userPath = (id: string) => urlJoin(usersSection, id);

export const userUrl = (id: string, params?: any) =>
  userPath(encodeURIComponent(id)) + "?" + stringifyQs(params);
