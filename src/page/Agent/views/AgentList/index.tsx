import useFetch from "hooks/useFetch";
import { GET_AGENT, GET_AGENTS, UPDATE_AGENT_STATUS } from "page/Agent/api";
import ListPage from "page/Agent/components/ListPage";
import * as React from "react";
import { columns, parseAgentList } from "./../../utils";
import { useUser } from "context/auth/context";
import { StatusType, UserTypeEnum } from "types";
import AgentDrawerDetails from "page/Agent/components/AgentDrawerDetails";
import { useNavigate } from "react-router-dom";
import createDialogActionHandlers from "utils/handlers/createDialogActionHandlers";
import {
  AgentListUrl,
  AgentListUrlDialog,
  AgentListUrlQueryParams
} from "page/Agent/url";
import ActionDialog from "components/ActionDialog";
import makeHttpPost from "hooks/makeHttpPost";
import { toast } from "react-toastify";

interface AgentListProps {
  params: AgentListUrlQueryParams;
}

const AgentList: React.FC<AgentListProps> = props => {
  const { params } = props;
  const user = useUser();
  const navigate = useNavigate();

  const {
    response,
    refetch: refetchList,
    loading
  } = useFetch({
    params: {
      status: params?.status === "ALL" || undefined ? null : params.status
    },
    url: GET_AGENTS
  });

  React.useEffect(() => {
    refetchList();
  }, [params.status]);

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

  const [updateAgentStatus] = makeHttpPost({
    onComplete: () => {
      toast("Changes Saved!");
      refetchList();
      closeAction();
    },
    onError: err => {
      toast.error(err.response?.data?.message);
    }
  });

  const agentList = parseAgentList(response);

  const tabs = [
    {
      label: "ALL",
      name: "ALL"
    },
    {
      label: "For Approval",
      name: "FOR_APPROVAL"
    },
    {
      label: "Active",
      name: "ACTIVE"
    },
    {
      label: "In-Active",
      name: "INACTIVE"
    },
    {
      label: "Rejected",
      name: "REJECT"
    }
  ];

  const onTabChange = (tab: number) => {
    navigate(
      AgentListUrl({
        activeTab: tab.toString(),
        status: tabs[tab].name
      })
    );
  };

  const currentTab =
    params.activeTab === undefined
      ? // eslint-disable-next-line no-constant-condition
        false
        ? tabs.length
        : 0
      : parseInt(params.activeTab, 0);

  const onUpdateAgentStatus = async () => {
    await updateAgentStatus({
      data: {
        id: params.id,
        status: params.newStatus
      },
      url: UPDATE_AGENT_STATUS
    });
  };

  return (
    <>
      <ListPage
        columns={columns.filter(e =>
          user?.usertype === UserTypeEnum.SUPER_USER
            ? e
            : e.path !== "club_name"
        )}
        data={agentList}
        onRowClick={id => openAction("drawer", "agentDetails", { id })}
        onTabChange={onTabChange}
        currentTab={currentTab}
        loading={loading}
        tabs={tabs}
      />
      <AgentDrawerDetails
        open={params.drawerAction === "agentDetails"}
        onClose={closeAction}
        agent={agent?.data}
        loading={loadingAgent}
        onUpdateStatus={(newStatus: StatusType) =>
          openAction("dialog", "onUpdateStatus", {
            newStatus
          })
        }
      />
      <ActionDialog
        open={params.action === "onUpdateStatus"}
        onClose={closeAction}
        title={params.newStatus === "ACTIVE" ? "Approve Agent" : "Reject Agent"}
        onSubmit={onUpdateAgentStatus}
        label={{
          save: params.newStatus === "ACTIVE" ? "Approved" : "Reject"
        }}
      >
        <p>
          Are you sure you want to tag this as{" "}
          <b>{params.newStatus === "ACTIVE" ? "Approved" : "Reject"}</b>?
        </p>
      </ActionDialog>
    </>
  );
};

export default AgentList;
