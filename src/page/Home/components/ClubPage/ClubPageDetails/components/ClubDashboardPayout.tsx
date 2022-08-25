import { Grid, Box, Typography, Skeleton, IconButton } from "@mui/material";
import Card from "components/Card";
import React from "react";
import { currencyFormat } from "utils/currencyFormat";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import UseStyle from "./../../../../style";
import PaidIcon from "@mui/icons-material/Paid";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import PaymentsIcon from "@mui/icons-material/Payments";

interface ClubDashboardPayoutProps {
  data: any;
  loading: boolean;
  settlement: any;
}

const ClubDashboardPayout: React.FC<ClubDashboardPayoutProps> = props => {
  const { loading, settlement } = props;
  const classes = UseStyle({});

  return (
    <>
      <Card
        title="This Week"
        action={
          <>
            <IconButton
              color="primary"
              aria-label="Request Cash"
              component="label"
            >
              <CreditCardIcon />
            </IconButton>
          </>
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <Box display="flex">
              <div className={classes.icons}>
                <PaymentsIcon
                  sx={{
                    fontSize: "2em"
                  }}
                  color="primary"
                />
              </div>
              <Box display="flex" flexDirection="column">
                <Typography variant="body2">Expenses</Typography>
                <Typography variant="h6">
                  {/* {reports?.sales_today !== undefined ? (
                  currencyFormat(reports.sales_today)
                ) : (
                  <Skeleton />
                )} */}
                  {loading ? (
                    <Skeleton variant="text" />
                  ) : (
                    currencyFormat(settlement?.club_settlement?.expenses)
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
                    currencyFormat(settlement?.club_settlement?.cash_advance)
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
                    currencyFormat(settlement?.club_settlement?.club_earn)
                  )}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box display="flex">
              <div className={classes.icons}>
                <ConnectWithoutContactIcon
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
                    currencyFormat(settlement?.club_settlement?.union_fee)
                  )}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box display="flex">
              <div className={classes.icons}>
                <PaidIcon
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
                    currencyFormat(settlement?.club_settlement?.total_club_earn)
                  )}
                </Typography>
              </Box>
            </Box>
          </Grid>{" "}
        </Grid>
      </Card>
    </>
  );
};

export default ClubDashboardPayout;
