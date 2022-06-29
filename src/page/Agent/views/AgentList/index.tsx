import useFetch from "hooks/useFetch";
import { GET_AGENT, GET_AGENTS } from "page/Agent/api";
import ListPage from "page/Agent/components/ListPage";
import * as React from "react";
import { columns, parseAgentList } from "./../../utils";
import { useUser } from "context/auth/context";
import { UserTypeEnum } from "types";
import AgentDrawerDetails from "page/Agent/components/AgentDrawerDetails";
import { useNavigate } from "react-router-dom";
import createDialogActionHandlers from "utils/handlers/createDialogActionHandlers";
import {
  AgentListUrl,
  AgentListUrlDialog,
  AgentListUrlQueryParams
} from "page/Agent/url";

interface AgentListProps {
  params: AgentListUrlQueryParams;
}

const AgentList: React.FC<AgentListProps> = props => {
  const { params } = props;
  const user = useUser();
  const navigate = useNavigate();

  const { response } = useFetch({
    url: GET_AGENTS
  });

  const { response: agent, loading: loadingAgent } = useFetch(
    {
      params: {
        id: params.id
      },
      url: GET_AGENT
    },
    {
      skip: !params.id
    }
  );

  const [openAction, closeAction] = createDialogActionHandlers<
    AgentListUrlDialog,
    AgentListUrlQueryParams
  >(navigate, AgentListUrl, params);

  const agentList = parseAgentList(response);

  return (
    <>
      <ListPage
        columns={columns.filter(e =>
          user?.usertype === UserTypeEnum.SUPER_USER
            ? e
            : e.path !== "club_name"
        )}
        data={agentList}
        onRowClick={id => openAction("agentDetails", { id })}
      />
      <AgentDrawerDetails
        open={params.action === "agentDetails"}
        onClose={closeAction}
        agent={agent?.data}
        loading={loadingAgent}
      />
    </>
  );
};

export default AgentList;
