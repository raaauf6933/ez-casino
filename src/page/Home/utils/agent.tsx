import { maybe } from "utils/misc";
import { Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import StatusLabel from "components/StatusLabel";
import { currencyFormat } from "utils/currencyFormat";
import moment from "moment-timezone";

export const parseAgentPayout = (
  response: AxiosResponse<any, any> | undefined
) => {
  console.log(response);
  return response?.data?.map((agent_payout: any) => ({
    admin_fee: (
      <Typography color="red">
        {currencyFormat(agent_payout?.admin_fee)}
      </Typography>
    ),
    comms_rate: (
      <Typography fontWeight={600}>{agent_payout?.comms_rate}%</Typography>
    ),
    date_created: moment(agent_payout.createdAt).format("LLL"),
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
    subData: parseSubAgent(agent_payout.agent_subAgent_payouts),
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

export const parseSubAgent = (data: any) => {
  return data.map((agent_payout: any) => ({
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
