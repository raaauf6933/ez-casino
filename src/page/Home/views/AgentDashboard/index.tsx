import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Card from "components/Card";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import UseStyle from "./../../style";
import { currencyFormat } from "utils/currencyFormat";
import useFetch from "hooks/useFetch";
import { GET_AGENT_DASHBOARD, GET_AGENT_PAYOUT } from "page/Home/api";
import { useUser } from "context/auth/context";
import AgentPayoutTable from "page/Home/components/AgentPage/AgentPayoutTable";

interface AgentDashboardProps {
  test?: any;
}

const AgentDashboard: React.FC<AgentDashboardProps> = () => {
  const classes = UseStyle({});

  const user = useUser();

  const { response } = useFetch({ url: GET_AGENT_DASHBOARD });

  const { response: agentPayoutResponse } = useFetch({
    params: {
      id: user?._id
    },
    url: GET_AGENT_PAYOUT
  });

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <Card>
            <Box display="flex">
              <div className={classes.icons}>
                <InsertChartOutlinedIcon
                  sx={{
                    fontSize: "4em"
                  }}
                  color="primary"
                />
              </div>
              <Box display="flex" flexDirection="column">
                <Typography variant="h6">Recent Earning</Typography>
                <Typography variant="h4">
                  {/* {reports?.sales_today !== undefined ? (
                  currencyFormat(reports.sales_today)
                ) : (
                  <Skeleton />
                )} */}
                  {currencyFormat(response?.data?.recent_earning)}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Card>
            <Box display="flex">
              <div className={classes.icons}>
                <GroupsIcon
                  sx={{
                    fontSize: "4em"
                  }}
                  color="primary"
                />
              </div>
              <Box display="flex" flexDirection="column">
                <Typography variant="h6">Agents</Typography>
                <Typography variant="h4">
                  {/* {reports?.sales_today !== undefined ? (
                  currencyFormat(reports.sales_today)
                ) : (
                  <Skeleton />
                )} */}
                  {response?.data?.num_agents}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Card>
            <Box display="flex">
              <div className={classes.icons}>
                <AccountBalanceWalletIcon
                  sx={{
                    fontSize: "4em"
                  }}
                  color="primary"
                />
              </div>
              <Box display="flex" flexDirection="column">
                <Typography variant="h6">Total Earnings</Typography>
                <Typography variant="h4">
                  {/* {reports?.sales_today !== undefined ? (
                  currencyFormat(reports.sales_today)
                ) : (
                  <Skeleton />
                )} */}
                  {currencyFormat(response?.data?.total_earnings)}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Card title="My Payouts">
            <AgentPayoutTable data={agentPayoutResponse} />
          </Card>
        </Grid>
      </Grid>{" "}
    </>
  );
};

export default AgentDashboard;
