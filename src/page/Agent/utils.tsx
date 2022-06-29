import { AxiosResponse } from "axios";
import StatusLabel from "components/StatusLabel";
import moment from "moment";
import { ColumnType } from "types";
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

export const parseAgentList = (response: AxiosResponse<any, any> | undefined) =>{

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

}
