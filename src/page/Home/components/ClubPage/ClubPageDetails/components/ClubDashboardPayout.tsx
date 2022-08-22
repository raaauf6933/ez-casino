import { Grid, Box, Typography, Skeleton } from "@mui/material";
import Card from "components/Card";
import React from "react";
import { currencyFormat } from "utils/currencyFormat";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import GroupsIcon from "@mui/icons-material/Groups";
import UseStyle from "./../../../../style";

interface ClubDashboardPayoutProps {
  data: any;
  loading: boolean;
}

const ClubDashboardPayout: React.FC<ClubDashboardPayoutProps> = props => {
  const { data, loading } = props;
  const classes = UseStyle({});

  return (
    <>
      <Card title="This Week">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <Box display="flex">
              <div className={classes.icons}>
                <InsertChartOutlinedIcon
                  sx={{
                    fontSize: "2em"
                  }}
                  color="primary"
                />
              </div>
              <Box display="flex" flexDirection="column">
                <Typography variant="body2">Club Earn</Typography>
                <Typography variant="h6">
                  {/* {reports?.sales_today !== undefined ? (
                  currencyFormat(reports.sales_today)
                ) : (
                  <Skeleton />
                )} */}
                  {loading ? (
                    <Skeleton variant="text" />
                  ) : (
                    currencyFormat(data?.data?.total_admin_fee)
                  )}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box display="flex">
              <div className={classes.icons}>
                <GroupsIcon
                  sx={{
                    fontSize: "2em"
                  }}
                  color="primary"
                />
              </div>
              <Box display="flex" flexDirection="column">
                <Typography variant="body2">Cash Advance</Typography>
                <Typography variant="h6">
                  {/* {reports?.sales_today !== undefined ? (
                  currencyFormat(reports.sales_today)
                ) : (
                  <Skeleton />
                )} */}
                  {loading ? (
                    <Skeleton variant="text" />
                  ) : (
                    currencyFormat(data?.data?.total_admin_fee)
                  )}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box display="flex">
              <div className={classes.icons}>
                <AccountBalanceWalletIcon
                  sx={{
                    fontSize: "2em"
                  }}
                  color="primary"
                />
              </div>
              <Box display="flex" flexDirection="column">
                <Typography variant="body2">Total Club Fee</Typography>
                <Typography variant="h6">
                  {/* {reports?.sales_today !== undefined ? (
                  currencyFormat(reports.sales_today)
                ) : (
                  <Skeleton />
                )} */}
                  {loading ? (
                    <Skeleton variant="text" />
                  ) : (
                    currencyFormat(data?.data?.total_agent_salary)
                  )}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box display="flex">
              <div className={classes.icons}>
                <CreditCardIcon
                  sx={{
                    fontSize: "2em"
                  }}
                  color="primary"
                />
              </div>
              <Box display="flex" flexDirection="column">
                <Typography variant="body2">Union Fee</Typography>
                <Typography variant="h6">
                  {/* {reports?.sales_today !== undefined ? (
                  currencyFormat(reports.sales_today)
                ) : (
                  <Skeleton />
                )} */}
                  {loading ? (
                    <Skeleton variant="text" />
                  ) : (
                    currencyFormat(data?.data?.total_credit)
                  )}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Box display="flex">
              <div className={classes.icons}>
                <AccountBalanceWalletIcon
                  sx={{
                    fontSize: "2em"
                  }}
                  color="primary"
                />
              </div>
              <Box display="flex" flexDirection="column">
                <Typography variant="body2">Total Remaining</Typography>
                <Typography variant="h6">
                  {/* {reports?.sales_today !== undefined ? (
                  currencyFormat(reports.sales_today)
                ) : (
                  <Skeleton />
                )} */}
                  {loading ? (
                    <Skeleton variant="text" />
                  ) : (
                    currencyFormat(data?.data?.total_salary)
                  )}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default ClubDashboardPayout;
