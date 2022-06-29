import { Grid, Typography } from "@mui/material";
import Card from "components/Card";
import * as React from "react";
import { currencyFormat } from "utils/currencyFormat";

interface PayoutBatchInfoProps {
  data?: any;
}

const PayoutBatchInfo: React.FC<PayoutBatchInfoProps> = props => {
  const { data } = props;

  return (
    <Card title="Batch  Details">
      <Grid container spacing={1}>
        <Grid item md={6} lg={6}>
          <Typography fontWeight={600}>Batch ID</Typography>
        </Grid>
        <Grid item md={6} lg={6}>
          <Typography>{data?.id}</Typography>
        </Grid>
        <Grid item md={6} lg={6}>
          <Typography fontWeight={600}>Total Agent Salary</Typography>
        </Grid>
        <Grid item md={6} lg={6}>
          <Typography>{currencyFormat(data?.total_agent_salary)}</Typography>
        </Grid>
        <Grid item md={6} lg={6}>
          <Typography fontWeight={600}>Total Admin Fee</Typography>
        </Grid>
        <Grid item md={6} lg={6}>
          <Typography>{currencyFormat(data?.total_admin_fee)}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default PayoutBatchInfo;
