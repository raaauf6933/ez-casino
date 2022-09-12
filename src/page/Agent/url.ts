import urlJoin from "url-join";
import { stringify as stringifyQs } from "qs";
import { Dialog } from "types";

export const agentSection = "/agents";

export const agentCreatePath = agentSection + "/create";
export const agentListPath = agentSection;

export const agentPath = (id: string) => urlJoin(agentSection, id);

export const agentUrl = (id: string, params?: any) =>
  agentPath(encodeURIComponent(id)) + "?" + stringifyQs(params);

export type AgentListUrlDialog =
  | "agentDetails"
  | "onUpdateStatus"
  | "onChangeUpperAgent"
  | "onEditAgent"
  | "onDeleteAgent"
  | "onSingleChangeUpperAgent";

export type AgentListUrlQueryParams = Dialog<AgentListUrlDialog> & {
  id?: string;
  activeTab?: string;
  status?: string;
  newStatus?: string;
};

export const AgentListUrl = (params?: AgentListUrlQueryParams) =>
  agentListPath + "?" + stringifyQs(params);
