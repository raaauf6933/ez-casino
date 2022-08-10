import { AxiosResponse } from "axios";
import TableAccordion from "components/TableAccordion";
import { parseAgentPayout } from "page/Home/utils/agent";
import React from "react";
import PayoutAgentDetailsColumn, { PayoutSubAgentColumn } from "./columns";

interface AgentPayoutTableProps {
  data: AxiosResponse<any, any> | undefined;
}

const AgentPayoutTable: React.FC<AgentPayoutTableProps> = props => {
  const { data } = props;

  const agentPayouts = parseAgentPayout(data);

  console.log(data);
  return (
    <>
      <TableAccordion
        columns={PayoutAgentDetailsColumn}
        data={agentPayouts}
        loading={false}
        subTableColumns={PayoutSubAgentColumn}
      />
    </>
  );
};

export default AgentPayoutTable;
