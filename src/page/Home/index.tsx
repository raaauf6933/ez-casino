import { Box, Grid, Typography } from "@mui/material";
import Card from "components/Card";
import { useUser } from "context/auth/context";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import UseStyle from "./style";
import { currencyFormat } from "utils/currencyFormat";

const Home = (): JSX.Element => {
  const user = useUser();
  const classes = UseStyle({});

  return (
    <>
      <Typography variant="h3" fontWeight={600} gutterBottom>
        Hello there, {user?.first_name}
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={6}>
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
                  {currencyFormat(3000)}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item md={6}>
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
                  {5}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item md={12}>
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
                  {currencyFormat(3000)}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
