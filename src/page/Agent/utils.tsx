import { Checkbox } from "@mui/material";
import { AxiosResponse } from "axios";
import StatusLabel from "components/StatusLabel";
import moment from "moment";
import { ColumnType, UserTypeEnum } from "types";
import { Agent } from "./types";

export const columns: ColumnType[] = [
  {
    hide: true,
    key: 1,
    label: "ID",
    path: "id"
  },
  {
    key: 2,
    label: "Game ID",
    path: "game_code"
  },
  {
    key: 3,
    label: "Agent Name",
    path: "agent_name"
  },
  {
    key: 4,
    label: "Club",
    path: "club_name"
  },
  {
    key: 5,
    label: "Date Added",
    path: "date_added"
  },
  {
    key: 6,
    label: "Status",
    path: "status"
  }
];

export const tabs = [
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

export const subAgentTableColumns = (
  usertype: UserTypeEnum | null | undefined
): ColumnType[] => {
  return [
    {
      content: ({ toggle, isSelected, ...props }: any) => {
        return (
          <Checkbox checked={isSelected} onChange={() => toggle(props.id)} />
        );
      },
      hide: usertype !== UserTypeEnum.CLUB_ADMIN,
      key: 1,
      label: "",
      path: "check_box"
    },
    {
      key: 2,
      label: "Game ID",
      path: "game_id"
    },
    {
      key: 3,
      label: "Name",
      path: "name"
    }
  ];
};

export const parseAgentList = (
  response: AxiosResponse<any, any> | undefined
) => {
  return response?.data?.data.map((agent: Agent) => ({
    agent_name: `${agent.first_name} ${agent.last_name}`,
    club_name: agent?.Club?.club_name ? (
      agent?.Club?.club_name
    ) : (
      <>
        <h3>--</h3>
      </>
    ),
    date_added: moment(agent.createdAt).format("LL"),
    game_code: agent.game_code,
    id: agent.id,
    status: <StatusLabel status={agent.status} />
  }));
};

export const parseSubAgentList = (
  subAgents: any[],
  isChecked: (data: any) => boolean,
  toggle: (data: string) => void
) => {
  return (
    subAgents &&
    subAgents.map((subAgent: Agent) => {
      const isSelected = subAgents ? isChecked(subAgent.id.toString()) : false;

      return {
        game_id: subAgent.game_code,
        id: subAgent.id.toString(),
        isSelected,
        name: `${subAgent.first_name} ${subAgent.last_name}`,
        toggle
      };
    })
  );
};
