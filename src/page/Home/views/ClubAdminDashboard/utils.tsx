import { Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import StatusLabel from "components/StatusLabel";
import moment from "moment";
import { currencyFormat } from "utils/currencyFormat";

export const parseTransactions = (
  response: AxiosResponse<any, any> | undefined
) => {
  return response?.data?.data?.map((e: any) => ({
    amount: <Typography color="green">{currencyFormat(e.amount)}</Typography>,
    date_created: moment(e.createdAt).format("LLL"),
    id: e.id,
    status: e.type === "PAYOUT" ? "-" : <StatusLabel status={e.status} />,
    type: e.type
  }));
};
