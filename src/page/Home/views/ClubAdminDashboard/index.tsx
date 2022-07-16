import { Grid, Box, Typography, Skeleton } from "@mui/material";
import Card from "components/Card";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import useFetch from "hooks/useFetch";
import {
  GET_CLUB_ADMIN_DASHBOARD,
  GET_SUPER_USER_DASHBOARD
} from "page/Home/api";
import React from "react";
import { currencyFormat } from "utils/currencyFormat";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import UseStyle from "./../../style";
import { useUser } from "context/auth/context";
import { UserTypeEnum } from "types";

const ClubAdminDashboard: React.FC = () => {
  const classes = UseStyle({});
  const user = useUser();

  const { response, loading } = useFetch({
    url:
      user?.usertype === UserTypeEnum.CLUB_ADMIN
        ? GET_CLUB_ADMIN_DASHBOARD
        : GET_SUPER_USER_DASHBOARD
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
                <Typography variant="h6">Total Admin Fee</Typography>
                <Typography variant="h4">
                  {/* {reports?.sales_today !== undefined ? (
                  currencyFormat(reports.sales_today)
                ) : (
                  <Skeleton />
                )} */}
                  {loading ? (
                    <Skeleton variant="text" />
                  ) : (
                    currencyFormat(response?.data?.total_admin_fee)
                  )}
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
                  {loading ? (
                    <Skeleton variant="text" />
                  ) : (
                    response?.data?.total_agents
                  )}
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
                <Typography variant="h6">Total Agents Salary</Typography>
                <Typography variant="h4">
                  {/* {reports?.sales_today !== undefined ? (
                  currencyFormat(reports.sales_today)
                ) : (
                  <Skeleton />
                )} */}
                  {loading ? (
                    <Skeleton variant="text" />
                  ) : (
                    currencyFormat(response?.data?.total_initial_salary)
                  )}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>{" "}
    </>
  );
};

export default ClubAdminDashboard;
