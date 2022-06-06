import ListPage from "page/Agent/components/ListPage";
import * as React from "react";
import { columns } from "./../../utils";

interface AgentListProps {
  data?: any;
}

const AgentList: React.FC<AgentListProps> = () => {
  const data = [
    {
      agent_name: "Jonas Kevin Esquillo",
      date_added: "Dec, 23 2022",
      id: "1",
      status: "Active"
    },
    {
      agent_name: "Jonas Kevin Esquillo",
      date_added: "Dec, 23 2022",
      id: "2",
      status: "Active"
    },
    {
      agent_name: "Jonas Kevin Esquillo",
      date_added: "Dec, 23 2022",
      id: "3",
      status: "Active"
    },
    {
      agent_name: "Jonas Kevin Esquillo",
      date_added: "Dec, 23 2022",
      id: "4",
      status: "Active"
    }
  ];

  return (
    <>
      <ListPage columns={columns} data={data} />
    </>
  );
};

export default AgentList;
