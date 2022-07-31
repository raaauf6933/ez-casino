import { Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import StatusLabel from "components/StatusLabel";
import moment from "moment";
import { ColumnType } from "types";
import { currencyFormat } from "utils/currencyFormat";
import { maybe } from "utils/misc";

export const columns: ColumnType[] = [
  {
    key: 1,
    label: "ID",
    path: "id"
  },
  {
    key: 2,
    label: "Generated By",
    path: "generated_by"
  },
  {
    key: 3,
    label: "Date Created",
    path: "date_created"
  },
  {
    key: 4,
    label: "Status",
    path: "status"
  }
];

export const parseBatchPayoutList = (
  response: AxiosResponse<any, any> | undefined
) => {
  return response?.data?.data.map((batch: any) => ({
    date_created: moment(batch.createdAt).format("LL"),
    generated_by: `${batch?.user?.first_name} ${batch?.user?.last_name}`,
    id: batch.id,
    status: <StatusLabel status={batch.status} />
  }));
};

export const parseAgentPayout = (
  response: AxiosResponse<any, any> | undefined
) => {
  return response?.data?.payout?.agent_payouts.map((agent_payout: any) => ({
    admin_fee: (
      <Typography color="red">
        {currencyFormat(agent_payout?.admin_fee)}
      </Typography>
    ),
    comms_rate: (
      <Typography fontWeight={600}>{agent_payout?.comms_rate}%</Typography>
    ),
    deduction: maybe(() => currencyFormat(agent_payout.deduction), "0.00"),
    game_code: agent_payout?.agent?.game_code,
    id: agent_payout.id,
    initial_salary: (
      <Typography color="green">
        {currencyFormat(agent_payout?.initial_salary)}
      </Typography>
    ),
    name: `${agent_payout?.agent?.first_name} ${agent_payout?.agent?.last_name}`,
    status: <StatusLabel status={agent_payout?.status} />,
    sub_agent_salary: (
      <Typography color="green">
        {currencyFormat(agent_payout?.sub_agent_salary)}
      </Typography>
    ),
    total_salary: (
      <Typography fontWeight={600}>
        {currencyFormat(agent_payout?.total_salary)}
      </Typography>
    )
  }));
};
