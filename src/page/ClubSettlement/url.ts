import { stringify as stringifyQs } from "qs";
import urlJoin from "url-join";
import { Dialog } from "types";

export const clubPayoutSection = "/club-settlement/payout";

export const clubPayoutListPath = clubPayoutSection;

export const clubPayout = (id: string) => urlJoin(clubPayoutSection, id);

export const clubPayoutUrl = (id: string, params?: any) =>
  clubPayout(encodeURIComponent(id)) + "?" + stringifyQs(params);

export type ClubPayoutListUrlDialog = "onUploadFile";

export type ClubPayoutListUrlQueryParams = Dialog<ClubPayoutListUrlDialog> & {
  activeTab?: string;
  id?: string;
  type?: string;
};

export const ClubPayoutListUrl = (params?: ClubPayoutListUrlQueryParams) =>
  clubPayoutListPath + "?" + stringifyQs(params);
