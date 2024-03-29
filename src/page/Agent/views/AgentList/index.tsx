import useFetch from "hooks/useFetch";
import {
  CHANGE_UPPERAGENT,
  GET_AGENT,
  GET_AGENTS,
  GET_AVAILABLE_AGENTS,
  SINGLE_CHANGE_UPPER_AGENT,
  UPDATE_AGENT,
  UPDATE_AGENT_STATUS
} from "page/Agent/api";
import ListPage from "page/Agent/components/ListPage";
import * as React from "react";
import { columns, parseAgentList, tabs } from "./../../utils";
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
import ChangeAgentDialog from "page/Agent/components/ChangeAgentDialog";
import useBulkActions from "hooks/useBulkActions";
import { ErrorChangeUpperAgentHandler } from "page/Agent/handlers";
import EditAgentDialog from "page/Agent/components/EditAgentDialog";
import { Typography } from "@mui/material";
import SingleChangeAgentDialog from "page/Agent/components/SingleChangeAgentDialog";

interface AgentListProps {
  params: AgentListUrlQueryParams;
}

const AgentList: React.FC<AgentListProps> = props => {
  const { params } = props;
  const user = useUser();
  const navigate = useNavigate();
  const [search, setSearch] = React.useState<string>("");

  const {
    response,
    refetch: refetchList,
    loading
  } = useFetch({
    params: {
      search: search,
      status: params?.status === "ALL" || undefined ? null : params.status
    },
    url: GET_AGENTS
  });

  React.useEffect(() => {
    refetchList();
  }, [params.status, search]);

  const {
    response: agent,
    loading: loadingAgent,
    refetch: refetchAgent
  } = useFetch(
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

  const { response: availableAgents, loading: loadingAvailableAgents } =
    useFetch(
      {
        params: {
          id: params.id
        },
        url: GET_AVAILABLE_AGENTS
      },
      {
        skip: !params.id
      }
    );

  const [singleChangeUpperAgent] = makeHttpPost({
    onComplete: () => {
      toast("Changes Saved!");
      refetchList();
      closeAction("dialog");
      if (params.id) {
        refetchAgent();
      }
    },
    onError: err => {
      toast.error(err.response?.data.message);
    }
  });

  const {
    response: allAgents,
    loading: allAgentsLoadingAgent,
    refetch: refetchAllAgents
  } = useFetch({
    url: GET_AGENTS
  });

  const bulkActions = useBulkActions([]);

  const [openAction, closeAction] = createDialogActionHandlers<
    AgentListUrlDialog,
    AgentListUrlQueryParams
  >(navigate, AgentListUrl, params);

  const [updateAgentStatus] = makeHttpPost({
    onComplete: e => {
      toast("Changes Saved!");
      refetchList();

      if (e.data?.status === "DELETED") {
        closeAction();
      } else {
        closeAction("dialog");
      }
    },
    onError: err => {
      toast.error(err.response?.data?.message);
    }
  });

  const [changeUpperAgent] = makeHttpPost({
    onComplete: () => {
      toast("Changes Saved!");
      refetchList();
      bulkActions.reset();
      closeAction("dialog");

      if (params.id) {
        refetchAgent();
      }
    },
    onError: err => ErrorChangeUpperAgentHandler(err.response)
  });

  const [updateAgent] = makeHttpPost({
    onComplete: () => {
      toast("Changes Saved!");
      refetchList();
      closeAction("dialog");
      if (params.id) {
        refetchAgent();
      }
    },
    onError: err => {
      toast.error(err.response?.data.message);
    }
  });

  const agentList = parseAgentList(response);
  const parseAllAgents = parseAgentList(allAgents);

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

  const handleChangeUpperAgent = async (formData: any) => {
    await changeUpperAgent({
      data: {
        agent: formData.agent.toString(),
        subAgents: bulkActions.listElements
      },
      url: CHANGE_UPPERAGENT
    });
  };

  const handleUpdateAgent = async (formData: any) => {
    const result = await updateAgent({
      data: { ...formData, id: params.id },
      url: UPDATE_AGENT
    });

    return result;
  };

  const handleSingleChangeUpperAgent = async (formData: any) => {
    const result = await singleChangeUpperAgent({
      data: {
        agent_id: formData.agent ? formData.agent : null,
        id: parseInt(params.id ? params.id : ""),
        transfer_to_club_admin: formData.transfer_to_club_admin
      },
      url: SINGLE_CHANGE_UPPER_AGENT
    });

    return result;
  };

  return (
    <>
      <ListPage
        setSearch={setSearch}
        searchValue={search}
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
        onClose={() => closeAction("drawer")}
        agent={agent?.data}
        loading={loadingAgent}
        onUpdateStatus={(newStatus: StatusType) =>
          openAction("dialog", "onUpdateStatus", {
            newStatus
          })
        }
        onChangeUpperAgent={() => openAction("dialog", "onChangeUpperAgent")}
        onChangeGameId={() => openAction("dialog", "onEditAgent")}
        onDeleteAgent={(newStatus: StatusType) =>
          openAction("dialog", "onDeleteAgent", { newStatus })
        }
        onSingleChangeUpperAgent={() =>
          openAction("dialog", "onSingleChangeUpperAgent")
        }
        {...bulkActions}
      />
      <ActionDialog
        open={params.action === "onUpdateStatus"}
        onClose={() => closeAction("dialog")}
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
      {user?.usertype === UserTypeEnum.CLUB_ADMIN ? (
        <ChangeAgentDialog
          open={params.action === "onChangeUpperAgent"}
          closeAction={() => {
            closeAction("dialog");
            bulkActions.reset();
          }}
          selectedAgents={bulkActions.listElements}
          upperAgent={params.id}
          agentList={parseAllAgents}
          loading={allAgentsLoadingAgent}
          onSubmit={handleChangeUpperAgent}
          refetchAllAgents={refetchAllAgents}
        />
      ) : null}
      {user?.usertype === UserTypeEnum.CLUB_ADMIN ? (
        <EditAgentDialog
          open={params.action === "onEditAgent"}
          closeModal={closeAction}
          onSubmit={handleUpdateAgent}
          agent={agent?.data}
          loading={loadingAgent}
        />
      ) : null}
      {user?.usertype === UserTypeEnum.CLUB_ADMIN ? (
        <ActionDialog
          title="Delete Agent"
          open={params.action === "onDeleteAgent"}
          onClose={() => closeAction("dialog")}
          onSubmit={onUpdateAgentStatus}
        >
          <p>
            <Typography>Are you sure you want to Delete this Agent?</Typography>
          </p>
        </ActionDialog>
      ) : null}
      {
        <SingleChangeAgentDialog
          open={params.action === "onSingleChangeUpperAgent"}
          closeAction={() => closeAction("dialog")}
          loading={loadingAvailableAgents}
          availableAgents={availableAgents}
          onSubmit={handleSingleChangeUpperAgent}
        />
      }
    </>
  );
};

export default AgentList;
