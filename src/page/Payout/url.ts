// import urlJoin from "url-join";
import { stringify as stringifyQs } from "qs";
import { BatchPayoutStatusType, Dialog } from "types";
import urlJoin from "url-join";

export const payoutSection = "/agent-payout";

export const payoutPath = (id: string) => urlJoin(payoutSection, id);
export const payoutUrl = (id: string, params?: any) =>
  payoutPath(id) + "?" + stringifyQs(params);

export const payoutListPath = payoutSection;
export type PayoutListUrlDialog = "uploadPayoutBatch";
export type PayoutListUrlQueryParams = Dialog<PayoutListUrlDialog> & {
  id?: string;
};
export const PayoutListUrl = (params?: PayoutListUrlQueryParams) =>
  payoutListPath + "?" + stringifyQs(params);

export type PayoutDetailsUrlDialog = "onComplete";

export type PayoutDetailsUrlQueryParams = Dialog<PayoutDetailsUrlDialog> & {
  id?: string;
  status?: BatchPayoutStatusType;
};
