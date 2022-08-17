import { Button, Grid, Typography } from "@mui/material";
import Card from "components/Card";
import * as React from "react";
import { BatchPayoutStatusType } from "types";
import { currencyFormat } from "utils/currencyFormat";

interface PayoutBatchInfoProps {
  data?: any;
  onUpdateStatus: (status: BatchPayoutStatusType) => void;
}

const PayoutBatchInfo: React.FC<PayoutBatchInfoProps> = props => {
  const { data, onUpdateStatus } = props;

  return (
    <Card
      title="Batch  Details"
      action={
        data?.status !== BatchPayoutStatusType.ONGOING ? null : (
          <>
            <Button
              variant="contained"
              color="error"
              onClick={() => onUpdateStatus(BatchPayoutStatusType.CANCELLED)}
            >
              <Typography fontWeight={600}>Cancel</Typography>
            </Button>
          </>
        )
      }
    >
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
        <Grid item md={6} lg={6}>
          <Typography fontWeight={600}>Total Adv/Credit</Typography>
        </Grid>
        <Grid item md={6} lg={6}>
          <Typography>{currencyFormat(data?.credit)}</Typography>
        </Grid>
        <Grid item md={6} lg={6}>
          <Typography fontWeight={600}>Total Salary</Typography>
        </Grid>
        <Grid item md={6} lg={6}>
          <Typography>{currencyFormat(data?.total_salary)}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default PayoutBatchInfo;
